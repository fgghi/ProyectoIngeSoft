//import sumar from "./sumador";

const fecha = document.querySelector("#fecha");
const monto = document.querySelector("#monto");
const descripcion = document.querySelector("#descripcion");

const form = document.querySelector("#gastos-form");
const gastosdiv = document.querySelector("#gastos-div");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const fechaValue = fecha.value;
  const montoValue = Number.parseInt(monto.value);
  const descripcionValue = descripcion.value;

  //const gastos = new Gastos();
  //gastos.registrargasto(fecha, monto, descripcion);
  //const gastoregistrado = gastos.obtenerGastos(();

  gastosdiv.innerHTML =
    "<div>" +
    fechaValue +
    "</div>" +
    "<div>" +
    montoValue +
    "</div>" +
    "<div>" +
    descripcionValue +
    "</div>";
});
