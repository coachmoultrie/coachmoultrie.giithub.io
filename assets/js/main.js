// Theme functionality override
class NomadTheme {
  constructor() {
    this.init();
  }

  init() {
    this.setupNavigation();
    this.setupAccessibility();
  }

  // Simplified navigation: standard drawer handling without SPA section hiding
  setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const navMenu = document.getElementById('nav-menu');
    const navOverlay = document.getElementById('nav-overlay');
    const toggleBtn = document.getElementById('hamburger-toggle');

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu) navMenu.classList.remove('active');
        if (navOverlay) navOverlay.classList.remove('active');
        if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (navMenu) navMenu.classList.remove('active');
        if (navOverlay) navOverlay.classList.remove('active');
        if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Accessibility improvements
  setupAccessibility() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 6px;
      background: #384959;
      color: white;
      padding: 8px;
      text-decoration: none;
      border-radius: 4px;
      z-index: 10001;
      transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => { skipLink.style.top = '6px'; });
    skipLink.addEventListener('blur', () => { skipLink.style.top = '-40px'; });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
  }
}

// Initialize theme when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.nomadTheme = new NomadTheme();
});