import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

import { useEffect, useState } from "react";
import zxcvbn from "zxcvbn";
import { Eye, EyeClosed, Info } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

import ShowPasswordStrength from "@/components/ShowPasswordStrength";

type Strength = 0 | 1 | 2 | 3;

function Header(): JSX.Element {
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

  return (
    <header className="flex justify-between items-center px-8 py-2 border-b sticky top-0 z-10 bg-white">
      <div className="font-black font-serif text-xl underline">
        <Link to="/">Archive.</Link>
      </div>

      <div className="basis-2/3 ">
        <form action="">
          <div className="flex items-center gap-2">
            <Input
              type="search"
              placeholder="Search for Title, Keywords, Authors..."
              className="h-12 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-2 focus-visible:border-gray-700"
            />
            <Button type="submit" className="px-8 h-12 font-semibold">
              Search
            </Button>
          </div>
        </form>
      </div>

      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>MH</AvatarFallback>
            </Avatar>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader className="mb-4">
              <DialogTitle className="text-xl">Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>

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
                    <EyeClosed
                      size={28}
                      onClick={() => setShowPassword(true)}
                    />
                  )}
                </div>
                {password && password.length < 8 && (
                  <p className="text-sm text-gray-500 font-medium flex gap-1 items-center">
                    <Info weight="fill" /> Password must be at least 8
                    characters long
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
                {password &&
                  confirmPassword &&
                  password !== confirmPassword && (
                    <p className="text-sm text-red-500 font-medium flex gap-1 items-center">
                      <Info weight="fill" /> Passwords do not match!
                    </p>
                  )}
              </div>

              <DialogFooter className="mt-10">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={submit}
                  onClick={handleSubmit}
                  onSubmit={handleSubmit}
                >
                  Save changes
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}

export default Header;
