import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowLeft, Bell, CalendarDays, Check, ChevronRight, Flame, Home, Leaf, Plus, Sparkles, TimerReset, X } from 'lucide-react';
import './styles.css';

const initialHabits = [
  { id: 1, name: 'Morning pages', note: '10 quiet minutes', color: '#de7454', done: true, streak: 18 },
  { id: 2, name: 'Drink water', note: '6 of 8 glasses', color: '#568e87', done: true, streak: 7 },
  { id: 3, name: 'Evening walk', note: 'After dinner', color: '#cf9e3b', done: false, streak: 12 },
  { id: 4, name: 'Read fiction', note: '20 pages', color: '#7675a6', done: false, streak: 4 },
];

const days = [
  ['M', 8], ['T', 9], ['W', 10], ['T', 11], ['F', 12], ['S', 13], ['S', 14]
];

function App() {
  const [view, setView] = useState('today');
  const [sheet, setSheet] = useState(false);
  const [habits, setHabits] = useState(initialHabits);
  const [name, setName] = useState('');
  const done = habits.filter(h => h.done).length;
  const progress = Math.round((done / habits.length) * 100) || 0;

  const toggle = id => setHabits(list => list.map(h => h.id === id ? { ...h, done: !h.done } : h));
  const addHabit = e => {
    e.preventDefault();
    if (!name.trim()) return;
    setHabits(h => [...h, { id: Date.now(), name: name.trim(), note: 'Every day', color: '#de7454', done: false, streak: 0 }]);
    setName(''); setSheet(false);
  };

  return <div className="stage">
    <main className="app-shell">
      {view === 'today' ? <Today habits={habits} toggle={toggle} progress={progress} done={done} openStreak={() => setView('streak')} /> : <Streak onBack={() => setView('today')} />}
      <nav className="bottom-nav" aria-label="Primary navigation">
        <button className={view === 'today' ? 'active' : ''} onClick={() => setView('today')}><Home/><span>Today</span></button>
        <button className="add-button" onClick={() => setSheet(true)} aria-label="Add a habit"><Plus/></button>
        <button className={view === 'streak' ? 'active' : ''} onClick={() => setView('streak')}><Leaf/><span>Journey</span></button>
      </nav>
      {sheet && <AddSheet name={name} setName={setName} close={() => setSheet(false)} submit={addHabit} />}
    </main>
  </div>;
}

function Today({ habits, toggle, progress, done, openStreak }) {
  return <div className="screen today-screen">
    <header className="today-header">
      <div><p className="eyebrow">Sunday · April 14</p><h1>Good morning,<br/>Maya.</h1></div>
      <button className="icon-button" aria-label="Notifications"><Bell/></button>
    </header>

    <section className="week-strip" aria-label="This week">
      {days.map(([day, date], i) => <div key={date} className={`day ${i === 6 ? 'current' : ''} ${i < 6 ? 'past' : ''}`}>
        <span>{day}</span><b>{date}</b>{i < 6 && <i><Check/></i>}
      </div>)}
    </section>

    <button className="progress-card" onClick={openStreak}>
      <div className="progress-copy"><span className="mini-label">TODAY'S RHYTHM</span><strong>{done} of {habits.length}</strong><span>Small steps, steady days.</span></div>
      <div className="progress-ring" style={{'--p': `${progress * 3.6}deg`}}><span>{progress}%</span></div>
      <ChevronRight className="card-arrow"/>
    </button>

    <div className="section-heading"><h2>Your habits</h2><span>{habits.length} planned</span></div>
    <div className="habit-list">
      {habits.map((habit, i) => <article className={`habit-row ${habit.done ? 'complete' : ''}`} key={habit.id} style={{'--habit': habit.color, '--delay': `${i * 45}ms`}}>
        <button className="check-button" onClick={() => toggle(habit.id)} aria-label={`${habit.done ? 'Mark incomplete' : 'Complete'} ${habit.name}`} aria-pressed={habit.done}>{habit.done && <Check/>}</button>
        <button className="habit-copy" onClick={() => toggle(habit.id)}><strong>{habit.name}</strong><span>{habit.note}</span></button>
        <button className="streak-count" onClick={openStreak} aria-label={`View ${habit.name} streak`}><Flame/><span>{habit.streak}</span></button>
      </article>)}
    </div>
    <p className="quiet-note"><Sparkles/> Two more and today is complete</p>
  </div>;
}

function Streak({ onBack }) {
  const month = Array.from({length: 30}, (_, i) => i + 1);
  const active = new Set([1,2,3,4,5,6,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,26,27,28]);
  return <div className="screen streak-screen">
    <header className="detail-header"><button className="icon-button" onClick={onBack} aria-label="Back"><ArrowLeft/></button><p>YOUR JOURNEY</p><span className="spacer"/></header>
    <section className="streak-hero">
      <div className="flame-mark"><Flame/></div>
      <p>Current streak</p><h1>18 <span>days</span></h1>
      <em>Started March 28</em>
    </section>
    <section className="calendar-section">
      <div className="month-title"><div><span>APRIL 2026</span><h2>A steady month</h2></div><CalendarDays/></div>
      <div className="calendar-labels">{['M','T','W','T','F','S','S'].map((d,i)=><span key={i}>{d}</span>)}</div>
      <div className="calendar-grid"><span/><span/>{month.map(d => <div key={d} className={`${active.has(d) ? 'hit' : ''} ${d === 14 ? 'today' : ''}`}>{active.has(d) && <Leaf/>}<b>{d}</b></div>)}</div>
    </section>
    <section className="insight">
      <TimerReset/><div><span>BEST RUN</span><strong>23 days</strong><p>You’re five days from your personal best.</p></div>
    </section>
  </div>;
}

function AddSheet({ name, setName, close, submit }) {
  return <div className="sheet-layer" role="dialog" aria-modal="true" aria-labelledby="sheet-title" onMouseDown={e => e.target === e.currentTarget && close()}>
    <form className="sheet" onSubmit={submit}>
      <div className="sheet-grabber"/>
      <header><div><p className="eyebrow">A NEW RHYTHM</p><h2 id="sheet-title">What will you tend?</h2></div><button type="button" className="icon-button" onClick={close} aria-label="Close"><X/></button></header>
      <label className="field"><span>Habit name</span><input autoFocus value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Stretch for 5 minutes" /></label>
      <div className="field-row"><button type="button"><CalendarDays/><span><small>FREQUENCY</small>Every day</span><ChevronRight/></button><button type="button"><Bell/><span><small>REMINDER</small>8:00 AM</span><ChevronRight/></button></div>
      <div className="color-picker"><span>Marker color</span><div>{['#de7454','#568e87','#cf9e3b','#7675a6'].map((c,i)=><button type="button" key={c} style={{background:c}} className={i===0?'selected':''} aria-label={`Color ${i+1}`}/>)}</div></div>
      <button className="submit-button" disabled={!name.trim()}><Plus/> Add to my day</button>
    </form>
  </div>;
}

createRoot(document.getElementById('root')).render(<App/>);
