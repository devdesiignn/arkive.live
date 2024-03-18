import { Link } from "react-router-dom";

import { Warning, ArrowUpRight } from "@phosphor-icons/react";

function Error404() {
  return (
    <div className="font-serif w-full h-screen flex items-center justify-center text-center selection:bg-black selection:text-white">
      <div className="flex flex-col items-center gap-4 sm:gap-8 lg:gap-12 w-11/12 mx-auto">
        <h1 className="flex text-7xl sm:text-8xl lg:text-9xl items-center gap-1 leading-[normal] font-black select-none animate-slide">
          4<Warning weight="thin" />4
        </h1>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl text-">
          Whoops! Looks like you've taken a wrong turn.
        </h2>

        <Link
          to="/auth/login"
          className="text-xl sm:text-2xl lg:text-3xl font-medium underline hover:no-underline flex items-center"
        >
          Here's an exit <ArrowUpRight />
        </Link>
      </div>
    </div>
  );
}

export default Error404;
