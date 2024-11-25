describe('App de Gastos e Ingresos', () => {
    beforeEach(() => {
      // Limpiar localStorage antes de cada prueba
      cy.clearLocalStorage();
      cy.visit('/');
    });
  
    it('debería cargar todos los elementos del formulario', () => {
      cy.get('#transacciones-form').should('exist');
      cy.get('#fecha').should('exist');
      cy.get('#monto').should('exist');
      cy.get('#descripcion').should('exist');
      cy.get('#tipo').should('exist');
      cy.get('#categoria').should('exist');
      cy.get('#registrar-transaccion-button').should('exist');
    });
  
    it('debería tener los botones de navegación', () => {
      cy.get('#definir-presupuesto-button').should('exist');
      cy.get('#reporte-balance-button').should('exist');
      cy.get('#reporte-categoria').should('exist');
      cy.get('#reporte-periodos').should('exist');
    });
  
    it('debería tener los botones de filtro', () => {
      cy.get('#filter-ingresos').should('exist');
      cy.get('#filter-gastos').should('exist');
      cy.get('#filter-todos').should('exist');
      cy.get('#filter-gastos-categoria').should('exist');
      cy.get('#filter-ingresos-categoria').should('exist');
    });
  });