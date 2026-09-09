import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowLeft, Bell, BookOpen, Check, ChevronRight, Droplets, Footprints, Plus, Sparkles, Target, X } from 'lucide-react';
import './styles.css';

const starterHabits = [
  { id: 1, name: 'Morning pages', cue: 'After coffee', streak: 12, done: true, icon: BookOpen, tone: 'ink' },
  { id: 2, name: 'Walk outside', cue: '20 minutes', streak: 8, done: false, icon: Footprints, tone: 'leaf' },
  { id: 3, name: 'Drink water', cue: '6 glasses', streak: 4, done: false, icon: Droplets, tone: 'water' },
];

const weekPattern = [1,1,0,1,1,1,1, 1,1,1,1,0,1,1, 1,1,1,1,1,1,1, 0,1,1,1,1,1,1, 1,1,1,1,1,0,1];

function formatToday() {
  return new Intl.DateTimeFormat(undefined, { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date());
}

function App() {
  const [habits, setHabits] = useState(starterHabits);
  const [detail, setDetail] = useState(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [name, setName] = useState('');
  const [cadence, setCadence] = useState('Every day');
  const [reminder, setReminder] = useState(false);
  const [toast, setToast] = useState('');
  const completed = habits.filter(h => h.done).length;
  const progress = habits.length ? completed / habits.length : 0;
  const dateLabel = useMemo(formatToday, []);

  const toggleHabit = (id) => {
    setHabits(items => items.map(h => h.id === id ? { ...h, done: !h.done } : h));
  };

  const addHabit = (e) => {
    e.preventDefault();
    const cleanName = name.trim();
    if (!cleanName) return;
    setHabits(items => [...items, { id: Date.now(), name: cleanName, cue: cadence, streak: 0, done: false, icon: Target, tone: 'sun' }]);
    setName(''); setCadence('Every day'); setReminder(false); setSheetOpen(false);
    setToast('Habit added');
    window.setTimeout(() => setToast(''), 2200);
  };

  return (
    <main className="stage">
      <section className="phone" aria-label="Sprig habit tracker prototype">
        <a className="skip-link" href="#app-content">Skip to content</a>
        <div className="app-screen" id="app-content">
          {detail ? (
            <StreakDetail habit={detail} onBack={() => setDetail(null)} />
          ) : (
            <Today habits={habits} completed={completed} progress={progress} dateLabel={dateLabel} onToggle={toggleHabit} onDetail={setDetail} onAdd={() => setSheetOpen(true)} />
          )}
              {sheetOpen && <AddSheet name={name} setName={setName} cadence={cadence} setCadence={setCadence} reminder={reminder} setReminder={setReminder} onClose={() => setSheetOpen(false)} onSubmit={addHabit} />}
          {toast && <div className="toast" role="status"><Check size={17} />{toast}</div>}
        </div>
      </section>
    </main>
  );
}

function Today({ habits, completed, progress, dateLabel, onToggle, onDetail, onAdd }) {
  return <div className="view today-view">
    <header className="topbar">
      <div><span className="brand">sprig<span>.</span></span><span className="demo-label">Sample data</span></div>
      <button className="icon-button" aria-label="Notifications"><Bell size={20} /></button>
    </header>

    <section className="day-intro" aria-labelledby="today-title">
      <p className="date">{dateLabel}</p>
      <div className="title-row">
        <h1 id="today-title">Today</h1>
        <div className="progress-orbit" style={{'--progress': `${progress * 360}deg`}} aria-label={`${completed} of ${habits.length} habits complete`}>
          <span>{completed}<small>/{habits.length}</small></span>
        </div>
      </div>
      <p className="encouragement">{completed === habits.length ? 'You kept every promise today.' : completed === 0 ? 'Begin with one small promise.' : `${habits.length - completed} small ${habits.length - completed === 1 ? 'promise' : 'promises'} left.`}</p>
    </section>

    <section className="habit-list" aria-labelledby="habits-heading">
      <div className="section-heading"><h2 id="habits-heading">Daily rhythm</h2><span>{completed} done</span></div>
      {habits.map((habit, index) => {
        const Icon = habit.icon;
        return <article className={`habit-row ${habit.done ? 'is-done' : ''}`} key={habit.id}>
          <button className="check-button" onClick={() => onToggle(habit.id)} aria-label={`${habit.done ? 'Mark incomplete' : 'Mark complete'}: ${habit.name}`} aria-pressed={habit.done}>
            {habit.done ? <Check size={21} strokeWidth={2.5} /> : <span>{String(index + 1).padStart(2, '0')}</span>}
          </button>
          <button className="habit-main" onClick={() => onDetail(habit)} aria-label={`View streak for ${habit.name}`}>
            <span className={`habit-icon ${habit.tone}`}><Icon size={19} /></span>
            <span className="habit-copy"><strong>{habit.name}</strong><small>{habit.cue}</small></span>
            <span className="streak"><b>{habit.streak}</b> days <ChevronRight size={17} /></span>
          </button>
        </article>;
      })}
    </section>

    <div className="quiet-note"><Sparkles size={16}/><span>Consistency grows quietly.</span></div>
    <button className="add-button" onClick={onAdd}><Plus size={21}/>Add habit</button>
  </div>;
}

function StreakDetail({ habit, onBack }) {
  return <div className="view detail-view">
    <header className="detail-topbar">
      <button className="icon-button" onClick={onBack} aria-label="Back to today"><ArrowLeft size={22}/></button>
      <span className="brand small">sprig<span>.</span></span>
      <span className="top-spacer" />
    </header>
    <section className="streak-hero">
      <p className="date">Current streak</p>
      <div className="streak-number"><strong>{habit.streak}</strong><span>days</span></div>
      <h1>{habit.name}</h1>
      <p>Each check is a vote for the rhythm you're building.</p>
    </section>
    <section className="growth-log" aria-labelledby="growth-title">
      <div className="section-heading"><h2 id="growth-title">Last 5 weeks</h2><span>29 of 35</span></div>
      <div className="week-labels" aria-hidden="true"><span>M</span><span>W</span><span>F</span><span>S</span></div>
      <div className="habit-grid" aria-label="Completion history: 29 of the last 35 days completed">
        {weekPattern.map((done, i) => <span key={i} className={done ? 'grown' : ''} title={done ? 'Completed' : 'Missed'} />)}
      </div>
      <div className="grid-key"><span><i className="key-empty"/>Rest</span><span><i className="key-grown"/>Completed</span></div>
    </section>
    <section className="best-row">
      <div><small>Personal best</small><strong>{Math.max(habit.streak, 18)} days</strong></div>
      <div><small>Started</small><strong>{habit.streak ? `${habit.streak + 19} days ago` : 'Today'}</strong></div>
    </section>
    <button className="back-button" onClick={onBack}>Back to today</button>
  </div>;
}

function AddSheet({ name, setName, cadence, setCadence, reminder, setReminder, onClose, onSubmit }) {
  return <div className="sheet-layer" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && onClose()} onKeyDown={(e) => e.key === 'Escape' && onClose()}>
    <section className="sheet" role="dialog" aria-modal="true" aria-labelledby="add-title">
      <div className="sheet-handle" aria-hidden="true" />
      <div className="sheet-header"><div><p className="date">Plant a new rhythm</p><h2 id="add-title">Add habit</h2></div><button className="icon-button" onClick={onClose} aria-label="Close add habit sheet"><X size={21}/></button></div>
      <form onSubmit={onSubmit}>
        <label className="field"><span>What do you want to do?</span><input name="habitName" autoComplete="off" required value={name} maxLength={40} onChange={e => setName(e.target.value)} placeholder="Example: Read for 10 minutes…" /></label>
        <fieldset><legend>How often?</legend><div className="cadence-options">{['Every day', 'Weekdays', '3× a week'].map(option => <button type="button" className={cadence === option ? 'selected' : ''} aria-pressed={cadence === option} onClick={() => setCadence(option)} key={option}>{option}</button>)}</div></fieldset>
        <label className="reminder-row"><span><Bell size={19}/><span><strong>Gentle reminder</strong><small>At 8:00 AM</small></span></span><input type="checkbox" checked={reminder} onChange={e => setReminder(e.target.checked)} /></label>
        <button className="save-button"><Plus size={20}/>Add to my day</button>
      </form>
    </section>
  </div>;
}

createRoot(document.getElementById('root')).render(<App />);
