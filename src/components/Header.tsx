import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function Header(): JSX.Element {
  return (
    <header className="flex justify-between items-center px-8 py-2 border-b sticky top-0 z-10 bg-white">
      <div className="font-medium">Placeholder</div>

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
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>MH</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}

export default Header;
