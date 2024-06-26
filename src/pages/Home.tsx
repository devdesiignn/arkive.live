/* eslint-disable react-hooks/exhaustive-deps */
import Layout from "@/components/Layout";
import MainView from "@/components/MainView";
import usePageTitle from "@/hooks/usePageTitle";
// import mockThesisData from "@/mock/results";
import { ResearchProjectType } from "@/App";
import { supabase } from "@/utils/supabase";
import { ITEMS_PER_PAGE } from "@/utils/constants";
import { HomeContext } from "@/contexts/HomeContext";

import { useState, useEffect } from "react";
import { Tag } from "react-tag-input";
import { DateRange } from "react-day-picker";
import { useNavigate } from "react-router-dom";
import { getSessionFromLocalStorage } from "@/utils/localstorage";
import { useToast } from "@/components/ui/use-toast";

function Home(): JSX.Element {
  usePageTitle("Home");

  const navigate = useNavigate();
  const { toast } = useToast();

  // GET SESSION
  const sessionData = getSessionFromLocalStorage();
  const session = sessionData ? JSON.parse(sessionData) : null;
  // console.log(session);

  // SEARCH SIDE
  const [searchParam, setSearchParam] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");

  // SWITCH FOR DEFAULT FETCH / PARAM FETCH
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // SEARCH SIDE
  const [bachelors, setBachelors] = useState<boolean | "indeterminate">(false);
  const [masters, setMasters] = useState<boolean | "indeterminate">(false);
  const [phd, setPhd] = useState<boolean | "indeterminate">(false);
  const [keywords, setKeywords] = useState<Tag[]>([]);
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  // VIEW SIDE
  const [researchProjects, setResearchProjects] = useState<
    ResearchProjectType[] | null
  >(null);
  const [loading, setLoading] = useState<boolean>(true);

  // PAGINATION SIDE
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  function handleSearch(e: { preventDefault: () => void }): void {
    // Prevent full reload
    e.preventDefault();

    // HANDLE SEARCH SWITCH
    if (searchParam) setIsSearching(true);
  }

  async function fetchResearchProjects(
    page: number,
    sortBy: string,
    bachelors: boolean | string,
    masters: boolean | string,
    phd: boolean | string,
    keywords: Tag[],
    date: DateRange | undefined,
    searchParam: string,
    isSearching: boolean
  ): Promise<void> {
    if (page < 1 || page > totalPages) return;

    const from = (page - 1) * ITEMS_PER_PAGE;
    const to = page * ITEMS_PER_PAGE - 1;

    // SORT BY
    let order = undefined;
    if (sortBy === "newest") order = { ascending: false };
    else if (sortBy === "oldest") order = { ascending: true };

    // FILTER: DEGREE TYPE
    const degreeType: string[] = [];
    if (bachelors === true) degreeType.push("bachelors");
    if (masters === true) degreeType.push("masters");
    if (phd === true) degreeType.push("doctoral");

    // FILTER: KEYWORDS
    const keywordsArray =
      keywords?.map((keyword) => keyword.id.toLowerCase()) || [];
    // console.log(keywordsArray);

    // FILTER: PUBLICATION DATE
    const dateFrom = date?.from
      ? new Date(date.from.getTime() - date.from.getTimezoneOffset() * 60_000)
          .toISOString()
          .replace("T", " ")
          .replace("Z", "+00")
      : undefined;
    const dateTo = date?.to
      ? new Date(date.to.getTime() - date.to.getTimezoneOffset() * 60_000)
          .toISOString()
          .replace("T", " ")
          .replace("Z", "+00")
      : undefined;

    // DEFINING QUERY
    let query;

    searchParam && isSearching
      ? (query = supabase
          .rpc(
            "search_projects",
            {
              query: searchParam,
            },
            { count: "exact" }
          )
          .range(from, to)
          .order("date_uploaded", order))
      : (query = supabase
          .from("research-projects-table")
          .select("*", { count: "exact" })
          .range(from, to)
          .order("date_uploaded", order));

    if (degreeType && degreeType.length > 0)
      query = query.in("degree_type", degreeType);

    if (keywordsArray && keywordsArray.length > 0)
      query = query.overlaps("keywords", keywordsArray);

    if (dateFrom && dateTo)
      query = query.gte("date_uploaded", dateFrom).lte("date_uploaded", dateTo);

    // console.log(query);

    try {
      const { data, error, count } = await query;

      if (error) {
        throw new Error(error.message);
      }

      // console.log("Data:Home", data);
      // console.log("Count:Home", count);

      data && data.length > 0
        ? setResearchProjects(data)
        : setResearchProjects(null);

      count
        ? setTotalPages(Math.ceil(count / ITEMS_PER_PAGE))
        : setTotalPages(1);

      setCurrentPage(page);
    } catch (error) {
      // console.error(error);
      toast({
        title: "Something went Wrong!",
        description: "Please refresh and Try again.",
        variant: "destructive",
      });
    } finally {
      // DISABLE LOADING SPINNER
      setLoading(false);
    }
  }

  // FETCH THE FIRST 10
  useEffect(() => {
    fetchResearchProjects(
      1,
      sortBy,
      bachelors,
      masters,
      phd,
      keywords,
      date,
      searchParam,
      isSearching
    );
  }, [sortBy, bachelors, masters, phd, keywords, date, isSearching]);

  useEffect(() => {
    // If searchParam changes and it's not empty, set isSearching to false
    if (searchParam !== "") {
      setIsSearching(false);
    }
  }, [searchParam]);

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

        // mockThesisData,

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

        isSearching,
        setIsSearching,
      }}
    >
      <Layout>
        <MainView />
      </Layout>
    </HomeContext.Provider>
  );
}

export default Home;
