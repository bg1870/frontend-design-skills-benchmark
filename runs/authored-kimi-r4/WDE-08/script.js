const toast = document.querySelector('.toast');
let toastTimer;

document.querySelectorAll('.copy').forEach((button) => {
  button.addEventListener('click', async () => {
    const target = button.dataset.copyTarget;
    const text = target ? document.getElementById(target).innerText : button.dataset.copy;
    await navigator.clipboard.writeText(text);
    const old = button.innerHTML;
    button.innerHTML = '<span>✓</span> Copied';
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 1600);
    setTimeout(() => button.innerHTML = old, 1600);
  });
});

const links = [...document.querySelectorAll('.toc > a')];
const sections = links.map(link => document.querySelector(link.getAttribute('href')));
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(link => link.classList.toggle('current', link.getAttribute('href') === `#${entry.target.id}`));
    }
  });
}, { rootMargin: '-20% 0px -65% 0px' });
sections.forEach(section => section && observer.observe(section));
