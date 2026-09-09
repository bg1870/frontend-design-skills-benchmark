const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('#site-nav');

menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('open', !open);
});

nav.addEventListener('click', (event) => {
  if (event.target.matches('a')) {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }
});

const shareButton = document.querySelector('#share-sample');
shareButton.addEventListener('click', () => {
  shareButton.textContent = 'Preview ready';
  shareButton.disabled = true;
});

const form = document.querySelector('#demo-form');
const status = form.querySelector('.form-status');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  status.textContent = '';
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  const button = form.querySelector('button[type="submit"]');
  button.textContent = 'Request received';
  button.disabled = true;
  status.textContent = 'Thanks — your request has been recorded in this demo.';
});

document.querySelector('#year').textContent = new Date().getFullYear();
