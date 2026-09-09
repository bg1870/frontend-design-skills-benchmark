const form = document.querySelector('#signup-form');
const password = document.querySelector('#password');
const toggle = document.querySelector('#toggle-password');

toggle.addEventListener('click', () => {
  const showing = password.type === 'text';
  password.type = showing ? 'password' : 'text';
  toggle.textContent = showing ? 'Show' : 'Hide';
  toggle.setAttribute('aria-label', showing ? 'Show password' : 'Hide password');
  toggle.setAttribute('aria-pressed', String(!showing));
});

const messages = {
  name: 'Enter your name.',
  clinic: 'Enter your clinic name.',
  email: 'Enter a valid work email.',
  password: 'Use at least 8 characters.'
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  let valid = true;
  ['name', 'clinic', 'email', 'password'].forEach((id) => {
    const input = document.getElementById(id);
    const field = input.closest('.field');
    const failed = !input.validity.valid;
    field.classList.toggle('invalid', failed);
    document.getElementById(`${id}-error`).textContent = failed ? messages[id] : '';
    input.setAttribute('aria-invalid', String(failed));
    input.setAttribute('aria-describedby', `${id}-error`);
    if (failed) valid = false;
  });
  const terms = document.getElementById('terms');
  const termsError = document.getElementById('terms-error');
  termsError.textContent = terms.checked ? '' : 'Please agree before creating your workspace.';
  termsError.classList.toggle('visible', !terms.checked);
  terms.setAttribute('aria-invalid', String(!terms.checked));
  terms.setAttribute('aria-describedby', 'terms-error');
  if (!terms.checked) valid = false;
  if (!valid) {
    form.querySelector('[aria-invalid="true"]').focus();
    return;
  }
  const success = document.getElementById('success');
  success.classList.add('visible');
  success.focus();
});

form.addEventListener('input', (event) => {
  const field = event.target.closest('.field');
  if (field && event.target.validity.valid) field.classList.remove('invalid');
});
