/**
 * HEADER.JS — Módulo de Controle do Header & Navegação Mobile
 * Acessibilidade WCAG 2.1 AA, navegação por teclado e performance sem layout thrashing.
 */

export function initHeader() {
  const header = document.querySelector('.header');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const drawerBackdrop = document.querySelector('.drawer-backdrop');
  const drawerCloseBtn = document.querySelector('.mobile-drawer__close');
  const drawerLinks = document.querySelectorAll('.mobile-drawer__link, .mobile-drawer .btn');

  if (!header) return;

  // 1. ESTADO DO HEADER NO SCROLL (Performance com passive listener)
  let isScrolled = false;
  const handleScroll = () => {
    const shouldScroll = window.scrollY > 30;
    if (shouldScroll !== isScrolled) {
      isScrolled = shouldScroll;
      header.classList.toggle('header--scrolled', isScrolled);
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Execução inicial preventiva

  // 2. GESTÃO DO DRAWER MOBILE
  if (!menuToggle || !mobileDrawer) return;

  const focusableElementsSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  let firstFocusableElement = null;
  let lastFocusableElement = null;

  function updateFocusableElements() {
    const focusable = mobileDrawer.querySelectorAll(focusableElementsSelector);
    if (focusable.length > 0) {
      firstFocusableElement = focusable[0];
      lastFocusableElement = focusable[focusable.length - 1];
    }
  }

  function openDrawer() {
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Fechar menu de navegação');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    mobileDrawer.classList.add('is-open');
    if (drawerBackdrop) drawerBackdrop.classList.add('is-open');
    document.body.classList.add('drawer-open');

    updateFocusableElements();
    if (drawerCloseBtn) {
      drawerCloseBtn.focus();
    } else if (firstFocusableElement) {
      firstFocusableElement.focus();
    }

    document.addEventListener('keydown', handleKeydown);
  }

  function closeDrawer() {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menu de navegação');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    mobileDrawer.classList.remove('is-open');
    if (drawerBackdrop) drawerBackdrop.classList.remove('is-open');
    document.body.classList.remove('drawer-open');

    document.removeEventListener('keydown', handleKeydown);
    menuToggle.focus(); // Retorna o foco para o botão acionador
  }

  function toggleDrawer() {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  }

  // Tratamento de Teclado (Trap Focus & Tecla Escape)
  function handleKeydown(e) {
    if (e.key === 'Escape') {
      closeDrawer();
      return;
    }

    if (e.key === 'Tab') {
      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusableElement) {
          e.preventDefault();
          lastFocusableElement.focus();
        }
      } else {
        // Tab normal
        if (document.activeElement === lastFocusableElement) {
          e.preventDefault();
          firstFocusableElement.focus();
        }
      }
    }
  }

  // Event Listeners
  menuToggle.addEventListener('click', toggleDrawer);

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', closeDrawer);
  }

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', closeDrawer);
  }

  // Fechar drawer ao clicar em qualquer link de navegação
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });
}

