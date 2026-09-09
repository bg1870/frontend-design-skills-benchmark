const menu = document.querySelector('.menu');
const nav = document.querySelector('#nav');
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!open));
  menu.querySelector('.sr-only').textContent = open ? 'Open menu' : 'Close menu';
  nav.classList.toggle('open', !open);
});
nav.addEventListener('click', () => {
  menu.setAttribute('aria-expanded', 'false');
  menu.querySelector('.sr-only').textContent = 'Open menu';
  nav.classList.remove('open');
});
document.querySelector('#year').textContent = new Date().getFullYear();
const review = document.querySelector('#review');
const toast = document.querySelector('.toast');
review.addEventListener('click', () => {
  toast.hidden = false;
  window.clearTimeout(window.toastTimer);
  window.toastTimer = window.setTimeout(() => { toast.hidden = true; }, 4000);
});
