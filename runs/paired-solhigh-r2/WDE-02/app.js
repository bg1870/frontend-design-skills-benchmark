const TIME_ZONE = 'America/Chicago';
const list = document.querySelector('#job-list');
const empty = document.querySelector('#empty-state');
let jobs = [];

const dateFmt = new Intl.DateTimeFormat('en-US', { timeZone: TIME_ZONE, month: 'short', day: 'numeric' });
const timeFmt = new Intl.DateTimeFormat('en-US', { timeZone: TIME_ZONE, hour: 'numeric', minute: '2-digit' });
const dayFmt = new Intl.DateTimeFormat('en-US', { timeZone: TIME_ZONE, weekday: 'long', month: 'long', day: 'numeric' });
const clockFmt = new Intl.DateTimeFormat('en-US', { timeZone: TIME_ZONE, hour: 'numeric', minute: '2-digit', second: '2-digit' });

function updateClock() {
  const now = new Date();
  document.querySelector('#day-label').textContent = dayFmt.format(now);
  const clock = document.querySelector('#current-time');
  clock.textContent = clockFmt.format(now);
  clock.dateTime = now.toISOString();
}

function initials(name) { return name.split(/\s+/).map(part => part.replace('.', '')[0]).join('').slice(0, 2); }
function esc(value) { const node = document.createElement('span'); node.textContent = value; return node.innerHTML; }

function jobMarkup(job) {
  const date = new Date(job.scheduled_at);
  const technician = job.technician
    ? `<div class="tech"><span class="avatar" aria-hidden="true">${esc(initials(job.technician))}</span><span>${esc(job.technician)}</span></div>`
    : '<div class="tech unassigned"><span>Needs technician</span></div>';
  const statusLabel = { open: 'Unassigned', assigned: 'Assigned', done: 'Complete' }[job.status] || job.status;
  return `<article class="job" data-status="${esc(job.status)}">
    <div class="job-time"><time datetime="${esc(job.scheduled_at)}">${dateFmt.format(date)}</time><span>${timeFmt.format(date)}</span></div>
    <div class="job-details"><div class="job-title">${esc(job.title)} <span class="job-id">${esc(job.id)}</span></div><div class="address">${esc(job.address)}</div></div>
    ${technician}<span class="status status-${esc(job.status)}">${esc(statusLabel)}</span>
  </article>`;
}

function render(filter = 'all') {
  const visible = filter === 'all' ? jobs : jobs.filter(job => job.status === filter);
  list.innerHTML = visible.map(jobMarkup).join('');
  list.hidden = !visible.length;
  empty.hidden = !!visible.length;
  list.setAttribute('aria-busy', 'false');
}

function updateSummary() {
  document.querySelector('#total-count').textContent = jobs.length;
  document.querySelector('#filter-all').textContent = jobs.length;
  ['open', 'assigned', 'done'].forEach(status => {
    document.querySelector(`#${status}-count`).textContent = jobs.filter(job => job.status === status).length;
  });
}

document.querySelector('.filters').addEventListener('click', event => {
  const button = event.target.closest('button[data-filter]');
  if (!button) return;
  document.querySelectorAll('.filter').forEach(item => { item.classList.toggle('active', item === button); item.setAttribute('aria-pressed', item === button); });
  const url = new URL(window.location);
  if (button.dataset.filter === 'all') url.searchParams.delete('status');
  else url.searchParams.set('status', button.dataset.filter);
  history.replaceState({}, '', url);
  render(button.dataset.filter);
});

async function loadJobs() {
  try {
    const response = await fetch('fixtures/jobs.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    jobs = (await response.json()).sort((a, b) => new Date(a.scheduled_at) - new Date(b.scheduled_at));
    updateSummary();
    const requested = new URLSearchParams(location.search).get('status');
    const filter = ['open', 'assigned', 'done'].includes(requested) ? requested : 'all';
    document.querySelectorAll('.filter').forEach(item => {
      const active = item.dataset.filter === filter;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', active);
    });
    render(filter);
  } catch (error) {
    list.setAttribute('aria-busy', 'false');
    list.innerHTML = '<div class="empty"><strong>Queue could not be loaded</strong><span>Serve this directory over HTTP and reload the page.</span></div>';
    console.error('Failed to load fixtures/jobs.json', error);
  }
}

updateClock();
setInterval(updateClock, 1000);
loadJobs();
