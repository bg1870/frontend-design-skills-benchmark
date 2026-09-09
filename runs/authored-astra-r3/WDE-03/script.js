const billingButtons = document.querySelectorAll('[data-billing]');
const prices = document.querySelectorAll('[data-monthly]');
let billing = 'annual';

function setBilling(next) {
  billing = next;
  billingButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.billing === next)));
  prices.forEach(price => {
    price.textContent = price.dataset[next];
    price.closest('.plan').querySelector('.billing-note').textContent = next === 'annual' ? 'Billed annually' : 'Billed monthly';
  });
  updateEstimate();
}

billingButtons.forEach(button => button.addEventListener('click', () => setBilling(button.dataset.billing)));

const seats = document.querySelector('#seats');
const seatOutput = document.querySelector('#seat-output');
const estimatePrice = document.querySelector('#estimate-price');
const formatUSD = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

function updateEstimate() {
  const count = Number(seats.value);
  const unitPrice = billing === 'annual' ? 63 : 79;
  seatOutput.value = count;
  seatOutput.textContent = count;
  estimatePrice.textContent = formatUSD.format(count * unitPrice);
  document.querySelector('.estimate-total small').textContent = billing === 'annual' ? 'Annual billing' : 'Monthly billing';
}

seats.addEventListener('input', updateEstimate);
document.querySelector('#year').textContent = new Date().getFullYear();
updateEstimate();
