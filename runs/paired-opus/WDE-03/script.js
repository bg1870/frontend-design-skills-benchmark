const prices = {
  monthly: { team: 23, label: "Billed monthly. Viewers stay free.", card: "Billed monthly; cancel at any time." },
  annual: { team: 18, label: "Billed annually. Viewers stay free.", card: "Billed annually; $216 per builder." }
};

const currency = new Intl.NumberFormat(navigator.languages, {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

function setPeriod(period, updateUrl = true) {
  const data = prices[period] || prices.annual;
  document.querySelectorAll("[data-period]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.period === period));
  });
  document.querySelector("[data-price='team']").textContent = currency.format(data.team).replace("$", "");
  document.querySelector("[data-price='team-card']").textContent = currency.format(data.team).replace("$", "");
  document.querySelector("[data-note]").textContent = data.label;
  document.querySelector("[data-billing]").textContent = data.card;
  if (updateUrl) {
    const url = new URL(window.location.href);
    url.searchParams.set("billing", period);
    history.replaceState({}, "", url);
  }
}

document.querySelectorAll("[data-period]").forEach((button) => {
  button.addEventListener("click", () => setPeriod(button.dataset.period));
});

const initialPeriod = new URLSearchParams(window.location.search).get("billing") === "monthly" ? "monthly" : "annual";
setPeriod(initialPeriod, false);
document.querySelector("#year").textContent = new Intl.DateTimeFormat(navigator.languages, { year: "numeric" }).format(new Date());
