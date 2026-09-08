const state = { jobs: [], status: 'all', query: '', unassigned: false, sort: 'date' };

const icons = {
  heater: '<path d="M8 3h8v3H8zM7 6h10v15H7zM10 10h4M10 14h4"/>',
  pipe: '<path d="M5 4v5a3 3 0 0 0 3 3h8a3 3 0 0 1 3 3v5M2 4h6M16 20h6"/>',
  inspect: '<circle cx="10" cy="10" r="5"/><path d="m14 14 6 6"/>',
  toilet: '<path d="M6 3v7h11V3M7 14h10M8 10v2a7 7 0 0 0 7 7h2v2H9"/>',
  test: '<path d="M9 3h6v4l3 5a6 6 0 1 1-12 0l3-5Z"/><path d="M7 14h10"/>'
};

function jobIcon(title) {
  const s = title.toLowerCase();
  if (s.includes('heater')) return icons.heater;
  if (s.includes('inspection')) return icons.inspect;
  if (s.includes('toilet')) return icons.toilet;
  if (s.includes('test')) return icons.test;
  return icons.pipe;
}

function scheduleParts(value) {
  const d = new Date(value);
  const date = new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'America/Chicago' }).format(d);
  const time = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'America/Chicago' }).format(d);
  return { date, time };
}

function render() {
  const counts = state.jobs.reduce((a, j) => (a[j.status]++, a), { open: 0, assigned: 0, done: 0 });
  document.querySelector('#totalCount').textContent = state.jobs.length;
  document.querySelector('#openCount').textContent = counts.open;
  document.querySelector('#assignedCount').textContent = counts.assigned;
  document.querySelector('#doneCount').textContent = counts.done;
  document.querySelector('#tabAll').textContent = state.jobs.length;
  document.querySelector('#tabOpen').textContent = counts.open;
  document.querySelector('#tabAssigned').textContent = counts.assigned;
  document.querySelector('#tabDone').textContent = counts.done;

  let jobs = state.jobs.filter(j => state.status === 'all' || j.status === state.status);
  if (state.unassigned) jobs = jobs.filter(j => !j.technician);
  const q = state.query.trim().toLowerCase();
  if (q) jobs = jobs.filter(j => [j.id, j.title, j.address, j.technician].some(v => v && v.toLowerCase().includes(q)));
  jobs.sort((a,b) => state.sort === 'date' ? new Date(a.scheduled_at) - new Date(b.scheduled_at) : state.sort === 'title' ? a.title.localeCompare(b.title) : a.status.localeCompare(b.status));

  const body = document.querySelector('#jobRows');
  body.innerHTML = jobs.length ? jobs.map(j => {
    const when = scheduleParts(j.scheduled_at);
    const person = j.technician ? `<span class="person-avatar ${j.technician.charCodeAt(0)%3}">${j.technician.split(' ').map(x=>x[0]).join('')}</span><strong>${j.technician}</strong>` : '<span class="unassigned-icon">+</span><strong class="unassigned">Unassigned</strong>';
    const label = j.status === 'done' ? 'Completed' : j.status[0].toUpperCase() + j.status.slice(1);
    return `<tr><td><div class="job-cell"><span class="job-icon"><svg viewBox="0 0 24 24">${jobIcon(j.title)}</svg></span><div><strong>${j.title}</strong><span>${j.id} <i>•</i> ${j.address}</span></div></div></td><td><div class="schedule"><strong>${when.date}</strong><span>${when.time}</span></div></td><td><div class="person">${person}</div></td><td><span class="status ${j.status}"><i></i>${label}</span></td><td><button class="more" aria-label="Options for ${j.id}">•••</button></td></tr>`;
  }).join('') : '<tr><td colspan="5" class="empty">No jobs match your filters.</td></tr>';
  document.querySelector('#resultCount').textContent = `Showing ${jobs.length} of ${state.jobs.length} jobs`;
  document.querySelector('#filterBadge').textContent = state.unassigned ? '1' : '';
  document.querySelector('#filterBtn').classList.toggle('selected', state.unassigned);
}

fetch('fixtures/jobs.json').then(r => { if (!r.ok) throw Error(); return r.json(); }).then(data => { state.jobs = data; render(); }).catch(() => {
  document.querySelector('#jobRows').innerHTML = '<tr><td colspan="5" class="empty">Unable to load jobs. Run this page from a local web server.</td></tr>';
});

document.querySelectorAll('.tab').forEach(tab => tab.addEventListener('click', () => {
  document.querySelector('.tab.active').classList.remove('active'); tab.classList.add('active'); state.status = tab.dataset.status; render();
}));
document.querySelector('#search').addEventListener('input', e => { state.query = e.target.value; render(); });
document.querySelector('#sort').addEventListener('change', e => { state.sort = e.target.value; render(); });
document.querySelector('#filterBtn').addEventListener('click', () => { state.unassigned = !state.unassigned; render(); });
document.querySelector('#newJob').addEventListener('click', () => { const t=document.querySelector('#toast'); t.classList.add('show'); setTimeout(()=>t.classList.remove('show'),2200); });
document.addEventListener('keydown', e => { if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); document.querySelector('#search').focus(); } });
