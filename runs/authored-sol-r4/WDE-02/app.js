const state = { jobs: [], filter: 'all', query: '' };
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const zone = 'America/Chicago';
const statusLabel = { open: 'Needs dispatch', assigned: 'Assigned', done: 'Complete' };

const dateParts = new Intl.DateTimeFormat('en-US', { timeZone: zone, weekday: 'short', month: 'short', day: 'numeric' });
const clockFormat = new Intl.DateTimeFormat('en-US', { timeZone: zone, hour: 'numeric', minute: '2-digit', timeZoneName: 'short' });
const timeFormat = new Intl.DateTimeFormat('en-US', { timeZone: zone, hour: 'numeric', minute: '2-digit' });
const rangeFormat = new Intl.DateTimeFormat('en-US', { timeZone: zone, month: 'short', day: 'numeric' });

function escapeHTML(value) {
  return String(value).replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]);
}

function updateClock() {
  const now = new Date();
  $('#clock').textContent = clockFormat.format(now);
  $('#as-of').textContent = `As of ${clockFormat.format(now)}`;
}

function counts() {
  return state.jobs.reduce((all, job) => ({ ...all, [job.status]: (all[job.status] || 0) + 1 }), {});
}

function renderSummary() {
  const count = counts();
  ['open', 'assigned', 'done'].forEach(key => {
    $(`#count-${key}`).textContent = count[key] || 0;
    $(`#filter-${key}`).textContent = count[key] || 0;
  });
  $('#filter-all').textContent = state.jobs.length;
  if (state.jobs.length) {
    const dates = state.jobs.map(job => new Date(job.scheduled_at)).sort((a, b) => a - b);
    $('#date-range').textContent = `${rangeFormat.format(dates[0])}–${rangeFormat.format(dates.at(-1))}`;
  }
}

function render() {
  const query = state.query.toLowerCase();
  const visible = state.jobs.filter(job => (state.filter === 'all' || job.status === state.filter) &&
    [job.id, job.title, job.technician || '', job.address].some(value => value.toLowerCase().includes(query)));
  const body = $('#job-list');
  if (!visible.length) {
    body.innerHTML = '<tr><td colspan="6" class="state">No jobs match this view.</td></tr>';
  } else {
    body.innerHTML = visible.map(job => {
      const date = new Date(job.scheduled_at);
      const parts = Object.fromEntries(dateParts.formatToParts(date).map(part => [part.type, part.value]));
      const action = job.status === 'open' ? 'Assign job' : 'View details';
      return `<tr>
        <td><div class="schedule"><div class="date-box"><span>${escapeHTML(parts.weekday)}</span><strong>${escapeHTML(parts.day)}</strong></div><span class="time">${escapeHTML(timeFormat.format(date))}</span></div></td>
        <td><span class="job-title">${escapeHTML(job.title)}</span><span class="job-id">${escapeHTML(job.id)}</span></td>
        <td class="address">${escapeHTML(job.address)}</td>
        <td class="tech ${job.technician ? '' : 'unassigned'}">${escapeHTML(job.technician || 'Unassigned')}</td>
        <td><span class="status ${escapeHTML(job.status)}">${statusLabel[job.status] || escapeHTML(job.status)}</span></td>
        <td><button class="row-action ${job.status === 'open' ? 'primary' : ''}" data-job="${escapeHTML(job.id)}">${action}</button></td>
      </tr>`;
    }).join('');
  }
  $('#result-count').textContent = `${visible.length} of ${state.jobs.length} jobs`;
}

function setFilter(filter) {
  state.filter = filter;
  $$('.filters button').forEach(button => {
    const active = button.dataset.filter === filter;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', active);
  });
  render();
  $('#queue-heading').textContent = filter === 'all' ? 'All scheduled work' : statusLabel[filter];
}

function openJob(id) {
  const job = state.jobs.find(item => item.id === id);
  if (!job) return;
  const date = new Date(job.scheduled_at);
  $('#dialog-title').textContent = job.title;
  $('#dialog-content').innerHTML = `<dl class="detail-grid">
    <dt>Job</dt><dd>${escapeHTML(job.id)}</dd><dt>Schedule</dt><dd>${escapeHTML(dateParts.format(date))}, ${escapeHTML(timeFormat.format(date))} CT</dd>
    <dt>Location</dt><dd>${escapeHTML(job.address)}</dd><dt>Technician</dt><dd>${escapeHTML(job.technician || 'Unassigned')}</dd>
    <dt>Status</dt><dd><span class="status ${escapeHTML(job.status)}">${statusLabel[job.status]}</span></dd>
  </dl>`;
  const action = $('#status-action');
  action.textContent = job.status === 'open' ? 'Mark assigned' : job.status === 'assigned' ? 'Mark complete' : 'Reopen job';
  action.dataset.job = job.id;
  $('#job-dialog').showModal();
}

function toast(message) {
  const el = $('#toast'); el.textContent = message; el.classList.add('show');
  clearTimeout(toast.timer); toast.timer = setTimeout(() => el.classList.remove('show'), 2400);
}

async function loadJobs() {
  $('#job-list').innerHTML = '<tr><td colspan="6" class="state">Loading queue…</td></tr>';
  try {
    const response = await fetch('fixtures/jobs.json', { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    state.jobs = (await response.json()).sort((a, b) => new Date(a.scheduled_at) - new Date(b.scheduled_at));
    renderSummary(); render();
  } catch (error) {
    $('#job-list').innerHTML = '<tr><td colspan="6" class="state">Queue could not be loaded. Serve this folder over HTTP and retry.</td></tr>';
    $('#result-count').textContent = 'Source unavailable';
  }
}

$('.filters').addEventListener('click', event => { const button = event.target.closest('[data-filter]'); if (button) setFilter(button.dataset.filter); });
$('.summary').addEventListener('click', event => { const button = event.target.closest('[data-filter]'); if (button) { setFilter(button.dataset.filter); $('#queue').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); } });
$('#search').addEventListener('input', event => { state.query = event.target.value.trim(); render(); });
$('#refresh').addEventListener('click', async () => { await loadJobs(); toast('Fixture data reloaded'); });
$('#job-list').addEventListener('click', event => { const button = event.target.closest('[data-job]'); if (button) openJob(button.dataset.job); });
$('#status-action').addEventListener('click', event => {
  const job = state.jobs.find(item => item.id === event.currentTarget.dataset.job); if (!job) return;
  job.status = job.status === 'open' ? 'assigned' : job.status === 'assigned' ? 'done' : 'open';
  job.technician = job.status === 'assigned' && !job.technician ? 'Dispatch pending' : job.technician;
  renderSummary(); render(); toast(`${job.id} updated in this sample view`);
});
updateClock(); setInterval(updateClock, 60000); loadJobs();
