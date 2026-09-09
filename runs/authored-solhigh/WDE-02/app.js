const state = { jobs: [], filter: 'all', query: '', ascending: true };
const TODAY = '2026-09-08';

const $ = (selector) => document.querySelector(selector);
const format = new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'America/Chicago' });
const timeFormat = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'America/Chicago' });
const icons = {
  pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>'
};

function safe(value) {
  const node = document.createElement('span');
  node.textContent = value ?? '';
  return node.innerHTML;
}

function initials(name) {
  return name ? name.split(/\s+/).map(part => part[0]).join('').slice(0, 2) : '—';
}

function localDateParts(iso) {
  const datePart = iso.slice(0, 10);
  const date = new Date(`${datePart}T12:00:00`);
  return {
    datePart,
    day: date.toLocaleDateString('en-US', { day: '2-digit' }),
    month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
    label: format.format(date),
    time: timeFormat.format(new Date(iso))
  };
}

function renderSummary() {
  const open = state.jobs.filter(job => job.status === 'open').length;
  const assigned = state.jobs.filter(job => job.status === 'assigned').length;
  const done = state.jobs.filter(job => job.status === 'done').length;
  const unassigned = state.jobs.filter(job => !job.technician).length;
  const today = state.jobs.filter(job => job.scheduled_at.startsWith(TODAY)).length;
  $('#active-count').textContent = open + assigned;
  $('#active-note').textContent = `${today} scheduled today`;
  $('#assigned-count').textContent = assigned;
  $('#assigned-note').textContent = assigned === 1 ? 'Technician en route' : 'Technicians scheduled';
  $('#unassigned-count').textContent = unassigned;
  $('#unassigned-note').textContent = unassigned ? 'Needs attention' : 'Queue covered';
  $('#done-count').textContent = done;
  $('#all-filter-count').textContent = state.jobs.length;
  $('#open-filter-count').textContent = open;
  $('#assigned-filter-count').textContent = assigned;
  $('#done-filter-count').textContent = done;
}

function visibleJobs() {
  const query = state.query.toLowerCase();
  return state.jobs
    .filter(job => state.filter === 'all' || job.status === state.filter)
    .filter(job => [job.id, job.title, job.address, job.technician || 'unassigned'].some(value => value.toLowerCase().includes(query)))
    .sort((a, b) => (a.scheduled_at.localeCompare(b.scheduled_at)) * (state.ascending ? 1 : -1));
}

function jobMarkup(job) {
  const date = localDateParts(job.scheduled_at);
  const today = date.datePart === TODAY;
  const tech = job.technician
    ? `<div class="technician"><span class="tech-mark">${safe(initials(job.technician))}</span><div><strong>${safe(job.technician)}</strong><p>Field technician</p></div></div>`
    : '<div class="technician unassigned"><span class="tech-mark">!</span><div><strong>Unassigned</strong><p>Assign technician</p></div></div>';
  return `<article class="job-row${today ? ' today' : ''}" data-id="${safe(job.id)}">
    <div class="schedule" aria-label="${safe(date.label)}, ${safe(date.time)}">
      <div class="date-tile">${date.month}<strong>${date.day}</strong></div>
      <div class="time">${safe(date.time)}${today ? '<small>Today</small>' : ''}</div>
    </div>
    <div class="job-main"><h3>${safe(job.title)}</h3><p>${icons.pin}${safe(job.address)} · ${safe(job.id)}</p></div>
    ${tech}
    <span class="status status-${safe(job.status)}">${job.status === 'done' ? 'Completed' : safe(job.status)}</span>
    <button class="row-menu" aria-label="More options for ${safe(job.id)}" title="More options">···</button>
  </article>`;
}

function renderJobs() {
  const jobs = visibleJobs();
  $('#job-list').innerHTML = jobs.map(jobMarkup).join('');
  $('#empty-state').hidden = jobs.length !== 0;
  $('#showing-count').textContent = `Showing ${jobs.length} of ${state.jobs.length} jobs`;
  document.querySelectorAll('.row-menu').forEach(button => button.addEventListener('click', () => {
    const job = state.jobs.find(item => item.id === button.closest('.job-row').dataset.id);
    alert(`${job.id} · ${job.title}\n${job.technician || 'Unassigned'} · ${job.status}`);
  }));
}

async function loadJobs() {
  $('#error-state').hidden = true;
  try {
    const response = await fetch('fixtures/jobs.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    state.jobs = await response.json();
    renderSummary();
    renderJobs();
  } catch (error) {
    console.error(error);
    $('#job-list').innerHTML = '';
    $('#empty-state').hidden = true;
    $('#error-state').hidden = false;
    $('#showing-count').textContent = 'Queue unavailable';
  }
}

document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  state.filter = button.dataset.filter;
  document.querySelectorAll('.filter').forEach(item => item.classList.toggle('selected', item === button));
  renderJobs();
}));

$('#search').addEventListener('input', event => { state.query = event.target.value.trim(); renderJobs(); });
$('#sort-button').addEventListener('click', () => {
  state.ascending = !state.ascending;
  $('#sort-button').firstChild.textContent = state.ascending ? 'Scheduled time ' : 'Scheduled time (latest) ';
  renderJobs();
});
$('#new-job').addEventListener('click', () => $('#job-dialog').showModal());
$('#retry').addEventListener('click', loadJobs);

loadJobs();
