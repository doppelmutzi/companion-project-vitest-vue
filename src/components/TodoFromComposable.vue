<template>
  <section><span>todo from composable:</span> {{ todo?.todo }}</section>
  <button @click="togglePolling">{{ buttonLabel }}</button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useFetchTodoWithPolling } from "../composables/useFetchTodoWithPolling.ts";

const buttonLabel = computed(() =>
  isPolling.value ? "Stop Polling" : "Start Polling",
);

const { todo, togglePolling, isPolling } = useFetchTodoWithPolling(3000);
</script>

<style lang="scss"></style>
