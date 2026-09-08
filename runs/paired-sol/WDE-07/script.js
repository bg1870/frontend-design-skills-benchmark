const form = document.querySelector('.signup-form');
const email = document.querySelector('#email');
const status = document.querySelector('#form-status');

document.querySelector('#year').textContent = new Date().getFullYear();

form.addEventListener('submit', (event) => {
  event.preventDefault();
  status.className = 'form-status';

  if (!email.validity.valid) {
    email.setAttribute('aria-invalid', 'true');
    status.textContent = 'Enter a valid email address to reserve your place.';
    status.classList.add('error');
    email.focus();
    return;
  }

  email.removeAttribute('aria-invalid');
  const button = form.querySelector('button');
  button.disabled = true;
  button.textContent = 'Place reserved';
  status.textContent = 'You’re on the list. Watch your inbox for the October details.';
  status.classList.add('success');
});

email.addEventListener('input', () => {
  if (email.hasAttribute('aria-invalid')) {
    email.removeAttribute('aria-invalid');
    status.textContent = '';
    status.className = 'form-status';
  }
});
