/* ==========================================================================
   nav.js — Sticky header, mobile drawer, active page highlighting
   ========================================================================== */

(function () {
  'use strict';

  const header = document.querySelector('.site-header');
  const topbar = document.querySelector('.topbar');
  const drawer = document.querySelector('.mobile-drawer');
  const toggleBtns = document.querySelectorAll('.nav-toggle');
  const drawerClose = document.querySelector('.mobile-drawer .close-btn');

  /* ---------- Mark active link by current page ---------- */
  function setActiveNav() {
    const path = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
    document.querySelectorAll('[data-nav]').forEach((link) => {
      const target = link.getAttribute('data-nav');
      if (
        (path === 'index.html' && target === 'home') ||
        (path === '' && target === 'home') ||
        path === (target + '.html').toLowerCase()
      ) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  /* ---------- Mobile drawer toggle ---------- */
  function openDrawer() {
    if (!drawer) return;
    drawer.classList.add('open');
    document.body.classList.add('no-scroll');
  }
  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove('open');
    document.body.classList.remove('no-scroll');
  }

  // Open: any .nav-toggle that is NOT inside the drawer (i.e., the header hamburger)
  toggleBtns.forEach((btn) => {
    if (!drawer || !drawer.contains(btn)) {
      btn.addEventListener('click', openDrawer);
    }
  });

  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);

  // Close on any link click inside the drawer
  if (drawer) {
    drawer.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', closeDrawer);
    });
    // Also close drawer when tapping outside its content area
    drawer.addEventListener('click', function (e) {
      if (e.target === drawer) closeDrawer();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeDrawer();
  });

  /* ---------- Pad main for fixed header + topbar ---------- */
  function padMain() {
    const main = document.querySelector('main');
    if (!main) return;
    const headerH = header ? header.offsetHeight : 80;
    const topbarH = topbar ? topbar.offsetHeight : 0;
    main.style.paddingTop = (headerH + topbarH) + 'px';
  }

  /* ---------- Subtle header shadow on scroll ---------- */
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 8) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }

  setActiveNav();
  padMain();
  onScroll();

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', padMain);
})();