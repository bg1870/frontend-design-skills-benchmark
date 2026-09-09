const options = document.querySelectorAll('.billing-option');
const prices = document.querySelectorAll('[data-monthly]');
const terms = document.querySelectorAll('.term small');

options.forEach(option => option.addEventListener('click', () => {
  const period = option.dataset.period;
  options.forEach(item => {
    const selected = item === option;
    item.classList.toggle('active', selected);
    item.setAttribute('aria-pressed', selected);
  });
  prices.forEach(price => price.textContent = price.dataset[period]);
  terms.forEach(term => term.textContent = period === 'annual' ? 'billed annually' : 'billed monthly');
}));

const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('#site-nav');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  menuButton.textContent = open ? 'Menu' : 'Close';
  navigation.classList.toggle('open', !open);
});
navigation.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.textContent = 'Menu';
  navigation.classList.remove('open');
});

const toast = document.querySelector('.toast');
let toastTimer;
document.querySelectorAll('.choose-plan').forEach(link => link.addEventListener('click', event => {
  event.preventDefault();
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.hidden = true, 3500);
}));
