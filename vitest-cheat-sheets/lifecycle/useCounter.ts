import { onMounted, ref, watchEffect } from "vue";

export function useCounter() {
  const count = ref(0);

  onMounted(() => {
    count.value = 2;
  });

  watchEffect(() => {
    if (count.value > 3) {
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
