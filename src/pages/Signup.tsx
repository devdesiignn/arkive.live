import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import zxcvbn from "zxcvbn";

import { Eye, EyeClosed, Info } from "@phosphor-icons/react";

import usePageTitle from "@/hooks/usePageTitle";
import ShowPasswordStrength from "@/components/ShowPasswordStrength";

type Strength = 0 | 1 | 2 | 3;

function Signup(): JSX.Element {
  usePageTitle("Create Account");

  const { toast } = useToast();

  const [submit, setSubmit] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [password, setPassword] = useState(String);
  const [confirmPassword, setConfirmPassword] = useState(String);

  const [strength, setStrength] = useState<Strength>(0);

  function handleSubmit(
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement>
      | React.FormEvent<HTMLButtonElement>
  ) {
    // Prevent full reload
    e.preventDefault();

    // disable submit button
    setSubmit(true);

    // Sign Up logic

    // Average time to sign up
    setTimeout(() => setSubmit(false), 5000);
  }

  useEffect(() => {
    setStrength(zxcvbn(password).score as Strength);

    return () => setStrength(0);
  }, [password]);

  // VERIFY YOUR ACCOUNT
  useEffect(() => {
    toast({
      title: "Verify Your Email",
      description:
        "Thank you for signing up! Please check your inbox for a verification email. Once verified, you can log in and access your account.",
    });
  }, [toast]);

  // ACCOUNT ALREADY EXIST
  useEffect(() => {
    toast({
      title: "Account Already Exists!",
      description:
        "Sorry, but an account with this email already exists. Please try signing in or use a different email address.",
      variant: "destructive",
    });
  }, [toast]);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Card className="w-11/12 max-w-[500px] mx-auto">
        <CardHeader>
          <CardTitle>Create new account</CardTitle>
        </CardHeader>

        <CardContent>
          <form action="">
            <div className="flex gap-4 mb-4">
              <div className="flex flex-col gap-2 basis-1/2">
                <Label htmlFor="fname">First Name</Label>
                <Input
                  type="text"
                  placeholder="First Name"
                  id="fname"
                  required
                ></Input>
              </div>

              <div className="flex flex-col gap-2 basis-1/2">
                <Label htmlFor="lname">Last Name</Label>
                <Input
                  type="text"
                  placeholder="Last Name"
                  id="lname"
                  required
                ></Input>
              </div>
            </div>

            <div className="flex flex-col gap-2 mb-4">
              <Label htmlFor="email">Email Address</Label>
              <Input
                type="email"
                placeholder="Email Address"
                id="email"
                required
              ></Input>
            </div>

            <div className="flex flex-col gap-2 mb-4">
              <Label htmlFor="password">Password</Label>
              <div className="flex gap-4 items-center">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create Password"
                  id="password"
                  className="relative"
                  minLength={8}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Input>

                {showPassword ? (
                  <Eye size={28} onClick={() => setShowPassword(false)} />
                ) : (
                  <EyeClosed size={28} onClick={() => setShowPassword(true)} />
                )}
              </div>
              {password && password.length < 8 && (
                <p className="text-sm text-gray-500 font-medium flex gap-1 items-center">
                  <Info weight="fill" /> Password must be at least 8 characters
                  long
                </p>
              )}
              {password && password.length >= 8 && (
                <ShowPasswordStrength strength={strength} />
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Confirm Password</Label>
              <div className="flex gap-4 items-center">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  id="confirm-password"
                  className={`relative ${
                    password &&
                    confirmPassword &&
                    password !== confirmPassword &&
                    "focus-visible:ring-red-500"
                  }
                  `}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Input>

                {showConfirmPassword ? (
                  <Eye
                    size={28}
                    onClick={() => setShowConfirmPassword(false)}
                  />
                ) : (
                  <EyeClosed
                    size={28}
                    onClick={() => setShowConfirmPassword(true)}
                  />
                )}
              </div>
              {password && confirmPassword && password !== confirmPassword && (
                <p className="text-sm text-red-500 font-medium flex gap-1 items-center">
                  <Info weight="fill" /> Passwords do not match!
                </p>
              )}
            </div>

            <div className="mt-10">
              <Button
                type="submit"
                className="w-full"
                disabled={submit}
                onClick={handleSubmit}
                onSubmit={handleSubmit}
              >
                Create Account
              </Button>
            </div>
          </form>

          <p className="text-center text-sm pt-8">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-sm underline">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default Signup;
