const toggle = document.querySelector('.toggle');
const billingState = document.querySelector('#billing-state');
const prices = document.querySelectorAll('.amount');
const notes = document.querySelectorAll('.annual-note');

function setBilling(yearly) {
  toggle.setAttribute('aria-checked', String(yearly));
  billingState.textContent = yearly ? 'Yearly' : 'Monthly';
  prices.forEach((price) => {
    price.textContent = yearly ? price.dataset.yearly : price.dataset.monthly;
  });
  notes.forEach((note) => {
    note.textContent = yearly ? 'billed yearly' : 'billed monthly';
  });
}

toggle.addEventListener('click', () => {
  setBilling(toggle.getAttribute('aria-checked') !== 'true');
});

document.querySelector('#year').textContent = new Date().getFullYear();
