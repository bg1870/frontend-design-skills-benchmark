const state = { jobs: [], query: '', status: 'all', selectedId: null };
const rows = document.querySelector('#jobRows');
const summary = document.querySelector('#summary');
const count = document.querySelector('#resultCount');
const empty = document.querySelector('#emptyState');
const dialog = document.querySelector('#jobDialog');
const assignBtn = document.querySelector('#assignBtn');

const icons = {
  total: '<span class="status-mark"></span>',
  open: '<span class="status-mark open"></span>',
  assigned: '<span class="status-mark assigned"></span>',
  done: '<span class="status-mark"></span>'
};

function escapeHTML(value = '') {
  return String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
}
function initials(name) { return name.split(/\s+/).map(x => x.replace('.', '')[0]).join('').slice(0, 2).toUpperCase(); }
function formatDate(value) {
  const date = new Date(value);
  return {
    day: new Intl.DateTimeFormat('en-US', { weekday:'short', month:'short', day:'numeric', timeZone:'America/Chicago' }).format(date),
    time: new Intl.DateTimeFormat('en-US', { hour:'numeric', minute:'2-digit', timeZone:'America/Chicago' }).format(date)
  };
}
function renderSummary() {
  const stats = [
    ['total', 'Total scheduled', state.jobs.length],
    ['open', 'Needs dispatch', state.jobs.filter(j => !j.technician).length],
    ['assigned', 'Assigned', state.jobs.filter(j => j.status === 'assigned').length],
    ['done', 'Completed', state.jobs.filter(j => j.status === 'done').length]
  ];
  summary.innerHTML = stats.map(([key, label, value]) => `<div class="stat"><span class="stat-label">${icons[key]}${label}</span><strong class="stat-value">${value}</strong></div>`).join('');
}
function filteredJobs() {
  const q = state.query.toLowerCase();
  return state.jobs.filter(job => {
    const haystack = [job.id, job.title, job.address, job.technician || 'unassigned'].join(' ').toLowerCase();
    return (state.status === 'all' || job.status === state.status) && haystack.includes(q);
  });
}
function renderRows() {
  const jobs = filteredJobs();
  count.textContent = `${jobs.length} ${jobs.length === 1 ? 'job' : 'jobs'} shown`;
  empty.hidden = jobs.length !== 0;
  rows.innerHTML = jobs.map(job => {
    const when = formatDate(job.scheduled_at);
    const tech = job.technician
      ? `<span class="tech-avatar">${initials(job.technician)}</span><span>${escapeHTML(job.technician)}</span>`
      : '<span class="unassigned">Unassigned</span>';
    return `<tr>
      <td><div class="job-title">${escapeHTML(job.title)}</div><div class="job-meta"><span class="job-id">${escapeHTML(job.id)}</span><span>•</span><span>${escapeHTML(job.address)}</span></div></td>
      <td><span class="date">${when.day}</span><span class="time">${when.time}</span></td>
      <td><div class="tech">${tech}</div></td>
      <td><span class="pill ${escapeHTML(job.status)}">${escapeHTML(job.status)}</span></td>
      <td><button class="more" type="button" data-id="${escapeHTML(job.id)}" aria-label="View details for ${escapeHTML(job.id)}">•••</button></td>
    </tr>`;
  }).join('');
}
function render() { renderSummary(); renderRows(); }
function openJob(id) {
  const job = state.jobs.find(j => j.id === id);
  if (!job) return;
  state.selectedId = id;
  const when = formatDate(job.scheduled_at);
  document.querySelector('#dialogTitle').textContent = job.title;
  document.querySelector('#dialogDetails').innerHTML = `
    <dt>Job</dt><dd>${escapeHTML(job.id)}</dd>
    <dt>Address</dt><dd>${escapeHTML(job.address)}</dd>
    <dt>Scheduled</dt><dd>${when.day} at ${when.time}</dd>
    <dt>Technician</dt><dd>${escapeHTML(job.technician || 'Unassigned')}</dd>
    <dt>Status</dt><dd>${escapeHTML(job.status[0].toUpperCase() + job.status.slice(1))}</dd>`;
  assignBtn.hidden = Boolean(job.technician) || job.status === 'done';
  dialog.showModal();
}
function toast(message) {
  const el = document.querySelector('#toast');
  el.textContent = message; el.classList.add('show');
  clearTimeout(toast.timer); toast.timer = setTimeout(() => el.classList.remove('show'), 2400);
}
async function loadJobs() {
  try {
    const response = await fetch('fixtures/jobs.json', { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    state.jobs = await response.json();
    render();
  } catch (error) {
    count.textContent = 'Unable to load jobs';
    empty.hidden = false;
    empty.innerHTML = '<strong>Job data unavailable</strong><span>Serve this folder over HTTP, then refresh the page.</span>';
    console.error('Could not load fixtures/jobs.json:', error);
  }
}

document.querySelector('#searchInput').addEventListener('input', e => { state.query = e.target.value.trim(); renderRows(); });
document.querySelector('#statusFilter').addEventListener('change', e => { state.status = e.target.value; renderRows(); });
rows.addEventListener('click', e => { const button = e.target.closest('[data-id]'); if (button) openJob(button.dataset.id); });
document.querySelector('#refreshBtn').addEventListener('click', async e => {
  const button = e.currentTarget; button.classList.add('spinning'); button.disabled = true;
  await loadJobs(); setTimeout(() => { button.classList.remove('spinning'); button.disabled = false; toast('Queue refreshed'); }, 450);
});
assignBtn.addEventListener('click', e => {
  e.preventDefault();
  const job = state.jobs.find(j => j.id === state.selectedId);
  if (!job) return;
  job.technician = 'A. Singh'; job.status = 'assigned';
  render(); dialog.close(); toast(`${job.id} assigned to A. Singh — saved in this demo`);
});
loadJobs();
