import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { useState, useEffect } from "react";
import zxcvbn from "zxcvbn";
import { AuthError } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

import { Eye, EyeClosed, Info, SpinnerGap } from "@phosphor-icons/react";

import usePageTitle from "@/hooks/usePageTitle";
import ShowPasswordStrength from "@/components/ShowPasswordStrength";
import { supabase } from "@/utils/supabase";

type Strength = 0 | 1 | 2 | 3;

function SetPassword(): JSX.Element {
  usePageTitle("Set New Password");

  const { toast } = useToast();
  const navigate = useNavigate();

  const [strength, setStrength] = useState<Strength>(0);

  const [submit, setSubmit] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ENTRIES
  const [password, setPassword] = useState(String);
  const [confirmPassword, setConfirmPassword] = useState(String);

  // console.log("Password", password, "Confirm Password", confirmPassword);

  async function handleSubmit(
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement>
      | React.FormEvent<HTMLButtonElement>
  ) {
    // Prevent full reload
    e.preventDefault();

    if (!password || !confirmPassword) {
      return;
    }

    try {
      setSubmit(true);

      supabase.auth.onAuthStateChange(async (event) => {
        if (event == "PASSWORD_RECOVERY") {
          const { error } = await supabase.auth.updateUser({
            password,
          });

          if (error) {
            throw new AuthError(error.message, error.status);
          }

          // console.log("Data:SetPassword", data);

          // CLEAR INPUTS
          setPassword("");
          setConfirmPassword("");

          toast({
            title: "Password Reset Successful",
            description: "Your password has been successfully reset.",
            variant: "default",
          });

          // NAVIGATE TO LOGIN
          navigate("/auth/login");
        }
      });
    } catch (error) {
      console.error(error);

      toast({
        title: "Error Updating Password",
        description: "There was an error updating your password.",
        variant: "destructive",
      });
    } finally {
      // DISABLE SUBMIT BTN
      setSubmit(false);
    }
  }

  useEffect(() => {
    setStrength(zxcvbn(password).score as Strength);

    return () => setStrength(0);
  }, [password]);

  return (
    <div className="bg-white w-full min-h-screen py-12 flex items-center justify-center">
      <Card className="w-11/12 max-w-[600px] mx-auto">
        <CardHeader>
          <CardTitle>Set new password</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 mb-4">
              <Label htmlFor="password">Password</Label>
              <div className="flex gap-2 sm:gap-4 items-center">
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
              <div className="flex gap-2 sm:gap-4 items-center">
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
              <Button type="submit" className="w-full" disabled={submit}>
                {submit ? (
                  <SpinnerGap className="h-6 w-6 animate-spin" weight="bold" />
                ) : (
                  "Set Password"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default SetPassword;
