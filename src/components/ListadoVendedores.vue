<script setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps({
  vendedor: Object,
  required: true,
});

defineEmits(["actualizar-estado", "eliminar-vendedor"]);

const nombreVendedor = computed(() => {
  return props.vendedor.apellido + " " + props.vendedor.nombre;
});

const disponibilidadVendedor = computed(() => {
  return props.vendedor.estado;
});
</script>

<template>
  <tr>
    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-center text-sm sm:pl-0">
      <p class="font-medium text-gray-900">{{ nombreVendedor }}</p>
      <p class="text-gray-500">{{ vendedor.email }}</p>
    </td>
    <td class="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">
      <p class="text-gray-900 font-bold">{{ vendedor.departamento }}</p>
    </td>
    <td class="whitespace-nowrap px-3 text-center py-4 text-sm">{{ vendedor.telefono }}</td>
    <td class="whitespace-nowrap text-center px-3 py-4 text-xs text-gray-500">
      <button
        class="inline-flex rounded-full px-2 font-semibold leading-5"
        :class="[
          disponibilidadVendedor
            ? 'bg-blue-100 text-blue-800'
            : 'bg-red-100 text-red-800',
        ]"
        @click="
          $emit('actualizar-estado', {
            id: vendedor.id,
            estado: vendedor.estado,
          })
        "
      >
        {{ disponibilidadVendedor ? "Conectado" : "Desconectado" }}
      </button>
    </td>
    <td class="whitespace-nowrap px-3 text-center gap-2 py-4 text-sm text-gray-500">
      <RouterLink
        :to="{ name: 'editar-vendedor', params: { id: vendedor.id } }"
        class="text-blue-600 mr-3"
        >Editar</RouterLink
      >
      <button
        class="text-red-600"
        @click="$emit('eliminar-vendedor', vendedor.id)"
      >
        Eliminar
      </button>
    </td>
  </tr>
</template>
