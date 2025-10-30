// ============================================
// MENÚ HAMBURGUESA (Para móviles)
// ============================================

// Seleccionamos los elementos del DOM
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

// Evento click en el botón hamburguesa
menuToggle.addEventListener('click', function() {
    // Toggle: si tiene la clase 'active' la quita, si no la tiene, la agrega
    navLinks.classList.toggle('active');
    
    // Cambiamos el ícono entre hamburguesa y X
    const icon = menuToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Cerrar el menú cuando se hace clic en un link
const menuItems = navLinks.querySelectorAll('a');

menuItems.forEach(item => {
    item.addEventListener('click', function() {
        // Solo cerramos el menú en móviles
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});


// ============================================
// SCROLL SUAVE ADICIONAL (Fallback para navegadores viejos)
// ============================================

// Por si algún navegador no soporta scroll-behavior: smooth en CSS
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        // Si el href es solo "#", no hacemos nada
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


// ============================================
// ANIMACIÓN AL HACER SCROLL (Fade-in de elementos)
// ============================================

// Función para detectar si un elemento está visible en el viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Función para animar elementos cuando aparecen en pantalla
function animateOnScroll() {
    const elements = document.querySelectorAll('.servicio-card, .contacto-item, .mision-box');
    
    elements.forEach(element => {
        if (isElementInViewport(element)) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Configuración inicial de los elementos animables
function setupAnimations() {
    const elements = document.querySelectorAll('.servicio-card, .contacto-item, .mision-box');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
}

// Ejecutar cuando la página carga
window.addEventListener('load', function() {
    setupAnimations();
    animateOnScroll();
});

// Ejecutar cuando se hace scroll
window.addEventListener('scroll', animateOnScroll);


// ============================================
// CAMBIAR ESTILO DEL NAVBAR AL HACER SCROLL
// ============================================

const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    // Si bajamos más de 100px, agregamos una sombra más pronunciada
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});


// ============================================
// VALIDACIÓN Y MEJORA DE LINKS EXTERNOS
// ============================================

// Asegurarnos que los links externos se abran en nueva pestaña
document.addEventListener('DOMContentLoaded', function() {
    // Links de redes sociales
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    
    externalLinks.forEach(link => {
        // Si no tiene target, agregamos target="_blank"
        if (!link.hasAttribute('target')) {
            link.setAttribute('target', '_blank');
            // Por seguridad, agregamos rel="noopener noreferrer"
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
});


// ============================================
// EFECTO DE ESCRITURA EN EL TÍTULO (OPCIONAL - BONUS)
// ============================================

// Esta función es opcional, crea un efecto de máquina de escribir
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Descomenta estas líneas si quieres activar el efecto typewriter:
// window.addEventListener('load', function() {
//     const heroTitle = document.querySelector('.hero-title');
//     const originalText = heroTitle.textContent;
//     typeWriter(heroTitle, originalText, 80);
// });


// ============================================
// BOTÓN DE SCROLL TO TOP (Volver arriba)
// ============================================

// Creamos el botón dinámicamente
function createScrollTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'scroll-to-top';
    button.setAttribute('aria-label', 'Volver arriba');
    document.body.appendChild(button);
    
    // Estilos del botón (inline)
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        cursor: pointer;
        font-size: 20px;
        display: none;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        transition: all 0.3s ease;
        z-index: 999;
    `;
    
    // Mostrar/ocultar según scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            button.style.display = 'flex';
        } else {
            button.style.display = 'none';
        }
    });
    
    // Efecto hover
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.5)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
    });
    
    // Funcionalidad: volver arriba
    button.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Llamar la función cuando carga la página
window.addEventListener('load', createScrollTopButton);


// ============================================
// LAZY LOADING DE IMÁGENES (Optimización)
// ============================================

// Mejora el rendimiento cargando imágenes cuando están por verse
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Si quieres usar lazy loading, cambia en el HTML:
// <img data-src="imagenes/pablo.jpg" alt="...">
// Y descomenta la siguiente línea:
// window.addEventListener('load', lazyLoadImages);


// ============================================
// CONSOLE LOG PERSONALIZADO (Detalle profesional)
// ============================================

console.log('%c👋 ¡Hola! ', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%cSitio web desarrollado con ❤️', 'font-size: 14px; color: #764ba2;');
console.log('%cPablo González - Psicólogo Social', 'font-size: 12px; color: #666;');

// FORZAR SCROLL SUAVE (Si hay problemas)
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});