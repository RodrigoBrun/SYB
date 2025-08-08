/* =========================================================
   SISTEMA (registro de datos por sección)
   - Va primero
   - No toca el DOM, solo guarda y expone datos
========================================================= */
let Sistema = (function () {
  // Estructura base (vacía) para cada sección
  let secciones = {
    nutricion: {
      recetas: {},          // se setea luego
      profesionales: {}     // se setea luego
    }
    // fitness: {...}, bienestar: {...}  ← se agregará cuando toque
  };

  // API pública
  return {
    // Getters
    getRecetasPorTipo: function (tipo) {
      let r = secciones.nutricion.recetas[tipo];
      return Array.isArray(r) ? r : [];
    },
    getProfesionalesPorDepto: function (depto) {
      let p = secciones.nutricion.profesionales[depto];
      return Array.isArray(p) ? p : [];
    },

    // Setters (para cargar/actualizar datos)
    setRecetas: function (obj) {
      if (obj && typeof obj === "object") secciones.nutricion.recetas = obj;
    },
    setProfesionales: function (obj) {
      if (obj && typeof obj === "object") secciones.nutricion.profesionales = obj;
    }
  };
})();


/* =========================================================
   DATOS: Recetas Flash (Nutrición)
   - Solo datos, sin lógica de interfaz
========================================================= */
let recetas = {
  desayuno: [
    { nombre: "Avena con Frutas", descripcion: "Avena cocida con frutas frescas y miel", imagen: "imagenes/avena-con-frutas.png" },
    { nombre: "Tostadas de Aguacate", descripcion: "Tostadas integrales con aguacate y tomate", imagen: "imagenes/tostadas-aguacate.png" }
  ],
  almuerzo: [
    { nombre: "Ensalada de Pollo", descripcion: "Ensalada fresca con pechuga de pollo y aderezo", imagen: "imagenes/ensalada-pollo.png" },
    { nombre: "Sopa de Lentejas", descripcion: "Sopa casera de lentejas con verduras", imagen: "imagenes/sopa-lentejas.png" }
  ],
  cena: [
    { nombre: "Pasta con Pesto", descripcion: "Pasta integral con salsa pesto y tomates cherry", imagen: "imagenes/pasta-pesto.png" },
    { nombre: "Salmón al Horno", descripcion: "Salmón al horno con papas y espárragos", imagen: "imagenes/salmon-horno.png" }
  ]
};

/* =========================================================
   DATOS: Nutricionistas (por departamento)
========================================================= */
let nutricionistas = {
  montevideo: [
    {
      nombre: "Lic. Ejemplo",
      contacto: "Ejemplo",
      mail: "Ejemplo",
      dias: "Ejemplo: Lunes a Viernes",
      imagen: "imagenes/default.png",
      observacion: "Ejemplo: Atiende en clínica privada en Pocitos.",
      whatsapp: "https://wa.me/59891111111",
      instagram: "https://instagram.com/juan.nutricion"
    },
    {
      nombre: "Dra. Ana Gómez",
      contacto: "011111111",
      mail: "ana.gomez@email.com",
      dias: "Martes y Jueves",
      imagen: "imagenes/default.png",
      observacion: "Especialista en alimentación infantil.",
      whatsapp: "https://wa.me/59892222222",
      instagram: "https://instagram.com/dra.ana.nutri"
    }
  ]
  // ➕ Agregar más departamentos cuando los tengas
};

/* =========================================================
   INICIALIZACIÓN: Cargar datos en el Sistema
========================================================= */
Sistema.setRecetas(recetas);
Sistema.setProfesionales(nutricionistas);
