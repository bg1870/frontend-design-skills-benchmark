const levels = [
  { events: '50K', price: 149, included: '50K', path: 'M0 55 L25 52 L50 50 L75 46 L100 48 L125 41 L150 43 L175 35 L200 38 L225 31 L260 34' },
  { events: '250K', price: 349, included: '250K', path: 'M0 55 L25 44 L50 48 L75 30 L100 35 L125 17 L150 28 L175 12 L200 21 L225 7 L260 14' },
  { events: '1M', price: 749, included: '1M', path: 'M0 58 L25 35 L50 44 L75 19 L100 31 L125 9 L150 25 L175 5 L200 18 L225 3 L260 8' },
  { events: '5M', price: 1499, included: '5M', path: 'M0 54 L25 25 L50 38 L75 12 L100 29 L125 5 L150 20 L175 3 L200 14 L225 2 L260 5' },
  { events: '20M+', price: 'Custom', included: '20M+', path: 'M0 51 L25 18 L50 35 L75 8 L100 24 L125 3 L150 18 L175 2 L200 11 L225 1 L260 4' }
];
const range = document.querySelector('#volume');
const eventValue = document.querySelector('#eventValue');
const fitVolume = document.querySelector('#fitVolume');
const included = document.querySelector('#includedEvents');
const price = document.querySelector('#scalePrice');
const spark = document.querySelector('#spark');
function updatePricing() {
  const plan = levels[Number(range.value)];
  eventValue.textContent = plan.events;
  fitVolume.textContent = plan.events;
  included.textContent = plan.included;
  price.textContent = typeof plan.price === 'number' ? plan.price.toLocaleString() : plan.price;
  price.style.fontSize = typeof plan.price === 'number' ? '' : '38px';
  spark.setAttribute('d', plan.path);
}
range.addEventListener('input', updatePricing);
document.querySelectorAll('details').forEach(detail => detail.addEventListener('toggle', () => {
  if (detail.open) document.querySelectorAll('details[open]').forEach(other => { if (other !== detail) other.open = false; });
}));
