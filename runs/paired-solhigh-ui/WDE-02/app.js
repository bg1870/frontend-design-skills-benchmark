const state = { jobs: [], query: '', status: 'all' };

const els = {
  list: document.querySelector('#jobList'),
  template: document.querySelector('#jobTemplate'),
  empty: document.querySelector('#emptyState'),
  error: document.querySelector('#errorState'),
  count: document.querySelector('#resultCount'),
  search: document.querySelector('#searchInput'),
  filter: document.querySelector('#statusFilter'),
  dialog: document.querySelector('#jobDialog')
};

const dateFormatter = new Intl.DateTimeFormat(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
const timeFormatter = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' });
const longDateFormatter = new Intl.DateTimeFormat(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

function setClock() {
  const now = new Date();
  document.querySelector('#todayLabel').textContent = longDateFormatter.format(now);
  document.querySelector('#asOf').textContent = `As of ${timeFormatter.format(now)}`;
}

function formatVisit(value) {
  const date = new Date(value);
  return { day: dateFormatter.format(date), time: timeFormatter.format(date), full: `${longDateFormatter.format(date)} at ${timeFormatter.format(date)}` };
}

function updateSummary() {
  const groups = Object.groupBy ? Object.groupBy(state.jobs, job => job.status) : state.jobs.reduce((all, job) => {
    (all[job.status] ||= []).push(job); return all;
  }, {});
  const open = groups.open || [];
  document.querySelector('#openCount').textContent = open.length;
  document.querySelector('#assignedCount').textContent = (groups.assigned || []).length;
  document.querySelector('#doneCount').textContent = (groups.done || []).length;
  document.querySelector('#openDetail').textContent = open.length ? `${open.length} ${open.length === 1 ? 'call' : 'calls'} without a technician` : 'No open calls';
  const next = [...open].sort((a, b) => new Date(a.scheduled_at) - new Date(b.scheduled_at))[0];
  document.querySelector('#nextOpen').textContent = next ? `${formatVisit(next.scheduled_at).day}, ${formatVisit(next.scheduled_at).time}` : '—';
  document.querySelector('#nextOpenAddress').textContent = next ? `${next.id} · ${next.address}` : 'Nothing waiting';
}

function syncUrl() {
  const params = new URLSearchParams();
  if (state.query) params.set('q', state.query);
  if (state.status !== 'all') params.set('status', state.status);
  history.replaceState(null, '', `${location.pathname}${params.size ? `?${params}` : ''}${location.hash}`);
}

function visibleJobs() {
  const query = state.query.toLowerCase();
  return state.jobs
    .filter(job => state.status === 'all' || job.status === state.status)
    .filter(job => !query || [job.id, job.title, job.address, job.technician || 'unassigned'].some(value => value.toLowerCase().includes(query)))
    .sort((a, b) => new Date(a.scheduled_at) - new Date(b.scheduled_at));
}

function openDetails(job) {
  const visit = formatVisit(job.scheduled_at);
  document.querySelector('#dialogId').textContent = job.id;
  document.querySelector('#dialogTitle').textContent = job.title;
  document.querySelector('#dialogDetails').innerHTML = `
    <dt>Status</dt><dd>${job.status[0].toUpperCase()}${job.status.slice(1)}</dd>
    <dt>Visit</dt><dd>${visit.full}</dd>
    <dt>Technician</dt><dd>${job.technician || 'Unassigned'}</dd>
    <dt>Address</dt><dd>${job.address}</dd>`;
  els.dialog.showModal();
}

function render() {
  const jobs = visibleJobs();
  els.list.replaceChildren();
  jobs.forEach(job => {
    const row = els.template.content.firstElementChild.cloneNode(true);
    const visit = formatVisit(job.scheduled_at);
    row.dataset.status = job.status;
    row.querySelector('.job-id').textContent = job.id;
    row.querySelector('.job-id').setAttribute('translate', 'no');
    row.querySelector('h3').textContent = job.title;
    row.querySelector('.address').textContent = job.address;
    row.querySelector('.visit strong').textContent = visit.day;
    row.querySelector('.visit span').textContent = visit.time;
    const tech = row.querySelector('.tech');
    tech.textContent = job.technician || 'Unassigned';
    if (!job.technician) tech.classList.add('tech--empty');
    row.querySelector('.status').innerHTML = `<span class="status-badge status-badge--${job.status}">${job.status}</span>`;
    const action = row.querySelector('.row-action');
    action.setAttribute('aria-label', `View ${job.id}, ${job.title}`);
    action.addEventListener('click', () => openDetails(job));
    els.list.append(row);
  });
  els.count.textContent = `${jobs.length} ${jobs.length === 1 ? 'work order' : 'work orders'}`;
  els.empty.hidden = jobs.length !== 0;
}

async function loadJobs() {
  els.error.hidden = true;
  els.empty.hidden = true;
  els.count.textContent = 'Loading work orders…';
  try {
    const response = await fetch('fixtures/jobs.json', { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    state.jobs = await response.json();
    updateSummary();
    render();
    setClock();
  } catch (error) {
    console.error('Unable to load jobs:', error);
    els.list.replaceChildren();
    els.count.textContent = 'Queue unavailable';
    els.error.hidden = false;
  }
}

els.search.addEventListener('input', event => { state.query = event.target.value.trim(); syncUrl(); render(); });
els.filter.addEventListener('change', event => { state.status = event.target.value; syncUrl(); render(); });
document.querySelector('#clearFilters').addEventListener('click', () => {
  state.query = ''; state.status = 'all'; els.search.value = ''; els.filter.value = 'all'; syncUrl(); render(); els.search.focus();
});
document.querySelector('#refreshButton').addEventListener('click', loadJobs);
document.querySelector('#retryButton').addEventListener('click', loadJobs);
els.dialog.addEventListener('click', event => {
  if (event.target === els.dialog) els.dialog.close();
});

const initialParams = new URLSearchParams(location.search);
state.query = initialParams.get('q') || '';
state.status = ['open', 'assigned', 'done'].includes(initialParams.get('status')) ? initialParams.get('status') : 'all';
els.search.value = state.query;
els.filter.value = state.status;
setClock();
loadJobs();
