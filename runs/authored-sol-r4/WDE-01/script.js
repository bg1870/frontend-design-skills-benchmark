const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('#site-nav');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  menuButton.querySelector('.sr-only').textContent = open ? 'Open menu' : 'Close menu';
  nav.classList.toggle('open', !open);
});
nav.addEventListener('click', (event) => {
  if (event.target.matches('a')) {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.querySelector('.sr-only').textContent = 'Open menu';
  }
});

const publishButton = document.querySelector('#sample-publish');
publishButton.addEventListener('click', () => {
  const published = publishButton.dataset.published === 'true';
  publishButton.dataset.published = String(!published);
  publishButton.textContent = published ? 'Publish sample week' : 'Sample week published';
  document.querySelector('.stage-bottom strong').innerHTML = published
    ? '<span class="status-dot"></span> Ready to publish'
    : '<span class="status-dot"></span> Published';
});

const form = document.querySelector('#demo-form');
const status = form.querySelector('.form-status');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  let valid = true;
  form.querySelectorAll('input').forEach((input) => {
    const invalid = !input.validity.valid;
    input.setAttribute('aria-invalid', String(invalid));
    valid = valid && !invalid;
  });
  if (!valid) {
    status.className = 'form-status error';
    status.textContent = 'Please complete each field with a valid email address.';
    form.querySelector('[aria-invalid="true"]').focus();
    return;
  }
  status.className = 'form-status';
  status.textContent = 'Thanks — your request is ready to send. Connect this form to your booking system to receive submissions.';
  form.reset();
});
form.addEventListener('input', (event) => {
  if (event.target.matches('input')) event.target.removeAttribute('aria-invalid');
});
