import type { Quote } from "./types/quote";

export async function fetchQuote() {
  const response = await fetch("https://dummyjson.com/quotes/random");
  const data: Quote = await response.json();
  return data;
}
