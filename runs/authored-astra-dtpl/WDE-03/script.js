const toggleButtons = document.querySelectorAll('[data-period]');
const prices = document.querySelectorAll('.price strong[data-monthly]');
const billingNotes = document.querySelectorAll('[data-bill-note]');

function setPeriod(period) {
  toggleButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.period === period)));
  prices.forEach(price => { price.textContent = price.dataset[period]; });
  billingNotes.forEach((note, index) => {
    const price = Number(prices[index + 1].dataset[period]);
    note.textContent = period === 'annual' ? `Billed $${(price * 12).toLocaleString()} annually` : 'Billed monthly';
  });
}
toggleButtons.forEach(button => button.addEventListener('click', () => setPeriod(button.dataset.period)));

const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('#main-nav');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  menuButton.querySelector('.sr-only').textContent = open ? 'Open navigation' : 'Close navigation';
  nav.classList.toggle('open', !open);
});
nav.addEventListener('click', () => { nav.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); });

const toast = document.querySelector('.toast');
let toastTimer;
document.querySelectorAll('[data-plan]').forEach(link => link.addEventListener('click', event => {
  event.preventDefault();
  toast.textContent = `${link.dataset.plan} selected — your trial setup is ready.`;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3500);
}));
