const cycleButtons = document.querySelectorAll('[data-cycle]');
const pricedPlans = document.querySelectorAll('[data-monthly]');
const billingNotes = document.querySelectorAll('[data-billing-note]');
const numberFormat = new Intl.NumberFormat(document.documentElement.lang);
const currencyFormat = new Intl.NumberFormat(document.documentElement.lang, {
  style: 'currency', currency: 'USD', maximumFractionDigits: 0
});

function setBillingCycle(cycle, updateUrl = true) {
  const validCycle = cycle === 'annual' ? 'annual' : 'monthly';
  cycleButtons.forEach((item) => item.setAttribute('aria-pressed', String(item.dataset.cycle === validCycle)));
  pricedPlans.forEach((price) => { price.textContent = numberFormat.format(Number(price.dataset[validCycle])); });
  billingNotes.forEach((note) => {
    note.textContent = validCycle === 'annual'
      ? `Billed ${currencyFormat.format(119 * 12)} annually`
      : 'Paid monthly';
  });
  if (updateUrl) {
    const url = new URL(window.location.href);
    url.searchParams.set('billing', validCycle);
    window.history.replaceState({}, '', url);
  }
}

cycleButtons.forEach((button) => {
  button.addEventListener('click', () => setBillingCycle(button.dataset.cycle));
});

setBillingCycle(new URLSearchParams(window.location.search).get('billing'), false);

const menuButton = document.querySelector('.menu-button');
const mobileMenu = document.querySelector('#mobile-menu');
menuButton.addEventListener('click', () => {
  const opening = menuButton.getAttribute('aria-expanded') === 'false';
  menuButton.setAttribute('aria-expanded', String(opening));
  menuButton.setAttribute('aria-label', opening ? 'Close menu' : 'Open menu');
  mobileMenu.hidden = !opening;
});

mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open menu');
  mobileMenu.hidden = true;
}));
