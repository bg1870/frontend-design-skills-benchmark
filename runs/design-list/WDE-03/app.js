const billingButtons = document.querySelectorAll('[data-billing]');
const prices = document.querySelectorAll('[data-monthly]');
const notes = document.querySelectorAll('[data-note]');

billingButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const period = button.dataset.billing;
    billingButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    prices.forEach((price) => {
      price.textContent = price.dataset[period];
    });
    notes.forEach((note) => {
      note.textContent = period === 'annual' ? 'Paid annually' : 'Paid monthly';
    });
  });
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px' });

document.querySelectorAll('.reveal').forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 3, 2) * 80}ms`;
  revealObserver.observe(element);
});

const statement = document.querySelector('[data-word-reveal]');
if (statement) {
  const words = statement.textContent.trim().split(/\s+/);
  statement.innerHTML = words.map((word) => `<span class="word">${word}</span>`).join(' ');
  const wordObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      statement.querySelectorAll('.word').forEach((word, index) => {
        window.setTimeout(() => word.classList.add('is-visible'), index * 55);
      });
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.45 });
  wordObserver.observe(statement);
}
