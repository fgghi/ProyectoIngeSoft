class Transacciones {
  constructor() {
    this.transacciones = JSON.parse(localStorage.getItem('transacciones')) || [];
  }

  registrarTransaccion(transaccion) {
    this.transacciones.push(transaccion);
    this.actualizarLocalStorage(); // Asegúrate de actualizar localStorage
  }

  actualizarLocalStorage() {
    localStorage.setItem('transacciones', JSON.stringify(this.transacciones));
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
