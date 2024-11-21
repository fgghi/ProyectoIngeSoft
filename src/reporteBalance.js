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
                    <td>Ingresos</td>
                    <td>${totalIngresos.toFixed(2)} Bs</td>
                </tr>
                <tr>
                    <td>Gastos</td>
                    <td>${totalGastos.toFixed(2)} Bs</td>
                </tr>
            </tbody>
        </table>
    `;
}

// Generar el reporte al cargar la página
document.addEventListener('DOMContentLoaded', generarReporteBalance);
document.getElementById('exportar-pdf').addEventListener('click', exportarReportePDF);
