import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getReadingTime(content: string): string {
  // Average reading speed: 200 words per minute
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

export function generateGradient(seed: string): string {
  // Generate a pseudo-random color gradient based on a seed string
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const hue1 = Math.abs(hash % 360);
  const hue2 = (hue1 + 40) % 360; // Complementary hue
  
  return `from-[hsl(${hue1},70%,60%)] to-[hsl(${hue2},70%,60%)]`;
}