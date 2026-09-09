const billingButtons = document.querySelectorAll('.billing button');
const prices = document.querySelectorAll('[data-monthly]');
const billingNote = document.querySelector('.billing-wrap small');

billingButtons.forEach((button) => button.addEventListener('click', () => {
  const period = button.dataset.period;
  billingButtons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
  prices.forEach((price) => { price.textContent = price.dataset[period]; });
  billingNote.textContent = period === 'annual' ? 'Billed annually' : 'Billed month to month';
}));

const compareButton = document.querySelector('.text-button');
const featureTable = document.querySelector('.table-wrap');
compareButton.addEventListener('click', () => {
  const expanded = compareButton.getAttribute('aria-expanded') === 'true';
  compareButton.setAttribute('aria-expanded', String(!expanded));
  compareButton.firstChild.textContent = expanded ? 'Show full comparison ' : 'Show fewer features ';
  featureTable.classList.toggle('expanded', !expanded);
});

const menuButton = document.querySelector('.menu');
const mobileNav = document.querySelector('.mobile-nav');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  menuButton.querySelector('b').textContent = open ? 'Open menu' : 'Close menu';
  mobileNav.hidden = open;
});
mobileNav.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    mobileNav.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
  }
});
