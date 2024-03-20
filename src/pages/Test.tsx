/* eslint-disable react-hooks/exhaustive-deps */

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";

// SUPABASE
// interface Data {
//   // Define the structure of your data
// }

function Test(): JSX.Element {
  const [data, setData] = useState<object>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const ITEMS_PER_PAGE = 10;

  async function fetchData(page: number): Promise<void> {
    if (page < 1 || page > totalPages) return;

    const limit = ITEMS_PER_PAGE;
    const offset = (page - 1) * ITEMS_PER_PAGE;

    try {
      const response = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${offset}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const jsonData = await response.json();

      setData(jsonData);
      setCurrentPage(page);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Caught error:", error.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  }

  async function fetchAllData(): Promise<void> {
    try {
      const response = await fetch(`https://dummyjson.com/products?limit=0`);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const totalItems = await response.json();
      const totalPages = Math.ceil(totalItems.total / ITEMS_PER_PAGE);

      setTotalPages(totalPages);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Caught error:", error.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  }

  useEffect(() => {
    async function initLoad() {
      await fetchAllData();

      fetchData(currentPage);
    }

    initLoad();
  }, [totalPages]);

  useEffect(() => {
    fetchData(currentPage);
  }, []);

  console.log(currentPage, data, totalPages);

  // SUPABASE
  // const [data, setData] = useState<Data[]>([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(0);
  // const ITEMS_PER_PAGE = 10;

  // async function fetchData(page: number) {
  //   if (page < 1 || page > totalPages) return;

  //   const from = (page - 1) * ITEMS_PER_PAGE;
  //   const to = page * ITEMS_PER_PAGE - 1;

  //   const {
  //     data: fetchedData,
  //     error,
  //     count,
  //   } = await supabase.from<Data>("TABLE").select("*").range(from, to);

  //   if (error) {
  //     console.error("Error fetching data:", error.message);
  //     return;
  //   }

  //   setData(fetchedData || []);
  //   setCurrentPage(page);
  //   setTotalPages(Math.ceil(count / ITEMS_PER_PAGE));
  // }

  // useEffect(() => {
  //   fetchData(currentPage);
  // }, []);

  return (
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => fetchData(currentPage - 1)}
              isActive={currentPage > 1}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={() => fetchData(1)}
              isActive={currentPage === 1}
            >
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={() => fetchData(2)}
              isActive={currentPage === 2}
            >
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={() => fetchData(3)}
              isActive={currentPage === 3}
            >
              3
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => fetchData(currentPage + 1)}
              isActive={currentPage < totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default Test;
