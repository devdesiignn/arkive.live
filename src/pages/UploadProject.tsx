/* eslint-disable react-hooks/exhaustive-deps */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
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
import { Separator } from "@/components/ui/separator";

import { Info, SpinnerGap } from "@phosphor-icons/react";

import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthError, User } from "@supabase/supabase-js";
import { StorageError } from "@supabase/storage-js";

import { Tag } from "react-tag-input";

import KeywordInput from "@/components/KeywordInput";
import usePageTitle from "@/hooks/usePageTitle";
import { uploadFile } from "@/helper/fileUploader";
import { supabase } from "@/utils/supabase";

function UploadProject(): JSX.Element {
  usePageTitle("Upload");

  const { toast } = useToast();
  const navigate = useNavigate();

  const [user, setUser] = useState<User | undefined>(undefined);
  console.log(user);

  const [submit, setSubmit] = useState(false);
  const [next, setNext] = useState(false);

  // ENTRIES
  const [title, setTitle] = useState<string>("");
  const [keywords, setKeywords] = useState<Tag[]>([]);
  const [abstract, setAbstract] = useState<string>("");
  const [projectFile, setProjectFile] = useState<File | null>(null);

  const [coAuthors, setCoAuthors] = useState<Tag[]>([]);
  const [degreeType, setDegreeType] = useState<string>("");
  const [degreeProgram, setDegreeProgram] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [faculty, setFaculty] = useState<string>("");
  const [institution, setInstitution] = useState<string>("");

  function handleFileSelection(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }

    const selectedFile = event.target.files[0];
    const fileSizeInBytes = selectedFile.size;
    const fileSizeInMB = fileSizeInBytes / (1024 * 1024);

    // Check if the file size exceeds 5MB
    if (fileSizeInMB > 5) {
      event.target.value = "";

      toast({
        title: "File Size Exceeded",
        description:
          "We apologize, but the file size exceeds the allowed limit for uploading your research project. Please check your file size and try again. We regret any inconvenience this may cause.",
        variant: "destructive",
      });

      return;
    }

    setProjectFile(selectedFile);
  }

  async function handleSubmit(
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement>
      | React.FormEvent<HTMLButtonElement>
  ): Promise<void> {
    // Prevent full reload
    e.preventDefault();

    if (keywords.length < 3) {
      toast({
        title: "Minimum Keyword Length",
        description: "Please enter at least 3 keywords.",
        variant: "destructive",
      });
    }

    if (
      !title ||
      keywords.length < 3 ||
      !abstract ||
      !degreeType ||
      !degreeProgram ||
      !department ||
      !faculty ||
      !institution
    ) {
      return;
    }

    try {
      setSubmit(true);

      const FileUrlorError = await uploadFile(projectFile);
      // console.log(FileUrlorError?.data);

      if (!FileUrlorError.status) {
        throw new StorageError(`${FileUrlorError.error}`);
      }

      const payload: object = {
        title,
        abstract,
        keywords,
        degree_type: degreeType,
        degree_program: degreeProgram,
        degree_department: department,
        degree_faculty: faculty,
        document_url: FileUrlorError.data?.fullPath,
        author_fullname: `${user?.user_metadata.firstName} ${user?.user_metadata.lastName}`,
        author_email: user?.email,
        degree_institution: institution,
        coauthors: coAuthors,
      };

      // UPLOAD LOGIC
      const { error } = await supabase
        .from("research-projects-table")
        .insert(payload);

      if (error) {
        throw new Error(error.message);
      }

      // UPLOAD SUCCESS
      toast({
        title: "Upload Successful",
        description:
          "Your Research Project has been successfully uploaded. Thank you for contributing to our archive! If you have any questions or need further assistance, please feel free to contact us.",
      });

      // CLEAR INPUTS
      setTitle("");
      setKeywords([]);
      setAbstract("");
      setProjectFile(null);
      setCoAuthors([]);
      setDegreeType("");
      setDegreeProgram("");
      setDepartment("");
      setFaculty("");
      setInstitution("");

      // NAVIGATE TO HOME
      navigate("/home");
    } catch (error) {
      console.error(error);

      // UPLOAD FAILED
      toast({
        title: "Upload Failed",
        description:
          "We're sorry, but there was an issue with uploading your Research Project. Please double-check your file and try again. We apologize for any inconvenience.",
        variant: "destructive",
      });
    } finally {
      // disable submit button
      setSubmit(false);
    }
  }

  useEffect(() => {
    (async function getUser(): Promise<void> {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          throw new AuthError(error.message, error.status);
        }
        // console.log("Data:Home ", data);

        if (data && data?.session && data?.session.access_token) {
          setUser(data.session?.user);
        } else {
          navigate("/auth/login");
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [navigate]);

  return (
    <div className="bg-white w-full min-h-screen py-12 flex items-center justify-center ">
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
                    className="disabled:opacity-80"
                    type="text"
                    value={`${user?.user_metadata.firstName} ${user?.user_metadata.lastName}`}
                    id="author"
                    readOnly={true}
                    disabled={true}
                    required
                  ></Input>
                </div>

                <div className="flex flex-col gap-2 mb-4">
                  <Label htmlFor="keywords">
                    Co-Authors' Name(s){" "}
                    <span className="font-normal text-gray-500">
                      (separate with comma)
                    </span>
                  </Label>
                  <KeywordInput
                    tags={coAuthors}
                    setTags={setCoAuthors}
                    inputFieldPosition="top"
                    allowDragDrop={false}
                    labelField="co-author"
                    placeholder="Co-Authors' Name(s)"
                    id="co-authors"
                    classNames={{
                      tagInputField:
                        "flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300 mb-2",
                      tag: "px-2 py-1 rounded bg-black text-white flex items-center gap-1 text-sm",
                      selected: "flex gap-1 flex-wrap",
                    }}
                  />
                </div>

                <div className="flex flex-col gap-2 mb-4">
                  <Label htmlFor="degreeType">Degree Type</Label>
                  <Select
                    onValueChange={(value) => setDegreeType(value)}
                    required={true}
                  >
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
                    value={degreeProgram}
                    onChange={(event) => setDegreeProgram(event.target.value)}
                  ></Input>
                </div>

                <div className="flex flex-col gap-2 mb-4">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    type="text"
                    placeholder="e.g. Department of Computer Science"
                    id="department"
                    required
                    value={department}
                    onChange={(event) => setDepartment(event.target.value)}
                  ></Input>
                </div>

                <div className="flex flex-col gap-2 mb-4">
                  <Label htmlFor="faculty">Faculty</Label>
                  <Input
                    type="text"
                    placeholder="e.g. Faculty of Communication and Information Sciences"
                    id="faculty"
                    required
                    value={faculty}
                    onChange={(event) => setFaculty(event.target.value)}
                  ></Input>
                </div>

                <div className="flex flex-col gap-2 mb-4">
                  <Label htmlFor="institution">Institution</Label>
                  <Input
                    type="text"
                    placeholder="e.g. University of Ilorin"
                    id="institution"
                    required
                    value={institution}
                    onChange={(event) => setInstitution(event.target.value)}
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
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                  ></Input>
                </div>

                <div className="flex flex-col gap-2 mb-4">
                  <Label htmlFor="keywords">
                    Keywords{" "}
                    <span className="font-normal text-gray-500">
                      (separate with comma)
                    </span>
                  </Label>
                  <KeywordInput
                    tags={keywords}
                    setTags={setKeywords}
                    inputFieldPosition="top"
                    allowDragDrop={false}
                    labelField="keyword"
                    allowUnique={true}
                    placeholder="Keywords, min. 3, max. 10"
                    minTags={3}
                    maxTags={10}
                    id="keywords"
                    classNames={{
                      tagInputField:
                        "flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300 mb-2",
                      tag: "px-2 py-1 rounded bg-black text-white flex items-center gap-1 text-sm",
                      selected: "flex gap-1 flex-wrap",
                    }}
                  />
                </div>

                <div className="flex flex-col gap-2 mb-4">
                  <Label htmlFor="abstract">Abstract</Label>
                  <Textarea
                    className="min-h-[160px]"
                    placeholder="e.g. In this thesis, the application of machine learning algorithms in image recognition tasks is thoroughly investigated."
                    id="abstract"
                    required
                    value={abstract}
                    onChange={(event) => setAbstract(event.target.value)}
                  ></Textarea>
                </div>

                <div className="flex flex-col gap-2 mb-4">
                  <Label htmlFor="file">Project File</Label>
                  <Input
                    type="file"
                    accept=".pdf"
                    required
                    onChange={handleFileSelection}
                  ></Input>
                  <p className="text-sm text-gray-500 flex gap-1 items-center">
                    <Info weight="fill" /> Acceptable format (PDF)*
                  </p>
                </div>

                <div className="mt-10">
                  <Button
                    className="w-full"
                    onClick={() => {
                      if (
                        !title ||
                        keywords.length < 3 ||
                        !abstract ||
                        !projectFile
                      ) {
                        return;
                      }

                      setNext(true);
                    }}
                  >
                    Next
                  </Button>
                </div>
              </>
            )}
          </form>
        </CardContent>

        <Separator />

        <CardFooter className="justify-center pt-6">
          <p className="text-center text-sm">
            Not doing this again?{" "}
            <Link to="/home" className="text-sm underline">
              Back to Home
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default UploadProject;
