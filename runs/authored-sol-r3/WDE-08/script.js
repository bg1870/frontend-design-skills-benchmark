const toast = document.querySelector('.toast');
let toastTimer;

document.querySelectorAll('.copy').forEach((button) => {
  button.addEventListener('click', async () => {
    const target = button.dataset.target && document.getElementById(button.dataset.target);
    const text = button.dataset.copy || target?.innerText || '';
    try {
      await navigator.clipboard.writeText(text);
      button.querySelector('span').textContent = 'Copied';
      toast.classList.add('show');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        toast.classList.remove('show');
        button.querySelector('span').textContent = 'Copy';
      }, 1800);
    } catch {
      button.querySelector('span').textContent = 'Select & copy';
    }
  });
});
