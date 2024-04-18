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
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { DownloadSimple } from "@phosphor-icons/react";

import usePageTitle from "@/hooks/usePageTitle";
import { useParams } from "react-router-dom";
import { useContext } from "react";

// import mockThesisData from "@/mock/results";
import handleDownload from "@/helper/fileDownloader";
import { AppContext } from "@/App";

function ViewProject(): JSX.Element {
  const { projectID } = useParams();

  const { researchProjects, user } = useContext(AppContext)!;

  console.log(researchProjects, user);

  const project = researchProjects?.find(
    (researchProject) => researchProject.id === projectID
  );
  console.log(project);
  usePageTitle(project?.title);

  return (
    <div className="bg-white w-full min-h-screen py-12 flex items-center justify-center">
      <Card className="w-11/12 max-w-[800px] mx-auto">
        <CardHeader className="gap-2">
          <CardTitle className="text-xl sm:text-2xl">
            {project?.title}
          </CardTitle>
          <CardDescription className="flex items-start justify-between text-sm sm:text-base gap-2">
            <div className="flex items-center text-black flex-wrap gap-x-2 gap-y-1">
              <HoverCard>
                <HoverCardTrigger>
                  <p className="font-medium sm:font-semibold text-base">
                    Author(s):{" "}
                    <span className="underline cursor-pointer">
                      {project?.author_fullname}
                    </span>
                  </p>
                </HoverCardTrigger>
                <HoverCardContent className="text-sm flex flex-col gap-2 w-fit font-medium">
                  <p>{project?.author_fullname}</p>
                  <p>
                    <a
                      href={`mailto:${project?.author_email}`}
                      className="underline"
                    >
                      {project?.author_email}
                    </a>
                  </p>
                </HoverCardContent>
              </HoverCard>

              {project?.coauthors?.map((coAuthor, index) => {
                return (
                  <p
                    key={index}
                    className="font-medium sm:font-semibold text-base"
                  >
                    {(coAuthor as { "co-author": string })["co-author"]}
                  </p>
                );
              })}
            </div>

            <p className="shrink-0">
              Uploaded:{" "}
              {project?.date_uploaded
                ? new Date(project.date_uploaded).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })
                : ""}
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-1 text-sm sm:text-base">
            {project?.abstract.split("\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="flex flex-wrap gap-1 mt-6">
            {project?.keywords.map((keyword, index) => (
              <Badge key={index}>
                {(keyword as { keyword?: string }).keyword}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="text-sm flex gap-2 px-6 py-3 font-semibold"
            onClick={() => {
              handleDownload({
                filePath: project?.document_url,
                fileName: project?.title,
              });
            }}
          >
            Download
            <DownloadSimple weight="bold" size={20} />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ViewProject;
