const BUSINESS_TZ = 'Etc/GMT+5';
const ZONE_LABEL = 'UTC−05:00';
let jobs = [];
let selectedJobId = null;
let statusFilter = 'active';

const $ = (selector) => document.querySelector(selector);
const list = $('#job-list');
const dateKey = (date) => new Intl.DateTimeFormat('en-CA', {
  timeZone: BUSINESS_TZ, year: 'numeric', month: '2-digit', day: '2-digit'
}).format(date);
const dateFormat = new Intl.DateTimeFormat('en-US', {
  timeZone: BUSINESS_TZ, weekday: 'short', month: 'short', day: 'numeric'
});
const timeFormat = new Intl.DateTimeFormat('en-US', {
  timeZone: BUSINESS_TZ, hour: 'numeric', minute: '2-digit'
});
const evaluatedFormat = new Intl.DateTimeFormat('en-US', {
  timeZone: BUSINESS_TZ, month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit'
});
const clockFormat = new Intl.DateTimeFormat('en-US', {
  timeZone: BUSINESS_TZ, weekday: 'short', hour: 'numeric', minute: '2-digit', second: '2-digit'
});

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
}

function updateClock() {
  const now = new Date();
  $('#clock').textContent = `${clockFormat.format(now)} · ${ZONE_LABEL}`;
  $('#evaluated').textContent = `Sample data · Evaluated ${evaluatedFormat.format(now)} (${ZONE_LABEL})`;
}

function isUnassigned(job) { return job.status === 'open' || !job.technician; }
function isToday(job, now = new Date()) { return dateKey(new Date(job.scheduled_at)) === dateKey(now); }
function isOverdue(job, now = new Date()) { return job.status !== 'done' && new Date(job.scheduled_at) < now; }

function renderSummary() {
  $('#active-count').textContent = jobs.filter(j => j.status !== 'done').length;
  $('#open-count').textContent = jobs.filter(isUnassigned).length;
  $('#today-count').textContent = jobs.filter(isToday).length;
  $('#done-count').textContent = jobs.filter(j => j.status === 'done').length;
  $('#today-caption').textContent = `${dateFormat.format(new Date())}`;
}

function statusLabel(status) {
  return status === 'done' ? 'Completed' : status === 'assigned' ? 'Assigned' : 'Unassigned';
}

function initials(name) {
  return name.split(/\s+/).map(part => part[0]).join('').slice(0, 2).toUpperCase();
}

function jobRow(job) {
  const scheduled = new Date(job.scheduled_at);
  const overdue = isOverdue(job);
  const tech = job.technician
    ? `<span class="tech"><span class="avatar" aria-hidden="true">${escapeHtml(initials(job.technician))}</span>${escapeHtml(job.technician)}</span>`
    : '<span class="unassigned">Needs assignment</span>';
  const action = isUnassigned(job)
    ? `<button class="row-action assign" data-id="${escapeHtml(job.id)}">Assign</button>`
    : job.status === 'done' ? '<span class="done-mark">Closed</span>' : '<span class="done-mark">Dispatched</span>';
  return `<tr>
    <td><div class="job-main"><span class="job-index">${escapeHtml(job.id.replace('J-', '#'))}</span><div><div class="job-title">${escapeHtml(job.title)}</div><div class="job-address">${escapeHtml(job.address)}</div></div></div></td>
    <td><div class="schedule"><strong>${dateFormat.format(scheduled)}</strong><span class="${overdue ? 'overdue' : ''}">${timeFormat.format(scheduled)}${overdue ? ' · Overdue' : ''}</span></div></td>
    <td>${tech}</td>
    <td><span class="status status-${escapeHtml(job.status)}">${statusLabel(job.status)}</span></td>
    <td>${action}</td>
  </tr>`;
}

function renderQueue() {
  const query = $('#search').value.trim().toLowerCase();
  let visible = jobs.filter(job => {
    const statusMatch = statusFilter === 'all' ||
      (statusFilter === 'active' && job.status !== 'done') ||
      (statusFilter === 'open' && isUnassigned(job)) || job.status === statusFilter;
    const haystack = [job.id, job.title, job.address, job.technician || 'unassigned'].join(' ').toLowerCase();
    return statusMatch && haystack.includes(query);
  });
  const direction = $('#sort').value === 'asc' ? 1 : -1;
  visible.sort((a, b) => direction * (new Date(a.scheduled_at) - new Date(b.scheduled_at)));
  list.innerHTML = visible.map(jobRow).join('');
  $('#result-count').textContent = `(${visible.length})`;
  $('#empty').hidden = visible.length > 0;
  list.closest('table').hidden = visible.length === 0;
}

function render() { renderSummary(); renderQueue(); }

function openAssignment(id) {
  const job = jobs.find(item => item.id === id);
  if (!job) return;
  selectedJobId = id;
  $('#dialog-job').textContent = `${job.id} · ${job.title}`;
  $('#technician').value = '';
  $('#assign-dialog').showModal();
}

function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 2800);
}

async function loadJobs() {
  try {
    const response = await fetch('fixtures/jobs.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    jobs = await response.json();
    const technicians = [...new Set(jobs.map(j => j.technician).filter(Boolean))].sort();
    $('#technician').insertAdjacentHTML('beforeend', technicians.map(name => `<option>${escapeHtml(name)}</option>`).join(''));
    render();
  } catch (error) {
    list.closest('table').hidden = true;
    const empty = $('#empty');
    empty.hidden = false;
    empty.innerHTML = '<strong>Jobs could not be loaded.</strong><span>Serve this folder over HTTP so the fixture can be read.</span>';
    console.error('Unable to load job fixture:', error);
  }
}

document.addEventListener('click', event => {
  const filter = event.target.closest('.filter');
  if (filter) {
    statusFilter = filter.dataset.status;
    document.querySelectorAll('.filter').forEach(button => {
      const active = button === filter;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', active);
    });
    renderQueue();
  }
  const assign = event.target.closest('.assign');
  if (assign) openAssignment(assign.dataset.id);
});

$('#search').addEventListener('input', renderQueue);
$('#sort').addEventListener('change', renderQueue);
$('#reset').addEventListener('click', () => {
  $('#search').value = '';
  document.querySelector('[data-status="active"]').click();
});
$('#assign-form').addEventListener('submit', event => {
  const submitter = event.submitter;
  if (!submitter || submitter.value === 'cancel') return;
  event.preventDefault();
  const technician = $('#technician').value;
  if (!technician) { $('#technician').focus(); return; }
  const job = jobs.find(item => item.id === selectedJobId);
  if (job) {
    job.technician = technician;
    job.status = 'assigned';
    render();
    showToast(`${job.id} assigned to ${technician}`);
  }
  $('#assign-dialog').close();
});

updateClock();
setInterval(updateClock, 1000);
document.addEventListener('visibilitychange', () => { if (!document.hidden) { updateClock(); render(); } });
loadJobs();
