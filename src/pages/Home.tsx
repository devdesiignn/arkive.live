/* eslint-disable react-hooks/exhaustive-deps */
import Layout from "@/components/Layout";
import MainView from "@/components/MainView";
import usePageTitle from "@/hooks/usePageTitle";
import mockThesisData, { Thesis } from "@/mock/results";
// import { supabase } from "@/utils/supabase";
import { AppContext } from "@/App";
import { Tables } from "@/utils/database";

import { createContext, useContext, useState, useEffect } from "react";
import { Tag } from "react-tag-input";
import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useNavigate } from "react-router-dom";

type ResearchProjectType = Tables<"research-projects-table">;

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

function Home(): JSX.Element {
  usePageTitle("Home");

  const navigate = useNavigate();
  const { researchProjects, setResearchProjects } = useContext(AppContext)!;

  const sessionData = sessionStorage.getItem("session");
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
