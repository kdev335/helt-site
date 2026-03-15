/* ============================================================
   HeLT Consulting — Main JS
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Mobile nav toggle ---------- */
  const toggle = document.getElementById('nav-toggle');
  const nav    = document.getElementById('main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
      document.body.style.overflow = !open ? 'hidden' : '';
    });

    // Close on link click
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
        document.body.style.overflow = '';
        toggle.focus();
      }
    });
  }

  /* ---------- Active nav highlight ---------- */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav__link').forEach(link => {
    const href = link.getAttribute('href').split('/').pop();
    if (href === path || (path === '' && href === 'index.html')) {
      link.setAttribute('aria-current', 'page');
    }
  });

  /* ---------- Sticky header shadow ---------- */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Scroll fade-in ---------- */
  const faders = document.querySelectorAll('.fade-up');
  if (faders.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    faders.forEach(el => observer.observe(el));
  } else {
    faders.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Contact form validation ---------- */
  const form = document.getElementById('contact-form');
  const success = document.getElementById('form-success');

  if (form && success) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      // Reset
      form.querySelectorAll('.form-group').forEach(g => g.classList.remove('has-error'));

      // Required fields
      form.querySelectorAll('[required]').forEach(field => {
        if (!field.value.trim()) {
          field.closest('.form-group').classList.add('has-error');
          valid = false;
        }
      });

      // Email format
      const email = form.querySelector('[type="email"]');
      if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        email.closest('.form-group').classList.add('has-error');
        valid = false;
      }

      if (valid) {
        form.style.display = 'none';
        success.classList.add('is-visible');
      } else {
        // Focus first error
        const firstErr = form.querySelector('.has-error input, .has-error select, .has-error textarea');
        if (firstErr) firstErr.focus();
      }
    });
  }

})();
