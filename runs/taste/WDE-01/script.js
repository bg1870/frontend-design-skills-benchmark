const scheduleData = {
  fri: { date: 'Friday, May 17', rows: [
    ['3:30 PM', 'Rina Patel', 'Floor lead', '8.0 hrs'],
    ['4:00 PM', 'Owen Brooks', 'Bartender', '7.5 hrs'],
    ['4:30 PM', 'Lucía Moreno', 'Server', '6.5 hrs'],
    ['5:00 PM', 'Darius Cole', 'Server', '6.0 hrs'],
    ['5:00 PM', 'Mei Tan', 'Host', '5.5 hrs']
  ]},
  sat: { date: 'Saturday, May 18', rows: [
    ['3:00 PM', 'Rina Patel', 'Floor lead', '8.5 hrs'],
    ['3:30 PM', 'Owen Brooks', 'Bartender', '8.0 hrs'],
    ['4:00 PM', 'Andre Silva', 'Bartender', '7.0 hrs'],
    ['4:30 PM', 'Lucía Moreno', 'Server', '7.0 hrs'],
    ['4:30 PM', 'Nia Howard', 'Server', '6.5 hrs']
  ]}
};

const content = document.querySelector('#schedule-content');
const dayLabel = document.querySelector('#schedule-day');
const status = document.querySelector('#publish-status');
const tabs = document.querySelectorAll('[role="tab"]');

function renderSchedule(day) {
  content.innerHTML = '<div class="skeleton"></div><div class="skeleton"></div><div class="skeleton"></div>';
  dayLabel.textContent = scheduleData[day].date;
  status.hidden = true;
  window.setTimeout(() => {
    content.innerHTML = scheduleData[day].rows.map(row => `<div class="shift-row"><span class="shift-time">${row[0]}</span><span class="shift-person"><strong>${row[1]}</strong><span>${row[2]}</span></span><span class="shift-hours">${row[3]}</span></div>`).join('');
  }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 280);
}

tabs.forEach(tab => tab.addEventListener('click', () => {
  tabs.forEach(item => item.setAttribute('aria-selected', 'false'));
  tab.setAttribute('aria-selected', 'true');
  renderSchedule(tab.dataset.day);
}));

document.querySelector('#publish-button').addEventListener('click', event => {
  const button = event.currentTarget;
  button.disabled = true;
  button.textContent = 'Publishing...';
  window.setTimeout(() => {
    button.disabled = false;
    button.textContent = 'Published';
    status.textContent = 'Schedule published. The team has been notified.';
    status.hidden = false;
  }, 650);
});

document.querySelector('#review-button').addEventListener('click', event => {
  const state = document.querySelector('#review-state');
  state.hidden = !state.hidden;
  event.currentTarget.textContent = state.hidden ? 'Review exceptions' : 'Hide exceptions';
});

const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('#site-nav');
menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });
document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
renderSchedule('fri');
