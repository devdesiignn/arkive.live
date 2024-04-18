import { Toaster } from "@/components/ui/toaster";
import { AuthError } from "@supabase/supabase-js";

import AppRouter from "./routes";
import { Tables } from "@/utils/database";
import { supabase } from "./utils/supabase";

export type ResearchProjectType = Tables<"research-projects-table">;

function App() {
  async function getUser(): Promise<void> {
    try {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        throw new AuthError(error.message, error.status);
      }

      // SET USER
      sessionStorage.setItem("session", JSON.stringify(data?.session));
      sessionStorage.setItem("user", JSON.stringify(data?.session?.user));

      // console.log("Data:App ", data);
    } catch (error) {
      console.error(error);
    }
  }

  supabase.auth.onAuthStateChange((event) => {
    if (event === "USER_UPDATED") getUser();
  });

  return (
    <div className="max-w-[1536px] mx-auto border-x-2">
      <AppRouter />
      <Toaster />
    </div>
  );
}

export default App;
