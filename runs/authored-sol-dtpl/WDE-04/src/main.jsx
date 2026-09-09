import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';
import './styles.css';

const habitsSeed = [
  {id:1, icon:'drop', name:'Drink water', meta:'8 glasses', time:'Morning', done:true, tint:'blue'},
  {id:2, icon:'book', name:'Read 20 pages', meta:'20 min', time:'Afternoon', done:false, tint:'peach'},
  {id:3, icon:'walk', name:'Evening walk', meta:'30 min', time:'Evening', done:false, tint:'sage'},
  {id:4, icon:'moon', name:'No screens after 10', meta:'Wind down', time:'Night', done:false, tint:'lavender'},
];
const iconPaths={
  drop:<path d="M12 3s-5 5.3-5 9a5 5 0 0 0 10 0c0-3.7-5-9-5-9Zm-2 10.3c.3 1 1 1.7 2.1 1.9"/>,
  book:<><path d="M5 4.5h7a3 3 0 0 1 3 3v12H8a3 3 0 0 1-3-3v-12Z"/><path d="M8 16h7M15 7.5h3v12h-3"/></>,
  walk:<><circle cx="13" cy="4.5" r="2"/><path d="m11.5 8-2.7 4 3.2 2 2 6M12 10l4 3 3-1M10.5 14 7 19"/></>,
  moon:<path d="M19 15.5A8 8 0 0 1 8.5 5a8 8 0 1 0 10.5 10.5Z"/>,
  flame:<path d="M13.3 3.2c.4 3.5-2.2 4.5-2.2 7.1 0 1.2.8 2 1.8 2.4-.2-1.8.7-3.2 1.7-4 1.8 1.7 3.2 3.7 3.2 6.1a5.8 5.8 0 0 1-11.6 0c0-4.3 3.3-7.8 7.1-11.6Z"/>,
};
function Icon({name,size=22}){return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{iconPaths[name]}</svg>}

function HabitRow({habit,onToggle}){return <div className={'habit-row '+(habit.done?'is-done':'')}>
  <div className={'habit-icon '+habit.tint}><Icon name={habit.icon}/></div>
  <button className="habit-copy" onClick={()=>onToggle(habit.id)} aria-label={`${habit.done?'Mark incomplete':'Complete'} ${habit.name}`}>
    <strong>{habit.name}</strong><span>{habit.meta} · {habit.time}</span>
  </button>
  <button className="check" onClick={()=>onToggle(habit.id)} aria-label={`${habit.done?'Mark incomplete':'Complete'} ${habit.name}`}>{habit.done&&<svg viewBox="0 0 20 20"><path d="m5 10.5 3 3 7-7"/></svg>}</button>
</div>}

function StreakDetail({onBack}){const weeks=[[0,0,1,1,1,1,1],[1,1,1,1,1,1,1],[1,1,1,1,1,1,1],[1,1,1,1,1,0,0],[1,1,1,1,0,0,0]];return <main className="screen detail-screen">
  <header className="subhead"><button className="round-button" onClick={onBack} aria-label="Back"><span>←</span></button><h1>Your streak</h1><div className="round-spacer"/></header>
  <section className="streak-hero"><div className="big-flame"><Icon name="flame" size={34}/></div><div className="streak-number">12</div><div className="streak-label">days in rhythm</div><p>You’ve shown up every day since<br/>Monday, May 13.</p></section>
  <section className="calendar" aria-label="Habit completion for May"><div className="calendar-top"><h2>May</h2><span>84% complete</span></div><div className="day-labels">{['M','T','W','T','F','S','S'].map((d,i)=><span key={i}>{d}</span>)}</div>{weeks.map((week,i)=><div className="week" key={i}>{week.map((v,j)=><span key={j} className={v?'filled':''}>{i*7+j<31?i*7+j+1:''}</span>)}</div>)}</section>
  <section className="milestone"><div className="mini-flame"><Icon name="flame"/></div><div><span>Next milestone</span><strong>Two weeks</strong></div><div className="days-left">2 days</div></section>
  <p className="quote">“Small steps, repeated daily,<br/>become a life you love.”</p>
</main>}

function AddSheet({onClose,onAdd}){const [name,setName]=useState('');const [frequency,setFrequency]=useState('Daily');const [time,setTime]=useState('Morning');const submit=e=>{e.preventDefault();if(name.trim())onAdd(name.trim(),time)};return <div className="sheet-layer" role="dialog" aria-modal="true" aria-labelledby="add-title" onMouseDown={e=>e.target===e.currentTarget&&onClose()}>
 <form className="sheet" onSubmit={submit}><div className="grabber"/><div className="sheet-head"><h2 id="add-title">New habit</h2><button type="button" onClick={onClose} aria-label="Close">×</button></div>
 <label className="field-label" htmlFor="habitName">I want to…</label><input autoFocus id="habitName" value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Meditate for 10 minutes" maxLength="48"/>
 <fieldset><legend>Frequency</legend><div className="segments">{['Daily','Weekdays','Custom'].map(x=><button type="button" key={x} className={frequency===x?'selected':''} onClick={()=>setFrequency(x)}>{x}</button>)}</div></fieldset>
 <fieldset><legend>Best time</legend><div className="time-grid">{[['Morning','☀'],['Afternoon','◒'],['Evening','◐'],['Anytime','↻']].map(([x,s])=><button type="button" key={x} className={time===x?'selected':''} onClick={()=>setTime(x)}><i>{s}</i>{x}</button>)}</div></fieldset>
 <button className="add-submit" disabled={!name.trim()}>Add to my day</button><p className="prototype-note">Saved on this device for this prototype session.</p>
 </form></div>}

function Today({habits,onToggle,onStreak,onAdd}){const done=habits.filter(h=>h.done).length;const pct=Math.round(done/habits.length*100);return <main className="screen today-screen">
 <header className="topbar"><div className="brand"><span className="brand-mark">r</span><span>rhythm</span></div><button className="avatar" aria-label="Profile">AM</button></header>
 <section className="intro"><p>WEDNESDAY · MAY 29</p><h1>Good morning,<br/><em>Alex.</em></h1><span>What will you make time for today?</span></section>
 <button className="streak-card" onClick={onStreak}><div className="flame"><Icon name="flame" size={26}/></div><div><strong>12 day streak</strong><span>Keep your rhythm going</span></div><span className="arrow">→</span></button>
 <section className="today-list"><div className="section-head"><div><h2>Today</h2><span>{done} of {habits.length} complete</span></div><div className="progress" style={{'--p':pct}} aria-label={`${pct}% complete`}><span>{pct}%</span></div></div>
 <div className="habits">{habits.map(h=><HabitRow key={h.id} habit={h} onToggle={onToggle}/>)}</div></section>
 <button className="fab" onClick={onAdd}><span>＋</span>Add habit</button>
 <nav className="bottom-nav" aria-label="Primary"><button className="active"><span>⌂</span>Today</button><button onClick={onStreak}><span>⌁</span>Journey</button><button><span>◌</span>Insights</button></nav>
 </main>}
function App(){const [view,setView]=useState('today');const [sheet,setSheet]=useState(false);const [habits,setHabits]=useState(habitsSeed);const toggle=id=>setHabits(x=>x.map(h=>h.id===id?{...h,done:!h.done}:h));const add=(name,time)=>{setHabits(x=>[...x,{id:Date.now(),icon:'book',name,meta:'New habit',time,done:false,tint:'peach'}]);setSheet(false)};return <div className="app-shell">{view==='today'?<Today habits={habits} onToggle={toggle} onStreak={()=>setView('streak')} onAdd={()=>setSheet(true)}/>:<StreakDetail onBack={()=>setView('today')}/>} {sheet&&<AddSheet onClose={()=>setSheet(false)} onAdd={add}/>}</div>}

createRoot(document.getElementById('root')).render(<App/>);
