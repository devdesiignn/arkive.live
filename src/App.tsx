import { Toaster } from "@/components/ui/toaster";
import { createContext, useState, useEffect } from "react";
import { User, Session, AuthError } from "@supabase/supabase-js";

import AppRouter from "./routes";
import { Tables } from "@/utils/database";
import { supabase } from "./utils/supabase";

interface AppContextType {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  session: Session | null;
  setSession: React.Dispatch<React.SetStateAction<Session | null>>;
  researchProjects: ResearchProjectType[] | null;
  setResearchProjects: React.Dispatch<
    React.SetStateAction<ResearchProjectType[] | null>
  >;

  // Add more properties as needed
}

type ResearchProjectType = Tables<"research-projects-table">;

// const initialResearchProjects: ResearchProjectType[] = [
//   {
//     abstract: "Lorem ipsum...",
//     author_email: "author@example.com",
//     author_fullname: "John Doe",
//     coauthors: null,
//     date_uploaded: "2022-04-20",
//     degree_department: "Computer Science",
//     degree_faculty: "Faculty of Science",
//     degree_institution: "University of Example",
//     degree_program: "statistics",
//     degree_type: "masters",
//     document_url: "lkndlkdlsnlsdndlks",
//     id: "1",
//     keywords: [{}, {}],
//     title: "Example Research Project",
//     user_id: "123456",
//   },
//   {
//     abstract: "Lorem ipsum...",
//     author_email: "author@example.com",
//     author_fullname: "John Doe",
//     coauthors: null,
//     date_uploaded: "2022-04-20",
//     degree_department: "Computer Science",
//     degree_faculty: "Faculty of Science",
//     degree_institution: "University of Example",
//     degree_program: "statistics",
//     degree_type: "masters",
//     document_url: "lkndlkdlsnlsdndlks",
//     id: "2",
//     keywords: [
//       { id: "dummy", keyword: "dummy" },
//       { id: "dum", keyword: "dum" },
//     ],
//     title: "Example Research Project",
//     user_id: "123456",
//   },
// ];

export const AppContext = createContext<AppContextType | null>(null);

function App() {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [session, setSession] = useState<Session | null>(null);
  const [researchProjects, setResearchProjects] = useState<
    ResearchProjectType[] | null
  >(null);

  async function getUser(): Promise<void> {
    try {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        throw new AuthError(error.message, error.status);
      }

      setSession(data?.session);
      setUser(data.session?.user);

      // console.log("Data:App ", data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getUser();
    supabase.auth.onAuthStateChange((event) => {
      if (event === "USER_UPDATED") getUser();
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        session,
        setSession,
        researchProjects,
        setResearchProjects,
      }}
    >
      <div className="max-w-[1536px] mx-auto border-x-2">
        <AppRouter />
        <Toaster />
      </div>
    </AppContext.Provider>
  );
}

export default App;
