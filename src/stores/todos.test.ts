import theme from "@/theme";
import { useTodosStore } from "./todos";
import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";

describe("useTodosStore", () => {
  let store: ReturnType<typeof useTodosStore>;

  beforeEach(() => {
    const pinia = setActivePinia(createPinia());
    store = useTodosStore(pinia);
  });

  it("should toggle dark mode", () => {
    expect(store.theme).toStrictEqual(theme.DARK);

    store.toggleDarkMode();
    expect(store.theme).toStrictEqual(theme.LIGHT);
  });

  it("should add a new todo", () => {
    const todo = {
      id: 3,
      label: "new todo",
      date: "today",
      checked: false,
    };

    store.addTodo(todo);

    expect(store.todos.includes(todo)).toBe(true);
  });

  it.skip("should toggle all todos ", () => {
    const initialTodos = [...store.todos];

    store.toggleTodos();

    expect(store.todos).toStrictEqual(
      initialTodos.map((todo) => ({
        ...todo,
        checked: false,
      })),
    );
  });

  it("should toggle a specific todo", () => {
    const todo = store.todos[0];

    store.toggleCheckTodo(todo);

    expect(store.todos[0].checked).toBe(!todo.checked);
  });

  it("should remove a todo", () => {
    const todo = store.todos[0];

    store.removeTodo(todo);

    expect(store.todos).not.toContain(todo);
  });

  it("should clear checked todos", () => {
    store.clearCheckedTodos();

    expect(store.todos).toEqual(store.todos.filter((todo) => !todo.checked));
  });

  it("should set the filter index", () => {
    const filterIndex = 1;

    store.setFilterIndex(filterIndex);

    expect(store.filterIndex).toBe(filterIndex);
  });
});
