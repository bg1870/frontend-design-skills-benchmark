const state = { jobs: [], filter: 'all', query: '', sort: 'soonest', selectedId: null };
const TODAY = '2026-09-09';
const els = {
  rows: document.querySelector('#jobRows'), loading: document.querySelector('#loadingState'),
  error: document.querySelector('#errorState'), empty: document.querySelector('#emptyState'),
  count: document.querySelector('#resultCount'), subtitle: document.querySelector('#queueSubtitle'),
  dialog: document.querySelector('#assignDialog'), form: document.querySelector('#assignForm'),
  tech: document.querySelector('#technicianSelect'), toast: document.querySelector('#toast')
};

const esc = value => String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const initials = name => name.split(/\s+/).map(x => x.replace('.', '')[0]).join('').slice(0,2).toUpperCase();
const jobNumber = id => id.replace('J-', '').slice(-2);
const formatDate = iso => {
  const date = new Date(iso), key = iso.slice(0,10);
  const day = key === TODAY ? `Today <span class="today-tag">Today</span>` : new Intl.DateTimeFormat('en-US',{weekday:'short',month:'short',day:'numeric'}).format(date);
  const time = new Intl.DateTimeFormat('en-US',{hour:'numeric',minute:'2-digit',timeZone:'America/Chicago'}).format(date);
  return `<div class="date"><strong>${day}</strong><span class="sub">${time} CT</span></div>`;
};

async function loadJobs() {
  els.loading.hidden = false; els.error.hidden = true; els.rows.innerHTML = '';
  try {
    const response = await fetch('fixtures/jobs.json', {cache:'no-store'});
    if (!response.ok) throw new Error(response.statusText);
    state.jobs = await response.json();
    updateCounts(); render();
  } catch (error) { els.error.hidden = false; }
  finally { els.loading.hidden = true; }
}
function updateCounts() {
  ['all','open','assigned','done'].forEach(status => {
    const count = status === 'all' ? state.jobs.length : state.jobs.filter(j => j.status === status).length;
    document.querySelector(`#${status}Count`).textContent = count;
  });
}
function visibleJobs() {
  let jobs = state.jobs.filter(j => state.filter === 'all' || j.status === state.filter)
    .filter(j => `${j.id} ${j.title} ${j.address} ${j.technician || ''}`.toLowerCase().includes(state.query));
  const rank = {open:0, assigned:1, done:2};
  return jobs.sort((a,b) => state.sort === 'latest' ? new Date(b.scheduled_at)-new Date(a.scheduled_at) : state.sort === 'status' ? rank[a.status]-rank[b.status] : new Date(a.scheduled_at)-new Date(b.scheduled_at));
}
function render() {
  const jobs = visibleJobs();
  els.rows.innerHTML = jobs.map(job => `<tr>
    <td><div class="job-cell"><span class="job-index">${jobNumber(job.id)}</span><div class="job-main"><strong>${esc(job.title)}</strong><span class="sub"><span class="job-id">${esc(job.id)}</span>${esc(job.address)}</span></div></div></td>
    <td>${formatDate(job.scheduled_at)}</td>
    <td>${job.technician ? `<div class="tech"><span class="avatar">${initials(job.technician)}</span><span>${esc(job.technician)}</span></div>` : '<span class="unassigned">Unassigned</span>'}</td>
    <td><span class="status status-${job.status}">${job.status}</span></td>
    <td>${job.status === 'open' ? `<button class="row-action" data-assign="${esc(job.id)}">Assign</button>` : job.status === 'assigned' ? `<button class="row-action" data-assign="${esc(job.id)}">Reassign</button>` : '<span class="completed-mark">Closed</span>'}</td>
  </tr>`).join('');
  els.empty.hidden = jobs.length > 0 || !state.jobs.length;
  els.count.textContent = `Showing ${jobs.length} ${jobs.length === 1 ? 'job' : 'jobs'}`;
  document.querySelectorAll('[data-assign]').forEach(button => button.addEventListener('click', () => openAssign(button.dataset.assign)));
}
function openAssign(id) {
  const job = state.jobs.find(j => j.id === id); state.selectedId = id;
  document.querySelector('#dialogTitle').textContent = job.title;
  document.querySelector('#dialogAddress').textContent = `${job.id} · ${job.address}`;
  els.tech.value = job.technician || ''; els.dialog.showModal();
}
function showToast(message) { els.toast.textContent = message; els.toast.classList.add('show'); setTimeout(() => els.toast.classList.remove('show'), 2600); }

document.querySelectorAll('.metric').forEach(button => button.addEventListener('click', () => {
  state.filter = button.dataset.filter;
  document.querySelectorAll('.metric').forEach(x => x.classList.toggle('active', x === button)); render();
}));
document.querySelector('#searchInput').addEventListener('input', e => { state.query = e.target.value.trim().toLowerCase(); render(); });
document.querySelector('#sortSelect').addEventListener('change', e => { state.sort = e.target.value; render(); });
document.querySelector('#clearFilters').addEventListener('click', () => { state.filter='all'; state.query=''; document.querySelector('#searchInput').value=''; document.querySelectorAll('.metric').forEach(x=>x.classList.toggle('active',x.dataset.filter==='all')); render(); });
els.form.addEventListener('submit', e => { e.preventDefault(); if (!els.tech.value) return; const job=state.jobs.find(j=>j.id===state.selectedId); job.technician=els.tech.value; job.status='assigned'; els.dialog.close(); updateCounts(); render(); showToast(`${job.id} assigned to ${job.technician}`); });
document.querySelector('#retryButton').addEventListener('click', loadJobs);
document.querySelectorAll('[data-close-dialog]').forEach(button => button.addEventListener('click', () => els.dialog.close()));
document.querySelector('#refreshButton').addEventListener('click', async () => { await loadJobs(); showToast('Queue refreshed'); });
loadJobs();
