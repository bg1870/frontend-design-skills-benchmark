import React, {useEffect, useRef, useState} from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowLeft, Check, ChevronRight, Flame, Footprints, GlassWater, BookOpen, Moon, Plus, Sparkles, X } from 'lucide-react';
import './styles.css';

const seed = [
  {id:1, name:'Morning walk', meta:'20 min · before 9am', icon:'walk', done:true, streak:18},
  {id:2, name:'Drink water', meta:'8 glasses · all day', icon:'water', done:true, streak:7},
  {id:3, name:'Read 10 pages', meta:'Evening', icon:'read', done:false, streak:4},
  {id:4, name:'Wind down', meta:'No screens after 10pm', icon:'moon', done:false, streak:11},
];
const icons = {walk:Footprints, water:GlassWater, read:BookOpen, moon:Moon, spark:Sparkles};
const days = [
  ['26','done'],['27','done'],['28','done'],['29','done'],['30','done'],['31','done'],['1','done'],
  ['2','done'],['3','done'],['4','done'],['5','done'],['6','done'],['7','done'],['8','done'],
  ['9','done'],['10','done'],['11','done'],['12','today'],['13','future'],['14','future'],['15','future'],
  ['16','future'],['17','future'],['18','future'],['19','future'],['20','future'],['21','future'],['22','future'],
];

function Header({detail, onBack}) { return <header className="topbar">
  {detail ? <button className="iconButton" onClick={onBack} aria-label="Back to today"><ArrowLeft/></button> : <div className="brand"><span className="brandMark">D</span><span>DAYMARK</span></div>}
  <button className="avatar" aria-label="Profile for Alex">A</button>
</header> }

function Today({habits,setHabits,onDetail,onAdd}) {
 const complete=habits.filter(h=>h.done).length, pct=Math.round((complete/habits.length)*100);
 const toggle=id=>setHabits(habits.map(h=>h.id===id?{...h,done:!h.done}:h));
 return <main className="screen today">
   <section className="intro"><p className="eyebrow">TUESDAY, JUNE 12</p><h1>Good morning,<br/><em>Alex.</em></h1><p className="lead">A little consistency goes a long way.</p></section>
   <section className="progress" aria-label={`${complete} of ${habits.length} habits complete`}>
    <div className="progressTop"><span>Today’s rhythm</span><strong>{complete}<small> / {habits.length}</small></strong></div>
    <div className="track"><span style={{width:`${pct}%`}}/></div>
    <p>{complete===habits.length?'Everything is complete. Nicely done.':`${habits.length-complete} small ${habits.length-complete===1?'step':'steps'} left for today`}</p>
   </section>
   <section className="habitSection"><div className="sectionHead"><h2>Your habits</h2><span>{complete} DONE</span></div>
    <div className="habitList">{habits.map(h=>{const Icon=icons[h.icon]||Sparkles; return <article className={`habit ${h.done?'isDone':''}`} key={h.id}>
      <button className="check" onClick={()=>toggle(h.id)} aria-label={`${h.done?'Mark incomplete':'Complete'} ${h.name}`}>{h.done&&<Check/>}</button>
      <button className="habitInfo" onClick={()=>h.id===1&&onDetail()} aria-label={h.id===1?'View Morning walk streak details':h.name}>
       <span className="habitIcon"><Icon/></span><span><strong>{h.name}</strong><small>{h.meta}</small></span>{h.id===1&&<ChevronRight className="chevron"/>}
      </button>
     </article>})}</div>
   </section>
   <button className="addButton" onClick={onAdd}><Plus/> Add a habit</button>
 </main>
}

function Streak({onBack}) {return <main className="screen detail">
 <Header detail onBack={onBack}/>
 <div className="detailTitle"><span className="largeIcon"><Footprints/></span><p className="eyebrow">MORNING WALK</p><h1>18 days<br/><em>in motion.</em></h1><p>You’ve shown up every day since May 26.</p></div>
 <section className="streakCard"><div><span className="flame"><Flame/></span><p>CURRENT STREAK</p><strong>18 <small>days</small></strong></div><div><p>PERSONAL BEST</p><strong>24 <small>days</small></strong></div></section>
 <section className="calendar"><div className="calendarHead"><h2>June</h2><span>18 / 30 days</span></div><div className="weekdays">{'MTWTFSS'.split('').map((d,i)=><span key={i}>{d}</span>)}</div><div className="days">{days.map(([n,s],i)=><span className={s} key={i}>{s==='done'?<Check/>:n}</span>)}</div><div className="legend"><span><i className="dot doneDot"/>Walked</span><span><i className="dot todayDot"/>Today</span></div></section>
 <blockquote>“Small steps, repeated, become a path.”</blockquote>
 </main>}

function AddSheet({onClose,onSave}) {
 const [name,setName]=useState(''); const [time,setTime]=useState('Anytime'); const input=useRef();
 useEffect(()=>{input.current?.focus(); const esc=e=>e.key==='Escape'&&onClose(); document.addEventListener('keydown',esc); return()=>document.removeEventListener('keydown',esc)},[onClose]);
 const submit=e=>{e.preventDefault(); if(name.trim()) onSave(name.trim(),time)};
 return <div className="scrim" onMouseDown={e=>e.target===e.currentTarget&&onClose()}><section className="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title">
  <div className="handle"/><div className="sheetHead"><div><p className="eyebrow">NEW RHYTHM</p><h2 id="sheet-title">Add a habit</h2></div><button className="iconButton" onClick={onClose} aria-label="Close"><X/></button></div>
  <form onSubmit={submit}><label>What do you want to practice?<input ref={input} value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Stretch for 5 minutes" /></label>
   <fieldset><legend>When?</legend><div className="segments">{['Morning','Anytime','Evening'].map(t=><button type="button" className={time===t?'selected':''} onClick={()=>setTime(t)} key={t}>{t}</button>)}</div></fieldset>
   <label>Repeat<div className="repeatRow"><span>Every day</span><span className="switch" aria-hidden="true"><i/></span></div></label>
   <button className="save" disabled={!name.trim()} type="submit">Add to today <ArrowLeft/></button>
  </form>
 </section></div>
}

function App(){const [view,setView]=useState('today'); const [sheet,setSheet]=useState(false); const [habits,setHabits]=useState(seed);
 const save=(name,time)=>{setHabits([...habits,{id:Date.now(),name,meta:time,icon:'spark',done:false,streak:0}]);setSheet(false)};
 return <div className="appShell"><div className="phone">{view==='today'&&<Header/>}{view==='today'?<Today habits={habits} setHabits={setHabits} onDetail={()=>setView('detail')} onAdd={()=>setSheet(true)}/>:<Streak onBack={()=>setView('today')}/>} {sheet&&<AddSheet onClose={()=>setSheet(false)} onSave={save}/>}</div></div>}

createRoot(document.getElementById('root')).render(<App/>);
