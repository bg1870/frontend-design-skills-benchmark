const toast = document.querySelector('.toast');
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
}

document.querySelectorAll('.copy').forEach((button) => {
  button.addEventListener('click', async () => {
    const target = button.dataset.copyTarget;
    const value = target ? document.getElementById(target).innerText : button.dataset.copy;
    try {
      await navigator.clipboard.writeText(value);
      const original = button.textContent;
      button.textContent = 'Copied';
      showToast('Copied to clipboard');
      setTimeout(() => button.textContent = original, 1800);
    } catch {
      showToast('Select the code and copy it manually');
    }
  });
});

const input = document.getElementById('inputTokens');
const output = document.getElementById('outputTokens');
const inputValue = document.getElementById('inputValue');
const outputValue = document.getElementById('outputValue');
const estimatedCost = document.getElementById('estimatedCost');
const formula = document.getElementById('formula');
const format = new Intl.NumberFormat('en-US');

function updateEstimate() {
  const inputTokens = Number(input.value);
  const outputTokens = Number(output.value);
  const cost = (inputTokens * 2 + outputTokens * 10) / 1_000_000;
  inputValue.value = format.format(inputTokens);
  outputValue.value = format.format(outputTokens);
  estimatedCost.textContent = `$${cost.toFixed(4)}`;
  formula.textContent = `${format.format(inputTokens)} × $2/M + ${format.format(outputTokens)} × $10/M`;
}

input.addEventListener('input', updateEstimate);
output.addEventListener('input', updateEstimate);
updateEstimate();
