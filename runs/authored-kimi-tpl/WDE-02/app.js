const fallbackJobs = [
  {id:'J-1041',title:'Water heater replacement',technician:'R. Okafor',address:'1188 Cedar Ln, Apt 3',scheduled_at:'2026-09-05T09:00:00-05:00',status:'done'},
  {id:'J-1042',title:'Kitchen sink backup',technician:'M. Duarte',address:'44 Halstead Ave',scheduled_at:'2026-09-07T13:30:00-05:00',status:'done'},
  {id:'J-1043',title:'Sump pump inspection',technician:'R. Okafor',address:'9 Wexford Ct',scheduled_at:'2026-09-08T08:15:00-05:00',status:'assigned'},
  {id:'J-1044',title:'Burst supply line, basement',technician:null,address:'2210 Marbury Rd',scheduled_at:'2026-09-08T11:00:00-05:00',status:'open'},
  {id:'J-1045',title:'Toilet reseat, unit 2B',technician:'T. Blanchard',address:'77 Iverson St',scheduled_at:'2026-09-09T15:45:00-05:00',status:'assigned'},
  {id:'J-1046',title:'Annual backflow test',technician:null,address:'501 Quarry Industrial Pk',scheduled_at:'2026-09-11T10:00:00-05:00',status:'open'}
];
let jobs = [], filter = 'all', query = '';
const queue = document.querySelector('#queue');
const empty = document.querySelector('#empty');
const dialog = document.querySelector('#jobDialog');
const dateFmt = new Intl.DateTimeFormat('en-US',{weekday:'short',month:'short',day:'2-digit'});
const timeFmt = new Intl.DateTimeFormat('en-US',{hour:'numeric',minute:'2-digit'});

function text(value){return String(value).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
function render(){
  const visible=jobs.filter(j=>(filter==='all'||j.status===filter)&&[j.id,j.title,j.address,j.technician||'unassigned'].join(' ').toLowerCase().includes(query));
  queue.innerHTML=visible.map(j=>{const d=new Date(j.scheduled_at);return `<article class="job" tabindex="0" role="button" data-id="${j.id}" aria-label="Open ${text(j.id)} ${text(j.title)}">
    <div><div class="job-id">${text(j.id)}</div></div>
    <div><div class="job-title">${text(j.title)}</div><div class="address">${text(j.address)}</div></div>
    <div class="job-location"><div class="meta-label">LOCATION</div><div class="address">${text(j.address)}</div></div>
    <div class="job-tech"><div class="meta-label">TECHNICIAN</div><div class="tech">${text(j.technician||'Awaiting assignment')}</div></div>
    <div class="when"><strong>${timeFmt.format(d)}</strong><small>${dateFmt.format(d).toUpperCase()}</small></div>
    <div class="job-status"><span class="status ${j.status}">${j.status}</span></div><div class="job-arrow">›</div></article>`}).join('');
  empty.hidden=visible.length>0;
}
function openJob(id){const j=jobs.find(x=>x.id===id),d=new Date(j.scheduled_at);document.querySelector('#dialogTitle').textContent=j.title;document.querySelector('#dialogDetails').innerHTML=`<dt>WORK ORDER</dt><dd>${text(j.id)}</dd><dt>STATUS</dt><dd>${text(j.status.toUpperCase())}</dd><dt>SCHEDULE</dt><dd>${text(dateFmt.format(d))} · ${text(timeFmt.format(d))}</dd><dt>TECHNICIAN</dt><dd>${text(j.technician||'Awaiting assignment')}</dd><dt>ADDRESS</dt><dd>${text(j.address)}</dd>`;dialog.showModal();}
async function init(){try{const res=await fetch('fixtures/jobs.json');if(!res.ok)throw 0;jobs=await res.json();}catch{jobs=fallbackJobs;}const count=s=>jobs.filter(j=>j.status===s).length;document.querySelector('#activeCount').textContent=String(count('open')+count('assigned')).padStart(2,'0');document.querySelector('#openCount').textContent=String(count('open')).padStart(2,'0');document.querySelector('#assignedCount').textContent=String(count('assigned')).padStart(2,'0');document.querySelector('#doneCount').textContent=String(count('done')).padStart(2,'0');render();}
document.querySelector('.filters').addEventListener('click',e=>{const b=e.target.closest('.filter');if(!b)return;document.querySelector('.filter.active').classList.remove('active');b.classList.add('active');filter=b.dataset.filter;render();});
document.querySelector('#search').addEventListener('input',e=>{query=e.target.value.trim().toLowerCase();render();});
document.addEventListener('keydown',e=>{if(e.key==='/'&&!/input|textarea/i.test(e.target.tagName)){e.preventDefault();document.querySelector('#search').focus();}});
queue.addEventListener('click',e=>{const row=e.target.closest('.job');if(row)openJob(row.dataset.id);});queue.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches('.job')){e.preventDefault();openJob(e.target.dataset.id);}});
document.querySelector('.dialog-close').onclick=()=>dialog.close();document.querySelector('#themeButton').onclick=()=>document.body.classList.toggle('high-contrast');document.querySelector('#newJob').onclick=()=>{filter='open';document.querySelectorAll('.filter').forEach(b=>b.classList.toggle('active',b.dataset.filter==='open'));render();document.querySelector('#search').focus();};
init();