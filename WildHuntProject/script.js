/* Wild Hunt Project — behaviour
   - theme toggle with persistence
   - mobile nav toggle
   - collapsible challenge sections
   - (optional) name typing animation on the home page
*/

(function () {
  const body = document.body;

  // ---------- Theme ----------
  const themeToggleButton = document.getElementById('theme-toggle');

  function applyTheme(mode) {
    const isDark = mode === 'dark';
    body.classList.toggle('dark-mode', isDark);
    body.classList.toggle('light-mode', !isDark);

    if (themeToggleButton) {
      themeToggleButton.textContent = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
      themeToggleButton.setAttribute('aria-pressed', String(isDark));
    }
  }

  // Use saved preference if present, otherwise honour system preference
  const savedTheme = (() => {
    try { return localStorage.getItem('whp_theme'); } catch { return null; }
  })();

  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

  if (themeToggleButton) {
    themeToggleButton.addEventListener('click', () => {
      const next = body.classList.contains('dark-mode') ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem('whp_theme', next); } catch { /* ignore */ }
    });
  }

  // ---------- Mobile nav toggle ----------
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // ---------- Collapsibles (challenge pages) ----------
  const banners = document.querySelectorAll('.collapsible-banner');
  if (banners.length) {
    banners.forEach((btn) => {
      btn.setAttribute('type', 'button');
      btn.addEventListener('click', () => {
        const list = btn.nextElementSibling;
        if (!list) return;
        list.classList.toggle('open');
      });
    });
  }

  // ---------- Name typing animation (home page only) ----------
  const nameElement = document.getElementById('name-animation');
  if (!nameElement) return;

  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    nameElement.textContent = 'Matteo Lupus Da Venezia McCormack';
    return;
  }

  const names = ['Matteo Lupus Da Venezia McCormack', 'Lupus Artorias'];
  let index = 0;
  let letterIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentName = names[index];

    if (window.innerWidth <= 768) {
      nameElement.style.fontSize = '1.15rem';
    } else {
      nameElement.style.fontSize = '';
    }

    letterIndex += isDeleting ? -1 : 1;
    nameElement.textContent = currentName.substring(0, letterIndex);

    if (!isDeleting && letterIndex === currentName.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1400);
      return;
    }

    if (isDeleting && letterIndex === 0) {
      isDeleting = false;
      index = (index + 1) % names.length;
      setTimeout(typeEffect, 450);
      return;
    }

    setTimeout(typeEffect, isDeleting ? 55 : 95);
  }

  document.addEventListener('DOMContentLoaded', typeEffect);
})();
