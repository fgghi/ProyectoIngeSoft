function generarReporteBalance() {
    const transacciones = JSON.parse(localStorage.getItem('transacciones')) || [];

    let totalIngresos = 0;
    let totalGastos = 0;

    transacciones.forEach(transaccion => {
        if (transaccion.tipo === 'ingreso') {
            totalIngresos += parseFloat(transaccion.monto);
        } else if (transaccion.tipo === 'gasto') {
            totalGastos += parseFloat(transaccion.monto);
        }
    });

    const patrimonioNeto = totalIngresos - totalGastos;

    // Mostrar el reporte en la interfaz
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
                    <td>${totalIngresos.toFixed(2)} Bs</td>
                </tr>
                <tr>
                    <td>Pasivos (Gastos)</td>
                    <td>${totalGastos.toFixed(2)} Bs</td>
                </tr>
                <tr class="total">
                    <td>Patrimonio Neto</td>
                    <td>${patrimonioNeto.toFixed(2)} Bs</td>
                </tr>
            </tbody>
        </table>
    `;
}

// Función para exportar el reporte como PDF
async function exportarReportePDF() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    const transacciones = JSON.parse(localStorage.getItem('transacciones')) || [];
    let totalIngresos = 0;
    let totalGastos = 0;

    transacciones.forEach(transaccion => {
        if (transaccion.tipo === 'ingreso') {
            totalIngresos += parseFloat(transaccion.monto);
        } else if (transaccion.tipo === 'gasto') {
            totalGastos += parseFloat(transaccion.monto);
        }
    });

    const patrimonioNeto = totalIngresos - totalGastos;

    // Crear el reporte en PDF con Ingresos, Gastos y Patrimonio Neto
    pdf.text("Reporte de Balance", 10, 10);
    pdf.text(`Ingresos: ${totalIngresos.toFixed(2)} Bs`, 10, 20);
    pdf.text(`Gastos: ${totalGastos.toFixed(2)} Bs`, 10, 30);
    pdf.text(`Patrimonio Neto: ${patrimonioNeto.toFixed(2)} Bs`, 10, 40);  // Aquí agregamos el Patrimonio Neto

    pdf.save("Reporte_Balance.pdf");
}

// Generar el reporte al cargar la página
document.addEventListener('DOMContentLoaded', generarReporteBalance);
document.getElementById('exportar-pdf').addEventListener('click', exportarReportePDF);