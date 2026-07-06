
-- 1) Private schema for helper functions (not exposed via PostgREST)
CREATE SCHEMA IF NOT EXISTS private;
REVOKE ALL ON SCHEMA private FROM PUBLIC, anon, authenticated;
GRANT USAGE ON SCHEMA private TO authenticated, service_role;

-- 2) Recreate helpers in private schema
CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

CREATE OR REPLACE FUNCTION private.is_admin_or_higher(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id
      AND role IN ('super_admin','admin','manager','sales_executive','customer_support')
  );
$$;

CREATE OR REPLACE FUNCTION private.is_super_admin(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = 'super_admin');
$$;

REVOKE ALL ON FUNCTION private.has_role(uuid, public.app_role) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION private.is_admin_or_higher(uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION private.is_super_admin(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION private.is_admin_or_higher(uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION private.is_super_admin(uuid) TO authenticated, service_role;

-- 3) Rewrite all RLS policies to use private.* helpers

-- profiles
DROP POLICY IF EXISTS "Users read own profile" ON public.profiles;
CREATE POLICY "Users read own profile" ON public.profiles FOR SELECT
  USING ((auth.uid() = id) OR private.is_admin_or_higher(auth.uid()));

-- user_roles
DROP POLICY IF EXISTS "Super admin manages roles" ON public.user_roles;
CREATE POLICY "Super admin manages roles" ON public.user_roles FOR ALL
  USING (private.is_super_admin(auth.uid()))
  WITH CHECK (private.is_super_admin(auth.uid()));
DROP POLICY IF EXISTS "Users read own roles" ON public.user_roles;
CREATE POLICY "Users read own roles" ON public.user_roles FOR SELECT
  USING ((auth.uid() = user_id) OR private.is_super_admin(auth.uid()));

-- categories
DROP POLICY IF EXISTS "Admins manage categories" ON public.categories;
CREATE POLICY "Admins manage categories" ON public.categories FOR ALL
  USING (private.is_admin_or_higher(auth.uid()))
  WITH CHECK (private.is_admin_or_higher(auth.uid()));

-- bookings
DROP POLICY IF EXISTS "Super admin deletes bookings" ON public.bookings;
CREATE POLICY "Super admin deletes bookings" ON public.bookings FOR DELETE
  USING (private.is_super_admin(auth.uid()));
DROP POLICY IF EXISTS "Admins update bookings" ON public.bookings;
CREATE POLICY "Admins update bookings" ON public.bookings FOR UPDATE
  USING (private.is_admin_or_higher(auth.uid()))
  WITH CHECK (private.is_admin_or_higher(auth.uid()));
DROP POLICY IF EXISTS "Customers view own bookings" ON public.bookings;
CREATE POLICY "Customers view own bookings" ON public.bookings FOR SELECT
  USING ((user_id = auth.uid()) OR private.is_admin_or_higher(auth.uid()));

-- Tighten: no more WITH CHECK (true)
DROP POLICY IF EXISTS "Anyone can create booking" ON public.bookings;
CREATE POLICY "Anyone can create booking" ON public.bookings FOR INSERT
  WITH CHECK (
    (auth.uid() IS NULL AND user_id IS NULL)
    OR (auth.uid() IS NOT NULL AND user_id = auth.uid())
  );

-- recovery_codes
DROP POLICY IF EXISTS "Super admin views own recovery codes" ON public.recovery_codes;
CREATE POLICY "Super admin views own recovery codes" ON public.recovery_codes FOR SELECT
  USING ((user_id = auth.uid()) AND private.is_super_admin(auth.uid()));

-- trusted_devices
DROP POLICY IF EXISTS "Admin removes own trusted devices" ON public.trusted_devices;
CREATE POLICY "Admin removes own trusted devices" ON public.trusted_devices FOR DELETE
  USING ((user_id = auth.uid()) AND private.is_admin_or_higher(auth.uid()));
DROP POLICY IF EXISTS "Admin views own trusted devices" ON public.trusted_devices;
CREATE POLICY "Admin views own trusted devices" ON public.trusted_devices FOR SELECT
  USING ((user_id = auth.uid()) AND private.is_admin_or_higher(auth.uid()));

-- admin_sessions
DROP POLICY IF EXISTS "Super admin revokes sessions" ON public.admin_sessions;
CREATE POLICY "Super admin revokes sessions" ON public.admin_sessions FOR DELETE
  USING (private.is_super_admin(auth.uid()) OR (user_id = auth.uid()));
DROP POLICY IF EXISTS "Admins view own sessions" ON public.admin_sessions;
CREATE POLICY "Admins view own sessions" ON public.admin_sessions FOR SELECT
  USING ((user_id = auth.uid()) OR private.is_super_admin(auth.uid()));

-- audit_logs
DROP POLICY IF EXISTS "Admins view audit logs" ON public.audit_logs;
CREATE POLICY "Admins view audit logs" ON public.audit_logs FOR SELECT
  USING (private.is_admin_or_higher(auth.uid()));

-- failed_login_attempts
DROP POLICY IF EXISTS "Super admin views failed logins" ON public.failed_login_attempts;
CREATE POLICY "Super admin views failed logins" ON public.failed_login_attempts FOR SELECT
  USING (private.is_super_admin(auth.uid()));

-- login_history
DROP POLICY IF EXISTS "Users view own login history" ON public.login_history;
CREATE POLICY "Users view own login history" ON public.login_history FOR SELECT
  USING ((user_id = auth.uid()) OR private.is_super_admin(auth.uid()));

-- 4) Drop the now-unused public helpers so they're no longer exposed via API
DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);
DROP FUNCTION IF EXISTS public.is_admin_or_higher(uuid);
DROP FUNCTION IF EXISTS public.is_super_admin(uuid);
