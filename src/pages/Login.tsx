import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { Link } from "react-router-dom";
import { useState } from "react";

import { Eye, EyeClosed } from "@phosphor-icons/react";

import usePageTitle from "@/hooks/usePageTitle";

function Login(): JSX.Element {
  usePageTitle("Login");

  const [submit, setSubmit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Card className="w-11/12 max-w-[500px] mx-auto">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
        </CardHeader>

        <CardContent>
          <form action="">
            <div className="flex flex-col gap-2 mb-4">
              <Label htmlFor="email">Email Address</Label>
              <Input
                type="email"
                placeholder="Email Address"
                id="email"
                required
              ></Input>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="flex gap-4 items-center">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  id="password"
                  className="relative"
                  required
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
                Login
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
