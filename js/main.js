/**
 * Moedança - Controle Financeiro
 * Script principal para interações, animações e menu mobile.
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initFeatureCards();
  initStickyHeader();
  initMobileMenu();
});

/**
 * Inicializa animações baseadas no scroll usando IntersectionObserver.
 * Elementos com a classe .reveal ganham a classe .active quando entram no viewport.
 */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        scrollObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach((element) => scrollObserver.observe(element));
}

/**
 * Gerencia o comportamento dos cards de funcionalidades.
 * Inclui animação de entrada, efeito de flip ao clicar e reset automático ao sair da tela.
 */
function initFeatureCards() {
  const cardObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const card = entry.target;
      
      if (entry.isIntersecting) {
        // Ativa animação de entrada apenas uma vez
        if (!card.classList.contains('visible')) {
          card.classList.add('visible', 'animating');
          setTimeout(() => {
            card.classList.remove('animating');
          }, 1100);
        }
      } else {
        // Reseta o estado do card (desvira) se ele sair do campo de visão
        if (card.classList.contains('flipped')) {
          card.classList.remove('flipped');
        }
      }
    });
  }, cardObserverOptions);

  const featureCards = document.querySelectorAll('.feature-card');
  
  featureCards.forEach((card) => {
    cardObserver.observe(card);
    
    card.addEventListener('click', (event) => {
      event.preventDefault();
      
      const isAlreadyFlipped = card.classList.contains('flipped');
      
      // Fecha outros cards abertos para focar no atual
      if (!isAlreadyFlipped) {
        featureCards.forEach(otherCard => otherCard.classList.remove('flipped'));
        card.classList.add('flipped');
      } else {
        card.classList.remove('flipped');
      }
    });
  });
}

/**
 * Adiciona efeito de redução (shrink) ao header quando a página é rolada.
 */
function initStickyHeader() {
  const mainHeader = document.getElementById('main-header');
  const scrollThreshold = 50;

  window.addEventListener('scroll', () => {
    if (window.scrollY > scrollThreshold) {
      mainHeader.classList.add('scrolled');
    } else {
      mainHeader.classList.remove('scrolled');
    }
  });
}

/**
 * Controla a abertura e fechamento do menu de navegação mobile.
 */
function initMobileMenu() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const menuCloseBtn = document.querySelector('.menu-close-btn');
  const navLinks = document.querySelector('.nav-links');
  const menuOverlay = document.querySelector('.menu-overlay');
  const allNavLinks = document.querySelectorAll('.nav-links a');

  const openMenu = () => {
    navLinks.classList.add('nav-active');
    menuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    navLinks.classList.remove('nav-active');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  };

  const toggleMenu = () => {
    if (navLinks.classList.contains('nav-active')) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
  }

  if (menuCloseBtn) {
    menuCloseBtn.addEventListener('click', closeMenu);
  }

  if (menuOverlay) {
    menuOverlay.addEventListener('click', closeMenu);
  }

  // Fecha o menu automaticamente ao clicar em um link
  allNavLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}
