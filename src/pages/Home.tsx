import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Layout from "@/components/Layout";
import usePageTitle from "@/hooks/usePageTitle";
import mockThesisData from "@/mock/results";

function Home(): JSX.Element {
  usePageTitle("Home");
  // console.log(mockThesisData);

  return (
    <Layout>
      {/* <div className="grid grid-cols-2 gap-2">
        <Card>
          <CardHeader>
            <CardTitle>Project Title</CardTitle>
            <CardDescription>Keywords</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Project Abstract (Summary)</p>
          </CardContent>
          <CardFooter>
            <p>Download Link</p>
          </CardFooter>
        </Card>
      </div> */}

      <div className="flex items-center justify-between w-2/3 mx-auto px-8 py-2 text-sm mt-auto">
        <p>
          Showing <span className="font-medium">1</span> of 20
        </p>

        <div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
