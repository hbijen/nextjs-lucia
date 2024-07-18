
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const OAUTH_ENABLED = {
  GITHUB: (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET),
  GOOGLE: (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET)
}

export function validEmail(email: string): boolean {
  return /^\S+@\S+\.\S+$/.test(email)
}

