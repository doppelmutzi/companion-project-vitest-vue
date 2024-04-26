<template>
  <div>count: {{ count }}</div>
  <button @click="increment">Increment</button>
</template>

<script setup lang="ts">
import { useCounter } from "./useCounter";

const { count, increment } = useCounter();
</script>
