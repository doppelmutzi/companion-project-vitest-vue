<template>
  <section><span>todo from store:</span> {{ todo }}</section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useDashboardStore } from "../store";

const todo = computed(() => dashboardStore.currentTodo?.todo);

const dashboardStore = useDashboardStore();
dashboardStore.fetchTodoWithPolling(5000);
</script>

<style lang="scss"></style>
