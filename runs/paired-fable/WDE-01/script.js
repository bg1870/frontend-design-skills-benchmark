const form = document.querySelector('#demo-form');
const email = document.querySelector('#email');
const error = document.querySelector('#email-error');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!email.validity.valid) {
    email.setAttribute('aria-invalid', 'true');
    error.textContent = email.validity.valueMissing
      ? 'Enter the email you use for the restaurant.'
      : 'Enter a complete email address, like you@restaurant.com.';
    email.focus();
    return;
  }
  email.removeAttribute('aria-invalid');
  error.textContent = '';
  form.classList.add('form-sent');
  form.querySelector('.success').focus();
});

email.addEventListener('input', () => {
  if (email.validity.valid) {
    email.removeAttribute('aria-invalid');
    error.textContent = '';
  }
});

document.querySelector('#year').textContent = new Date().getFullYear();
