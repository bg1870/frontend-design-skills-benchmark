const today = document.querySelector('#today');
if (today) {
  const now = new Date();
  today.dateTime = now.toISOString();
  today.textContent = new Intl.DateTimeFormat('en', { weekday: 'short', month: 'short', day: 'numeric' }).format(now).toUpperCase();
}
