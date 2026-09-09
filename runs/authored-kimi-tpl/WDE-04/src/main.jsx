import React, {useState} from 'react';
import { createRoot } from 'react-dom/client';
import { Plus, Flame, Check, ChevronRight, X, Minus, Home, BarChart3 } from 'lucide-react';
import './styles.css';

const seed = [
  {id:1, name:'Morning walk', cue:'After my first coffee', time:'7:30 AM', streak:12, color:'#E85D3D'},
  {id:2, name:'Read 10 pages', cue:'Before bed', time:'9:30 PM', streak:8, color:'#232323'},
  {id:3, name:'Drink 2L water', cue:'Across the day', time:'Anytime', streak:4, color:'#B9ADA0'}
];

function Ring({done,total}) {
  const pct = done/total*100;
  return <div className="progress-ring" style={{'--p':`${pct}%`}}><strong>{done}</strong><span>of {total}</span></div>
}

function Today({habits, completed, toggle, openAdd, openDetail}) {
 return <main className="screen today">
   <header className="topbar"><div><p className="eyebrow">TUESDAY · SEP 9</p><h1>Good morning,<br/>Maya.</h1></div><button className="avatar" aria-label="Profile">M</button></header>
   <section className="daily-progress"><Ring done={completed.size} total={habits.length}/><div><p className="eyebrow">TODAY'S RHYTHM</p><h2>{completed.size === habits.length ? 'All wrapped up.' : completed.size === 0 ? 'Three small wins.' : `${habits.length-completed.size} left. Keep going.`}</h2><p>{completed.size === 0 ? 'Start small. Momentum will follow.' : 'You’re building a day worth repeating.'}</p></div></section>
   <div className="section-title"><h2>Today</h2><span>{completed.size}/{habits.length} complete</span></div>
   <div className="habits">
    {habits.map(h => {const isDone=completed.has(h.id); return <article className={`habit ${isDone?'is-done':''}`} key={h.id}>
      <button className="check" onClick={()=>toggle(h.id)} aria-label={`${isDone?'Undo':'Complete'} ${h.name}`}>{isDone?<Check/>:<span/>}</button>
      <button className="habit-copy" onClick={()=>openDetail(h)}><strong>{h.name}</strong><small>{h.cue} · {h.time}</small></button>
      <button className="streak-link" onClick={()=>openDetail(h)} aria-label={`View ${h.name} streak`}><Flame/><b>{h.streak}</b><ChevronRight/></button>
    </article>})}
   </div>
   <button className="add-inline" onClick={openAdd}><Plus/> Add another habit</button>
 </main>
}

const doneDays = [1,2,3,4,5,7,8,9,10,11,12,14,15,16,17,18,19,21,22,23,24,25,26,28,29];
function Streak({habit, back}) {
 return <main className="screen streak-screen">
   <header className="detail-head"><button className="round-btn" onClick={back} aria-label="Close detail"><X/></button><p className="eyebrow">STREAK DETAIL</p><button className="more" aria-label="More options">•••</button></header>
   <section className="streak-hero"><div className="flame-mark"><Flame/></div><div><span className="huge">{habit.streak}</span><span className="days">days</span></div><h1>{habit.name}</h1><p>Your longest run yet. Show up tomorrow to keep it alive.</p></section>
   <section className="calendar-card"><div className="calendar-title"><div><p className="eyebrow">SEPTEMBER 2026</p><h2>25 days complete</h2></div><span className="rate">83%</span></div>
   <div className="weekdays">{'SMTWTFS'.split('').map((x,i)=><span key={i}>{x}</span>)}</div>
   <div className="calendar"><i/><i/>{Array.from({length:30},(_,i)=>i+1).map(day=><span key={day} className={`${doneDays.includes(day)?'done':''} ${day===9?'today-dot':''}`}>{doneDays.includes(day)?<Check/>:day}</span>)}</div></section>
   <section className="stats"><div><b>42</b><span>Total completions</span></div><div><b>12</b><span>Best streak</span></div></section>
 </main>
}

function AddSheet({close, add}) {
 const [name,setName]=useState(''); const [time,setTime]=useState('8:00 AM'); const [goal,setGoal]=useState(1);
 const save=()=>{if(name.trim()){add(name.trim(),time);close();}};
 return <div className="overlay" onMouseDown={e=>e.target===e.currentTarget&&close()}><section className="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title">
   <div className="grabber"/><header><div><p className="eyebrow">NEW ROUTINE</p><h2 id="sheet-title">Add a habit</h2></div><button className="round-btn" onClick={close}><X/></button></header>
   <label className="field"><span>What do you want to do?</span><input autoFocus value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Stretch for 5 minutes"/></label>
   <div className="field"><span>Daily goal</span><div className="stepper"><button onClick={()=>setGoal(Math.max(1,goal-1))}><Minus/></button><b>{goal} time{goal>1?'s':''} a day</b><button onClick={()=>setGoal(goal+1)}><Plus/></button></div></div>
   <label className="field"><span>Reminder</span><input type="time" value="08:00" onChange={e=>setTime(e.target.value)}/></label>
   <button className="primary" onClick={save} disabled={!name.trim()}>Create habit <ChevronRight/></button>
 </section></div>
}

function App(){
 const [habits,setHabits]=useState(seed), [completed,setCompleted]=useState(new Set([1]));
 const [view,setView]=useState('today'), [detail,setDetail]=useState(seed[0]), [sheet,setSheet]=useState(false);
 const toggle=id=>setCompleted(prev=>{const n=new Set(prev);n.has(id)?n.delete(id):n.add(id);return n});
 const openDetail=h=>{setDetail(h);setView('streak')};
 const add=(name,time)=>setHabits(h=>[...h,{id:Date.now(),name,cue:'Daily practice',time,streak:0,color:'#E85D3D'}]);
 return <div className="stage"><aside className="brand"><div className="brand-mark"><Check/></div><p className="eyebrow">A DAILY PRACTICE</p><h2>Done is how days<br/>become a life.</h2><p>One clear view for the habits that matter. No pressure, just proof that you showed up.</p></aside>
 <div className="phone"><div className="island"/>{view==='today'?<Today habits={habits} completed={completed} toggle={toggle} openAdd={()=>setSheet(true)} openDetail={openDetail}/>:<Streak habit={detail} back={()=>setView('today')}/>}<nav><button className={view==='today'?'active':''} onClick={()=>setView('today')}><Home/><span>Today</span></button><button className={view==='streak'?'active':''} onClick={()=>openDetail(detail)}><BarChart3/><span>Streaks</span></button><button className="nav-add" onClick={()=>setSheet(true)}><Plus/></button></nav>{sheet&&<AddSheet close={()=>setSheet(false)} add={add}/>}</div>
 </div>
}

createRoot(document.getElementById('root')).render(<App/>);
