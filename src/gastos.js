class Gastos {
  constructor() {
    this.gastos = [];
  }

  registrarGasto(gasto) {
    // Validar el gasto en función de la categoría
    if (gasto.descripcion.toLowerCase() === "compra de libros" && gasto.monto > 40) {
      throw new Error("No se puede registrar un gasto mayor a 40 Bs en la categoría 'compra de libros'");
    }

    // Agregar el gasto a la lista
    this.gastos.push(gasto);
  }

  obtenerGastos() {
    return this.gastos; // Retornar todos los gastos
  }
}

export default Gastos;
