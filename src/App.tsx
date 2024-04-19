import { Toaster } from "@/components/ui/toaster";
import { AuthError } from "@supabase/supabase-js";

import AppRouter from "./routes";
import { Tables } from "@/utils/database";
import { supabase } from "./utils/supabase";
import { setLocalStorage } from "./utils/localstorage";

export type ResearchProjectType = Tables<"research-projects-table">;

function App() {
  async function getUser(): Promise<void> {
    try {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        throw new AuthError(error.message, error.status);
      }

      // UPDATE USER && SESSION
      setLocalStorage(data);

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
