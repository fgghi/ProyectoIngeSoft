
function obtenerTransacciones() {
    return JSON.parse(localStorage.getItem('transacciones')) || [];
}

// Calcular totales: ingresos, gastos y patrimonio neto
function calcularTotales(transacciones) {
    return transacciones.reduce(
        (totales, transaccion) => {
            const monto = parseFloat(transaccion.monto);
            if (transaccion.tipo === 'ingreso') {
                totales.ingresos += monto;
            } else if (transaccion.tipo === 'gasto') {
                totales.gastos += monto;
            }
            return totales;
        },
        { ingresos: 0, gastos: 0 }
    );
}

// Mostrar reporte en la interfaz
function mostrarReporteEnPantalla(totales) {
    const { ingresos, gastos } = totales;
    const patrimonioNeto = ingresos - gastos;

    const balanceDiv = document.getElementById('balance-reporte');
    balanceDiv.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Concepto</th>
                    <th>Monto</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Activos (Ingresos)</td>
                    <td>${ingresos.toFixed(2)} Bs</td>
                </tr>
                <tr>
                    <td>Pasivos (Gastos)</td>
                    <td>${gastos.toFixed(2)} Bs</td>
                </tr>
                <tr class="total">
                    <td>Patrimonio Neto</td>
                    <td>${patrimonioNeto.toFixed(2)} Bs</td>
                </tr>
            </tbody>
        </table>
    `;
}

// Generar reporte en PDF
function exportarReportePDF(totales) {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    const { ingresos, gastos } = totales;
    const patrimonioNeto = ingresos - gastos;

    pdf.text("Reporte de Balance", 10, 10);
    pdf.text(`Ingresos: ${ingresos.toFixed(2)} Bs`, 10, 20);
    pdf.text(`Gastos: ${gastos.toFixed(2)} Bs`, 10, 30);
    pdf.text(`Patrimonio Neto: ${patrimonioNeto.toFixed(2)} Bs`, 10, 40);

    pdf.save("Reporte_Balance.pdf");
}

// Función principal para generar el reporte de balance
function generarReporteBalance() {
    const transacciones = obtenerTransacciones();
    const totales = calcularTotales(transacciones);
    mostrarReporteEnPantalla(totales);

    // Agregar evento para exportar PDF (si no está ya agregado)
    const botonExportarPDF = document.getElementById('exportar-pdf');
    if (!botonExportarPDF.hasAttribute('data-listener')) {
        botonExportarPDF.addEventListener('click', () => exportarReportePDF(totales));
        botonExportarPDF.setAttribute('data-listener', 'true');
    }
}

// Generar el reporte al cargar la página
document.addEventListener('DOMContentLoaded', generarReporteBalance);
