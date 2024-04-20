import { defineStore } from "pinia";

const useStore = defineStore("count", () => {
  const count = ref(0);

  const doubleCount = computed(() => count.value * 2);

  const increment = () => {
    count.value++;
  };

  return {
    count,
    doubleCount,
    increment,
  };
});

import { test, expect } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { computed, ref } from "vue";

test("pinia", () => {
  // init store
  setActivePinia(createPinia());
  const store = useStore();

  // store is initially empty
  expect(store.count).toBe(0);

  // access getter
  expect(store.doubleCount).toBe(0);

  // invoke action
  store.increment();

  expect(store.count).toBe(1);
  expect(store.doubleCount).toBe(2);
});
