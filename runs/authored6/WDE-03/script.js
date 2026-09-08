const controls = document.querySelectorAll('.billing-option');
const note = document.querySelector('.billing-note');
controls.forEach(button => button.addEventListener('click', () => {
  const period = button.dataset.period;
  controls.forEach(item => {
    const selected = item === button;
    item.classList.toggle('active', selected);
    item.setAttribute('aria-pressed', selected);
  });
  document.querySelectorAll('[data-monthly]').forEach(price => {
    price.textContent = price.dataset[period];
  });
  document.querySelectorAll('.term').forEach(term => {
    term.textContent = period === 'annual' ? '/ month, billed yearly' : '/ month';
  });
  note.textContent = period === 'annual'
    ? 'Prices shown in USD and billed annually. You save 20% compared with monthly billing.'
    : 'Prices shown in USD, billed monthly. Event overages are never automatic.';
}));

const menu = document.querySelector('.menu');
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!open));
  document.querySelector('nav').classList.toggle('mobile-open', !open);
});
