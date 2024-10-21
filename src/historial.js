import Ingresos from './ingresos.js';

const historialDiv = document.querySelector("#historial-ingresos");
const ingresosRegistrados = JSON.parse(localStorage.getItem('ingresos')) || [];

let totalIngresos = 0;
ingresosRegistrados.forEach((ingreso) => {
  totalIngresos += ingreso.monto;
});

historialDiv.innerHTML = "<h2>Total de Ingresos</h2>";
historialDiv.innerHTML += "<p>Monto total de los ingresos: $" + totalIngresos + "</p>";

historialDiv.innerHTML += "<h3>Detalle de Ingresos</h3>";
historialDiv.innerHTML += "<ul>";
ingresosRegistrados.forEach((ingreso) => {
  historialDiv.innerHTML +=
    "<li>" +
    "Fecha: " + ingreso.fecha +
    ", Monto: $" + ingreso.monto +
    ", Descripción: " + ingreso.descripcion +
    "</li>";
});
historialDiv.innerHTML += "</ul>";
