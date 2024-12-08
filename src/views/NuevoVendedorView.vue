<script setup>
import Heading from "@/components/UI/Heading.vue";
import VendedorService from "@/services/VendedorService";
import { FormKit } from "@formkit/vue";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

const router = useRouter();

defineProps({
  titulo: {
    type: String,
  },
});

const handleSubmit = (data) => {
  data.estado = 1;
  VendedorService.agregarVendedor(data)
    .then((response) => {
      Swal.fire({
        title: "Guardado",
        text: "El Vendedor se Agrego Correctamente",
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
        submit-label="Agregar Vendedor"
        incomplete-message="No se pudo guardar, revisa los mensajes."
        @submit="handleSubmit"
      >
        <FormKit
          type="text"
          label="Nombre"
          placeholder="Nombre del Vendedor"
          name="nombre"
          validation="required"
          :validation-messages="{
            required: 'Nombre del Vendedor es Obligatorio',
          }"
        />
        <FormKit
          type="text"
          label="Apellido"
          placeholder="Apellido del Vendedor"
          name="apellido"
          validation="required"
          :validation-messages="{
            required: 'Apellido del Vendedor es Obligatorio',
          }"
        />
        <FormKit
          type="email"
          label="Correo Electronico"
          placeholder="Email del Vendedor"
          name="email"
          validation="required|email"
          :validation-messages="{
            required: 'Email del Vendedor es Obligatorio',
            email: 'Ingresa un email valido',
          }"
        />
        <FormKit
          type="text"
          label="Telefono"
          placeholder="Telefono: XXX XXX XXXX"
          name="telefono"
          validation="*matches:/^[0-9]{3} [0-9]{3} [0-9]{3}/"
          :validation-messages="{
            matches: 'Formato Invalido',
          }"
        />
        <FormKit
          type="select"
          label="Departamento"
          name="departamento"
          :options="{
            electrodomesticos: 'Electrodomesticos',
            comida: 'Comida',
            ropa: 'Ropa',
          }"
          validation="required"
          :validation-messages="{
            required: 'Departamento del Vendedor es Obligatorio',
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
