import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function shortenAddress(address: string) {
  if (!address) return ""
  if (address.length < 10) return address
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

// export const SERVER_URL = "http://localhost:5467";
export const SERVER_URL = "http://34.66.16.235:3200";
