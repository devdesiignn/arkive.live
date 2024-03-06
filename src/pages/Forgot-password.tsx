import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

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
    <>
      <Card className="w-3/4 max-w-[400px] mx-auto">
        <CardHeader>
          <CardTitle>Reset your password</CardTitle>
        </CardHeader>

        <CardContent>
          <form action="">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                type="email"
                placeholder="Email Address"
                id="email"
              ></Input>
            </div>

            <div>
              <Button type="submit">Reset Password</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}

export default Reset;
