const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  menuButton.textContent = open ? 'Menu' : 'Close';
  nav.classList.toggle('open', !open);
});

nav?.addEventListener('click', (event) => {
  if (event.target.closest('a') && window.innerWidth <= 900) {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.textContent = 'Menu';
  }
});

document.querySelector('#review-button')?.addEventListener('click', () => {
  document.querySelector('#payroll-status').textContent = 'Demo: timecard review would open here.';
});

document.querySelector('#payroll-button')?.addEventListener('click', () => {
  document.querySelector('#payroll-status').textContent = 'Demo preview ready. No payroll was submitted.';
});

document.querySelector('#demo-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.querySelector('#email');
  const message = document.querySelector('#form-message');
  if (!email.checkValidity()) {
    message.textContent = 'Enter a valid work email to continue.';
    email.focus();
    return;
  }
  message.textContent = 'Thanks — your walkthrough request is ready. We’ll be in touch soon.';
  event.currentTarget.reset();
});

document.querySelector('#year').textContent = new Date().getFullYear();
