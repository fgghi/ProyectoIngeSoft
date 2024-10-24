class Gastos {
  constructor() {
    this.gastos = [];
  }

  registrarGasto(gasto) {
    // Validar el gasto en función de la categoría
    if (gasto.descripcion.toLowerCase() === "compra de libros" && gasto.monto > 40) {
      throw new Error("No se puede registrar un gasto mayor a 40 Bs en la categoría 'compra de libros'");
    }
    
    if (gasto.descripcion.toLowerCase() === "pasajes" && gasto.monto >= 30) { // Cambia > a >=
      throw new Error("No se puede registrar un gasto mayor a 30 Bs en la categoría 'pasajes'");
    }
    if (gasto.descripcion.toLowerCase() === "alimentos" && gasto.monto > 100) {
      throw new Error("No se puede registrar un gasto mayor a 100 Bs en la categoría 'alimentos'");
    }
    if (gasto.descripcion.toLowerCase() === "personales" && gasto.monto > 100) {
      throw new Error("No se puede registrar un gasto mayor a 100 Bs en la categoría 'personales'");
    }
    if (gasto.descripcion.toLowerCase() === "otros" && gasto.monto > 300) {
      throw new Error("No se puede registrar un gasto mayor a 300 Bs en la categoría 'otros'");
    }
    
    // Agregar el gasto a la lista
    this.gastos.push(gasto);
  }

  obtenerGastos() {
    return this.gastos; // Retornar todos los gastos
  }
}

export default Gastos;
