/* ==========================================================================
   booking.js — Hero booking widget + reserve/enquire buttons
   ========================================================================== */

(function () {
  'use strict';

  const WHATSAPP = '919548189215';
  const PHONE = '+919548189215';

  function showToast(msg, icon = 'check_circle') {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast show';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.innerHTML =
      '<span class="material-symbols-outlined">' + icon + '</span>' +
      '<span>' + msg + '</span>';
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.remove('show'), 3600);
    setTimeout(() => toast.remove(), 4100);
  }

  /* ---------- Hero booking form ---------- */
  function handleBooking(form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const checkin = form.querySelector('[name="checkin"]').value;
      const checkout = form.querySelector('[name="checkout"]').value;
      const guests = form.querySelector('[name="guests"]').value;
      const space = form.querySelector('[name="space"]').value;

      if (checkin && checkout && new Date(checkout) <= new Date(checkin)) {
        showToast('Check-out must be after check-in.', 'error');
        return;
      }

      const nights =
        checkin && checkout
          ? Math.max(
              1,
              Math.round(
                (new Date(checkout) - new Date(checkin)) / (1000 * 60 * 60 * 24)
              )
            )
          : 1;

      const msg =
        'Enquiry: ' + space + ' · ' + guests + ' · ' + nights +
        ' night' + (nights > 1 ? 's' : '') + '. Opening WhatsApp…';
      showToast(msg, 'event_available');

      const text =
        'Hello Hotel Shyam Sagar, I would like to enquire about ' +
        space +
        ' for ' +
        guests +
        ' from ' +
        checkin +
        ' to ' +
        checkout +
        ' (' +
        nights +
        ' night' +
        (nights > 1 ? 's' : '') +
        ').';
      setTimeout(() => {
        window.open(
          'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(text),
          '_blank'
        );
      }, 800);
    });
  }

  document.querySelectorAll('.booking-form').forEach(handleBooking);

  /* ---------- "Enquire" buttons — multi-page aware ---------- */
  document.querySelectorAll('[data-action="enquire"]').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const room = btn.getAttribute('data-room');
      const event = btn.getAttribute('data-event');
      const href = btn.getAttribute('href') || '';
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';

      const targetType = event || (room ? 'Room Enquiry' : 'General Enquiry');

      // If the button points to a different page, persist context and navigate
      const isCrossPage = href && !href.startsWith('#') && href !== currentPage && href !== '';
      if (isCrossPage) {
        try {
          sessionStorage.setItem('shyamSagarEnquiry', JSON.stringify({
            type: targetType,
            room: room || '',
            event: event || ''
          }));
        } catch (err) {
          /* sessionStorage not available */
        }
        // Allow default navigation
        return;
      }

      // Same-page or no href — handle in place
      e.preventDefault();
      applyEnquiryContext(targetType, room, event);
      showToast('Opening contact form for ' + (room || event || 'enquiry') + '…', 'mark_email_read');
    });
  });

  function applyEnquiryContext(targetType, room, event) {
    const enquiryTypeSelect = document.querySelector('#enq-type');
    const enquiryMessage = document.querySelector('#enq-message');
    const enquiryName = document.querySelector('#enq-name');

    if (enquiryTypeSelect) {
      const option = Array.from(enquiryTypeSelect.options).find(
        (o) => o.value === targetType || o.textContent === targetType
      );
      if (option) enquiryTypeSelect.value = option.value;
    }
    if (enquiryMessage) {
      let msg = '';
      if (room) msg = 'Hello, I would like to enquire about the ' + room + ' at Hotel Shyam Sagar.';
      else if (event) msg = 'Hello, I would like to enquire about hosting a ' + event + ' at Hotel Shyam Sagar.';
      else msg = 'Hello, I have an enquiry about Hotel Shyam Sagar.';
      enquiryMessage.value = msg;
    }
    if (enquiryName) setTimeout(() => enquiryName.focus(), 600);

    const form = document.querySelector('.enquiry-form');
    if (form) {
      const headerH = (document.querySelector('.site-header')?.offsetHeight || 0);
      const topbarH = (document.querySelector('.topbar')?.offsetHeight || 0);
      const top = form.getBoundingClientRect().top + window.scrollY - headerH - topbarH - 20;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }

  /* ---------- Restore enquiry context when arriving on contact.html ---------- */
  (function restoreEnquiryContext() {
    try {
      const raw = sessionStorage.getItem('shyamSagarEnquiry');
      if (!raw) return;
      const data = JSON.parse(raw);
      sessionStorage.removeItem('shyamSagarEnquiry');
      setTimeout(() => applyEnquiryContext(data.type, data.room, data.event), 250);
    } catch (err) {
      /* ignore */
    }
  })();
})();