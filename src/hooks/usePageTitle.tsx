import { useEffect } from "react";

function usePageTitle(title: string): void {
  useEffect(() => {
    document.title = `${title} - ${document.title}`;

    return () => {
      document.title = "Archive";
    };
  }, [title]);
}

export default usePageTitle;
