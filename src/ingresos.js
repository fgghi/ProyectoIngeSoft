class Ingresos {
  constructor() {
    this.ingresos = [];
  }

  registrarIngreso(ingreso) {
    if (ingreso.monto <= 0) {
      throw new Error("El monto del ingreso debe ser mayor a 0");
    }
    this.ingresos.push(ingreso);
  }

  obtenerIngresos() {
    return this.ingresos;
  }

  obtenerTotalIngresos() {
    return this.ingresos.reduce((total, ingreso) => total + ingreso.monto, 0);
  }
}

export default Ingresos;
