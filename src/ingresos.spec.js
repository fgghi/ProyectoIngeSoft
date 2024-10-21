import Ingresos from "./ingresos.js";

describe("Ingresos", () => {
  it("no permite registrar un ingreso con monto negativo o cero", () => {
    const ingresos = new Ingresos();
    const ingresoInvalido = {
      fecha: "2024-10-24",
      monto: -100,
      descripcion: "Prueba ingreso negativo",
    };

    expect(() => ingresos.registrarIngreso(ingresoInvalido)).toThrow(
      "El monto del ingreso debe ser mayor a 0"
    );
  });
});
