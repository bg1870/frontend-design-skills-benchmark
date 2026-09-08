const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('#site-nav');
const dialog = document.querySelector('#demo-dialog');
const form = document.querySelector('#demo-form');

menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('open', !open);
});

nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

document.querySelectorAll('.demo-trigger').forEach(button => {
  button.addEventListener('click', () => {
    form.hidden = false;
    dialog.querySelector('.form-success').hidden = true;
    dialog.showModal();
  });
});

dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});

form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  form.hidden = true;
  dialog.querySelector('.form-success').hidden = false;
});

document.querySelector('#approve-button').addEventListener('click', event => {
  const button = event.currentTarget;
  button.textContent = 'Week approved';
  button.disabled = true;
});
