import api from "@/lib/axios";

export default {
  obtenerVendedores() {
    return api.get("/vendedores");
  },
  agregarVendedor(data) {
    return api.post("/vendedores", data);
  },
  obtenerVendedor(id) {
    return api.get("/vendedores/" + id);
  },
  actualizarVendedor(id, data) {
    return api.patch(`/vendedores/${id}`, data);
  },
  actualizarVendedorEstado(id, data) {
    return api.patch(`/vendedores/${id}`, data);
  },
  eliminarVendedor(id) {
    return api.delete("/vendedores/" + id);
  },
};
