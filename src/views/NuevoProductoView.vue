<script setup>
import Heading from "@/components/UI/Heading.vue";
import ProductoService from "@/services/ProductoService";
import { FormKit } from "@formkit/vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

// const route = useRoute()//pagina en especifico
const router = useRouter(); //Informacion a todo el routing del proyecto

// console.log(route);
// console.log(router);

defineProps({
  titulo: {
    type: String,
  },
});

const handleSubmit = (data) => {
  ProductoService.agregarProducto(data)
    .then((response) => {
      Swal.fire({
        title: "Guardado",
        text: "El Producto se Agrego Correctamente",
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
        submit-label="Agregar Producto"
        incomplete-message="No se pudo guardar, revisa los mensajes."
        @submit="handleSubmit"
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
        />
        <FormKit
          type="number"
          name="cantidad"
          label="Cantidad"
          placeholder="Cantidad del Producto"
          validation="required|min:1"
          :validation-messages="{
            required: 'Cantidad del Producto es Obligatorio',
            min: 'Un minimo de 1 producto',
          }"
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
