const cycleButtons = document.querySelectorAll('[data-cycle]');
const prices = document.querySelectorAll('[data-monthly]');
const termLabels = document.querySelectorAll('.price-line:not(.custom) .term');

cycleButtons.forEach(button => button.addEventListener('click', () => {
  const cycle = button.dataset.cycle;
  cycleButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  prices.forEach(price => price.textContent = price.dataset[cycle]);
  termLabels.forEach(label => label.innerHTML = cycle === 'annual' ? '/ month<br><small>billed annually</small>' : '/ month<br><small>billed monthly</small>');
}));

const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('#site-nav');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('open', !open);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

document.querySelectorAll('[data-plan]').forEach(link => link.addEventListener('click', () => {
  document.querySelector('#selected-plan').value = link.dataset.plan;
}));

const form = document.querySelector('#trial-form');
const email = document.querySelector('#email');
const status = document.querySelector('#form-status');
form.addEventListener('submit', event => {
  event.preventDefault();
  status.className = 'form-note';
  if (!email.validity.valid) {
    status.textContent = 'Enter a valid work email to continue.';
    status.classList.add('error');
    email.setAttribute('aria-invalid', 'true');
    email.focus();
    return;
  }
  email.removeAttribute('aria-invalid');
  status.textContent = `Thanks — your ${document.querySelector('#selected-plan').value} trial request is saved in this demo.`;
  status.classList.add('success');
  form.reset();
});
