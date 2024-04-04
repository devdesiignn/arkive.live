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
import { Link } from "react-router-dom";
import { DownloadSimple, UploadSimple } from "@phosphor-icons/react";

import mockThesisData from "@/mock/results";
import handleDownload from "@/helper/fileDownloader";

// console.log(mockThesisData);

function TopbarView(): JSX.Element {
  return (
    <div className="p-2 bg-white border rounded-lg flex justify-between items-center text-sm">
      <div className="flex gap-2 items-center basis-1/3">
        <p className="shrink-0">Sort By:</p>

        <Select>
          <SelectTrigger className="ring-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0">
            <SelectValue placeholder="Default" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button className="p-4 font-medium">
        <Link to="/project/upload" className="flex items-center gap-2 ">
          <UploadSimple weight="bold" size={20} />
          Upload your Research Project
        </Link>
      </Button>
    </div>
  );
}

function ResultsView(): JSX.Element {
  return (
    <div className="grid grid-cols-1 gap-4">
      {mockThesisData?.map((mockThesis) => {
        return (
          <Card key={mockThesis.id}>
            <CardHeader className="gap-4">
              <CardTitle className="hover:underline">
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
              <p>{mockThesis.abstract.split("\n\n")[0]}</p>
            </CardContent>
            <CardFooter>
              <Button
                className="text-sm flex gap-2 px-6 py-3 font-semibold"
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
    <div className="w-full flex items-center justify-between mx-auto px-8 py-2 text-sm mt-auto">
      <p>
        Showing <span className="font-medium">1</span> of 20
      </p>

      <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
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
