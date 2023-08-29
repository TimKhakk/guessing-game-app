import { cn } from "@/lib/ulils/cn";
import { ButtonHTMLAttributes } from "react";

export function ButtonLetter({
  letter,
  className,
  ...props
}: {
  letter: string;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn('h-full bg-white border-0 m-0 text-black rounded-sm w-[min(8vw,4vh,40px)] text-[calc(min(8vw,4vh,40px)_*_0.5)] p-1', className)}
      data-key={letter}
      name="key"
    >
      {letter}
    </button>
  )
}
