import React, {useEffect, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {ArrowLeft, Check, Flame, Plus, X} from 'lucide-react';
import './styles.css';

const seed=[
 {id:1,name:'Read 20 pages',time:'Morning',done:true,streak:18},
 {id:2,name:'Walk after lunch',time:'1:00 PM',done:false,streak:6},
 {id:3,name:'Practice Spanish',time:'Evening',done:false,streak:11},
 {id:4,name:'Clear the desk',time:'Before bed',done:true,streak:4}
];
const days=[['W',1],['T',1],['F',1],['S',1],['S',0],['M',1],['T',1],['W',1],['T',1],['F',1],['S',1],['S',1],['M',1],['T',1]];
const todayLabel=new Intl.DateTimeFormat(undefined,{weekday:'long',month:'long',day:'numeric'}).format(new Date(2026,8,8));

function App(){
 const [habits,setHabits]=useState(seed); const [sheet,setSheet]=useState(false); const [route,setRoute]=useState(location.hash||'#today'); const [toast,setToast]=useState('');
 useEffect(()=>{const f=()=>setRoute(location.hash||'#today'); addEventListener('hashchange',f); return()=>removeEventListener('hashchange',f)},[]);
 useEffect(()=>{if(!toast)return;const t=setTimeout(()=>setToast(''),2200);return()=>clearTimeout(t)},[toast]);
 const toggle=id=>setHabits(habits.map(h=>h.id===id?{...h,done:!h.done}:h));
 const add=name=>{setHabits([...habits,{id:Date.now(),name,time:'Any time',done:false,streak:0}]);setSheet(false);setToast(`${name} added`)};
 return <main className="stage"><section className="phone" aria-label="Tempo habit tracker">
  {route==='#streak'?<Streak/>:<Today habits={habits} toggle={toggle} open={()=>setSheet(true)}/>} 
  <nav className="nav" aria-label="Primary"><a className={route!=='#streak'?'active':''} href="#today">Today</a><a className={route==='#streak'?'active':''} href="#streak">Streaks</a><button type="button" onClick={()=>setSheet(true)} aria-label="Add habit"><Plus size={22}/></button></nav>
  {sheet&&<AddSheet close={()=>setSheet(false)} add={add}/>} {toast&&<div className="toast" role="status"><Check size={16}/>{toast}</div>}
 </section></main>
}
function Today({habits,toggle,open}){const done=habits.filter(h=>h.done).length; return <div className="view">
 <header className="top"><div><p className="date">{todayLabel}</p><h1>Make Today Count.</h1></div><button className="avatar" type="button" aria-label="Open profile">RT</button></header>
 <section className="score" aria-label={`${done} of ${habits.length} habits complete`}><div className="score-copy"><strong>{done}<span>/{habits.length}</span></strong><p>Daily marks</p></div><div className="track" aria-hidden="true"><i style={{height:`${done/habits.length*100}%`}}/></div><p className="nudge">Two small wins<br/>still on the table.</p></section>
 <div className="section-head"><h2>Today’s card</h2><button onClick={open} type="button"><Plus size={17} aria-hidden="true"/> Add</button></div>
 <div className="habits">{habits.map((h,i)=><article className={`habit ${h.done?'done':''}`} key={h.id}><span className="index">{String(i+1).padStart(2,'0')}</span><button className="check" type="button" onClick={()=>toggle(h.id)} aria-label={`${h.done?'Mark incomplete':'Complete'} ${h.name}`} aria-pressed={h.done}>{h.done&&<Check size={18}/>}</button><div><h3>{h.name}</h3><p>{h.time}</p></div><a href="#streak" aria-label={`View ${h.name} streak`}><Flame size={15} aria-hidden="true"/>{h.streak}</a></article>)}</div>
 </div>}
function Streak(){return <div className="view streak"><header className="detail-top"><a href="#today" aria-label="Back to today"><ArrowLeft/></a><p>Habit record</p></header><section className="streak-hero"><p>Read 20 Pages</p><strong>18</strong><h1>Days in Motion</h1><div className="best"><span>Personal best</span><b>24 days</b></div></section><section className="calendar"><div className="section-head"><h2>Last two weeks</h2><span>13 of 14</span></div><div className="days">{days.map((d,i)=><div key={i}><span>{d[0]}</span><i className={d[1]?'hit':''}>{d[1]?<Check size={15}/>:''}</i></div>)}</div></section><blockquote>“A page at a time is still a book.”<cite>Your note from day 7</cite></blockquote></div>}
function AddSheet({close,add}){const [name,setName]=useState(''); const [error,setError]=useState(''); const ref=useRef(); useEffect(()=>{ref.current?.focus();const f=e=>e.key==='Escape'&&close();addEventListener('keydown',f);return()=>removeEventListener('keydown',f)},[close]); const submit=e=>{e.preventDefault();if(!name.trim()){setError('Give this habit a name.');return}add(name.trim())}; return <div className="scrim" onMouseDown={e=>e.target===e.currentTarget&&close()}><section className="sheet" role="dialog" aria-modal="true" aria-labelledby="add-title"><div className="grab"/><header><div><p>New daily mark</p><h2 id="add-title">What will you repeat?</h2></div><button onClick={close} aria-label="Close add habit"><X/></button></header><form onSubmit={submit}><label htmlFor="habit">Habit name</label><input ref={ref} id="habit" name="habit" autoComplete="off" value={name} onChange={e=>{setName(e.target.value);setError('')}} placeholder="e.g. Stretch for 10 minutes…" aria-describedby={error?'name-error':undefined} aria-invalid={!!error}/>{error&&<p id="name-error" className="error" role="alert">{error}</p>}<fieldset><legend>When</legend><div className="choices"><label><input type="radio" name="when" defaultChecked/>Any time</label><label><input type="radio" name="when"/>Morning</label><label><input type="radio" name="when"/>Evening</label></div></fieldset><button className="save" type="submit">Add to today</button></form></section></div>}
createRoot(document.getElementById('root')).render(<App/>);
