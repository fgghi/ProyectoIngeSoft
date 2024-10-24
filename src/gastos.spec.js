import Transacciones from "./transacciones.js";

describe("Transacciones", () => {
  it("registrar un gasto", () => {
    // Given -- arrange
    const transacciones = new Transacciones();
    const registroGasto = {
      fecha: "2024-10-12",
      monto: 45,
      descripcion: "compra de libros",
      tipo: "gasto",      
      categoria: "entretenimiento"
    };

    // When -- act
    transacciones.registrarTransaccion(registroGasto);

    // Then -- assert
    let gastosRegistrados = transacciones.obtenerGastos();
    expect(gastosRegistrados).toContain(registroGasto);
  });

  it("registrar un gasto en pasajes", () => {
    // Given -- arrange
    const transacciones = new Transacciones();
    const registroGasto = {
      fecha: "2024-08-12",
      monto: 20,
      descripcion: "pasajes",
      tipo: "gasto",          
      categoria: "transporte" 
    };

    // When -- act
    transacciones.registrarTransaccion(registroGasto);

    // Then -- assert
    let gastosRegistrados = transacciones.obtenerGastos();
    expect(gastosRegistrados).toContain(registroGasto);
  });

  it("registrar un ingreso por salario", () => {
    // Given -- arrange
    const transacciones = new Transacciones();
    const registroIngreso = {
      fecha: "2024-09-15",
      monto: 1500,
      descripcion: "salario mensual",
      tipo: "ingreso",   
      categoria: "salud"      
    };

    // When -- act
    transacciones.registrarTransaccion(registroIngreso);

    // Then -- assert
    let ingresosRegistrados = transacciones.obtenerIngresos();
    expect(ingresosRegistrados).toContain(registroIngreso);
  });

  it("registrar un ingreso por venta de artículos", () => {
    // Given -- arrange
    const transacciones = new Transacciones();
    const registroIngreso = {
      fecha: "2024-10-05",
      monto: 200,
      descripcion: "venta de artículos",
      tipo: "ingreso",       
      categoria: "entretenimiento" 
    };

    // When -- act
    transacciones.registrarTransaccion(registroIngreso);

    // Then -- assert
    let ingresosRegistrados = transacciones.obtenerIngresos();
    expect(ingresosRegistrados).toContain(registroIngreso);
  });

  it("Historial de gastos", () => {
    const transacciones = new Transacciones();
    const registroGasto = {
      fecha: "2024-08-12",
      monto: 20,
      descripcion: "cafe",
      tipo: "gasto",          
      categoria: "comida" 
    };

    transacciones.registrarTransaccion(registroGasto);

    let gastosRegistrados = transacciones.obtenerGastos();
    expect(gastosRegistrados).toContain(registroGasto);
  });

  it("Historial de gastos e ingresos", () => {
    const transacciones = new Transacciones();
    const registroGasto = {
      fecha: "2024-08-12",
      monto: 20,
      descripcion: "cafe",
      tipo: "gasto",          
      categoria: "comida" 
    };

    const registroIngreso = {
      fecha: "2024-10-05",
      monto: 200,
      descripcion: "venta de artículos",
      tipo: "ingreso",       
      categoria: "entretenimiento" 
    }

    transacciones.registrarTransaccion(registroGasto);
    transacciones.registrarTransaccion(registroIngreso);

    let gastosRegistrados = transacciones.obtenerTransacciones();
    expect(gastosRegistrados).toContain(registroGasto,registroIngreso);
  });
});
