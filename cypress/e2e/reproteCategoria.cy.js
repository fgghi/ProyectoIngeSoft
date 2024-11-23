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
  describe('Reporte de Categorías', () => {
    beforeEach(() => {
      const transaccionesPrueba = [
        {
          fecha: '2024-01-01',
          categoria: 'Comida',
          tipo: 'Gasto',
          monto: 100,
          descripcion: 'Almuerzo'
        },
        {
          fecha: '2024-01-02',
          categoria: 'Salario',
          tipo: 'Ingreso',
          monto: 1000,
          descripcion: 'Salario mensual'
        },
        {
          fecha: '2024-01-03',
          categoria: 'Comida',
          tipo: 'Gasto',
          monto: 50,
          descripcion: 'Cena'
        }
      ];
  
      cy.window().then((win) => {
        win.localStorage.setItem('transacciones', JSON.stringify(transaccionesPrueba));
      });
  
      cy.visit('/reporteCategoria.html');
    });
  
    it('debería cargar la página con los elementos básicos', () => {
      cy.get('h1').should('contain', 'Reporte por Categorías');
      cy.get('#fechaInicio').should('exist');
      cy.get('#fechaFin').should('exist');
      cy.get('#tipo').should('exist');
      cy.get('#categoria').should('exist');
      cy.get('#graficoCategoria').should('exist');
      cy.get('#tablaReporte').should('exist');
    });
  
    it('debería cargar las categorías correctamente', () => {
      cy.get('#categoria').should('contain', 'Todas');
      cy.get('#categoria').should('contain', 'Comida');
      cy.get('#categoria').should('contain', 'Salario');
    });
  
    it('debería filtrar por tipo de transacción', () => {
      cy.get('#tipo').select('Ingreso');
      cy.get('#tablaReporte tbody tr').should('have.length', 2); 
      cy.get('#tablaReporte tbody tr').first().should('contain', 'Salario');
      cy.get('#tablaReporte tbody tr').first().should('contain', '1000.00');
  
      cy.get('#tipo').select('Gasto');
      cy.get('#tablaReporte tbody tr').should('have.length', 2); 
      cy.get('#tablaReporte tbody tr').first().should('contain', 'Comida');
      cy.get('#tablaReporte tbody tr').first().should('contain', '150.00');
    });
  
    it('debería filtrar por fecha correctamente', () => {
      cy.get('#fechaInicio').type('2024-01-01');
      cy.get('#fechaFin').type('2024-01-02');
      cy.get('#tablaReporte tbody tr').should('have.length', 3); 
    });
  
    it('debería cambiar entre tipos de gráficos', () => {
      cy.get('button').contains('Gráfico de Barras').click();
      cy.get('#graficoCategoria').should('exist');
      cy.get('canvas').should('exist');
  
      cy.get('button').contains('Gráfico Circular').click();
      cy.get('#graficoCategoria').should('exist');
      cy.get('canvas').should('exist');
    });
  
    it('debería exportar a PDF', () => {
      cy.get('button').contains('Exportar PDF').click();
      cy.readFile('cypress/downloads/reporte_categorias.pdf').should('exist');
    });
  
    it('debería exportar a Excel', () => {
      cy.get('button').contains('Exportar Excel').click();
      cy.readFile('cypress/downloads/reporte_categorias.xlsx').should('exist');
    });
  
  });