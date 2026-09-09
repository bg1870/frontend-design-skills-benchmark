const billingButtons = document.querySelectorAll('.billing button');
const prices = document.querySelectorAll('[data-monthly]');
const billingLabels = document.querySelectorAll('.price small b');

billingButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const period = button.dataset.period;
    billingButtons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
    prices.forEach((price) => { price.textContent = price.dataset[period]; });
    billingLabels.forEach((label) => { label.textContent = period === 'annual' ? 'annually' : 'monthly'; });
  });
});

const menu = document.querySelector('.menu');
const nav = document.querySelector('#nav-links');
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!open));
  menu.querySelector('.sr-only').textContent = open ? 'Open navigation' : 'Close navigation';
  nav.classList.toggle('open', !open);
});
