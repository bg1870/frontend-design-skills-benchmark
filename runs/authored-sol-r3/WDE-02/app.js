const state = { jobs: [], filter: 'all', query: '', sort: 'time', selectedId: null };
const $ = (selector) => document.querySelector(selector);
const rows = $('#jobRows');
const dialog = $('#assignDialog');
const scheduleTimeZone = 'Etc/GMT+5';

const dateFormatter = new Intl.DateTimeFormat('en-US', { timeZone: scheduleTimeZone, weekday: 'short', month: 'short', day: 'numeric' });
const timeFormatter = new Intl.DateTimeFormat('en-US', { timeZone: scheduleTimeZone, hour: 'numeric', minute: '2-digit' });

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character]);
}

function updateSummary() {
  const count = status => state.jobs.filter(job => job.status === status).length;
  const unassigned = state.jobs.filter(job => !job.technician).length;
  $('#attentionCount').textContent = unassigned;
  $('#openCount').textContent = count('open');
  $('#assignedCount').textContent = count('assigned');
  $('#doneCount').textContent = count('done');
  $('#totalCount').textContent = state.jobs.length;
  $('#allBadge').textContent = state.jobs.length;
}

function filteredJobs() {
  const query = state.query.toLocaleLowerCase();
  const statusOrder = { open: 0, assigned: 1, done: 2 };
  return state.jobs
    .filter(job => state.filter === 'all' || job.status === state.filter)
    .filter(job => [job.id, job.title, job.address, job.technician || 'unassigned'].some(value => value.toLocaleLowerCase().includes(query)))
    .sort((a, b) => {
      if (state.sort === 'status') return statusOrder[a.status] - statusOrder[b.status] || new Date(a.scheduled_at) - new Date(b.scheduled_at);
      if (state.sort === 'id') return a.id.localeCompare(b.id);
      return new Date(a.scheduled_at) - new Date(b.scheduled_at);
    });
}

function render() {
  const jobs = filteredJobs();
  rows.innerHTML = jobs.map(job => {
    const scheduled = new Date(job.scheduled_at);
    const action = job.status === 'open'
      ? `<button class="row-action" type="button" data-assign="${escapeHtml(job.id)}" aria-label="Assign technician to ${escapeHtml(job.id)}">Assign</button>`
      : '<span class="complete-mark">—</span>';
    return `<tr>
      <td><div class="job-cell"><span class="job-id">${escapeHtml(job.id)}</span><span><strong class="job-title">${escapeHtml(job.title)}</strong><span class="address">${escapeHtml(job.address)}</span></span></div></td>
      <td><span class="date">${dateFormatter.format(scheduled)}</span><span class="time">${timeFormatter.format(scheduled)}</span></td>
      <td><span class="tech ${job.technician ? '' : 'unassigned'}">${escapeHtml(job.technician || 'Unassigned')}</span></td>
      <td><span class="status status-${escapeHtml(job.status)}">${escapeHtml(job.status)}</span></td>
      <td>${action}</td>
    </tr>`;
  }).join('');
  $('#emptyState').hidden = jobs.length > 0;
  const noun = jobs.length === 1 ? 'job' : 'jobs';
  $('#resultCount').textContent = `${jobs.length} ${noun} shown · ${state.jobs.length} total`;
  updateSummary();
}

function openAssignDialog(id) {
  const job = state.jobs.find(item => item.id === id);
  if (!job) return;
  state.selectedId = id;
  $('#dialogJob').innerHTML = `<strong>${escapeHtml(job.id)} · ${escapeHtml(job.title)}</strong><span>${escapeHtml(job.address)} · ${dateFormatter.format(new Date(job.scheduled_at))}, ${timeFormatter.format(new Date(job.scheduled_at))}</span>`;
  $('#technicianSelect').value = '';
  dialog.showModal();
  $('#technicianSelect').focus();
}

function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.hidden = false;
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => { toast.hidden = true; }, 3500);
}

async function loadJobs() {
  try {
    const response = await fetch('fixtures/jobs.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    state.jobs = await response.json();
    const technicians = [...new Set(state.jobs.map(job => job.technician).filter(Boolean))].sort();
    $('#technicianSelect').insertAdjacentHTML('beforeend', technicians.map(name => `<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`).join(''));
    const loadedAt = new Intl.DateTimeFormat('en-US', { timeZone: scheduleTimeZone, month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }).format(new Date());
    $('#asOf').textContent = `Loaded ${loadedAt} · Schedule timezone UTC−05:00`;
    render();
  } catch (error) {
    $('#resultCount').textContent = 'Queue unavailable';
    rows.innerHTML = '<tr><td colspan="5"><div class="empty"><strong>Could not load the job queue</strong><p>Serve this directory over HTTP and refresh to load fixtures/jobs.json.</p></div></td></tr>';
    console.error('Failed to load jobs:', error);
  }
}

document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach(item => { item.classList.remove('active'); item.setAttribute('aria-pressed', 'false'); });
  button.classList.add('active');
  button.setAttribute('aria-pressed', 'true');
  state.filter = button.dataset.status;
  render();
}));

$('#searchInput').addEventListener('input', event => { state.query = event.target.value.trim(); render(); });
$('#sortSelect').addEventListener('change', event => { state.sort = event.target.value; render(); });
rows.addEventListener('click', event => {
  const button = event.target.closest('[data-assign]');
  if (button) openAssignDialog(button.dataset.assign);
});
$('#clearFilters').addEventListener('click', () => {
  state.query = '';
  state.filter = 'all';
  $('#searchInput').value = '';
  document.querySelectorAll('.filter').forEach(item => {
    const active = item.dataset.status === 'all';
    item.classList.toggle('active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  render();
  $('#searchInput').focus();
});
$('#assignForm').addEventListener('submit', event => {
  if (event.submitter?.value !== 'default') return;
  event.preventDefault();
  const technician = $('#technicianSelect').value;
  if (!technician) {
    $('#technicianSelect').reportValidity();
    return;
  }
  const job = state.jobs.find(item => item.id === state.selectedId);
  if (job) {
    job.technician = technician;
    job.status = 'assigned';
    render();
    dialog.close();
    showToast(`${job.id} assigned to ${technician}`);
  }
});

loadJobs();
