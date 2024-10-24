import Gastos from "./gastos.js";

describe("Gastos", () => {

  it("no permite registrar un gasto mayor a 40 Bs en 'compra de libros'", () => {
    const gastos = new Gastos();
    const registroGasto = {
      fecha: "2024-10-12",
      monto: 41,
      descripcion: "compra de libros",
    };

    expect(() => gastos.registrarGasto(registroGasto)).toThrow(
      "No se puede registrar un gasto mayor a 40 Bs en la categoría 'compra de libros'"
    );
  });

  it("permite registrar un gasto de 40 Bs en 'compra de libros'", () => {
    const gastos = new Gastos();
    const registroGasto = {
      fecha: "2024-10-12",
      monto: 40,
      descripcion: "compra de libros",
    };

    gastos.registrarGasto(registroGasto);
    expect(gastos.obtenerGastos()).toContainEqual(registroGasto);
  });

  it("no permite registrar un gasto mayor o igual a 30 Bs en 'pasajes'", () => {
    const gastos = new Gastos();
    const registroGasto = {
      fecha: "2024-10-12",
      monto: 30, // Cambiar a 30 para probar la validación
      descripcion: "pasajes",
    };

    expect(() => gastos.registrarGasto(registroGasto)).toThrow(
      "No se puede registrar un gasto mayor a 30 Bs en la categoría 'pasajes'"
    );
  });

  it("permite registrar un gasto menor a 30 Bs en 'pasajes'", () => {
    const gastos = new Gastos();
    const registroGasto = {
      fecha: "2024-10-12",
      monto: 29,
      descripcion: "pasajes",
    };

    gastos.registrarGasto(registroGasto);
    expect(gastos.obtenerGastos()).toContainEqual(registroGasto);
  });

  it("no permite registrar un gasto mayor a 100 Bs en 'alimentos'", () => {
    const gastos = new Gastos();
    const registroGasto = {
      fecha: "2024-08-12",
      monto: 200,
      descripcion: "alimentos",
    };
  
    expect(() => gastos.registrarGasto(registroGasto)).toThrow(
      "No se puede registrar un gasto mayor a 100 Bs en la categoría 'alimentos'"
    );
  });
  
  it("no permite registrar un gasto mayor a 100 Bs en 'personales'", () => {
    const gastos = new Gastos();
    const registroGasto = {
      fecha: "2024-08-12",
      monto: 120, // Un monto que supera el límite
      descripcion: "personales",
    };
  
    expect(() => gastos.registrarGasto(registroGasto)).toThrow(
      "No se puede registrar un gasto mayor a 100 Bs en la categoría 'personales'"
    );
  });
  it("no permite registrar un gasto mayor a 300 Bs en 'Otros'", () => {
    const gastos = new Gastos();
    const registroGasto = {
      fecha: "2024-08-12",
      monto: 400, // Un monto que supera el límite
      descripcion: "otros",
    };
  
    expect(() => gastos.registrarGasto(registroGasto)).toThrow(
      "No se puede registrar un gasto mayor a 300 Bs en la categoría 'otros'"
    );
  });
  



/*

  
  
  */
});