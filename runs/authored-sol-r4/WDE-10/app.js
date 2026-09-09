const form = document.querySelector('#signup-form');
const password = document.querySelector('#password');
const toggle = document.querySelector('#toggle-password');

const messages = {
  'first-name': 'Enter your first name.',
  'last-name': 'Enter your last name.',
  'clinic-name': 'Enter your clinic name.',
  email: 'Enter a valid work email.',
  password: 'Use at least 8 characters.',
  terms: 'Please agree before continuing.'
};

function validate(input) {
  const error = document.querySelector(`#${input.id}-error`);
  const invalid = !input.validity.valid;
  input.setAttribute('aria-invalid', String(invalid));
  input.setAttribute('aria-describedby', `${input.id}-error`);
  error.textContent = invalid ? messages[input.id] : '';
  return !invalid;
}

form.querySelectorAll('input').forEach(input => {
  input.addEventListener('blur', () => validate(input));
  input.addEventListener('input', () => {
    if (input.getAttribute('aria-invalid') === 'true') validate(input);
  });
});

toggle.addEventListener('click', () => {
  const showing = password.type === 'text';
  password.type = showing ? 'password' : 'text';
  toggle.textContent = showing ? 'Show' : 'Hide';
  toggle.setAttribute('aria-label', showing ? 'Show password' : 'Hide password');
  toggle.setAttribute('aria-pressed', String(!showing));
});

form.addEventListener('submit', event => {
  event.preventDefault();
  const fields = [...form.querySelectorAll('input')];
  const valid = fields.map(validate).every(Boolean);
  const status = document.querySelector('#form-status');
  if (!valid) {
    status.textContent = '';
    fields.find(input => !input.validity.valid)?.focus();
    return;
  }
  const button = form.querySelector('.submit');
  button.disabled = true;
  button.firstChild.textContent = 'Workspace ready ';
  status.textContent = 'Your details look good. Connect this form to your account service to complete signup.';
});
