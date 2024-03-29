import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";

import { FunnelSimple, X } from "@phosphor-icons/react";

function Filter(): JSX.Element {
  return (
    <aside className="w-[400px] p-3">
      <div className="sticky top-[80px] flex flex-col gap-4">
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
                    <Checkbox id="bachelors" />
                  </label>

                  <label
                    htmlFor="masters"
                    className="flex items-center justify-between py-2"
                  >
                    Master's
                    <Checkbox id="masters" />
                  </label>

                  <label
                    htmlFor="phd"
                    className="flex items-center justify-between py-2"
                  >
                    PhD
                    <Checkbox id="phd" />
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
                  <form>
                    <Input
                      type="email"
                      placeholder="Enter keyword, then Enter"
                      className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-2 focus-visible:border-gray-700"
                    />
                  </form>

                  <div className="mt-4 flex flex-wrap gap-2 py-2">
                    <span className="p-1 rounded bg-black text-white flex items-center gap-1">
                      AI
                      <X weight="bold" className="cursor-pointer" />
                    </span>
                    <span className="p-1 rounded bg-black text-white flex items-center gap-1">
                      Computer Science
                      <X weight="bold" className="cursor-pointer" />
                    </span>
                    <span className="p-1 rounded bg-black text-white flex items-center gap-1">
                      CyberSecurity
                      <X weight="bold" className="cursor-pointer" />
                    </span>
                    <span className="p-1 rounded bg-black text-white flex items-center gap-1">
                      Data Science
                      <X weight="bold" className="cursor-pointer" />
                    </span>
                    <span className="p-1 rounded bg-black text-white flex items-center gap-1">
                      World Health
                      <X weight="bold" className="cursor-pointer" />
                    </span>
                    <span className="p-1 rounded bg-black text-white flex items-center gap-1">
                      Explosive Power
                      <X weight="bold" className="cursor-pointer" />
                    </span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="date-range">
              <AccordionTrigger className="hover:no-underline font-medium">
                Publication Date
              </AccordionTrigger>
              <AccordionContent>
                <div className="text-sm">
                  <DatePickerWithRange />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </aside>
  );
}

export default Filter;
