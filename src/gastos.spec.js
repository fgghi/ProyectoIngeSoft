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

  // Otras pruebas según lo necesites



/*
  

  it("registrar un gasto en Alimentos", () => {
    //Given -- arrange
    const gastos = new Gastos();
    const registroGasto = {
      fecha: "2024-08-12",
      monto: 200,
      descripcion: "alimentos",
    };

    //When -act
    gastos.registrarGasto(registroGasto);

    //Then --assert
    let gastoRegistrado = gastos.obtenerGastos();
    expect(gastoRegistrado).toEqual(registroGasto);
  });

  
  it("registrar un gasto en transporte", () => {
    //Given -- arrange
    const gastos = new Gastos();
    const registroGasto = {
      fecha: "2024-08-12",
      monto: 20,
      descripcion: "transporte",
    };

    //When -act
    gastos.registrarGasto(registroGasto);

    //Then --assert
    let gastoRegistrado = gastos.obtenerGastos();
    expect(gastoRegistrado).toEqual(registroGasto);
  });
  
  it("registrar un gasto personales", () => {
    //Given -- arrange
    const gastos = new Gastos();
    const registroGasto = {
      fecha: "2024-08-12",
      monto: 40,
      descripcion: "personales",
    };

    //When -act
    gastos.registrarGasto(registroGasto);

    //Then --assert
    let gastoRegistrado = gastos.obtenerGastos();
    expect(gastoRegistrado).toEqual(registroGasto);
  });
  
  it("registrar un gasto en Otros", () => {
    //Given -- arrange
    const gastos = new Gastos();
    const registroGasto = {
      fecha: "2024-08-12",
      monto: 200,
      descripcion: "otros",
    };

    //When -act
    gastos.registrarGasto(registroGasto);

    //Then --assert
    let gastoRegistrado = gastos.obtenerGastos();
    expect(gastoRegistrado).toEqual(registroGasto);
  });*/
});