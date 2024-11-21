document.getElementById('filtrar-reporte').addEventListener('click', function () {
    const transacciones = JSON.parse(localStorage.getItem('transacciones')) || [];
    const fecha = document.getElementById('filtro-fecha').value;
    const categoria = document.getElementById('filtro-categoria').value;
    const montoMin = parseFloat(document.getElementById('filtro-monto-min').value) || 0;
    const montoMax = parseFloat(document.getElementById('filtro-monto-max').value) || Infinity;

    // Filtrar las transacciones
    const transaccionesFiltradas = transacciones.filter(transaccion => {
        const fechaValida = fecha ? transaccion.fecha === fecha : true;
        const categoriaValida = categoria ? transaccion.categoria === categoria : true;
        const montoValido = transaccion.monto >= montoMin && transaccion.monto <= montoMax;

        return fechaValida && categoriaValida && montoValido;
    });

    // Agrupar por categoría
    const reporte = agruparPorCategoria(transaccionesFiltradas);

    // Mostrar el reporte
    mostrarReporte(reporte);
});

function agruparPorCategoria(transacciones) {
    const reporte = {};

    transacciones.forEach(transaccion => {
        if (!reporte[transaccion.categoria]) {
            reporte[transaccion.categoria] = { ingresos: 0, gastos: 0 };
        }

        if (transaccion.tipo === 'ingreso') {
            reporte[transaccion.categoria].ingresos += parseFloat(transaccion.monto);
        } else if (transaccion.tipo === 'gasto') {
            reporte[transaccion.categoria].gastos += parseFloat(transaccion.monto);
        }
    });

    return reporte;
}

function mostrarReporte(reporte) {
    const reporteDiv = document.getElementById('reporte-categorias');
    reporteDiv.innerHTML = ''; // Limpiar contenido anterior

    for (const categoria in reporte) {
        const { ingresos, gastos } = reporte[categoria];
        const patrimonioNeto = ingresos - gastos;

        const categoriaElemento = document.createElement('div');
        categoriaElemento.innerHTML = `
            <h4>${categoria.charAt(0).toUpperCase() + categoria.slice(1)}</h4>
            <p>Ingresos: ${ingresos.toFixed(2)} Bs</p>
            <p>Gastos: ${gastos.toFixed(2)} Bs</p>
            <p>Patrimonio Neto: ${patrimonioNeto.toFixed(2)} Bs</p>
            <hr>
        `;
        reporteDiv.appendChild(categoriaElemento);
    }
}


