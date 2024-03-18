import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import usePageTitle from "@/hooks/usePageTitle";

function Reset(): JSX.Element {
  usePageTitle("Reset Password");

  const [submit, setSubmit] = useState(false);

  const { toast } = useToast();

  // RESET REQUEST SUCCESSFUL
  useEffect(() => {
    toast({
      title: "Password Reset Request",
      description:
        "Check your email for the password reset link. If you don't see the email, please check your spam folder.",
    });
  }, [toast]);

  // ACCOUNT DOES NOT EXIST
  useEffect(() => {
    toast({
      title: "Account Not Found!",
      description:
        "Sorry, the email provided isn't associated with any account. Please verify the email or sign up to create one.",
      variant: "destructive",
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
          <CardTitle>Reset your password</CardTitle>
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

            <div className="mt-10">
              <Button
                type="submit"
                className="w-full"
                disabled={submit}
                onClick={handleSubmit}
                onSubmit={handleSubmit}
              >
                Reset Password
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
