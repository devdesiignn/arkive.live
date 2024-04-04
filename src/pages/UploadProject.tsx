import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Info, SpinnerGap } from "@phosphor-icons/react";

import { useState, useEffect } from "react";

import usePageTitle from "@/hooks/usePageTitle";

function UploadProject(): JSX.Element {
  usePageTitle("Upload");

  const { toast } = useToast();

  const [submit, setSubmit] = useState(false);
  const [next, setNext] = useState(false);

  function handleSubmit(
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement>
      | React.FormEvent<HTMLButtonElement>
  ) {
    // Prevent full reload
    e.preventDefault();

    // disable submit button
    setSubmit(true);

    // Sign Up logic

    // Average time to sign up
    setTimeout(() => setSubmit(false), 5000);
  }

  // UPLOAD SUCCESS
  useEffect(() => {
    toast({
      title: "Upload Successful",
      description:
        "Your Research Project has been successfully uploaded. Thank you for contributing to our archive! If you have any questions or need further assistance, please feel free to contact us.",
    });
  }, [toast]);

  // UPLOAD FAILED
  useEffect(() => {
    toast({
      title: "Upload Failed",
      description:
        "We're sorry, but there was an issue with uploading your Research Project. Please double-check your file and try again. We apologize for any inconvenience.",
      variant: "destructive",
    });
  }, [toast]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center py-8">
      <Card className="w-11/12 max-w-[600px] mx-auto">
        <CardHeader className="gap-4">
          <CardTitle>Upload your Research Project</CardTitle>
          <CardDescription>
            {next
              ? "This is where you can provide detailed information about the author (yourself)."
              : "This is where you can provide detailed information about your research project."}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            {next ? (
              <>
                <div className="flex flex-col gap-2 mb-4">
                  <Label htmlFor="author">Author Name</Label>
                  <Input
                    type="text"
                    value="Muiz Haruna"
                    id="author"
                    readOnly={true}
                    disabled={true}
                    required
                  ></Input>
                </div>

                <div className="flex flex-col gap-2 mb-4">
                  <Label htmlFor="degreeType">Degree Type</Label>
                  <Select>
                    <SelectTrigger className="ring-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                      <SelectValue placeholder="Degree Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bachelors">
                        Bachelor's Degree
                      </SelectItem>
                      <SelectItem value="masters">Master's Degree</SelectItem>
                      <SelectItem value="doctoral">Doctoral Degree</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-2 mb-4">
                  <Label htmlFor="program">Degree Program</Label>
                  <Input
                    type="text"
                    placeholder="e.g. Computer Science"
                    id="program"
                    required
                  ></Input>
                </div>

                <div className="flex flex-col gap-2 mb-4">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    type="text"
                    placeholder="e.g. Department of Computer Science"
                    id="department"
                    required
                  ></Input>
                </div>

                <div className="flex flex-col gap-2 mb-4">
                  <Label htmlFor="faculty">Faculty</Label>
                  <Input
                    type="text"
                    placeholder="e.g. Faculty of Communication and Information Sciences"
                    id="faculty"
                    required
                  ></Input>
                </div>

                <div className="flex flex-col gap-2 mb-4">
                  <Label htmlFor="institution">Institution</Label>
                  <Input
                    type="text"
                    placeholder="e.g. University of Ilorin"
                    id="institution"
                    required
                  ></Input>
                </div>

                <div className="mt-10">
                  <Button type="submit" className="w-full" disabled={submit}>
                    {submit ? (
                      <SpinnerGap
                        className="h-6 w-6 animate-spin"
                        weight="bold"
                      />
                    ) : (
                      "Upload"
                    )}
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col gap-2 mb-4">
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    type="text"
                    placeholder="Project Title"
                    id="title"
                    required
                  ></Input>
                </div>

                <div className="flex flex-col gap-2 mb-4">
                  <Label htmlFor="keywords">
                    Keywords{" "}
                    <span className="font-normal text-gray-500">
                      (separate with spaces)
                    </span>
                  </Label>
                  <Input
                    type="text"
                    placeholder="Keywords"
                    id="keywords"
                    required
                  ></Input>
                </div>

                <div className="flex flex-col gap-2 mb-4">
                  <Label htmlFor="abstract">Abstract</Label>
                  <Textarea
                    className="min-h-[160px]"
                    placeholder="e.g. In this thesis, the application of machine learning algorithms in image recognition tasks is thoroughly investigated. With the increasing prevalence of digital imagery in various fields, the need for accurate and efficient image recognition systems has become paramount."
                    id="abstract"
                    required
                  ></Textarea>
                </div>

                <div className="flex flex-col gap-2 mb-4">
                  <Label htmlFor="file">Project File</Label>
                  <Input type="file" accept="pdf" required></Input>
                  <p className="text-sm text-gray-500 flex gap-1 items-center">
                    <Info weight="fill" /> Acceptable format (PDF)*
                  </p>
                </div>

                <div className="mt-10">
                  <Button className="w-full" onClick={() => setNext(true)}>
                    Next
                  </Button>
                </div>
              </>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default UploadProject;
