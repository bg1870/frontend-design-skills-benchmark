import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Plus, Home, BarChart3, Check, ChevronLeft, Flame, BookOpen, Droplets, Footprints, Moon, Dumbbell, Leaf, X } from 'lucide-react';
import './styles.css';

const iconMap = { BookOpen, Droplets, Footprints, Moon, Dumbbell, Leaf };
const initialHabits = [
  { id: 1, name: 'Read 10 pages', note: 'Wind down with a book', icon: 'BookOpen', streak: 18, done: true, color: 'blue' },
  { id: 2, name: 'Morning water', note: 'One glass before coffee', icon: 'Droplets', streak: 7, done: true, color: 'aqua' },
  { id: 3, name: 'Walk outside', note: 'At least 20 minutes', icon: 'Footprints', streak: 4, done: false, color: 'lime' },
  { id: 4, name: 'Lights out by 11', note: 'A gentler tomorrow', icon: 'Moon', streak: 11, done: false, color: 'violet' },
];

function Icon({ name, size = 20 }) { const C = iconMap[name] || Leaf; return <C size={size} strokeWidth={1.9} aria-hidden="true" />; }
function datesForWeek() {
  const now = new Date(); const day = now.getDay() || 7; const mon = new Date(now); mon.setDate(now.getDate() - day + 1);
  return Array.from({length: 7}, (_, i) => { const d = new Date(mon); d.setDate(mon.getDate() + i); return { letter: ['M','T','W','T','F','S','S'][i], number: d.getDate(), today: d.toDateString() === now.toDateString() }; });
}

function App() {
  const [habits, setHabits] = useState(initialHabits);
  const [view, setView] = useState('today');
  const [sheet, setSheet] = useState(false);
  const [name, setName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('Leaf');
  const now = new Date();
  const complete = habits.filter(h => h.done).length;
  const toggle = id => setHabits(habits.map(h => h.id === id ? {...h, done: !h.done} : h));
  const addHabit = e => { e.preventDefault(); if (!name.trim()) return; setHabits([...habits, {id: Date.now(), name: name.trim(), note: 'Every day', icon: selectedIcon, streak: 0, done: false, color: 'lime'}]); setName(''); setSheet(false); };

  return <main className="stage">
    <section className="phone" aria-label="Daymark habit tracker prototype">
      {view === 'today' ? <>
        <header className="topbar">
          <div><p className="date">{now.toLocaleDateString(undefined, {weekday:'long', month:'long', day:'numeric'})}</p><h1>{now.getHours() < 12 ? 'Good morning' : now.getHours() < 18 ? 'Good afternoon' : 'Good evening'}, Maya.</h1></div>
          <button className="avatar" aria-label="Open profile">M</button>
        </header>
        <div className="week" aria-label="Current week">{datesForWeek().map((d,i)=><div className={d.today?'day today':'day'} key={i}><span>{d.letter}</span><b>{d.number}</b></div>)}</div>
        <section className="progress-block" aria-label={`${complete} of ${habits.length} habits complete`}>
          <div className="progress-copy"><span>Today’s rhythm</span><strong>{complete}<small> / {habits.length}</small></strong></div>
          <div className="track"><i style={{width: `${habits.length ? complete/habits.length*100 : 0}%`}} /></div>
          <p>{complete === habits.length ? 'Everything is marked. Nicely done.' : complete === 0 ? 'Start with the easiest mark.' : `${habits.length-complete} small ${habits.length-complete === 1 ? 'step' : 'steps'} left.`}</p>
        </section>
        <section className="list-head"><h2>Your marks</h2><button onClick={()=>setSheet(true)}><Plus size={18}/> Add habit</button></section>
        <div className="habits">
          {habits.map(h => <article className={`habit ${h.done?'is-done':''}`} key={h.id}>
            <button className={`habit-main ${h.id===1?'opens-detail':''}`} onClick={()=>h.id===1 && setView('detail')} aria-label={h.id===1?`View streak details for ${h.name}`:undefined}>
              <span className={`habit-icon ${h.color}`}><Icon name={h.icon}/></span><span className="habit-text"><strong>{h.name}</strong><small>{h.note}</small></span>
              <span className="streak"><Flame size={15} fill="currentColor"/><b>{h.streak}</b></span>
            </button>
            <button className="check" onClick={()=>toggle(h.id)} aria-label={`${h.done?'Mark incomplete':'Mark complete'}: ${h.name}`} aria-pressed={h.done}>{h.done && <Check size={20}/>}</button>
          </article>)}
        </div>
      </> : <StreakDetail onBack={()=>setView('today')} />}
      <nav className="nav" aria-label="Primary navigation">
        <button className={view==='today'?'active':''} onClick={()=>setView('today')}><Home/><span>Today</span></button>
        <button className={view==='detail'?'active':''} onClick={()=>setView('detail')}><BarChart3/><span>Progress</span></button>
        <button className="add" onClick={()=>setSheet(true)} aria-label="Add a habit"><Plus/></button>
      </nav>
      {sheet && <AddSheet name={name} setName={setName} selectedIcon={selectedIcon} setSelectedIcon={setSelectedIcon} onClose={()=>setSheet(false)} onSubmit={addHabit}/>} 
    </section>
  </main>;
}

function StreakDetail({onBack}) {
  const marks = [1,1,1,1,1,0,1, 1,1,1,1,1,1,1, 1,1,1,1,0,1,1, 1,1,1,1,1,1,1];
  return <div className="detail">
    <header className="detail-head"><button onClick={onBack} aria-label="Back to today"><ChevronLeft/></button><span>Streak detail</span><i /></header>
    <div className="habit-title"><span className="habit-icon blue"><BookOpen/></span><div><h1>Read 10 pages</h1><p>Started August 22</p></div></div>
    <section className="streak-hero">
      <div className="orbit"><svg viewBox="0 0 180 180" aria-hidden="true"><circle cx="90" cy="90" r="76"/><circle className="arc" cx="90" cy="90" r="76"/></svg><div><Flame size={25} fill="currentColor"/><strong>18</strong><span>days</span></div></div>
      <h2>Your longest run yet.</h2><p>Two weeks became a ritual. Keep tomorrow’s book somewhere you’ll see it.</p>
    </section>
    <section className="calendar"><div className="calendar-head"><h2>Last 4 weeks</h2><span>26 of 28 days</span></div><div className="dots">{marks.map((m,i)=><span key={i} className={m?'marked':''}>{m?<Check size={14}/>:i+1}</span>)}</div><div className="cal-labels"><span>4 weeks ago</span><span>Today</span></div></section>
    <section className="stats"><div><strong>93%</strong><span>Completion rate</span></div><div><strong>18</strong><span>Best streak</span></div></section>
  </div>
}

function AddSheet({name,setName,selectedIcon,setSelectedIcon,onClose,onSubmit}) {
  const choices=['Leaf','BookOpen','Droplets','Footprints','Dumbbell','Moon'];
  return <div className="scrim" onMouseDown={e=>e.target===e.currentTarget&&onClose()}>
    <section className="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title">
      <div className="handle"/><header><div><p>Make a new mark</p><h2 id="sheet-title">Add a habit</h2></div><button onClick={onClose} aria-label="Close"><X/></button></header>
      <form onSubmit={onSubmit}>
        <label htmlFor="habit-name">What do you want to do?</label><input id="habit-name" name="habit-name" autoComplete="off" value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Stretch for 5 minutes…" required />
        <fieldset><legend>Choose a symbol</legend><div className="icon-choices">{choices.map(icon=><button type="button" key={icon} className={selectedIcon===icon?'selected':''} onClick={()=>setSelectedIcon(icon)} aria-label={`Choose ${icon} symbol`} aria-pressed={selectedIcon===icon}><Icon name={icon}/></button>)}</div></fieldset>
        <label>Repeat</label><button type="button" className="select-row"><span>Every day</span><span>Change</span></button>
        <button className="save" type="submit">Create habit</button>
      </form>
    </section>
  </div>;
}

createRoot(document.getElementById('root')).render(<App/>);
