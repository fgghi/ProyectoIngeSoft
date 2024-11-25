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

  describe('Registro de Transacciones', () => {
    beforeEach(() => {
      cy.clearLocalStorage();
      cy.visit('/');
    });
  
    it('debería registrar una transacción de gasto correctamente', () => {
      cy.get('#fecha').type('2024-01-15');
      cy.get('#monto').type('100');
      cy.get('#descripcion').type('Compra de comida');
      cy.get('#tipo').select('gasto');
      cy.get('#categoria').select('comida');
      cy.get('#transacciones-form').submit();
  
      cy.get('#mensaje-exito')
        .should('be.visible')
        .and('contain', 'Registro exitoso!');
  
      cy.get('#gastos-div')
        .should('contain', 'Compra de comida')
        .and('contain', '100')
        .and('contain', 'GASTO');
    });
  
    it('debería registrar una transacción de ingreso correctamente', () => {
      cy.get('#fecha').type('2024-01-15');
      cy.get('#monto').type('1000');
      cy.get('#descripcion').type('Salario');
      cy.get('#tipo').select('ingreso');
      cy.get('#categoria').select('salud');
      cy.get('#transacciones-form').submit();
  
      cy.get('#mensaje-exito').should('be.visible');
      cy.get('#gastos-div')
        .should('contain', 'Salario')
        .and('contain', '1000')
        .and('contain', 'INGRESO');
    });
  });