(() => {
  "use strict";

  // Mirrors fixtures/jobs.json for direct file opening, where fetch is blocked by browser security.
  const FILE_FALLBACK = [
    { id: "J-1041", title: "Water heater replacement", technician: "R. Okafor", address: "1188 Cedar Ln, Apt 3", scheduled_at: "2026-09-05T09:00:00-05:00", status: "done" },
    { id: "J-1042", title: "Kitchen sink backup", technician: "M. Duarte", address: "44 Halstead Ave", scheduled_at: "2026-09-07T13:30:00-05:00", status: "done" },
    { id: "J-1043", title: "Sump pump inspection", technician: "R. Okafor", address: "9 Wexford Ct", scheduled_at: "2026-09-08T08:15:00-05:00", status: "assigned" },
    { id: "J-1044", title: "Burst supply line, basement", technician: null, address: "2210 Marbury Rd", scheduled_at: "2026-09-08T11:00:00-05:00", status: "open" },
    { id: "J-1045", title: "Toilet reseat, unit 2B", technician: "T. Blanchard", address: "77 Iverson St", scheduled_at: "2026-09-09T15:45:00-05:00", status: "assigned" },
    { id: "J-1046", title: "Annual backflow test", technician: null, address: "501 Quarry Industrial Pk", scheduled_at: "2026-09-11T10:00:00-05:00", status: "open" }
  ];

  const state = { jobs: [], status: "all", query: "", sort: "soonest", compact: false, activeJobId: null };
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const icons = {
    map: "assets/icons/map-pin.svg",
    user: "assets/icons/user-circle.svg",
    arrow: "assets/icons/arrow-right.svg"
  };

  const dateParts = (iso) => {
    const date = new Date(iso);
    return {
      month: new Intl.DateTimeFormat(undefined, { month: "short" }).format(date),
      day: new Intl.DateTimeFormat(undefined, { day: "numeric" }).format(date),
      time: new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(date)
    };
  };

  const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  })[char]);

  const statusLabel = (status) => status === "done" ? "Complete" : status;

  function updateSummary() {
    const counts = state.jobs.reduce((acc, job) => {
      acc[job.status] = (acc[job.status] || 0) + 1;
      return acc;
    }, {});
    const map = { open: counts.open || 0, assigned: counts.assigned || 0, done: counts.done || 0 };
    $("#scheduledCount").textContent = state.jobs.length;
    $("#openCount").textContent = map.open;
    $("#assignedCount").textContent = map.assigned;
    $("#doneCount").textContent = map.done;
    $("#openCallout").textContent = map.open;
    $("#allChip").textContent = state.jobs.length;
    $("#openChip").textContent = map.open;
    $("#assignedChip").textContent = map.assigned;
    $("#doneChip").textContent = map.done;
    $(".summary-note").lastChild.textContent = map.open === 1 ? " job still needs a technician" : " jobs still need a technician";

    if (state.jobs.length) {
      const dates = state.jobs.map((job) => new Date(job.scheduled_at)).sort((a, b) => a - b);
      const start = new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" }).format(dates[0]);
      const end = new Intl.DateTimeFormat(undefined, { month: dates[0].getMonth() === dates.at(-1).getMonth() ? undefined : "short", day: "numeric" }).format(dates.at(-1));
      $("#scheduleRange").textContent = `${start} to ${end}`;
      $("#dateKicker").textContent = `Week of ${start}`;
    }
  }

  function visibleJobs() {
    const query = state.query.trim().toLocaleLowerCase();
    return state.jobs
      .filter((job) => state.status === "all" || job.status === state.status)
      .filter((job) => !query || [job.id, job.title, job.address, job.technician || "unassigned"].some((value) => value.toLocaleLowerCase().includes(query)))
      .sort((a, b) => {
        if (state.sort === "latest") return new Date(b.scheduled_at) - new Date(a.scheduled_at);
        if (state.sort === "status") return a.status.localeCompare(b.status) || new Date(a.scheduled_at) - new Date(b.scheduled_at);
        return new Date(a.scheduled_at) - new Date(b.scheduled_at);
      });
  }

  function jobTemplate(job) {
    const date = dateParts(job.scheduled_at);
    const isOpen = job.status === "open";
    return `
      <article class="job-row" data-job-id="${escapeHtml(job.id)}">
        <div class="job-date">
          <div class="date-block"><span>${escapeHtml(date.month)}</span><strong>${escapeHtml(date.day)}</strong></div>
          <span class="time-block">${escapeHtml(date.time)}</span>
        </div>
        <div class="job-main">
          <div class="job-id">${escapeHtml(job.id)}</div>
          <div class="job-title" title="${escapeHtml(job.title)}">${escapeHtml(job.title)}</div>
        </div>
        <div class="job-meta address-cell">
          <img src="${icons.map}" width="18" height="18" alt="">
          <span title="${escapeHtml(job.address)}">${escapeHtml(job.address)}</span>
        </div>
        <div class="job-meta tech-cell">
          <img src="${icons.user}" width="18" height="18" alt="">
          <span>${escapeHtml(job.technician || "No technician")}</span>
        </div>
        <div>
          <span class="status-badge status-${escapeHtml(job.status)}">${escapeHtml(statusLabel(job.status))}</span>
        </div>
        <button class="row-action ${isOpen ? "primary" : ""}" type="button" data-action="${isOpen ? "assign" : "details"}" aria-label="${isOpen ? "Assign technician to" : "View details for"} ${escapeHtml(job.id)}">
          ${isOpen ? "Assign technician" : "View details"}
        </button>
      </article>`;
  }

  function render() {
    const jobs = visibleJobs();
    const list = $("#jobList");
    list.innerHTML = jobs.map(jobTemplate).join("");
    list.classList.toggle("compact", state.compact);
    $("#resultCount").textContent = `${jobs.length} ${jobs.length === 1 ? "job" : "jobs"}`;
    $("#emptyState").hidden = jobs.length !== 0;
    list.hidden = jobs.length === 0;
    updateUrl();
  }

  function updateUrl() {
    const params = new URLSearchParams();
    if (state.status !== "all") params.set("status", state.status);
    if (state.query) params.set("q", state.query);
    if (state.sort !== "soonest") params.set("sort", state.sort);
    if (state.compact) params.set("view", "compact");
    const next = `${location.pathname}${params.size ? `?${params}` : ""}${location.hash}`;
    if (location.protocol !== "file:") history.replaceState(null, "", next);
  }

  function hydrateFromUrl() {
    const params = new URLSearchParams(location.search);
    if (["all", "open", "assigned", "done"].includes(params.get("status"))) state.status = params.get("status");
    if (["soonest", "latest", "status"].includes(params.get("sort"))) state.sort = params.get("sort");
    state.query = params.get("q") || "";
    state.compact = params.get("view") === "compact";
    $("#searchInput").value = state.query;
    $("#sortSelect").value = state.sort;
    $$(".filter-chip").forEach((button) => {
      const active = button.dataset.status === state.status;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    $$(".view-button").forEach((button) => {
      const active = (button.dataset.view === "compact") === state.compact;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  function showToast(message) {
    const toast = $("#toast");
    $("#toastMessage").textContent = message;
    toast.hidden = false;
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => { toast.hidden = true; }, 3200);
  }

  function openAssignment(jobId) {
    const job = state.jobs.find((item) => item.id === jobId);
    if (!job) return;
    state.activeJobId = jobId;
    $("#dialogJob").textContent = `${job.id} · ${job.title}`;
    const technicians = [...new Set(state.jobs.map((item) => item.technician).filter(Boolean))].sort();
    $("#technicianOptions").innerHTML = technicians.map((name, index) => `
      <label class="tech-option">
        <input type="radio" name="technician" value="${escapeHtml(name)}" ${index === 0 ? "" : ""}>
        <span>${escapeHtml(name)}</span>
        <small>${state.jobs.filter((item) => item.technician === name && item.status === "assigned").length} active</small>
      </label>`).join("");
    $("#assignError").hidden = true;
    $("#assignDialog").showModal();
  }

  function assignTechnician(name) {
    const job = state.jobs.find((item) => item.id === state.activeJobId);
    if (!job) return;
    job.technician = name;
    job.status = "assigned";
    updateSummary();
    render();
    showToast(`${job.id} assigned to ${name}`);
  }

  function bindEvents() {
    $("#searchInput").addEventListener("input", (event) => { state.query = event.target.value; render(); });
    $("#sortSelect").addEventListener("change", (event) => { state.sort = event.target.value; render(); });
    $$(".filter-chip").forEach((button) => button.addEventListener("click", () => {
      state.status = button.dataset.status;
      $$(".filter-chip").forEach((item) => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      render();
    }));
    $$(".view-button").forEach((button) => button.addEventListener("click", () => {
      state.compact = button.dataset.view === "compact";
      $$(".view-button").forEach((item) => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      render();
    }));
    $("#jobList").addEventListener("click", (event) => {
      const button = event.target.closest("[data-action]");
      if (!button) return;
      const row = button.closest("[data-job-id]");
      if (button.dataset.action === "assign") openAssignment(row.dataset.jobId);
      else showToast(`${row.dataset.jobId} is ready for review`);
    });
    $("#clearFilters").addEventListener("click", () => {
      state.status = "all"; state.query = ""; $("#searchInput").value = "";
      $$(".filter-chip").forEach((item) => {
        const active = item.dataset.status === "all";
        item.classList.toggle("active", active); item.setAttribute("aria-pressed", String(active));
      });
      render();
    });
    $("#assignForm").addEventListener("submit", (event) => {
      if (event.submitter?.value === "cancel") return;
      event.preventDefault();
      const choice = new FormData(event.currentTarget).get("technician");
      if (!choice) { $("#assignError").hidden = false; $("#assignError").focus(); return; }
      assignTechnician(choice);
      $("#assignDialog").close();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "/" && !/INPUT|SELECT|TEXTAREA/.test(document.activeElement.tagName)) {
        event.preventDefault(); $("#searchInput").focus();
      }
    });
    $("#retryButton").addEventListener("click", loadJobs);
  }

  async function loadJobs() {
    $("#loadingState").hidden = false;
    $("#jobList").hidden = true;
    $("#errorState").hidden = true;
    try {
      if (location.protocol === "file:") throw new Error("Local file mode");
      const response = await fetch("fixtures/jobs.json", { cache: "no-store" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      state.jobs = await response.json();
      $("#syncState").lastChild.textContent = " Source connected";
    } catch (error) {
      if (location.protocol === "file:") {
        state.jobs = structuredClone(FILE_FALLBACK);
        $("#syncState").lastChild.textContent = " Local preview";
      } else {
        $("#loadingState").hidden = true;
        $("#errorState").hidden = false;
        return;
      }
    }
    $("#loadingState").hidden = true;
    updateSummary();
    render();
  }

  hydrateFromUrl();
  bindEvents();
  loadJobs();
})();
