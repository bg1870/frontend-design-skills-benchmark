/* <!-- Register: warm-consumer / tactile field journal; Palette: surface #F2F0E9, ink #19211D, accent #F15B3A; Type: Fraunces for expressive streak numerals, DM Sans for calm utility text; Signature move: a hand-drawn orbit that carries the current streak through the interface. --> */
import React, {useMemo, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {ArrowLeft, Check, ChevronRight, Flame, Home, Plus, RotateCcw, X} from 'lucide-react';
import './styles.css';

const seed=[
 {id:1,name:'Morning stretch',cue:'After I wake up',time:'8:00 AM',streak:12,done:true,color:'#F15B3A'},
 {id:2,name:'Read ten pages',cue:'With afternoon tea',time:'4:30 PM',streak:7,done:false,color:'#DBA728'},
 {id:3,name:'Evening walk',cue:'After dinner',time:'7:00 PM',streak:4,done:false,color:'#528271'}
];
const fmt=new Intl.DateTimeFormat('en-US',{weekday:'long',month:'long',day:'numeric'});
const shortFmt=new Intl.DateTimeFormat('en-US',{weekday:'short'});

function App(){
 const [habits,setHabits]=useState(seed); const [detail,setDetail]=useState(null); const [sheet,setSheet]=useState(false); const [toast,setToast]=useState('');
 const today=new Date(); const done=habits.filter(h=>h.done).length;
 const toggle=(id)=>setHabits(h=>h.map(x=>x.id===id?{...x,done:!x.done}:x));
 const save=(habit)=>{setHabits(h=>[...h,{...habit,id:Date.now(),done:false,streak:0,color:'#F15B3A'}]);setSheet(false);setToast('Habit added');setTimeout(()=>setToast(''),2200)};
 const chosen=habits.find(h=>h.id===detail);
 return <main className="stage" id="main-content"><section className="phone" aria-label="Still habit tracker">
  <div className="sample">Sample data</div>
  {chosen?<Detail habit={chosen} onBack={()=>setDetail(null)} />:<Today habits={habits} done={done} today={today} toggle={toggle} open={setDetail}/>} 
  {!chosen&&<nav className="dock" aria-label="Primary navigation"><button className="nav-active" aria-current="page"><Home size={20}/><span>Today</span></button><button className="add" onClick={()=>setSheet(true)} aria-label="Add a habit"><Plus size={26}/></button><button onClick={()=>setDetail(habits[0]?.id)}><Flame size={20}/><span>Streaks</span></button></nav>}
  {sheet&&<AddSheet close={()=>setSheet(false)} save={save}/>} {toast&&<div className="toast" role="status"><Check size={17}/>{toast}</div>}
 </section></main>
}
function Today({habits,done,today,toggle,open}){
 return <div className="screen today"><header><p className="date">{fmt.format(today)}</p><h1>Make room<br/>for <em>today.</em></h1></header>
  <button className="orbit-summary" onClick={()=>habits[0]&&open(habits[0].id)} aria-label="Open streak details">
   <svg viewBox="0 0 210 150" aria-hidden="true"><path d="M16 78C17 25 68 6 123 15c55 8 84 46 66 82-18 37-78 49-130 35C18 121 4 98 16 78Z"/><path className="dash" d="M28 89c10 26 53 38 96 29"/></svg>
   <span className="orbit-copy"><b>{done}<small> / {habits.length}</small></b><span>steady steps</span></span><ChevronRight size={18}/>
  </button>
  <section className="list" aria-labelledby="habits-title"><div className="section-head"><h2 id="habits-title">Today’s rhythm</h2><span>{done===habits.length&&habits.length?'Complete':'One at a time'}</span></div>
   {habits.map((h,i)=><article className={'habit '+(h.done?'is-done':'')} key={h.id} style={{'--habit':h.color}}>
    <button className="check" onClick={()=>toggle(h.id)} aria-label={`${h.done?'Mark incomplete':'Complete'} ${h.name}`} aria-pressed={h.done}>{h.done&&<Check size={19}/>}</button>
    <button className="habit-copy" onClick={()=>open(h.id)}><strong>{h.name}</strong><span>{h.cue}</span></button><time>{h.time}</time>
   </article>)}
  </section>
 </div>
}
function Detail({habit,onBack}){
 const days=useMemo(()=>Array.from({length:14},(_,i)=>{const d=new Date();d.setDate(d.getDate()-13+i);return {d,on:i!==3&&i!==8}}),[]);
 return <div className="screen detail"><header className="detail-top"><button className="icon-btn" onClick={onBack} aria-label="Back to today"><ArrowLeft/></button><span>Streak detail</span><button className="icon-btn" aria-label="Restart streak"><RotateCcw/></button></header>
 <div className="streak-hero"><div className="sun"><Flame fill="currentColor"/><b>{habit.streak}</b></div><h1>days in motion</h1><p>{habit.name}</p></div>
 <section className="history"><div className="section-head"><h2>Last two weeks</h2><span>Sample data</span></div><div className="day-grid">{days.map(({d,on},i)=><div key={i}><span>{shortFmt.format(d).slice(0,1)}</span><i className={on?'on':''}>{on?<Check size={14}/>:d.getDate()}</i></div>)}</div></section>
 <section className="note"><span>The quiet rule</span><p>Miss once, begin again. A streak is a direction—not a verdict.</p></section>
 <button className="primary" onClick={onBack}>Back to today</button></div>
}
function AddSheet({close,save}){const [name,setName]=useState('');const [cue,setCue]=useState('After breakfast');const [time,setTime]=useState('08:00'); return <div className="overlay" onMouseDown={e=>e.target===e.currentTarget&&close()}><form className="sheet" onSubmit={e=>{e.preventDefault();if(name.trim())save({name:name.trim(),cue,time:new Date('1970-01-01T'+time).toLocaleTimeString([],{hour:'numeric',minute:'2-digit'})})}}><div className="handle"/><div className="sheet-head"><div><p>New ritual</p><h2>What feels doable?</h2></div><button type="button" className="icon-btn" onClick={close} aria-label="Close"><X/></button></div><label>Habit name<input name="habit-name" autoComplete="off" value={name} onChange={e=>setName(e.target.value)} placeholder="Example: drink a glass of water…" required/></label><div className="form-row"><label>Anchor<select name="habit-anchor" autoComplete="off" value={cue} onChange={e=>setCue(e.target.value)}><option>After breakfast</option><option>When I get home</option><option>Before bed</option></select></label><label>Time<input name="habit-time" autoComplete="off" type="time" value={time} onChange={e=>setTime(e.target.value)}/></label></div><p className="hint">Keep it small enough to do on a difficult day.</p><button className="primary" type="submit">Add to today</button></form></div>}

createRoot(document.getElementById('root')).render(<App/>);
