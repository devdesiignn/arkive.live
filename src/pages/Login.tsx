import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { Link } from "react-router-dom";

import { Eye, EyeClosed } from "@phosphor-icons/react";

function Login(): JSX.Element {
  return (
    <>
      <Card className="w-3/4 max-w-[400px] mx-auto">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
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
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                placeholder="Password"
                id="password"
              ></Input>

              <Eye size={24} />
              <EyeClosed size={24} />
            </div>

            <Link to="/auth/reset">Forgot Password?</Link>

            <div>
              <Button type="submit">Login</Button>
            </div>
          </form>

          <Separator />

          <p>
            Don&apos;t have an account? <Link to="/auth/new">Create one</Link>
          </p>
        </CardContent>
      </Card>
    </>
  );
}

export default Login;
