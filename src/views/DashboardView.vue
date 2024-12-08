<script setup>
import ProductoService from "@/services/ProductoService";
import VendedorService from "@/services/VendedorService";
import Heading from "@/components/UI/Heading.vue";
import ListadoProductos from "@/components/ListadoProductos.vue";
import ListadoVendedores from "@/components/ListadoVendedores.vue";
import { onMounted, ref, computed } from "vue";
import Swal from "sweetalert2";

const productos = ref([]);
const vendedores = ref([]);

onMounted(async () => {
  try {
    const [productosResponse, vendedoresResponse] = await Promise.all([
      ProductoService.obtenerProductos(),
      VendedorService.obtenerVendedores(),
    ]);
    productos.value = productosResponse.data;
    vendedores.value = vendedoresResponse.data;
  } catch (error) {
    console.log("Hubo un error", error);
  }
});

defineProps({
  titulo: {
    type: String,
  },
});

const existenProductos = computed(() => {
  return productos.value.length > 0;
});
const existenVendedores = computed(() => {
  return vendedores.value.length > 0;
});

const actualizarEstado = ({ id, estado }) => {
  VendedorService.actualizarVendedorEstado(id, { estado: !estado })
    .then(() => {
      const i = vendedores.value.findIndex((vendedor) => vendedor.id === id);
      vendedores.value[i].estado = !estado;
    })
    .catch((e) => console.log(e));
};

const eliminarVendedor = async (id) => {
  Swal.fire({
    title: "¿Desea Eliminar este Vendedor?",
    text: "No podrás revertir esto",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      VendedorService.eliminarVendedor(id)
        .then(() => {
          Swal.fire("Eliminado", "El vendedor ha sido eliminado.", "success");
          vendedores.value = vendedores.value.filter(
            (cliente) => cliente.id !== id
          );
        })
        .catch((error) => {
          console.error("Error eliminando vendedor:", error);
          Swal.fire(
            "Error",
            "Hubo un problema al eliminar el vendedor.",
            "error"
          );
        });
    }
  });
};

const eliminarProducto = async (id) => {
  Swal.fire({
    title: "¿Desea Eliminar este Producto?",
    text: "No podrás revertir esto",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      ProductoService.eliminarProducto(id)
        .then(() => {
          Swal.fire("Eliminado", "El Producto ha sido eliminado.", "success");
          productos.value = productos.value.filter(
            (producto) => producto.id !== id
          );
        })
        .catch((error) => {
          console.error("Error eliminando producto:", error);
          Swal.fire(
            "Error",
            "Hubo un problema al eliminar el producto.",
            "error"
          );
        });
    }
  });
};
</script>

<template>
  <div class="pt-10 ">
    <Heading>{{ titulo }}</Heading>
    <div class="mt-10">
      <div
        v-if="existenProductos"
        class="flow-root mx-auto p-5 bg-white shadow rounded"
      >
        <h2 class="text-center text-2xl md:text-4xl font-bold text-blue-600 mb-5">
          Productos
        </h2>
        <div class="my-2 mx-4 overflow-x-auto">
          <div class="min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table class="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    class="p-2 text-center text-sm font-extrabold text-gray-600"
                  >
                    Producto
                  </th>
                  <th
                    scope="col"
                    class="p-2 text-center text-sm font-extrabold text-gray-600"
                  >
                    Categoria
                  </th>
                  <th
                    scope="col"
                    class="p-2 text-center text-sm font-extrabold text-gray-600"
                  >
                    Cantidad
                  </th>
                  <th
                    scope="col"
                    class="p-2 text-center text-sm font-extrabold text-gray-600"
                  >
                    Estado
                  </th>
                  <th
                    scope="col"
                    class="p-2 text-center text-sm font-extrabold text-gray-600"
                  >
                    Precio
                  </th>
                  <th
                    scope="col"
                    class="p-2 text-center text-sm font-extrabold text-gray-600"
                  >
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <ListadoProductos
                  v-for="producto in productos"
                  :key="producto.id"
                  :producto="producto"
                  @eliminar-producto="eliminarProducto"
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <p
        v-else
        class="text-center text-gray-500 text-lg md:w-[25rem] w-full mx-auto bg-white p-2 rounded shadow"
      >
        No hay Productos
      </p>
    </div>

    <div class="mt-5">
      <div
        v-if="existenVendedores"
        class="flow-root mx-auto mt-10 p-5 bg-white shadow rounded"
      >
        <h2 class="text-center text-2xl  md:text-4xl font-bold text-blue-600 mb-5">
          Vendedores
        </h2>
        <div class="-my-2 -mx-4 overflow-x-auto">
          <div class="min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table class="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    class="p-2 text-center text-sm font-extrabold text-gray-600"
                  >
                    Nombre
                  </th>
                  <th
                    scope="col"
                    class="p-2 text-center text-sm font-extrabold text-gray-600"
                  >
                    Departamento
                  </th>
                  <th
                    scope="col"
                    class="p-2 text-center text-sm font-extrabold text-gray-600"
                  >
                    Telefono
                  </th>
                  <th
                    scope="col"
                    class="p-2 text-center text-sm font-extrabold text-gray-600"
                  >
                    Estado
                  </th>
                  <th
                    scope="col"
                    class="p-2 text-center text-sm font-extrabold text-gray-600"
                  >
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <ListadoVendedores
                  v-for="vendedor in vendedores"
                  :key="vendedor.id"
                  :vendedor="vendedor"
                  @actualizar-estado="actualizarEstado"
                  @eliminar-vendedor="eliminarVendedor"
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <p
        v-else
        class="text-center bg-white p-2 rounded shadow md:w-[25rem] w-full mx-auto text-gray-500 text-lg"
      >
        No hay vendedores
      </p>
    </div>
  </div>
</template>
