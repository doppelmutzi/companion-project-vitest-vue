import { ref, watchEffect, nextTick } from "vue";

export function useCounter() {
  const count = ref(2);

  watchEffect(() => {
    if (count.value > 5) {
      count.value = 0;
    }
  });

  const increment = () => {
    count.value++;
  };

  return {
    count,
    increment,
  };
}

import { test, expect } from "vitest";

test("useCounter", async () => {
  const { count, increment } = useCounter();

  expect(count.value).toBe(2);

  increment();
  expect(count.value).toBe(3);
  increment();
  expect(count.value).toBe(4);
  increment();
  expect(count.value).toBe(5);
  increment();
  expect(count.value).toBe(6);

  // wait for the watcher to update the count
  await nextTick();

  expect(count.value).toBe(0);
});
