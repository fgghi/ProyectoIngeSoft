document.addEventListener('DOMContentLoaded', () => {
    cargarTransacciones();
    inicializarEventListeners();
    establecerFechasDefecto();
    generarReporte();
});

let currentPeriodoType = 'mensual';
let transacciones = [];

function inicializarEventListeners() {
    document.getElementById('tipo-periodo').addEventListener('change', (event) => {
        currentPeriodoType = event.target.value;
        generarReporte();
    });
    document.getElementById('fecha-inicio').addEventListener('change', generarReporte);
    document.getElementById('fecha-fin').addEventListener('change', generarReporte);
    document.getElementById('generar-reporte').addEventListener('click', generarReporte);
}

function establecerFechasDefecto() {
    const hoy = new Date();
    const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    document.getElementById('fecha-inicio').value = inicioMes.toISOString().split('T')[0];
    document.getElementById('fecha-fin').value = hoy.toISOString().split('T')[0];
}

function cargarTransacciones() {
    transacciones = JSON.parse(localStorage.getItem('transacciones')) || [];
}

function filtrarTransacciones() {
    const fechaInicio = document.getElementById('fecha-inicio').value;
    const fechaFin = document.getElementById('fecha-fin').value;

    if (!fechaInicio || !fechaFin) {
        alert('Por favor seleccione un rango de fechas válido.');
        return [];
    }

    return transacciones.filter((transaccion) => {
        const fecha = new Date(transaccion.fecha);
        return fecha >= new Date(fechaInicio) && fecha <= new Date(fechaFin);
    });
}

function obtenerPeriodoClave(fecha) {
    const anio = fecha.getFullYear();
    switch (currentPeriodoType) {
        case 'mensual':
            const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
            return `${anio}-${mes}`;
        case 'trimestral':
            const trimestre = Math.floor(fecha.getMonth() / 3) + 1;
            return `${anio}-T${trimestre}`;
        case 'anual':
            return `${anio}`;
        default:
            return 'desconocido';
    }
}

function formatearPeriodo(periodoClave) {
    if (periodoClave.includes('-T')) {
        const [anio, trimestre] = periodoClave.split('-T');
        return `${anio} - Trimestre ${trimestre}`;
    } else if (periodoClave.includes('-')) {
        const [anio, mes] = periodoClave.split('-');
        return `${new Date(anio, parseInt(mes) - 1).toLocaleString('es', { month: 'long' })} ${anio}`;
    }
    return `Anio ${periodoClave}`;
}

function generarReporte() {
    const transaccionesFiltradas = filtrarTransacciones();
    if (!transaccionesFiltradas.length) {
        actualizarTabla({});
        actualizarResumen({ ingresos: 0, gastos: 0 });
        return;
    }

    const datosPorPeriodo = transaccionesFiltradas.reduce((acumulado, transaccion) => {
        const periodoClave = obtenerPeriodoClave(new Date(transaccion.fecha));
        if (!acumulado[periodoClave]) {
            acumulado[periodoClave] = { ingresos: 0, gastos: 0 };
        }
        const monto = parseFloat(transaccion.monto);
        if (transaccion.tipo === 'ingreso') {
            acumulado[periodoClave].ingresos += monto;
        } else {
            acumulado[periodoClave].gastos += monto;
        }
        return acumulado;
    }, {});

    actualizarTabla(datosPorPeriodo);
    actualizarResumen(datosPorPeriodo);
}

function actualizarTabla(datosPeriodo) {
    const tbody = document.getElementById('reporte-body');
    tbody.innerHTML = '';

    Object.entries(datosPeriodo).forEach(([periodo, datos]) => {
        const balance = datos.ingresos - datos.gastos;
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${formatearPeriodo(periodo)}</td>
            <td class="ingresos">$${datos.ingresos.toFixed(2)}</td>
            <td class="gastos">$${datos.gastos.toFixed(2)}</td>
            <td class="${balance >= 0 ? 'ingresos' : 'gastos'}">$${balance.toFixed(2)}</td>
        `;
        tbody.appendChild(fila);
    });
}

function actualizarResumen(datosPeriodo) {
    const totales = Object.values(datosPeriodo).reduce(
        (acumulado, datos) => {
            acumulado.ingresos += Number(datos.ingresos) || 0;
            acumulado.gastos += Number(datos.gastos) || 0;
            return acumulado;
        },
        { ingresos: 0, gastos: 0 }
    );

    const balanceTotal = totales.ingresos - totales.gastos;
    document.getElementById('resumen-periodo').innerHTML = `
        <h3>Resumen del Periodo</h3>
        <p>Total Ingresos: <span class="ingresos">$${(totales.ingresos || 0).toFixed(2)}</span></p>
        <p>Total Gastos: <span class="gastos">$${(totales.gastos || 0).toFixed(2)}</span></p>
        <p>Balance Total: <span class="${balanceTotal >= 0 ? 'ingresos' : 'gastos'}">$${(balanceTotal || 0).toFixed(2)}</span></p>
    `;
}