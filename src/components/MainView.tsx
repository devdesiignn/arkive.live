import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { DownloadSimple, UploadSimple } from "@phosphor-icons/react";

import handleDownload from "@/helper/fileDownloader";
import { HomeContext } from "@/pages/Home";

// console.log(mockThesisData);

function TopbarView(): JSX.Element {
  const { setSortBy } = useContext(HomeContext)!;

  return (
    <div className="p-2 bg-white border rounded-lg flex justify-between items-center text-sm flex-wrap sm:flex-nowrap gap-4">
      <div className="flex gap-2 items-center w-full sm:basis-1/2 md:basis-1/3">
        <p className="shrink-0">Sort By:</p>

        <Select onValueChange={(value) => setSortBy(value)}>
          <SelectTrigger className="ring-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0">
            <SelectValue placeholder="Default" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button className="p-4 font-medium w-full sm:w-fit">
        <Link to="/project/upload" className="flex items-center gap-2 ">
          <UploadSimple weight="bold" size={20} />
          <span className="hidden sm:block">Upload your Research Project</span>
          <span className="sm:hidden">Upload your Project</span>
        </Link>
      </Button>
    </div>
  );
}

function ResultsView(): JSX.Element {
  const { mockThesisData } = useContext(HomeContext)!;

  return (
    <div className="grid grid-cols-1 gap-4">
      {mockThesisData?.map((mockThesis) => {
        return (
          <Card key={mockThesis.id}>
            <CardHeader className="gap-4">
              <CardTitle className="hover:underline text-xl sm:text-2xl">
                <Link
                  to={`/projects/${mockThesis.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {mockThesis.title}
                </Link>
              </CardTitle>
              <CardDescription className="flex flex-wrap gap-1">
                {mockThesis.keywords.map((keyword, index) => {
                  return <Badge key={index}>{keyword}</Badge>;
                })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm sm:text-base">
                {mockThesis.abstract.split("\n\n")[0]}
              </p>
            </CardContent>
            <CardFooter>
              <Button
                className="text-xs sm:text-sm flex gap-2 px-6 py-3 font-semibold"
                onClick={() => {
                  handleDownload({
                    filePath: mockThesis.documentUrl,
                    fileName: mockThesis.title,
                  });
                }}
              >
                Download
                <DownloadSimple weight="bold" size={20} />
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}

function PaginationView(): JSX.Element {
  return (
    <div className="w-full flex items-center justify-between mx-auto sm:px-4 md:px-8 text-sm mt-auto">
      <p className="hidden sm:block">
        Showing <span className="font-medium">01</span> of 20
      </p>

      <div className="w-full sm:w-fit">
        <Pagination>
          <PaginationContent className="w-full justify-between">
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>

            <div className="hidden sm:flex flex-row items-center gap-1">
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            </div>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

function MainView(): JSX.Element {
  return (
    <>
      <TopbarView />

      <ResultsView />

      <PaginationView />
    </>
  );
}

export default MainView;
