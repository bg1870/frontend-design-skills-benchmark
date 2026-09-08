import React, {useEffect, useRef, useState} from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowLeft, ChevronRight, Flame, Home, BarChart3, Plus, X, Bell, Check } from 'lucide-react';
import './styles.css';

const seed = [
  {id:1,name:'Morning stretch',note:'10 minutes',color:'#df6b57',done:true},
  {id:2,name:'Read a chapter',note:'Before bed',color:'#6b8772',done:true},
  {id:3,name:'Walk outside',note:'20 minutes',color:'#d49b36',done:false},
  {id:4,name:'No phone at lunch',note:'A quieter break',color:'#7880a8',done:false},
];
const days=[['W',1,true],['T',2,true],['F',3,true],['S',4,true],['S',5,true],['M',6,true],['T',7,true],['W',8,'today'],['T',9,false],['F',10,false],['S',11,false],['S',12,false],['M',13,false],['T',14,false]];

function App(){
 const [view,setView]=useState('today'); const [habits,setHabits]=useState(seed); const [sheet,setSheet]=useState(false); const [name,setName]=useState(''); const [remind,setRemind]=useState(true); const input=useRef(null); const addRef=useRef(null);
 useEffect(()=>{ if(sheet) setTimeout(()=>input.current?.focus(),120); },[sheet]);
 useEffect(()=>{ const esc=e=>e.key==='Escape'&&closeSheet(); document.addEventListener('keydown',esc); return()=>document.removeEventListener('keydown',esc)},[sheet]);
 const closeSheet=()=>{setSheet(false);setName('');setTimeout(()=>addRef.current?.focus(),0)};
 const addHabit=e=>{e.preventDefault();if(!name.trim())return;setHabits(h=>[...h,{id:Date.now(),name:name.trim(),note:remind?'Reminder at 8:00 PM':'Every day',color:'#df6b57',done:false}]);closeSheet();setView('today')};
 const done=habits.filter(h=>h.done).length;
 const todayLabel=new Intl.DateTimeFormat(undefined,{weekday:'long',month:'long',day:'numeric'}).format(new Date(2026,8,8));
 return <main className="stage"><section className="phone" aria-label="Ritual habit tracker">
  <header className="topbar">{view==='streak'?<button className="icon" onClick={()=>setView('today')} aria-label="Back to today"><ArrowLeft/></button>:<div className="brand-mark" aria-hidden="true"><span/></div>}<span className="brand">Ritual</span><button className="avatar" aria-label="Profile for Mia">M</button></header>
  {view==='today'?<div className="screen today">
   <div className="date-row"><div><p className="kicker">{todayLabel}</p><h1>Today</h1></div><div className="count"><strong>{done}</strong><span>of {habits.length}</span></div></div>
   <button className="streak-strip" onClick={()=>setView('streak')}><span className="flame"><Flame fill="currentColor"/></span><span><strong>7 day streak</strong><small>You're building a rhythm</small></span><ChevronRight className="chev"/></button>
   <section className="habit-list" aria-labelledby="habits-title"><div className="section-head"><h2 id="habits-title">Your rituals</h2><span>{done}/{habits.length} complete</span></div>
    {habits.map((h,i)=><button className={'habit '+(h.done?'completed':'')} key={h.id} onClick={()=>setHabits(xs=>xs.map(x=>x.id===h.id?{...x,done:!x.done}:x))} aria-pressed={h.done}><span className="habit-index">{String(i+1).padStart(2,'0')}</span><span className="habit-copy"><strong>{h.name}</strong><small>{h.note}</small></span><span className="ring" style={{'--habit':h.color}}>{h.done&&<Check/>}</span></button>)}
   </section>
   {done===habits.length&&<div className="all-done">Day complete. Keep the evening gentle.</div>}
  </div>:<Streak onBack={()=>setView('today')}/>} 
  <nav className="nav" aria-label="Main navigation"><button className={view==='today'?'active':''} onClick={()=>setView('today')}><Home/><span>Today</span></button><button className={view==='streak'?'active':''} onClick={()=>setView('streak')}><BarChart3/><span>Streaks</span></button><button ref={addRef} className="add" onClick={()=>setSheet(true)} aria-label="Add a habit"><Plus/></button></nav>
  {sheet&&<div className="scrim" onMouseDown={e=>e.target===e.currentTarget&&closeSheet()}><section className="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title"><div className="handle"/><div className="sheet-head"><div><p className="kicker">A small promise</p><h2 id="sheet-title">Add a habit</h2></div><button className="icon" onClick={closeSheet} aria-label="Close add habit"><X/></button></div><form onSubmit={addHabit}><label htmlFor="habit-name">What do you want to repeat?</label><input ref={input} id="habit-name" name="habitName" autoComplete="off" value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Drink a glass of water…" required/><div className="frequency"><span>Frequency</span><div><button type="button" className="selected">Every day</button><button type="button" disabled>Custom</button></div></div><button type="button" className="reminder" onClick={()=>setRemind(!remind)} aria-pressed={remind}><Bell/><span><strong>Evening reminder</strong><small>{remind?'8:00 PM':'Off'}</small></span><span className={'switch '+(remind?'on':'')}><i/></span></button><button className="save" type="submit">Add to today</button></form></section></div>}
 </section></main>
}
function Streak(){return <div className="screen streak"><div className="streak-hero"><div className="sun"><Flame fill="currentColor"/></div><p className="kicker">Current streak</p><h1><span>7</span> days</h1><p>One week of showing up for yourself.</p></div><section className="calendar"><div className="calendar-head"><h2>September</h2><span>7 of 8 days</span></div><div className="day-grid">{days.map(([d,n,s])=><div className={'day '+(s===true?'done ':'')+(s==='today'?'current':'')} key={n}><span>{d}</span><i>{s===true?<Check/>:n}</i></div>)}</div></section><section className="best"><div><span>Personal best</span><strong>12 days</strong></div><p>Five more days to meet your longest streak.</p><div className="progress"><i/></div></section><p className="streak-note">Streaks count days when at least one ritual is completed.</p></div>}
createRoot(document.getElementById('root')).render(<App/>);
