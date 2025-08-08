/* =========================================================
   MAIN.JS – Navegación, Sidebar, Modo Oscuro y SPA Mobile
   - Desktop: anchors con scroll suave
   - Mobile: SPA -> muestra 1 sección a la vez
   - Requiere que TODAS las secciones tengan class="seccion"
   - Sección inicial en mobile: #nutricion
========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================
  // ✅ Inicia AOS (animaciones on scroll)
  // =========================================
  if (window.AOS && typeof AOS.init === 'function') {
    AOS.init();
  }


// 🚫 Evitar que el navegador recuerde el scroll al recargar
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// ✅ Al terminar de cargar TODO, subimos arriba y limpiamos el hash en mobile
window.addEventListener('load', () => {
  let esMobile = window.matchMedia('(max-width: 768px)').matches;

  if (esMobile) {
    // si entrás con #algo en la URL, lo sacamos para que no auto-scrollee
    if (location.hash) {
      history.replaceState(null, '', location.pathname);
    }
  }

  // forzar top de la página
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
});


  // =========================================
  // 🧭 Sidebar (hamburguesa) solo mobile
  // =========================================
  let hamburguesa = document.getElementById('hamburguesa');
  let sidebar = document.getElementById('sidebar');

  if (hamburguesa && sidebar) {
    hamburguesa.addEventListener('click', () => {
      sidebar.classList.toggle('active');   // usa tu clase actual
      let abierto = sidebar.classList.contains('active');
      sidebar.setAttribute('aria-hidden', abierto ? 'false' : 'true');
    });
  }

  // =========================================
  // 🌙 Modo oscuro con ícono + localStorage
  // =========================================
  let botonModoOscuro = document.getElementById('btn-modo-oscuro');
  let iconoModo = botonModoOscuro ? botonModoOscuro.querySelector('i') : null;

  // Restaurar estado guardado
  let modoGuardado = localStorage.getItem('modoOscuro');
  if (modoGuardado === 'true') {
    document.body.classList.add('modo-oscuro');
    if (iconoModo) {
      iconoModo.classList.remove('ph-moon');
      iconoModo.classList.add('ph-sun');
    }
  }

  // Toggle de modo
  if (botonModoOscuro && iconoModo) {
    botonModoOscuro.addEventListener('click', () => {
      let activado = document.body.classList.toggle('modo-oscuro');

      if (activado) {
        iconoModo.classList.remove('ph-moon');
        iconoModo.classList.add('ph-sun');
      } else {
        iconoModo.classList.remove('ph-sun');
        iconoModo.classList.add('ph-moon');
      }

      localStorage.setItem('modoOscuro', activado);
    });
  }

  // =========================================
  // 🔗 Navegación unificada (navbar + sidebar)
  // - En mobile: llama a mostrarSeccion(id)  (SPA)
  // - En desktop: scroll suave al ancla
  // =========================================
  function wireNavegacionSPA() {
    let enlaces = document.querySelectorAll('.nav-links a, #sidebar a');
    enlaces.forEach((a) => {
      a.addEventListener('click', (e) => {
        let hash = a.getAttribute('href'); // ej: "#fitness"
        if (!hash || !hash.startsWith('#')) return;

        let esMobile = window.matchMedia('(max-width: 768px)').matches;

        if (esMobile) {
          // Mobile → SPA (mostrar una sección)
          e.preventDefault();
          let id = hash.replace('#', ''); // "fitness"
          if (typeof mostrarSeccion === 'function') {
            mostrarSeccion(id, e);
          }
        } else {
          // Desktop → scroll suave
          e.preventDefault();
          let destino = document.querySelector(hash);
          if (destino && typeof destino.scrollIntoView === 'function') {
            destino.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });
  }

  wireNavegacionSPA(); // 👈 importante
});


/* =========================================================
   SPA mobile: mostrar una sección
   - Oculta todas las .seccion y muestra solo la elegida
   - Cierra el sidebar
   - En desktop hace scroll suave
========================================================= */
// ===============================
// SPA mobile: mostrar una sección (sin apilar)
// ===============================
function mostrarSeccion(id, e) {
  if (e && typeof e.preventDefault === 'function') e.preventDefault();

  let hash = id.startsWith('#') ? id : `#${id}`;
  let destino = document.querySelector(hash);
  if (!destino) return;

  let esMobile = window.matchMedia('(max-width: 768px)').matches;

  if (esMobile) {
    // Oculta todas y muestra solo la activa
    document.querySelectorAll('.seccion').forEach(sec => sec.classList.remove('activa'));
    destino.classList.add('activa');

    // Cierra sidebar
    let sidebar = document.getElementById('sidebar');
    if (sidebar) {
      sidebar.classList.remove('active', 'abierto');
      sidebar.setAttribute('aria-hidden', 'true');
    }

    // Scroll arriba (opcional)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    destino.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// ===============================
// Estado inicial (activa: #inicio en mobile)
// ===============================
(function initSecciones() {
  function aplicar() {
    let esMobile = window.matchMedia('(max-width: 768px)').matches;

    // 🔑 Activa/Desactiva modo SPA en <body>
    document.body.classList.toggle('spa-mobile', esMobile);

    if (esMobile) {
      // Por defecto, #nutricion (si ninguna marcada)
      let actual = document.querySelector('.seccion.activa') || document.querySelector('#inicio');
      document.querySelectorAll('.seccion').forEach(sec => sec.classList.remove('activa'));
      if (actual) actual.classList.add('activa');
    } else {
      // Desktop: no marcar activa (se ven todas)
      document.querySelectorAll('.seccion').forEach(sec => sec.classList.remove('activa'));
    }
  }
  aplicar();
  window.addEventListener('resize', aplicar);
})();
