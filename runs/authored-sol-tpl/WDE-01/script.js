const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('#site-nav');
const dialog = document.querySelector('#demo-dialog');
const form = document.querySelector('#demo-form');

menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

document.querySelectorAll('[data-open-demo]').forEach(button => button.addEventListener('click', () => dialog.showModal()));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
document.querySelector('[data-close-demo]').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const box = dialog.getBoundingClientRect();
  if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
});
form.addEventListener('submit', event => {
  event.preventDefault();
  form.hidden = true;
  dialog.querySelector('.success').hidden = false;
});
dialog.addEventListener('close', () => {
  window.setTimeout(() => {
    form.reset();
    form.hidden = false;
    dialog.querySelector('.success').hidden = true;
  }, 200);
});
document.querySelector('#year').textContent = new Date().getFullYear();
