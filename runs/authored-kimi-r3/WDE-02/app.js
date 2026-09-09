const state = { jobs: [], filter: 'all', query: '', ascending: true };
const $ = (selector) => document.querySelector(selector);

const icons = {
  job: `<svg viewBox="0 0 24 24"><path d="M14.5 6.5a4 4 0 0 0-5 5L4 17l3 3 5.5-5.5a4 4 0 0 0 5-5l-2.5 2.5-3-3 2.5-2.5Z"/></svg>`,
  pin: `<svg viewBox="0 0 24 24"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>`
};

function initials(name) { return name.split(/\s+/).map(n => n[0]).join('').replace('.', '').slice(0, 2); }
function formatDate(value) {
  const date = new Date(value);
  return {
    day: new Intl.DateTimeFormat('en-US', { weekday:'short', month:'short', day:'numeric', timeZone:'America/Chicago' }).format(date),
    time: new Intl.DateTimeFormat('en-US', { hour:'numeric', minute:'2-digit', timeZone:'America/Chicago' }).format(date)
  };
}
function escapeHTML(value) { const div = document.createElement('div'); div.textContent = value; return div.innerHTML; }
function render() {
  let jobs = state.jobs.filter(j => (state.filter === 'all' || j.status === state.filter) &&
    [j.id,j.title,j.address,j.technician || ''].join(' ').toLowerCase().includes(state.query));
  jobs.sort((a,b) => (new Date(a.scheduled_at)-new Date(b.scheduled_at)) * (state.ascending ? 1 : -1));
  $('#jobRows').innerHTML = jobs.map(job => {
    const date = formatDate(job.scheduled_at), tech = job.technician;
    return `<tr><td><div class="job-title"><span class="job-icon">${icons.job}</span><div><strong>${escapeHTML(job.title)}</strong><small>${escapeHTML(job.id)}</small></div></div></td>
      <td><span class="address">${icons.pin}${escapeHTML(job.address)}</span></td>
      <td><span class="scheduled"><strong>${date.day}</strong><small>${date.time}</small></span></td>
      <td>${tech ? `<span class="tech"><i class="tech-avatar">${initials(tech)}</i><span><strong>${escapeHTML(tech)}</strong><small>Service technician</small></span></span>` : '<span class="unassigned">Not assigned</span>'}</td>
      <td><span class="status status-${job.status}">${job.status === 'open' ? 'Needs assignment' : job.status === 'done' ? 'Completed' : 'Assigned'}</span></td>
      <td><button class="more" aria-label="More options for ${escapeHTML(job.id)}">•••</button></td></tr>`;
  }).join('');
  $('#empty').hidden = jobs.length > 0;
  $('#showing').textContent = `Showing ${jobs.length} of ${state.jobs.length} jobs`;
}
function setCounts() {
  const counts = {open:0,assigned:0,done:0}; state.jobs.forEach(j => counts[j.status]++);
  $('#totalCount').textContent = $('#tabAll').textContent = state.jobs.length;
  ['open','assigned','done'].forEach(k => { $(`#${k}Count`).textContent = counts[k]; $(`#tab${k[0].toUpperCase()+k.slice(1)}`).textContent = counts[k]; });
}
fetch('fixtures/jobs.json').then(r => { if(!r.ok) throw Error(); return r.json(); }).then(jobs => { state.jobs=jobs; setCounts(); render(); }).catch(() => { $('#empty').hidden=false; $('#empty strong').textContent='Unable to load jobs'; $('#empty span').textContent='Check the data source and refresh the page.'; });
document.querySelectorAll('.tabs button').forEach(button => button.addEventListener('click', () => { document.querySelector('.tabs .active').classList.remove('active'); button.classList.add('active'); state.filter=button.dataset.filter; render(); }));
$('#search').addEventListener('input', e => { state.query=e.target.value.trim().toLowerCase(); render(); });
$('#sortBtn').addEventListener('click', () => { state.ascending=!state.ascending; $('#sortBtn span').textContent=state.ascending?'↑':'↓'; render(); });
$('#newJob').addEventListener('click', () => { const toast=$('#toast'); toast.classList.add('show'); setTimeout(()=>toast.classList.remove('show'),2200); });