import Layout from "@/components/Layout";
import MainView from "@/components/MainView";
import usePageTitle from "@/hooks/usePageTitle";
import mockThesisData, { Thesis } from "@/mock/results";

import { createContext, useState } from "react";
import { Tag } from "react-tag-input";
import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { CheckedState } from "@radix-ui/react-checkbox";

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
  // Add more properties as needed
}

export const HomeContext = createContext<HomeContextType | null>(null);

function Home(): JSX.Element {
  usePageTitle("Home");

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

  console.log("Sort By", sortBy);
  console.log("Search Param", searchParam);
  console.log("Mock Thesis Data", mockThesisData);
  console.log("Bachelors", bachelors, "Masters", masters, "PhD", phd);
  console.log("Keywords", keywords);
  console.log("Date", date);

  function handleSearch(e: { preventDefault: () => void }): void {
    // Prevent full reload
    e.preventDefault();

    // search logic
  }

  return (
    <HomeContext.Provider
      value={{
        searchParam: searchParam,
        setSearchParam: setSearchParam,
        sortBy: sortBy,
        setSortBy: setSortBy,
        handleSearch: handleSearch,
        mockThesisData: mockThesisData,
        bachelors: bachelors,
        setBachelors: setBachelors,
        masters: masters,
        setMasters: setMasters,
        phd: phd,
        setPhd: setPhd,
        keywords: keywords,
        setKeywords: setKeywords,
        date: date,
        setDate: setDate,
      }}
    >
      <Layout>
        <MainView />
      </Layout>
    </HomeContext.Provider>
  );
}

export default Home;
