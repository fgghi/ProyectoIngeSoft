import Transacciones from './transacciones.js';

const transacciones = new Transacciones();


document.getElementById('gastos-form').addEventListener('submit', function (e) {
  e.preventDefault();


  const fecha = document.getElementById('fecha').value;
  const monto = parseFloat(document.getElementById('monto').value);
  const descripcion = document.getElementById('descripcion').value;
  const tipo = document.getElementById('tipo').value;
  const categoria = document.getElementById('categoria').value;

  const transaccion = {
    fecha: fecha,
    monto: monto,
    descripcion: descripcion,
    tipo: tipo,
    categoria: categoria,
  };


  transacciones.registrarTransaccion(transaccion);


  mostrarTransacciones(transacciones.obtenerTransacciones());


  this.reset();
});


function mostrarTransacciones(listaTransacciones) {
  const gastosDiv = document.getElementById('gastos-div');
  gastosDiv.innerHTML = '';

  listaTransacciones.forEach(transaccion => {
    const transaccionElemento = document.createElement('div');
    transaccionElemento.textContent = `${transaccion.fecha} - ${transaccion.tipo.toUpperCase()}: $${transaccion.monto} (${transaccion.categoria}) - ${transaccion.descripcion}`;
    gastosDiv.appendChild(transaccionElemento);
  });
}


document.getElementById('filter-ingresos').addEventListener('click', function () {
  mostrarTransacciones(transacciones.obtenerIngresos());
});

document.getElementById('filter-gastos').addEventListener('click', function () {
  mostrarTransacciones(transacciones.obtenerGastos());
});

document.getElementById('filter-todos').addEventListener('click', function () {
  mostrarTransacciones(transacciones.obtenerTransacciones());
});
