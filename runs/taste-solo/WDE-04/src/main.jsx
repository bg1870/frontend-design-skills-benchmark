import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowLeft, ArrowRight, Check, CircleNotch, Fire, House, Plus,
  TrendUp, X, BookOpen, Drop, PersonSimpleRun, MoonStars, Sparkle
} from '@phosphor-icons/react';
import './styles.css';

const iconMap = { run: PersonSimpleRun, water: Drop, read: BookOpen, sleep: MoonStars, sparkle: Sparkle };
const initialHabits = [
  { id: 1, name: 'Morning walk', note: '20 minutes', icon: 'run', streak: 12, done: true, history: [1,1,0,1,1,1,1,1,0,1,1,1,1,1] },
  { id: 2, name: 'Drink water', note: '6 glasses', icon: 'water', streak: 8, done: true, history: [1,1,1,1,1,1,0,1,1,1,1,1,1,1] },
  { id: 3, name: 'Read ten pages', note: 'Before bed', icon: 'read', streak: 4, done: false, history: [0,1,1,1,0,1,1,0,1,1,1,1,0,0] },
  { id: 4, name: 'Lights out by 11', note: 'Sleep routine', icon: 'sleep', streak: 3, done: false, history: [1,0,1,1,1,0,1,1,0,1,1,1,0,0] }
];
const dates = [
  { day: 'M', date: 7, done: true }, { day: 'T', date: 8, active: true },
  { day: 'W', date: 9 }, { day: 'T', date: 10 }, { day: 'F', date: 11 },
  { day: 'S', date: 12 }, { day: 'S', date: 13 }
];

function App() {
  const [habits, setHabits] = useState(initialHabits);
  const [view, setView] = useState('today');
  const [selected, setSelected] = useState(initialHabits[0]);
  const [sheet, setSheet] = useState(false);
  const [toast, setToast] = useState('');
  const [activeTab, setActiveTab] = useState('Today');
  const [loading, setLoading] = useState(false);
  const doneCount = habits.filter(h => h.done).length;
  const progress = Math.round((doneCount / habits.length) * 100);

  function toggleHabit(id) {
    setHabits(current => current.map(h => h.id === id ? { ...h, done: !h.done, streak: h.done ? Math.max(0, h.streak - 1) : h.streak + 1 } : h));
  }
  function openDetail(habit) { setSelected(habit); setView('detail'); }
  function saveHabit(data) {
    setHabits(current => [...current, { id: Date.now(), name: data.name, note: data.note, icon: data.icon, streak: 0, done: false, history: Array(14).fill(0) }]);
    setSheet(false); setToast('Habit added to today'); setTimeout(() => setToast(''), 2600);
  }
  function changeTab(tab) {
    setActiveTab(tab);
    if (tab === 'Today') setView('today');
    else { setLoading(true); setTimeout(() => setLoading(false), 650); }
  }
  const currentSelected = habits.find(h => h.id === selected.id) || selected;

  return <main className="stage">
    <section className="phone" aria-label="Stride habit tracker prototype">
      <div className="app">
        {view === 'today' ? <Today habits={habits} progress={progress} doneCount={doneCount} onToggle={toggleHabit} onDetail={openDetail} onAdd={() => setSheet(true)} loading={loading} /> : <Detail habit={currentSelected} onBack={() => setView('today')} onToggle={() => toggleHabit(currentSelected.id)} />}
        <Nav active={activeTab} onChange={changeTab} onAdd={() => setSheet(true)} />
        {sheet && <AddSheet onClose={() => setSheet(false)} onSave={saveHabit} />}
        {toast && <div className="toast" role="status"><Check weight="bold" />{toast}</div>}
      </div>
    </section>
  </main>;
}

function Today({ habits, progress, doneCount, onToggle, onDetail, onAdd, loading }) {
  return <div className="screen today-screen">
    <header className="topbar"><div><span className="date-label">TUESDAY, SEPTEMBER 8</span><h1>Good morning.</h1></div><button className="avatar" aria-label="Open profile">AR</button></header>
    <div className="week" aria-label="Week selector">{dates.map(d => <button key={d.date} className={`date ${d.active ? 'active' : ''}`}><span>{d.day}</span><b>{d.date}</b>{d.done && <i><Check weight="bold" /></i>}</button>)}</div>
    <section className="progress-block">
      <div className="progress-copy"><div className="ring" style={{'--progress': `${progress * 3.6}deg`}}><span>{progress}%</span></div><div><p>Today’s rhythm</p><h2>{doneCount === habits.length ? 'All done. Nice work.' : `${habits.length - doneCount} left for today`}</h2></div></div>
      <p className="encourage">Small actions, repeated often. You’re building something steady.</p>
    </section>
    <section className="habit-section"><div className="section-title"><h2>Your habits</h2><span>{doneCount} of {habits.length}</span></div>
      {loading ? <div className="skeletons" aria-label="Loading habits"><i/><i/><i/></div> : habits.length ? <div className="habit-list">{habits.map(h => <HabitRow key={h.id} habit={h} onToggle={() => onToggle(h.id)} onDetail={() => onDetail(h)} />)}</div> : <div className="empty"><Sparkle size={28}/><h3>Start with one small thing</h3><p>Add a habit you can repeat today.</p><button onClick={onAdd}>Add a habit</button></div>}
    </section>
  </div>;
}

function HabitRow({ habit, onToggle, onDetail }) {
  const Icon = iconMap[habit.icon] || Sparkle;
  return <article className={`habit-row ${habit.done ? 'completed' : ''}`}>
    <button className="habit-main" onClick={onDetail} aria-label={`View ${habit.name} details`}><span className="habit-icon"><Icon size={21} weight="regular" /></span><span className="habit-copy"><strong>{habit.name}</strong><small>{habit.note}</small></span><span className="streak"><Fire weight="fill" />{habit.streak}</span><ArrowRight className="chevron" /></button>
    <button className="check" onClick={onToggle} aria-label={habit.done ? `Mark ${habit.name} incomplete` : `Complete ${habit.name}`}>{habit.done && <Check weight="bold" />}</button>
  </article>;
}

function Detail({ habit, onBack, onToggle }) {
  const Icon = iconMap[habit.icon] || Sparkle;
  const month = useMemo(() => Array.from({length: 35}, (_, i) => i < 4 ? null : (i * 7 + habit.id * 3) % 5 !== 0), [habit.id]);
  return <div className="screen detail-screen">
    <header className="detail-nav"><button onClick={onBack} aria-label="Back to today"><ArrowLeft /></button><span>Habit details</span><button aria-label="More options">•••</button></header>
    <section className="detail-hero"><span className="large-icon"><Icon size={30}/></span><h1>{habit.name}</h1><p>{habit.note} each day</p></section>
    <section className="streak-card"><div className="streak-number"><Fire weight="fill"/><div><strong>{habit.streak}</strong><span>day streak</span></div></div><div className="best"><span>PERSONAL BEST</span><strong>{Math.max(14, habit.streak)} days</strong></div></section>
    <section className="calendar"><div className="calendar-head"><div><h2>September</h2><p>Consistency over perfection</p></div><span>78%</span></div><div className="day-head">{['M','T','W','T','F','S','S'].map((d,i)=><b key={i}>{d}</b>)}</div><div className="month-grid">{month.map((done,i)=><span key={i} className={done === null ? 'blank' : done ? 'did' : ''}>{done !== null && i-3}{done && <Check weight="bold"/>}</span>)}</div></section>
    <section className="insight"><TrendUp size={25}/><div><strong>Most consistent on weekdays</strong><p>You completed this habit 9 of the last 10 weekdays.</p></div></section>
    <button className={`complete-wide ${habit.done ? 'is-done' : ''}`} onClick={onToggle}>{habit.done ? <><Check weight="bold"/>Completed today</> : 'Mark complete'}</button>
  </div>;
}

function AddSheet({ onClose, onSave }) {
  const [name, setName] = useState(''); const [note, setNote] = useState(''); const [icon, setIcon] = useState('sparkle'); const [schedule, setSchedule] = useState('Every day'); const [error, setError] = useState('');
  function submit(e) { e.preventDefault(); if (!name.trim()) { setError('Give your habit a short name.'); return; } onSave({name: name.trim(), note: note.trim() || schedule, icon}); }
  return <div className="overlay" onMouseDown={e => e.target === e.currentTarget && onClose()}><form className="sheet" onSubmit={submit} aria-label="Add a habit"><div className="handle"/><header><div><span>NEW HABIT</span><h2>What will you repeat?</h2></div><button type="button" onClick={onClose} aria-label="Close"><X /></button></header>
    <label className="field"><span>Habit name</span><input autoFocus value={name} onChange={e => {setName(e.target.value);setError('')}} placeholder="Example: Stretch for five minutes" />{error && <small className="error">{error}</small>}</label>
    <label className="field"><span>Note <i>optional</i></span><input value={note} onChange={e => setNote(e.target.value)} placeholder="A cue or a simple goal" /></label>
    <fieldset><legend>Choose an icon</legend><div className="icon-picker">{Object.entries(iconMap).map(([key,Icon])=><button type="button" key={key} className={icon===key?'selected':''} onClick={()=>setIcon(key)} aria-label={`Choose ${key} icon`}><Icon /></button>)}</div></fieldset>
    <fieldset><legend>Repeat</legend><div className="segments">{['Every day','Weekdays','Custom'].map(s=><button type="button" key={s} className={schedule===s?'selected':''} onClick={()=>setSchedule(s)}>{s}</button>)}</div></fieldset>
    <button className="save" type="submit">Add habit</button>
  </form></div>;
}

function Nav({ active, onChange, onAdd }) { return <nav className="bottom-nav">{[{label:'Today',Icon:House},{label:'Progress',Icon:TrendUp}].map(({label,Icon})=><button key={label} className={active===label?'active':''} onClick={()=>onChange(label)}><Icon weight={active===label?'fill':'regular'}/><span>{label}</span></button>)}<button className="fab" onClick={onAdd} aria-label="Add habit"><Plus weight="bold"/></button></nav> }

createRoot(document.getElementById('root')).render(<App />);
