/*
Como estudiante
Quiero poder registrar gastos
Para recordarlos con facilidad 

Criterios de confirmación:
- Cuando registro un gasto que contiene fecha, monto, descripcion el mismo deberia verse en la seccion de gastos
- Si registro un gasto que no tiene monto deberia mostrar el mensaje: "No es posible registrar un gasto sin monto"
*/

describe("Registro de gasto", () => {
  // Cuando registro un gasto que contiene fecha, monto, descripcion el mismo deberia verse en la seccion de gastos
  it("muestra un gasto registrado", () => {
    //Given  -- arrange
    cy.visit("/");
    cy.get("#fecha").type("2024-10-14");
    cy.get("#monto").type(55);
    cy.get("#descripcion").type("Fotocopias varias");
    //When  --act
    cy.get("#registrar-gasto-button").click();
    //Then -assert
    cy.get("#gastos-div")
      .should("contain", "2024-10-14")
      .and("contain", "55")
      .and("contain", "Fotocopias varias");
  });
});
