import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowLeft, BarChart3, Check, ChevronRight, Flame, Home, Leaf, Moon, Plus, Settings, Sparkles, Target, X, Zap } from 'lucide-react';
import './styles.css';

const initialHabits = [
  { id: 1, name: 'Morning stretch', note: '10 minutes', time: '7:00 AM', icon: 'sparkles', color: '#f2a65a', done: true, streak: 12 },
  { id: 2, name: 'Read a chapter', note: 'Atomic Habits', time: '8:30 PM', icon: 'book', color: '#779b85', done: false, streak: 8 },
  { id: 3, name: 'Evening walk', note: '3,000 steps', time: '6:00 PM', icon: 'leaf', color: '#8b7bb5', done: false, streak: 4 },
];

const week = [
  { d: 'M', n: 2 }, { d: 'T', n: 3 }, { d: 'W', n: 4 },
  { d: 'T', n: 5 }, { d: 'F', n: 6 }, { d: 'S', n: 7 }, { d: 'S', n: 8 },
];

function HabitIcon({ type, size = 20 }) {
  if (type === 'leaf') return <Leaf size={size} strokeWidth={2.2}/>;
  if (type === 'book') return <span className="book-icon">⌁</span>;
  return <Sparkles size={size} strokeWidth={2.2}/>;
}

function App() {
  const [habits, setHabits] = useState(initialHabits);
  const [screen, setScreen] = useState('today');
  const [sheet, setSheet] = useState(false);
  const [name, setName] = useState('');
  const [frequency, setFrequency] = useState('Every day');
  const [selectedHabit, setSelectedHabit] = useState(initialHabits[0]);
  const complete = habits.filter(h => h.done).length;
  const progress = Math.round((complete / habits.length) * 100) || 0;

  const toggle = id => setHabits(hs => hs.map(h => h.id === id ? { ...h, done: !h.done } : h));
  const addHabit = () => {
    if (!name.trim()) return;
    setHabits(h => [...h, { id: Date.now(), name: name.trim(), note: frequency, time: 'Anytime', icon: 'leaf', color: '#d9775d', done: false, streak: 0 }]);
    setName(''); setSheet(false); setScreen('today');
  };
  const openStreak = habit => { setSelectedHabit(habit); setScreen('streak'); };

  return <div className="stage">
    <main className="app-shell">
      {screen === 'today' && <Today habits={habits} progress={progress} complete={complete} toggle={toggle} openStreak={openStreak} onAdd={() => setSheet(true)} />}
      {screen === 'streak' && <Streak habit={selectedHabit} onBack={() => setScreen('today')} />}
      {(screen === 'insights' || screen === 'settings') && <Placeholder type={screen} onBack={() => setScreen('today')} />}
      {screen !== 'streak' && <Nav screen={screen} setScreen={setScreen} onAdd={() => setSheet(true)} />}
      {sheet && <AddSheet name={name} setName={setName} frequency={frequency} setFrequency={setFrequency} close={() => setSheet(false)} add={addHabit}/>} 
    </main>
  </div>
}

function Today({ habits, progress, complete, toggle, openStreak, onAdd }) {
  return <div className="screen today-screen">
    <header className="topbar">
      <div><p className="eyebrow">MONDAY, SEPTEMBER 2</p><h1>Good morning, Alex</h1></div>
      <button className="avatar" aria-label="Profile">A<span></span></button>
    </header>

    <section className="week-card">
      <div className="week-row">{week.map((day, i) => <div className={`day ${i === 0 ? 'active' : ''}`} key={i}><span>{day.d}</span><b>{day.n}</b>{i < 4 && i !== 0 ? <i/> : null}</div>)}</div>
      <div className="progress-copy"><div><strong>{complete} of {habits.length} completed</strong><span>You're off to a great start.</span></div><b>{progress}%</b></div>
      <div className="progress"><i style={{ width: `${progress}%` }}/></div>
    </section>

    <div className="section-heading"><h2>Today</h2><button onClick={onAdd}><Plus size={17}/> Add habit</button></div>
    <section className="habit-list">
      {habits.map(h => <article className={`habit ${h.done ? 'done' : ''}`} key={h.id}>
        <button className="check" onClick={() => toggle(h.id)} aria-label={`Mark ${h.name} complete`}>{h.done && <Check size={18}/>}</button>
        <button className="habit-main" onClick={() => openStreak(h)}>
          <span className="habit-symbol" style={{ background: h.color + '20', color: h.color }}><HabitIcon type={h.icon}/></span>
          <span className="habit-copy"><strong>{h.name}</strong><small>{h.note} <i>•</i> {h.time}</small></span>
          <span className="mini-streak"><Flame size={15} fill="currentColor"/> {h.streak}</span><ChevronRight size={18} className="chevron"/>
        </button>
      </article>)}
    </section>
    <section className="quote"><span>“</span><p>We are what we repeatedly do.</p><small>ARISTOTLE</small></section>
  </div>
}

function Streak({ habit, onBack }) {
  const cells = useMemo(() => Array.from({length: 35}, (_, i) => i < 28 && ![4, 12, 23].includes(i)), []);
  return <div className="screen streak-screen">
    <header className="detail-header"><button onClick={onBack}><ArrowLeft/></button><h2>Habit details</h2><button className="more">•••</button></header>
    <section className="streak-hero">
      <span className="hero-icon" style={{background: habit.color+'20',color:habit.color}}><HabitIcon type={habit.icon} size={28}/></span>
      <p>{habit.name}</p><div className="big-streak"><Flame fill="currentColor"/><strong>{habit.streak}</strong></div><h1>day streak</h1><small>Keep showing up. You're building something strong.</small>
    </section>
    <section className="stats-row"><div><b>{habit.streak}</b><span>Current streak</span></div><div><b>18</b><span>Best streak</span></div><div><b>86%</b><span>Completion rate</span></div></section>
    <section className="calendar-card">
      <div className="calendar-title"><div><h3>September</h3><span>28 days completed</span></div><button>2026⌄</button></div>
      <div className="cal-grid cal-labels">{['M','T','W','T','F','S','S'].map((x,i)=><span key={i}>{x}</span>)}</div>
      <div className="cal-grid">{cells.map((active,i)=><span className={`${active?'filled':''} ${i===28?'today':''}`} key={i}>{i+1}</span>)}</div>
    </section>
    <section className="milestone"><span><Target/></span><div><small>NEXT MILESTONE</small><strong>30 day streak</strong><div className="progress"><i style={{width:`${Math.min(habit.streak/30*100,100)}%`}}/></div></div><b>{Math.min(habit.streak,30)}/30</b></section>
    <button className="back-today" onClick={onBack}>Back to today</button>
  </div>
}

function AddSheet({ name, setName, frequency, setFrequency, close, add }) {
  return <div className="overlay" onMouseDown={e => e.target === e.currentTarget && close()}>
    <section className="sheet"><div className="grab"/><header><div><p>NEW RITUAL</p><h2>Add a habit</h2></div><button onClick={close}><X/></button></header>
      <label className="field-label">What do you want to do?</label><div className="name-input"><span><Sparkles size={20}/></span><input autoFocus value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Drink more water"/></div>
      <label className="field-label">Frequency</label><div className="choice-row">{['Every day','Weekdays','Custom'].map(x=><button key={x} onClick={()=>setFrequency(x)} className={frequency===x?'selected':''}>{x}</button>)}</div>
      <label className="field-label">Reminder</label><button className="reminder"><span><Moon size={19}/></span><div><strong>Anytime</strong><small>No reminder set</small></div><ChevronRight/></button>
      <div className="sheet-tip"><Zap size={18} fill="currentColor"/><p><strong>Start small.</strong> Habits that take under two minutes are easier to keep.</p></div>
      <button className="create" onClick={add} disabled={!name.trim()}>Create habit</button>
    </section>
  </div>
}

function Nav({screen,setScreen,onAdd}) { return <nav><button className={screen==='today'?'active':''} onClick={()=>setScreen('today')}><Home/><span>Today</span></button><button onClick={()=>setScreen('insights')} className={screen==='insights'?'active':''}><BarChart3/><span>Insights</span></button><button className="nav-add" onClick={onAdd}><Plus/></button><button onClick={()=>setScreen('settings')} className={screen==='settings'?'active':''}><Settings/><span>Settings</span></button><button onClick={()=>setScreen('streak')}><Flame/><span>Streaks</span></button></nav> }
function Placeholder({type,onBack}) { return <div className="screen placeholder"><button className="plain-back" onClick={onBack}><ArrowLeft/> Today</button><div className="placeholder-icon">{type==='insights'?<BarChart3/>:<Settings/>}</div><h1>{type==='insights'?'Your insights':'Settings'}</h1><p>{type==='insights'?'Your consistency is trending upward this week.':'Personalize reminders, appearance, and your daily rhythm.'}</p><button className="back-today" onClick={onBack}>Back to today</button></div> }

createRoot(document.getElementById('root')).render(<App/>);
