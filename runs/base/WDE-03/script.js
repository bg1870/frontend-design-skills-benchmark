const toggle = document.querySelector('#billing-toggle');
const labels = document.querySelectorAll('.billing-label');
const prices = document.querySelectorAll('[data-monthly]');
const note = document.querySelector('.dynamic-note');

toggle.addEventListener('click', () => {
  const annual = toggle.getAttribute('aria-checked') !== 'true';
  toggle.setAttribute('aria-checked', String(annual));
  toggle.setAttribute('aria-label', annual ? 'Switch to monthly billing' : 'Switch to annual billing');
  labels.forEach(label => label.classList.toggle('active', label.dataset.periodLabel === (annual ? 'annual' : 'monthly')));
  prices.forEach(price => {
    price.animate([{opacity:.2, transform:'translateY(4px)'},{opacity:1, transform:'translateY(0)'}], {duration:220});
    price.textContent = annual ? price.dataset.annual : price.dataset.monthly;
  });
  note.textContent = annual ? 'Billed annually · Save $120 / user' : 'Billed monthly';
});

document.querySelectorAll('details').forEach(item => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    document.querySelectorAll('details').forEach(other => { if (other !== item) other.open = false; });
  });
});
