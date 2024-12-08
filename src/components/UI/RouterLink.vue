<script setup>
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";
const props = defineProps({
  to: String,
  text: String,
});

const route = useRoute();
const urlActual = computed(() => route.name === props.to);
</script>

<template>
  <RouterLink
    :to="{ name: to }"
    :class="[
      'block py-2 px-4 text-white rounded-md',
      urlActual ? 'bg-blue-800' : ' hover:bg-blue-500',
    ]"
  >
    {{ text }}
  </RouterLink>
</template>
