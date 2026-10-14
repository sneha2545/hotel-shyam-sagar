/* ==========================================================================
   forms.js — Contact / enquiry form: client-side validation + demo feedback
   ========================================================================== */

(function () {
  'use strict';

  const form = document.querySelector('.enquiry-form');
  if (!form) return;

  function showToast(msg, icon) {
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
    setTimeout(() => toast.classList.remove('show'), 5000);
    setTimeout(() => toast.remove(), 5500);
  }

  function validatePhone(phone) {
    // Accept +91 or 0 prefix, 10–15 digits
    const digits = phone.replace(/\D/g, '');
    return digits.length >= 10 && digits.length <= 15;
  }

  function validateEmail(email) {
    if (!email) return true;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = form.querySelector('[name="name"]').value.trim();
    const phone = form.querySelector('[name="phone"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const subject = form.querySelector('[name="subject"]').value;
    const message = form.querySelector('[name="message"]').value.trim();

    if (!name) {
      showToast('Please enter your name.', 'error');
      form.querySelector('[name="name"]').focus();
      return;
    }
    if (!phone) {
      showToast('Please enter your phone number.', 'error');
      form.querySelector('[name="phone"]').focus();
      return;
    }
    if (!validatePhone(phone)) {
      showToast('Please enter a valid phone number.', 'error');
      form.querySelector('[name="phone"]').focus();
      return;
    }
    if (email && !validateEmail(email)) {
      showToast('Please enter a valid email address.', 'error');
      form.querySelector('[name="email"]').focus();
      return;
    }
    if (!message) {
      showToast('Please add a brief message.', 'error');
      form.querySelector('[name="message"]').focus();
      return;
    }

    // Demo success message — no backend
    showToast(
      'Thank you, ' + name + '. (Demo) Your enquiry was validated locally — no message was sent.',
      'mark_email_read'
    );

    // Reset form after a moment
    setTimeout(() => {
      form.reset();
    }, 600);
  });
})();