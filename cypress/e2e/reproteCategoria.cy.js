/*describe("Reporte de transacciones filtradas y agrupadas por categoría", () => {
    beforeEach(() => {
      // Preparar las transacciones en el localStorage antes de cada prueba
      cy.visit("/"); // Asegúrate de que la URL de la página sea correcta
      localStorage.setItem(
        "transacciones",
        JSON.stringify([
          { tipo: "ingreso", monto: "200", descripcion: "Salario", fecha: "2024-11-01", categoria: "comida" },
          { tipo: "ingreso", monto: "50", descripcion: "Venta de productos", fecha: "2024-11-02", categoria: "tecnologia" },
          { tipo: "gasto", monto: "100", descripcion: "Comida", fecha: "2024-11-01", categoria: "comida" },
          { tipo: "gasto", monto: "75", descripcion: "Alquiler", fecha: "2024-11-03", categoria: "alquiler" },
          { tipo: "ingreso", monto: "120", descripcion: "Venta de libros", fecha: "2024-11-02", categoria: "tecnologia" },
        ])
      );
      cy.reload();
    });
  
    it("muestra las transacciones filtradas por fecha", () => {
      // Establecer el valor del filtro de fecha
      cy.get("#filtro-fecha").type("2024-11-01");
  
      // Hacer clic en el botón de filtro
      cy.get("#filtrar-reporte").click();
  
      // Verificar que solo se muestren las transacciones de la fecha "2024-11-01"
      cy.get("#reporte-categorias").should("contain", "Comida");
      cy.get("#reporte-categorias").should("contain", "100.00 Bs"); // Gasto de comida
      cy.get("#reporte-categorias").should("contain", "200.00 Bs"); // Ingreso de comida
    });
  
    it("muestra las transacciones filtradas por categoría", () => {
      // Establecer el valor del filtro de categoría
      cy.get("#filtro-categoria").select("comida");
  
      // Hacer clic en el botón de filtro
      cy.get("#filtrar-reporte").click();
  
      // Verificar que solo se muestren las transacciones de la categoría "comida"
      cy.get("#reporte-categorias").should("contain", "Comida");
      cy.get("#reporte-categorias").should("contain", "200.00 Bs"); // Ingreso de comida
      cy.get("#reporte-categorias").should("contain", "100.00 Bs"); // Gasto de comida
    });
  
    it("muestra las transacciones filtradas por monto", () => {
      // Establecer el valor de los filtros de monto
      cy.get("#filtro-monto-min").type("100");
      cy.get("#filtro-monto-max").type("200");
  
      // Hacer clic en el botón de filtro
      cy.get("#filtrar-reporte").click();
  
      // Verificar que solo se muestren las transacciones cuyo monto esté en el rango 100-200
      cy.get("#reporte-categorias").should("contain", "Comida");
      cy.get("#reporte-categorias").should("contain", "200.00 Bs"); // Ingreso de comida
      cy.get("#reporte-categorias").should("contain", "100.00 Bs"); // Gasto de comida
    });
  
    it("muestra el reporte agrupado por categoría", () => {
      // Hacer clic en el botón para mostrar el reporte sin aplicar filtros
      cy.get("#filtrar-reporte").click();
  
      // Verificar que el reporte se muestra correctamente agrupado por categoría
      cy.get("#reporte-categorias").should("contain", "Comida");
      cy.get("#reporte-categorias").should("contain", "Tecnologia");
      cy.get("#reporte-categorias").should("contain", "Alquiler");
    });
  
    it("permite exportar el reporte a PDF", () => {
      // Hacer clic en el botón para exportar el reporte a PDF
      cy.get("#exportar-pdf").click();
  
      // Verificar que la acción de exportación fue ejecutada (esto puede depender de la configuración del navegador)
      cy.window().then((window) => {
        expect(window.location.href).to.include("pdf");
      });
    });
  
    it("permite exportar el reporte a Excel", () => {
      // Hacer clic en el botón para exportar el reporte a Excel
      cy.get("#exportar-excel").click();
  
      // Verificar que la acción de exportación fue ejecutada (esto puede depender de la configuración del navegador)
      cy.window().then((window) => {
        expect(window.location.href).to.include("excel");
      });
    });
  });
  */