// ===============================
// 🏠 HERO — Interacciones
// Archivo: js/hero.js
// ===============================
document.addEventListener('DOMContentLoaded', () => {
  // Rotador simple de frases
  class HeroRotator {
    constructor() {
      let self = this;
      self.el = document.getElementById('heroRotatorText');
      self.items = [
        'Calculá tus calorías en 30 segundos',
        'Probá 3 recetas listas en 5 minutos',
        'Descargá rutinas según tu nivel',
        'Mindfulness: 10 min para bajar el estrés'
      ];
      self.idx = 0;
      self.timer = null;
    }
    start() {
      let self = this;
      if (!self.el) return;
      self.timer = setInterval(() => {
        self.idx = (self.idx + 1) % self.items.length;
        self.el.textContent = self.items[self.idx];
      }, 2200);
    }
  }

  // Navegación interna con scroll suave
  function irA(dest) {
    // dest: "nutricion#calculadora" | "fitness#rutinaCards" etc
    let partes = dest.split('#');
    let seccion = partes[0];
    let anchor = partes[1];

    // cambiar sección con tu función global si existe
    if (typeof window.mostrarSeccion === 'function') {
      window.mostrarSeccion(seccion);
    } else {
      // fallback: ocultar/mostrar
      document.querySelectorAll('.seccion').forEach(s => s.style.display = (s.id === seccion ? '' : 'none'));
    }

    // scrollear al anchor
    setTimeout(() => {
      let objetivo = anchor ? document.getElementById(anchor) : document.getElementById(seccion);
      if (objetivo) objetivo.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }

  // Wire de CTAs
  document.querySelectorAll('.hero-ctas .btn[data-go]').forEach(btn => {
    btn.addEventListener('click', () => {
      let dest = btn.getAttribute('data-go');
      if (dest) irA(dest);
    });
  });

  // Buscador rápido (keywords -> destinos)
  let mapa = {
    'calculo': 'nutricion#calculadora',
    'calcular': 'nutricion#calculadora',
    'calculadora': 'nutricion#calculadora',
    'receta': 'nutricion#recetasFlash',
    'recetas': 'nutricion#recetasFlash',
    'rutina': 'fitness#rutinaCards',
    'rutinas': 'fitness#rutinaCards',
    'mindfulness': 'bienestar#bienestar',
    'estres': 'bienestar#bienestar',
    'psicologia': 'bienestar#bienestar'
  };

  let input = document.getElementById('heroSearch');
  let btnSearch = document.getElementById('heroSearchBtn');
  let ejecutarBusqueda = () => {
    let q = (input?.value || '').toLowerCase().trim();
    if (q.length === 0) return;
    let destino = null;

    // match por palabra clave (simple)
    for (let k in mapa) {
      if (q.includes(k)) { destino = mapa[k]; break; }
    }
    // fallback al más común
    if (!destino) destino = 'nutricion#calculadora';
    irA(destino);
  };

  if (btnSearch) btnSearch.addEventListener('click', ejecutarBusqueda);
  if (input) input.addEventListener('keydown', (e) => { if (e.key === 'Enter') ejecutarBusqueda(); });

  // KPIs animados (opcional: contadores rápidos)
  function animarKpi(id, target) {
    let el = document.getElementById(id);
    if (!el) return;
    let val = 0, to = Number(String(target).replace(/[^\d]/g, '')) || 0;
    let step = Math.ceil(to / 30);
    let timer = setInterval(() => {
      val += step;
      if (val >= to) { val = to; clearInterval(timer); }
      el.textContent = `+${val}`;
    }, 25);
  }
  animarKpi('kpiRecetas', 25);
  animarKpi('kpiRutinas', 10);
  animarKpi('kpiPros', 30);

  // Lanzar rotador
  let rot = new HeroRotator();
  rot.start();
});
