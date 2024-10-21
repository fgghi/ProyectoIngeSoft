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

  it("permite registrar un ingreso válido", () => {
    const ingresos = new Ingresos();
    const ingresoValido = {
      fecha: "2024-10-24",
      monto: 500,
      descripcion: "Salario mensual",
    };

    ingresos.registrarIngreso(ingresoValido);
    expect(ingresos.obtenerIngresos()).toContainEqual(ingresoValido);
  });

  it("calcula correctamente el total de ingresos", () => {
    const ingresos = new Ingresos();
    const ingreso1 = { fecha: "2024-10-24", monto: 500, descripcion: "Salario" };
    const ingreso2 = { fecha: "2024-10-25", monto: 300, descripcion: "Venta" };

    ingresos.registrarIngreso(ingreso1);
    ingresos.registrarIngreso(ingreso2);
    expect(ingresos.obtenerTotalIngresos()).toBe(800);
  });
});
