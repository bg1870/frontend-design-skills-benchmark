const form = document.querySelector('#signup-form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  form.style.display = 'none';
  document.querySelector('.form-note').style.display = 'none';
  document.querySelector('.success').style.display = 'block';
});

document.querySelector('.menu').addEventListener('click', () => {
  document.querySelector('#how').scrollIntoView({ behavior: 'smooth' });
});
