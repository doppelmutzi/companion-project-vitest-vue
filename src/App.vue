<template>
  <h1>My awesome dashboard</h1>
  <img :src="imageUrl" :alt="imgAlt" />
</template>

<script setup lang="ts">
import { onMounted, ref, type Ref } from "vue";
import { useDashboardStore } from "./store";

const imageUrl = ref("");
const imgAlt = ref("");

onMounted(async () => {
  const dashboardStore = useDashboardStore();
  const blob = await dashboardStore.createQuoteImage();
  if (blob) {
    imageUrl.value = URL.createObjectURL(blob);
    imgAlt.value = dashboardStore.shortenedQuote;
  }
});
</script>
<style lang="scss"></style>
