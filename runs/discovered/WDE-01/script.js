const tabs = document.querySelectorAll('[role="tab"]');
const title = document.querySelector('#screen-title');
const body = document.querySelector('#screen-body');
const views = {
  schedule: `<div class="labor-card"><small>PROJECTED LABOR</small><strong>24.6%</strong><span>Target 22–26%</span><div class="meter"><i></i></div></div><div class="coverage"><div><span>Lunch</span><b>Covered</b></div><div><span>Dinner</span><b>1 gap</b></div><div><span>Scheduled</span><b>342 hrs</b></div></div><div class="gap"><span>FRI · DINNER</span><b>Need 1 line cook</b><button>Offer open shift</button></div>`,
  hours: `<div class="labor-card"><small>HOURS TO REVIEW</small><strong>3</strong><span>of 28 timecards</span><div class="meter"><i style="width:89%;background:#3f9a5b"></i></div></div><div class="coverage"><div><span>Approved</span><b>25</b></div><div><span>Missed punch</span><b>1</b></div><div><span>Overtime</span><b>2</b></div></div><div class="gap"><span>JONAH R. · TUE</span><b>Missing clock-out</b><button>Review punch</button></div>`,
  payroll: `<div class="labor-card"><small>PAYROLL TOTAL</small><strong>$18.4k</strong><span>Jun 9–22</span><div class="meter"><i style="width:100%;background:#3f9a5b"></i></div></div><div class="coverage"><div><span>Team</span><b>28</b></div><div><span>Tips</span><b>$4,820</b></div><div><span>Exceptions</span><b>0</b></div></div><div class="gap"><span>ALL CHECKS PASSED</span><b>Payroll is ready</b><button>Review payroll</button></div>`
};
tabs.forEach(tab => tab.addEventListener('click', () => {
  tabs.forEach(t => t.setAttribute('aria-selected', 'false'));
  tab.setAttribute('aria-selected', 'true');
  title.textContent = tab.dataset.tab === 'hours' ? 'Timecards' : tab.dataset.tab[0].toUpperCase() + tab.dataset.tab.slice(1);
  body.innerHTML = views[tab.dataset.tab];
}));
document.querySelector('.demo-form').addEventListener('submit', e => {
  e.preventDefault();
  const email = e.currentTarget.querySelector('input').value;
  e.currentTarget.querySelector('.form-status').textContent = `Thanks — we'll reach out to ${email} shortly.`;
  e.currentTarget.reset();
});
const menu = document.querySelector('.menu');
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!open));
  document.querySelector('.site-header nav').classList.toggle('nav-open', !open);
});
