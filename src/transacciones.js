class Transacciones {
  constructor() {
    this.transacciones = [];
  }

  registrarTransaccion(transaccion) {
    this.transacciones.push(transaccion);
  }

  obtenerTransacciones() {
    return this.transacciones;
  }

  obtenerIngresos() {
    return this.transacciones.filter(transaccion => transaccion.tipo === 'ingreso');
  }

  obtenerGastos() {
    return this.transacciones.filter(transaccion => transaccion.tipo === 'gasto');
  }
}

export default Transacciones;