<template>
  <h1>My awesome dashboard</h1>
  <img :src="imageUrl" :alt="imgAlt" />
  <Counter />
  <TodoFromStore />
  <TodoFromComposable />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useDashboardStore } from "./store";
import TodoFromStore from "./components/TodoFromStore.vue";
import TodoFromComposable from "./components/TodoFromComposable.vue";
import Counter from "../vitest-cheat-sheets/lifecycle-compostion-api/Counter.vue";

const dashboardStore = useDashboardStore();

const imageUrl = ref("");
const imgAlt = ref("");

onMounted(async () => {
  const image = await dashboardStore.createQuoteImageWithComposableRefactored();
  if (image) {
    imageUrl.value = image.url;
    imgAlt.value = image.altText;
  }
});
</script>
<style lang="scss"></style>
