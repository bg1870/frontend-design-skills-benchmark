import React, {useEffect, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {ArrowLeft, BarChart3, BookOpen, Check, ChevronRight, CirclePlus, Flame, Footprints, Home, Minus, Plus, Sparkles, X} from 'lucide-react';
import './styles.css';

const starterHabits = [
  {id:1, name:'Morning walk', note:'20 minutes', icon:'walk', color:'#D9E6D1', done:true, streak:12},
  {id:2, name:'Read a little', note:'10 pages', icon:'book', color:'#F2D9CB', done:true, streak:7},
  {id:3, name:'Evening reflection', note:'Before bed', icon:'spark', color:'#D9DFED', done:false, streak:4},
];
const icons={walk:Footprints,book:BookOpen,spark:Sparkles};
const colors=['#D9E6D1','#F2D9CB','#D9DFED','#E8DDBD','#D8E8E5'];
const week=[true,true,true,true,true,false,false];

function App(){
 const [habits,setHabits]=useState(starterHabits); const [view,setView]=useState('today'); const [sheet,setSheet]=useState(false);
 const [name,setName]=useState(''); const [goal,setGoal]=useState('Once a day'); const [color,setColor]=useState(colors[0]);
 const inputRef=useRef(null); const now=new Date();
 const day=new Intl.DateTimeFormat(undefined,{weekday:'long'}).format(now);
 const date=new Intl.DateTimeFormat(undefined,{month:'long',day:'numeric'}).format(now);
 const done=habits.filter(h=>h.done).length;
 useEffect(()=>{if(sheet) setTimeout(()=>inputRef.current?.focus(),250)},[sheet]);
 useEffect(()=>{const esc=e=>e.key==='Escape'&&setSheet(false);addEventListener('keydown',esc);return()=>removeEventListener('keydown',esc)},[]);
 function toggle(id){setHabits(h=>h.map(x=>x.id===id?{...x,done:!x.done}:x))}
 function addHabit(e){e.preventDefault();if(!name.trim())return;setHabits(h=>[...h,{id:Date.now(),name:name.trim(),note:goal,icon:'spark',color,done:false,streak:0}]);setName('');setSheet(false);setView('today')}
 return <main className="stage"><section className="phone" aria-label="Tend habit tracker">
  {view==='today'?<>
   <header className="top"><div><span className="eyebrow">{date}</span><h1>Good {now.getHours()<12?'morning':now.getHours()<18?'afternoon':'evening'}.</h1></div><button className="avatar" aria-label="Profile">AR</button></header>
   <section className="progress-card" aria-label={`${done} of ${habits.length} habits complete`}>
    <div className="progress-copy"><span>Today's rhythm</span><strong>{done}<small> / {habits.length}</small></strong></div>
    <div className="rings"><svg viewBox="0 0 100 100"><circle className="ring-base" cx="50" cy="50" r="40"/><circle className="ring-fill" cx="50" cy="50" r="40" pathLength="100" style={{strokeDashoffset:100-(done/habits.length*100)}}/></svg><span>{Math.round(done/habits.length*100)}%</span></div>
   </section>
   <div className="section-title"><div><span className="eyebrow">{day}</span><h2>Your habits</h2></div><button className="add-small" onClick={()=>setSheet(true)}><Plus size={18}/> Add</button></div>
   <div className="habit-list">{habits.map(h=>{const Icon=icons[h.icon];return <article className={'habit '+(h.done?'is-done':'')} key={h.id}>
    <button className="habit-main" onClick={()=>toggle(h.id)} aria-label={`${h.done?'Mark incomplete':'Complete'} ${h.name}`}><span className="habit-icon" style={{background:h.color}}><Icon size={21}/></span><span className="habit-copy"><strong>{h.name}</strong><small>{h.done?'Done for today':h.note}</small></span><span className="check">{h.done&&<Check size={18}/>}</span></button>
    <button className="streak-link" onClick={()=>setView('streak')} aria-label={`View ${h.name} streak`}><Flame size={14}/>{h.streak}<ChevronRight size={15}/></button>
   </article>})}</div>
  </>:<Streak onBack={()=>setView('today')}/>} 
  <nav className="nav"><button className={view==='today'?'active':''} onClick={()=>setView('today')}><Home/><span>Today</span></button><button className={view==='streak'?'active':''} onClick={()=>setView('streak')}><BarChart3/><span>Journey</span></button><button onClick={()=>setSheet(true)}><CirclePlus/><span>New</span></button></nav>
  {sheet&&<div className="sheet-layer" onMouseDown={e=>e.target===e.currentTarget&&setSheet(false)}><form className="sheet" onSubmit={addHabit} role="dialog" aria-modal="true" aria-labelledby="sheet-title"><div className="grab"/><div className="sheet-head"><div><span className="eyebrow">A new ritual</span><h2 id="sheet-title">Add a habit</h2></div><button type="button" className="icon-btn" onClick={()=>setSheet(false)} aria-label="Close"><X/></button></div>
   <label>Habit name<input ref={inputRef} value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Stretch after waking" required/></label>
   <label>Frequency<select value={goal} onChange={e=>setGoal(e.target.value)}><option>Once a day</option><option>Weekdays</option><option>3 times a week</option></select></label>
   <fieldset><legend>Color</legend><div className="swatches">{colors.map(c=><button type="button" key={c} className={color===c?'selected':''} style={{background:c}} onClick={()=>setColor(c)} aria-label={`Choose color ${c}`}>{color===c&&<Check/>}</button>)}</div></fieldset>
   <button className="primary" type="submit" disabled={!name.trim()}>Add to today <ArrowLeft className="arrow"/></button>
  </form></div>}
 </section></main>
}
function Streak({onBack}){return <div className="streak-view"><header className="detail-head"><button className="icon-btn" onClick={onBack} aria-label="Back"><ArrowLeft/></button><span>Habit details</span><span className="spacer"/></header><section className="streak-hero"><span className="hero-icon"><Footprints/></span><span className="eyebrow">Morning walk</span><h1>12 day streak</h1><p>Your longest yet. Keep showing up, one small walk at a time.</p></section><section className="week-card"><div className="week-head"><h2>This week</h2><span>5 of 7 days</span></div><div className="week-grid">{['M','T','W','T','F','S','S'].map((d,i)=><div key={i}><span className={week[i]?'day done':'day'}>{week[i]?<Check/>:d}</span><small>{d}</small></div>)}</div></section><section className="stats"><div><strong>12</strong><span>Current streak</span></div><div><strong>12</strong><span>Best streak</span></div><div><strong>86%</strong><span>Last 30 days</span></div></section><section className="note"><Flame/><div><strong>Small steps, strong rhythm</strong><p>You walked 26 days this month.</p></div></section></div>}
createRoot(document.getElementById('root')).render(<App/>);
