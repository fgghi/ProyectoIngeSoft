describe("Reporte de balance", () => {
    it("muestra correctamente los ingresos en el reporte de balance", () => {
      cy.visit("/");
      localStorage.setItem(
        "transacciones",
        JSON.stringify([
          { tipo: "ingreso", monto: "200", descripcion: "Salario" },
          { tipo: "ingreso", monto: "50", descripcion: "Venta de productos" },
          { tipo: "gasto", monto: "100", descripcion: "Comida" },
        ])
      );

      cy.reload();
  
      cy.get("#balance-reporte").should("contain", "Ingresos");
      cy.get("#balance-reporte").should("contain", "250.00 Bs"); // 200 + 50
      cy.get("#balance-reporte").should("contain", "150.00 Bs"); // 100 de gasto
      cy.get("#balance-reporte").should("contain", "100.00 Bs"); // Patrimonio Neto: 250 - 150
    });
  
    it("muestra correctamente los gastos en el reporte de balance", () => {
      cy.visit("/");
      localStorage.setItem(
        "transacciones",
        JSON.stringify([
          { tipo: "ingreso", monto: "200", descripcion: "Salario" },
          { tipo: "gasto", monto: "50", descripcion: "Alquiler" },
          { tipo: "gasto", monto: "100", descripcion: "Comida" },
        ])
      );

      cy.reload();
  
      cy.get("#balance-reporte").should("contain", "Gastos");
      cy.get("#balance-reporte").should("contain", "150.00 Bs"); // 50 + 100
      cy.get("#balance-reporte").should("contain", "50.00 Bs"); // Patrimonio Neto: 200 - 150
    });

    it("muestra 0 Bs cuando no hay ingresos", () => {
      cy.visit("/");
      localStorage.setItem(
        "transacciones",
        JSON.stringify([{ tipo: "gasto", monto: "100", descripcion: "Comida" }])
      );
  
      cy.reload();
  
      cy.get("#balance-reporte").should("contain", "Ingresos");
      cy.get("#balance-reporte").should("contain", "0.00 Bs");
      cy.get("#balance-reporte").should("contain", "0.00 Bs"); // Patrimonio Neto: 0 - 100
    });
  
    it("muestra 0 Bs cuando no hay gastos", () => {
      cy.visit("/");
      localStorage.setItem(
        "transacciones",
        JSON.stringify([{ tipo: "ingreso", monto: "200", descripcion: "Salario" }])
      );
  
      cy.reload();
  
      cy.get("#balance-reporte").should("contain", "Gastos");
      cy.get("#balance-reporte").should("contain", "0.00 Bs");
      cy.get("#balance-reporte").should("contain", "200.00 Bs"); // Patrimonio Neto: 200 - 0
    });

    it("muestra 0 Bs si no hay transacciones en el sistema", () => {
      cy.visit("/");
      localStorage.removeItem("transacciones");
  
      cy.reload();

      cy.get("#balance-reporte").should("contain", "Ingresos");
      cy.get("#balance-reporte").should("contain", "0.00 Bs");
      cy.get("#balance-reporte").should("contain", "Gastos");
      cy.get("#balance-reporte").should("contain", "0.00 Bs");
      cy.get("#balance-reporte").should("contain", "0.00 Bs"); // Patrimonio Neto: 0 - 0
    });
});