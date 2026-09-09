const form = document.querySelector('#scope-form');
const email = document.querySelector('#work-email');
const company = document.querySelector('#company');
const plan = document.querySelector('#plan');
const status = document.querySelector('.form-status');

document.querySelectorAll('[data-plan]').forEach((link) => {
  link.addEventListener('click', () => { plan.value = link.dataset.plan; });
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  let valid = true;
  const emailError = document.querySelector('#email-error');
  const companyError = document.querySelector('#company-error');
  emailError.textContent = '';
  companyError.textContent = '';
  status.textContent = '';

  if (!email.validity.valid) {
    emailError.textContent = 'Enter a valid work email.';
    valid = false;
  }
  if (!company.value.trim()) {
    companyError.textContent = 'Enter your company name.';
    valid = false;
  }
  if (!valid) {
    form.querySelector(':invalid')?.focus();
    return;
  }
  status.textContent = 'Thanks — the form is ready to connect to your sales workflow.';
  form.reset();
});
