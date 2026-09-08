const OPERATING_DATE = "2026-09-08";
const state = { jobs: [], filter: "all", query: "", selectedId: null };

const rows = document.querySelector("#job-rows");
const message = document.querySelector("#state-message");
const dialog = document.querySelector("#assign-dialog");
const technicianSelect = document.querySelector("#technician");
const toast = document.querySelector("#toast");

function parts(job) {
  const [date, clock] = job.scheduled_at.split("T");
  const d = new Date(`${date}T12:00:00Z`);
  const day = new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric", timeZone: "UTC" }).format(d);
  const [hourString, minute] = clock.split(":");
  const hour = Number(hourString);
  return { date, day, time: `${hour % 12 || 12}:${minute} ${hour >= 12 ? "PM" : "AM"}` };
}

function actionFor(job) {
  if (job.status === "open") return `<button class="row-action" data-action="assign" data-id="${job.id}">Assign</button>`;
  if (job.status === "assigned") return `<button class="row-action" data-action="complete" data-id="${job.id}">Mark done</button>`;
  return `<button class="row-action" data-action="details" data-id="${job.id}">View</button>`;
}

function render() {
  const query = state.query.toLowerCase();
  const visible = state.jobs.filter(job => {
    const matchesStatus = state.filter === "all" || job.status === state.filter;
    const haystack = [job.id, job.title, job.address, job.technician || "unassigned"].join(" ").toLowerCase();
    return matchesStatus && haystack.includes(query);
  });

  rows.innerHTML = visible.map(job => {
    const schedule = parts(job);
    return `<tr data-status="${job.status}">
      <td><div class="job-title">${job.title}</div><div class="job-meta"><span class="job-id">${job.id}</span><span>${job.address}</span></div></td>
      <td class="schedule"><time datetime="${job.scheduled_at}">${schedule.time}</time><span>${schedule.day}</span></td>
      <td class="tech ${job.technician ? "" : "unassigned"}">${job.technician || "Unassigned"}</td>
      <td><span class="status status-${job.status}">${job.status}</span></td>
      <td>${actionFor(job)}</td>
    </tr>`;
  }).join("");

  message.hidden = visible.length !== 0;
  if (!visible.length) message.innerHTML = `<strong>No matching jobs</strong><br>Clear the search or choose another status.`;
  document.querySelector("#result-count").textContent = `${visible.length} of ${state.jobs.length} jobs shown`;
  updateSummary();
}

function updateSummary() {
  const count = status => state.jobs.filter(j => j.status === status).length;
  document.querySelector("#open-count").textContent = state.jobs.filter(j => j.status === "open" && !j.technician).length;
  document.querySelector("#today-count").textContent = state.jobs.filter(j => parts(j).date === OPERATING_DATE).length;
  document.querySelector("#assigned-count").textContent = count("assigned");
  document.querySelector("#done-count").textContent = count("done");
  document.querySelector("#all-badge").textContent = state.jobs.length;
}

function showToast(text) {
  toast.textContent = text;
  toast.hidden = false;
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => { toast.hidden = true; }, 2800);
}

function openAssignment(id) {
  state.selectedId = id;
  technicianSelect.value = "";
  document.querySelector("#dialog-job").textContent = id;
  dialog.showModal();
  technicianSelect.focus();
}

document.querySelectorAll(".filter").forEach(button => button.addEventListener("click", () => {
  document.querySelectorAll(".filter").forEach(item => {
    const active = item === button;
    item.classList.toggle("active", active);
    item.setAttribute("aria-pressed", active);
  });
  state.filter = button.dataset.status;
  render();
}));

document.querySelector("#search").addEventListener("input", event => { state.query = event.target.value.trim(); render(); });

document.querySelector("#new-job").textContent = "Dispatch next";
document.querySelector("#new-job").addEventListener("click", () => {
  const next = state.jobs.filter(j => j.status === "open").sort((a,b) => a.scheduled_at.localeCompare(b.scheduled_at))[0];
  if (next) openAssignment(next.id); else showToast("No open jobs need dispatch.");
});

rows.addEventListener("click", event => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const job = state.jobs.find(j => j.id === button.dataset.id);
  if (button.dataset.action === "assign") openAssignment(job.id);
  if (button.dataset.action === "complete") {
    job.status = "done";
    render();
    showToast(`${job.id} marked complete.`);
  }
  if (button.dataset.action === "details") showToast(`${job.id}: ${job.title} at ${job.address}`);
});

document.querySelector("#confirm-assign").addEventListener("click", event => {
  if (!technicianSelect.value) {
    event.preventDefault();
    technicianSelect.setCustomValidity("Choose a technician to continue.");
    technicianSelect.reportValidity();
    return;
  }
  technicianSelect.setCustomValidity("");
  const job = state.jobs.find(j => j.id === state.selectedId);
  job.technician = technicianSelect.value;
  job.status = "assigned";
  render();
  showToast(`${job.id} assigned to ${job.technician}.`);
});

fetch("fixtures/jobs.json")
  .then(response => { if (!response.ok) throw new Error("Unable to load jobs"); return response.json(); })
  .then(jobs => { state.jobs = jobs.sort((a,b) => a.scheduled_at.localeCompare(b.scheduled_at)); render(); })
  .catch(() => {
    document.querySelector("#result-count").textContent = "Queue unavailable";
    message.hidden = false;
    message.innerHTML = `<strong>Jobs could not be loaded.</strong><br>Run this dashboard from a local web server and try again.`;
  });
