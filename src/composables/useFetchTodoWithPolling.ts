import { ref, type Ref } from "vue";
import { useFetch } from "./useFetch";
interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export const useFetchTodoWithPolling = (pollingInterval: number) => {
  const todo: Ref<Todo | null> = ref(null);
  const doPoll = ref(true);

  const poll = async () => {
    try {
      if (doPoll.value) {
        const fetchState = await useFetch<Todo>(
          "https://dummyjson.com/todos/random",
        );
        todo.value = fetchState.data;

        setTimeout(poll, pollingInterval);
      }
    } catch (err: unknown) {
      console.error(err);
    }
  };

  poll();

  const togglePolling = () => {
    doPoll.value = !doPoll.value;
    if (doPoll.value) {
      poll();
    }
  };
  return { todo, togglePolling, isPolling: doPoll };
};
