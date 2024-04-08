// import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";

import { FunnelSimple, SignOut } from "@phosphor-icons/react";
import { useContext } from "react";
import { Link } from "react-router-dom";

import KeywordInput from "@/components/KeywordInput";
import { HomeContext } from "@/pages/Home";

export function Filter(): JSX.Element {
  const {
    bachelors,
    setBachelors,
    masters,
    setMasters,
    phd,
    setPhd,
    keywords,
    setKeywords,
  } = useContext(HomeContext)!;

  return (
    <div>
      <p className="font-semibold text-lg flex justify-between items-center">
        Filters <FunnelSimple size={24} />
      </p>

      <div>
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="degree"
        >
          <AccordionItem value="degree">
            <AccordionTrigger className="hover:no-underline font-medium">
              Degree
            </AccordionTrigger>
            <AccordionContent>
              <div className="text-sm">
                <label
                  htmlFor="bachelors"
                  className="flex items-center justify-between py-2"
                >
                  Bachelor's
                  <Checkbox
                    id="bachelors"
                    checked={bachelors}
                    onCheckedChange={(value) => setBachelors(value)}
                  />
                </label>

                <label
                  htmlFor="masters"
                  className="flex items-center justify-between py-2"
                >
                  Master's
                  <Checkbox
                    id="masters"
                    checked={masters}
                    onCheckedChange={(value) => setMasters(value)}
                  />
                </label>

                <label
                  htmlFor="phd"
                  className="flex items-center justify-between py-2"
                >
                  PhD
                  <Checkbox
                    id="phd"
                    checked={phd}
                    onCheckedChange={(value) => setPhd(value)}
                  />
                </label>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="keywords">
            <AccordionTrigger className="hover:no-underline font-medium">
              Keywords
            </AccordionTrigger>
            <AccordionContent>
              <div className="text-sm">
                <KeywordInput
                  tags={keywords}
                  setTags={setKeywords}
                  inputFieldPosition="top"
                  allowDragDrop={false}
                  labelField="keyword"
                  allowUnique={true}
                  placeholder="Keywords, max. 10"
                  minTags={3}
                  maxTags={10}
                  id="keywords"
                  classNames={{
                    tagInputField:
                      "flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-2 focus-visible:border-gray-700 mb-4",
                    tag: "px-2 py-1 rounded bg-black text-white flex items-center gap-1 text-sm",
                    selected: "flex gap-1 flex-wrap",
                  }}
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="date-range">
            <AccordionTrigger className="hover:no-underline font-medium">
              Publication Date
            </AccordionTrigger>
            <AccordionContent>
              <div className="text-xs">
                <DatePickerWithRange />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

function Sidebar(): JSX.Element {
  return (
    <aside className="w-1/4 p-3 shrink-0 max-w-[300px] hidden lg:block">
      <Filter />

      <div>
        <Link
          to="/auth/login"
          className="flex items-center gap-2 text-base text-red-500 p-2 font-medium mt-[50%]"
        >
          <SignOut weight="bold" size={20} /> Log out
        </Link>
      </div>
    </aside>
  );
}

export default Sidebar;
