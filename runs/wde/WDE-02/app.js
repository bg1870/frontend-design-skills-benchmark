(() => {
  'use strict';
  const FIXED_NOW = new Date('2026-09-08T01:50:09+03:00');
  const TECHNICIANS = ['R. Okafor', 'M. Duarte', 'T. Blanchard'];
  const state = { jobs: [], selectedDay: 'all', status: 'all', query: '', selectedId: null };
  const $ = (selector) => document.querySelector(selector);
  const dayKey = (iso) => iso.slice(0, 10);
  const esc = (value) => String(value).replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
  const dateFmt = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'America/Chicago' });
  const shortDateFmt = new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'America/Chicago' });
  const timeFmt = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'America/Chicago' });

  function summaryCell(label, value, note, className = '') {
    return `<div class="summary-cell"><span class="summary-label">${label}</span><strong class="summary-value ${className}">${value}</strong><div class="summary-note">${note}</div></div>`;
  }

  function renderSummary() {
    const total = state.jobs.length;
    const open = state.jobs.filter(j => j.status === 'open').length;
    const assigned = state.jobs.filter(j => j.status === 'assigned').length;
    const done = state.jobs.filter(j => j.status === 'done').length;
    const unassigned = state.jobs.filter(j => !j.technician).length;
    $('#summary').innerHTML = summaryCell('Total ledger', total, 'all sample jobs') + summaryCell('Needs dispatch', open, `${unassigned} without technician`, 'open') + summaryCell('Assigned', assigned, 'technician confirmed') + summaryCell('Complete', done, 'closed in fixture') + summaryCell('Coverage', `${total - unassigned}/${total}`, 'jobs with technician');
  }

  function renderDays() {
    const groups = state.jobs.reduce((map, job) => map.set(dayKey(job.scheduled_at), (map.get(dayKey(job.scheduled_at)) || 0) + 1), new Map());
    const buttons = [`<button class="day-button" data-day="all" aria-pressed="${state.selectedDay === 'all'}"><span><span class="day-main">All calls</span><span class="day-sub">Full ledger</span></span><span class="day-count">${state.jobs.length}</span></button>`];
    [...groups.entries()].sort().forEach(([day, count]) => {
      const date = new Date(`${day}T12:00:00-05:00`);
      const relative = day === dayKey(new Date(FIXED_NOW.getTime() - 8 * 60 * 60 * 1000).toISOString()) ? 'Today' : day < '2026-09-07' ? 'Past' : 'Scheduled';
      buttons.push(`<button class="day-button" data-day="${day}" aria-pressed="${state.selectedDay === day}"><span><span class="day-main">${shortDateFmt.format(date)}</span><span class="day-sub">${relative}</span></span><span class="day-count">${count}</span></button>`);
    });
    $('#days').innerHTML = buttons.join('');
  }

  function filteredJobs() {
    const q = state.query.toLowerCase();
    return state.jobs.filter(job => (state.selectedDay === 'all' || dayKey(job.scheduled_at) === state.selectedDay) && (state.status === 'all' || job.status === state.status) && (!q || [job.id, job.title, job.address, job.technician || 'unassigned'].some(v => v.toLowerCase().includes(q)))).sort((a,b) => new Date(a.scheduled_at) - new Date(b.scheduled_at));
  }

  function renderLedger() {
    const jobs = filteredJobs();
    $('#queue-caption').textContent = `${jobs.length} of ${state.jobs.length} jobs · ordered by appointment`;
    if (!jobs.length) {
      $('#ledger').innerHTML = `<div class="empty"><strong>No jobs match this view.</strong><p>Clear the search or restore all statuses.</p><button id="reset" class="button">Reset filters</button></div>`;
      $('#reset').onclick = () => { state.selectedDay = 'all'; state.status = 'all'; state.query = ''; $('#search').value = ''; $('#statusFilter').value = 'all'; render(); };
      return;
    }
    const head = `<div class="column-head ledger-grid"><span>Job</span><span>Call</span><span>Technician</span><span>Address</span><span>Appointment</span><span></span></div>`;
    const rows = jobs.map(job => `<article class="row ledger-grid" tabindex="0" data-id="${job.id}" aria-label="Open ${esc(job.id)} details"><span class="job-id">${esc(job.id)}</span><span class="job-title">${esc(job.title)}</span><span class="tech">${esc(job.technician || 'Unassigned')}</span><span class="address">${esc(job.address)}</span><span class="time"><strong>${timeFmt.format(new Date(job.scheduled_at))}</strong><span>${shortDateFmt.format(new Date(job.scheduled_at))}</span></span><span><span class="status status-${job.status}">${esc(job.status)}</span><button class="more" type="button" aria-label="Open ${esc(job.id)} details">···</button></span></article>`).join('');
    $('#ledger').innerHTML = head + rows;
    document.querySelectorAll('.row').forEach(row => {
      row.onclick = () => openJob(row.dataset.id);
      row.onkeydown = event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openJob(row.dataset.id); } };
    });
  }

  function openJob(id) {
    const job = state.jobs.find(item => item.id === id);
    if (!job) return;
    state.selectedId = id;
    $('#dialogTitle').textContent = `${job.id} · ${job.title}`;
    $('#dialogBody').innerHTML = `<dl class="detail-list"><dt>Status</dt><dd><span class="status status-${job.status}">${esc(job.status)}</span></dd><dt>Appointment</dt><dd>${dateFmt.format(new Date(job.scheduled_at))} at ${timeFmt.format(new Date(job.scheduled_at))}</dd><dt>Address</dt><dd>${esc(job.address)}</dd><dt>Technician</dt><dd>${esc(job.technician || 'Unassigned')}</dd></dl><div class="dialog-actions"><select id="assignTech" class="assign-select" aria-label="Assign technician"><option value="">Unassigned</option>${TECHNICIANS.map(t => `<option value="${t}" ${job.technician === t ? 'selected' : ''}>${t}</option>`).join('')}</select><button id="saveJob" class="button primary">Save assignment</button></div><p class="session-note">Session-only edit · no production API supplied</p>`;
    $('#saveJob').onclick = saveAssignment;
    $('#jobDialog').showModal();
  }

  function saveAssignment() {
    const button = $('#saveJob');
    button.textContent = 'Working…'; button.disabled = true;
    const job = state.jobs.find(item => item.id === state.selectedId);
    job.technician = $('#assignTech').value || null;
    if (job.technician && job.status === 'open') job.status = 'assigned';
    $('#jobDialog').close(); render();
  }

  function render() { renderSummary(); renderDays(); renderLedger(); }
  $('#today').textContent = dateFmt.format(FIXED_NOW);
  $('#days').onclick = event => { const button = event.target.closest('[data-day]'); if (button) { state.selectedDay = button.dataset.day; render(); } };
  $('#search').oninput = event => { state.query = event.target.value.trim(); renderLedger(); };
  $('#statusFilter').onchange = event => { state.status = event.target.value; renderLedger(); };
  $('.close').onclick = () => $('#jobDialog').close();
  $('#jobDialog').onclick = event => { if (event.target === $('#jobDialog')) $('#jobDialog').close(); };

  fetch('fixtures/jobs.json').then(response => { if (!response.ok) throw new Error(`HTTP ${response.status}`); return response.json(); }).then(jobs => { state.jobs = jobs; render(); }).catch(() => { $('#summary').innerHTML = ''; $('#ledger').innerHTML = `<div class="error"><strong>Could not read the job ledger.</strong><p>Serve this folder over HTTP so fixtures/jobs.json is available.</p><button class="button" onclick="location.reload()">Retry</button></div>`; $('#queue-caption').textContent = 'Data source unavailable'; });
})();