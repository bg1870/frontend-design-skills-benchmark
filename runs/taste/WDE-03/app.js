const billingButtons = document.querySelectorAll('[data-period]');
const prices = document.querySelectorAll('.amount[data-monthly]');
const notes = document.querySelectorAll('.billing-note');

billingButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const period = button.dataset.period;
    billingButtons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
    prices.forEach((price) => {
      price.textContent = `$${price.dataset[period]}`;
    });
    notes[0].textContent = period === 'annual' ? 'Billed annually. 5 editor minimum.' : 'Billed monthly. 5 editor minimum.';
    notes[1].textContent = period === 'annual' ? 'Billed annually. 10 editor minimum.' : 'Billed monthly. 10 editor minimum.';
  });
});

const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  navLinks.classList.toggle('open', !open);
});

navLinks.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  navLinks.classList.remove('open');
});
