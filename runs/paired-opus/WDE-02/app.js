const source = "fixtures/jobs.json";
const rows = document.querySelector("#job-rows");
const tableWrap = document.querySelector(".table-wrap");
const state = document.querySelector("#queue-state");
const filter = document.querySelector("#status-filter");
const search = document.querySelector("#search");
const refresh = document.querySelector("#refresh");
let jobs = [];

const dateFormatter = new Intl.DateTimeFormat(navigator.languages, { weekday: "short", month: "short", day: "numeric", timeZone: "UTC" });
const fullDateFormatter = new Intl.DateTimeFormat(navigator.languages, { weekday: "long", month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
const timeFormatter = new Intl.DateTimeFormat(navigator.languages, { hour: "numeric", minute: "2-digit", hour12: true });

function appointmentParts(value) {
  const [date, time] = value.split("T");
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = time.slice(0, 5).split(":").map(Number);
  return {
    date: new Date(Date.UTC(year, month - 1, day)),
    time: timeFormatter.format(new Date(Date.UTC(2000, 0, 1, hour, minute)))
  };
}

function operatingDate(items) {
  const unfinished = items.filter(job => job.status !== "done").sort((a, b) => new Date(a.scheduled_at) - new Date(b.scheduled_at));
  return unfinished.length ? new Date(unfinished[0].scheduled_at) : new Date();
}

function updateSummary() {
  const counts = { total: jobs.length, open: 0, assigned: 0, done: 0 };
  jobs.forEach(job => counts[job.status]++);
  document.querySelectorAll("#metrics dd").forEach((element, index) => {
    element.textContent = [counts.total, counts.open, counts.assigned, counts.done][index];
  });
  const attention = jobs.filter(job => job.status === "open" && !job.technician).length;
  document.querySelector("#alert-summary").textContent = attention ? `${attention} unassigned ${attention === 1 ? "job needs" : "jobs need"} attention` : "Every active job is covered";
  document.querySelector("#today").textContent = fullDateFormatter.format(operatingDate(jobs));
}

function statusLabel(status) { return status === "done" ? "Completed" : status[0].toUpperCase() + status.slice(1); }

function render() {
  const term = search.value.trim().toLocaleLowerCase();
  const status = filter.value;
  const visible = jobs.filter(job => {
    const matchesStatus = status === "all" || (status === "active" ? job.status !== "done" : job.status === status);
    const haystack = [job.id, job.title, job.address, job.technician || "unassigned"].join(" ").toLocaleLowerCase();
    return matchesStatus && haystack.includes(term);
  }).sort((a, b) => new Date(a.scheduled_at) - new Date(b.scheduled_at));

  rows.replaceChildren(...visible.map(job => {
    const row = document.createElement("tr");
    if (job.status === "open" && !job.technician) row.className = "urgent";
    const when = appointmentParts(job.scheduled_at);
    const cells = [
      [job.id, "job-id"],
      [`<span class="job-title"></span><span class="address"></span>`, "service"],
      [`<strong>${dateFormatter.format(when.date)}</strong><span>${when.time}</span>`, "time"],
      [job.technician || "Unassigned", job.technician ? "" : "unassigned"],
      [`<span class="status status-${job.status}">${statusLabel(job.status)}</span>`, ""]
    ];
    cells.forEach(([content, className], index) => {
      const cell = document.createElement("td");
      cell.className = className;
      if (index === 1) {
        cell.innerHTML = content;
        cell.querySelector(".job-title").textContent = job.title;
        cell.querySelector(".address").textContent = job.address;
        cell.querySelector(".job-title").title = job.title;
        cell.querySelector(".address").title = job.address;
      } else if (index === 2 || index === 4) cell.innerHTML = content;
      else cell.textContent = content;
      row.append(cell);
    });
    return row;
  }));

  tableWrap.hidden = visible.length === 0;
  state.hidden = visible.length > 0;
  state.textContent = jobs.length ? "No jobs match this view. Clear the search or choose another status." : "No jobs are scheduled. Refresh to check for updates.";
  const params = new URLSearchParams();
  if (status !== "active") params.set("status", status);
  if (search.value) params.set("q", search.value);
  history.replaceState(null, "", `${location.pathname}${params.size ? `?${params}` : ""}`);
}

async function loadJobs() {
  refresh.classList.add("is-loading");
  refresh.disabled = true;
  state.hidden = false;
  state.textContent = "Loading jobs…";
  tableWrap.hidden = true;
  try {
    const response = await fetch(source, { cache: "no-store" });
    if (!response.ok) throw new Error(`Request returned ${response.status}`);
    jobs = await response.json();
    updateSummary();
    render();
    document.querySelector("#sync-time").textContent = `Updated ${timeFormatter.format(new Date())}`;
  } catch (error) {
    jobs = [];
    state.hidden = false;
    state.textContent = "Jobs could not be loaded. Start a local server, then refresh the board.";
    document.querySelector("#alert-summary").textContent = "Queue unavailable";
    console.error(error);
  } finally {
    refresh.classList.remove("is-loading");
    refresh.disabled = false;
  }
}

const params = new URLSearchParams(location.search);
if (["active", "all", "open", "assigned", "done"].includes(params.get("status"))) filter.value = params.get("status");
search.value = params.get("q") || "";
filter.addEventListener("change", render);
search.addEventListener("input", render);
refresh.addEventListener("click", loadJobs);
loadJobs();
