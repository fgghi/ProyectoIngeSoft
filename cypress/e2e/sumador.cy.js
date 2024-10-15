describe("Sumador", () => {
  it("Shows the amount of the addition to the user", () => {
    //Given  -- arrange
    cy.visit("/");
    cy.get("#primer-numero").type(4);
    cy.get("#segundo-numero").type(5);

    //When  --act
    cy.get("#sumar-button").click();

    //Then -asser
    cy.get("#resultado-div").should("contain", "9");
  });
});
