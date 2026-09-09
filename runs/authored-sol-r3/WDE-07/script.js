const form = document.querySelector('#waitlist');
const email = document.querySelector('#email');
const status = document.querySelector('#form-status');

document.querySelector('#year').textContent = new Date().getFullYear();

form.addEventListener('submit', (event) => {
  event.preventDefault();
  status.textContent = '';
  if (!email.validity.valid) {
    email.setAttribute('aria-invalid', 'true');
    status.textContent = 'Please enter a valid email address.';
    email.focus();
    return;
  }
  email.removeAttribute('aria-invalid');
  form.querySelector('button').disabled = true;
  form.querySelector('button').textContent = 'You’re on the list';
  status.textContent = 'Thank you. We’ll send one note when Sundial is ready.';
  email.disabled = true;
});
