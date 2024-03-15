/*
0: Very Weak
1: Weak
2: Average
3: Strong
4: Safe
*/

import { cn } from "@/lib/utils";

interface Props {
  strength: 0 | 1 | 2 | 3 | 4;
}

function ShowPasswordStrength({ strength }: Props) {
  return (
    <div className="flex gap-2 items-center">
      <div className="flex gap-1">
        {Array.from({ length: strength + 1 }).map((_, index) => (
          <div
            key={index}
            className={cn("h-1 w-6 rounded-lg", {
              "bg-red-500": strength === 0,
              "bg-orange-500": strength === 1,
              "bg-yellow-500": strength === 2,
              "bg-blue-500": strength === 3,
              "bg-green-500": strength === 4,
            })}
          ></div>
        ))}
      </div>{" "}
      <p className="text-sm font-medium">
        {strength === 0 && "😣 Very Weak"}
        {strength === 1 && "😥 Weak"}
        {strength === 2 && "🥱 Average"}
        {strength === 3 && "😌 Strong"}
        {strength === 4 && "😎 Safe"}
      </p>
    </div>
  );
}

export default ShowPasswordStrength;
