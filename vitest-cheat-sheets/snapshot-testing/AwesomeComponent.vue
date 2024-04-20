<template>
  <h1 id="awesome-component">{{ greeting }}</h1>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{ name: string }>();
const greeting = computed(() => "Hello, " + props.name);
</script>
<style scoped>
#awesome-component {
  color: red;
}
</style>
