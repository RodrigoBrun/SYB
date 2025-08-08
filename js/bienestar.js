/* =========================================
   🧠 BIENESTAR – Lógica de UI
   - Render psicólogos por departamento
   - Tarjetas de info (Relajación, etc.)
   - Generador de plan
   - Test + barra de progreso
========================================= */

/* ---------- Datos de psicólogos (demo) ---------- */
const psicologos = {
  montevideo: [
    {
      nombre: "Lic. Sofía Pereira",
      enfoque: "Mindfulness & Ansiedad",
      contacto: "099 111 111",
      email: "sofia@bienestar.com",
      dias: "Lun a Jue",
      imagen: "imagenes/default.png",
      observacion: "Atiende de forma presencial y online.",
      whatsapp: "https://wa.me/59899111111",
      instagram: "https://instagram.com/sofia.mind"
    }
  ],
  canelones: [
    {
      nombre: "Lic. Diego Álvarez",
      enfoque: "Terapia Cognitivo Conductual",
      contacto: "098 222 222",
      email: "diego@psico.com",
      dias: "Martes y Jueves",
      imagen: "imagenes/default.png",
      observacion: "Sesiones individuales y de pareja.",
      whatsapp: "https://wa.me/59898222222",
      instagram: "https://instagram.com/diego.tcc"
    }
  ]
  // …otros deptos vacíos por ahora
};

/* ---------- Mostrar psicólogos por depto ---------- */
function mostrarPsicologos() {
  const dpto = document.getElementById("departamentoPsicologos").value;
  const wrap = document.getElementById("psicologosInfo");
  const lista = document.getElementById("listaPsicologos");

  if (!wrap || !lista) return;

  lista.innerHTML = "";
  wrap.style.display = "block";

  const data = psicologos[dpto] || [];

  if (!data.length) {
    lista.innerHTML = `<p id="noDisponibles">No hay psicólogos registrados en este departamento.</p>`;
    return;
  }

  data.forEach(p => {
    const card = document.createElement("div");
    card.className = "card-psico";
    card.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}">
      <h4>${p.nombre}</h4>
      <div class="datos">
        <p><i class="fas fa-user-md"></i> <strong>Enfoque:</strong> <span class="info">${p.enfoque || "-"}</span></p>
        <p><i class="fas fa-phone"></i> <strong>Contacto:</strong> <a class="info" href="tel:${p.contacto}">${p.contacto}</a></p>
        <p><i class="fas fa-envelope"></i> <strong>Email:</strong> <a class="info" href="mailto:${p.email}">${p.email}</a></p>
        <p><i class="fas fa-calendar"></i> <strong>Días:</strong> <span class="info">${p.dias || "-"}</span></p>
      </div>
      ${p.observacion ? `<div class="info-observacion">📌 ${p.observacion}</div>` : ""}
      <div class="redes-psico">
        ${p.whatsapp ? `<a href="${p.whatsapp}" target="_blank" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>` : ""}
        ${p.instagram ? `<a href="${p.instagram}" target="_blank" aria-label="Instagram"><i class="fab fa-instagram"></i></a>` : ""}
      </div>
    `;
    lista.appendChild(card);
  });
}

/* ---------- Tarjetas de contenido (detalles) ---------- */
function mostrarBienestar(tipo) {
  const grid = document.querySelector(".bienestar-grid");
  const out = document.getElementById("resultadoBienestar");
  const content = document.getElementById("contenidoBienestar");
  if (!grid || !out || !content) return;

  const bloques = {
    relajacion: `
      <h3>Relajación</h3>
      <ul>
        <li>Respiración diafragmática 4-7-8 (3–5 min)</li>
        <li>Estiramientos suaves cuello/hombros (5 min)</li>
        <li>Ambientar con música suave y luz baja</li>
      </ul>`,
    mindfulness: `
      <h3>Mindfulness</h3>
      <ul>
        <li>Atención plena a la respiración (5–10 min)</li>
        <li>Body-scan corto (8–12 min)</li>
        <li>Registra pensamientos sin juicio</li>
      </ul>`,
    habitos: `
      <h3>Hábitos saludables</h3>
      <ul>
        <li>Rutina de sueño regular</li>
        <li>Plato balanceado 80/20</li>
        <li>Hidratación: 30–35 ml/kg/día</li>
      </ul>`,
    suenio: `
      <h3>Mejorar el sueño</h3>
      <ul>
        <li>Desconexión digital 60 min antes</li>
        <li>Evitar cafeína por la tarde</li>
        <li>Habituar horario fijo</li>
      </ul>`,
    estres: `
      <h3>Manejo del estrés</h3>
      <ul>
        <li>Técnica 5–4–3–2–1 de grounding</li>
        <li>Listas de tareas realistas</li>
        <li>Micro-pausas activas (2–3 min)</li>
      </ul>`,
    hidratacion: `
      <h3>Hidratación</h3>
      <ul>
        <li>Agua a mano todo el día</li>
        <li>Infusiones sin azúcar como alternativa</li>
        <li>Reponer más en días calurosos</li>
      </ul>`,
    ejercicio: `
      <h3>Ejercicio físico</h3>
      <ul>
        <li>150 min/sem de actividad moderada</li>
        <li>Fuerza 2–3 veces por semana</li>
        <li>Movilidad diaria 5–10 min</li>
      </ul>`,
    alimentacion: `
      <h3>Alimentación balanceada</h3>
      <ul>
        <li>Verduras 2/3 del plato</li>
        <li>Proteína magra en cada comida</li>
        <li>Ultraprocesados solo ocasional</li>
      </ul>`
  };

  content.innerHTML = bloques[tipo] || "<p>Contenido no disponible.</p>";
  grid.classList.add("oculto");
  out.classList.remove("oculto");
}
function volverABienestar() {
  const grid = document.querySelector(".bienestar-grid");
  const out = document.getElementById("resultadoBienestar");
  if (!grid || !out) return;
  out.classList.add("oculto");
  grid.classList.remove("oculto");
}

/* ---------- Generador de Plan de Bienestar ---------- */
function generarPlanBienestar() {
  const sel = document.getElementById("interes");
  const out = document.getElementById("planBienestar");
  if (!sel || !out) return;

  const v = sel.value;
  const planes = {
    relajacion: [
      "Respiración 4-7-8 (5 min) al despertar",
      "Pausa de estiramientos a mitad de jornada",
      "Ducha tibia y música calma antes de dormir"
    ],
    mindfulness: [
      "Meditación guiada 10 min / día",
      "Body-scan 2 veces por semana",
      "Registro breve de pensamientos (1 min)"
    ],
    habitos: [
      "Dormir y despertar a la misma hora",
      "Almuerzo con plato 50% verduras",
      "Caminar 20 min post cena (3× semana)"
    ],
    suenio: [
      "Cortar pantallas 60 min antes",
      "Habitación oscura y fresca",
      "Rutina relax 15 min previa al sueño"
    ],
    estres: [
      "Listar 3 prioridades por día",
      "Técnica 5-4-3-2-1 cuando te satures",
      "Micro-pausas de respiración (3 min)"
    ]
  };

  const lista = (planes[v] || []).map(i => `<li>${i}</li>`).join("");
  out.innerHTML = `
    <div class="plan-box">
      <h4>Plan recomendado</h4>
      <ul>${lista || "<li>Próximamente…</li>"}</ul>
    </div>
  `;
}

/* ---------- Test + Barra de progreso ---------- */
(function initBienestarTest() {
  const form = document.getElementById("bienestarTest");
  const bar = document.getElementById("progress");
  const box = document.getElementById("progress-bar");
  if (!form || !bar || !box) return;

  const update = () => {
    const total = form.querySelectorAll('input[type="radio"]').length / 2; // si/no
    const contestadas = new Set(
      Array.from(form.querySelectorAll('input[type="radio"]:checked')).map(i => i.name)
    ).size;
    const pct = Math.round((contestadas / total) * 100);
    bar.style.width = pct + "%";
    bar.setAttribute("aria-valuenow", pct);
  };

  form.addEventListener("change", update);
  update();
})();

function mostrarResultadosTest() {
  const form = document.getElementById("bienestarTest");
  const out = document.getElementById("testResultados");
  if (!form || !out) return;

  const si = form.querySelectorAll('input[type="radio"][value="si"]:checked').length;
  const totalPreg = form.querySelectorAll('.pregunta').length;
  const score = Math.round((si / totalPreg) * 100);

  let mensaje =
    score >= 80 ? "¡Excelente! Tu bienestar está muy sólido. Mantén tus hábitos. 💪" :
    score >= 50 ? "Vas bien. Hay margen para ajustar rutinas y descansos. ✨" :
                  "Sería bueno enfocarnos en descanso, gestión del estrés y hábitos base. 💜";

  out.innerHTML = `
    <div class="test-box">
      <h4>Resultado</h4>
      <p><strong>Puntaje:</strong> ${score}%</p>
      <p>${mensaje}</p>
    </div>
  `;
}
