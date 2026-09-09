const state = { jobs: [], filter: 'all', search: '', sort: 'date' };
const $ = (selector) => document.querySelector(selector);

function formatDate(value, withYear = false) {
  const date = new Date(value);
  return new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric', ...(withYear ? { year: 'numeric' } : {}) }).format(date);
}
function formatTime(value) {
  return new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' }).format(new Date(value));
}
function initials(name) { return name.split(/\s+/).map(part => part.replace('.', '')[0]).join('').slice(0, 2); }
function esc(value) { const el = document.createElement('span'); el.textContent = value; return el.innerHTML; }

function renderSummary() {
  $('#totalCount').textContent = state.jobs.length;
  ['open', 'assigned', 'done'].forEach(status => { $(`#${status}Count`).textContent = state.jobs.filter(job => job.status === status).length; });
  if (state.jobs.length) {
    const dates = [...state.jobs].sort((a,b) => new Date(a.scheduled_at) - new Date(b.scheduled_at));
    const start = formatDate(dates[0].scheduled_at);
    const end = formatDate(dates.at(-1).scheduled_at, true).replace(/^\w+, /, '');
    $('#dateRange').textContent = `${start.replace(/^\w+, /, '')} – ${end} · All service areas`;
  }
}

function visibleJobs() {
  const query = state.search.toLowerCase().trim();
  const priorities = { open: 0, assigned: 1, done: 2 };
  return state.jobs.filter(job => state.filter === 'all' || job.status === state.filter)
    .filter(job => !query || [job.id, job.title, job.technician || '', job.address].some(v => v.toLowerCase().includes(query)))
    .sort((a,b) => state.sort === 'priority' ? priorities[a.status] - priorities[b.status] || new Date(a.scheduled_at) - new Date(b.scheduled_at) : state.sort === 'recent' ? new Date(b.scheduled_at) - new Date(a.scheduled_at) : new Date(a.scheduled_at) - new Date(b.scheduled_at));
}

function renderRows() {
  const jobs = visibleJobs();
  $('#resultCount').textContent = `Showing ${jobs.length} of ${state.jobs.length} jobs`;
  $('#emptyState').hidden = jobs.length !== 0;
  $('#jobRows').innerHTML = jobs.map(job => `
    <tr>
      <td><div class="job-main"><span class="job-symbol" aria-hidden="true">⌁</span><div><div class="job-title">${esc(job.title)}</div><div class="job-address"><span class="meta">${esc(job.id)}</span> · ${esc(job.address)}</div></div></div></td>
      <td><div class="date">${formatDate(job.scheduled_at)}</div><div class="meta">${formatTime(job.scheduled_at)}</div></td>
      <td>${job.technician ? `<div class="tech"><span class="tech-badge">${esc(initials(job.technician))}</span>${esc(job.technician)}</div>` : '<span class="tech unassigned">Unassigned</span>'}</td>
      <td><span class="status ${esc(job.status)}">${job.status}</span></td>
      <td><button class="row-action" type="button" aria-label="More actions for ${esc(job.id)}">⋯</button></td>
    </tr>`).join('');
}

async function loadJobs() {
  $('#errorState').hidden = true;
  try {
    const response = await fetch('fixtures/jobs.json', { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    state.jobs = await response.json();
    renderSummary(); renderRows();
  } catch (error) {
    $('#jobRows').innerHTML = '';
    $('#resultCount').textContent = 'Data unavailable';
    $('#errorState').hidden = false;
  }
}

document.querySelectorAll('.metric').forEach(button => button.addEventListener('click', () => {
  state.filter = button.dataset.filter;
  document.querySelectorAll('.metric').forEach(item => { const active = item === button; item.classList.toggle('active', active); item.setAttribute('aria-pressed', active); });
  renderRows();
}));
$('#searchInput').addEventListener('input', event => { state.search = event.target.value; renderRows(); });
$('#sortSelect').addEventListener('change', event => { state.sort = event.target.value; renderRows(); });
$('#clearFilters').addEventListener('click', () => { state.filter = 'all'; state.search = ''; $('#searchInput').value = ''; document.querySelectorAll('.metric').forEach((item, i) => { item.classList.toggle('active', i === 0); item.setAttribute('aria-pressed', i === 0); }); renderRows(); });
$('#refreshButton').addEventListener('click', loadJobs);
$('#retryButton').addEventListener('click', loadJobs);
$('#newJobButton').addEventListener('click', () => $('#jobDialog').showModal());
$('#jobDialog').addEventListener('click', event => { if (event.target === $('#jobDialog')) $('#jobDialog').close(); });
loadJobs();
