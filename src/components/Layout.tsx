import { ReactNode } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { FadersHorizontal } from "@phosphor-icons/react";

import usePageTitle from "@/hooks/usePageTitle";

function Layout({ children }: { children: ReactNode }): JSX.Element {
  usePageTitle("Home");

  return (
    <div>
      <header className="flex justify-between items-center px-8 py-2 border-b sticky top-0 z-10 bg-white">
        <div>Placeholder</div>

        <div className="basis-2/3 ">
          <form action="">
            <div className="flex items-center gap-2">
              <Input
                type="search"
                placeholder="Search for Title, Keywords, Authors..."
                className="h-12"
              />
              <Button type="submit" className="px-8 h-12 font-semibold">
                Search
              </Button>
            </div>
          </form>
        </div>

        <div>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>MH</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="flex h-screen">
        <aside className="w-[400px] p-3">
          <div className="sticky top-[80px] flex flex-col gap-4">
            <p className="font-semibold text-sm flex justify-between items-center">
              Filters <FadersHorizontal size={24} />
            </p>
          </div>
        </aside>

        <Separator orientation="vertical" />

        <main className="w-full flex flex-col gap-8 p-3 bg-zinc-50">{children}</main>
      </div>
    </div>
  );
}

export default Layout;
