// Cargar los datos de gastos desde localStorage
const reporteDiv = document.querySelector("#reporte-balance");

// Obtener los gastos registrados desde localStorage
const gastosRegistrados = JSON.parse(localStorage.getItem('gastos')) || [];

// Calcular el balance total
let balanceTotal = 0;
gastosRegistrados.forEach((gasto) => {
  balanceTotal += gasto.monto;
});

// Mostrar el reporte de balance en la página
reporteDiv.innerHTML = "<h2>Balance Total</h2>";
reporteDiv.innerHTML += "<p>Monto total de los gastos: $" + balanceTotal + "</p>";

reporteDiv.innerHTML += "<h3>Detalle de Gastos</h3>";
reporteDiv.innerHTML += "<ul>";
gastosRegistrados.forEach((gasto) => {
  reporteDiv.innerHTML +=
    "<li>" +
    "Fecha: " + gasto.fecha +
    ", Monto: $" + gasto.monto +
    ", Descripción: " + gasto.descripcion +
    "</li>";
});
reporteDiv.innerHTML += "</ul>";
