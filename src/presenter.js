import Transacciones from './transacciones.js';
import Presupuesto from './gastos.js'; // Asegúrate de que la clase Presupuesto esté implementada correctamente
import Gastos from './gastos.js'; // Asegúrate de que Gastos esté importado adecuadamente

// Manejo del presupuesto
const formularioPresupuesto = document.getElementById('presupuesto-form');
const mensajePresupuestoDiv = document.getElementById('mensaje');

formularioPresupuesto.addEventListener('submit', (event) => {
    event.preventDefault();

    const nombreProyecto = document.getElementById('nombre-proyecto').value;
    const montoTotal = parseFloat(document.getElementById('monto-total').value);

    // Crear un nuevo presupuesto
    const presupuesto = new Presupuesto(nombreProyecto, montoTotal);

    // Guardar en localStorage
    localStorage.setItem('presupuesto', JSON.stringify(presupuesto));

    // Mostrar mensaje de éxito
    mensajePresupuestoDiv.textContent = `Presupuesto registrado con éxito para el proyecto "${nombreProyecto}" con un monto total de $${montoTotal}.`;
    mensajePresupuestoDiv.style.display = 'block';

    // Limpiar el formulario
    formularioPresupuesto.reset();
});

// Manejo de transacciones (gastos e ingresos)
const transacciones = new Transacciones();
const formGastos = document.getElementById('gastos-form');
const gastosDiv = document.getElementById('gastos-div');

formGastos.addEventListener('submit', function (e) {
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

    try {
        transacciones.registrarTransaccion(transaccion);
        mostrarTransacciones(transacciones.obtenerGastos()); // Mostrar solo gastos después de registrar
        this.reset(); // Limpiar el formulario
    } catch (error) {
        alert(error.message); // Mostrar error en caso de que la transacción no sea válida
    }
});

function mostrarTransacciones(listaTransacciones) {
    gastosDiv.innerHTML = '';

    listaTransacciones.forEach(transaccion => {
        const transaccionElemento = document.createElement('div');
        transaccionElemento.textContent = `${transaccion.fecha} - ${transaccion.tipo.toUpperCase()}: $${transaccion.monto} (${transaccion.categoria}) - ${transaccion.descripcion}`;
        gastosDiv.appendChild(transaccionElemento);
    });
}

// Filtros para mostrar ingresos, gastos y todas las transacciones
document.getElementById('filter-ingresos').addEventListener('click', function () {
    mostrarTransacciones(transacciones.obtenerIngresos());
});

document.getElementById('filter-gastos').addEventListener('click', function () {
    mostrarTransacciones(transacciones.obtenerGastos());
});

document.getElementById('filter-todos').addEventListener('click', function () {
    mostrarTransacciones(transacciones.obtenerGastos().concat(transacciones.obtenerIngresos())); // Combina gastos e ingresos
});
