const transacciones = JSON.parse(localStorage.getItem('transacciones')) || [];

function generarReporte() {
    const reporteTabla = document.getElementById('reporte-tabla').querySelector('tbody');
    reporteTabla.innerHTML = ''; // Limpiar tabla

    // Agrupar transacciones por categoría y tipo
    const agrupado = transacciones.reduce((acc, transaccion) => {
        const key = `${transaccion.categoria}-${transaccion.tipo}`;
        if (!acc[key]) {
            acc[key] = { categoria: transaccion.categoria, tipo: transaccion.tipo, total: 0 };
        }
        acc[key].total += parseFloat(transaccion.monto);
        return acc;
    }, {});

    // Insertar datos en la tabla
    Object.values(agrupado).forEach(({ categoria, tipo, total }) => {
        const fila = `<tr>
            <td>${categoria}</td>
            <td>${tipo}</td>
            <td>${total.toFixed(2)}</td>
        </tr>`;
        reporteTabla.innerHTML += fila;
    });
}

function filtrarReporte() {
    const fechaInicio = document.getElementById('fechaInicio').value;
    const fechaFin = document.getElementById('fechaFin').value;
    const tipo = document.getElementById('tipo').value;
    const rangoMin = parseFloat(document.getElementById('rangoMin').value) || 0;
    const rangoMax = parseFloat(document.getElementById('rangoMax').value) || Infinity;

    const transaccionesFiltradas = transacciones.filter(transaccion => {
        const fecha = new Date(transaccion.fecha);
        const cumpleFecha = (!fechaInicio || fecha >= new Date(fechaInicio)) &&
                            (!fechaFin || fecha <= new Date(fechaFin));
        const cumpleTipo = !tipo || transaccion.tipo === tipo;
        const cumpleMonto = transaccion.monto >= rangoMin && transaccion.monto <= rangoMax;
        return cumpleFecha && cumpleTipo && cumpleMonto;
    });

    mostrarReporteFiltrado(transaccionesFiltradas);
}

function mostrarReporteFiltrado(filtradas) {
    const reporteTabla = document.getElementById('reporte-tabla').querySelector('tbody');
    reporteTabla.innerHTML = ''; // Limpiar tabla

    const agrupado = filtradas.reduce((acc, transaccion) => {
        const key = `${transaccion.categoria}-${transaccion.tipo}`;
        if (!acc[key]) {
            acc[key] = { categoria: transaccion.categoria, tipo: transaccion.tipo, total: 0 };
        }
        acc[key].total += parseFloat(transaccion.monto);
        return acc;
    }, {});

    Object.values(agrupado).forEach(({ categoria, tipo, total }) => {
        const fila = `<tr>
            <td>${categoria}</td>
            <td>${tipo}</td>
            <td>${total.toFixed(2)}</td>
        </tr>`;
        reporteTabla.innerHTML += fila;
    });
}

// Generar el reporte inicial
document.addEventListener('DOMContentLoaded', generarReporte);
