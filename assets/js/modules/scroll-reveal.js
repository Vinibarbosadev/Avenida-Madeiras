/**
 * SCROLL-REVEAL.JS — Revelação Suave Baseada em IntersectionObserver
 * Performance de 60fps, zero dependências externas e limpeza de observador após disparo.
 */

export function initScrollReveal() {
  // Respeita preferência por movimento reduzido do sistema operacional
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    document.querySelectorAll('.reveal-item').forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const revealElements = document.querySelectorAll('.reveal-item');
  if (!revealElements.length || !('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target); // Libera memória imediatamente
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));
}

