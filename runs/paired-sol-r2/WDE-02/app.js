const list = document.querySelector('#job-list');
const empty = document.querySelector('#empty-state');
const error = document.querySelector('#load-error');
const search = document.querySelector('#search');
const filters = [...document.querySelectorAll('.filter')];
const formatter = new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
const dayFormatter = new Intl.DateTimeFormat(undefined, { weekday: 'short' });
const monthFormatter = new Intl.DateTimeFormat(undefined, { month: 'short' });
const dateFormatter = new Intl.DateTimeFormat(undefined, { day: 'numeric' });
const timeFormatter = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' });
let jobs = [];
const initialParams = new URLSearchParams(location.search);
let statusFilter = ['all', 'open', 'assigned', 'done'].includes(initialParams.get('status')) ? initialParams.get('status') : 'all';
search.value = initialParams.get('q') || '';

function safe(value) {
  return String(value ?? '').replace(/[&<>'"]/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[character]));
}
function label(status) { return status === 'done' ? 'Completed' : status[0].toUpperCase() + status.slice(1); }
function updateSummary() {
  const count = state => jobs.filter(job => job.status === state).length;
  document.querySelector('#open-count').textContent = count('open');
  document.querySelector('#assigned-count').textContent = count('assigned');
  document.querySelector('#done-count').textContent = count('done');
  document.querySelector('#total-count').textContent = jobs.length;
  document.querySelector('#attention-count').textContent = count('open') + count('assigned');
}
function jobMarkup(job) {
  const date = new Date(job.scheduled_at);
  const tech = job.technician || 'Unassigned';
  return `<article class="job-row ${safe(job.status)}" aria-label="${safe(job.id)}, ${safe(job.title)}">
    <div class="appointment"><span class="date-block"><small>${monthFormatter.format(date)}</small><strong>${dateFormatter.format(date)}</strong></span><span><strong class="time">${timeFormatter.format(date)}</strong><small>${dayFormatter.format(date)}</small></span></div>
    <div class="job-title"><strong>${safe(job.title)}</strong><small>${safe(job.id)}</small></div>
    <div class="address"><strong>${safe(job.address)}</strong><small>Service address</small></div>
    <div class="technician ${job.technician ? '' : 'unassigned'}">${safe(tech)}<small>${job.technician ? 'Technician' : 'Dispatch needed'}</small></div>
    <span class="status ${safe(job.status)}">${label(job.status)}</span>
  </article>`;
}
function render() {
  const term = search.value.trim().toLowerCase();
  const params = new URLSearchParams();
  if (statusFilter !== 'all') params.set('status', statusFilter);
  if (term) params.set('q', term);
  history.replaceState(null, '', `${location.pathname}${params.size ? `?${params}` : ''}${location.hash}`);
  const visible = jobs.filter(job => statusFilter === 'all' || job.status === statusFilter).filter(job => [job.id, job.title, job.address, job.technician].some(value => String(value ?? '').toLowerCase().includes(term)));
  list.innerHTML = visible.map(jobMarkup).join('');
  empty.hidden = visible.length !== 0;
  document.querySelector('#result-count').textContent = `${visible.length} of ${jobs.length} jobs shown`;
}
function syncFilters() {
  filters.forEach(item => { const active = item.dataset.status === statusFilter; item.classList.toggle('active', active); item.setAttribute('aria-pressed', active); });
}
filters.forEach(button => button.addEventListener('click', () => {
  statusFilter = button.dataset.status;
  syncFilters();
  render();
}));
syncFilters();
search.addEventListener('input', render);
document.querySelector('#clear-filters').addEventListener('click', () => { search.value = ''; filters[0].click(); search.focus(); });

const now = new Date();
document.querySelector('#as-of').textContent = `As of ${formatter.format(now)} ${new Intl.DateTimeFormat().resolvedOptions().timeZone}`;
fetch('fixtures/jobs.json').then(response => { if (!response.ok) throw new Error(); return response.json(); }).then(data => {
  const rank = { open: 0, assigned: 1, done: 2 };
  jobs = data.slice().sort((a,b) => rank[a.status] - rank[b.status] || new Date(a.scheduled_at) - new Date(b.scheduled_at));
  updateSummary(); render();
}).catch(() => { document.querySelector('#result-count').textContent = 'Jobs unavailable'; error.hidden = false; });
