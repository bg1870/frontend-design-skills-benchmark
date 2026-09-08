const billingButtons = document.querySelectorAll('.billing-option');
const prices = document.querySelectorAll('[data-monthly]');

billingButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const period = button.dataset.period;
    billingButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    prices.forEach((price) => {
      price.textContent = price.dataset[period];
    });
  });
});

const expandButton = document.querySelector('.expand-button');
const table = document.querySelector('.table-wrap');
expandButton.addEventListener('click', () => {
  const open = table.classList.toggle('open');
  expandButton.setAttribute('aria-expanded', String(open));
  expandButton.firstChild.textContent = open ? 'Show fewer features ' : 'Show all features ';
  expandButton.querySelector('span').textContent = open ? '−' : '+';
});

const menuButton = document.querySelector('.menu-button');
const header = document.querySelector('.site-header');
menuButton.addEventListener('click', () => {
  const open = header.classList.toggle('menu-open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
