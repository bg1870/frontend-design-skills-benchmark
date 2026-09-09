const state = { jobs: [], filter: 'all', query: '', selectedId: null };
const rows = document.querySelector('#jobRows');
const empty = document.querySelector('#empty');
const dialog = document.querySelector('#assignDialog');
const form = document.querySelector('#assignForm');

const fallbackJobs = [
  {id:'J-1041',title:'Water heater replacement',technician:'R. Okafor',address:'1188 Cedar Ln, Apt 3',scheduled_at:'2026-09-05T09:00:00-05:00',status:'done'},
  {id:'J-1042',title:'Kitchen sink backup',technician:'M. Duarte',address:'44 Halstead Ave',scheduled_at:'2026-09-07T13:30:00-05:00',status:'done'},
  {id:'J-1043',title:'Sump pump inspection',technician:'R. Okafor',address:'9 Wexford Ct',scheduled_at:'2026-09-08T08:15:00-05:00',status:'assigned'},
  {id:'J-1044',title:'Burst supply line, basement',technician:null,address:'2210 Marbury Rd',scheduled_at:'2026-09-08T11:00:00-05:00',status:'open'},
  {id:'J-1045',title:'Toilet reseat, unit 2B',technician:'T. Blanchard',address:'77 Iverson St',scheduled_at:'2026-09-09T15:45:00-05:00',status:'assigned'},
  {id:'J-1046',title:'Annual backflow test',technician:null,address:'501 Quarry Industrial Pk',scheduled_at:'2026-09-11T10:00:00-05:00',status:'open'}
];

const escapeHTML = value => String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const initials = name => name.split(/\s+/).map(part => part[0]).join('').replace('.','');
const dateParts = iso => {
  const date = new Date(iso);
  return {
    day: new Intl.DateTimeFormat('en-US',{weekday:'short',month:'short',day:'numeric',timeZone:'America/Chicago'}).format(date),
    time: new Intl.DateTimeFormat('en-US',{hour:'numeric',minute:'2-digit',timeZone:'America/Chicago'}).format(date)
  };
};

function updateSummary(){
  ['open','assigned','done'].forEach(status => document.querySelector(`#${status}Count`).textContent = state.jobs.filter(job => job.status === status).length);
}
function render(){
  const query = state.query.toLowerCase();
  const filtered = state.jobs.filter(job => (state.filter === 'all' || job.status === state.filter) && Object.values(job).join(' ').toLowerCase().includes(query));
  document.querySelector('#resultCount').textContent = `${filtered.length} ${filtered.length === 1 ? 'job' : 'jobs'}`;
  empty.hidden = filtered.length > 0;
  rows.innerHTML = filtered.map(job => {
    const when = dateParts(job.scheduled_at);
    const tech = job.technician ? `<div class="tech"><span class="avatar">${escapeHTML(initials(job.technician))}</span><span>${escapeHTML(job.technician)}</span></div>` : '<span class="unassigned">Unassigned</span>';
    const action = job.status === 'open' ? `<button class="action" data-assign="${escapeHTML(job.id)}">Assign</button>` : `<button class="action" data-view="${escapeHTML(job.id)}">View</button>`;
    return `<tr class="row-${job.status}">
      <td data-label="Job"><div class="job-cell"><i class="job-mark"></i><div><strong>${escapeHTML(job.title)}</strong><span class="job-id">${escapeHTML(job.id)}</span></div></div></td>
      <td data-label="Schedule" class="when"><strong>${when.day}</strong><span class="sub">${when.time}</span></td>
      <td data-label="Location">${escapeHTML(job.address)}</td><td data-label="Technician">${tech}</td>
      <td data-label="Status"><span class="status status-${job.status}">${job.status}</span></td><td>${action}</td></tr>`;
  }).join('');
}
async function loadJobs(showNotice = false){
  try { const response = await fetch('fixtures/jobs.json',{cache:'no-store'}); if(!response.ok) throw new Error(); state.jobs = await response.json(); }
  catch { state.jobs = structuredClone(fallbackJobs); }
  updateSummary(); render();
  if(showNotice) toast('Job queue refreshed');
}
function toast(message){ const el = document.querySelector('#toast'); el.textContent = message; el.classList.add('show'); clearTimeout(toast.timer); toast.timer = setTimeout(()=>el.classList.remove('show'),2400); }

document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  state.filter = button.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(item => { const on = item === button; item.classList.toggle('active',on); item.setAttribute('aria-pressed',on); });
  render();
}));
document.querySelector('#search').addEventListener('input', event => { state.query = event.target.value.trim(); render(); });
rows.addEventListener('click', event => {
  const assign = event.target.closest('[data-assign]');
  const view = event.target.closest('[data-view]');
  if(assign){ const job = state.jobs.find(item => item.id === assign.dataset.assign); state.selectedId = job.id; document.querySelector('#dialogTitle').textContent = job.title; document.querySelector('#dialogMeta').textContent = `${job.id} · ${job.address}`; dialog.showModal(); }
  if(view){ const job = state.jobs.find(item => item.id === view.dataset.view); toast(`${job.id} is ${job.status}`); }
});
form.addEventListener('submit', event => {
  if(event.submitter?.value === 'cancel') return;
  event.preventDefault(); const select = document.querySelector('#technician');
  if(!select.value){ select.focus(); return; }
  const job = state.jobs.find(item => item.id === state.selectedId); job.technician = select.value; job.status = 'assigned';
  dialog.close(); form.reset(); updateSummary(); render(); toast(`${job.id} assigned to ${job.technician}`);
});
document.querySelector('#refresh').addEventListener('click', async event => { event.currentTarget.classList.add('spinning'); await loadJobs(true); setTimeout(()=>event.currentTarget.classList.remove('spinning'),500); });
loadJobs();
