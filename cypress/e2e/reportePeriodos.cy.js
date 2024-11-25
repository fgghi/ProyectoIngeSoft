describe('Reporte Financiero por Periodos', () => {
    beforeEach(() => {
      // Datos de prueba
      const transaccionesPrueba = [
        {
          fecha: '2024-01-01',
          tipo: 'ingreso',
          monto: 1000,
          descripcion: 'Salario Enero'
        },
        {
          fecha: '2024-01-15',
          tipo: 'gasto',
          monto: 300,
          descripcion: 'Compras'
        },
        {
          fecha: '2024-02-01',
          tipo: 'ingreso',
          monto: 1200,
          descripcion: 'Salario Febrero'
        },
        {
          fecha: '2024-02-15',
          tipo: 'gasto',
          monto: 400,
          descripcion: 'Servicios'
        }
      ];
  
      // Configurar localStorage antes de cada prueba
      cy.window().then((win) => {
        win.localStorage.setItem('transacciones', JSON.stringify(transaccionesPrueba));
      });
  
      // Visitar la página de reporte por periodos
      cy.visit('/reporteporPeriodos.html');
    });
  
    describe('Carga inicial', () => {
      it('debería cargar la página con todos los elementos necesarios', () => {
        cy.get('h1').should('contain', 'Reporte Financiero por Periodos');
        cy.get('#fecha-inicio').should('exist');
        cy.get('#fecha-fin').should('exist');
        cy.get('#tipo-periodo').should('exist');
        cy.get('#generar-reporte').should('exist');
        cy.get('#tabla-reporte').should('exist');
        cy.get('#reporte-body').should('exist');
        cy.get('#resumen-periodo').should('exist');
      });
  
      it('debería mostrar las fechas por defecto correctamente', () => {
        const hoy = new Date();
        const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
        
        const fechaInicioEsperada = inicioMes.toISOString().split('T')[0];
        const fechaFinEsperada = hoy.toISOString().split('T')[0];
  
        cy.get('#fecha-inicio').should('have.value', fechaInicioEsperada);
        cy.get('#fecha-fin').should('have.value', fechaFinEsperada);
      });
  
      it('debería tener los botones de exportación', () => {
        cy.contains('button', 'Exportar a PDF').should('exist');
        cy.contains('button', 'Exportar a Excel').should('exist');
      });
    });
  
    describe('Funcionalidad del reporte', () => {
      it('debería mostrar el reporte mensual por defecto', () => {
        cy.get('#tipo-periodo').should('have.value', 'mensual');
        cy.get('#tabla-reporte').should('exist');
      });
  
      it('debería cambiar el tipo de período correctamente', () => {
        // Verificar trimestral
        cy.get('#tipo-periodo').select('trimestral');
        cy.get('#reporte-body').should('exist');
        
        // Verificar anual
        cy.get('#tipo-periodo').select('anual');
        cy.get('#reporte-body').should('exist');
      });
  
      it('debería mostrar la estructura correcta de la tabla', () => {
        cy.get('#tabla-reporte thead tr th').should('have.length', 4);
        cy.get('#tabla-reporte thead tr').within(() => {
          cy.contains('th', 'Periodo');
          cy.contains('th', 'Ingresos');
          cy.contains('th', 'Gastos');
          cy.contains('th', 'Balance');
        });
      });
    });
  
    describe('Filtrado y cálculos', () => {
      beforeEach(() => {
        // Datos de prueba actualizados
        const transaccionesPrueba = [
          {
            fecha: '2024-01-01',
            tipo: 'ingreso',
            monto: 1000,
            descripcion: 'Salario Enero'
          },
          {
            fecha: '2024-01-15',
            tipo: 'gasto',
            monto: 300,
            descripcion: 'Compras'
          }
        ];

        // Limpiar y reiniciar localStorage antes de cada prueba
        cy.window().then((win) => {
          win.localStorage.clear();
          win.localStorage.setItem('transacciones', JSON.stringify(transaccionesPrueba));
        });

        // Recargar la página para asegurar que los datos se carguen
        cy.reload();
      });

      it('debería filtrar por rango de fechas', () => {
        cy.get('#fecha-inicio').clear().type('2024-01-01');
        cy.get('#fecha-fin').clear().type('2024-01-31');
        cy.get('#generar-reporte').click();
        
        cy.get('#reporte-body tr').should('have.length.at.least', 1);
      });

      it('debería mostrar el resumen con valores iniciales', () => {
        cy.get('#resumen-periodo').should('exist');
        cy.get('#resumen-periodo').should(($div) => {
          const text = $div.text();
          expect(text).to.include('Total Ingresos');
          expect(text).to.include('Total Gastos');
          expect(text).to.include('Balance Total');
        });
      });

      it('debería calcular los totales correctamente después de aplicar filtros', () => {
        // Establecer fechas y generar reporte
        cy.get('#fecha-inicio').clear().type('2024-01-01');
        cy.get('#fecha-fin').clear().type('2024-01-31');
        cy.get('#generar-reporte').click();

        // Verificar cada valor por separado
        cy.get('#resumen-periodo').within(() => {
          cy.contains('Total Ingresos')
            .invoke('text')
            .should('match', /\$1,*000\.00/);
          
          cy.contains('Total Gastos')
            .invoke('text')
            .should('match', /\$300\.00/);
          
          cy.contains('Balance Total')
            .invoke('text')
            .should('match', /\$700\.00/);
        });
      });

      it('debería mostrar ceros cuando no hay transacciones', () => {
        // Limpiar las transacciones
        cy.window().then((win) => {
          win.localStorage.setItem('transacciones', '[]');
        });

        // Recargar y generar reporte
        cy.reload();
        cy.get('#generar-reporte').click();

        cy.get('#resumen-periodo').within(() => {
          cy.contains('Total Ingresos')
            .should('contain', '$0.00');
          cy.contains('Total Gastos')
            .should('contain', '$0.00');
          cy.contains('Balance Total')
            .should('contain', '$0.00');
        });
      });

      it('debería validar el formato de los números en el resumen', () => {
        cy.get('#resumen-periodo').should(($div) => {
          const text = $div.text();
          // Verificar que los números tienen el formato correcto ($X.XX)
          const moneyPattern = /\$\d{1,3}(,\d{3})*\.\d{2}/;
          expect(text).to.match(moneyPattern);
        });
      });
    });
  
    describe('Validaciones', () => {
      it('debería mostrar alerta cuando no hay fechas seleccionadas', () => {
        cy.get('#fecha-inicio').clear();
        cy.get('#fecha-fin').clear();
        cy.get('#generar-reporte').click();
        
        cy.on('window:alert', (str) => {
          expect(str).to.equal('Por favor seleccione un rango de fechas válido.');
        });
      });
  
      it('debería manejar período sin transacciones', () => {
        cy.get('#fecha-inicio').clear().type('2023-01-01');
        cy.get('#fecha-fin').clear().type('2023-12-31');
        cy.get('#generar-reporte').click();
        
        cy.get('#resumen-periodo').within(() => {
          cy.contains('Total Ingresos').find('span').should('contain', '$0.00');
          cy.contains('Total Gastos').find('span').should('contain', '$0.00');
          cy.contains('Balance Total').find('span').should('contain', '$0.00');
        });
      });
    });
  
    describe('Estilos y presentación', () => {
      it('debería aplicar las clases CSS correctamente', () => {
        cy.get('.ingresos').should('exist');
        cy.get('.gastos').should('exist');
      });
    });
  });