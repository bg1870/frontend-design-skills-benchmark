import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowLeft, Check, ChevronRight, Flame, Plus, X } from 'lucide-react';
import './styles.css';

const initialHabits = [
  { id: 1, name: 'Morning walk', note: '20 minutes outside', time: '7:30 AM', done: true, streak: 12 },
  { id: 2, name: 'Read a chapter', note: 'Fiction or nonfiction', time: '8:00 PM', done: false, streak: 6 },
  { id: 3, name: 'No phone at lunch', note: 'A quiet half hour', time: '12:30 PM', done: false, streak: 3 },
];
const heat = [0,1,1,1,1,1,0, 1,1,1,0,1,1,1, 1,1,1,1,1,1,1, 1,1,1,1,1,1,1, 1,1,1,1,1,1,1];

function App(){
 const [habits,setHabits]=useState(initialHabits); const [view,setView]=useState('today'); const [sheet,setSheet]=useState(false); const [name,setName]=useState(''); const [frequency,setFrequency]=useState('Every day'); const [toast,setToast]=useState('');
 const done=habits.filter(h=>h.done).length;
 const toggle=id=>setHabits(h=>h.map(x=>x.id===id?{...x,done:!x.done}:x));
 const save=e=>{e.preventDefault(); if(!name.trim()) return; setHabits(h=>[...h,{id:Date.now(),name:name.trim(),note:frequency,time:'Any time',done:false,streak:0}]); setName(''); setSheet(false); setToast('Habit added for today'); setTimeout(()=>setToast(''),2600)};
 return <main className="stage"><section className="phone" aria-label="Tending habit tracker">
  {view==='today' ? <>
   <header className="topbar"><div><p className="eyebrow">WEDNESDAY, SEPT 9</p><h1>Today</h1></div><button className="avatar" aria-label="Open profile">RB</button></header>
   <section className="progress" aria-label={`${done} of ${habits.length} habits completed`}><div className="progress-copy"><strong>{done} of {habits.length}</strong><span>Small steps, kept gently.</span></div><div className="track"><i style={{width:`${habits.length?done/habits.length*100:0}%`}}/></div></section>
   <div className="section-head"><h2>Your rhythm</h2><button className="text-button" onClick={()=>setView('streak')}>View streak <ChevronRight size={16}/></button></div>
   <div className="habit-list">{habits.map(h=><article className={`habit ${h.done?'is-done':''}`} key={h.id}><button className="check" onClick={()=>toggle(h.id)} aria-label={`${h.done?'Mark incomplete':'Complete'} ${h.name}`} aria-pressed={h.done}>{h.done&&<Check size={20}/>}</button><button className="habit-copy" onClick={()=>setView('streak')}><strong>{h.name}</strong><span>{h.note} · {h.time}</span></button><div className="streak"><Flame size={15}/><span>{h.streak}</span></div></article>)}</div>
   <button className="add" onClick={()=>setSheet(true)}><Plus size={20}/> Add a habit</button>
   <footer><span>Today</span><button onClick={()=>setView('streak')}>Progress</button></footer>
  </> : <Streak onBack={()=>setView('today')}/>} 
  {sheet&&<div className="scrim" onMouseDown={()=>setSheet(false)}><section className="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title" onMouseDown={e=>e.stopPropagation()}><div className="handle"/><div className="sheet-head"><div><p className="eyebrow">NEW ROUTINE</p><h2 id="sheet-title">Add a habit</h2></div><button className="close" onClick={()=>setSheet(false)} aria-label="Close"><X size={20}/></button></div><form onSubmit={save}><label>What do you want to do?<input autoFocus value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Stretch for 10 minutes"/></label><fieldset><legend>How often?</legend>{['Every day','Weekdays','Weekends'].map(f=><button type="button" key={f} className={frequency===f?'selected':''} onClick={()=>setFrequency(f)}>{f}</button>)}</fieldset><p className="hint">You can adjust reminders and goals later.</p><button className="save" disabled={!name.trim()}>Add to today</button></form></section></div>}
  {toast&&<div className="toast" role="status"><Check size={17}/>{toast}</div>}
 </section></main>
}
function Streak({onBack}){return <div className="detail"><header className="detail-head"><button className="back" onClick={onBack} aria-label="Back to today"><ArrowLeft size={22}/></button><span>Progress</span></header><section className="hero"><p className="eyebrow">CURRENT STREAK</p><div className="big-number">12 <Flame size={28}/></div><h1>days in a row</h1><p>You’ve shown up every day since August 29.</p></section><section className="calendar"><div className="calendar-head"><h2>Last 5 weeks</h2><span>Morning walk</span></div><div className="days"><i/> {['M','T','W','T','F','S','S'].map((d,i)=><span key={i}>{d}</span>)}</div><div className="heat"><div className="week-labels"><span>Aug 10</span><span>Aug 24</span><span>Sep 7</span></div><div className="squares">{heat.map((v,i)=><i key={i} className={v?'on':''}>{i===32&&<span>Today</span>}</i>)}</div></div></section><section className="best"><p>PERSONAL BEST</p><strong>18 days</strong><span>May 4–21</span></section><button className="return" onClick={onBack}>Back to today</button></div>}

createRoot(document.getElementById('root')).render(<App/>);
