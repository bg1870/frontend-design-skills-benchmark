const controls = document.querySelectorAll('.billing-option');
const prices = document.querySelectorAll('[data-monthly]');
const numberFormat = new Intl.NumberFormat(document.documentElement.lang);

function setPeriod(period, updateUrl = true) {
  const safePeriod = period === 'annual' ? 'annual' : 'monthly';
  controls.forEach((item) => {
    const active = item.dataset.period === safePeriod;
    item.classList.toggle('is-active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  prices.forEach((price) => {
    price.textContent = numberFormat.format(Number(price.dataset[safePeriod]));
  });
  if (updateUrl) {
    const url = new URL(window.location.href);
    if (safePeriod === 'annual') url.searchParams.set('billing', 'annual');
    else url.searchParams.delete('billing');
    history.replaceState({}, '', url);
  }
}

controls.forEach((control) => {
  control.addEventListener('click', () => setPeriod(control.dataset.period));
});

setPeriod(new URLSearchParams(window.location.search).get('billing'), false);
