/* eslint-disable react-hooks/exhaustive-deps */
import Layout from "@/components/Layout";
import MainView from "@/components/MainView";
import usePageTitle from "@/hooks/usePageTitle";
import mockThesisData, { Thesis } from "@/mock/results";
import { ResearchProjectType } from "@/App";
// import { supabase } from "@/utils/supabase";

import { createContext, useState, useEffect } from "react";
import { Tag } from "react-tag-input";
import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useNavigate } from "react-router-dom";

interface HomeContextType {
  searchParam: string;
  setSearchParam: React.Dispatch<React.SetStateAction<string>>;
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement>
      | React.FormEvent<HTMLButtonElement>
  ) => void;
  mockThesisData: Thesis[];
  bachelors: CheckedState;
  setBachelors: React.Dispatch<React.SetStateAction<CheckedState>>;
  masters: CheckedState;
  setMasters: React.Dispatch<React.SetStateAction<CheckedState>>;
  phd: CheckedState;
  setPhd: React.Dispatch<React.SetStateAction<CheckedState>>;
  keywords: Tag[];
  setKeywords: React.Dispatch<React.SetStateAction<Tag[]>>;
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;

  // FROM APPCONTEXT
  researchProjects: ResearchProjectType[] | null;
  setResearchProjects: React.Dispatch<
    React.SetStateAction<ResearchProjectType[] | null>
  >;

  // Add more properties as needed
}

export const HomeContext = createContext<HomeContextType | null>(null);

const initialResearchProjects: ResearchProjectType[] = [
  {
    abstract: "Lorem ipsum...",
    author_email: "author@example.com",
    author_fullname: "John Doe",
    coauthors: null,
    date_uploaded: "2022-04-20",
    degree_department: "Computer Science",
    degree_faculty: "Faculty of Science",
    degree_institution: "University of Example",
    degree_program: "statistics",
    degree_type: "masters",
    document_url: "youtube.com",
    id: "1",
    keywords: [
      { id: "dummy", keyword: "dummy" },
      { id: "dum", keyword: "dum" },
    ],
    title: "Example Research Project",
    user_id: "123456",
  },
];

function Home(): JSX.Element {
  usePageTitle("Home");

  const [researchProjects, setResearchProjects] = useState<
    ResearchProjectType[] | null
  >(initialResearchProjects);

  const navigate = useNavigate();

  // GET SESSION
  const sessionData = localStorage.getItem("session");
  const session = sessionData ? JSON.parse(sessionData) : null;
  // console.log(session);

  const [searchParam, setSearchParam] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");

  // Filter Side
  const [bachelors, setBachelors] = useState<boolean | "indeterminate">(false);
  const [masters, setMasters] = useState<boolean | "indeterminate">(false);
  const [phd, setPhd] = useState<boolean | "indeterminate">(false);
  const [keywords, setKeywords] = useState<Tag[]>([]);
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2023, 0, 1),
    to: addDays(new Date(), 0),
  });

  // console.log("Sort By", sortBy);
  // console.log("Search Param", searchParam);
  // console.log("Mock Thesis Data", mockThesisData);
  // console.log("Bachelors", bachelors, "Masters", masters, "PhD", phd);
  // console.log("Keywords", keywords);
  // console.log("Date", date);

  function handleSearch(e: { preventDefault: () => void }): void {
    // Prevent full reload
    e.preventDefault();

    // search logic
  }

  useEffect(() => {
    session && session?.access_token
      ? navigate("/home")
      : navigate("/auth/login");
  }, [navigate]);

  return (
    <HomeContext.Provider
      value={{
        searchParam,
        setSearchParam,
        sortBy,
        setSortBy,
        handleSearch,
        mockThesisData,
        bachelors,
        setBachelors,
        masters,
        setMasters,
        phd,
        setPhd,
        keywords,
        setKeywords,
        date,
        setDate,
        researchProjects,
        setResearchProjects,
      }}
    >
      <Layout>
        <MainView />
      </Layout>
    </HomeContext.Provider>
  );
}

export default Home;
