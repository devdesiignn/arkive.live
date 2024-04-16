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

import mockThesisData from "@/mock/results";

import handleDownload from "@/helper/fileDownloader";

function ViewProject(): JSX.Element {
  const { projectID } = useParams();

  const thesis = mockThesisData?.find(
    (mockThesis) => mockThesis.id === projectID
  );
  console.log(thesis);
  usePageTitle(thesis?.title);

  return (
    <div className="bg-white w-full min-h-screen py-12 flex items-center justify-center">
      <Card className="w-11/12 max-w-[800px] mx-auto">
        <CardHeader className="gap-2">
          <CardTitle className="text-xl sm:text-2xl">{thesis?.title}</CardTitle>
          <CardDescription className="flex items-start justify-between text-sm sm:text-base gap-2">
            <div className="flex items-center text-black flex-wrap gap-x-2 gap-y-1">
              <HoverCard>
                <HoverCardTrigger>
                  <p className="font-medium sm:font-semibold text-base">
                    Author(s):{" "}
                    <span className="underline cursor-pointer">
                      {thesis?.author.fullName}
                    </span>
                  </p>
                </HoverCardTrigger>
                <HoverCardContent className="text-sm flex flex-col gap-2 w-fit font-medium">
                  <p>{thesis?.author.fullName}</p>
                  <p>
                    <a
                      href={`mailto:${thesis?.author.email}`}
                      className="underline"
                    >
                      {thesis?.author.email}
                    </a>
                  </p>
                </HoverCardContent>
              </HoverCard>

              {thesis?.coAuthors.map((coAuthor, index) => {
                return (
                  <HoverCard key={index}>
                    <HoverCardTrigger>
                      <p className="font-medium sm:font-semibold text-base">
                        <span className="underline cursor-pointer">
                          {coAuthor?.fullName}
                        </span>
                      </p>
                    </HoverCardTrigger>
                    <HoverCardContent className="text-sm flex flex-col gap-2 w-fit font-medium">
                      <p>{coAuthor?.fullName}</p>
                      <p>
                        <a
                          href={`mailto:${coAuthor?.email}`}
                          className="underline"
                        >
                          {coAuthor?.email}
                        </a>
                      </p>
                    </HoverCardContent>
                  </HoverCard>
                );
              })}
            </div>

            <p className="shrink-0">
              Uploaded:{" "}
              {thesis?.metadata.dateUploaded.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-1 text-sm sm:text-base">
            {thesis?.abstract.split("\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="flex flex-wrap gap-1 mt-6">
            {thesis?.keywords.map((keyword) => (
              <Badge key={keyword.id}>{keyword.text}</Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="text-sm flex gap-2 px-6 py-3 font-semibold"
            onClick={() => {
              handleDownload({
                filePath: thesis?.documentUrl,
                fileName: thesis?.title,
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
