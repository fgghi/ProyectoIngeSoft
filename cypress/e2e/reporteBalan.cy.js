describe("Reporte de balance", () => {
    // Verificar que los ingresos registrados se muestren correctamente en el reporte
    it("muestra correctamente los ingresos en el reporte de balance", () => {
      // Given - Dado que existen transacciones almacenadas
      cy.visit("/");
      localStorage.setItem(
        "transacciones",
        JSON.stringify([
          { tipo: "ingreso", monto: "200", descripcion: "Salario" },
          { tipo: "ingreso", monto: "50", descripcion: "Venta de productos" },
          { tipo: "gasto", monto: "100", descripcion: "Comida" },
        ])
      );
  
      // When - Cuando la página se carga
      cy.reload();
  
      // Then - Entonces debería mostrar la suma de los ingresos en el reporte
      cy.get("#balance-reporte").should("contain", "Activos (Ingresos)");
      cy.get("#balance-reporte").should("contain", "250.00 Bs"); // 200 + 50
    });
  
    // Verificar que el reporte no incluya montos si no hay ingresos registrados
    it("muestra 0 Bs cuando no hay ingresos", () => {
      // Given - Dado que no existen ingresos registrados
      cy.visit("/");
      localStorage.setItem(
        "transacciones",
        JSON.stringify([{ tipo: "gasto", monto: "100", descripcion: "Comida" }])
      );
  
      // When - Cuando la página se carga
      cy.reload();
  
      // Then - Entonces debería mostrar 0 Bs
      cy.get("#balance-reporte").should("contain", "Activos (Ingresos)");
      cy.get("#balance-reporte").should("contain", "0.00 Bs");
    });
  
    // Verificar que el reporte muestre el formato correcto cuando no hay transacciones
    it("muestra 0 Bs si no hay transacciones en el sistema", () => {
      // Given - Dado que no hay transacciones en el sistema
      cy.visit("/");
      localStorage.removeItem("transacciones");
  
      // When - Cuando la página se carga
      cy.reload();
  
      // Then - Entonces debería mostrar 0 Bs
      cy.get("#balance-reporte").should("contain", "Activos (Ingresos)");
      cy.get("#balance-reporte").should("contain", "0.00 Bs");
    });
  });
  