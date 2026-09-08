import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowLeft, Check, ChevronRight, Flame, Plus, X } from 'lucide-react';
import './styles.css';

const initialHabits = [
  { id: 1, name: 'Morning pages', note: 'Write · 10 min', time: '7:30', color: '#EB5A3C', done: true, streak: 18 },
  { id: 2, name: 'Move outdoors', note: 'Walk · 30 min', time: '12:30', color: '#527864', done: true, streak: 12 },
  { id: 3, name: 'Read fiction', note: 'Read · 20 pages', time: '21:00', color: '#AA744B', done: false, streak: 6 },
  { id: 4, name: 'Lights out', note: 'Sleep · before 23:00', time: '23:00', color: '#57566C', done: false, streak: 4 },
];

const week = ['M','T','W','T','F','S','S'];
const dates = [7,8,9,10,11,12,13];

function App() {
  const [habits, setHabits] = useState(initialHabits);
  const [view, setView] = useState('today');
  const [detail, setDetail] = useState(null);
  const [sheet, setSheet] = useState(false);
  const [newName, setNewName] = useState('');
  const done = habits.filter(h => h.done).length;
  const progress = done / habits.length;

  const toggle = id => setHabits(hs => hs.map(h => h.id === id ? {...h, done: !h.done} : h));
  const openDetail = habit => { setDetail(habit); setView('detail'); };
  const addHabit = e => {
    e.preventDefault();
    if (!newName.trim()) return;
    setHabits(h => [...h, { id: Date.now(), name: newName.trim(), note: 'Daily practice', time: 'Anytime', color: '#EB5A3C', done: false, streak: 0 }]);
    setNewName(''); setSheet(false);
  };

  return <main className="stage">
    <section className="phone" aria-label="Stead habit tracker prototype">
      <div className="status"><b>9:41</b><span className="island"/><span>5G&nbsp; ▰</span></div>
      <div className="screen">
        {view === 'today' && <Today habits={habits} done={done} progress={progress} onToggle={toggle} onDetail={openDetail} onAdd={() => setSheet(true)} />}
        {view === 'streaks' && <Streaks habits={habits} onDetail={openDetail}/>} 
        {view === 'detail' && <Detail habit={detail || habits[0]} onBack={() => setView('today')} />}
      </div>
      {view !== 'detail' && <nav className="nav" aria-label="Main navigation">
        <button className={view === 'today' ? 'active' : ''} onClick={() => setView('today')}><span className="navmark">Today</span></button>
        <button className={view === 'streaks' ? 'active' : ''} onClick={() => setView('streaks')}><Flame size={17}/><span>Streaks</span></button>
        <button className="add" onClick={() => setSheet(true)} aria-label="Add habit"><Plus/></button>
      </nav>}
      {sheet && <AddSheet value={newName} setValue={setNewName} close={() => setSheet(false)} submit={addHabit}/>} 
    </section>
    <p className="desktop-note">A quiet rhythm, built one day at a time.</p>
  </main>
}

function Today({habits, done, progress, onToggle, onDetail, onAdd}) {
  return <div className="page today-page">
    <header className="today-head">
      <div><p className="eyebrow">MONDAY, OCTOBER 7</p><h1>Good morning,<br/>Maya.</h1></div>
      <button className="avatar" aria-label="Profile">M</button>
    </header>
    <section className="progress-band">
      <div className="progress-copy"><p>Today’s rhythm</p><strong>{done}<i> / {habits.length}</i></strong><span>{done === habits.length ? 'A complete day.' : `${habits.length-done} gentle nudges left`}</span></div>
      <div className="dial" style={{'--p': `${progress * 360}deg`}}><div><b>{Math.round(progress*100)}</b><small>%</small></div></div>
    </section>
    <div className="list-head"><h2>Your practices</h2><button onClick={onAdd}>Edit</button></div>
    <div className="habit-list">
      {habits.map((h, i) => <article className={`habit ${h.done ? 'completed' : ''}`} key={h.id} style={{'--delay': `${i*65}ms`}}>
        <button className="check" style={{'--habit':h.color}} onClick={() => onToggle(h.id)} aria-label={`${h.done?'Undo':'Complete'} ${h.name}`}>{h.done && <Check size={18}/>}</button>
        <button className="habit-body" onClick={() => onDetail(h)}><span className="habit-name">{h.name}</span><span className="habit-note">{h.note}</span></button>
        <button className="habit-time" onClick={() => onDetail(h)}>{h.time}<ChevronRight size={15}/></button>
      </article>)}
    </div>
    <p className="quote">“Small things, faithfully repeated.”</p>
  </div>
}

function Streaks({habits, onDetail}) {
  return <div className="page streak-page">
    <header><p className="eyebrow">YOUR MOMENTUM</p><h1>Keep the<br/><em>thread.</em></h1></header>
    <section className="hero-streak"><span>Current best</span><strong>18</strong><p>days in motion</p><Flame className="flame" size={42}/></section>
    <div className="streak-list"><h2>All streaks</h2>{habits.map(h => <button key={h.id} onClick={() => onDetail(h)}><i style={{background:h.color}}/><span>{h.name}<small>{h.done ? 'Done today' : 'Due today'}</small></span><b>{h.streak}<small> days</small></b><ChevronRight size={16}/></button>)}</div>
  </div>
}

function Detail({habit, onBack}) {
  const grid = useMemo(() => Array.from({length:35}, (_,i) => i < 26 ? (i % 9 !== 0) : false), []);
  return <div className="page detail-page">
    <header className="detail-head"><button onClick={onBack} aria-label="Back"><ArrowLeft/></button><span>STREAK DETAIL</span><button className="dots">•••</button></header>
    <section className="detail-title"><div className="habit-glyph" style={{background:habit.color}}>↗</div><h1>{habit.name}</h1><p>{habit.note}</p></section>
    <section className="number-band"><div><strong>{habit.streak || 0}</strong><span>current<br/>streak</span></div><div><strong>{Math.max(21,habit.streak)}</strong><span>personal<br/>best</span></div></section>
    <section className="calendar"><div className="cal-head"><h2>October</h2><span>82% consistent</span></div><div className="weekday">{week.map((d,i)=><span key={i}>{d}</span>)}</div><div className="heat-grid">{grid.map((filled,i)=><i key={i} className={filled?'filled':''}>{i<3?'':i-2}</i>)}</div></section>
    <div className="encourage"><Flame size={18}/><p><b>Four more days</b> to make this your longest streak yet.</p></div>
  </div>
}

function AddSheet({value,setValue,close,submit}) {
  return <div className="scrim" onMouseDown={e => e.target === e.currentTarget && close()}>
    <form className="sheet" onSubmit={submit}>
      <div className="grab"/><header><div><p className="eyebrow">NEW PRACTICE</p><h2>What will you<br/>return to?</h2></div><button type="button" onClick={close} aria-label="Close"><X/></button></header>
      <label>Habit name<input autoFocus value={value} onChange={e=>setValue(e.target.value)} placeholder="e.g. Stretch for ten minutes"/></label>
      <div className="options"><button type="button"><span>Repeat</span><b>Every day</b></button><button type="button"><span>Reminder</span><b>Anytime</b></button></div>
      <button className="create" type="submit" disabled={!value.trim()}>Begin this practice <span>↗</span></button>
    </form>
  </div>
}

createRoot(document.getElementById('root')).render(<App/>);
