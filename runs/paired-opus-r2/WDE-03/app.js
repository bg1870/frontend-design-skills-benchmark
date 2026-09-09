const currency = new Intl.NumberFormat(navigator.languages, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const periodButtons = [...document.querySelectorAll('[data-period]')];
const prices = [...document.querySelectorAll('[data-monthly]')];
const note = document.querySelector('#billing-note');

function setPeriod(period, updateUrl = true) {
  periodButtons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.period === period)));
  prices.forEach((price) => { price.textContent = currency.format(Number(price.dataset[period])); });
  note.textContent = period === 'annual'
    ? 'Annual prices shown as a monthly average. Billed once per year with 2 months included.'
    : 'Billed monthly. Cancel before your next billing date.';
  if (updateUrl) {
    const url = new URL(window.location.href);
    url.searchParams.set('billing', period);
    history.replaceState({}, '', url);
  }
}

periodButtons.forEach((button) => button.addEventListener('click', () => setPeriod(button.dataset.period)));
const initialPeriod = new URLSearchParams(window.location.search).get('billing');
setPeriod(initialPeriod === 'annual' ? 'annual' : 'monthly', false);
document.querySelector('#year').textContent = new Intl.DateTimeFormat(navigator.languages, { year: 'numeric' }).format(new Date());
