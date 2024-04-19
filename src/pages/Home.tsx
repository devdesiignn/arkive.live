/* eslint-disable react-hooks/exhaustive-deps */
import Layout from "@/components/Layout";
import MainView from "@/components/MainView";
import usePageTitle from "@/hooks/usePageTitle";
import mockThesisData, { Thesis } from "@/mock/results";
import { ResearchProjectType } from "@/App";
import { supabase } from "@/utils/supabase";
import { ITEMS_PER_PAGE } from "@/utils/constants";

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

  currentPage: number;
  totalPages: number;
  fetchResearchProjects: (page: number) => Promise<void>;

  researchProjects: ResearchProjectType[] | null;
  setResearchProjects: React.Dispatch<
    React.SetStateAction<ResearchProjectType[] | null>
  >;
  loading: boolean;

  // Add more properties as needed
}

export const HomeContext = createContext<HomeContextType | null>(null);

function Home(): JSX.Element {
  usePageTitle("Home");

  const navigate = useNavigate();

  // GET SESSION
  const sessionData = localStorage.getItem("session");
  const session = sessionData ? JSON.parse(sessionData) : null;
  // console.log(session);

  // SEARCH SIDE
  const [searchParam, setSearchParam] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");

  // SEARCH SIDE
  const [bachelors, setBachelors] = useState<boolean | "indeterminate">(false);
  const [masters, setMasters] = useState<boolean | "indeterminate">(false);
  const [phd, setPhd] = useState<boolean | "indeterminate">(false);
  const [keywords, setKeywords] = useState<Tag[]>([]);
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2023, 0, 1),
    to: addDays(new Date(), 0),
  });

  // VIEW SIDE
  const [researchProjects, setResearchProjects] = useState<
    ResearchProjectType[] | null
  >(null);
  const [loading, setLoading] = useState<boolean>(true);

  // PAGINATION SIDE
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

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

  async function fetchResearchProjects(page: number): Promise<void> {
    if (page < 1 || page > totalPages) return;

    try {
      const from = (page - 1) * ITEMS_PER_PAGE;
      const to = page * ITEMS_PER_PAGE - 1;

      const { data, error, count } = await supabase
        .from("research-projects-table")
        .select("*", { count: "exact" })
        .range(from, to);

      if (error) {
        throw new Error(error.message);
      }

      // console.log("Data:Home", data);

      data && data.length > 0
        ? setResearchProjects(data)
        : setResearchProjects(null);

      count
        ? setTotalPages(Math.ceil(count / ITEMS_PER_PAGE))
        : setTotalPages(0);

      setCurrentPage(page);
    } catch (error) {
      console.error(error);
    } finally {
      // DISABLE LOADING SPINNER
      setLoading(false);
    }
  }

  // FETCH THE FIRST 10
  useEffect(() => {
    fetchResearchProjects(1);
  }, []);

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
        loading,

        currentPage,
        totalPages,
        fetchResearchProjects,
      }}
    >
      <Layout>
        <MainView />
      </Layout>
    </HomeContext.Provider>
  );
}

export default Home;
