import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(6, "Minimum 6 characters").max(72),
});
const signupSchema = loginSchema.extend({
  fullName: z.string().trim().min(2, "Enter your name").max(80),
});

const Auth = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/account", { replace: true });
    });
  }, [navigate]);

  const doLogin = async () => {
    const parsed = loginSchema.safeParse({ email, password });
    if (!parsed.success) return toast.error(parsed.error.issues[0].message);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword(parsed.data);
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Welcome back");
    navigate("/account");
  };

  const doSignup = async () => {
    const parsed = signupSchema.safeParse({ email, password, fullName });
    if (!parsed.success) return toast.error(parsed.error.issues[0].message);
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/account`,
        data: { full_name: parsed.data.fullName },
      },
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Account created — check your email if confirmation is required.");
    navigate("/account");
  };

  const doGoogle = async () => {
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: `${window.location.origin}/account`,
    });
    if (result.error) toast.error("Google sign-in failed");
  };

  return (
    <Layout>
      <div className="container-full max-w-md py-16">
        <h1 className="font-serif text-3xl mb-2 text-center">Welcome</h1>
        <p className="text-center text-sm text-muted-foreground mb-8">
          Sign in to track your bookings and orders.
        </p>

        <Tabs value={mode} onValueChange={(v) => setMode(v as "login" | "signup")}>
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="login">Sign in</TabsTrigger>
            <TabsTrigger value="signup">Create account</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-3 pt-4">
            <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-11 rounded-sm" />
            <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="h-11 rounded-sm" />
            <Button onClick={doLogin} disabled={loading} className="w-full h-11 rounded-sm">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign in"}
            </Button>
          </TabsContent>

          <TabsContent value="signup" className="space-y-3 pt-4">
            <Input placeholder="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="h-11 rounded-sm" />
            <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-11 rounded-sm" />
            <Input placeholder="Password (min 6 chars)" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="h-11 rounded-sm" />
            <Button onClick={doSignup} disabled={loading} className="w-full h-11 rounded-sm">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create account"}
            </Button>
          </TabsContent>
        </Tabs>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
          <div className="relative flex justify-center text-xs uppercase tracking-widest"><span className="bg-background px-2 text-muted-foreground">or</span></div>
        </div>

        <Button variant="outline" onClick={doGoogle} className="w-full h-11 rounded-sm">
          Continue with Google
        </Button>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          Admin? <Link to="/admin/login" className="underline">Admin panel login →</Link>
        </p>
      </div>
    </Layout>
  );
};

export default Auth;
