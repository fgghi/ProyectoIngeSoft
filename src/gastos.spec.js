import Gastos from "./gastos.js";

describe("Gastos", () => {
  it("registrar un gasto", () => {
    //Given -- arrange
    const gastos = new Gastos();
    const registroGasto = {
      fecha: "2024-10-12",
      monto: 45,
      descripcion: "compra de libros",
    };

    //When -act
    gastos.registrarGasto(registroGasto);

    //Then --assert
    let gastoRegistrado = gastos.obtenerGastos();
    expect(gastoRegistrado).toEqual(registroGasto);
  });

  it("registrar un gasto en pasajes", () => {
    //Given -- arrange
    const gastos = new Gastos();
    const registroGasto = {
      fecha: "2024-08-12",
      monto: 20,
      descripcion: "pasajes",
    };

    //When -act
    gastos.registrarGasto(registroGasto);

    //Then --assert
    let gastoRegistrado = gastos.obtenerGastos();
    expect(gastoRegistrado).toEqual(registroGasto);
  });

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
  });
});
