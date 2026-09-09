const dateNode = document.querySelector('#service-date');
const yearNode = document.querySelector('#year');
const resolveButton = document.querySelector('#resolve-button');
const ticketStatus = document.querySelector('#ticket-status');
const form = document.querySelector('#demo-form');
const formMessage = document.querySelector('#form-message');

const nextFriday = new Date();
nextFriday.setDate(nextFriday.getDate() + ((5 - nextFriday.getDay() + 7) % 7 || 7));
dateNode.textContent = new Intl.DateTimeFormat(navigator.languages, {
  weekday: 'long', month: 'short', day: 'numeric'
}).format(nextFriday);
yearNode.textContent = new Intl.NumberFormat(navigator.languages, { useGrouping: false }).format(new Date().getFullYear());

resolveButton.addEventListener('click', () => {
  resolveButton.disabled = true;
  resolveButton.textContent = 'Reviewed';
  ticketStatus.textContent = 'Timecard marked as reviewed.';
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  formMessage.textContent = '';
  const firstInvalid = [...form.elements].find((field) => field instanceof HTMLInputElement && !field.checkValidity());
  if (firstInvalid) {
    formMessage.textContent = 'Complete all fields with a valid work email.';
    firstInvalid.focus();
    return;
  }
  const submitButton = form.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.textContent = 'Request Sent';
  formMessage.textContent = 'Thanks. Your walkthrough request is ready for the Ridgeline team.';
  form.reset();
});
