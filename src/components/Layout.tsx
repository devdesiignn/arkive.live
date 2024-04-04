import { ReactNode } from "react";
import { Separator } from "@/components/ui/separator";

import Header from "@/components/Header";
import Filter from "@/components/Sidebar";

function Layout({ children }: { children: ReactNode }): JSX.Element {
  return (
    <div className="bg-white">
      <Header />

      <div className="flex min-h-screen">
        <Filter />

        <Separator orientation="vertical" />

        <main className="w-full flex flex-col gap-8 p-4 bg-zinc-50">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
