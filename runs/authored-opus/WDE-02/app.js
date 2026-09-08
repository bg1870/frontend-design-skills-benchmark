const state = { jobs: [], filter: 'all', query: '', sort: 'date' };
const dashboardDay = '2026-09-08';
const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

const statusLabel = { open: 'Needs dispatch', assigned: 'Assigned', done: 'Completed' };
const symbols = { 'Water heater replacement': '♨', 'Kitchen sink backup': '⌇', 'Sump pump inspection': '◉', 'Burst supply line, basement': '⚠', 'Toilet reseat, unit 2B': '◇', 'Annual backflow test': '✓' };
function localDate(job) { return job.scheduled_at.slice(0, 10); }
function initials(name) { return name.split(/\s+/).map(x => x.replace('.', '')[0]).join(''); }
function formatWhen(iso) {
  const d = new Date(iso);
  const date = d.toLocaleDateString('en-US', { weekday:'short', month:'short', day:'numeric', timeZone:'America/Chicago' });
  const time = d.toLocaleTimeString('en-US', { hour:'numeric', minute:'2-digit', timeZone:'America/Chicago' });
  return { date, time };
}
function filteredJobs() {
  let jobs = state.jobs.filter(j => {
    const filterOK = state.filter === 'all' || (state.filter === 'today' ? localDate(j) === dashboardDay : j.status === state.filter);
    const haystack = `${j.id} ${j.title} ${j.address} ${j.technician || ''}`.toLowerCase();
    return filterOK && haystack.includes(state.query.toLowerCase());
  });
  return jobs.sort((a,b) => state.sort === 'date' ? new Date(a.scheduled_at)-new Date(b.scheduled_at) : state.sort === 'status' ? a.status.localeCompare(b.status) : (a.technician || 'ZZZ').localeCompare(b.technician || 'ZZZ'));
}
function jobTitle(j) { return `<div class="job-title"><span class="job-symbol">${symbols[j.title] || '●'}</span><div><strong>${j.title}</strong><small>${j.id} · ${j.address}</small></div></div>`; }
function tech(j) { return j.technician ? `<div class="tech"><span class="tech-avatar">${initials(j.technician)}</span>${j.technician}</div>` : `<span class="unassigned">Unassigned</span>`; }
function render() {
  const jobs = filteredJobs();
  $('#visibleCount').textContent = jobs.length;
  $('#rangeText').textContent = `Showing ${jobs.length} of ${state.jobs.length} jobs`;
  $('#empty').hidden = jobs.length > 0;
  $('.table-wrap').style.display = jobs.length ? '' : 'none';
  $('#jobRows').innerHTML = jobs.map(j => { const w=formatWhen(j.scheduled_at); return `<tr><td>${jobTitle(j)}</td><td class="date-cell"><strong>${w.date}</strong><small>${w.time}</small></td><td>${tech(j)}</td><td><span class="status ${j.status}">${statusLabel[j.status]}</span></td><td><button class="more" aria-label="More options for ${j.id}">•••</button></td></tr>` }).join('');
  $('#mobileList').innerHTML = jobs.map(j => { const w=formatWhen(j.scheduled_at); return `<article class="mobile-job"><div class="mobile-job-top">${jobTitle(j)}<span class="status ${j.status}">${statusLabel[j.status]}</span></div><div class="mobile-job-bottom"><div class="date-cell"><strong>${w.date} · ${w.time}</strong></div>${tech(j)}</div></article>` }).join('');
}
function setFilter(filter) {
  state.filter = filter;
  $$('.tabs button').forEach(b => b.classList.toggle('active', b.dataset.filter === filter));
  const filterCount = $('.filter-count');
  filterCount.hidden = filter === 'all'; filterCount.textContent = '1';
  render();
}
function hydrate(jobs) {
  state.jobs = jobs;
  const count = s => jobs.filter(j => j.status === s).length;
  const today = jobs.filter(j => localDate(j) === dashboardDay).length;
  $('#openCount').textContent = count('open'); $('#assignedCount').textContent = count('assigned'); $('#doneCount').textContent = count('done'); $('#todayCount').textContent = today;
  $('#allTab').textContent = jobs.length; $('#openTab').textContent = count('open'); $('#assignedTab').textContent = count('assigned'); $('#doneTab').textContent = count('done');
  $('#todaySub').textContent = `${today === 1 ? 'job' : 'jobs'} on the board`;
  render();
}
$$('[data-filter]').forEach(b => b.addEventListener('click', () => setFilter(b.dataset.filter)));
$('#search').addEventListener('input', e => { state.query=e.target.value; render(); });
$('#sort').addEventListener('change', e => { state.sort=e.target.value; render(); });
$('#filterBtn').addEventListener('click', () => setFilter(state.filter === 'open' ? 'all' : 'open'));
$('#newJob').addEventListener('click', () => { const t=$('#toast'); t.classList.add('show'); setTimeout(()=>t.classList.remove('show'),2400); });
fetch('fixtures/jobs.json').then(r => { if(!r.ok) throw Error('Could not load jobs'); return r.json(); }).then(hydrate).catch(() => { $('#jobRows').innerHTML='<tr><td colspan="5" class="loading">Unable to load fixtures/jobs.json. Serve this folder from a local web server.</td></tr>'; });
