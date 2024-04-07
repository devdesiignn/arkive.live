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

  usePageTitle(thesis?.title);

  return (
    <div className="bg-white w-full min-h-screen py-12 flex items-center justify-center">
      <Card className="w-11/12 max-w-[800px] mx-auto">
        <CardHeader className="gap-2">
          <CardTitle className="text-xl sm:text-2xl">{thesis?.title}</CardTitle>
          <CardDescription className="flex items-center justify-between text-sm sm:text-base flex-wrap gap-2">
            <div className="flex items-center text-black">
              <HoverCard>
                <HoverCardTrigger>
                  <p className="font-medium sm:font-semibold text-base">
                    Author:{" "}
                    <span className="underline cursor-pointer">
                      {thesis?.author.fullName}
                    </span>
                  </p>
                </HoverCardTrigger>
                <HoverCardContent className="text-sm flex flex-col gap-2 w-fit font-medium max-w-[300px]">
                  <p>Author's Name: {thesis?.author.fullName}</p>
                  <p>
                    Author's Email:{" "}
                    <a
                      href={`mailto:${thesis?.author.email}`}
                      className="underline"
                    >
                      {thesis?.author.email}
                    </a>
                  </p>
                </HoverCardContent>
              </HoverCard>
            </div>

            <p>
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
          <div className="flex flex-col gap-1">
            {thesis?.abstract.split("\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="flex flex-wrap gap-1 mt-6">
            {thesis?.keywords.map((keyword, index) => {
              return <Badge key={index}>{keyword}</Badge>;
            })}
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
