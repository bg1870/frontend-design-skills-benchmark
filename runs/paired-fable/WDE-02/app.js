const state = { jobs: [], filter: 'active', query: '' };
const els = {
  rows: document.querySelector('#job-rows'), metrics: document.querySelector('#metrics'),
  count: document.querySelector('#result-count'), empty: document.querySelector('#empty'),
  error: document.querySelector('#error'), search: document.querySelector('#search'),
  toast: document.querySelector('#toast'), refresh: document.querySelector('#refresh')
};
const businessZone = 'America/Chicago';
const shiftDate = new Date('2026-09-08T09:00:00-05:00');
const timeFormat = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone: businessZone });
const dayFormat = new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric', timeZone: businessZone });
const shortDayFormat = new Intl.DateTimeFormat('en-US', { weekday: 'short', timeZone: businessZone });

document.querySelector('#clock').textContent = dayFormat.format(shiftDate);

function dayKey(date) {
  return new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: businessZone }).format(date);
}

function summarize() {
  const active = state.jobs.filter(job => job.status !== 'done');
  const open = state.jobs.filter(job => job.status === 'open');
  const assigned = state.jobs.filter(job => job.status === 'assigned');
  const done = state.jobs.filter(job => job.status === 'done');
  const next = [...active].sort((a, b) => new Date(a.scheduled_at) - new Date(b.scheduled_at))[0];
  const values = [active.length, open.length, assigned.length, done.length];
  els.metrics.querySelectorAll('dd').forEach((node, index) => {
    if (index < 4) node.textContent = new Intl.NumberFormat('en-US').format(values[index]);
  });
  const nextBlock = els.metrics.querySelector('.next-stop');
  nextBlock.querySelector('dd').textContent = next ? timeFormat.format(new Date(next.scheduled_at)) : 'Clear';
  nextBlock.querySelector('span').textContent = next ? `${next.id} · ${next.title}` : 'No active calls';
}

function displayDay(date) {
  return dayKey(date) === dayKey(shiftDate) ? 'Today' : shortDayFormat.format(date);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]);
}

function render() {
  const query = state.query.trim().toLowerCase();
  const visible = state.jobs
    .filter(job => state.filter === 'all' || job.status !== 'done')
    .filter(job => Object.values(job).some(value => String(value ?? '').toLowerCase().includes(query)))
    .sort((a, b) => new Date(a.scheduled_at) - new Date(b.scheduled_at));
  const nextId = [...state.jobs].filter(job => job.status !== 'done').sort((a,b) => new Date(a.scheduled_at) - new Date(b.scheduled_at))[0]?.id;
  els.rows.innerHTML = visible.map(job => {
    const date = new Date(job.scheduled_at);
    const statusLabel = job.status[0].toUpperCase() + job.status.slice(1);
    const tech = job.technician || 'Unassigned';
    return `<tr class="${job.id === nextId ? 'is-next' : ''}">
      <td class="pipe-cell"><span class="time">${escapeHtml(timeFormat.format(date))}<small>${escapeHtml(displayDay(date))}</small></span></td>
      <td><span class="job-title">${escapeHtml(job.title)}</span><span class="job-id">${escapeHtml(job.id)}</span></td>
      <td><span>${escapeHtml(job.address)}</span></td>
      <td><span class="${job.technician ? '' : 'address'}">${escapeHtml(tech)}</span></td>
      <td><span class="status status-${escapeHtml(job.status)}">${escapeHtml(statusLabel)}</span></td>
      <td>${job.status === 'open' ? `<button class="row-action" type="button" data-assign="${escapeHtml(job.id)}">Assign tech</button>` : ''}</td>
    </tr>`;
  }).join('');
  els.empty.hidden = visible.length > 0;
  els.error.hidden = true;
  els.count.textContent = `${visible.length} ${visible.length === 1 ? 'work order' : 'work orders'} shown`;
  summarize();
}

function announce(message) {
  els.toast.textContent = message;
  els.toast.hidden = false;
  clearTimeout(announce.timer);
  announce.timer = setTimeout(() => { els.toast.hidden = true; }, 3500);
}

async function loadJobs() {
  els.refresh.disabled = true;
  els.error.hidden = true;
  try {
    const response = await fetch('fixtures/jobs.json', { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const jobs = await response.json();
    if (!Array.isArray(jobs)) throw new Error('Invalid job feed');
    state.jobs = jobs;
    render();
  } catch (error) {
    els.rows.innerHTML = '';
    els.empty.hidden = true;
    els.error.hidden = false;
    els.count.textContent = 'Job feed unavailable';
  } finally {
    els.refresh.disabled = false;
  }
}

els.search.addEventListener('input', event => { state.query = event.target.value; render(); });
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  state.filter = button.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(item => {
    const active = item === button;
    item.classList.toggle('is-active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  render();
}));
els.rows.addEventListener('click', event => {
  const button = event.target.closest('[data-assign]');
  if (!button) return;
  const job = state.jobs.find(item => item.id === button.dataset.assign);
  if (!job) return;
  job.technician = 'A. Singh';
  job.status = 'assigned';
  render();
  announce(`${job.id} assigned to A. Singh.`);
});
document.querySelector('#clear-filters').addEventListener('click', () => {
  state.query = ''; state.filter = 'active'; els.search.value = '';
  document.querySelectorAll('[data-filter]').forEach(item => {
    const active = item.dataset.filter === 'active'; item.classList.toggle('is-active', active); item.setAttribute('aria-pressed', String(active));
  });
  render(); els.search.focus();
});
document.querySelector('#retry').addEventListener('click', loadJobs);
els.refresh.addEventListener('click', async () => { await loadJobs(); announce('Job feed refreshed.'); });

loadJobs();
