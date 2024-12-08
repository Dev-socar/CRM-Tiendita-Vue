import api from "@/lib/axios";

export default {
  obtenerProductos() {
    return api.get("/productos");
  },
  agregarProducto(data) {
    return api.post("/productos", data);
  },
  obtenerProducto(id) {
    return api.get(`/productos/${id}`);
  },
  actualizarProducto(id, data) {
    return api.patch(`/productos/${id}`, data);
  },
  eliminarProducto(id) {
    return api.delete("/productos/" + id);
  },
};
