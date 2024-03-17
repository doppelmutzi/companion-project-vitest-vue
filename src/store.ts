import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchQuote, type Quote } from "./quote.service";

export const useDashboardStore = defineStore("dashboard", () => {
  const fetchCount = ref(0);
  const quote = ref<Quote>();

  const incrementFetchCount = () => {
    fetchCount.value++;
  };

  const getQuote = async () => {
    quote.value = await fetchQuote();
  };

  return {
    incrementFetchCount,
    fetchCount,
    quote,
    getQuote,
  };
});

export type DashboardStore = ReturnType<typeof useDashboardStore>;
