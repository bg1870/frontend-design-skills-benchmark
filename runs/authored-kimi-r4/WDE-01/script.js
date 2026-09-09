const menu = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');
menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', open);
});
document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false');
}));

document.querySelector('.demo-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const note = e.currentTarget.nextElementSibling;
  note.textContent = "Thanks — we'll be in touch shortly.";
  e.currentTarget.reset();
});

document.querySelector('.newsletter').addEventListener('submit', (e) => {
  e.preventDefault();
  const input = e.currentTarget.querySelector('input');
  input.value = '';
  input.placeholder = 'You’re on the list!';
});
