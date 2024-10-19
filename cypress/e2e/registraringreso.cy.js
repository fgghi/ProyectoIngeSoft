/*
Criterios de confirmación:
Proporcionar un formulario para registrar manualmente una transacción con los siguientes campos: Monto, Tipo (Ingreso o Gasto), Fecha, Categoría (seleccionada de la lista predefinida).
Mostrar una lista cronológica de todas las transacciones registradas, mostrando monto, tipo, fecha y categoría.
*/

describe('Filtrar por Ingresos y Gastos', () => {
    it('Debería permitir filtrar y mostrar solo ingresos o solo gastos', () => {
        // Visitar la página principal
        cy.visit('index.html');

        // Completar el formulario con un ingreso
        cy.get('#fecha').type('2024-10-22');
        cy.get('#monto').type('1000');
        cy.get('#descripcion').type('Salario');
        cy.get('#tipo').select('ingreso');
        cy.get('#categoria').select('salud');
        cy.get('#registrar-gasto-button').click();

        // Completar el formulario con un gasto
        cy.get('#fecha').type('2024-10-23');
        cy.get('#monto').type('200');
        cy.get('#descripcion').type('Cena');
        cy.get('#tipo').select('gasto');
        cy.get('#categoria').select('comida');
        cy.get('#registrar-gasto-button').click();

        // Verificar que se pueden mostrar solo ingresos
        cy.get('#filter-ingresos').click();
        cy.get('#gastos-div').should('contain', '2024-10-22 - INGRESO: $1000 (salud) - Salario');
        cy.get('#gastos-div').should('not.contain', '2024-10-23 - GASTO: $200 (comida) - Cena');

        // Verificar que se pueden mostrar solo gastos
        cy.get('#filter-gastos').click();
        cy.get('#gastos-div').should('contain', '2024-10-23 - GASTO: $200 (comida) - Cena');
        cy.get('#gastos-div').should('not.contain', '2024-10-22 - INGRESO: $1000 (salud) - Salario');
    });
});
