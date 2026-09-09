const state = { jobs: [], filter: 'all', query: '', sort: 'time', selected: null };
const $ = (id) => document.getElementById(id);
const fmtDay = new Intl.DateTimeFormat('en-US', { weekday: 'short' });
const fmtMonth = new Intl.DateTimeFormat('en-US', { month: 'short' });
const fmtTime = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' });
const fmtFull = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

async function loadJobs() {
  $('refresh').classList.add('loading');
  try {
    const response = await fetch('fixtures/jobs.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('Unable to load job data');
    state.jobs = await response.json();
    updateSummary(); render();
  } catch (error) {
    $('job-list').innerHTML = `<div class="empty"><strong>Job data is unavailable</strong><span>Serve this folder over HTTP and refresh the board.</span></div>`;
  } finally { $('refresh').classList.remove('loading'); }
}

function counts() {
  return state.jobs.reduce((a, j) => (a[j.status]++, a), { open: 0, assigned: 0, done: 0 });
}
function updateSummary() {
  const c = counts();
  ['open','assigned','done'].forEach(s => { $(`${s}-count`).textContent=c[s]; $(`${s}-chip`).textContent=c[s]; });
  $('all-chip').textContent = state.jobs.length;
  const dates = state.jobs.map(j => new Date(j.scheduled_at)).sort((a,b)=>a-b);
  if (dates.length) $('board-date').textContent = `${fmtFull.format(dates[0])} — ${fmtMonth.format(dates.at(-1))} ${dates.at(-1).getDate()}`;
  const next = state.jobs.filter(j=>j.status==='open').sort((a,b)=>new Date(a.scheduled_at)-new Date(b.scheduled_at))[0];
  $('next-time').textContent = next ? fmtTime.format(new Date(next.scheduled_at)) : 'Queue clear';
  $('next-title').textContent = next ? `${next.id} · ${next.title}` : 'No unassigned work orders';
}
function label(status){ return status === 'open' ? 'Needs dispatch' : status === 'done' ? 'Completed' : 'Assigned'; }
function render() {
  let jobs = state.jobs.filter(j => state.filter==='all' || j.status===state.filter).filter(j => Object.values(j).join(' ').toLowerCase().includes(state.query));
  const priority = {open:0,assigned:1,done:2};
  jobs.sort((a,b) => state.sort==='status' ? priority[a.status]-priority[b.status] || new Date(a.scheduled_at)-new Date(b.scheduled_at) : state.sort==='tech' ? (a.technician||'zzz').localeCompare(b.technician||'zzz') : new Date(a.scheduled_at)-new Date(b.scheduled_at));
  $('result-count').textContent = `/${jobs.length}`;
  $('empty').hidden = jobs.length > 0;
  $('job-list').innerHTML = jobs.map(j => {
    const d = new Date(j.scheduled_at);
    return `<button class="job" data-id="${j.id}" aria-label="View ${j.id}, ${j.title}">
      <span class="schedule"><span class="date-box"><strong>${d.getDate()}</strong><span>${fmtDay.format(d)}</span></span><span class="job-title"><strong>${j.title}</strong><span>${j.id} · ${fmtTime.format(d)}</span></span></span>
      <span class="location"><strong>${j.address.split(',')[0]}</strong><span>${j.address.includes(',') ? j.address.split(',').slice(1).join(',').trim() : 'Service address'}</span></span>
      <span class="technician"><strong class="${j.technician?'':'unassigned'}">${j.technician || 'Unassigned'}</strong><span>${j.technician ? 'Service technician' : 'Action required'}</span></span>
      <span class="status ${j.status}">${label(j.status)}</span><span class="chevron" aria-hidden="true">›</span></button>`;
  }).join('');
  document.querySelectorAll('.job').forEach(el => el.addEventListener('click', () => showJob(el.dataset.id)));
}
function showJob(id) {
  const j = state.jobs.find(x=>x.id===id); state.selected=j;
  const d = new Date(j.scheduled_at);
  $('dialog-content').innerHTML = `<h3 id="dialog-title" class="detail-title">${j.title}</h3><span class="status ${j.status}">${label(j.status)}</span><div class="detail-grid"><div><label>Work order</label><strong>${j.id}</strong></div><div><label>Scheduled</label><strong>${fmtMonth.format(d)} ${d.getDate()} · ${fmtTime.format(d)}</strong></div><div><label>Service address</label><strong>${j.address}</strong></div><div><label>Technician</label><strong>${j.technician || 'Unassigned'}</strong></div></div>`;
  const action=$('advance-job'); action.hidden=j.status==='done'; action.textContent=j.status==='open'?'Assign technician':'Mark completed';
  $('job-dialog').showModal();
}
document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(b=>{b.classList.toggle('active',b===btn);b.setAttribute('aria-pressed',b===btn)});state.filter=btn.dataset.filter;render()}));
$('search').addEventListener('input',e=>{state.query=e.target.value.trim().toLowerCase();render()});
$('sort').addEventListener('change',e=>{state.sort=e.target.value;render()});
$('refresh').addEventListener('click',loadJobs);
$('advance-job').addEventListener('click',()=>{ if(!state.selected)return; if(state.selected.status==='open'){state.selected.status='assigned';state.selected.technician='Dispatch pending';}else state.selected.status='done'; updateSummary();render(); });
loadJobs();