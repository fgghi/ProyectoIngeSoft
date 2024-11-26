describe("ingresos por categoria", () => {
    it("muestra el total de ingresos por categoria", () => {
      cy.visit("/index.html");
      cy.get("#fecha").type("2024-10-25");
      cy.get("#monto").type(10);
      cy.get("#descripcion").type("para los desayunos");
      cy.get("#tipo").select("gasto");
      cy.get("#categoria").select("comida");
      cy.get("#registrar-transaccion-button").click();
      
      cy.get("#filter-ingresos-categoria").click();
  
      cy.get("#gastos-div")
        .should("contain", "comida")
        .and("contain", "10")
    });
  });