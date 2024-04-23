/* eslint-disable react-hooks/exhaustive-deps */
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
import { Skeleton } from "@/components/ui/skeleton";

import { DownloadSimple } from "@phosphor-icons/react";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import usePageTitle from "@/hooks/usePageTitle";
import handleDownload from "@/helper/fileDownloader";
import { supabase } from "@/utils/supabase";
import { ResearchProjectType } from "@/App";
import NoResults from "@/assets/no_results.webp";

function View({
  project,
}: {
  project: ResearchProjectType | null;
}): JSX.Element {
  return (
    <Card className="w-11/12 max-w-[800px] mx-auto">
      <CardHeader className="gap-2 relative">
        <Badge className="w-fit sm:absolute sm:self-end hover:bg-black">
          {project?.degree_type &&
            project.degree_type.charAt(0).toUpperCase() +
              project.degree_type.slice(1)}
        </Badge>

        <CardTitle className="text-xl sm:text-2xl">{project?.title}</CardTitle>
        <CardDescription className="flex items-start justify-between text-sm sm:text-base gap-2 flex-wrap">
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

            {project?.coauthors?.map((coAuthor, index) => (
              <p key={index} className="font-medium sm:font-semibold text-base">
                {(coAuthor as { "co-author": string })["co-author"]}
              </p>
            ))}
          </div>

          <p className="shrink sm:shrink-0">
            Uploaded:{" "}
            {project?.date_uploaded
              ? new Date(project?.date_uploaded).toLocaleDateString("en-GB", {
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
  );
}

function ViewProject(): JSX.Element {
  const { projectID } = useParams();

  const [loading, setLoading] = useState<boolean>(true);
  const [project, setProject] = useState<ResearchProjectType | null>(null);

  usePageTitle(project?.title);

  useEffect(() => {
    (async function (): Promise<void> {
      try {
        const { data, error } = await supabase
          .from("research-projects-table")
          .select()
          .eq("id", `${projectID}`)
          .single();

        if (error) {
          throw new Error(error.message);
        }

        // console.log("Data:View", data);

        data ? setProject(data) : setProject(null);
      } catch (error) {
        console.error(error);

        // ADD TOAST
      } finally {
        // DISABLE LOADING SPINNER
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="bg-white w-full min-h-screen py-12 flex items-center justify-center">
      {loading ? (
        <div className="flex flex-col gap-4 w-11/12 max-w-[800px] mx-auto">
          <Skeleton className="h-12" />
          <Skeleton className="h-16" />
          <Skeleton className="h-48" />
        </div>
      ) : project ? (
        <View project={project} />
      ) : (
        <div className="flex flex-col justify-center items-center gap-4 py-4 w-11/12 max-w-[800px] mx-auto">
          <img
            src={NoResults}
            alt="No Results"
            className="w-48 h-48 sm:w-52 sm:h-52"
          />
          <p className="text-lg sm:text-xl font-semibold text-center">
            Sorry, the requested research project is currently unavailable.
          </p>
        </div>
      )}
    </div>
  );
}

export default ViewProject;
