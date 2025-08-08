/* =========================================================
   🏋️ FITNESS – Lógica de sección
   - Mantiene funciones globales para usar con atributos HTML
   - Defensas por si faltan nodos
   - Comentado para que sepas qué toca cada cosa
========================================================= */

/* ---------------------------------
   📚 "Base de datos" de trainers
--------------------------------- */

/* ---------------------------------
   🗓️ Rutinas semanales por tipo/nivel
--------------------------------- */
const rutinasSemanales = {
  cardio: {
    principiante: {
      lunes: "Caminata ligera (30 min)", martes: "Descanso",
      miercoles: "Bicicleta estática (20 min)", jueves: "Descanso",
      viernes: "Correr a ritmo suave (20 min)", sabado: "Descanso", domingo: "Descanso",
    },
    intermedio: {
      lunes: "Correr (30 min)", martes: "Descanso",
      miercoles: "HIIT Cardio (20 min)", jueves: "Descanso",
      viernes: "Nadar (40 min)", sabado: "Descanso", domingo: "Descanso",
    },
    avanzado: {
      lunes: "Sprint (25 min)", martes: "HIIT Avanzado (30 min)",
      miercoles: "Ciclismo de montaña (45 min)", jueves: "Descanso",
      viernes: "HIIT con intervalos (30 min)", sabado: "Descanso", domingo: "Descanso",
    },
  },
  fuerza: {
    principiante: {
      lunes: "Flexiones (3x10), Sentadillas (3x15)", martes: "Descanso",
      miercoles: "Peso muerto (3x10), Plancha (3x30s)", jueves: "Descanso",
      viernes: "Zancadas (3x10), Fondos de tríceps (3x10)", sabado: "Descanso", domingo: "Descanso",
    },
    intermedio: {
      lunes: "Flexiones (4x12), Sentadillas (4x15)", martes: "Descanso",
      miercoles: "Peso muerto (4x12), Plancha (3x45s)", jueves: "Descanso",
      viernes: "Zancadas con peso (4x12), Fondos (4x12)", sabado: "Descanso", domingo: "Descanso",
    },
    avanzado: {
      lunes: "Flexiones con palmada (5x15), Sentadillas con barra (5x15)",
      martes: "Peso muerto (5x12), Burpees (4x10)",
      miercoles: "Zancadas con barra (5x12), Pull-ups (4x10)", jueves: "Descanso",
      viernes: "Plancha con peso (5x1min), Ab twist con peso (4x25)", sabado: "Descanso", domingo: "Descanso",
    },
  },
  flexibilidad: {
    principiante: {
      lunes: "Estiramiento de cuello (10 min)", martes: "Descanso",
      miercoles: "Estiramiento de espalda baja (15 min)", jueves: "Estiramiento de piernas (15 min)",
      viernes: "Yoga básico (20 min)", sabado: "Descanso", domingo: "Descanso",
    },
    intermedio: {
      lunes: "Yoga intermedio (25 min)", martes: "Estiramientos dinámicos (15 min)",
      miercoles: "Yoga intermedio (25 min)", jueves: "Estiramientos de caderas (15 min)",
      viernes: "Pilates básico (20 min)", sabado: "Descanso", domingo: "Descanso",
    },
    avanzado: {
      lunes: "Yoga avanzado (40 min)", martes: "Estiramientos intensivos (30 min)",
      miercoles: "Pilates avanzado (40 min)", jueves: "Flexibilidad activa (30 min)",
      viernes: "Movilidad articular (25 min)", sabado: "Descanso", domingo: "Descanso",
    },
  },
  resistencia: {
    principiante: {
      lunes: "Caminata rápida (30 min)", martes: "Descanso",
      miercoles: "Bicicleta estática (25 min)", jueves: "Descanso",
      viernes: "Circuito de cuerpo completo (20 min)", sabado: "Descanso", domingo: "Descanso",
    },
    intermedio: {
      lunes: "Running moderado (30 min)", martes: "Descanso",
      miercoles: "Bicicleta de montaña (35 min)", jueves: "Descanso",
      viernes: "Circuito de resistencia (30 min)", sabado: "Descanso", domingo: "Descanso",
    },
    avanzado: {
      lunes: "Running (45 min)", martes: "HIIT de resistencia (30 min)",
      miercoles: "Circuito avanzado (40 min)", jueves: "Descanso",
      viernes: "Running prolongado (60 min)", sabado: "Descanso", domingo: "Descanso",
    },
  },
  hiit: {
    principiante: {
      lunes: "HIIT bajo impacto (15 min)", martes: "Descanso",
      miercoles: "HIIT fullbody (20 min)", jueves: "Descanso",
      viernes: "HIIT funcional (15 min)", sabado: "Descanso", domingo: "Descanso",
    },
    intermedio: {
      lunes: "HIIT circuito (25 min)", martes: "HIIT tren inferior (20 min)",
      miercoles: "Descanso", jueves: "HIIT tren superior (20 min)",
      viernes: "HIIT fullbody (30 min)", sabado: "Descanso", domingo: "Descanso",
    },
    avanzado: {
      lunes: "HIIT con pesas (30 min)", martes: "HIIT intensivo (30 min)",
      miercoles: "HIIT fullbody (35 min)", jueves: "Descanso",
      viernes: "HIIT experto (40 min)", sabado: "Descanso", domingo: "Descanso",
    },
  },
};

/* ---------------------------------
   🧩 Render de Personal Trainers
--------------------------------- */
function crearCardTrainer(trainer) {
  const div = document.createElement("div");
  div.className = "card-trainer";
  div.innerHTML = `
    <img src="${trainer.imagen || 'imagenes/default-trainer.png'}" alt="${trainer.nombre}">
    <h4>${trainer.nombre}</h4>

    <div class="datos">
      <p><i class="fas fa-dumbbell"></i> <strong>Especialidad:</strong> <span class="info">${trainer.especialidad || '-'}</span></p>
      <p><i class="fas fa-phone"></i> <strong>Teléfono:</strong> <a href="tel:${trainer.telefono}" class="info">${trainer.telefono || '-'}</a></p>
      <p><i class="fas fa-envelope"></i> <strong>Correo:</strong> <a href="mailto:${trainer.email}" class="info">${trainer.email || '-'}</a></p>
      <p><i class="fas fa-calendar-alt"></i> <strong>Días disponibles:</strong> <span class="info">${trainer.dias || '-'}</span></p>
    </div>

    ${trainer.observacion ? `<div class="info-observacion">📌 ${trainer.observacion}</div>` : ""}

    <div class="redes-trainer">
      ${trainer.whatsapp ? `<a href="${trainer.whatsapp}" target="_blank" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>` : ""}
      ${trainer.instagram ? `<a href="${trainer.instagram}" target="_blank" aria-label="Instagram"><i class="fab fa-instagram"></i></a>` : ""}
    </div>
  `;
  return div;
}

function mostrarPersonalTrainers() {
  const select = document.getElementById("departamentoTrainers");
  const trainersInfo = document.getElementById("trainersInfo");
  const listaTrainers = document.getElementById("listaTrainers");
  if (!select || !trainersInfo || !listaTrainers) return;

  const departamento = select.value;
  const entrenadores =
    (typeof Sistema !== "undefined" && Sistema.getTrainersPorDepto)
      ? Sistema.getTrainersPorDepto(departamento)
      : (TRAINERS_DB[departamento] || []);

  trainersInfo.style.display = "block";
  listaTrainers.innerHTML = "";

  if (entrenadores.length) {
    entrenadores.forEach(tr => listaTrainers.appendChild(crearCardTrainer(tr)));
  } else {
    const p = document.createElement("p");
    p.id = "noDisponibles";
    p.textContent = "Actualmente no hay personal trainers disponibles en este departamento.";
    listaTrainers.appendChild(p);
  }
}

/* Alias para tu typo anterior (no rompe HTML viejo) */
function mostrarPersonalTrainners() { return mostrarPersonalTrainers(); }

/* ---------------------------------
   🧮 Tabla de Rutina (según tipo/nivel)
--------------------------------- */
function mostrarTablaRutina(tipo) {
  const nivel = document.getElementById("nivelExperiencia")?.value || "principiante";
  const rutina = rutinasSemanales[tipo]?.[nivel] || {};
  const contenedorTabla = document.getElementById("tablaRutinaContenido");
  const titulo = document.getElementById("tituloTablaRutina");
  const tablaContainer = document.getElementById("tablaRutinaContainer");
  const tarjetas = document.getElementById("rutinaCards");
  if (!contenedorTabla || !titulo || !tablaContainer || !tarjetas) return;

  const dias = ["lunes","martes","miercoles","jueves","viernes","sabado","domingo"];
  contenedorTabla.innerHTML = dias.map(dia => `
    <tr>
      <td style="text-transform: capitalize">${dia}</td>
      <td colspan="4">${rutina[dia] || "Descanso"}</td>
    </tr>
  `).join("");

  titulo.textContent =
    `Rutina de ${tipo.charAt(0).toUpperCase() + tipo.slice(1)} - Nivel ${nivel.charAt(0).toUpperCase() + nivel.slice(1)}`;
  tarjetas.style.display = "none";
  tablaContainer.style.display = "block";
}

function volverACartas() {
  const tabla = document.getElementById("tablaRutinaContainer");
  const cards = document.getElementById("rutinaCards");
  if (!tabla || !cards) return;
  tabla.style.display = "none";
  cards.style.display = "flex";
}

function actualizarTodasLasRutinas() {
  const visible = document.getElementById("tablaRutinaContainer")?.style.display === "block";
  if (!visible) return;
  const titulo = document.getElementById("tituloTablaRutina")?.textContent.toLowerCase() || "";
  if (titulo.includes("cardio")) return mostrarTablaRutina("cardio");
  if (titulo.includes("fuerza")) return mostrarTablaRutina("fuerza");
  if (titulo.includes("flexibilidad")) return mostrarTablaRutina("flexibilidad");
  if (titulo.includes("resistencia")) return mostrarTablaRutina("resistencia");
  if (titulo.includes("hiit")) return mostrarTablaRutina("hiit");
}

/* ---------------------------------
   ⬇️ Descarga (PNG) de la tabla con html2canvas
--------------------------------- */
function descargarRutinaComoImagen() {
  const tabla = document.getElementById("tablaRutinaContainer");
  if (!tabla || !window.html2canvas) return;
  html2canvas(tabla).then(canvas => {
    const link = document.createElement("a");
    link.download = "rutina_semanal.png";
    link.href = canvas.toDataURL();
    link.click();
  });
}

/* ---------------------------------
   🔌 Enlaces y eventos al cargar
--------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  // Select de departamentos (si preferís usar onchange en HTML, esto es opcional)
  const deptoSelect = document.getElementById("departamentoTrainers");
  if (deptoSelect) {
    deptoSelect.addEventListener("change", mostrarPersonalTrainers);
  }

  // Cambio de nivel (actualiza si la tabla está visible)
  const nivelSelect = document.getElementById("nivelExperiencia");
  if (nivelSelect) {
    nivelSelect.addEventListener("change", actualizarTodasLasRutinas);
  }

  // Botón de descarga
  const btnDescarga = document.getElementById("descargarRutinaBtn");
  if (btnDescarga) {
    btnDescarga.addEventListener("click", descargarRutinaComoImagen);
  }
});


// 🔧 Estado inicial correcto al cargar/recargar
document.addEventListener('DOMContentLoaded', () => {
  const tarjetas = document.getElementById('rutinaCards');
  const tablaContainer = document.getElementById('tablaRutinaContainer');

  if (tarjetas) tarjetas.style.display = 'flex';   // ✅ mostrar botones
  if (tablaContainer) tablaContainer.style.display = 'none'; // ⛔ ocultar tabla
});

// (opcional) por si alguna navegación SPA deja estilos inline raros:
function resetRutinasUI() {
  const tarjetas = document.getElementById('rutinaCards');
  const tablaContainer = document.getElementById('tablaRutinaContainer');
  if (tarjetas) tarjetas.style.display = 'flex';
  if (tablaContainer) tablaContainer.style.display = 'none';
}
// Llamalo cuando entres a #fitness si usás la SPA mobile
