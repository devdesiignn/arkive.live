import { ReactNode } from "react";
import { Separator } from "@/components/ui/separator";

import Header from "@/components/Header";
import Filter from "@/components/Filter";

function Layout({ children }: { children: ReactNode }): JSX.Element {
  return (
    <div>
      <Header />

      <div className="flex h-screen">
        <Filter />

        <Separator orientation="vertical" />

        <main className="w-full flex flex-col gap-8 p-3 bg-zinc-50">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
