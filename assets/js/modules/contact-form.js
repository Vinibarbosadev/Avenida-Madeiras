/**
 * CONTACT-FORM.JS — Validação, Máscara e Gestão de Estados do Formulário
 * Estados: normal, focus, erro, loading, sucesso. Acessibilidade e feedback visual.
 */

export function initContactForm() {
  const form = document.getElementById('budget-form');
  const successBanner = document.getElementById('form-success-banner');
  const submitBtn = document.getElementById('form-submit-btn');

  if (!form) return;

  const phoneInput = document.getElementById('form-phone');

  // 1. MÁSCARA AUTOMÁTICA DE TELEFONE / WHATSAPP BRASILEIRO
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 11) value = value.slice(0, 11);

      if (value.length > 6) {
        value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
      } else if (value.length > 2) {
        value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      } else if (value.length > 0) {
        value = `(${value}`;
      }
      e.target.value = value;
    });
  }

  // 2. VALIDAÇÃO INDIVIDUAL DE CAMPO
  function validateField(field) {
    const formGroup = field.closest('.form-field');
    if (!formGroup) return true;

    const errorMsg = formGroup.querySelector('.form-error-msg');
    let isValid = true;
    let message = '';

    const val = field.value.trim();

    if (field.hasAttribute('required') && !val) {
      isValid = false;
      message = 'Este campo é obrigatório.';
    } else if (field.type === 'email' && val) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(val)) {
        isValid = false;
        message = 'Informe um e-mail válido.';
      }
    } else if (field.id === 'form-phone' && val) {
      const digitsOnly = val.replace(/\D/g, '');
      if (digitsOnly.length < 10) {
        isValid = false;
        message = 'Informe um telefone válido com DDD.';
      }
    }

    if (!isValid) {
      formGroup.classList.add('has-error');
      field.setAttribute('aria-invalid', 'true');
      if (errorMsg) errorMsg.textContent = message;
    } else {
      formGroup.classList.remove('has-error');
      field.setAttribute('aria-invalid', 'false');
      if (errorMsg) errorMsg.textContent = '';
    }

    return isValid;
  }

  // Limpeza de erro em tempo real ao digitar
  form.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('input', () => {
      if (input.closest('.form-field').classList.contains('has-error')) {
        validateField(input);
      }
    });
    input.addEventListener('blur', () => {
      validateField(input);
    });
  });

  // 3. ENVIO E GESTÃO DE ESTADOS (LOADING & SUCESSO COM ARIA-BUSY)
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputs = form.querySelectorAll('.form-control');
    let formIsValid = true;

    inputs.forEach(input => {
      const fieldValid = validateField(input);
      if (!fieldValid) formIsValid = false;
    });

    if (!formIsValid) {
      const firstError = form.querySelector('.form-field.has-error .form-control');
      if (firstError) firstError.focus();
      return;
    }

    // Estado Loading com ARIA
    if (submitBtn) {
      submitBtn.classList.add('btn--loading');
      submitBtn.setAttribute('disabled', 'true');
      submitBtn.setAttribute('aria-busy', 'true');
    }

    // Simulação de envio assíncrono seguro
    setTimeout(() => {
      if (submitBtn) {
        submitBtn.classList.remove('btn--loading');
        submitBtn.removeAttribute('disabled');
        submitBtn.setAttribute('aria-busy', 'false');
      }

      form.style.display = 'none';
      if (successBanner) {
        successBanner.classList.add('is-visible');
        successBanner.focus();
      }
    }, 1200);
  });

  // 4. AUTOMAÇÃO DE ASSUNTO A PARTIR DOS CARDS DE CATEGORIA
  const subjectSelect = document.getElementById('form-subject');
  document.querySelectorAll('[data-subject]').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetSubject = btn.getAttribute('data-subject');
      if (subjectSelect && targetSubject) {
        subjectSelect.value = targetSubject;
        validateField(subjectSelect);
      }
    });
  });

  // 5. OCULTAÇÃO INTELIGENTE DO BOTÃO FLUTUANTE NA SEÇÃO DE FORMULÁRIO (EVITA TOQUE ACIDENTAL NO MOBILE)
  const contactSection = document.getElementById('orcamento');
  const floatingWhatsApp = document.querySelector('.floating-whatsapp');

  if (contactSection && floatingWhatsApp && 'IntersectionObserver' in window) {
    const contactObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          floatingWhatsApp.classList.add('is-hidden');
        } else {
          floatingWhatsApp.classList.remove('is-hidden');
        }
      });
    }, { threshold: 0.15 });

    contactObserver.observe(contactSection);
  }
}

