const content = {
  schedule: { kicker: 'SCHEDULE BUILDER', title: 'Friday dinner, fully covered', caption: 'Coverage matches your forecast', html: `<div class="coverage-row"><span>4 PM</span><i></i><b>6 scheduled</b></div><div class="coverage-row"><span>6 PM</span><i class="wide"></i><b>11 scheduled</b></div><div class="coverage-row"><span>8 PM</span><i class="widest"></i><b>14 scheduled</b></div><div class="coverage-row"><span>10 PM</span><i class="mid"></i><b>8 scheduled</b></div>` },
  clock: { kicker: 'TIME CLOCK', title: 'Today’s shifts, accounted for', caption: 'No unresolved timecard exceptions', html: `<div class="coverage-row"><span>2:01</span><i class="wide"></i><b>Jon clocked in</b></div><div class="coverage-row"><span>3:57</span><i class="mid"></i><b>Ana clocked in</b></div><div class="coverage-row"><span>4:03</span><i class="widest"></i><b>Sam clocked in</b></div><div class="coverage-row"><span>4:28</span><i></i><b>Cam on break</b></div>` },
  payroll: { kicker: 'PAYROLL REVIEW', title: 'Sep 1–14 · Ready to approve', caption: 'All 284 hours are approved', html: `<div class="coverage-row"><span>Wages</span><i class="widest"></i><b>$5,462.00</b></div><div class="coverage-row"><span>Tips</span><i class="wide"></i><b>$2,184.40</b></div><div class="coverage-row"><span>Taxes</span><i class="mid"></i><b>$1,338.22</b></div><div class="coverage-row"><span>Total</span><i></i><b>$8,984.62</b></div>` }
};
document.querySelectorAll('.step').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.step').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
  button.classList.add('active'); button.setAttribute('aria-selected', 'true');
  const item = content[button.dataset.step];
  document.querySelector('#demo-kicker').textContent = item.kicker;
  document.querySelector('#demo-title').textContent = item.title;
  document.querySelector('#demo-content').innerHTML = item.html;
  document.querySelector('#demo-caption').textContent = item.caption;
}));
const dialog = document.querySelector('#demo-dialog');
document.querySelectorAll('.demo-open').forEach(button => button.addEventListener('click', () => dialog.showModal()));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
document.querySelector('.dialog-done').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
document.querySelector('#demo-form').addEventListener('submit', event => {
  event.preventDefault();
  event.target.hidden = true;
  dialog.querySelector('.success').hidden = false;
});