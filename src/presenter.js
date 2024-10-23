// presenter.js

import Presupuesto from './gastos.js'; // Importar clase Presupuesto
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

// Manejo de gastos
const fecha = document.querySelector("#fecha");
const monto = document.querySelector("#monto");
const descripcion = document.querySelector("#descripcion");

const formGastos = document.querySelector("#gastos-form");
const gastosDiv = document.querySelector("#gastos-div");

formGastos.addEventListener("submit", (event) => {
    event.preventDefault();

    const fechaValue = fecha.value;
    const montoValue = Number.parseFloat(monto.value);
    const descripcionValue = descripcion.value;

    const gastos = new Gastos(); // Asegúrate de que Gastos sea una clase válida
    gastos.registrarGasto({ fecha: fechaValue, monto: montoValue, descripcion: descripcionValue });

    // Mostrar mensaje de éxito o actualización de la lista de gastos
    const mensajeGastosDiv = document.createElement("div");
    mensajeGastosDiv.textContent = `Gasto registrado: ${descripcionValue} por $${montoValue} en la fecha ${fechaValue}.`;
    gastosDiv.appendChild(mensajeGastosDiv);
    
    // Limpiar el formulario de gastos
    formGastos.reset();
});
