import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Sammenfletter Tailwind-klasser og fjerner konflikter.
export function cn(...input: ClassValue[]) {
  return twMerge(clsx(input));
}
