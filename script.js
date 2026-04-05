// Dhanam Driving School — Landing Page Scripts

(function () {
  'use strict';

  // === Mobile Navigation Toggle ===
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.getElementById('nav-menu');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when a link is clicked
    menu.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  // === Smooth scroll for anchor links (fallback for older browsers) ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // === Simple form validation ===
  const form = document.querySelector('.booking__form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('#name');
      const email = form.querySelector('#email');
      let valid = true;

      // Clear previous errors
      form.querySelectorAll('.form-field__error').forEach(el => el.remove());

      if (!name.value.trim()) {
        showError(name, 'Please enter your name');
        valid = false;
      }
      if (!email.value.trim() || !email.value.includes('@')) {
        showError(email, 'Please enter a valid email');
        valid = false;
      }

      if (valid) {
        // Show success state
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = '✓ Request Sent!';
        btn.disabled = true;
        btn.style.background = '#22c55e';
        btn.style.borderColor = '#22c55e';

        setTimeout(() => {
          btn.textContent = originalText;
          btn.disabled = false;
          btn.style.background = '';
          btn.style.borderColor = '';
          form.reset();
        }, 3000);
      }
    });
  }

  function showError(input, message) {
    const error = document.createElement('span');
    error.className = 'form-field__error';
    error.textContent = message;
    error.style.color = '#ef4444';
    error.style.fontSize = '0.8125rem';
    error.style.marginTop = '0.25rem';
    error.setAttribute('role', 'alert');
    input.parentElement.appendChild(error);
    input.style.borderColor = '#ef4444';
    input.addEventListener('input', () => {
      error.remove();
      input.style.borderColor = '';
    }, { once: true });
  }

  // === Intersection Observer for scroll animations ===
  const animateOnScroll = () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    // Only animate if user hasn't opted out of motion
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.bento-item, .feature-card, .pricing-card, .testimonial-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(1.5rem)';
        el.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        observer.observe(el);
      });
    }
  };

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animateOnScroll);
  } else {
    animateOnScroll();
  }
})();
