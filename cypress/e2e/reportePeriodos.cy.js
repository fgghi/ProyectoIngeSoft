describe('Filtros de Transacciones', () => {
    beforeEach(() => {
      // Configurar datos de prueba
      const transaccionesPrueba = [
        {
          fecha: '2024-01-15',
          monto: 100,
          descripcion: 'Comida',
          tipo: 'gasto',
          categoria: 'comida'
        },
        {
          fecha: '2024-01-15',
          monto: 1000,
          descripcion: 'Salario',
          tipo: 'ingreso',
          categoria: 'salud'
        }
      ];
      
      cy.window().then(win => {
        win.localStorage.setItem('transacciones', JSON.stringify(transaccionesPrueba));
      });
      
      cy.visit('/');
    });
  
    it('debería filtrar solo ingresos', () => {
      cy.get('#filter-ingresos').click();
      cy.get('#gastos-div')
        .should('contain', 'Salario')
        .and('contain', 'INGRESO')
        .and('not.contain', 'Comida');
    });
  
    it('debería filtrar solo gastos', () => {
      cy.get('#filter-gastos').click();
      cy.get('#gastos-div')
        .should('contain', 'Comida')
        .and('contain', 'GASTO')
        .and('not.contain', 'Salario');
    });
  
    it('debería mostrar todos los movimientos', () => {
      cy.get('#filter-todos').click();
      cy.get('#gastos-div')
        .should('contain', 'Comida')
        .and('contain', 'Salario');
    });
  });