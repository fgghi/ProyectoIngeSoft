class Ingresos {
  constructor() {
    this.ingresos = [];
  }

  registrarIngreso(ingreso) {
    // Verificar que el monto sea mayor a 0
    if (ingreso.monto <= 0) {
      throw new Error("El monto del ingreso debe ser mayor a 0");
    }
    this.ingresos.push(ingreso);
  }

  obtenerIngresos() {
    return this.ingresos;
  }
}

export default Ingresos;
