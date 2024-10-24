

describe('Filtrar por Ingresos y Gastos', () => {
    it('Debería permitir filtrar y mostrar solo ingresos o solo gastos', () => {
        cy.visit('/index.html');

        cy.get('#fecha').type('2024-10-22');
        cy.get('#monto').type('1000');
        cy.get('#descripcion').type('Salario');
        cy.get('#tipo').select('ingreso');
        cy.get('#categoria').select('salud');
        cy.get('#registrar-gasto-button').click();

        cy.get('#fecha').type('2024-10-23');
        cy.get('#monto').type('200');
        cy.get('#descripcion').type('Cena');
        cy.get('#tipo').select('gasto');
        cy.get('#categoria').select('comida');
        cy.get('#registrar-gasto-button').click();

        cy.get('#filter-todos').click();
        cy.get('#gastos-div').should('contain', '2024-10-22 - INGRESO: $1000 (salud) - Salario');
        cy.get('#gastos-div').should('contain', '2024-10-23 - GASTO: $200 (comida) - Cena');

    });
});
