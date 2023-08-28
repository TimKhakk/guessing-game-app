import clsx from "clsx";
import { ClassArray } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...values: ClassArray) {
  return twMerge(clsx(values));
}
