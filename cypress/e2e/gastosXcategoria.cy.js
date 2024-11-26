describe("gastos por categoria", () => {
    it("muestra el total de gastos por categoria", () => {
      cy.visit("/index.html");
      cy.get("#fecha").type("2024-10-25");
      cy.get("#monto").type(10);
      cy.get("#descripcion").type("Café");
      cy.get("#tipo").select("gasto");
      cy.get("#categoria").select("comida");
      cy.get("#registrar-transaccion-button").click();
      
      cy.get("#filter-gastos-categoria").click();
  
      cy.get("#gastos-div")
        .should("contain", "comida")
        .and("contain", "10")
    });
  });