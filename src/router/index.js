import Inicio from "@/views/DashboardView.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: Inicio,
      props: { titulo: "Dashboard " },
    },
    {
      path: "/agregar-producto",
      name: "agregar-producto",
      component: () => import("../views/NuevoProductoView.vue"),
      props: { titulo: "Agregar Producto " },
    },
    {
      path: "/editar-producto/:id",
      name: "editar-producto",
      component: () => import("../views/EditarProductoView.vue"),
      props: { titulo: "Editar Producto " },
    },
    {
      path: "/agregar-vendedor",
      name: "agregar-vendedor",
      component: () => import("../views/NuevoVendedorView.vue"),
      props: { titulo: "Agregar Vendedor " },
    },
    {
      path: "/editar-vendedor/:id",
      name: "editar-vendedor",
      component: () => import("../views/EditarVendedorView.vue"),
      props: { titulo: "Editar Vendedor " },
    },
  ],
});

export default router;
