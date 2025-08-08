/* =========================================================
   SISTEMA (registro de datos por sección)
   - Va primero
   - No toca el DOM, solo guarda y expone datos
========================================================= */
let Sistema = (function () {
    // Estructura base (vacía) para cada sección
    let secciones = {
        nutricion: {
            recetas: {},
            profesionales: {}
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




/* ---------------------------------
   📚 "Base de datos" de trainers
--------------------------------- */
const TRAINERS_DB = {
    montevideo: [
        {
            nombre: "Prof. Juan Martínez",
            especialidad: "Fuerza & Resistencia",
            telefono: "011111111",
            email: "juan@trainer.com",
            dias: "Lunes, Miércoles y Viernes",
            imagen: "imagenes/default.png",
            observacion: "Entrenamientos al aire libre en Parque Rodó.",
            whatsapp: "https://wa.me/59891111111",
            instagram: "https://instagram.com/juanfituy",
        },
        {
            nombre: "Prof. Carla Silva",
            especialidad: "HIIT & Funcional",
            telefono: "011111111",
            email: "carla@trainer.com",
            dias: "Martes y Jueves",
            imagen: "imagenes/default.png",
            observacion: "Especialista en entrenamiento funcional para mujeres.",
            whatsapp: "https://wa.me/59892222222",
            instagram: "https://instagram.com/carla.hiit",
        },
    ],
    canelones: [
        {
            nombre: "Prof. Leo Rodríguez",
            especialidad: "Cardio & Core",
            telefono: "011111111",
            email: "leo@trainer.com",
            dias: "Lunes a Viernes",
            imagen: "imagenes/default.png",
            observacion: "Sesiones personalizadas en gimnasio privado en Las Piedras.",
            whatsapp: "https://wa.me/59893333333",
            instagram: "https://instagram.com/leo.coretraining",
        },
    ],
    maldonado: [], artigas: [], rocha: [], salto: [], colonia: [],
    tacuarembo: [], cerro_largo: [], durazno: [], flores: [], florida: [],
    lavalleja: [], soriano: [], rio_negro: [], paysandu: [], san_jose: [],
    treinta_y_tres: []
};






/* ---------- Datos de psicólogos (demo) ---------- */
const psicologos = {
    montevideo: [
        {
            nombre: "Dr. Pablo Torres",
            telefono: "0111111111",
            correo: "pablo@psico.com",
            dias: "Martes y Jueves",
            imagen: "imagenes/psico2.jpg"
        }
    ],
    canelones: [
        {
            nombre: "Lic. Lucía Ferreira",
            telefono: "011111111",
            correo: "lucia@psico.com",
            dias: "Viernes",
            imagen: "imagenes/psico3.jpg"
        }
    ],
    artigas: [],
    salto: [],
    paysandu: [],
    rio_negro: [],
    soriano: [],
    colonia: [],
    san_jose: [],
    flores: [],
    florida: [],
    lavalleja: [],
    durazno: [],
    cerro_largo: [],
    treinta_y_tres: [],
    rocha: [],
    maldonado: [],
    tacuarembo: [],
    rivera: []
};

// 🔹 Definís a Diego como objeto independiente
const diego = {
    nombre: "Lic. Diego Nicolas Díaz Gómez",
    telefono: "092612409",
    correo: "diego.bndg@gmail.com",
    dias: "Lunes a viernes (martes no) de 13:00 a 18:00",
    imagen: "imagenes/fotoDiegue.jpg",
    whatsapp: "https://wa.me/59892612409",
    instagram: "https://www.instagram.com/psicodiegotcc?igsh=MTViZ3R4M282ODV0MA==",
    observacion: "Atiende presencial solo en Montevideo. Resto del país: modalidad online 🖥️"
};

// 🔹 Lo agregás a todos los departamentos si aún no está
for (const dep in psicologos) {
    if (!psicologos[dep].some(p => p.nombre === diego.nombre)) {
        psicologos[dep].push(diego);
    }
}





/* =========================================================
   INICIALIZACIÓN: Cargar datos en el Sistema
========================================================= */
Sistema.setRecetas(recetas);
Sistema.setProfesionales(nutricionistas);
