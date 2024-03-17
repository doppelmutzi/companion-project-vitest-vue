export interface Quote {
  id: number;
  quote: string;
  author: string;
}

export async function fetchQuote() {
  const response = await fetch("https://dummyjson.com/quotes/random");
  const data = (await response.json()) as Quote;
  return data;
}
