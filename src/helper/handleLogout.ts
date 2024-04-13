import { supabase } from "@/utils/supabase";
import { AuthError } from "@supabase/supabase-js";

async function handleLogout() {
  try {
    const { error } = await supabase.auth.signOut({ scope: "local" });

    if (error) {
      throw new AuthError(error.message, error.status);
    }
  } catch (error) {
    console.error(error);
  }
}

export default handleLogout;
