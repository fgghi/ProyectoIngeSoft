/*
Criterios de confirmación:
Proporcionar un formulario para registrar manualmente una transacción con los siguientes campos: Monto, Tipo (Ingreso o Gasto), Fecha, Categoría (seleccionada de la lista predefinida).
Mostrar una lista cronológica de todas las transacciones registradas, mostrando monto, tipo, fecha y categoría.
*/

describe('Registrar Ingreso', () => {
    it('Debería permitir registrar un ingreso y mostrarlo en la lista de transacciones', () => {
        cy.visit('index.html');

        cy.get('#fecha').type('2024-10-23');
        cy.get('#monto').type('500');
        cy.get('#descripcion').type('Venta de libros');
        cy.get('#tipo').select('ingreso');
        cy.get('#categoria').select('comida');

        cy.get('#registrar-gasto-button').click();

        cy.get('#gastos-div').should('contain', '2024-10-23 - INGRESO: $500 (comida) - Venta de libros');
    });
});

describe('Filtrar por Ingresos y Gastos', () => {
    it('Debería permitir filtrar y mostrar solo ingresos o solo gastos', () => {
        cy.visit('index.html');

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

        cy.get('#filter-ingresos').click();
        cy.get('#gastos-div').should('contain', '2024-10-22 - INGRESO: $1000 (salud) - Salario');
        cy.get('#gastos-div').should('not.contain', '2024-10-23 - GASTO: $200 (comida) - Cena');

        cy.get('#filter-gastos').click();
        cy.get('#gastos-div').should('contain', '2024-10-23 - GASTO: $200 (comida) - Cena');
        cy.get('#gastos-div').should('not.contain', '2024-10-22 - INGRESO: $1000 (salud) - Salario');
    });
});

