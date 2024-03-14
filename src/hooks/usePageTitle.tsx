import { useEffect } from "react";

function usePageTitle(title: string): void {
  useEffect(() => {
    document.title = `${title} - ${document.title}`;

    return () => {
      document.title = "Prjstore";
    };
  }, [title]);
}

export default usePageTitle;
