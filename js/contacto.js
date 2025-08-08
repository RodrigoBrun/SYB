// ==========================================
// ✉️ CONTACTO — Controlador
// Archivo: js/contacto.js
// ==========================================
document.addEventListener('DOMContentLoaded', () => {

  class ContactoController {
    constructor() {
      let self = this;

      // ⚙️ Config rápida (tu número/mail)
      // 🔁 Si algún día cambian, tocás solo acá
      self.WHATS_APP_NUM = '59892992182';                 // 👈 TU NÚMERO (antes estaba el de Diego)
      self.MAIL_DESTINO  = 'rodrigobrun.code@gmail.com';  // 👈 Tu correo

      // Cache
      self.form = document.getElementById('formContacto');
      self.toast = document.getElementById('toastContacto');
      self.btnCopiarMail = document.getElementById('btnCopiarMail');
      self.ctaEmail = document.getElementById('ctaEmail');       // <a>
      self.ctaWhatsapp = document.getElementById('ctaWhatsapp'); // <a>

      // Draft en localStorage
      self.draftKey = 'syb_contacto_borrador_v1';

      // Bind
      self.wireEvents();
      self.restaurarBorrador();
      self.refreshCtasDinamicas(); // arma mailto/wa con asunto
      console.log('✅ ContactoController listo');
    }

    wireEvents() {
      let self = this;

      if (self.form) {
        self.form.addEventListener('submit', (e) => {
          e.preventDefault();
          if (self.validar()) {
            self.enviar(); // mailto por defecto
          }
        });

        // Guardar borrador al tipear
        let inputs = self.form.querySelectorAll('input, textarea, select');
        inputs.forEach(el => {
          el.addEventListener('input', () => self.guardarBorrador());
        });
      }

      if (self.btnCopiarMail) {
        self.btnCopiarMail.addEventListener('click', () => self.copiarMail());
      }
    }

    // =========
    // Validación básica
    // =========
    validar() {
      let self = this;
      let ok = true;

      // Honeypot anti-spam
      let hp = document.getElementById('website');
      if (hp && hp.value.trim().length > 0) return false;

      // Reglas
      let camposReq = [
        { id: 'nombre', msg: 'Ingresá tu nombre.' },
        { id: 'email',  msg: 'Ingresá un email válido.', tipo: 'email' },
        { id: 'perfil', msg: 'Seleccioná una opción.' },
        { id: 'mensaje',msg: 'Escribí tu mensaje.' },
        { id: 'acepto', msg: 'Debés aceptar el contacto.', tipo: 'check' },
      ];

      for (let i = 0; i < camposReq.length; i++) {
        let { id, msg, tipo } = camposReq[i];
        let el = document.getElementById(id);
        let boxError = document.querySelector(`[data-error-for="${id}"]`);
        let errorTxt = '';

        if (el) {
          if (tipo === 'check') {
            if (!el.checked) errorTxt = msg;
          } else if (tipo === 'email') {
            let v = (el.value || '').trim();
            let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!re.test(v)) errorTxt = msg;
          } else {
            if ((el.value || '').trim().length === 0) errorTxt = msg;
          }
        }
        if (boxError) boxError.textContent = errorTxt;
        if (errorTxt) ok = false;
      }
      return ok;
    }

    // =========
    // Arma mailto + abre cliente de correo (comportamiento por defecto)
    // =========
    enviar() {
      let self = this;
      let nombre = (document.getElementById('nombre')?.value || '').trim();
      let email  = (document.getElementById('email')?.value || '').trim();
      let telefono = (document.getElementById('telefono')?.value || '').trim();
      let perfil = (document.getElementById('perfil')?.value || '').trim();
      let depto = (document.getElementById('departamento')?.value || '').trim();
      let mensaje = (document.getElementById('mensaje')?.value || '').trim();

      let asunto = encodeURIComponent(`Nuevo contacto (${perfil}) - ${nombre}`);
      let cuerpo = encodeURIComponent(
        `Nombre: ${nombre}\nEmail: ${email}\nTeléfono: ${telefono}\nPerfil: ${perfil}\nDepartamento: ${depto}\n\nMensaje:\n${mensaje}`
      );

      let href = `mailto:${self.MAIL_DESTINO}?subject=${asunto}&body=${cuerpo}`;
      window.location.href = href;

      this.mostrarToast('Abriendo tu cliente de correo…');
      // Limpio borrador si querés
      // localStorage.removeItem(self.draftKey);
    }

    // =========
    // CTA dinámicos: WhatsApp y Email con asunto automático
    // =========
    refreshCtasDinamicas() {
      let self = this;
      let perfil = document.getElementById('perfil');
      let nombre = document.getElementById('nombre');

      let build = () => {
        let p = (perfil?.value || 'Interesado/a');
        let n = (nombre?.value || '').trim();

        // ✅ WhatsApp SIEMPRE a tu número
        let texto = `Hola! Soy ${n || '—'}. Quisiera sumarme como ${p} al movimiento de Salud y Bienestar.`;
        let wa = `https://wa.me/${self.WHATS_APP_NUM}?text=${encodeURIComponent(texto)}`;
        if (self.ctaWhatsapp) {
          self.ctaWhatsapp.href = wa;
          self.ctaWhatsapp.target = '_blank';
          self.ctaWhatsapp.rel = 'noopener';
        }

        // ✅ Email con asunto dinámico (a tu mail)
        let asunto = `Contacto (${p}) ${n ? '- ' + n : ''}`;
        if (self.ctaEmail) {
          self.ctaEmail.href = `mailto:${self.MAIL_DESTINO}?subject=${encodeURIComponent(asunto)}`;
        }
      };

      // primera vez
      build();
      // al cambiar perfil/nombre
      [perfil, nombre].forEach(el => el && el.addEventListener('input', build));
    }

    // =========
    // Borrador local
    // =========
    guardarBorrador() {
      let self = this;
      if (!self.form) return;
      let data = {};
      let campos = self.form.querySelectorAll('input, textarea, select');
      campos.forEach(el => {
        if (el.type === 'checkbox') data[el.id] = !!el.checked;
        else data[el.id] = el.value;
      });
      localStorage.setItem(self.draftKey, JSON.stringify(data));
    }

    restaurarBorrador() {
      let self = this;
      let raw = localStorage.getItem(self.draftKey);
      if (!raw) return;
      try {
        let data = JSON.parse(raw);
        for (let key in data) {
          let el = document.getElementById(key);
          if (!el) continue;
          if (el.type === 'checkbox') el.checked = !!data[key];
          else el.value = data[key];
        }
      } catch {}
    }

    // =========
    // Utilidad: copiar email
    // =========
    copiarMail() {
      let btn = this.btnCopiarMail;
      let mail = btn?.dataset?.mail || this.MAIL_DESTINO;
      navigator.clipboard.writeText(mail).then(() => {
        this.mostrarToast('Correo copiado al portapapeles');
      }).catch(() => {
        this.mostrarToast('No se pudo copiar. Mantené presionado para copiar.');
      });
    }

    // =========
    // Toast
    // =========
    mostrarToast(texto) {
      let t = this.toast;
      if (!t) return;
      t.textContent = texto;
      t.classList.add('show');
      setTimeout(() => t.classList.remove('show'), 2000);
    }
  }

  // Init si existe la sección
  let existe = document.getElementById('contacto');
  if (existe && !window.__contactoIniciado) {
    let ctrl = new ContactoController();
    window.__contactoIniciado = true;
  }
});
