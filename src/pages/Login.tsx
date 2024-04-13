import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AuthError } from "@supabase/supabase-js";

import { Eye, EyeClosed, SpinnerGap } from "@phosphor-icons/react";

import usePageTitle from "@/hooks/usePageTitle";
import { supabase } from "@/utils/supabase";

function Login(): JSX.Element {
  usePageTitle("Login");

  const { toast } = useToast();
  const navigate = useNavigate();

  const [submit, setSubmit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // ENTRIES
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // console.log("Email", email, "Password", password);

  async function handleSubmit(
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement>
      | React.FormEvent<HTMLButtonElement>
  ): Promise<void> {
    // Prevent full reload
    e.preventDefault();

    if (!email || !password) {
      throw new AuthError("All fields are required.");
    }

    try {
      setSubmit(true);

      // Login logic
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new AuthError(error.message, error.status);
      }

      // console.log("Data:", data);

      // LOGIN SUCCESS
      toast({
        title: "Login Successful",
        description: "Welcome back! You have successfully logged in.",
        variant: "default",
      });

      // NAVIGATE TO HOME
      if (data && data.session && data.session.access_token) {
        // User is authenticated
        navigate("/home");
      }
    } catch (error) {
      // console.error(error);

      if (error instanceof AuthError) {
        if (error.message === "Invalid login credentials") {
          // INVALID CREDENTIALS
          toast({
            title: "Invalid Login Credentials",
            description:
              "The email and password combination you entered is incorrect. Please double-check your credentials and try again.",
            variant: "destructive",
          });
        }
      }
    } finally {
      // DISABLE SUBMIT SPINNER
      setSubmit(false);

      // CLEAR INPUTS
      setEmail("");
      setPassword("");
    }
  }

  return (
    <div className="bg-white w-full min-h-screen py-12 flex items-center justify-center">
      <Card className="w-11/12 max-w-[600px] mx-auto">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 mb-4">
              <Label htmlFor="email">Email Address</Label>
              <Input
                type="email"
                placeholder="Email Address"
                id="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              ></Input>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="flex gap-2 sm:gap-4 items-center">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  id="password"
                  className="relative"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                ></Input>

                {showPassword ? (
                  <Eye size={28} onClick={() => setShowPassword(false)} />
                ) : (
                  <EyeClosed size={28} onClick={() => setShowPassword(true)} />
                )}
              </div>
            </div>

            <Link
              to="/auth/reset"
              className="text-sm hover:underline block text-right my-4"
            >
              Forgot your password?
            </Link>

            <div className="mt-10">
              <Button type="submit" className="w-full" disabled={submit}>
                {submit ? (
                  <SpinnerGap className="h-6 w-6 animate-spin" weight="bold" />
                ) : (
                  "Login"
                )}
              </Button>
            </div>
          </form>

          <p className="text-center text-sm pt-8">
            Don&apos;t have an account?{" "}
            <Link to="/auth/new" className="text-sm underline">
              Create one
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
