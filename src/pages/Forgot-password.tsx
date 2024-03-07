import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { Link } from "react-router-dom";
import { useEffect } from "react";

function Reset(): JSX.Element {
  const { toast } = useToast();

  useEffect(() => {
    toast({
      title: "Uh oh! Something went wrong.",
      description: "There was a problem with your request.",
    });
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Card className="w-3/4 max-w-[400px] mx-auto">
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
              ></Input>
            </div>

            <div className="mt-9">
              <Button type="submit" className="w-full">Reset Password</Button>
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
