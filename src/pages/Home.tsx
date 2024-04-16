/* eslint-disable react-hooks/exhaustive-deps */
import Layout from "@/components/Layout";
import MainView from "@/components/MainView";
import usePageTitle from "@/hooks/usePageTitle";
import mockThesisData, { Thesis } from "@/mock/results";
import { supabase } from "@/utils/supabase";

import { createContext, useState, useEffect } from "react";
import { Tag } from "react-tag-input";
import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { CheckedState } from "@radix-ui/react-checkbox";
import { AuthError, User } from "@supabase/supabase-js";
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
  user: User | undefined;

  // Add more properties as needed
}

export const HomeContext = createContext<HomeContextType | null>(null);

function Home(): JSX.Element {
  usePageTitle("Home");

  const navigate = useNavigate();

  const [user, setUser] = useState<User | undefined>(undefined);

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

  async function getUser(): Promise<void> {
    try {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        throw new AuthError(error.message, error.status);
      }
      // console.log("Data:Home ", data);

      if (data && data?.session && data?.session.access_token) {
        navigate("/home");
        setUser(data.session?.user);
      } else {
        navigate("/auth/login");
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getUser();

    supabase.auth.onAuthStateChange((event) => {
      if (event === "USER_UPDATED") getUser();
    });
  }, [navigate]);

  function handleSearch(e: { preventDefault: () => void }): void {
    // Prevent full reload
    e.preventDefault();

    // search logic
  }

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
        user,
      }}
    >
      <Layout>
        <MainView />
      </Layout>
    </HomeContext.Provider>
  );
}

export default Home;
