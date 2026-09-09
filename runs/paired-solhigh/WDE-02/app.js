const state = { jobs: [], filter: 'all', query: '' };
const referenceDate = '2026-09-08';
const initialParams = new URLSearchParams(window.location.search);
if (['all', 'open', 'assigned', 'done'].includes(initialParams.get('status'))) state.filter = initialParams.get('status');
state.query = initialParams.get('q') || '';
const list = document.querySelector('#jobList');
const emptyState = document.querySelector('#emptyState');
const errorState = document.querySelector('#errorState');
const queueCount = document.querySelector('#queueCount');
const toast = document.querySelector('#toast');
const searchInput = document.querySelector('#searchInput');
searchInput.value = state.query;
document.querySelector('#boardDate').textContent = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'short', day: 'numeric', timeZone: 'America/Chicago' }).format(new Date(`${referenceDate}T12:00:00-05:00`));
document.querySelectorAll('.filter').forEach(item => {
  const active = item.dataset.filter === state.filter;
  item.classList.toggle('active', active);
  item.setAttribute('aria-pressed', String(active));
});

function syncUrl() {
  const params = new URLSearchParams();
  if (state.filter !== 'all') params.set('status', state.filter);
  if (state.query) params.set('q', state.query);
  history.replaceState(null, '', `${location.pathname}${params.size ? `?${params}` : ''}`);
}

const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]);
const initials = (name) => name.split(/\s+/).map(part => part[0]).join('').replace('.', '').slice(0, 2);
const dateParts = (iso) => {
  const date = new Date(iso);
  return {
    day: new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'America/Chicago' }).format(date),
    time: new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'America/Chicago' }).format(date),
  };
};

function renderSummary() {
  const counts = [
    state.jobs.filter(job => job.scheduled_at.slice(0, 10) === referenceDate).length,
    state.jobs.filter(job => job.status === 'open').length,
    state.jobs.filter(job => job.status === 'assigned').length,
    state.jobs.filter(job => job.status === 'done').length,
  ];
  document.querySelectorAll('#summaryMetrics dd').forEach((node, index) => { node.textContent = counts[index]; });
}

function filteredJobs() {
  const query = state.query.toLowerCase();
  return state.jobs.filter(job => {
    const matchesStatus = state.filter === 'all' || job.status === state.filter;
    const haystack = [job.id, job.title, job.technician || '', job.address].join(' ').toLowerCase();
    return matchesStatus && haystack.includes(query);
  });
}

function renderJobs() {
  const jobs = filteredJobs();
  queueCount.textContent = `${jobs.length} ${jobs.length === 1 ? 'call' : 'calls'} shown · Sorted by scheduled time`;
  emptyState.hidden = jobs.length !== 0;
  list.innerHTML = jobs.map(job => {
    const date = dateParts(job.scheduled_at);
    const tech = job.technician
      ? `<span class="tech-mark" aria-hidden="true">${escapeHtml(initials(job.technician))}</span><span>${escapeHtml(job.technician)}</span>`
      : '<span class="tech-mark" aria-hidden="true">?</span><span>Unassigned</span>';
    const action = job.status === 'open' ? 'Assign' : 'Details';
    return `<article class="job" data-status="${escapeHtml(job.status)}" aria-label="${escapeHtml(job.id)}: ${escapeHtml(job.title)}">
      <div class="schedule"><strong>${escapeHtml(date.time)}</strong><span>${escapeHtml(date.day)}</span></div>
      <div class="service"><p class="job-title">${escapeHtml(job.title)}</p><p class="job-address">${escapeHtml(job.id)} · ${escapeHtml(job.address)}</p></div>
      <div class="tech${job.technician ? '' : ' unassigned'}">${tech}</div>
      <span class="status status-${escapeHtml(job.status)}">${escapeHtml(job.status)}</span>
      <button class="row-action" type="button" data-id="${escapeHtml(job.id)}" data-action="${action.toLowerCase()}">${action}</button>
    </article>`;
  }).join('');
  list.setAttribute('aria-busy', 'false');
}

function showToast(message) {
  toast.textContent = message;
  toast.hidden = false;
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => { toast.hidden = true; }, 3200);
}

async function loadJobs() {
  list.setAttribute('aria-busy', 'true');
  errorState.hidden = true;
  try {
    const response = await fetch('fixtures/jobs.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    state.jobs = await response.json();
    state.jobs.sort((a, b) => new Date(a.scheduled_at) - new Date(b.scheduled_at));
    renderSummary();
    renderJobs();
  } catch (error) {
    list.innerHTML = '';
    list.setAttribute('aria-busy', 'false');
    queueCount.textContent = 'Queue unavailable';
    errorState.hidden = false;
  }
}

document.querySelector('.filters').addEventListener('click', event => {
  const button = event.target.closest('.filter');
  if (!button) return;
  state.filter = button.dataset.filter;
  document.querySelectorAll('.filter').forEach(item => {
    const active = item === button;
    item.classList.toggle('active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  syncUrl();
  renderJobs();
});

searchInput.addEventListener('input', event => { state.query = event.target.value.trim(); syncUrl(); renderJobs(); });
document.querySelector('#clearFilters').addEventListener('click', () => {
  state.filter = 'all'; state.query = '';
  searchInput.value = '';
  syncUrl();
  document.querySelectorAll('.filter').forEach((item, index) => { item.classList.toggle('active', index === 0); item.setAttribute('aria-pressed', String(index === 0)); });
  renderJobs();
});
document.querySelector('#retryButton').addEventListener('click', loadJobs);
list.addEventListener('click', event => {
  const button = event.target.closest('.row-action');
  if (!button) return;
  const job = state.jobs.find(item => item.id === button.dataset.id);
  showToast(button.dataset.action === 'assign' ? `${job.id} is ready for technician assignment.` : `${job.id} details selected.`);
});

loadJobs();
