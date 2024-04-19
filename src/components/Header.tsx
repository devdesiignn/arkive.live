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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";

import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import zxcvbn from "zxcvbn";
import { AuthError } from "@supabase/supabase-js";

import {
  Eye,
  EyeClosed,
  Info,
  SpinnerGap,
  SignOut,
} from "@phosphor-icons/react";
import { PanelLeft } from "lucide-react";

import { Filter } from "./Sidebar";
import ShowPasswordStrength from "@/components/ShowPasswordStrength";
import { HomeContext } from "@/pages/Home";
import { supabase } from "@/utils/supabase";
import handleLogout from "@/helper/handleLogout";
import { baseURL } from "@/utils/baseurl";
import { getUserFromLocalStorage } from "@/utils/localstorage";

type Strength = 0 | 1 | 2 | 3;

function Header(): JSX.Element {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const [strength, setStrength] = useState<Strength>(0);

  const { searchParam, setSearchParam, handleSearch } =
    useContext(HomeContext)!;

  // GET USER
  const userData = getUserFromLocalStorage();
  const user =
    userData && userData !== "undefined" ? JSON.parse(userData) : null;
  // console.log(user);

  const [showPassword, setShowPassword] = useState(false);
  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [submit, setSubmit] = useState(false);

  // ENTRIES
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function handleSubmit(
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement>
      | React.FormEvent<HTMLButtonElement>
  ): Promise<void> {
    // Prevent full reload
    e.preventDefault();

    if (!firstName && !lastName && !email && !password) {
      return;
    }

    try {
      setSubmit(true);

      const { data, error } = await supabase.auth.updateUser(
        {
          ...(email && { email }),
          ...(password && { password }),

          ...(firstName && { data: { firstName } }),
          ...(lastName && { data: { lastName } }),
        },
        { emailRedirectTo: `${baseURL}/auth/login` }
      );

      if (error) {
        throw new AuthError(error.message, error.status);
      }

      if (email !== "" && data?.user?.email) {
        // AUTO SIGNOUT USER
        const { error } = await supabase.auth.signOut();
        if (error) {
          throw new AuthError(error.message, error.status);
        }

        // TRIGGER TOAST
        toast({
          title: "Email Updated",
          description:
            "A confirmation email has been sent to your new email address. Please sign in using your new email after confirming the change.",
          variant: "default",
        });

        // NAVIGATE TO LOGIN
        navigate("/auth/login");
      } else {
        toast({
          title: "Account Updated",
          description:
            "Your account information has been successfully updated.",
          variant: "default",
        });
      }

      // console.log("Data:Update", data);
    } catch (error) {
      console.error(error);
    } finally {
      // CLOSE DIALOG
      setOpen(false);

      // DISABLE SUBMIT SPINNER
      setSubmit(false);

      // CLEAR INPUTS
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
    }
  }

  useEffect(() => {
    setStrength(zxcvbn(password).score as Strength);

    return () => setStrength(0);
  }, [password]);

  return (
    <header className="flex justify-between items-center max-[320px]:px-2 px-4 md:px-8 py-2 border-b sticky top-0 z-10 bg-white">
      <div className="font-black font-serif text-xl underline hidden lg:block">
        <Link to="/home">Archive.</Link>
      </div>

      <Sheet>
        <SheetTrigger className="lg:hidden">
          <div className="p-1 sm:p-2 border rounded-lg cursor-pointer hover:bg-zinc-50 transition-colors">
            <PanelLeft />
          </div>
        </SheetTrigger>
        <SheetContent side="left" className="lg:hidden flex flex-col gap-8">
          <div className="font-black font-serif text-xl underline">
            <Link to="/home">Archive.</Link>
          </div>

          <Filter />

          <div className="mt-auto">
            <Link
              to="/auth/login"
              className="flex items-center gap-2 text-base text-red-500 p-2 font-medium"
              onClick={handleLogout}
            >
              <SignOut weight="bold" size={20} /> Log out
            </Link>
          </div>
        </SheetContent>
      </Sheet>

      <div className="basis-2/3">
        <form onSubmit={handleSearch}>
          <div className="flex items-center gap-2">
            <Input
              type="search"
              placeholder="Search for Title, Keywords, Authors..."
              className="h-12 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-2 focus-visible:border-gray-700"
              value={searchParam}
              onChange={(event) => setSearchParam(event.target.value)}
            />

            <Button
              type="submit"
              className="hidden sm:inline-flex sm:px-4 md:px-6 lg:px-8 h-12 font-semibold"
            >
              Search
            </Button>
          </div>
        </form>
      </div>

      <div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <Avatar className="cursor-pointer border-2 hover:bg-gray-100 md:w-12 md:h-12">
              <AvatarImage
                src={`https://api.dicebear.com/8.x/notionists/svg?scale=140&flip=true&seed=${user?.email}`}
              />
              <AvatarFallback>
                {user?.user_metadata?.firstName.charAt(0)}
                {user?.user_metadata?.lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </DialogTrigger>

          <DialogContent className="w-11/12 max-w-[600px]">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-xl">Edit profile</DialogTitle>
              <DialogDescription className="flex flex-col gap-2">
                <span>
                  Make changes to your profile here. Click save when you're
                  done.
                </span>

                <span>Leave any field you don't wish to update empty.*</span>
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit}>
              <div className="flex gap-4 mb-4 flex-wrap md:flex-nowrap">
                <div className="flex flex-col gap-2 w-full lg:basis-1/2">
                  <Label htmlFor="fname">First Name</Label>
                  <Input
                    type="text"
                    placeholder={user?.user_metadata?.firstName}
                    id="fname"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                  ></Input>
                </div>

                <div className="flex flex-col gap-2 w-full lg:basis-1/2">
                  <Label htmlFor="lname">Last Name</Label>
                  <Input
                    type="text"
                    placeholder={user?.user_metadata?.lastName}
                    id="lname"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                  ></Input>
                </div>
              </div>

              <div className="flex flex-col gap-2 mb-4">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  type="email"
                  placeholder={user?.email}
                  id="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                ></Input>
              </div>

              <div className="flex flex-col gap-2 mb-4">
                <Label htmlFor="password">Password</Label>
                <div className="flex gap-2 sm:gap-4 items-center">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Change Password"
                    id="password"
                    className="relative"
                    minLength={8}
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

              {/* <div className="flex flex-col gap-2">
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
                {password &&
                  confirmPassword &&
                  password !== confirmPassword && (
                    <p className="text-sm text-red-500 font-medium flex gap-1 items-center">
                      <Info weight="fill" /> Passwords do not match!
                    </p>
                  )}
              </div> */}

              <DialogFooter className="mt-10">
                <Button type="submit" className="w-full" disabled={submit}>
                  {submit ? (
                    <SpinnerGap
                      className="h-6 w-6 animate-spin"
                      weight="bold"
                    />
                  ) : (
                    "Save changes"
                  )}
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
