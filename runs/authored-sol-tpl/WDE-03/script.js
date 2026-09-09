const controls = document.querySelectorAll('[data-period]');
const prices = document.querySelectorAll('[data-monthly]');
const notes = document.querySelectorAll('.billing-note');

controls.forEach(control => control.addEventListener('click', () => {
  const period = control.dataset.period;
  controls.forEach(item => item.setAttribute('aria-pressed', String(item === control)));
  prices.forEach(price => price.textContent = price.dataset[period]);
  notes[0].textContent = period === 'annual' ? '$468 per user, billed annually' : 'Billed monthly · cancel anytime';
  notes[1].textContent = period === 'annual' ? '$948 per user, billed annually' : 'Billed monthly · cancel anytime';
}));
