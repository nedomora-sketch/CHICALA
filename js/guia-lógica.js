// js/guia-logica.js
document.addEventListener('DOMContentLoaded', () => {

    // ── Botón Imprimir ──────────────────────────────
    const btnPrint = document.querySelector('.btn-print');
    if (btnPrint) {
        btnPrint.addEventListener('click', () => window.print());
    }

    // ── Validación visual de campos ─────────────────
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            input.style.borderColor = input.value.trim() === ''
                ? '#F4872B'   // Naranja: vacío
                : '#3DBE8C';  // Verde: con contenido
        });
    });

    // ── Marcadores interactivos del Torneo ──────────
    // Solo activos si hay celdas de marcador en la página
    const celdas = document.querySelectorAll(
        '#marcadorTorneo td, #marcadorYincana td'
    );

    celdas.forEach(celda => {
        // Solo celdas de puntaje (sin texto fijo de equipo)
        if (celda.querySelector('strong') || celda.textContent.includes('Equipo')) return;

        celda.style.cursor = 'pointer';
        celda.title = 'Clic para ingresar puntaje';

        celda.addEventListener('click', () => {
            const actual = celda.textContent.trim();
            const nuevo  = prompt('Ingresa el puntaje del equipo:', actual);
            if (nuevo !== null) {
                celda.textContent = nuevo;
                actualizarTotales(celda.closest('table'));
            }
        });
    });

    // ── Función: recalcular totales por fila ────────
    function actualizarTotales(tabla) {
        if (!tabla) return;
        const filas = tabla.querySelectorAll('tr:not(:first-child)');

        filas.forEach(fila => {
            const celdaFila = fila.querySelectorAll('td');
            if (celdaFila.length < 3) return;

            let suma = 0;
            // Sumar todas las celdas menos la primera (nombre) y la última (total)
            for (let i = 1; i < celdaFila.length - 1; i++) {
                const val = parseInt(celdaFila[i].textContent.trim(), 10);
                if (!isNaN(val)) suma += val;
            }

            // Actualizar celda de total (última columna)
            const celdaTotal = celdaFila[celdaFila.length - 1];
            celdaTotal.textContent = suma > 0 ? suma : '';

            // Destacar el equipo con más puntos
            destacarLider(tabla);
        });
    }

    // ── Función: destacar fila del equipo líder ─────
    function destacarLider(tabla) {
        if (!tabla) return;
        const filas  = tabla.querySelectorAll('tr:not(:first-child)');
        let maxPts   = 0;
        let filaLider = null;

        filas.forEach(fila => {
            fila.style.background = ''; // resetear
            const celdas    = fila.querySelectorAll('td');
            const celdaTotal = celdas[celdas.length - 1];
            const pts = parseInt(celdaTotal?.textContent?.trim(), 10);
            if (!isNaN(pts) && pts > maxPts) {
                maxPts    = pts;
                filaLider = fila;
            }
        });

        if (filaLider && maxPts > 0) {
            filaLider.style.background = 'rgba(247,195,37,0.25)';
        }
    }

});