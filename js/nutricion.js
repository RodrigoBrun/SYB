/* =========================================================
   NUTRICIÓN – JS (global, opción A)
   - Botones y selects llaman funciones globales
   - Usa let, document.querySelector, forEach
   - Respeta tus clases/IDs y quita .oculto al mostrar
========================================================= */

/* (Opcional/seguro) Registrar DataLabels si ya está cargado por CDN */
(function () {
  if (window.Chart && window.ChartDataLabels) {
    try { Chart.register(ChartDataLabels); } catch (e) {}
  }
})();

/* ========================================
   📌 FUNCIÓN: Mostrar dieta según objetivo
======================================== */
function mostrarDieta(opcion) {
  // Ocultar el contenedor de tarjetas
  document.querySelector(".card-container").style.display = "none";

  // Variable para almacenar la información a mostrar
  let mensaje = "";

  switch (opcion) {
    case "bajar":
      mensaje = `
          <h3>🔥Para bajar de peso</h3>
          <p>Adoptá un enfoque inteligente y sostenible para la pérdida de peso 🧠🍽️. Prioriza el consumo de proteínas magras (como pollo, pescado o tofu) que ayudan a preservar tu masa muscular 💪, y combinálas con carbohidratos complejos (como avena, arroz integral o legumbres) para mantenerte saciado por más tiempo 🍠🥦.
Reducí ligeramente tu ingesta calórica diaria sin dejar de nutrir tu cuerpo con alimentos naturales, frescos y balanceados 🥗.
Sumá actividad física regular 🏃‍♂️ y descansá bien 🛌. ¡Tu bienestar es el mejor indicador de progreso! 🌟</p>
        `;
      break;
    case "subir":
      mensaje = `
          <h3>🏋️‍♂️Para subir de peso</h3>
          <p>Si querés aumentar tu peso de manera saludable, el secreto está en una ingesta calórica superior a tu gasto energético 🔥. Incorporá alimentos ricos en proteínas de calidad (como huevos, carnes magras, legumbres o yogur griego) y carbohidratos complejos (como avena, arroz, papa y pan integral) 🍳🥔🍞.
Comé varias veces al día y no te saltees comidas 🍽️. Sumá snacks nutritivos como frutos secos, batidos naturales o barritas energéticas 🥜🥤.
Combiná tu alimentación con un plan de entrenamiento de fuerza progresivo 💪. ¡Así lograrás un aumento de masa muscular equilibrado, sin acumular grasa en exceso! ⚖️✨</p>
        `;
      break;
    case "definir":
      mensaje = `
          <h3>✨Para definir</h3>
          <p>Si ya ganaste masa muscular y querés resaltar definición y marcar tu físico, lo clave es ajustar tu alimentación con inteligencia 🧠🍽️.
Reducí levemente los carbohidratos 🥖, mantené una buena dosis de proteínas de alta calidad 🍗🧀 y sumá grasas saludables como palta, aceite de oliva o frutos secos 🥑🌰.
Esto ayuda a preservar el músculo mientras disminuye el porcentaje de grasa corporal 🔥.
Comé en horarios regulares, hidratate bien 💧 y acompañá tu alimentación con entrenamiento de fuerza + cardio moderado 🏋️‍♀️🏃‍♂️.
💡 Recordá: Definir no es solo bajar de peso, ¡es optimizar tu composición corporal y sentirte increíble en el proceso! 💪🌟</p>
        `;
      break;
    case "mantenerse":
      mensaje = `
          <h3>🌿Para mantenerse saludable</h3>
          <p>Si tu meta es sentirte bien todos los días y cuidar tu bienestar general, lo ideal es seguir una alimentación balanceada, variada y sostenible 🍽️🌈.
Incorporá una buena mezcla de frutas 🍓, verduras 🥦, cereales integrales 🌾, proteínas magras 🍗 y grasas saludables 🥑, en porciones adecuadas.
No se trata de hacer dietas estrictas, sino de nutrir tu cuerpo de forma inteligente y consciente 🧠💚.
Sumá actividad física regular, buen descanso 😴 y una hidratación constante 💧.
✨ Tu energía, tu humor y tu salud lo van a agradecer cada día.</p>
        `;
      break;
    case "balanceada":
      mensaje = `
          <h3>🥗 Dieta balanceada</h3>
          <p>Una dieta balanceada significa comer con inteligencia y variedad 🍽️. Combina todos los grupos de alimentos en proporciones adecuadas para asegurar una nutrición completa y sostenida 🧘‍♂️💪.

Incluye proteínas magras como pollo o legumbres 🍗, carbohidratos complejos como arroz integral o avena 🍚, grasas saludables como palta o frutos secos 🥑, y por supuesto, muchas frutas y verduras de colores 🌈🥦🍓.

Además, no olvides los lácteos o sus reemplazos ricos en calcio 🧀.
✨ Comer equilibradamente mejora tu energía, concentración y bienestar general. ¡Tu cuerpo y mente te lo agradecerán!

</p>
        `;
      break;
    default:
      mensaje = `<p>Elige una opción válida.</p>`;
  }

  // Agregar un botón para volver a la lista de objetivos
  mensaje += `<button onclick="volverOpciones()">Volver</button>`;

  // Insertar la información en el área correspondiente y mostrarla
  const resultado = document.querySelector("#resultadoDieta");
  resultado.innerHTML = mensaje;
  resultado.style.display = "block";
}

/* ========================================
   📌 FUNCIÓN: Volver a opciones de dieta
======================================== */
// Función para volver a mostrar las tarjetas de opciones
function volverOpciones() {
  document.querySelector("#resultadoDieta").style.display = "none";
  document.querySelector(".card-container").style.display = "flex";
}

/* ========================================
   📌 CALCULADORA DE CALORÍAS (GLOBAL)
   - Debe estar global para onsubmit="calcularCalorias()"
======================================== */
function calcularCalorias() {
  let genero = document.querySelector('input[name="genero"]:checked')?.value;
  let peso = parseFloat(document.getElementById("peso")?.value);
  let altura = parseFloat(document.getElementById("altura")?.value);
  let edad = parseInt(document.getElementById("edad")?.value);
  let actividad = parseFloat(document.getElementById("actividad")?.value);
  let objetivo = document.getElementById("objetivo")?.value;

  // Validación
  if (isNaN(peso) || isNaN(altura) || isNaN(edad) || peso <= 0 || altura <= 0 || edad <= 0) {
    let resBad = document.getElementById("resultado");
    if (resBad) resBad.innerHTML = "<p style='color:red'>Por favor, ingresa valores válidos (mayores a 0).</p>";
    return;
  }

  // BMR
  let bmr = (genero === "masculino")
    ? 88.362 + (13.397 * peso) + (4.799 * altura) - (5.677 * edad)
    : 447.593 + (9.247 * peso) + (3.098 * altura) - (4.330 * edad);

  let tdee = bmr * actividad;
  let caloriasFinales = tdee;

  if (objetivo === "bajar") caloriasFinales = tdee - 500;
  else if (objetivo === "subir") caloriasFinales = tdee + 500;
  else if (objetivo === "definir") caloriasFinales = tdee - 300;

  // Macros
  let proteinas, carbohidratos, grasas;
  if (objetivo === "bajar") {
    proteinas = peso * 2.2;
    carbohidratos = (caloriasFinales * 0.4) / 4;
    grasas = (caloriasFinales * 0.3) / 9;
  } else if (objetivo === "subir") {
    proteinas = peso * 2.0;
    carbohidratos = (caloriasFinales * 0.5) / 4;
    grasas = (caloriasFinales * 0.25) / 9;
  } else if (objetivo === "definir") {
    proteinas = peso * 2.5;
    carbohidratos = (caloriasFinales * 0.35) / 4;
    grasas = (caloriasFinales * 0.25) / 9;
  } else {
    proteinas = peso * 1.8;
    carbohidratos = (caloriasFinales * 0.45) / 4;
    grasas = (caloriasFinales * 0.3) / 9;
  }

  // Resultados
  let res = document.getElementById("resultado");
  if (res) {
    res.innerHTML = `
      <p>Calorías diarias recomendadas: <strong>${Math.round(caloriasFinales)} kcal</strong></p>
      <p>Proteínas: <strong>${Math.round(proteinas)} g</strong></p>
      <p>Carbohidratos: <strong>${Math.round(carbohidratos)} g</strong></p>
      <p>Grasas: <strong>${Math.round(grasas)} g</strong></p>
    `;
  }

  // Mostrar gráfico
  mostrarGrafico(proteinas, carbohidratos, grasas);
}

/* ========================================
   📊 GRÁFICO (Chart.js + DataLabels) con variables CSS
   - Usa: --color-secundario, --color-principal, --color-boton-hover
   - Textos/tooltip toman --color-texto y --color-fondo
======================================== */
function mostrarGrafico(proteinas, carbohidratos, grasas) {
  // Helpers para leer variables y convertir a rgba
  function cssVar(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }
  function hexToRGBA(hex, a) {
    // soporta #RGB, #RRGGBB
    let c = hex.replace('#','');
    if (c.length === 3) c = c.split('').map(ch => ch + ch).join('');
    let r = parseInt(c.slice(0,2),16), g = parseInt(c.slice(2,4),16), b = parseInt(c.slice(4,6),16);
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  // Colores desde tu paleta
  let cSec   = cssVar('--color-secundario') || '#00BFA6';
  let cPrin  = cssVar('--color-principal')  || '#1E2A38';
  let cHover = cssVar('--color-boton-hover')|| '#008f7a';
  let cTexto = cssVar('--color-texto')      || '#1E2A38';
  let cFondo = cssVar('--color-fondo')      || '#ffffff';

  let card = document.getElementById("chartContainer");
  if (card) {
    card.classList.remove("oculto");
    card.style.display = "block";
  }

  let canvas = document.getElementById("macrosChart");
  if (!canvas || !window.Chart) return;

  let ctx = canvas.getContext("2d");
  if (window.macrosChart && typeof window.macrosChart.destroy === "function") {
    window.macrosChart.destroy();
  }

  let total = proteinas + carbohidratos + grasas;

  window.macrosChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Proteínas", "Carbohidratos", "Grasas"],
      datasets: [{
        data: [proteinas, carbohidratos, grasas],
        // 🎨 Colores desde variables (con alpha para relleno)
        backgroundColor: [
          hexToRGBA(cPrin, 0.85),
          hexToRGBA(cSec, 0.85),
          hexToRGBA(cHover, 0.85)
        ],
        borderColor: [cPrin, cSec, cHover],
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '60%',
      plugins: {
        legend: {
          position: "bottom",
          labels: { color: cTexto }
        },
        tooltip: {
          backgroundColor: hexToRGBA(cPrin, 0.95),
          titleColor: cFondo,
          bodyColor: cFondo,
          borderColor: cSec,
          borderWidth: 1
        },
        datalabels: {
          color: cTexto,
          font: { weight: "bold", size: 14 },
          formatter: function (value) {
            return `${Math.round(value)}g\n(${((value / total) * 100).toFixed(0)}%)`;
          }
        }
      }
    },
    plugins: [window.ChartDataLabels || {}]
  });
}


/* ========================================
   🧩 EVENTOS (descarga/compartir)
======================================== */
document.addEventListener("DOMContentLoaded", function () {
  // (Tu HTML ya usa onsubmit="event.preventDefault(); calcularCalorias();")
  // Esto es opcional por si alguien quita el onsubmit del HTML:
  let form = document.getElementById("calcForm");
  if (form && !form._calBound) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      calcularCalorias();
    });
    form._calBound = true;
  }

  let shareBtn = document.getElementById("shareBtn");
  if (shareBtn && !shareBtn._shareBound) {
    shareBtn.addEventListener("click", function () {
      let resultados = document.getElementById("resultado")?.innerText || "";
      localStorage.setItem("resultadosCalorias", resultados);
      alert("Resultados guardados. ¡Listo para compartir!");
    });
    shareBtn._shareBound = true;
    // mostralo cuando haya resultados si querés
    // shareBtn.classList.remove('oculto');
  }

  let dlBtn = document.getElementById("descargarGrafico");
  if (dlBtn && !dlBtn._dlBound) {
    dlBtn.addEventListener("click", function () {
      let canvas = document.getElementById("macrosChart");
      if (!canvas) return;
      let link = document.createElement("a");
      link.download = "grafico_macros.png";
      link.href = canvas.toDataURL();
      link.click();
    });
    dlBtn._dlBound = true;
  }
});

/* ========================================
   👩‍⚕️ MOSTRAR NUTRICIONISTAS (por depto)
   - Usa claves: contacto, mail, dias, observacion, whatsapp, instagram
======================================== */
function mostrarNutricionistas() {
  let departamento = document.getElementById("departamentoNutricion")?.value;
  let infoContainer = document.getElementById("nutricionistasInfo");
  let lista = document.getElementById("listaNutricionistas");
  if (!infoContainer || !lista) return;

  // Mostrar contenedor (quitar oculto)
  infoContainer.classList.remove("oculto");
  infoContainer.style.display = "block";

  lista.innerHTML = "";

  // Usa Sistema si está; si no, usa variables globales
  let profesionales = (typeof Sistema !== "undefined" && Sistema.getProfesionalesPorDepto)
    ? Sistema.getProfesionalesPorDepto(departamento)
    : (window.nutricionistas ? (nutricionistas[departamento] || []) : []);

  if (profesionales.length) {
    profesionales.forEach(function (n) {
      let card = document.createElement("div");
      card.classList.add("card-nutricionista"); // coincide con tu CSS

      card.innerHTML = `
        <img src="${n.imagen}" alt="${n.nombre}">
        <h4>${n.nombre}</h4>

        <div class="datos">
          <p><i class="fas fa-phone"></i> <strong>Contacto:</strong> ${n.contacto || "-"}</p>
          <p><i class="fas fa-envelope"></i> <strong>Email:</strong> <a class="info" href="mailto:${n.mail || ''}">${n.mail || "-"}</a></p>
          <p><i class="fas fa-calendar"></i> <strong>Días:</strong> ${n.dias || "-"}</p>
        </div>

        ${n.observacion ? `<div class="info-observacion">${n.observacion}</div>` : ""}

        <div class="redes-nutricionista">
          ${n.whatsapp ? `<a href="${n.whatsapp}" target="_blank" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>` : ""}
          ${n.instagram ? `<a href="${n.instagram}" target="_blank" aria-label="Instagram"><i class="fab fa-instagram"></i></a>` : ""}
        </div>
      `;
      lista.appendChild(card);
    });
  } else {
    lista.innerHTML = "<p id='noDisponibles'>No hay nutricionistas registrados en este departamento.</p>";
  }
}

/* ========================================
   🍳 MOSTRAR RECETAS FLASH
   - respeta tu clase .receta para el estilo
======================================== */
function mostrarRecetas(tipo) {
  let container = document.getElementById("recetasContainer");
  if (!container) return;

  container.innerHTML = "";

  // Usa Sistema si está; si no, usa variables globales
  let lista = (typeof Sistema !== "undefined" && Sistema.getRecetasPorTipo)
    ? Sistema.getRecetasPorTipo(tipo)
    : (window.recetas ? (recetas[tipo] || []) : []);

  if (!lista.length) {
    container.innerHTML = `<p>No hay recetas para "${tipo}".</p>`;
    return;
  }

  lista.forEach(function (receta) {
    let recetaDiv = document.createElement("div");
    recetaDiv.classList.add("receta"); // coincide con tu CSS
    recetaDiv.innerHTML = `
      <img src="${receta.imagen}" alt="${receta.nombre}">
      <h4>${receta.nombre}</h4>
      <p>${receta.descripcion}</p>
    `;
    container.appendChild(recetaDiv);
  });
}

/* ========================================
   🧩 Helper opcional (si querés reutilizar)
======================================== */
function crearTarjetaReceta(receta) {
  let recetaDiv = document.createElement('div');
  recetaDiv.classList.add('receta');
  recetaDiv.innerHTML = `
    <img src="${receta.imagen}" alt="${receta.nombre}">
    <h4>${receta.nombre}</h4>
    <p>${receta.descripcion}</p>
  `;
  return recetaDiv;
}
