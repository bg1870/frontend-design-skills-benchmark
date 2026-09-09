const billingButtons = document.querySelectorAll('.billing-option');
const prices = document.querySelectorAll('[data-monthly]');
const note = document.querySelector('.dynamic-note');

billingButtons.forEach(button => button.addEventListener('click', () => {
  const cycle = button.dataset.cycle;
  billingButtons.forEach(item => item.classList.toggle('active', item === button));
  prices.forEach(price => price.textContent = price.dataset[cycle]);
  note.textContent = cycle === 'annual' ? 'Billed annually. Save $192/year.' : 'Billed monthly. Cancel anytime.';
}));

document.querySelector('.menu').addEventListener('click', event => {
  const navLinks = document.querySelector('.nav-links');
  const open = event.currentTarget.getAttribute('aria-expanded') === 'true';
  event.currentTarget.setAttribute('aria-expanded', String(!open));
  event.currentTarget.textContent = open ? '☰' : '×';
  if (!open) {
    navLinks.style.cssText = 'display:flex;position:absolute;top:66px;left:0;right:0;margin:0;padding:24px;background:white;flex-direction:column;gap:20px;border-bottom:1px solid #ddd';
  } else {
    navLinks.style.cssText = '';
  }
});
