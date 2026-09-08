const billingButtons = document.querySelectorAll('[data-billing]');
const amounts = document.querySelectorAll('.amount[data-monthly]');
const note = document.querySelector('.billing-control > p');
const toast = document.querySelector('.toast');
let toastTimer;

billingButtons.forEach((button) => button.addEventListener('click', () => {
  const cycle = button.dataset.billing;
  billingButtons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
  amounts.forEach((amount) => {
    amount.textContent = new Intl.NumberFormat('en-US').format(Number(amount.dataset[cycle]));
  });
  note.textContent = cycle === 'annual'
    ? 'Prices shown in USD. Annual plans are billed once per year.'
    : 'Prices shown in USD. Monthly plans can be canceled any time.';
  toast.textContent = `${cycle[0].toUpperCase()}${cycle.slice(1)} pricing applied`;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.hidden = true; }, 2200);
}));

const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('#nav');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('is-open', !open);
});
nav.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    menuButton.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
  }
});
