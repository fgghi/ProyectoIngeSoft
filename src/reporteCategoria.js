let chart = null;
let currentChartType = 'bar';
let transacciones = [];

const CHART_COLORS = [
    'rgb(255, 99, 132)',
    'rgb(54, 162, 235)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(153, 102, 255)',
    'rgb(255, 159, 64)'
];

document.addEventListener('DOMContentLoaded', () => {
    cargarTransacciones();
    inicializarEventListeners();
    cargarCategorias();
    generarReporte();
});

function inicializarEventListeners() {
    document.getElementById('fechaInicio').addEventListener('change', generarReporte);
    document.getElementById('fechaFin').addEventListener('change', generarReporte);
    document.getElementById('tipo').addEventListener('change', generarReporte);
    document.getElementById('categoria').addEventListener('change', generarReporte);
}

function cargarTransacciones() {
    transacciones = JSON.parse(localStorage.getItem('transacciones')) || [];
}

function cargarCategorias() {
    const categorias = new Set(transacciones.map(t => t.categoria));
    const selectCategoria = document.getElementById('categoria');
    selectCategoria.innerHTML = '<option value="todas">Todas</option>';
    
    categorias.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria;
        option.textContent = categoria;
        selectCategoria.appendChild(option);
    });
}

function filtrarTransacciones() {
    const fechaInicio = document.getElementById('fechaInicio').value;
    const fechaFin = document.getElementById('fechaFin').value;
    const tipo = document.getElementById('tipo').value;
    const categoria = document.getElementById('categoria').value;

    return transacciones.filter(t => {
        const cumpleFecha = (!fechaInicio || new Date(t.fecha) >= new Date(fechaInicio)) &&
                           (!fechaFin || new Date(t.fecha) <= new Date(fechaFin));
        const cumpleTipo = tipo === 'todos' || t.tipo === tipo;
        const cumpleCategoria = categoria === 'todas' || t.categoria === categoria;
        return cumpleFecha && cumpleTipo && cumpleCategoria;
    });
}

function generarReporte() {
    const transaccionesFiltradas = filtrarTransacciones();
    
    const datosPorCategoria = transaccionesFiltradas.reduce((acc, t) => {
        if (!acc[t.categoria]) {
            acc[t.categoria] = {
                categoria: t.categoria,
                ingresos: 0,
                gastos: 0
            };
        }
        
        const monto = parseFloat(t.monto);
        if (t.tipo === 'Ingreso') {
            acc[t.categoria].ingresos += monto;
        } else {
            acc[t.categoria].gastos += monto;
        }
        
        return acc;
    }, {});

    actualizarTabla(datosPorCategoria);
    actualizarGrafico(datosPorCategoria);
}

function actualizarTabla(datos) {
    const tbody = document.getElementById('tablaReporte').querySelector('tbody');
    tbody.innerHTML = '';
    
    const tipoSeleccionado = document.getElementById('tipo').value;
    const totalIngresos = Object.values(datos).reduce((sum, d) => sum + d.ingresos, 0);
    const totalGastos = Object.values(datos).reduce((sum, d) => sum + d.gastos, 0);
    
    Object.values(datos).forEach(d => {
        if (tipoSeleccionado === 'todos' || 
            (tipoSeleccionado === 'Ingreso' && d.ingresos > 0) || 
            (tipoSeleccionado === 'Gasto' && d.gastos > 0)) {
            
            const montoIngreso = d.ingresos.toFixed(2);
            const montoGasto = d.gastos.toFixed(2);
            const porcentajeIngreso = ((d.ingresos / totalIngresos) * 100).toFixed(2);
            const porcentajeGasto = ((d.gastos / totalGastos) * 100).toFixed(2);
            
            const fila = `
                <tr>
                    <td>${d.categoria}</td>
                    <td class="text-success">${montoIngreso} (${porcentajeIngreso}%)</td>
                    <td class="text-danger">${montoGasto} (${porcentajeGasto}%)</td>
                </tr>
            `;
            tbody.innerHTML += fila;
        }
    });

    const filaTotales = `
        <tr class="font-bold">
            <td>TOTAL</td>
            <td class="text-success">${totalIngresos.toFixed(2)}</td>
            <td class="text-danger">${totalGastos.toFixed(2)}</td>
        </tr>
    `;
    tbody.innerHTML += filaTotales;
}




function exportarPDF() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();
    
    pdf.text("Reporte por Categorías", 20, 20);

    const tabla = document.getElementById('tablaReporte');
    const headers = Array.from(tabla.querySelectorAll('th')).map(th => th.textContent);
    const rows = Array.from(tabla.querySelectorAll('tbody tr')).map(tr => 
        Array.from(tr.querySelectorAll('td')).map(td => td.textContent)
    );

    pdf.autoTable({
        head: [headers],
        body: rows,
        startY: 30,
    });

    const fecha = new Date().toLocaleDateString();
    pdf.text(`Fecha del reporte: ${fecha}`, 20, pdf.previousAutoTable.finalY + 10);

    pdf.save('reporte_categorias.pdf');
}

function exportarExcel() {
    const tabla = document.getElementById('tablaReporte');
    const wb = XLSX.utils.table_to_book(tabla, { sheet: "Reporte Categorías" });
    XLSX.writeFile(wb, 'reporte_categorias.xlsx');
}