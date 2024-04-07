import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

import { Warning, ArrowUpRight } from "@phosphor-icons/react";

function Error404() {
  return (
    <div className="bg-white w-full h-screen flex items-center justify-center text-center selection:bg-black selection:text-white">
      <div className="flex flex-col items-center gap-8 lg:gap-12 w-11/12 mx-auto">
        <h1 className="flex text-4xl sm:text-5xl lg:text-6xl items-center gap-1 leading-[normal] font-black select-none">
          4<Warning weight="thin" />4
        </h1>

        <h2 className="text-xl sm:text-3xl lg:text-4xl">
          Whoops! Looks like you've taken a wrong turn.
        </h2>

        <Button
          className="p-3 sm:p-6 flex text-lg sm:text-xl lg:text-2xl font-medium"
          asChild
        >
          <Link to="/home" className="flex items-center">
            Here's an exit <ArrowUpRight weight="bold" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default Error404;
