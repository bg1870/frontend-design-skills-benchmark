const form = document.querySelector('#signup-form');
const email = document.querySelector('#email');
const message = document.querySelector('#form-message');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  message.className = 'form-message';
  if (!email.validity.valid) {
    message.textContent = 'Enter a valid email address to save your place.';
    message.classList.add('error');
    email.setAttribute('aria-invalid', 'true');
    email.focus();
    return;
  }
  email.removeAttribute('aria-invalid');
  message.textContent = 'Your place is saved. Watch your inbox in October.';
  message.classList.add('success');
  form.reset();
});
