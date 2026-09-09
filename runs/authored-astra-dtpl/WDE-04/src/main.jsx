import React, {useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
import './styles.css';

const habitsSeed = [
  {id:1, name:'Morning stretch', note:'10 minutes', icon:'sun', color:'#E8845C', done:true, streak:12, best:18, total:46, history:[1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]},
  {id:2, name:'Read a chapter', note:'Before bed', icon:'book', color:'#667E68', done:false, streak:7, best:14, total:32, history:[1,1,0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0]},
  {id:3, name:'Drink water', note:'8 glasses', icon:'drop', color:'#668E9F', done:true, streak:21, best:21, total:59, history:Array(28).fill(1)},
  {id:4, name:'Evening walk', note:'20 minutes', icon:'walk', color:'#A77D9D', done:false, streak:3, best:9, total:20, history:[0,1,1,0,0,1,1,1,0,1,1,0,0,1,1,1,1,0,1,1,1,0,0,1,1,1,0,0]}
];

function Icon({name, size=22}) {
 const paths={
  sun:<><circle cx="12" cy="12" r="3.5"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></>,
  book:<><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5z"/></>,
  drop:<path d="M12 2.5s6 6.6 6 11.2a6 6 0 1 1-12 0C6 9.1 12 2.5 12 2.5Z"/>,
  walk:<><circle cx="13" cy="4" r="2"/><path d="m10 22 2-6-2-3 2-5 4 3 3 1m-9 2-4 2m8-1 3 6"/></>,
  flame:<path d="M13.5 2.5c.5 4-2.5 5-2.5 8 0 1.2.8 2 2 2.5-.2-2 1-3.5 2.5-4.5 1.7 1.8 2.5 4 2.5 6.2A6 6 0 0 1 6 15c0-3.5 2-6.8 7.5-12.5Z"/>,
  plus:<path d="M12 5v14M5 12h14"/>,
  back:<path d="m15 18-6-6 6-6"/>,
  check:<path d="m6 12 4 4 8-9"/>,
  close:<path d="m6 6 12 12M18 6 6 18"/>
 };
 return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

function App(){
 const [habits,setHabits]=useState(habitsSeed); const [screen,setScreen]=useState('today'); const [selected,setSelected]=useState(null); const [sheet,setSheet]=useState(false); const [toast,setToast]=useState('');
 const done=habits.filter(h=>h.done).length;
 const openDetail=h=>{setSelected(h);setScreen('detail');window.scrollTo(0,0)};
 const toggle=(id)=>setHabits(v=>v.map(h=>h.id===id?{...h,done:!h.done}:h));
 const addHabit=(data)=>{const h={id:Date.now(),name:data.name,note:data.note||'Daily',icon:data.icon,color:data.color,done:false,streak:0,best:0,total:0,history:Array(28).fill(0)};setHabits(v=>[...v,h]);setSheet(false);setToast('Habit added to today');setTimeout(()=>setToast(''),2600)};
 return <main className="stage"><section className="phone" aria-label="Everyday habit tracker prototype">
  {screen==='today'?<Today habits={habits} done={done} toggle={toggle} detail={openDetail} add={()=>setSheet(true)}/>:<Detail habit={selected} back={()=>setScreen('today')}/>} 
  {sheet&&<AddSheet close={()=>setSheet(false)} save={addHabit}/>} {toast&&<div className="toast" role="status"><Icon name="check" size={18}/>{toast}</div>}
 </section><p className="desktop-note">A quiet space for daily consistency.</p></main>
}

function Today({habits,done,toggle,detail,add}){
 const pct=Math.round(done/habits.length*100)||0;
 return <div className="screen today-screen">
  <header className="top"><div><div className="eyebrow">WEDNESDAY · SEPTEMBER 9</div><h1>Good afternoon.</h1><p>Small steps still count.</p></div><button className="avatar" aria-label="Open profile">BM</button></header>
  <section className="progress-block" aria-label={`${done} of ${habits.length} habits complete`}><div className="progress-copy"><strong>{done} of {habits.length}</strong><span>{pct===100?'A perfect day.':pct>=50?'You’re halfway there.':'Your day is just beginning.'}</span></div><div className="ring" style={{'--p':pct}}><span>{pct}%</span></div></section>
  <div className="section-title"><h2>Today</h2><span>{habits.length} habits</span></div>
  <div className="habit-list">{habits.map(h=><article className={`habit ${h.done?'is-done':''}`} key={h.id}>
   <button className="habit-main" onClick={()=>detail(h)} aria-label={`View ${h.name} streak`}><span className="habit-icon" style={{color:h.color,background:h.color+'18'}}><Icon name={h.icon}/></span><span className="habit-copy"><strong>{h.name}</strong><small>{h.done?'Completed today':h.note}</small></span><span className="streak"><Icon name="flame" size={16}/>{h.streak}</span></button>
   <button className="check" onClick={()=>toggle(h.id)} aria-label={`${h.done?'Mark incomplete':'Complete'} ${h.name}`} aria-pressed={h.done}>{h.done&&<Icon name="check" size={19}/>}</button>
  </article>)}</div>
  <button className="fab" onClick={add}><Icon name="plus"/>Add habit</button>
 </div>
}

function Detail({habit,back}){
 const days=['M','T','W','T','F','S','S']; const dates=Array.from({length:28},(_,i)=>13+i);
 return <div className="screen detail-screen">
  <header className="detail-head"><button className="icon-btn" onClick={back} aria-label="Back to today"><Icon name="back"/></button><span>Habit details</span><button className="more" aria-label="More options">•••</button></header>
  <section className="habit-hero"><span className="hero-icon" style={{background:habit.color+'18',color:habit.color}}><Icon name={habit.icon} size={28}/></span><div><h1>{habit.name}</h1><p>Every day · {habit.note}</p></div></section>
  <section className="streak-feature"><div><span className="overline">CURRENT STREAK</span><strong>{habit.streak} <em>days</em></strong><p>{habit.streak?'Keep the rhythm going today.':'Today is a good day to begin.'}</p></div><div className="big-flame"><Icon name="flame" size={42}/></div></section>
  <section className="calendar"><div className="section-title"><h2>Last 4 weeks</h2><span>{habit.history.filter(Boolean).length} check-ins</span></div><div className="weekdays">{days.map((d,i)=><span key={i}>{d}</span>)}</div><div className="day-grid">{habit.history.map((x,i)=><div className={`day ${x?'active':''}`} key={i} style={x?{background:habit.color}:null}><span>{dates[i]>30?dates[i]-30:dates[i]}</span>{x&&<Icon name="check" size={13}/>}</div>)}</div></section>
  <section className="stats"><div><span>Best streak</span><strong>{habit.best} days</strong></div><div><span>Total check-ins</span><strong>{habit.total}</strong></div></section>
  <button className="primary" onClick={back}>Done</button>
 </div>
}

function AddSheet({close,save}){
 const [name,setName]=useState(''); const [note,setNote]=useState(''); const [icon,setIcon]=useState('sun'); const [color,setColor]=useState('#E8845C');
 useEffect(()=>{const esc=e=>e.key==='Escape'&&close();document.addEventListener('keydown',esc);return()=>document.removeEventListener('keydown',esc)},[close]);
 const submit=e=>{e.preventDefault(); if(name.trim())save({name:name.trim(),note:note.trim(),icon,color})};
 const icons=['sun','book','drop','walk']; const colors=['#E8845C','#667E68','#668E9F','#A77D9D'];
 return <div className="scrim" onMouseDown={e=>e.target===e.currentTarget&&close()}><section className="sheet" role="dialog" aria-modal="true" aria-labelledby="add-title"><div className="grab"/><header><div><span className="overline">NEW ROUTINE</span><h2 id="add-title">Add a habit</h2></div><button className="icon-btn" onClick={close} aria-label="Close"><Icon name="close"/></button></header>
  <form onSubmit={submit}><label>Habit name<input autoFocus value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Meditate" maxLength={40}/></label><label>Daily goal or cue <input value={note} onChange={e=>setNote(e.target.value)} placeholder="e.g. 10 minutes" maxLength={30}/></label>
  <fieldset><legend>Choose an icon</legend><div className="choices">{icons.map(x=><button type="button" key={x} className={icon===x?'selected':''} onClick={()=>setIcon(x)} aria-label={`${x} icon`} aria-pressed={icon===x}><Icon name={x}/></button>)}</div></fieldset>
  <fieldset><legend>Choose a color</legend><div className="color-choices">{colors.map(x=><button type="button" key={x} style={{background:x}} className={color===x?'selected':''} onClick={()=>setColor(x)} aria-label={`Select color ${x}`} aria-pressed={color===x}>{color===x&&<Icon name="check" size={17}/>}</button>)}</div></fieldset>
  <button className="primary" disabled={!name.trim()}>Add to my day</button></form></section></div>
}
createRoot(document.getElementById('root')).render(<App/>);
