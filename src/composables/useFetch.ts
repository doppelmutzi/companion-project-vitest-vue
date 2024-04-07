import { reactive } from "vue";

export interface State<T> {
  isLoading: boolean;
  hasError: boolean;
  error: Error | null;
  data: T | null;
}

// TODO test this function / show that it's hard to test fetch
export async function useFetch<T>(
  url: string,
  options: { responseType?: "json" | "blob" } = { responseType: "json" },
) {
  const fetchState = reactive<State<T>>({
    isLoading: false,
    hasError: false,
    error: null,
    data: null,
  });

  try {
    fetchState.isLoading = true;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    fetchState.data =
      options.responseType === "json"
        ? await response.json()
        : await response.blob();
  } catch (err: unknown) {
    fetchState.hasError = true;
    fetchState.error = err as Error;
  } finally {
    fetchState.isLoading = false;
  }

  return fetchState;
}
