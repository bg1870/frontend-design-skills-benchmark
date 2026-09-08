const status = document.querySelector('#status');
const openShiftButton = document.querySelector('.coverage button');
const reviewButton = document.querySelector('.run-button');

openShiftButton.addEventListener('click', () => {
  status.textContent = 'Open shift sent to 8 available team members.';
  openShiftButton.textContent = 'Sent to 8 People';
  openShiftButton.disabled = true;
});

reviewButton.addEventListener('click', () => {
  status.textContent = 'Demo preview: 2 payroll flags are ready to review.';
  reviewButton.textContent = '2 Flags Ready';
});
