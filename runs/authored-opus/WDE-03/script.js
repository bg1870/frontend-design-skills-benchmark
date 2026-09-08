const billingButtons = document.querySelectorAll('.billing button');
const prices = document.querySelectorAll('[data-monthly]');
const terms = document.querySelectorAll('.price .term small');

billingButtons.forEach(button => button.addEventListener('click', () => {
  const period = button.dataset.period;
  billingButtons.forEach(item => {
    const selected = item === button;
    item.classList.toggle('active', selected);
    item.setAttribute('aria-pressed', String(selected));
  });
  prices.forEach(price => price.textContent = price.dataset[period]);
  terms.forEach(term => term.textContent = period === 'annual' ? 'billed annually' : 'billed monthly');
}));

const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.nav-links');
menuButton.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menu.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));
