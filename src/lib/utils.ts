import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
  
}

export const uniqueById = (arr: any[]) =>
  Object.values(
    arr.reduce((acc, user) => {
      acc[user.id] = user;
      return acc;
    }, {})
  );