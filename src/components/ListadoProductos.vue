<script setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";

defineEmits(["eliminar-producto"]);

const props = defineProps({
  producto: Object,
  required: true,
});

const estado = computed(() => {
  if (props.producto.cantidad > 10) {
    return {
      clases: "bg-blue-100 text-blue-800",
      texto: "Disponible",
    };
  } else if (props.producto.cantidad >= 1 && props.producto.cantidad <= 10) {
    return {
      clases: "bg-orange-100 text-orange-800",
      texto: "Por agotarse",
    };
  } else {
    return {
      clases: "bg-red-100 text-red-800",
      texto: "Agotado",
    };
  }
});
</script>

<template>
  <tr>
    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-center sm:pl-0">
      <p class="font-medium text-gray-900">{{ producto.nombre }}</p>
    </td>
    <td class="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-500">
      <p class="text-gray-900 font-bold">{{ producto.categoria }}</p>
    </td>
    <td class="whitespace-nowrap px-3 text-center py-4 text-sm">
      {{ producto.cantidad }}
    </td>
    <td class="whitespace-nowrap text-center px-3 py-4">
      <p
        :class="[
          'w-max px-2 rounded-full mx-auto text-xs border font-bold leading-5',
          estado.clases,
        ]"
      >
        {{ estado.texto }}
      </p>
    </td>
    <td class="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">
      ${{ producto.precio }}
    </td>
    <td class="whitespace-nowrap px-3 py-4 flex justify-center gap-2 text-sm text-gray-500">
      <RouterLink
        :to="{ name: 'editar-producto', params: { id: producto.id } }"
        class="text-blue-600"
        >Editar</RouterLink
      >
      <button
        class="text-red-600"
        @click="$emit('eliminar-producto', producto.id)"
      >
        Eliminar
      </button>
    </td>
  </tr>
</template>
