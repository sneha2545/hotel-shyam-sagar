/* ==========================================================================
   gallery.js — Lightbox for gallery pages
   ========================================================================== */

(function () {
  'use strict';

  const grid = document.querySelector('.gallery-grid');
  if (!grid) return;

  const items = Array.from(grid.querySelectorAll('.gallery-item'));
  if (!items.length) return;

  // Build lightbox
  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-label', 'Image preview');
  lb.innerHTML =
    '<button class="close" aria-label="Close preview">' +
    '<span class="material-symbols-outlined">close</span>' +
    '</button>' +
    '<button class="nav-btn prev" aria-label="Previous image">' +
    '<span class="material-symbols-outlined">chevron_left</span>' +
    '</button>' +
    '<img alt="" />' +
    '<button class="nav-btn next" aria-label="Next image">' +
    '<span class="material-symbols-outlined">chevron_right</span>' +
    '</button>';
  document.body.appendChild(lb);

  const lbImg = lb.querySelector('img');
  let current = 0;

  function open(idx) {
    current = (idx + items.length) % items.length;
    const src = items[current].getAttribute('data-full') || items[current].querySelector('img')?.src;
    const alt = items[current].querySelector('img')?.alt || '';
    if (!src) return;
    lbImg.src = src;
    lbImg.alt = alt;
    lb.classList.add('open');
    document.body.classList.add('no-scroll');
  }
  function close() {
    lb.classList.remove('open');
    document.body.classList.remove('no-scroll');
  }
  function next() { open(current + 1); }
  function prev() { open(current - 1); }

  items.forEach((item, i) =>
    item.addEventListener('click', () => open(i))
  );
  lb.querySelector('.close').addEventListener('click', close);
  lb.querySelector('.nav-btn.next').addEventListener('click', next);
  lb.querySelector('.nav-btn.prev').addEventListener('click', prev);
  lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });
})();