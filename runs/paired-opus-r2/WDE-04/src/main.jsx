import React, {useEffect, useMemo, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {ArrowLeft, BarChart3, Check, ChevronRight, Flame, Home, Plus, X} from 'lucide-react';
import './styles.css';

const seed = [
  {id:1,name:'Morning sunlight',cue:'Before coffee',time:'07:30',done:true,streak:12,color:'cyan'},
  {id:2,name:'Read 20 pages',cue:'After lunch',time:'13:00',done:true,streak:6,color:'cyan'},
  {id:3,name:'Evening walk',cue:'After work',time:'18:30',done:false,streak:4,color:'cyan'},
  {id:4,name:'Plan tomorrow',cue:'Before bed',time:'21:30',done:false,streak:9,color:'cyan'}
];
const fmtDay = new Intl.DateTimeFormat(undefined,{weekday:'long'});
const fmtDate = new Intl.DateTimeFormat(undefined,{month:'long',day:'numeric'});
const shortDay = new Intl.DateTimeFormat(undefined,{weekday:'narrow'});

function IconButton({label,children,onClick,className=''}) {return <button className={`icon-button ${className}`} aria-label={label} onClick={onClick}>{children}</button>}
function App(){
 const [habits,setHabits]=useState(seed); const [view,setView]=useState(()=>new URLSearchParams(location.search).get('view')||'today'); const [sheet,setSheet]=useState(false); const [notice,setNotice]=useState('');
 const done=habits.filter(h=>h.done).length; const total=habits.length; const percent=total?Math.round(done/total*100):0;
 const setScreen=(next)=>{setView(next); const u=new URL(location.href); next==='today'?u.searchParams.delete('view'):u.searchParams.set('view',next); history.pushState({},'',u)};
 useEffect(()=>{const pop=()=>setView(new URLSearchParams(location.search).get('view')||'today');addEventListener('popstate',pop);return()=>removeEventListener('popstate',pop)},[]);
 const toggle=id=>{setHabits(v=>v.map(h=>h.id===id?{...h,done:!h.done}:h));setNotice('Today’s progress updated.')};
 const add=(habit)=>{setHabits(v=>[...v,{...habit,id:Date.now(),done:false,streak:0,color:'cyan'}]);setSheet(false);setNotice(`${habit.name} added.`)};
 return <div className="stage"><a className="skip" href="#main">Skip to Content</a><div className="phone">
   <main id="main">{view==='today'?<Today habits={habits} toggle={toggle} done={done} total={total} percent={percent} openDetail={()=>setScreen('streak')}/>:<Streak onBack={()=>setScreen('today')} habits={habits}/>}</main>
   <nav className="tabbar" aria-label="Primary navigation"><button className={view==='today'?'active':''} onClick={()=>setScreen('today')}><Home/><span>Today</span></button><button className={view==='streak'?'active':''} onClick={()=>setScreen('streak')}><BarChart3/><span>Progress</span></button><button className="add-tab" onClick={()=>setSheet(true)} aria-label="Add Habit"><Plus/></button></nav>
   {sheet&&<AddSheet onClose={()=>setSheet(false)} onAdd={add}/>}<div className="sr-only" aria-live="polite">{notice}</div>
 </div></div>
}
function Today({habits,toggle,done,total,percent,openDetail}){
 const now=new Date(); const streak=Math.max(0,...habits.map(h=>h.streak));
 return <div className="screen today"><header className="top"><div><p className="date">{fmtDay.format(now)}, {fmtDate.format(now)}</p><h1>Keep the rhythm.</h1></div><div className="mark" aria-label="Tempo">T</div></header>
 <button className="dial" onClick={openDetail} aria-label={`View streak details. ${percent}% complete today`}><svg viewBox="0 0 220 220" aria-hidden="true"><circle className="track" cx="110" cy="110" r="94"/><circle className="progress" cx="110" cy="110" r="94" pathLength="100" style={{strokeDashoffset:100-percent}}/></svg><span className="dial-copy"><span className="count">{done}<i>/{total}</i></span><span>done today</span></span><span className="streak-chip"><Flame aria-hidden="true"/>{streak} day streak</span></button>
 <section className="habit-section"><div className="section-head"><h2>Today’s Habits</h2><span>{total-done} remaining</span></div>{habits.length?<ul className="habit-list">{habits.map(h=><li key={h.id}><button className={`habit ${h.done?'complete':''}`} onClick={()=>toggle(h.id)} aria-pressed={h.done}><span className="check">{h.done&&<Check/>}</span><span className="habit-copy"><strong>{h.name}</strong><small>{h.cue} <b>·</b> <time>{h.time}</time></small></span><span className="mini-streak"><Flame aria-hidden="true"/>{h.streak}</span></button></li>)}</ul>:<p className="empty">No habits yet. Add one to shape your day.</p>}</section></div>
}
function Streak({onBack,habits}){
 const days=useMemo(()=>Array.from({length:28},(_,i)=>({date:new Date(Date.now()-(27-i)*86400000),done:![2,8,9,17,24].includes(i),soft:[4,13,21].includes(i)})),[]); const streak=Math.max(0,...habits.map(h=>h.streak)); const completion=Math.round(days.filter(d=>d.done).length/days.length*100);
 return <div className="screen detail"><header className="detail-head"><IconButton label="Back to Today" onClick={onBack}><ArrowLeft/></IconButton><p>Streak Detail</p><span className="head-spacer"/></header><section className="streak-hero"><Flame aria-hidden="true"/><strong>{streak}</strong><span>days in motion</span><p>Complete today to keep this run alive. A missed day starts the count again.</p></section>
 <section className="calendar"><div className="section-head"><h2>Last 4 Weeks</h2><span>{completion}% complete</span></div><div className="week-labels">{days.slice(0,7).map((d,i)=><span key={i}>{shortDay.format(d.date)}</span>)}</div><div className="day-grid">{days.map((d,i)=><span key={i} className={d.done?'hit':d.soft?'soft':''} title={fmtDate.format(d.date)}>{d.date.getDate()}</span>)}</div></section>
 <section className="best"><span>Strongest habit</span><strong>{habits[0]?.name||'No habit data'}</strong><span>{habits[0]?.streak||0} consecutive days</span><ChevronRight aria-hidden="true"/></section></div>
}
function AddSheet({onClose,onAdd}){const ref=useRef();const [name,setName]=useState('');const [cue,setCue]=useState('After breakfast');const [time,setTime]=useState('08:00');const [error,setError]=useState(''); useEffect(()=>{const esc=e=>e.key==='Escape'&&onClose();addEventListener('keydown',esc);return()=>removeEventListener('keydown',esc)},[onClose]); const submit=e=>{e.preventDefault();if(!name.trim()){setError('Name your habit to add it.');ref.current?.focus();return}onAdd({name:name.trim(),cue,time})}; return <div className="scrim" onMouseDown={e=>e.target===e.currentTarget&&onClose()}><section className="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title"><div className="grab"/><header><div><p>New Routine</p><h2 id="sheet-title">Add a Habit</h2></div><IconButton label="Close Add Habit" onClick={onClose}><X/></IconButton></header><form onSubmit={submit}><label htmlFor="habit-name">What do you want to do?</label><input ref={ref} id="habit-name" name="habit-name" value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Stretch for 5 minutes…" autoComplete="off" aria-describedby={error?'name-error':undefined}/>{error&&<p className="error" id="name-error">{error}</p>}<div className="pair"><div><label htmlFor="habit-cue">Anchor it to</label><select id="habit-cue" name="habit-cue" value={cue} onChange={e=>setCue(e.target.value)} autoComplete="off"><option>After breakfast</option><option>After lunch</option><option>After work</option><option>Before bed</option></select></div><div><label htmlFor="habit-time">Reminder</label><input id="habit-time" name="habit-time" type="time" value={time} onChange={e=>setTime(e.target.value)} autoComplete="off"/></div></div><fieldset><legend>Repeat</legend><div className="repeat">{['M','T','W','T','F','S','S'].map((d,i)=><label key={i}><input type="checkbox" defaultChecked name={`day-${i}`}/><span>{d}</span></label>)}</div></fieldset><button className="primary" type="submit">Add Habit</button></form></section></div>}
createRoot(document.getElementById('root')).render(<App/>);
