// ══════════════════════════════════════════════
// CONFIGURACIÓN
// ══════════════════════════════════════════════
const CONFIG = {
    particles: {
        colors: ['#1A9BAB','#F4872B','#3DBE8C','#F7C325','#7C3AED'],
        sizes:  [8, 10, 14, 18],
        count:  24
    }
};

// ══════════════════════════════════════════════
// PARTÍCULAS FLOTANTES
// ══════════════════════════════════════════════
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    for (let i = 0; i < CONFIG.particles.count; i++) {
        const p        = document.createElement('div');
        p.className    = 'particle';
        const size     = CONFIG.particles.sizes[Math.floor(Math.random() * CONFIG.particles.sizes.length)];
        const color    = CONFIG.particles.colors[Math.floor(Math.random() * CONFIG.particles.colors.length)];
        const left     = Math.random() * 100;
        const duration = 10 + Math.random() * 16;
        const delay    = Math.random() * 12;

        p.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            left: ${left}%;
            bottom: -${size}px;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
        `;
        container.appendChild(p);
    }
}

// ══════════════════════════════════════════════
// ANIMACIÓN SECUENCIAL TIPO PRESENTACIÓN
// ══════════════════════════════════════════════
function initSequentialAnimations() {
    const elements = document.querySelectorAll('.animate-seq');

    elements.forEach(el => {
        const delay = parseInt(el.dataset.delay) || 0;
        setTimeout(() => {
            el.classList.add('visible');
        }, delay);
    });
}

// ══════════════════════════════════════════════
// EFECTOS EN ÁREA CARDS
// ══════════════════════════════════════════════
function addCardEffects() {
    document.querySelectorAll('.area-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (navigator.vibrate) navigator.vibrate(20);
        });
        card.addEventListener('click', () => {
            if (navigator.vibrate) navigator.vibrate([20, 10, 20]);
        });
    });
}

// ══════════════════════════════════════════════
// ACORDEÓN DE PERÍODOS
// ══════════════════════════════════════════════
function initAccordion() {
    const headers = document.querySelectorAll('.accordion-header');
    if (!headers.length) return;

    headers.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isOpen  = header.classList.contains('active');

            // Cerrar todos
            document.querySelectorAll('.accordion-header').forEach(h => {
                h.classList.remove('active');
                h.nextElementSibling.classList.remove('open');
            });

            // Abrir el seleccionado si estaba cerrado
            if (!isOpen) {
                header.classList.add('active');
                content.classList.add('open');
                if (navigator.vibrate) navigator.vibrate(20);
            }
        });
    });
}

// ══════════════════════════════════════════════
// INIT GLOBAL
// ══════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    initSequentialAnimations();
    addCardEffects();
    initAccordion();
    console.log('🌱 Sembrando Conocimiento en Chichalá — ¡Listo!');
});