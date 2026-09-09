import React, {useMemo, useState} from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowLeft, ArrowUpRight, BarChart3, CalendarDays, Check, ChevronRight, Flame, Home, Plus, Settings2, X } from 'lucide-react';
import './styles.css';

const initialHabits = [
  {id:1, name:'Morning pages', note:'Write one page', time:'7:00 AM', done:true, streak:12, color:'#e95f46'},
  {id:2, name:'Move outside', note:'At least 20 minutes', time:'12:30 PM', done:false, streak:6, color:'#e4a93a'},
  {id:3, name:'Read fiction', note:'Ten pages, phone away', time:'9:30 PM', done:false, streak:19, color:'#326858'},
];

const week = [{d:'M',n:7,on:1},{d:'T',n:8,on:1},{d:'W',n:9,on:1},{d:'T',n:10,on:1},{d:'F',n:11,on:1},{d:'S',n:12,on:0},{d:'S',n:13,on:0}];

function App(){
 const [view,setView]=useState('today'); const [sheet,setSheet]=useState(false); const [habits,setHabits]=useState(initialHabits); const [selected,setSelected]=useState(initialHabits[0]); const [name,setName]=useState(''); const [goal,setGoal]=useState('Every day');
 const completed=habits.filter(h=>h.done).length; const pct=Math.round(completed/habits.length*100);
 const openDetail=(h)=>{setSelected(h);setView('detail')};
 const addHabit=(e)=>{e.preventDefault(); if(!name.trim())return; setHabits([...habits,{id:Date.now(),name:name.trim(),note:goal,time:'Any time',done:false,streak:0,color:'#326858'}]);setName('');setSheet(false)};
 return <main className="stage">
   <section className="story" aria-hidden="true"><div className="brand"><span className="brandmark">T</span> TEND</div><div className="story-copy"><p className="kicker">A daily practice</p><h1>Small things,<br/><em>kept.</em></h1><p>A calm place to tend the habits that make your days feel like yours.</p></div><div className="edition">© 2026 — DAILY RHYTHMS</div></section>
   <section className="phone" aria-label="Tend habit tracker prototype">
    {view==='today'?<Today habits={habits} completed={completed} pct={pct} setHabits={setHabits} openDetail={openDetail} openSheet={()=>setSheet(true)} />:<Detail habit={selected} back={()=>setView('today')} />}
    <nav className="bottom-nav" aria-label="Main navigation">
      <button className={view==='today'?'active':''} onClick={()=>setView('today')}><Home/><span>Today</span></button>
      <button onClick={()=>{setSelected(habits[2]);setView('detail')}} className={view==='detail'?'active':''}><BarChart3/><span>Progress</span></button>
      <button onClick={()=>setSheet(true)} className="add"><Plus/><span>Add</span></button>
    </nav>
    {sheet&&<div className="sheet-layer" onMouseDown={(e)=>{if(e.target===e.currentTarget)setSheet(false)}}><section className="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title"><div className="handle"/><header><div><p className="kicker">New ritual</p><h2 id="sheet-title">Add a habit</h2></div><button className="icon-btn" onClick={()=>setSheet(false)} aria-label="Close"><X/></button></header><form onSubmit={addHabit}><label>What do you want to tend?<input autoFocus value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Evening walk" required/></label><fieldset><legend>How often?</legend><div className="segmented">{['Every day','Weekdays','3× week'].map(x=><button type="button" className={goal===x?'chosen':''} onClick={()=>setGoal(x)} key={x}>{x}</button>)}</div></fieldset><label>Time of day<select><option>Any time</option><option>Morning</option><option>Afternoon</option><option>Evening</option></select></label><button className="primary" type="submit">Add to my day <ArrowUpRight/></button></form></section></div>}
   </section>
 </main>
}

function Today({habits,completed,pct,setHabits,openDetail,openSheet}){
 return <div className="screen today-screen"><header className="top"><div><p className="date">WEDNESDAY · SEPTEMBER 9</p><h2>Today’s tending</h2></div><button className="avatar" aria-label="Settings"><Settings2/></button></header>
 <section className="progress-area"><div className="progress-copy"><span className="big-num">{completed}</span><span className="fraction">/ {habits.length}<br/><small>complete</small></span></div><div className="progress-track"><i style={{width:`${pct}%`}}/></div><p>{completed===habits.length?'Beautifully done.':'One thing at a time.'}</p></section>
 <section className="list"><div className="section-head"><h3>Daily rhythm</h3><span>{habits.length} practices</span></div>{habits.map((h,i)=><article className={'habit '+(h.done?'done':'')} key={h.id}><button className="check" style={{'--habit':h.color}} aria-label={`Mark ${h.name} ${h.done?'incomplete':'complete'}`} onClick={()=>setHabits(habits.map(x=>x.id===h.id?{...x,done:!x.done}:x))}>{h.done&&<Check/>}</button><button className="habit-copy" onClick={()=>openDetail(h)}><strong>{h.name}</strong><span>{h.note}</span></button><button className="streak" onClick={()=>openDetail(h)} aria-label={`View ${h.name} streak`}><Flame/><b>{h.streak}</b><ChevronRight/></button></article>)}</section>
 <button className="add-inline" onClick={openSheet}><Plus/> Add another habit</button></div>
}

function Detail({habit,back}){
 const days=useMemo(()=>Array.from({length:35},(_,i)=>({on:![5,12,18,27].includes(i)&&i<31, future:i>=31})),[]);
 return <div className="screen detail-screen"><header className="detail-top"><button className="icon-btn" onClick={back} aria-label="Back"><ArrowLeft/></button><span>Streak detail</span><button className="icon-btn" aria-label="Calendar"><CalendarDays/></button></header>
 <section className="detail-hero"><div className="flame-disc"><Flame/></div><p className="kicker">CURRENT STREAK</p><div className="streak-number">{habit.streak}<small>days</small></div><h2>{habit.name}</h2><p>You’ve shown up {habit.streak} days in a row. Keep the thread going.</p></section>
 <section className="week-strip">{week.map((x,i)=><div key={i}><span>{x.d}</span><i className={x.on?'on':''}>{x.on?<Check/>:x.n}</i></div>)}</section>
 <section className="calendar"><div className="section-head"><h3>September</h3><span>87% consistency</span></div><div className="weekday">{['M','T','W','T','F','S','S'].map((x,i)=><span key={i}>{x}</span>)}</div><div className="heatmap">{days.map((x,i)=><i key={i} className={x.future?'future':x.on?'filled':''}>{i+1}</i>)}</div></section>
 <section className="best"><span><Flame/> BEST RUN</span><strong>24 days</strong><small>May 3 — May 26</small></section></div>
}
createRoot(document.getElementById('root')).render(<App/>);
