// ==========================================
// 👨‍⚕️ PROFESIONALES — Unificación + Modelo + Controlador
// Archivo: js/profesionales.js
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================
  // 🔧 UTILIDADES GENERALES
  // =========================================================
  class SistemaSYB {
    static normalizarTexto(texto) {
      let t = (texto || '').toString().toLowerCase();
      return t.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // quita acentos
    }
  }

  // =========================================================
  // 🌍 MAPEO DE DEPARTAMENTOS (clave interna -> etiqueta UI)
  // - Tus objetos usan claves tipo "montevideo", "rio_negro"...
  // - El <select> muestra etiquetas con mayúsculas y acentos
  // =========================================================
  let MapaDeptos = {
    artigas: "Artigas", canelones: "Canelones", cerro_largo: "Cerro Largo",
    colonia: "Colonia", durazno: "Durazno", flores: "Flores", florida: "Florida",
    lavalleja: "Lavalleja", maldonado: "Maldonado", montevideo: "Montevideo",
    paysandu: "Paysandú", rio_negro: "Río Negro", rivera: "Rivera", rocha: "Rocha",
    salto: "Salto", san_jose: "San José", soriano: "Soriano", tacuarembo: "Tacuarembó",
    treinta_y_tres: "Treinta y Tres"
  };

  // Pasa de etiqueta del <select> -> clave interna de tus objetos
  function aClaveDepto(valorSelect) {
    if (!valorSelect || valorSelect === 'Todos') return 'Todos';
    let t = valorSelect.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '_');
    // Ajustes por si las dudas
    if (t === 'paysandu') t = 'paysandu';
    if (t === 'rio_negro') t = 'rio_negro';
    if (t === 'san_jose') t = 'san_jose';
    if (t === 'tacuarembo') t = 'tacuarembo';
    if (t === 'treinta_y_tres') t = 'treinta_y_tres';
    return t;
  }

  // =========================================================
  // 🔗 ADAPTADORES: unifican nutricionistas + trainers + psicólogos
  // Salida común (DTO):
  // {
  //   id, nombre, categoria, departamento(etiqueta UI), departamentoKey(clave),
  //   especialidad, whatsapp, email, dias, avatar, tags, observacion, instagram, telefono
  // }
  // =========================================================

  function normalizarWhats(wa) {
    // Puede venir como "https://wa.me/5989..." o el número pelado
    if (!wa) return '';
    if (wa.startsWith('http')) {
      let n = wa.replace(/^https?:\/\/wa\.me\//, '').replace(/[^\d]/g, '');
      return n;
    }
    return wa.replace(/[^\d]/g, '');
  }

  function crearDTO({ nombre, categoria, deptKey, especialidad, whatsapp, email, dias, avatar, tags, observacion, instagram, telefono }) {
    let dto = {
      id: (nombre || 'sin_nombre') + '|' + (categoria || 'SinCategoria') + '|' + (deptKey || 'sin_depto'),
      nombre: nombre || 'Sin nombre',
      categoria: categoria || 'General',
      departamento: MapaDeptos[deptKey] || 'Montevideo', // etiqueta UI
      departamentoKey: deptKey || 'montevideo',          // clave interna
      especialidad: especialidad || '',
      whatsapp: normalizarWhats(whatsapp),
      email: email || '',
      dias: dias || 'A coordinar',
      avatar: avatar || 'imagenes/default.png',
      tags: Array.isArray(tags) ? tags : [],
      observacion: observacion || '',
      instagram: instagram || '',
      telefono: telefono || ''
    };
    return dto;
  }

function obtenerProfesionalesUnificados() {
  // 1) armamos todos los DTO "planos" igual que antes
  let crudos = [];

  // --- Nutrición
  if (typeof nutricionistas !== 'undefined' && nutricionistas) {
    for (let depKey in nutricionistas) {
      let lista = nutricionistas[depKey];
      if (!Array.isArray(lista)) continue;
      for (let p of lista) {
        crudos.push(crearDTO({
          nombre: p.nombre,
          categoria: 'Nutrición',
          deptKey: depKey,
          especialidad: 'Nutricionista',
          whatsapp: p.whatsapp,
          email: p.mail,
          dias: p.dias,
          avatar: p.imagen,
          tags: ['nutricion','salud'],
          observacion: p.observacion,
          instagram: p.instagram,
          telefono: p.contacto
        }));
      }
    }
  }

  // --- Entrenamiento
  if (typeof TRAINERS_DB !== 'undefined' && TRAINERS_DB) {
    for (let depKey in TRAINERS_DB) {
      let lista = TRAINERS_DB[depKey];
      if (!Array.isArray(lista)) continue;
      for (let t of lista) {
        crudos.push(crearDTO({
          nombre: t.nombre,
          categoria: 'Entrenamiento',
          deptKey: depKey,
          especialidad: t.especialidad || 'Entrenador/a Personal',
          whatsapp: t.whatsapp,
          email: t.email,
          dias: t.dias,
          avatar: t.imagen,
          tags: ['entrenamiento','fitness'],
          observacion: t.observacion,
          instagram: t.instagram,
          telefono: t.telefono
        }));
      }
    }
  }

  // --- Psicología
  if (typeof psicologos !== 'undefined' && psicologos) {
    for (let depKey in psicologos) {
      let lista = psicologos[depKey];
      if (!Array.isArray(lista)) continue;
      for (let s of lista) {
        crudos.push(crearDTO({
          nombre: s.nombre,
          categoria: 'Psicología',
          deptKey: depKey,
          especialidad: 'Psicología clínica',
          whatsapp: s.whatsapp,
          email: s.correo,
          dias: s.dias,
          avatar: s.imagen,
          tags: ['psicologia','bienestar'],
          observacion: s.observacion,
          instagram: s.instagram,
          telefono: s.telefono
        }));
      }
    }
  }

  // 2) DEDUP: mergeamos por (nombre + categoria) y juntamos todos los deptos
  let porPersona = new Map(); // key = nombre|categoria -> {dtoBase, setDeptos}
  for (let dto of crudos) {
    let key = `${dto.nombre}|${dto.categoria}`;
    if (!porPersona.has(key)) {
      porPersona.set(key, {
        base: { ...dto },                 // clon
        deptos: new Set([dto.departamentoKey])
      });
    } else {
      let reg = porPersona.get(key);
      reg.deptos.add(dto.departamentoKey);

      // completamos campos vacíos con el primer valor no vacío que aparezca
      if (!reg.base.avatar && dto.avatar) reg.base.avatar = dto.avatar;
      if (!reg.base.especialidad && dto.especialidad) reg.base.especialidad = dto.especialidad;
      if (!reg.base.whatsapp && dto.whatsapp) reg.base.whatsapp = dto.whatsapp;
      if (!reg.base.email && dto.email) reg.base.email = dto.email;
      if (!reg.base.dias && dto.dias) reg.base.dias = dto.dias;
      if (!reg.base.observacion && dto.observacion) reg.base.observacion = dto.observacion;
      if (!reg.base.instagram && dto.instagram) reg.base.instagram = dto.instagram;
      if (!reg.base.telefono && dto.telefono) reg.base.telefono = dto.telefono;
      // tags: unimos
      reg.base.tags = Array.from(new Set([...(reg.base.tags||[]), ...(dto.tags||[]) ]));
    }
  }

  // 3) Devolvemos una sola entrada por persona
  let salida = [];
  let totalDeptos = Object.keys(MapaDeptos).length;
  porPersona.forEach(({ base, deptos }) => {
    let arr = Array.from(deptos);
    base.departamentos = (arr.length === totalDeptos) ? ['*'] : arr; // '*' = todos
    // Etiqueta para mostrar (si hay varios, mostramos "X +N")
    if (base.departamentos[0] === '*') {
      base.departamento = 'Todos los departamentos';
    } else if (arr.length > 1) {
      let etiqueta0 = MapaDeptos[arr[0]] || 'Montevideo';
      base.departamento = `${etiqueta0} +${arr.length - 1}`;
    } else {
      base.departamento = MapaDeptos[arr[0]] || 'Montevideo';
    }
    base.departamentoKey = base.departamentos[0] === '*' ? '*' : arr[0];

    salida.push(base);
  });

  return salida;
}


  // =========================================================
  // 🧩 MODELO — Profesional
  // - Encapsula la lógica de coincidencia y departamentos
  // =========================================================
  class Profesional {
  constructor(dto) {
    let self = this;
    self.id = dto.id;
    self.nombre = dto.nombre;
    self.categoria = dto.categoria;

    // 👇 Mostrar y filtrar
    self.departamento = dto.departamento;                // texto para UI
    self.departamentos = Array.isArray(dto.departamentos) ? dto.departamentos.slice() : ['*']; // ['*'] -> todos

    self.especialidad = dto.especialidad;
    self.whatsapp = dto.whatsapp;
    self.email = dto.email;
    self.dias = dto.dias || 'A coordinar';
    self.avatar = dto.avatar || 'imagenes/default.png';
    self.tags = dto.tags || [];
    self.observacion = dto.observacion || '';
    self.instagram = dto.instagram || '';
    self.telefono = dto.telefono || '';
  }

  matcheaDepartamento(filtroDepEtiqueta) {
    if (filtroDepEtiqueta === 'Todos') return true;
    if (this.departamentos.includes('*')) return true;   // global
    let key = aClaveDepto(filtroDepEtiqueta);
    return this.departamentos.includes(key);
  }

  coincideCon(filtroDep, filtroCat, termino) {
    let okDep = this.matcheaDepartamento(filtroDep);
    let okCat = (filtroCat === 'Todas' || this.categoria === filtroCat);

    let t = SistemaSYB.normalizarTexto(termino);
    if (t.length === 0) return okDep && okCat;

    let enNombre = SistemaSYB.normalizarTexto(this.nombre).includes(t);
    let enEsp   = SistemaSYB.normalizarTexto(this.especialidad || '').includes(t);
    let enTags  = (this.tags || []).map(SistemaSYB.normalizarTexto).some(x => x.includes(t));
    return okDep && okCat && (enNombre || enEsp || enTags);
  }
}


  // =========================================================
  // 🧠 CONTROLADOR — Render + Filtros
  // =========================================================
  class ProfesionalesController {
    constructor() {
      let self = this;

      // Cache de nodos
      self.contenedor = document.getElementById('lista-profesionales');
      self.estado = document.getElementById('estado-profesionales');
      self.selDep = document.getElementById('filtro-departamento');
      self.selCat = document.getElementById('filtro-categoria');
      self.inputBuscar = document.getElementById('busqueda-profesional');

      // Datos en memoria
      self.items = [];
    }

    // 🔄 Obtiene y normaliza TODO lo cargado en las otras áreas
    precargar() {
      let self = this;
      self.items = [];
      let fuente = obtenerProfesionalesUnificados(); // 👈 la magia está acá
      for (let i = 0; i < fuente.length; i++) {
        self.items.push(new Profesional(fuente[i]));
      }
    }

    // 🧹 Aplica filtros de UI y renderiza
    filtrarYRender() {
      let self = this;
      if (!self.contenedor) return;

      let dep = self.selDep ? self.selDep.value : 'Todos';
      let cat = self.selCat ? self.selCat.value : 'Todas';
      let q = self.inputBuscar ? self.inputBuscar.value.trim() : '';

      let filtrados = [];
      for (let i = 0; i < self.items.length; i++) {
        let item = self.items[i];
        if (item.coincideCon(dep, cat, q)) filtrados.push(item);
      }

      self.render(filtrados);
    }

    // 🖼️ Render de tarjetas
    render(lista) {
      let self = this;
      self.contenedor.innerHTML = '';

      if (!lista || lista.length === 0) {
        if (self.estado) {
          self.estado.hidden = false;
          self.estado.textContent = 'No se encontraron profesionales con esos filtros.';
        }
        return;
      }

      if (self.estado) self.estado.hidden = true;

      for (let i = 0; i < lista.length; i++) {
        let p = lista[i];

        let card = document.createElement('article');
        card.className = 'card-profesional';
        card.setAttribute('data-aos', 'fade-up');

        // Botón WhatsApp: arma wa.me si hay número
        let linkWa = p.whatsapp ? `https://wa.me/${p.whatsapp}` : '#';

        card.innerHTML = `
          <div class="cabecera">
            <img class="avatar" src="${p.avatar}" alt="${p.nombre}">
            <div>
              <h3>${p.nombre}</h3>
              <div class="meta">${p.categoria} · ${p.departamento}</div>
              <div class="meta">${p.especialidad || ''}</div>
              ${p.observacion ? `<div class="meta">${p.observacion}</div>` : ''}
              <div class="tags">
                ${(p.tags || []).map(t => `<span class="tag">#${t}</span>`).join('')}
              </div>
              <div class="meta">Disponibilidad: ${p.dias}</div>
            </div>
          </div>
          <div class="acciones">
            <a class="btn-whatsapp" href="${linkWa}" target="_blank" rel="noopener">WhatsApp</a>
            <a class="btn-mail" href="${p.email ? `mailto:${p.email}` : '#'}">Email</a>
          </div>
        `;

        self.contenedor.appendChild(card);
      }

      // Refresh de AOS si lo usás
      if (window.AOS) { AOS.refresh(); }
    }

    // 🔗 Eventos de UI
    wireEvents() {
      let self = this;
      if (self.selDep) self.selDep.addEventListener('change', () => self.filtrarYRender());
      if (self.selCat) self.selCat.addEventListener('change', () => self.filtrarYRender());
      if (self.inputBuscar) self.inputBuscar.addEventListener('input', () => self.filtrarYRender());
    }

    // 🚀 Inicio
    init() {
      let self = this;
      self.precargar();
      self.wireEvents();
      self.filtrarYRender();
      console.log('✅ ProfesionalesController iniciado');

      // Si más tarde otras áreas agregan datos dinámicamente,
      // podemos escuchar un evento global para refrescar:
      document.addEventListener('syb:profesionales-actualizados', () => {
        self.precargar();
        self.filtrarYRender();
      });
    }
  }

  // =========================================================
  // 🟢 INICIALIZACIÓN (solo si existe la sección)
  // =========================================================
  let existe = document.getElementById('profesionales');
  if (existe && !window.__profesionalesIniciado) {
    let ctrl = new ProfesionalesController();
    ctrl.init();
    window.__profesionalesIniciado = true;
  }
});
