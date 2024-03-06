import { Toaster } from "@/components/ui/toaster";

import AppRouter from "./routes";

function App() {
  return (
    <>
      <AppRouter />
      <Toaster />
    </>
  );
}

export default App;
