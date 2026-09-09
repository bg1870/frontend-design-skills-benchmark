const billingButtons = document.querySelectorAll('.billing-option');
const price = document.querySelector('[data-annual]');
const note = document.querySelector('.dynamic-note');

billingButtons.forEach(button => button.addEventListener('click', () => {
  billingButtons.forEach(item => item.classList.remove('active'));
  button.classList.add('active');
  const annual = button.dataset.period === 'annual';
  price.textContent = annual ? price.dataset.annual : price.dataset.monthly;
  note.textContent = annual ? 'Billed annually · Includes 10 seats' : 'Billed monthly · Includes 10 seats';
}));

const menu = document.querySelector('.menu');
const links = document.querySelector('.nav-links');
menu.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
});
