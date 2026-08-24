-- 1) Remove automatic super_admin bootstrap from public signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'))
  ON CONFLICT (id) DO NOTHING;

  -- Every public signup gets the least-privileged role only.
  INSERT INTO public.user_roles(user_id, role) VALUES (NEW.id, 'customer')
  ON CONFLICT DO NOTHING;

  RETURN NEW;
END; $function$;

-- 2) Server-side 2FA session verification
CREATE OR REPLACE FUNCTION private.has_verified_2fa(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_sessions s
    WHERE s.user_id = _user_id
      AND s.revoked_at IS NULL
      AND s.last_active_at > now() - interval '12 hours'
  )
$$;

REVOKE ALL ON FUNCTION private.has_verified_2fa(uuid) FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION private.is_verified_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT private.is_admin_or_higher(_user_id) AND private.has_verified_2fa(_user_id)
$$;

CREATE OR REPLACE FUNCTION private.is_verified_super_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT private.is_super_admin(_user_id) AND private.has_verified_2fa(_user_id)
$$;

REVOKE ALL ON FUNCTION private.is_verified_admin(uuid) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION private.is_verified_super_admin(uuid) FROM PUBLIC, anon, authenticated;

-- 3) Require a verified 2FA session for every admin data path
DROP POLICY IF EXISTS "Admins update bookings" ON public.bookings;
CREATE POLICY "Admins update bookings" ON public.bookings FOR UPDATE
  USING (private.is_verified_admin(auth.uid()))
  WITH CHECK (private.is_verified_admin(auth.uid()));

DROP POLICY IF EXISTS "Customers view own bookings" ON public.bookings;
CREATE POLICY "Customers view own bookings" ON public.bookings FOR SELECT
  USING ((user_id = auth.uid()) OR private.is_verified_admin(auth.uid()));

DROP POLICY IF EXISTS "Super admin deletes bookings" ON public.bookings;
CREATE POLICY "Super admin deletes bookings" ON public.bookings FOR DELETE
  USING (private.is_verified_super_admin(auth.uid()));

DROP POLICY IF EXISTS "Admins manage categories" ON public.categories;
CREATE POLICY "Admins manage categories" ON public.categories FOR ALL
  USING (private.is_verified_admin(auth.uid()))
  WITH CHECK (private.is_verified_admin(auth.uid()));

DROP POLICY IF EXISTS "Admins view audit logs" ON public.audit_logs;
CREATE POLICY "Admins view audit logs" ON public.audit_logs FOR SELECT
  USING (private.is_verified_admin(auth.uid()));

DROP POLICY IF EXISTS "Users view own login history" ON public.login_history;
CREATE POLICY "Users view own login history" ON public.login_history FOR SELECT
  USING ((user_id = auth.uid()) OR private.is_verified_super_admin(auth.uid()));

DROP POLICY IF EXISTS "Super admin views failed logins" ON public.failed_login_attempts;
CREATE POLICY "Super admin views failed logins" ON public.failed_login_attempts FOR SELECT
  USING (private.is_verified_super_admin(auth.uid()));

DROP POLICY IF EXISTS "Super admin views own recovery codes" ON public.recovery_codes;
CREATE POLICY "Super admin views own recovery codes" ON public.recovery_codes FOR SELECT
  USING ((user_id = auth.uid()) AND private.is_verified_super_admin(auth.uid()));

DROP POLICY IF EXISTS "Users read own profile" ON public.profiles;
CREATE POLICY "Users read own profile" ON public.profiles FOR SELECT
  USING ((auth.uid() = id) OR private.is_verified_admin(auth.uid()));

DROP POLICY IF EXISTS "Super admin manages roles" ON public.user_roles;
CREATE POLICY "Super admin manages roles" ON public.user_roles FOR ALL
  USING (private.is_verified_super_admin(auth.uid()))
  WITH CHECK (private.is_verified_super_admin(auth.uid()));

DROP POLICY IF EXISTS "Users read own roles" ON public.user_roles;
CREATE POLICY "Users read own roles" ON public.user_roles FOR SELECT
  USING ((auth.uid() = user_id) OR private.is_verified_super_admin(auth.uid()));

DROP POLICY IF EXISTS "Admin views own trusted devices" ON public.trusted_devices;
CREATE POLICY "Admin views own trusted devices" ON public.trusted_devices FOR SELECT
  USING ((user_id = auth.uid()) AND private.is_verified_admin(auth.uid()));

DROP POLICY IF EXISTS "Admin removes own trusted devices" ON public.trusted_devices;
CREATE POLICY "Admin removes own trusted devices" ON public.trusted_devices FOR DELETE
  USING ((user_id = auth.uid()) AND private.is_verified_admin(auth.uid()));

-- Admin session rows never expose their token to clients; only metadata is readable.
DROP POLICY IF EXISTS "Admins view own sessions" ON public.admin_sessions;
CREATE POLICY "Admins view own sessions" ON public.admin_sessions FOR SELECT
  USING ((user_id = auth.uid()) OR private.is_verified_super_admin(auth.uid()));