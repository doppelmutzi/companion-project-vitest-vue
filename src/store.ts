import { defineStore } from "pinia";
import { computed, ref, type Ref, toValue } from "vue";
import { fetchQuote, type Quote } from "./quote.service";
import { useFetch } from "./composables/useFetch";

interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export const useDashboardStore = defineStore("dashboard", () => {
  // TODO entfernen oder sinnvollen Anwendungsfall für fetchCount finden
  const fetchCount = ref(0);
  const currentQuote = ref<Quote | null>();
  const currentTodo: Ref<Todo | null> = ref(null);

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

  const fetchTodoWithPolling = (pollingInterval: number) => {
    const doPoll = ref(true);

    const poll = async () => {
      try {
        if (doPoll.value) {
          // const response = await fetch("https://dummyjson.com/todos/random");
          // currentTodo.value = await response.json();

          const fetchState = await useFetch<Todo>(
            "https://dummyjson.com/todos/random",
          );

          currentTodo.value = fetchState.data;

          setTimeout(poll, pollingInterval);
        }
      } catch (err: unknown) {
        console.error(err);
      }
    };

    poll();

    const togglePolling = () => {
      doPoll.value = !doPoll.value;
    };
    return togglePolling;
  };

  return {
    incrementFetchCount,
    fetchCount,
    currentQuote,
    currentTodo,
    shortenedQuote,
    createQuote,
    createQuoteImage: createQuoteImageWithComposable,
    fetchTodoWithPolling,
  };
});

export type DashboardStore = ReturnType<typeof useDashboardStore>;
