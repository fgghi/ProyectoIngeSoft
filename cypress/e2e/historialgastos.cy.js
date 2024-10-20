describe("Historial de gastos", () => {
    beforeEach(() => {
      cy.visit("/index.html");
      cy.get("#fecha").type("2024-10-25");
      cy.get("#monto").type(10);
      cy.get("#descripcion").type("Café");
      cy.get("#tipo").select("gasto");
      cy.get("#categoria").select("comida");
      cy.get("#registrar-gasto-button").click();
    });
  
    it("muestra todos los gastos en el historial con fecha y monto", () => {
      cy.get("#filter-gastos").click();
  
      cy.get("#gastos-div")
        .should("contain", "2024-10-25")
        .and("contain", "10");
    });
  });
  