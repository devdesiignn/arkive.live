import { Toaster } from "@/components/ui/toaster";

import AppRouter from "./routes";

function App() {
  return (
    <div className="max-w-[1536px] mx-auto border-x-2">
      <AppRouter />
      <Toaster />
    </div>
  );
}

export default App;
