import { removeLocalStorage } from "@/utils/localstorage";
import { supabase } from "@/utils/supabase";
import { AuthError } from "@supabase/supabase-js";

async function handleLogout(): Promise<void> {
  try {
    const { error } = await supabase.auth.signOut({ scope: "local" });

    // REMOVE USER && SESSION
    removeLocalStorage();

    if (error) {
      throw new AuthError(error.message, error.status);
    }
  } catch (error) {
    console.error(error);
  }
}

export default handleLogout;
