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

  it("filtra ingresos por un rango de fechas", () => {
    const ingresos = new Ingresos();

    const ingreso1 = { fecha: "2024-10-10", monto: 200, descripcion: "Venta A" };
    const ingreso2 = { fecha: "2024-10-15", monto: 300, descripcion: "Venta B" };
    const ingreso3 = { fecha: "2024-10-20", monto: 400, descripcion: "Venta C" };

    ingresos.registrarIngreso(ingreso1);
    ingresos.registrarIngreso(ingreso2);
    ingresos.registrarIngreso(ingreso3);

    const resultado = ingresos.filtrarPorRangoFechas("2024-10-12", "2024-10-18");
    expect(resultado).toEqual([ingreso2]);
  });
});
