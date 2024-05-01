import { useEffect } from "react";

function usePageTitle(title: string | undefined): void {
  useEffect(() => {
    document.title = `${title} - ${document.title}`;

    return () => {
      document.title = "Arkive";
    };
  }, [title]);
}

export default usePageTitle;
