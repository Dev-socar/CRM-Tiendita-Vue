<script setup>
import Heading from "@/components/UI/Heading.vue";
import ProductoService from "@/services/ProductoService";
import { FormKit } from "@formkit/vue";
import { onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";

const route = useRoute();
const router = useRouter();

const { id } = route.params;
const formData = reactive({});

onMounted(() => {
  ProductoService.obtenerProducto(id)
    .then(({ data }) => {
      // formData.nombre = data.nombre;
      // formData.cantidad = data.cantidad;
      // formData.precio = data.precio;
      // formData.categoria = data.categoria;
      Object.assign(formData, data);
    })
    .catch((e) => console.log(e));
});

defineProps({
  titulo: {
    type: String,
  },
});

const handleSubmit = (data) => {
  ProductoService.actualizarProducto(id, data)
    .then((response) => {
      Swal.fire({
        title: "Guardado",
        text: "El Articulo se Modifico Correctamente",
        icon: "success",
      }).then(() => {
        router.push({ name: "dashboard" });
      });
    })
    .catch((e) => console.log(e));
};
</script>

<template>
  <div class="pt-10">
    <Heading>{{ titulo }}</Heading>
  </div>
  <div class="mx-auto mt-10 bg-white shadow-sm">
    <div class="mx-auto md:w-2/3 py-10 px-3">
      <FormKit
        type="form"
        submit-label="Guardar Cambios"
        incomplete-message="No se pudo guardar, revisa los mensajes."
        @submit="handleSubmit"
        :value="formData"
      >
        <FormKit
          type="text"
          label="Nombre"
          placeholder="Nombre del Producto"
          name="nombre"
          validation="required"
          :validation-messages="{
            required: 'Nombre del Producto es Obligatorio',
          }"
          v-model="formData.nombre"
        />
        <FormKit
          type="number"
          name="cantidad"
          label="Cantidad"
          placeholder="Cantidad del Producto"
          validation="required|min:0"
          :validation-messages="{
            required: 'Cantidad del Producto es Obligatorio',
            min: 'No se admiten cantidades negativas',
          }"
          v-model="formData.cantidad"
        />
        <FormKit
          type="number"
          name="precio"
          label="Precio"
          placeholder="Precio del Producto"
          validation="required|min:1"
          :validation-messages="{
            required: 'Precio del Producto es Obligatorio',
            min: 'No puede tener un precio menor a 0',
          }"
          v-model="formData.precio"
        />
        <FormKit
          type="select"
          label="Categoria"
          name="categoria"
          :options="{
            electrodomesticos: 'Electrodomesticos',
            comida: 'Comida',
            ropa: 'Ropa',
          }"
          validation="required"
          :validation-messages="{
            required: 'Categoria del Producto es Obligatorio',
          }"
          v-model="formData.categoria"
        />
      </FormKit>
    </div>
  </div>
</template>

<style>
.formkit-wrapper {
  max-width: 100%;
}
</style>
