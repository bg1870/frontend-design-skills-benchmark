const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const form = document.querySelector('.signup-form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = form.querySelector('input');
  const button = form.querySelector('button');
  if (!input.checkValidity()) {
    input.reportValidity();
    return;
  }
  button.innerHTML = 'You’re on the list <span>✓</span>';
  button.disabled = true;
  input.disabled = true;
  document.querySelector('.form-note').textContent = 'Thank you. We’ll be in touch before launch.';
});
