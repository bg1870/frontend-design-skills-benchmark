const state = { jobs: [], filter: 'all', query: '' };
const els = {
  rows: document.querySelector('#jobRows'), empty: document.querySelector('#emptyState'),
  search: document.querySelector('#searchInput'), tabs: [...document.querySelectorAll('.tab')]
};

const statusLabels = { open: 'Needs assignment', assigned: 'Assigned', done: 'Completed' };
const initials = name => name ? name.split(/\s+/).map(part => part.replace('.', '')[0]).join('').slice(0, 2) : '!';
const formatTime = iso => new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' }).format(new Date(iso));
const formatDay = iso => ({
  weekday: new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(new Date(iso)),
  day: new Intl.DateTimeFormat('en-US', { day: 'numeric' }).format(new Date(iso))
});
const escapeHTML = value => String(value).replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));

function render() {
  const query = state.query.toLowerCase();
  const visible = state.jobs.filter(job => (state.filter === 'all' || job.status === state.filter) &&
    [job.id, job.title, job.technician || '', job.address].some(value => value.toLowerCase().includes(query)));
  els.rows.innerHTML = visible.map(job => {
    const date = formatDay(job.scheduled_at);
    const technician = job.technician || 'Unassigned';
    return `<tr>
      <td><div class="schedule"><div class="date-box"><span>${date.weekday}</span><strong>${date.day}</strong></div><time datetime="${job.scheduled_at}">${formatTime(job.scheduled_at)}</time></div></td>
      <td><span class="job-title">${escapeHTML(job.title)}</span><span class="job-id">${escapeHTML(job.id)}</span></td>
      <td class="address">${escapeHTML(job.address)}</td>
      <td><div class="tech ${job.technician ? '' : 'unassigned'}"><span class="tech-avatar">${initials(job.technician)}</span>${escapeHTML(technician)}</div></td>
      <td><span class="status status-${job.status}">${statusLabels[job.status]}</span></td>
      <td><button class="more-button" aria-label="More actions for ${escapeHTML(job.id)}">•••</button></td>
    </tr>`;
  }).join('');
  els.empty.hidden = visible.length > 0;
  document.querySelector('#visibleCount').textContent = visible.length;
  document.querySelector('#footerCount').textContent = `Showing ${visible.length} of ${state.jobs.length} jobs`;
}

function setCounts() {
  const count = status => state.jobs.filter(job => job.status === status).length;
  const open = count('open'), assigned = count('assigned'), done = count('done'), total = state.jobs.length;
  ['open', 'assigned', 'done'].forEach(status => {
    document.querySelector(`#${status}Count`).textContent = count(status);
    document.querySelector(`#${status}TabCount`).textContent = count(status);
  });
  document.querySelector('#allTabCount').textContent = total;
  document.querySelector('#loadLabel').textContent = `${done} / ${total}`;
  document.querySelector('#loadBar').style.width = `${total ? done / total * 100 : 0}%`;
}

els.tabs.forEach(tab => tab.addEventListener('click', () => {
  els.tabs.forEach(item => item.classList.remove('active'));
  tab.classList.add('active'); state.filter = tab.dataset.filter; render();
}));
els.search.addEventListener('input', event => { state.query = event.target.value.trim(); render(); });
document.querySelector('#newJobButton').addEventListener('click', () => document.querySelector('#jobDialog').showModal());

fetch('fixtures/jobs.json').then(response => {
  if (!response.ok) throw new Error('Could not load jobs');
  return response.json();
}).then(jobs => {
  state.jobs = jobs.sort((a,b) => new Date(a.scheduled_at) - new Date(b.scheduled_at));
  setCounts(); render();
}).catch(() => {
  els.empty.hidden = false;
  els.empty.innerHTML = '<strong>Jobs could not be loaded</strong><span>Serve this folder over HTTP, then refresh the page.</span>';
});
