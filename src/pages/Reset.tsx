import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { Link } from "react-router-dom";
import { useState } from "react";
import { SpinnerGap } from "@phosphor-icons/react";
import { AuthError } from "@supabase/supabase-js";

import usePageTitle from "@/hooks/usePageTitle";
import { baseURL } from "@/utils/baseurl";
import { supabase } from "@/utils/supabase";

function Reset(): JSX.Element {
  usePageTitle("Reset Password");

  const [submit, setSubmit] = useState(false);

  // ENTRIES
  const [email, setEmail] = useState<string>("");
  // console.log("Reset Email", email);

  const { toast } = useToast();

  async function handleSubmit(
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement>
      | React.FormEvent<HTMLButtonElement>
  ) {
    // Prevent full reload
    e.preventDefault();

    if (!email) {
      return;
    }

    try {
      setSubmit(true);

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${baseURL}/auth/set-password`,
      });

      if (error) {
        throw new AuthError(error.message, error.status);
      }

      // console.log("Data:Reset", data);

      // RESET REQUEST SUCCESSFUL
      toast({
        title: "Password Reset Request",
        description:
          "Check your email for the password reset link. If you don't see the email, please check your spam folder.",
      });
    } catch (error) {
      console.error(error);

      // ACCOUNT DOES NOT EXIST
      toast({
        title: "Account Not Found!",
        description:
          "Sorry, the email provided isn't associated with any account. Please verify the email or sign up to create one.",
        variant: "destructive",
      });
    } finally {
      // DISABLE SUBMIT BTN
      setSubmit(false);

      // CLEAR INPUTS
      setEmail("");
    }
  }

  return (
    <div className="bg-white w-full min-h-screen py-12 flex items-center justify-center">
      <Card className="w-11/12 max-w-[600px] mx-auto">
        <CardHeader>
          <CardTitle>Reset your password</CardTitle>
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

            <div className="mt-10">
              <Button type="submit" className="w-full">
                {submit ? (
                  <SpinnerGap className="h-6 w-6 animate-spin" weight="bold" />
                ) : (
                  " Reset Password"
                )}
              </Button>
            </div>
          </form>

          <p className="text-center text-sm pt-8">
            Lost your way?{" "}
            <Link to="/auth/login" className="text-sm underline">
              Back to Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default Reset;
