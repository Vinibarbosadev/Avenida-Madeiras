/**
 * AVENIDA MADEIRAS — Main Orchestrator (ES Module)
 * Alta performance, zero dependências pesadas, Core Web Vitals otimizado.
 */

import { initHeader } from './modules/header.js';
import { initContactForm } from './modules/contact-form.js';
import { initScrollReveal } from './modules/scroll-reveal.js';

document.addEventListener('DOMContentLoaded', () => {
  // Inicialização do Header e Navegação Mobile
  initHeader();

  // Inicialização do Formulário de Contato e Validação
  initContactForm();

  // Inicialização das Microinterações e Scroll Reveal
  initScrollReveal();
});
