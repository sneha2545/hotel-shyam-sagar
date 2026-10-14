/* ==========================================================================
   main.js — Reveal-on-scroll, counter animation, lazy bg, parallax, marquee
   ========================================================================== */

(function () {
  'use strict';

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-fade, .reveal-left, .reveal-right, .reveal-scale');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in-view'));
  }

  /* ---------- Counter animation ---------- */
  const counters = document.querySelectorAll('[data-counter]');
  if ('IntersectionObserver' in window && counters.length) {
    const counterIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const end = parseFloat(el.getAttribute('data-counter'));
          const suffix = el.getAttribute('data-suffix') || '';
          const prefix = el.getAttribute('data-prefix') || '';
          const duration = parseInt(el.getAttribute('data-duration')) || 1600;
          const decimals = parseInt(el.getAttribute('data-decimals')) || 0;
          const start = performance.now();
          const tick = (now) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            const value = (end * eased).toFixed(decimals);
            el.textContent = prefix + value + suffix;
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          counterIo.unobserve(el);
        });
      },
      { threshold: 0.3 }
    );
    counters.forEach((el) => counterIo.observe(el));
  }

  /* ---------- Lazy-set hero backgrounds ---------- */
  const lazyBgs = document.querySelectorAll('[data-bg]');
  if ('IntersectionObserver' in window && lazyBgs.length) {
    const ioBg = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.backgroundImage =
              "url('" + entry.target.getAttribute('data-bg') + "')";
            entry.target.closest('.hero, .page-hero')?.classList.add('loaded');
            ioBg.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '200px' }
    );
    lazyBgs.forEach((el) => ioBg.observe(el));
  } else {
    lazyBgs.forEach((el) => {
      el.style.backgroundImage = "url('" + el.getAttribute('data-bg') + "')";
    });
  }

  /* ---------- Parallax hero ---------- */
  const heroBg = document.querySelector('.hero .hero-bg, .page-hero .hero-bg');
  if (heroBg && window.matchMedia('(min-width: 1024px)').matches) {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, 600) * 0.15;
        heroBg.style.transform = `scale(1) translateY(${y}px)`;
        ticking = false;
      });
      ticking = true;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Button ripple ---------- */
  document.addEventListener('pointermove', (e) => {
    const btn = e.target.closest('.btn');
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    btn.style.setProperty('--rx', ((e.clientX - rect.left) / rect.width * 100) + '%');
    btn.style.setProperty('--ry', ((e.clientY - rect.top) / rect.height * 100) + '%');
  });

  /* ---------- Tilt on hover (subtle 3D) ---------- */
  document.querySelectorAll('.tilt').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
      card.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${y}deg) translateY(-4px)`;
    });
    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });
  });

  /* ---------- Marquee: clone track so the loop is seamless ---------- */
  document.querySelectorAll('.marquee-track').forEach((track) => {
    const clone = track.innerHTML;
    track.innerHTML = clone + clone;
  });

  /* ---------- Smooth in-page anchor focus highlight ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length <= 1) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();