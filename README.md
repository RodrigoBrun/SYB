# 🌐 Salud y Bienestar UY – Portal Integral

**Salud y Bienestar UY** es una web informativa e interactiva desarrollada en **HTML, CSS y JavaScript puro**.  
Ofrece recursos de nutrición, fitness y bienestar mental, con herramientas interactivas y un diseño profesional optimizado para PC y dispositivos móviles.

---

## 🚀 Funcionalidades principales

- ✅ **Navbar** horizontal en PC y **sidebar deslizable** en móviles.
- ✅ **Modo oscuro** con ícono dinámico (🌙/☀️) y persistencia con `localStorage`.
- ✅ **Animaciones suaves** con [AOS](https://michalsnik.github.io/aos/).
- ✅ **Calculadora de calorías** interactiva.
- ✅ **Recetas Flash** adaptadas a objetivos (bajar de peso, ganar masa, etc.).
- ✅ **Rutinas semanales** con ejercicios detallados.
- ✅ **Sección de Bienestar** con mindfulness, hábitos saludables y manejo del estrés.
- ✅ **Directorio de profesionales** (nutricionistas, entrenadores, psicólogos) filtrados por departamento.
- ✅ **Contacto directo** vía WhatsApp o Email con botones rápidos y formulario.
- ✅ **Anuncios y espacios publicitarios** integrados estratégicamente.
- ✅ **Variables CSS** para personalizar fácilmente los colores globales.
- ✅ **Código modular** y organizado en múltiples archivos CSS y JS.

---

## 📁 Estructura de archivos

/Web SYB V1.4
│
├── index.html # Página principal
├── README.md # Documentación del proyecto
│
├── /css # Estilos organizados por secciones
│ ├── styles.css # Estilos globales y variables
│ ├── inicio.css # Estilos del Hero y portada
│ ├── nutricion.css # Estilos de la sección de Nutrición
│ ├── fitness.css # Estilos de la sección Fitness
│ ├── bienestar.css # Estilos de Bienestar
│ ├── profesionales.css # Estilos de los listados de profesionales
│ ├── contacto.css # Estilos del formulario y botones de contacto
│ ├── recursos.css # Estilos para recursos adicionales
│ ├── modoOscuro.css # Estilos para modo oscuro
│
├── /js # Lógica dividida por secciones
│ ├── main.js # Funciones globales (modo oscuro, navegación)
│ ├── inicio.js # Lógica del Hero y buscador rápido
│ ├── nutricion.js # Calculadora de calorías y recetas
│ ├── fitness.js # Rutinas y tablas interactivas
│ ├── bienestar.js # Mindfulness y hábitos
│ ├── profesionales.js # Carga dinámica de profesionales por departamento
│ ├── contacto.js # Formulario y enlaces rápidos
│ ├── recursos.js # Recursos y utilidades
│ ├── clases.js # Clases y estructuras reutilizables
│
└── /imagenes # Imágenes y gráficos usados en la web

yaml
Copiar
Editar

---

## 🔧 Personalización rápida

- Editá **colores globales** desde `:root` en `styles.css`.
- Modificá o agregá **profesionales** en `profesionales.js`.
- Cambiá **textos e imágenes** en `index.html` y en la carpeta `/imagenes`.
- Ajustá **espacios publicitarios** desde el HTML o JS según tus necesidades.
- Cambiá el **número de WhatsApp** y el **correo de contacto** en `contacto.js`.

---

## 📦 Librerías utilizadas

- [Font Awesome](https://fontawesome.com) – Íconos visuales.
- [AOS – Animate on Scroll](https://michalsnik.github.io/aos/) – Animaciones suaves.
- [Google Fonts – Inter](https://fonts.google.com/specimen/Inter) – Tipografía principal.

---

## 💡 Tips de desarrollo

- Usá **Live Server** en VS Code para previsualizar cambios.
- Estructurá los cambios de CSS en el archivo correspondiente a cada sección.
- El código está pensado para **escalar** y añadir nuevas secciones fácilmente.

---

## 📜 Licencia

Este proyecto es propiedad de **Rodrigo Brun**.  
Podés usarlo, adaptarlo y venderlo, pero no olvides brindar crédito al autor y tomarte un mate en su honor. 🇺🇾


















📄 Mensaje sugerido:
Hola [Nombre], ¡gracias por contactarte para formar parte de Salud y Bienestar UY! 💚
Para poder sumarte a la página, voy a necesitar que me envíes la siguiente información:

Nombre completo y profesión (ej: Lic. en Nutrición, Entrenador Personal, Psicólogo/a).

Foto profesional (en buena calidad y fondo claro si es posible).

Número de WhatsApp de contacto público.

Correo electrónico de contacto (opcional).

Departamento en el que trabajás.

Días y horarios de atención.

Breve descripción de tus servicios (2–3 líneas).

Redes sociales (Instagram, Facebook, etc.) si querés que las incluyamos.

En cuanto reciba estos datos, preparo tu tarjeta profesional y la agrego al sitio. 🚀

¡Gracias por sumarte a este movimiento de salud y bienestar en Uruguay! 🙌