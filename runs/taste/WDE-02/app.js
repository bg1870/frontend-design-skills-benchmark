const state={jobs:[],filter:'all',query:'',sort:'date'};
const $=s=>document.querySelector(s);
const formatDate=iso=>new Intl.DateTimeFormat('en-US',{timeZone:'America/Chicago',weekday:'short',month:'short',day:'numeric'}).format(new Date(iso));
const formatTime=iso=>new Intl.DateTimeFormat('en-US',{timeZone:'America/Chicago',hour:'numeric',minute:'2-digit'}).format(new Date(iso));
const escapeHTML=s=>String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
function statusLabel(s){return s[0].toUpperCase()+s.slice(1)}
function updateSummary(){
 const counts={open:0,assigned:0,done:0};state.jobs.forEach(j=>counts[j.status]++);
 $('#openCount').textContent=counts.open;$('#assignedCount').textContent=counts.assigned;$('#doneCount').textContent=counts.done;
 $('#allBadge').textContent=state.jobs.length;$('#openBadge').textContent=counts.open;$('#assignedBadge').textContent=counts.assigned;$('#doneBadge').textContent=counts.done;
 $('#jobTotal').textContent=state.jobs.length;
 const today=state.jobs.filter(j=>j.scheduled_at.slice(0,10)==='2026-09-08').sort((a,b)=>new Date(a.scheduled_at)-new Date(b.scheduled_at));
 $('#todayCount').textContent=today.length;$('#nextJob').textContent=today.length?`Next at ${formatTime(today[0].scheduled_at)}`:'No calls scheduled';
}
function visibleJobs(){
 const q=state.query.toLowerCase();let jobs=state.jobs.filter(j=>(state.filter==='all'||j.status===state.filter)&&[j.id,j.title,j.address,j.technician||'unassigned'].some(v=>v.toLowerCase().includes(q)));
 return jobs.sort((a,b)=>state.sort==='date'?new Date(a.scheduled_at)-new Date(b.scheduled_at):state.sort==='title'?a.title.localeCompare(b.title):a.status.localeCompare(b.status));
}
function render(){
 const jobs=visibleJobs(),tbody=$('#jobRows');$('#empty').hidden=jobs.length>0;tbody.hidden=jobs.length===0;
 tbody.innerHTML=jobs.map(j=>`<tr><td><div class="job-cell"><span class="job-icon" aria-hidden="true">${escapeHTML(j.id.slice(-2))}</span><div><div class="job-name">${escapeHTML(j.title)}</div><div class="sub">${escapeHTML(j.id)} · ${escapeHTML(j.address)}</div></div></div></td><td class="schedule"><strong>${formatDate(j.scheduled_at)}</strong><span class="sub">${formatTime(j.scheduled_at)}</span></td><td class="tech ${j.technician?'':'unassigned'}"><strong>${escapeHTML(j.technician||'Needs assignment')}</strong><span class="sub">${j.technician?'Field technician':'Unclaimed job'}</span></td><td><span class="status ${j.status}">${statusLabel(j.status)}</span></td><td><button class="more" aria-label="More actions for ${escapeHTML(j.id)}">···</button></td></tr>`).join('');
 $('#resultCount').textContent=`Showing ${jobs.length} of ${state.jobs.length} jobs`;updateSummary();
}
function toast(message){const el=$('#toast');el.textContent=message;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),2200)}
async function load(){try{const res=await fetch('fixtures/jobs.json');if(!res.ok)throw Error();state.jobs=await res.json();render()}catch(e){$('#jobRows').innerHTML='<tr><td colspan="5"><div class="loading">Could not load jobs. Serve this folder over HTTP and refresh.</div></td></tr>'}}
$('.filters').addEventListener('click',e=>{const b=e.target.closest('.filter');if(!b)return;document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');state.filter=b.dataset.status;render()});
$('#search').addEventListener('input',e=>{state.query=e.target.value;render()});$('#sort').addEventListener('change',e=>{state.sort=e.target.value;render()});
$('#clearFilters').addEventListener('click',()=>{$('#search').value='';state.query='';state.filter='all';document.querySelectorAll('.filter').forEach(x=>x.classList.toggle('active',x.dataset.status==='all'));render()});
$('#themeToggle').addEventListener('click',()=>document.body.classList.toggle('dark'));
const dialog=$('#jobDialog');$('#newJob').addEventListener('click',()=>dialog.showModal());
$('#saveJob').addEventListener('click',e=>{const form=dialog.querySelector('form');if(!form.reportValidity()){e.preventDefault();return}const data=new FormData(form);state.jobs.push({id:`J-${1041+state.jobs.length}`,title:data.get('title'),address:data.get('address'),scheduled_at:new Date(data.get('date')).toISOString(),technician:null,status:'open'});form.reset();render();toast('New job added to the queue')});
function clock(){ $('#clock').textContent=new Intl.DateTimeFormat('en-US',{hour:'numeric',minute:'2-digit'}).format(new Date()) }clock();setInterval(clock,60000);load();
