import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowLeft, Check, ChevronRight, Flame, Plus, X } from 'lucide-react';
import './styles.css';

const starterHabits = [
  { id: 1, name: 'Morning pages', detail: 'Write for 10 minutes', time: 'Before 9:00', done: true, streak: 12 },
  { id: 2, name: 'Move outdoors', detail: 'Walk, run, or ride', time: '30 min', done: true, streak: 7 },
  { id: 3, name: 'Read a chapter', detail: 'Fiction or essays', time: 'Evening', done: false, streak: 4 },
  { id: 4, name: 'Phone away by 10', detail: 'Charge outside bedroom', time: 'Night', done: false, streak: 18 },
];
const displayDate = new Intl.DateTimeFormat(navigator.languages, { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date(2026, 8, 8));
const week = [
  { day: 'Wed', n: 2, done: true }, { day: 'Thu', n: 3, done: true }, { day: 'Fri', n: 4, done: false },
  { day: 'Sat', n: 5, done: true }, { day: 'Sun', n: 6, done: true }, { day: 'Mon', n: 7, done: true }, { day: 'Today', n: 8, done: true },
];
const month = Array.from({ length: 35 }, (_, i) => ({ active: ![0, 4, 11, 19, 27, 32].includes(i), future: i > 28 }));

function App() {
  const [view, setView] = useState(() => new URLSearchParams(location.search).get('view') === 'streak' ? 'streak' : 'today');
  const [sheet, setSheet] = useState(false);
  const [habits, setHabits] = useState(starterHabits);
  const [toast, setToast] = useState('');
  const [name, setName] = useState('');
  const [days, setDays] = useState(['M','T','W','T2','F']);

  useEffect(() => {
    const url = new URL(location.href); url.searchParams.set('view', view); history.replaceState({}, '', url);
  }, [view]);
  useEffect(() => {
    const close = e => e.key === 'Escape' && setSheet(false); addEventListener('keydown', close); return () => removeEventListener('keydown', close);
  }, []);
  const completed = habits.filter(h => h.done).length;
  const toggle = id => {
    const habit = habits.find(h => h.id === id);
    setHabits(habits.map(h => h.id === id ? { ...h, done: !h.done } : h));
    setToast(habit.done ? `${habit.name} reopened` : `${habit.name} completed`);
    setTimeout(() => setToast(''), 1800);
  };
  const addHabit = e => {
    e.preventDefault();
    if (!name.trim()) return;
    setHabits([...habits, { id: Date.now(), name: name.trim(), detail: `${days.length} days each week`, time: 'Anytime', done: false, streak: 0 }]);
    setName(''); setSheet(false); setToast('Habit added'); setTimeout(() => setToast(''), 1800);
  };

  return <div className="stage">
    <a className="skip" href="#main">Skip to content</a>
    <div className="phone">
      {view === 'today' ? <Today habits={habits} completed={completed} toggle={toggle} openStreak={() => setView('streak')} /> : <Streak back={() => setView('today')} />}
      <nav className="bottom-nav" aria-label="Primary navigation">
        <button className={view === 'today' ? 'nav-active' : ''} onClick={() => setView('today')}><span className="nav-mark" aria-hidden="true">●</span>Today</button>
        <button className={view === 'streak' ? 'nav-active' : ''} onClick={() => setView('streak')}><Flame aria-hidden="true" />Streaks</button>
        <button className="add-button" onClick={() => setSheet(true)} aria-label="Add habit"><Plus aria-hidden="true" /></button>
      </nav>
      {sheet && <AddSheet name={name} setName={setName} days={days} setDays={setDays} close={() => setSheet(false)} submit={addHabit} />}
      <div className="toast" aria-live="polite">{toast}</div>
    </div>
  </div>;
}

function Today({ habits, completed, toggle, openStreak }) {
  const percent = Math.round((completed / habits.length) * 100);
  return <main id="main" className="screen today-screen">
    <header className="topbar"><div><p className="date">{displayDate}</p><h1>Make Time for What Matters.</h1></div><button className="avatar" aria-label="Open profile">AR</button></header>
    <section className="progress-hero" aria-label={`${completed} of ${habits.length} habits complete`}>
      <div className="dial" style={{ '--progress': `${percent * 3.6}deg` }}><div className="dial-center"><strong>{completed}<span>/{habits.length}</span></strong><small>done today</small></div></div>
      <div className="hero-copy"><p>Steady is strong.</p><button onClick={openStreak}>12 day rhythm <ChevronRight aria-hidden="true" /></button></div>
    </section>
    <section className="habits"><div className="section-heading"><h2>Today’s Rituals</h2><span>{habits.length - completed} left</span></div>
      <div className="habit-list">{habits.map(h => <button key={h.id} className={`habit-row ${h.done ? 'is-done' : ''}`} onClick={() => toggle(h.id)} aria-pressed={h.done}>
        <span className="check">{h.done && <Check aria-hidden="true" />}</span><span className="habit-copy"><strong>{h.name}</strong><small>{h.detail}</small></span><span className="habit-time">{h.time}</span>
      </button>)}</div>
    </section>
  </main>;
}

function Streak({ back }) {
  return <main id="main" className="screen streak-screen">
    <header className="detail-head"><button onClick={back} aria-label="Back to today"><ArrowLeft aria-hidden="true" /></button><span>Streak Details</span><span aria-hidden="true" className="head-spacer" /></header>
    <section className="streak-title"><p>Morning pages</p><h1><span>12</span> days in a row</h1><p>Your longest stretch yet. Two more days and you’ll complete a fortnight.</p></section>
    <section className="week-strip" aria-label="Last 7 days">{week.map(d => <div key={d.day}><small>{d.day}</small><span className={d.done ? 'day-done' : ''}>{d.done ? <Check aria-hidden="true" /> : d.n}</span></div>)}</section>
    <section className="calendar-card"><div className="calendar-head"><div><h2>September</h2><p>24 of 28 possible days</p></div><strong>86%</strong></div><div className="week-labels" aria-hidden="true">{'MTWTFSS'.split('').map((d,i)=><span key={i}>{d}</span>)}</div><div className="month-grid">{month.map((d,i)=><span key={i} className={`${d.active ? 'active' : ''} ${d.future ? 'future' : ''}`} aria-label={`Day ${i+1}: ${d.future ? 'upcoming' : d.active ? 'completed' : 'missed'}`}>{i < 30 ? i+1 : ''}</span>)}</div></section>
    <blockquote>“You do not rise to the level of your goals. You fall to the level of your systems.”<cite>James Clear</cite></blockquote>
  </main>;
}

function AddSheet({ name, setName, days, setDays, close, submit }) {
  const options = [{k:'M',l:'M'},{k:'T',l:'T'},{k:'W',l:'W'},{k:'T2',l:'T'},{k:'F',l:'F'},{k:'S',l:'S'},{k:'S2',l:'S'}];
  return <div className="sheet-layer"><section className="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title">
    <div className="sheet-handle" aria-hidden="true" /><div className="sheet-head"><div><p>New Ritual</p><h2 id="sheet-title">What would you like to practice?</h2></div><button onClick={close} aria-label="Close add habit sheet"><X aria-hidden="true" /></button></div>
    <form onSubmit={submit}><label htmlFor="habit-name">Habit name</label><input id="habit-name" name="habitName" value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Stretch for 5 minutes…" autoComplete="off" required />
      <fieldset><legend>Repeat</legend><div className="day-options">{options.map(o => <label key={o.k}><input type="checkbox" checked={days.includes(o.k)} onChange={()=>setDays(days.includes(o.k)?days.filter(d=>d!==o.k):[...days,o.k])}/><span>{o.l}</span></label>)}</div></fieldset>
      <label htmlFor="cue">Cue <span>Optional</span></label><select id="cue" name="cue" defaultValue="morning"><option value="morning">In the morning</option><option value="afternoon">In the afternoon</option><option value="evening">In the evening</option></select>
      <button className="save" type="submit">Add Habit</button></form>
  </section></div>;
}
createRoot(document.getElementById('root')).render(<App />);
