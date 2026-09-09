const controls = document.querySelectorAll('.billing-option');
const prices = document.querySelectorAll('[data-monthly]');
const note = document.querySelector('#billing-note');
const formatter = new Intl.NumberFormat(document.documentElement.lang || 'en');

function setPeriod(period, updateUrl = true) {
  const selectedPeriod = period === 'annual' ? 'annual' : 'monthly';
  controls.forEach((item) => {
    const selected = item.dataset.period === selectedPeriod;
    item.classList.toggle('active', selected);
    item.setAttribute('aria-pressed', String(selected));
  });
  prices.forEach((price) => {
    price.textContent = formatter.format(Number(price.dataset[selectedPeriod]));
  });
  note.textContent = selectedPeriod === 'annual'
    ? 'Prices shown per month and billed once per year. Taxes excluded. No setup fees.'
    : 'Prices billed monthly. Taxes excluded. Cancel or change plans at any time.';

  if (updateUrl) {
    const url = new URL(window.location.href);
    if (selectedPeriod === 'annual') url.searchParams.set('billing', 'annual');
    else url.searchParams.delete('billing');
    window.history.replaceState({}, '', url);
  }
}

controls.forEach((control) => {
  control.addEventListener('click', () => setPeriod(control.dataset.period));
});

setPeriod(new URLSearchParams(window.location.search).get('billing'), false);
