const root = document.documentElement;
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav-links');
const themeButton = document.querySelector('.theme-toggle');
const themeIcon = themeButton.querySelector('i');

menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  menuButton.querySelector('i').className = open ? 'ph ph-x' : 'ph ph-list';
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const storedTheme = localStorage.getItem('clear-signal-theme');
if (storedTheme) root.dataset.theme = storedTheme;
function syncThemeIcon() {
  const dark = root.dataset.theme === 'dark' || (!root.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches);
  themeIcon.className = dark ? 'ph ph-sun' : 'ph ph-moon';
  themeButton.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
}
syncThemeIcon();
themeButton.addEventListener('click', () => {
  const currentDark = root.dataset.theme === 'dark' || (!root.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches);
  root.dataset.theme = currentDark ? 'light' : 'dark';
  localStorage.setItem('clear-signal-theme', root.dataset.theme);
  syncThemeIcon();
});

const billingButtons = document.querySelectorAll('.billing-option');
billingButtons.forEach(button => button.addEventListener('click', () => {
  billingButtons.forEach(item => { item.classList.remove('active'); item.setAttribute('aria-pressed', 'false'); });
  button.classList.add('active');
  button.setAttribute('aria-pressed', 'true');
  document.querySelectorAll('.price strong').forEach(price => {
    price.animate([{ opacity: .25, transform: 'translateY(4px)' }, { opacity: 1, transform: 'none' }], { duration: 250 });
    price.textContent = price.dataset[button.dataset.cycle];
  });
}));

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reducedMotion) document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
else {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

const dialog = document.querySelector('#lead-dialog');
const dialogTitle = document.querySelector('#dialog-title');
const dialogDescription = document.querySelector('#dialog-description');
const form = document.querySelector('#lead-form');
const success = document.querySelector('.form-success');
document.querySelectorAll('[data-action]').forEach(button => button.addEventListener('click', () => {
  const sales = button.dataset.action === 'sales';
  dialogTitle.textContent = sales ? 'Talk to our team' : 'Create your workspace';
  dialogDescription.textContent = sales ? 'Tell us where to reach you. We will reply within one business day.' : 'Start with 100k monthly events at no cost.';
  form.hidden = false; success.hidden = true; form.reset();
  dialog.showModal();
}));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
form.addEventListener('submit', event => {
  event.preventDefault();
  const email = form.email;
  const error = form.querySelector('.form-error');
  if (!email.validity.valid) { error.textContent = 'Enter a valid work email address.'; email.focus(); return; }
  error.textContent = '';
  const submit = form.querySelector('[type="submit"]');
  submit.disabled = true; submit.querySelector('span').textContent = 'Sending...';
  setTimeout(() => { form.hidden = true; success.hidden = false; submit.disabled = false; submit.querySelector('span').textContent = 'Continue'; }, 700);
});
