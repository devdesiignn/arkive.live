import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { useState, useEffect } from "react";

import { Eye, EyeClosed } from "@phosphor-icons/react";
import usePageTitle from "@/hooks/usePageTitle";

function SetPassword(): JSX.Element {
  usePageTitle("Set Password");

  const [submit, setSubmit] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [password, setPassword] = useState(String);
  const [confirmPassword, setConfirmPassword] = useState(String);

  const { toast } = useToast();

  useEffect(() => {
    toast({
      title: "Password Reset Successful",
      description: "Your password has been successfully reset.",
    });
  }, [toast]);

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

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Card className="w-11/12 max-w-[500px] mx-auto">
        <CardHeader>
          <CardTitle>Set new password</CardTitle>
        </CardHeader>

        <CardContent>
          <form action="">
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
                <p className="text-sm text-red-500 font-medium">
                  Passwords do not match!
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
                Set Password
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default SetPassword;
