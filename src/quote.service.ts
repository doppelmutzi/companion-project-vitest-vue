export interface Quote {
  id: number;
  quote: string;
  author: string;
}

export async function fetchQuote() {
  const response = await fetch("https://dummyjson.com/quotes/random");
  const data: Quote = await response.json();
  return data;
}
