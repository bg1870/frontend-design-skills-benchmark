const periods = document.querySelectorAll('.period');
const prices = document.querySelectorAll('[data-monthly]');

periods.forEach(button => button.addEventListener('click', () => {
  periods.forEach(item => {
    const selected = item === button;
    item.classList.toggle('active', selected);
    item.setAttribute('aria-pressed', String(selected));
  });
  prices.forEach(price => {
    price.classList.add('swap');
    window.setTimeout(() => {
      price.textContent = Number(price.dataset[button.dataset.period]).toLocaleString('en-US');
      price.classList.remove('swap');
    }, 160);
  });
}));

// Keep one FAQ answer open at a time so the section remains easy to scan.
document.querySelectorAll('details').forEach(detail => detail.addEventListener('toggle', () => {
  if (detail.open) document.querySelectorAll('details').forEach(other => {
    if (other !== detail) other.open = false;
  });
}));
