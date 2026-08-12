// ══════════════════════════════════════════════
// guia-ingles.js
// Lógica interactiva para guías de Inglés
// IE Técnica Camacho Angarita · Sede Chichalá
// ══════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

    // ── Botón Imprimir ──────────────────────────
    const btnPrint = document.querySelector('.btn-print');
    if (btnPrint) {
        btnPrint.addEventListener('click', () => window.print());
    }

    // ── Simulador de Chat ───────────────────────
    iniciarChatSimulator();

});

// ════════════════════════════════════════════════
// CHAT SIMULATOR
// Flujo: opciones1 → msg2 → opciones2 →
//        msg3 → opciones3 → msgFinal → misionCompletada
// ════════════════════════════════════════════════
function iniciarChatSimulator() {

    // Mapa de flujo: al responder correctamente en opcionesX,
    // se revela el siguente par (mensajeX, opcionesX)
    const flujo = [
        { opciones: 'opciones1', siguiente: ['msg2', 'opciones2'] },
        { opciones: 'opciones2', siguiente: ['msg3', 'opciones3'] },
        { opciones: 'opciones3', siguiente: ['msgFinal', 'misionCompletada'] },
    ];

    flujo.forEach(({ opciones, siguiente }) => {
        const contenedor = document.getElementById(opciones);
        if (!contenedor) return;

        const botones = contenedor.querySelectorAll('.chat-opcion');

        botones.forEach(btn => {
            btn.addEventListener('click', () => {

                // Evitar doble clic
                if (contenedor.dataset.respondido === 'true') return;

                const esCorrecta = btn.classList.contains('correcta');
                const feedback   = btn.dataset.feedback;

                // Marcar visualmente el botón seleccionado
                btn.classList.add(
                    esCorrecta ? 'seleccionada-correcta' : 'seleccionada-incorrecta'
                );

                // Deshabilitar todos los botones de este bloque
                botones.forEach(b => {
                    b.style.pointerEvents = 'none';
                    b.style.opacity = b === btn ? '1' : '0.45';
                });

                // Mostrar feedback
                mostrarFeedback(contenedor, feedback, esCorrecta);

                if (esCorrecta) {
                    // Marcar como respondido
                    contenedor.dataset.respondido = 'true';

                    // Revelar siguiente mensaje y opciones con delay
                    setTimeout(() => {
                        siguiente.forEach(id => {
                            const el = document.getElementById(id);
                            if (el) {
                                el.classList.remove('chat-oculto');
                                el.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'nearest'
                                });
                            }
                        });
                    }, 900);
                }
            });
        });
    });
}

// ── Crear y mostrar burbuja de feedback ─────────
function mostrarFeedback(contenedor, texto, esCorrecta) {
    // Eliminar feedback previo si existe
    const previo = contenedor.querySelector('.chat-feedback');
    if (previo) previo.remove();

    const div = document.createElement('div');
    div.classList.add('chat-feedback', esCorrecta ? 'correcto' : 'incorrecto');
    div.textContent = texto;
    contenedor.appendChild(div);
}