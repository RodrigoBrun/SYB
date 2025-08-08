// =====================================
// 📚 RECURSOS — Modelo + Controlador
// Archivo: secciones/recursos/recursos.js
// =====================================
document.addEventListener('DOMContentLoaded', () => {
  // -----------------------------
  // 🔧 Utilidades / Storage
  // -----------------------------
  class SistemaSYB {
    static normalizarTexto(texto) {
      let t = (texto || '').toString().toLowerCase();
      return t.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
    static favKey() { return 'syb_favoritos_recursos_v1'; }
    static leerFavs() {
      let raw = localStorage.getItem(SistemaSYB.favKey());
      try { return raw ? JSON.parse(raw) : []; } catch { return []; }
    }
    static guardarFavs(lista) {
      localStorage.setItem(SistemaSYB.favKey(), JSON.stringify(lista || []));
    }
  }

  // ---------------------------------------
  // 🧭 Rutas internas para cada recurso
  // - key = "url" del recurso (hash lógico)
  // - section: ID de la sección principal
  // - elementId: ID dentro de la sección para scrollear
  // ---------------------------------------
  const RECURSO_ROUTES = {
    '#calorias':       { section: 'nutricion', elementId: 'calculadora' },
    '#recetas-flash':  { section: 'nutricion', elementId: 'recetasFlash' },
    '#rutina-fullbody':{ section: 'fitness',   elementId: 'rutinaCards' },
    '#mindfulness':    { section: 'bienestar', elementId: 'bienestar' } // puedes cambiar a un anchor más específico si lo agregás
  };

  // ---------------------------------------
  // 🔁 Datos de ejemplo (podés dejar tus thumbs)
  // Cambié solo las URLs de internos a hashes mapeados arriba
  // ---------------------------------------
  let datosRecursos = [
    { id: 101, titulo: 'Calculadora de Calorías', descripcion: 'Herramienta rápida para estimar gasto calórico diario.', url: '#calorias', thumb: 'imagenes/calc-calorias.jpg', tags: ['Nutrición'] },
    { id: 102, titulo: 'Rutina Full Body (PDF)', descripcion: 'Rutina base 3x por semana con progresión.',             url: '#rutina-fullbody', thumb: 'imagenes/fullbody.jpg', tags: ['Fitness'] },
    { id: 103, titulo: 'Guía de Mindfulness',     descripcion: 'Técnicas simples para reducir el estrés en 10 min.',   url: '#mindfulness', thumb: 'imagenes/mindfulness.jpg', tags: ['Bienestar','SaludMental'] },
    { id: 104, titulo: 'Recetas Flash: Avena + Toppings', descripcion: '3 combinaciones en 5 minutos: proteína, fibra y sabor.', url: '#recetas-flash', thumb: 'imagenes/avena.jpg', tags: ['Recetas','Nutrición'] },
  ];

  // ---------------------------------------
  // 🧩 Modelo
  // ---------------------------------------
  class Recurso {
    constructor({ id, titulo, descripcion, url, thumb, tags }) {
      let self = this;
      self.id = id; self.titulo = titulo; self.descripcion = descripcion;
      self.url = url; self.thumb = thumb || 'imagenes/placeholder-recurso.jpg';
      self.tags = tags || [];
    }
    coincide(tag, termino) {
      let okTag = (tag === 'Todos' || this.tags.includes(tag));
      if (!termino || termino.trim().length === 0) return okTag;
      let q = SistemaSYB.normalizarTexto(termino);
      let enTitulo = SistemaSYB.normalizarTexto(this.titulo).includes(q);
      let enDesc = SistemaSYB.normalizarTexto(this.descripcion).includes(q);
      return okTag && (enTitulo || enDesc);
    }
  }

  // ---------------------------------------
  // 🧠 Controlador
  // ---------------------------------------
  class RecursosController {
    constructor() {
      let self = this;
      // Cache nodos
      self.grid = document.getElementById('lista-recursos');
      self.estado = document.getElementById('estado-recursos');
      self.selTag = document.getElementById('filtro-tag');
      self.inputBuscar = document.getElementById('busqueda-recurso');
      self.btnFavs = document.getElementById('ver-favoritos');
      self.btnTodos = document.getElementById('ver-todos');
      // Estado
      self.items = [];
      self.modoFavoritos = false;
      self.favoritos = SistemaSYB.leerFavs(); // [ids]
    }

    precargar() {
      let self = this;
      self.items = [];
      for (let r of datosRecursos) { self.items.push(new Recurso(r)); }
    }

    // 🧭 Navegación: abre interno (sección + scroll) o externo (http/pdf)
    abrirRecurso(recurso) {
      let self = this;
      let u = (recurso.url || '').trim();

      // 1) Navegación interna (hash mapeado)
      if (u.startsWith('#') && RECURSO_ROUTES[u]) {
        let cfg = RECURSO_ROUTES[u];
        try {
          // Cambiar sección con tu función global
          if (typeof window.mostrarSeccion === 'function') {
            window.mostrarSeccion(cfg.section);
          } else {
            // Fallback: activar sección manualmente
            document.querySelectorAll('.seccion').forEach(s => s.style.display = (s.id === cfg.section ? '' : 'none'));
          }

          // Scroll suave hasta el bloque
          let intentarScroll = () => {
            let objetivo = document.getElementById(cfg.elementId) || document.querySelector(`[name="${cfg.elementId}"]`);
            if (objetivo) {
              objetivo.scrollIntoView({ behavior: 'smooth', block: 'start' });
              // Opcional: highlight rápido
              objetivo.classList.add('flash-highlight');
              setTimeout(() => objetivo.classList.remove('flash-highlight'), 1200);
              // Si usás AOS
              if (window.AOS) { AOS.refresh(); }
            }
          };
          // Dar un tiempito a que cambie la vista antes de scrollear
          setTimeout(intentarScroll, 50);
        } catch (e) {
          console.warn('Navegación interna fallida para recurso:', recurso, e);
        }
        return;
      }

      // 2) Externo: http(s) o .pdf → nueva pestaña
      if (u.startsWith('http') || /\.pdf($|\?)/i.test(u)) {
        window.open(u, '_blank', 'noopener');
        return;
      }

      // 3) Sin ruta válida: no hacemos nada
      console.warn('Recurso sin ruta conocida:', recurso);
    }

    toggleFav(id) {
      let self = this;
      let idx = self.favoritos.indexOf(id);
      if (idx === -1) self.favoritos.push(id);
      else self.favoritos.splice(idx, 1);
      SistemaSYB.guardarFavs(self.favoritos);
      self.filtrarYRender();
    }

    filtrarYRender() {
      let self = this;
      if (!self.grid) return;

      let tag = self.selTag ? self.selTag.value : 'Todos';
      let q = self.inputBuscar ? self.inputBuscar.value.trim() : '';

      let lista = [];
      for (let r of self.items) { if (r.coincide(tag, q)) lista.push(r); }

      if (self.modoFavoritos) {
        lista = lista.filter(r => self.favoritos.includes(r.id));
      }
      self.render(lista);
    }

    render(lista) {
      let self = this;
      self.grid.innerHTML = '';
      if (!lista || lista.length === 0) {
        self.estado.hidden = false;
        self.estado.textContent = self.modoFavoritos ? 'Aún no tenés favoritos.' : 'No se encontraron recursos.';
        return;
      }
      self.estado.hidden = true;

      for (let r of lista) {
        let esFav = self.favoritos.includes(r.id);
        let card = document.createElement('article');
        card.className = 'card-recurso';
        card.setAttribute('data-aos', 'fade-up');

        card.innerHTML = `
          <img class="thumb" src="${r.thumb}" alt="${r.titulo}">
          <div class="contenido">
            <h3>${r.titulo}</h3>
            <p class="desc">${r.descripcion}</p>
            <div class="tags">${r.tags.map(t => `<span class="tag">#${t}</span>`).join('')}</div>
          </div>
          <div class="acciones">
            <button class="btn btn-ir" data-id="${r.id}">Abrir</button>
            <button class="btn btn-fav" data-id="${r.id}">${esFav ? '★ Favorito' : '☆ Favorito'}</button>
          </div>
        `;

        // Listeners botones
        let btnAbrir = card.querySelector('.btn-ir');
        if (btnAbrir) {
          btnAbrir.addEventListener('click', () => {
            // buscar el recurso por id (evita closures con r)
            let id = parseInt(btnAbrir.getAttribute('data-id'), 10);
            let recurso = self.items.find(x => x.id === id);
            if (recurso) self.abrirRecurso(recurso);
          });
        }

        let btnFav = card.querySelector('.btn-fav');
        if (btnFav) {
          btnFav.addEventListener('click', () => {
            let id = parseInt(btnFav.getAttribute('data-id'), 10);
            if (!isNaN(id)) self.toggleFav(id);
          });
        }

        self.grid.appendChild(card);
      }
      if (window.AOS) { AOS.refresh(); }
    }

    wireEvents() {
      let self = this;
      if (self.selTag) self.selTag.addEventListener('change', () => self.filtrarYRender());
      if (self.inputBuscar) self.inputBuscar.addEventListener('input', () => self.filtrarYRender());
      if (self.btnFavs) self.btnFavs.addEventListener('click', () => { self.modoFavoritos = true; self.filtrarYRender(); });
      if (self.btnTodos) self.btnTodos.addEventListener('click', () => { self.modoFavoritos = false; self.filtrarYRender(); });
    }

    init() {
      let self = this;
      self.precargar();
      self.wireEvents();
      self.filtrarYRender();
      console.log('✅ RecursosController iniciado');
    }
  }

  // Inicializa si existe la sección
  let existe = document.getElementById('recursos');
  if (existe && !window.__recursosIniciado) {
    let ctrl = new RecursosController();
    ctrl.init();
    window.__recursosIniciado = true;
  }
});
