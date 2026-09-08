const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  navLinks.classList.toggle('open', !open);
});
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const reveals = document.querySelectorAll('.reveal');
if (reduceMotion) reveals.forEach(el => el.classList.add('visible'));
else {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  }), { threshold: .13 });
  reveals.forEach(el => observer.observe(el));
}

const dialog = document.querySelector('.demo-dialog');
const form = document.querySelector('#demo-form');
document.querySelectorAll('.open-demo').forEach(button => button.addEventListener('click', () => dialog.showModal()));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});

form.querySelectorAll('input').forEach(input => input.addEventListener('input', () => {
  input.closest('.field').classList.toggle('invalid', !input.validity.valid);
}));
form.addEventListener('submit', event => {
  event.preventDefault();
  const inputs = [...form.querySelectorAll('input')];
  inputs.forEach(input => input.closest('.field').classList.toggle('invalid', !input.validity.valid));
  if (!form.checkValidity()) return;
  const submit = form.querySelector('.submit-button');
  const status = form.querySelector('.form-status');
  submit.disabled = true;
  submit.classList.add('loading');
  status.textContent = '';
  window.setTimeout(() => {
    submit.classList.remove('loading');
    submit.disabled = false;
    submit.querySelector('span').textContent = 'Request received';
    status.textContent = 'Thanks. We will be in touch soon.';
    form.querySelectorAll('input').forEach(input => input.disabled = true);
  }, 900);
});