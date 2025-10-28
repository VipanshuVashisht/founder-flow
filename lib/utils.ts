import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString( 'en-IN', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}

export function formatViewCount(views: number){
  if (views === null || views === undefined) {
    return "0 views";
  }
  
  return `${views} view${views === 1 ? '' : 's'}`
}

export function parseServerActionResponse<T>(response: T){
  return JSON.parse(JSON.stringify(response));
}
