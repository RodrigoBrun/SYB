/* =========================================
   🧠 BIENESTAR – Lógica de UI
   - Render psicólogos por departamento
   - Tarjetas de info (Relajación, etc.)
   - Generador de plan
   - Test + barra de progreso
========================================= */



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
  // Obtener las respuestas del formulario
  const respuestas = {
    estres: document.querySelector('input[name="estresTest"]:checked')?.value,
    suenio: document.querySelector('input[name="suenioTest"]:checked')?.value,
    alimentacion: document.querySelector('input[name="alimentacionTest"]:checked')?.value,
    actividad: document.querySelector('input[name="actividadTest"]:checked')?.value,
    emociones: document.querySelector('input[name="emocionesTest"]:checked')?.value,
    satisfaccion: document.querySelector('input[name="satisfaccionTest"]:checked')?.value
  };

  // Validar que todas las respuestas estén seleccionadas
  if (Object.values(respuestas).includes(undefined)) {
    document.getElementById("testResultados").innerHTML = "Por favor, responde todas las preguntas.";
    return;
  }

  // Calcular el bienestar general
  let bienestar = 0;
  const recomendaciones = [];

  // Evaluar las respuestas y generar recomendaciones
  if (respuestas.estres === 'no') bienestar++;
  else recomendaciones.push("Te recomendamos practicar técnicas de relajación como meditación o respiración profunda para reducir el estrés.");

  if (respuestas.suenio === 'si') bienestar++;
  else recomendaciones.push("Intenta establecer una rutina de sueño regular, evitar pantallas antes de dormir y crear un ambiente relajante para mejorar la calidad de tu sueño.");

  if (respuestas.alimentacion === 'si') bienestar++;
  else recomendaciones.push("Considera consultar con un nutricionista para crear un plan de alimentación balanceada que cubra tus necesidades y objetivos.");

  if (respuestas.actividad === 'si') bienestar++;
  else recomendaciones.push("Incorpora ejercicio moderado en tu rutina diaria. Caminar, nadar o hacer yoga son opciones efectivas.");

  if (respuestas.emociones === 'si') bienestar++;
  else recomendaciones.push("Tómate tiempo para ti mismo, busca apoyo emocional cuando lo necesites y considera practicar actividades que fomenten el bienestar emocional como el journaling o terapia.");

  if (respuestas.satisfaccion === 'si') bienestar++;
  else recomendaciones.push("Reflexiona sobre lo que te gustaría cambiar en tu vida y establece pequeños objetivos alcanzables que te ayuden a sentirte más satisfecho.");

  // Mostrar los resultados generales y recomendaciones
  let resultadoTexto = "";
  if (bienestar === 6) {
    resultadoTexto = "¡Excelente! Tu bienestar es muy alto. Sigue cuidando de ti mismo.";
  } else if (bienestar >= 4) {
    resultadoTexto = "Estás en buen camino, pero hay algunos aspectos que podrías mejorar.";
  } else if (bienestar >= 2) {
    resultadoTexto = "Parece que podrías beneficiarte de hacer algunos cambios en tu vida para mejorar tu bienestar.";
  } else {
    resultadoTexto = "Te recomendamos que busques maneras de mejorar tu bienestar, especialmente en áreas clave.";
  }

  // Mostrar los resultados
  let recomendacionesTexto = "";
  if (recomendaciones.length > 0) {
    recomendacionesTexto = "<h4>Recomendaciones:</h4><ul>";
    recomendaciones.forEach(recomendacion => {
      recomendacionesTexto += `<li>${recomendacion}</li>`;
    });
    recomendacionesTexto += "</ul>";
  }

  document.getElementById("testResultados").innerHTML = `
        <p><strong>Resultados de tu test de bienestar:</strong></p>
        <p>${resultadoTexto}</p>
        ${recomendacionesTexto}
    `;

  // Llamar a la función para actualizar la barra de progreso al final de los resultados
  updateProgress();
}
