const state = { jobs: [], filter: 'all', query: '', sort: 'scheduled' };
const el = id => document.getElementById(id);
const fmtDate = new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: '2-digit' });
const fmtTime = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' });

function updateClock() {
  el('clock').textContent = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(new Date());
}
setInterval(updateClock, 1000); updateClock();

function escapeHTML(value) {
  return String(value).replace(/[&<>'"]/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' })[char]);
}

function summary() {
  const count = status => state.jobs.filter(job => job.status === status).length;
  const open = count('open'), assigned = count('assigned'), done = count('done'), total = state.jobs.length;
  el('openCount').textContent = open;
  el('assignedCount').textContent = assigned;
  el('doneCount').textContent = done;
  el('totalCount').textContent = total;
  el('completion').textContent = `${total ? Math.round(done / total * 100) : 0}% of queue`;
  const active = new Set(state.jobs.filter(j => j.status === 'assigned' && j.technician).map(j => j.technician)).size;
  el('activeTechs').textContent = `${active} technician${active === 1 ? '' : 's'} active`;
  const next = state.jobs.filter(j => j.status === 'open').sort((a,b) => new Date(a.scheduled_at) - new Date(b.scheduled_at))[0];
  el('nextOpen').textContent = next ? `${next.id} · ${fmtTime.format(new Date(next.scheduled_at))}` : 'Queue is covered';
  ['all','open','assigned','done'].forEach(s => el(`tab${s[0].toUpperCase()+s.slice(1)}`).textContent = s === 'all' ? total : count(s));
}

function visibleJobs() {
  const q = state.query.toLowerCase();
  const order = { open: 0, assigned: 1, done: 2 };
  return state.jobs.filter(j => (state.filter === 'all' || j.status === state.filter) &&
    [j.id,j.title,j.address,j.technician || 'unassigned'].some(v => v.toLowerCase().includes(q)))
    .sort((a,b) => state.sort === 'scheduled' ? new Date(a.scheduled_at)-new Date(b.scheduled_at) :
      state.sort === 'status' ? order[a.status]-order[b.status] : a.title.localeCompare(b.title));
}

function render() {
  summary();
  const jobs = visibleJobs();
  el('jobRows').innerHTML = jobs.map(job => {
    const date = new Date(job.scheduled_at);
    const action = job.status === 'open' ? 'Dispatch' : job.status === 'assigned' ? 'Mark done' : 'Details';
    return `<tr class="${job.status}">
      <td><div class="job-title">${escapeHTML(job.title)}</div><div class="job-id">${escapeHTML(job.id)}</div></td>
      <td class="address">${escapeHTML(job.address)}</td>
      <td class="date"><strong>${fmtDate.format(date)}</strong><span>${fmtTime.format(date)}</span></td>
      <td class="tech ${job.technician ? '' : 'unassigned'}">${escapeHTML(job.technician || 'Unassigned')}</td>
      <td><span class="status status-${job.status}">${job.status}</span></td>
      <td><button class="row-action" data-id="${escapeHTML(job.id)}">${action}</button></td>
    </tr>`;
  }).join('');
  el('empty').hidden = jobs.length > 0;
  el('showing').textContent = `Showing ${jobs.length} of ${state.jobs.length} jobs`;
}

async function loadJobs() {
  el('loading').hidden = false;
  try {
    const response = await fetch('fixtures/jobs.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('Unable to load fixture');
    state.jobs = await response.json();
    render();
  } catch (error) {
    el('loading').textContent = 'Could not load jobs.json — serve this folder over HTTP.';
    return;
  }
  el('loading').hidden = true;
}

el('tabs').addEventListener('click', event => {
  const button = event.target.closest('button[data-status]');
  if (!button) return;
  state.filter = button.dataset.status;
  document.querySelectorAll('.tabs button').forEach(b => b.classList.toggle('active', b === button));
  render();
});
el('search').addEventListener('input', event => { state.query = event.target.value.trim(); render(); });
el('sort').addEventListener('change', event => { state.sort = event.target.value; render(); });
el('refresh').addEventListener('click', loadJobs);

function toast(message) {
  el('toast').textContent = message;
  el('toast').classList.add('show');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el('toast').classList.remove('show'), 2200);
}

el('jobRows').addEventListener('click', event => {
  const button = event.target.closest('[data-id]');
  if (!button) return;
  const job = state.jobs.find(j => j.id === button.dataset.id);
  if (job.status === 'open') { job.status = 'assigned'; job.technician = 'M. Duarte'; toast(`${job.id} dispatched to M. Duarte`); }
  else if (job.status === 'assigned') { job.status = 'done'; toast(`${job.id} marked complete`); }
  else { toast(`${job.id} · ${job.title} · ${job.technician || 'Unassigned'}`); }
  render();
});

const dialog = el('jobDialog');
el('newJob').addEventListener('click', () => { el('jobForm').reset(); el('formError').textContent = ''; dialog.showModal(); });
el('jobForm').addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const title = data.get('title').trim(), address = data.get('address').trim(), scheduled = data.get('scheduled');
  if (!title || !address || !scheduled) { el('formError').textContent = 'Complete each required field.'; return; }
  const technician = data.get('technician') || null;
  const maxId = Math.max(...state.jobs.map(j => Number(j.id.split('-')[1])), 1040) + 1;
  state.jobs.push({ id: `J-${maxId}`, title, address, scheduled_at: new Date(scheduled).toISOString(), technician, status: technician ? 'assigned' : 'open' });
  dialog.close(); render(); toast(`J-${maxId} added to queue`);
});
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });

loadJobs();
