import { createContext } from "react";
import { ResearchProjectType } from "@/App";
import { Tag } from "react-tag-input";
import { DateRange } from "react-day-picker";
import { CheckedState } from "@radix-ui/react-checkbox";
// import { Thesis } from "@/mock/results";

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

  // mockThesisData: Thesis[];

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
  fetchResearchProjects: (
    page: number,
    sortBy: string,
    bachelors: boolean | string,
    masters: boolean | string,
    phd: boolean | string,
    keywords: Tag[],
    date: DateRange | undefined,
    searchParam: string,
    isSearching: boolean
  ) => Promise<void>;

  researchProjects: ResearchProjectType[] | null;
  setResearchProjects: React.Dispatch<
    React.SetStateAction<ResearchProjectType[] | null>
  >;
  loading: boolean;

  isSearching: boolean;
  setIsSearching: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  // Add more properties as needed
}

export const HomeContext = createContext<HomeContextType | null>(null);
