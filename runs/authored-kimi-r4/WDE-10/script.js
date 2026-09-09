const form = document.querySelector('#signup-form');
const showPassword = document.querySelector('.show-password');
const password = document.querySelector('#password');

showPassword.addEventListener('click', () => {
  const showing = password.type === 'text';
  password.type = showing ? 'password' : 'text';
  showPassword.setAttribute('aria-pressed', String(!showing));
  showPassword.setAttribute('aria-label', showing ? 'Show password' : 'Hide password');
});

const messages = {
  'first-name': 'Enter your first name.', 'last-name': 'Enter your last name.',
  clinic: 'Enter your clinic name.', email: 'Enter a valid work email.',
  password: 'Use at least 8 characters.'
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  let valid = true;
  form.querySelectorAll('.field input').forEach(input => {
    const field = input.closest('.field');
    const error = field.querySelector('.error');
    const isValid = input.checkValidity();
    field.classList.toggle('invalid', !isValid);
    error.textContent = isValid ? '' : messages[input.id];
    valid = valid && isValid;
  });
  const terms = document.querySelector('#terms');
  document.querySelector('.terms-error').textContent = terms.checked ? '' : 'Please accept the terms to continue.';
  valid = valid && terms.checked;
  if (valid) {
    form.hidden = true;
    document.querySelector('.form-header').hidden = true;
    document.querySelector('.success').hidden = false;
  } else {
    form.querySelector(':invalid')?.focus();
  }
});

form.addEventListener('input', (event) => {
  if (event.target.matches('.field input') && event.target.checkValidity()) {
    event.target.closest('.field').classList.remove('invalid');
    event.target.closest('.field').querySelector('.error').textContent = '';
  }
  if (event.target.id === 'terms' && event.target.checked) document.querySelector('.terms-error').textContent = '';
});
