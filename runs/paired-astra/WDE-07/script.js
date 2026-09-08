const routeOptions = {
  20: { meta: "1.5 km · about 20 min", path: "short" },
  30: { meta: "2.4 km · about 32 min", path: "short" },
  45: { meta: "3.6 km · about 47 min", path: "long" }
};

document.querySelectorAll(".duration-picker button").forEach((button) => {
  button.setAttribute("aria-pressed", button.classList.contains("selected") ? "true" : "false");
  button.addEventListener("click", () => {
    const duration = button.dataset.duration;
    document.querySelectorAll(".duration-picker button").forEach((item) => {
      item.classList.remove("selected");
      item.setAttribute("aria-pressed", "false");
    });
    button.classList.add("selected");
    button.setAttribute("aria-pressed", "true");
    document.getElementById("route-meta").textContent = routeOptions[duration].meta;
    document.querySelectorAll(".route").forEach((route) => route.classList.remove("active"));
    document.querySelector(`.route-${routeOptions[duration].path}`).classList.add("active");
  });
});

document.querySelectorAll(".signup-form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = form.querySelector("input[type='email']");
    const status = form.querySelector(".form-status");
    form.classList.remove("has-error");
    if (!input.validity.valid) {
      form.classList.add("has-error");
      status.textContent = "Enter a valid email address.";
      input.focus();
      return;
    }
    try {
      localStorage.setItem("afield-early-access-email", input.value);
    } catch (_) {
      // Confirmation still works when storage is unavailable.
    }
    status.textContent = "You’re on the list. We’ll write when Afield is ready.";
    input.value = "";
  });
});
