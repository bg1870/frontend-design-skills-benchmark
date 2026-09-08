const copyStatus = document.createElement('span');
copyStatus.className = 'sr-only';
copyStatus.setAttribute('aria-live', 'polite');
document.body.append(copyStatus);

document.querySelectorAll('.copy').forEach((button) => {
  const originalLabel = button.getAttribute('aria-label');
  button.addEventListener('click', async () => {
    const target = button.dataset.copyTarget;
    const value = target
      ? document.getElementById(target).innerText
      : button.dataset.copy;

    try {
      await navigator.clipboard.writeText(value);
      const previous = button.textContent;
      button.textContent = 'Copied';
      copyStatus.textContent = 'Copied to clipboard';
      window.setTimeout(() => {
        button.textContent = previous;
        button.setAttribute('aria-label', originalLabel);
      }, 1600);
    } catch {
      button.textContent = 'Select + copy';
    }
  });
});
