function generarReporteBalance() {
    const transacciones = JSON.parse(localStorage.getItem('transacciones')) || [];

    let totalIngresos = 0;

    transacciones.forEach(transaccion => {
        if (transaccion.tipo === 'ingreso') {
            totalIngresos += parseFloat(transaccion.monto);
        }
    });

    // Mostrar solo los ingresos
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
            </tbody>
        </table>
    `;
}

// Generar el reporte al cargar la página
document.addEventListener('DOMContentLoaded', generarReporteBalance);
