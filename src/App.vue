<script setup>
import { RouterView } from "vue-router";
import RouterLink from "./components/UI/RouterLink.vue";
</script>

<template>
  <div class="grid md:grid-cols-8">
    <aside class="bg-blue-600 md:col-start-1 md:col-end-3 py-2 md:h-dvh">
      <h1 class="text-center text-white font-bold text-xl lg:text-3xl mt-2">
        CRM-Tiendita
      </h1>
      <nav class="mt-3 px-4 mx-auto flex flex-col gap-3">
        <RouterLink to="dashboard" text="Dashboard" />
        <RouterLink to="agregar-producto" text="Agregar Producto" />
        <RouterLink to="agregar-vendedor" text="Agregar Vendedor" />
      </nav>
    </aside>
    <main
      class="w-[90%] mx-auto md:w-full md:col-start-3 md:col-end-9 px-5 py-2"
    >
      <RouterView />
    </main>
  </div>
</template>
