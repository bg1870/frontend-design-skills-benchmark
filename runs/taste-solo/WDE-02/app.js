const OPERATING_DATE = '2026-09-08';
const technicians = ['R. Okafor', 'M. Duarte', 'T. Blanchard'];
let jobs = [];
let originalJobs = [];
let activeFilter = 'all';
let selectedJobId = null;

const list = document.querySelector('#job-list');
const stateMessage = document.querySelector('#state-message');
const search = document.querySelector('#search');
const dialog = document.querySelector('#assign-dialog');
const techSelect = document.querySelector('#technician');

function showSkeleton() {
  list.innerHTML = Array.from({ length: 4 }, () => '<tr class="skeleton"><td><div class="skeleton-bar"></div></td><td><div class="skeleton-bar"></div></td><td><div class="skeleton-bar"></div></td><td><div class="skeleton-bar"></div></td><td></td></tr>').join('');
}

function localDate(job) { return job.scheduled_at.slice(0, 10); }
function dateLabel(job) {
  const date = new Date(job.scheduled_at);
  if (localDate(job) === OPERATING_DATE) return 'Today';
  return new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).format(date);
}
function timeLabel(job) { return new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' }).format(new Date(job.scheduled_at)); }
function timeParts(job) {
  const value = timeLabel(job).split(' ');
  return [value[0], value[1] || ''];
}
function escapeHtml(value) { const node = document.createElement('div'); node.textContent = value; return node.innerHTML; }

function render() {
  const term = search.value.trim().toLowerCase();
  const visible = jobs.filter(job => (activeFilter === 'all' || job.status === activeFilter) && [job.id, job.title, job.address, job.technician || 'unassigned'].some(value => value.toLowerCase().includes(term)));
  list.innerHTML = visible.map(job => {
    const [time, meridiem] = timeParts(job);
    const action = job.status === 'open'
      ? `<button class="action-button primary" data-action="assign" data-id="${job.id}">Assign</button>`
      : job.status === 'assigned'
        ? `<button class="action-button" data-action="complete" data-id="${job.id}">Mark done</button>`
        : `<button class="action-button" data-action="reopen" data-id="${job.id}">Reopen</button>`;
    return `<tr class="${job.status === 'done' ? 'done-row' : ''}">
      <td><div class="job-cell"><div class="job-time-block"><span><strong>${escapeHtml(time)}</strong><br><small>${escapeHtml(meridiem)}</small></span></div><div class="job-info"><strong>${escapeHtml(job.title)}</strong><small><span class="job-id">${escapeHtml(job.id)}</span>${escapeHtml(job.address)}</small></div></div></td>
      <td class="scheduled"><strong>${dateLabel(job)}</strong><small>${timeLabel(job)}</small></td>
      <td class="technician ${job.technician ? '' : 'unassigned'}">${escapeHtml(job.technician || 'Unassigned')}</td>
      <td><span class="status status-${job.status}">${job.status}</span></td><td>${action}</td></tr>`;
  }).join('');
  stateMessage.className = visible.length ? 'state-message' : 'state-message show';
  stateMessage.innerHTML = visible.length ? '' : `<strong>No jobs found</strong><br>Try a different search or status filter.`;
  document.querySelector('#result-count').textContent = `${visible.length} ${visible.length === 1 ? 'job' : 'jobs'} shown`;
  updateSummary();
}

function updateSummary() {
  const counts = Object.fromEntries(['open','assigned','done'].map(status => [status, jobs.filter(j => j.status === status).length]));
  const today = jobs.filter(j => localDate(j) === OPERATING_DATE && j.status !== 'done');
  document.querySelector('#metric-today').textContent = today.length;
  document.querySelector('#metric-open').textContent = counts.open;
  document.querySelector('#metric-assigned').textContent = counts.assigned;
  document.querySelector('#metric-done').textContent = counts.done;
  document.querySelector('#metric-next').textContent = today.length ? `Next at ${timeLabel(today.sort((a,b) => a.scheduled_at.localeCompare(b.scheduled_at))[0])}` : 'Schedule clear';
  document.querySelector('#count-all').textContent = jobs.length;
  ['open','assigned','done'].forEach(status => document.querySelector(`#count-${status}`).textContent = counts[status]);
}

function changed() { return JSON.stringify(jobs) !== JSON.stringify(originalJobs); }
function showToast(message) {
  const toast = document.querySelector('#toast'); toast.textContent = message; toast.classList.add('show');
  clearTimeout(showToast.timer); showToast.timer = setTimeout(() => toast.classList.remove('show'), 2600);
}
function updateJob(id, patch) {
  jobs = jobs.map(job => job.id === id ? { ...job, ...patch } : job);
  document.querySelector('#reset-button').hidden = !changed();
  render();
}

list.addEventListener('click', event => {
  const button = event.target.closest('[data-action]'); if (!button) return;
  const job = jobs.find(item => item.id === button.dataset.id); if (!job) return;
  if (button.dataset.action === 'assign') {
    selectedJobId = job.id; techSelect.value = '';
    document.querySelector('#dialog-job').textContent = `${job.id}  ${job.title} at ${timeLabel(job)}`;
    dialog.showModal();
  } else if (button.dataset.action === 'complete') {
    updateJob(job.id, { status: 'done' }); showToast(`${job.id} marked complete`);
  } else {
    updateJob(job.id, { status: job.technician ? 'assigned' : 'open' }); showToast(`${job.id} returned to the queue`);
  }
});

document.querySelector('#assign-form').addEventListener('submit', event => {
  if (event.submitter?.value === 'cancel') return;
  event.preventDefault();
  if (!techSelect.value) { techSelect.focus(); return; }
  updateJob(selectedJobId, { technician: techSelect.value, status: 'assigned' });
  dialog.close(); showToast(`${selectedJobId} assigned to ${techSelect.value}`);
});

document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  activeFilter = button.dataset.filter;
  document.querySelectorAll('.filter').forEach(item => item.classList.toggle('active', item === button));
  render();
}));
search.addEventListener('input', render);
document.addEventListener('keydown', event => { if (event.key === '/' && document.activeElement !== search) { event.preventDefault(); search.focus(); } });
document.querySelector('#reset-button').addEventListener('click', () => { jobs = structuredClone(originalJobs); document.querySelector('#reset-button').hidden = true; render(); showToast('Queue restored'); });

async function loadJobs() {
  showSkeleton();
  try {
    const response = await fetch('fixtures/jobs.json');
    if (!response.ok) throw new Error('Could not load the job queue');
    jobs = await response.json(); originalJobs = structuredClone(jobs); render();
  } catch (error) {
    list.innerHTML = ''; stateMessage.className = 'state-message show';
    stateMessage.innerHTML = `<strong>Queue unavailable</strong><br>${escapeHtml(error.message)}. Refresh the page to try again.`;
    document.querySelector('#result-count').textContent = 'Unable to load jobs';
  }
}
loadJobs();
