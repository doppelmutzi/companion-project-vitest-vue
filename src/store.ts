import { defineStore } from "pinia";
import { computed, ref, type Ref, toValue } from "vue";
import { fetchQuote, type Quote } from "./quote.service";
import { useFetch } from "./composables/useFetch";

export const useDashboardStore = defineStore("dashboard", () => {
  const fetchCount = ref(0);
  const currentQuote = ref<Quote | null>();

  const incrementFetchCount = () => {
    fetchCount.value++;
  };

  const createQuote = async () => {
    currentQuote.value = await fetchQuote();
  };

  // Harder to test because it uses fetch directly. Further, it performs two different fetches.
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const createQuoteImage = async () => {
    const quoteResponse = await fetch("https://dummyjson.com/quotes/random");
    const randomQuote = (await quoteResponse.json()) as Quote;
    currentQuote.value = randomQuote;
    const imgResponse = await fetch(
      `https://dummyjson.com/image/768x80/008080/ffffff?text=${randomQuote.quote}`,
    );
    const blob = await imgResponse.blob();
    return blob;
  };

  const createQuoteImageWithComposable = async () => {
    const blob: Ref<Blob | null> = ref(null);

    const jsonState = await useFetch<Quote>(
      "https://dummyjson.com/quotes/random",
    );

    if (!jsonState.hasError) {
      currentQuote.value = jsonState.data;
      const blobState = await useFetch<Blob>(
        `https://dummyjson.com/image/768x80/008080/ffffff?text=${jsonState.data?.quote}`,
        { responseType: "blob" },
      );
      if (!blobState.hasError) {
        blob.value = blobState.data;
      }
    }

    return toValue(blob);
  };

  const shortenedQuote = computed(() => {
    return currentQuote.value?.quote
      ? currentQuote.value.quote.trim().slice(0, 10).trim() + " ..."
      : "";
  });

  return {
    incrementFetchCount,
    fetchCount,
    currentQuote,
    shortenedQuote,
    createQuote,
    createQuoteImage: createQuoteImageWithComposable,
  };
});

export type DashboardStore = ReturnType<typeof useDashboardStore>;
