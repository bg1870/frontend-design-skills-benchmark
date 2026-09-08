const state={jobs:[],filter:'all',query:'',selected:null};
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const fmt=new Intl.DateTimeFormat('en-US',{weekday:'short',month:'short',day:'numeric',hour:'numeric',minute:'2-digit'});
const initials=name=>name.split(/\s+/).map(x=>x[0]).join('').replace('.','');
const labels={open:'Needs dispatch',assigned:'Assigned',done:'Completed'};

async function load(){
  try{const res=await fetch('fixtures/jobs.json');if(!res.ok)throw Error();state.jobs=await res.json();render();}
  catch(e){$('#error').hidden=false;document.querySelector('table').hidden=true;}
}
function render(){
  const counts={all:state.jobs.length,open:0,assigned:0,done:0};state.jobs.forEach(j=>counts[j.status]++);
  ['all','open','assigned','done'].forEach(k=>$('#badge-'+k).textContent=counts[k]);
  $('#open-count').textContent=counts.open;$('#done-count').textContent=counts.done;
  const today=state.jobs.filter(j=>j.scheduled_at.slice(0,10)==='2026-09-08');
  $('#today-count').textContent=today.length;$('#open-note').textContent=counts.open===1?'1 call unassigned':`${counts.open} calls unassigned`;
  $('#today-note').textContent=today.length?'Next at '+new Date(today[0].scheduled_at).toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'}):'No calls today';
  const q=state.query.toLowerCase();const rows=state.jobs.filter(j=>(state.filter==='all'||j.status===state.filter)&&(!q||[j.id,j.title,j.address,j.technician].filter(Boolean).some(v=>v.toLowerCase().includes(q)))).sort((a,b)=>new Date(a.scheduled_at)-new Date(b.scheduled_at));
  $('#result-count').textContent=`(${rows.length})`;$('#empty').hidden=rows.length>0;
  $('#job-list').innerHTML=rows.map(j=>`<tr><td><div class="job"><span class="job-code">${j.id}</span><span><strong>${escapeHtml(j.title)}</strong><small>${escapeHtml(j.address)}</small></span></div></td><td><span class="date">${fmt.format(new Date(j.scheduled_at)).split(',').slice(0,2).join(',')}</span><span class="cell-sub">${new Date(j.scheduled_at).toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'})}</span></td><td>${j.technician?`<span class="tech"><i class="tech-avatar">${initials(j.technician)}</i>${escapeHtml(j.technician)}</span>`:'<span class="unassigned">Unassigned</span>'}</td><td><span class="status ${j.status}">${labels[j.status]}</span></td><td>${j.status==='open'?`<button class="dispatch" data-assign="${j.id}">Assign</button>`:'<button class="kebab" aria-label="More actions for '+j.id+'">···</button>'}</td></tr>`).join('');
  $$('[data-assign]').forEach(b=>b.onclick=()=>openAssign(b.dataset.assign));
}
function escapeHtml(s){return String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}
function openAssign(id){state.selected=state.jobs.find(j=>j.id===id);$('#dialog-title').textContent=state.selected.title;$('#dialog-address').textContent=`${state.selected.id} · ${state.selected.address}`;$('#technician').value='';$('#assign-dialog').showModal();}
function toast(msg){$('#toast').textContent=msg;$('#toast').classList.add('show');setTimeout(()=>$('#toast').classList.remove('show'),2600)}
$$('.filter').forEach(b=>b.onclick=()=>{$$('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');state.filter=b.dataset.filter;render()});
$('#search').oninput=e=>{state.query=e.target.value;render()};
$('#clear-filters').onclick=()=>{state.filter='all';state.query='';$('#search').value='';$$('.filter').forEach(x=>x.classList.toggle('active',x.dataset.filter==='all'));render()};
$('#cancel-dialog').onclick=()=>$('#assign-dialog').close();
$('#assign-form').onsubmit=e=>{e.preventDefault();const tech=$('#technician').value;if(!tech)return;state.selected.technician=tech;state.selected.status='assigned';$('#assign-dialog').close();render();toast(`${state.selected.id} assigned to ${tech}`)};
$('#new-job').onclick=()=>{$('#new-form').reset();$('#new-dialog').showModal()};$('#cancel-new').onclick=()=>$('#new-dialog').close();
$('#new-form').onsubmit=e=>{e.preventDefault();const f=new FormData(e.target),n=Math.max(...state.jobs.map(j=>+j.id.slice(2)))+1;state.jobs.push({id:`J-${n}`,title:f.get('title'),address:f.get('address'),scheduled_at:new Date(f.get('scheduled')).toISOString(),technician:null,status:'open'});$('#new-dialog').close();render();toast(`J-${n} added to the queue`)};
function tick(){const now=new Date();$('#clock').textContent=now.toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'})+' · '+now.toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'})}tick();setInterval(tick,30000);load();
