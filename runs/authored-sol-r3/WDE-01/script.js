const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#site-nav');

toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('open', !open);
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  toggle.setAttribute('aria-expanded', 'false');
  nav.classList.remove('open');
}));

const detailsButton = document.querySelector('#reviewDetails');
const reviewNote = document.querySelector('#reviewNote');
detailsButton.addEventListener('click', () => {
  const open = detailsButton.getAttribute('aria-expanded') === 'true';
  detailsButton.setAttribute('aria-expanded', String(!open));
  detailsButton.textContent = open ? 'Review details' : 'Hide details';
  reviewNote.hidden = open;
});

document.querySelector('#year').textContent = new Date().getFullYear();
