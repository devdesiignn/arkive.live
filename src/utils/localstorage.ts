import { Session } from "@supabase/supabase-js";

interface Data {
  session: Session | null;
}

// SETTER
export function setLocalStorage(data: Data) {
  if (data && data?.session) {
    localStorage.setItem("session", JSON.stringify(data.session));
    localStorage.setItem("user", JSON.stringify(data.session.user));
  }
}

// REMOVER
export function removeLocalStorage() {
  localStorage.removeItem("session");
  localStorage.removeItem("user");
}

// GETTER
export function getUserFromLocalStorage() {
  return localStorage.getItem("user");
}
export function getSessionFromLocalStorage() {
  return localStorage.getItem("session");
}
