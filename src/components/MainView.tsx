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
import { Skeleton } from "@/components/ui/skeleton";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { DownloadSimple, UploadSimple } from "@phosphor-icons/react";

import handleDownload from "@/helper/fileDownloader";
import { HomeContext } from "@/pages/Home";
import NoResults from "@/assets/no_results.webp";
import { ResearchProjectType } from "@/App";
import { ITEMS_PER_PAGE } from "@/utils/constants";

interface ResultsViewProps {
  researchProjects: ResearchProjectType[] | null;
}

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

      <Button className="font-medium w-full sm:w-fit">
        <Link to="/project/upload" className="p-4 flex items-center gap-2 ">
          <UploadSimple weight="bold" size={20} />
          <span className="hidden sm:block">Upload your Research Project</span>
          <span className="sm:hidden">Upload your Project</span>
        </Link>
      </Button>
    </div>
  );
}

function View({ researchProjects }: ResultsViewProps): JSX.Element | null {
  return (
    researchProjects && (
      <div className="grid grid-cols-1 gap-4">
        {researchProjects.map((researchProject) => (
          <Card key={researchProject.id}>
            <CardHeader className="gap-4">
              <CardTitle className="hover:underline text-xl sm:text-2xl">
                <Link
                  to={`/projects/${researchProject.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {researchProject.title}
                </Link>
              </CardTitle>
              <CardDescription className="flex flex-wrap gap-1">
                {researchProject.keywords.map((keyword, index) => (
                  <Badge key={index}>
                    {(keyword as { keyword?: string }).keyword}
                  </Badge>
                ))}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm sm:text-base">
                {researchProject.abstract.split("\n\n")[0]}
              </p>
            </CardContent>
            <CardFooter>
              <Button
                className="text-xs sm:text-sm flex gap-2 px-6 py-3 font-semibold"
                onClick={() => {
                  handleDownload({
                    filePath: researchProject.document_url,
                    fileName: researchProject.title,
                  });
                }}
              >
                Download
                <DownloadSimple weight="bold" size={20} />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  );
}

function ResultsView({ researchProjects }: ResultsViewProps): JSX.Element {
  const { loading } = useContext(HomeContext)!;

  return loading ? (
    <div className="flex flex-col gap-6">
      {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => {
        return <Skeleton className="h-16" key={index} />;
      })}
    </div>
  ) : researchProjects && researchProjects.length > 0 ? (
    <View researchProjects={researchProjects} />
  ) : (
    <div className="flex flex-col justify-center items-center gap-4 py-4">
      <img
        src={NoResults}
        alt="No Results"
        className="w-48 h-48 sm:w-52 sm:h-52"
      />
      <p className="text-lg sm:text-xl font-semibold text-center">
        No research projects available.
      </p>
    </div>
  );
}

function PaginationView(): JSX.Element {
  const {
    currentPage,
    totalPages,
    fetchResearchProjects,
    sortBy,
    bachelors,
    masters,
    phd,
  } = useContext(HomeContext)!;

  return (
    <div className="w-full flex items-center justify-between mx-auto sm:px-4 md:px-8 text-sm mt-auto">
      <p className="hidden sm:block">
        Showing{" "}
        <span className="font-medium">
          {currentPage.toString().padStart(2, "0")}
        </span>{" "}
        of
        <span className="font-medium">
          {" "}
          {totalPages.toString().padStart(2, "0")}
        </span>
      </p>

      <div className="w-full sm:w-fit">
        <Pagination>
          <PaginationContent className="w-full justify-between">
            <PaginationItem>
              <PaginationPrevious
                onClick={() =>
                  fetchResearchProjects(
                    currentPage - 1,
                    sortBy,
                    bachelors,
                    masters,
                    phd
                  )
                }
                isActive={currentPage > 1}
              />
            </PaginationItem>

            <div className="hidden sm:flex flex-row items-center gap-1">
              <PaginationItem>
                <PaginationLink
                  onClick={() =>
                    fetchResearchProjects(1, sortBy, bachelors, masters, phd)
                  }
                  isActive={currentPage === 1}
                >
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  onClick={() =>
                    fetchResearchProjects(2, sortBy, bachelors, masters, phd)
                  }
                  isActive={currentPage === 2}
                >
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  onClick={() =>
                    fetchResearchProjects(3, sortBy, bachelors, masters, phd)
                  }
                  isActive={currentPage === 3}
                >
                  3
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            </div>
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  fetchResearchProjects(
                    currentPage + 1,
                    sortBy,
                    bachelors,
                    masters,
                    phd
                  )
                }
                isActive={currentPage < totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

function MainView(): JSX.Element {
  // const { mockThesisData } = useContext(HomeContext)!;
  // console.log(mockThesisData)

  const { researchProjects } = useContext(HomeContext)!;
  // console.log(researchProjects);

  return (
    <>
      <TopbarView />

      <ResultsView researchProjects={researchProjects} />

      {researchProjects && researchProjects.length > 0 ? (
        <PaginationView />
      ) : null}
    </>
  );
}

export default MainView;
