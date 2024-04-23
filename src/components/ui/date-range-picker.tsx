import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useContext } from "react";

import { HomeContext } from "@/contexts/HomeContext";

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const { date, setDate } = useContext(HomeContext)!;

  const currentDate = new Date();
  const disabledDays = { after: currentDate };

  return (
    <div className={cn("grid gap-4", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a start and end date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            selected={date}
            onSelect={(value) => {
              // console.log(value?.from, value?.to, "value");
              setDate({ from: value?.from, to: value?.to });
            }}
            numberOfMonths={1}
            disabled={disabledDays}
            toMonth={
              new Date(currentDate.getFullYear(), currentDate.getMonth())
            }
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
