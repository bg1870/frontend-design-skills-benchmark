import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';
import './styles.css';

const habitsSeed = [
  {id:1, name:'Morning walk', note:'20 minutes', done:true, streak:18, tone:'blue'},
  {id:2, name:'Read a chapter', note:'Before bed', done:true, streak:7, tone:'green'},
  {id:3, name:'Drink water', note:'6 of 8 glasses', done:false, streak:12, tone:'sky'},
  {id:4, name:'Practice Spanish', note:'10 minutes', done:false, streak:4, tone:'orange'},
];

function Icon({name, size=22}) {
  const paths={
    home:<><path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v10h13V10M9 20v-6h6v6"/></>,
    chart:<><path d="M5 20v-7M12 20V5M19 20v-11"/></>,
    plus:<path d="M12 5v14M5 12h14"/>,
    close:<path d="m6 6 12 12M18 6 6 18"/>,
    back:<path d="m15 18-6-6 6-6"/>,
    check:<path d="m6 12 4 4 8-9"/>,
    flame:<path d="M13 3c1 4-2 5-2 8 0 1.5 1 2.5 2.5 2.5 2 0 3.5-2 3-5 2 2 3.5 4 3.5 6.5A8 8 0 1 1 7 8c0 3 2 4 3 4-1-4 1-7 3-9Z"/>,
  };
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>
}

function ProgressDial({done,total}) {
  const pct=done/total, r=52, c=2*Math.PI*r;
  return <div className="dial-wrap"><svg className="dial" viewBox="0 0 128 128" role="img" aria-label={`${done} of ${total} habits complete`}><circle className="dial-track" cx="64" cy="64" r={r}/><circle className="dial-value" cx="64" cy="64" r={r} strokeDasharray={c} strokeDashoffset={c*(1-pct)}/></svg><div className="dial-copy"><strong>{done}<span>/{total}</span></strong><small>done</small></div></div>
}

function Today({habits,setHabits,onStreak,onAdd}) {
 const done=habits.filter(h=>h.done).length;
 const dateLabel=new Intl.DateTimeFormat(undefined,{weekday:'long',day:'numeric',month:'long'}).format(new Date(2026,8,8));
 const toggle=id=>setHabits(habits.map(h=>h.id===id?{...h,done:!h.done}:h));
 return <main className="view today-view" id="main-content">
   <header className="topbar"><div><p className="date">{dateLabel}</p><h1>Good morning.</h1></div><button className="avatar" aria-label="Open profile">AM</button></header>
   <section className="day-summary" aria-labelledby="today-heading"><div><p className="section-kicker">Today’s log</p><h2 id="today-heading">Keep your rhythm.</h2><p>{done===habits.length?'Everything is checked off.':`${habits.length-done} small ${habits.length-done===1?'step':'steps'} left today.`}</p></div><ProgressDial done={done} total={habits.length}/></section>
   <section className="habit-section" aria-labelledby="habits-heading"><div className="section-head"><h2 id="habits-heading">Habits</h2><span>{done} of {habits.length}</span></div>
   <div className="habit-list">{habits.map(h=><article className={`habit-row ${h.done?'is-done':''}`} key={h.id}>
      <button className="check-button" onClick={()=>toggle(h.id)} aria-label={`${h.done?'Mark':'Mark'} ${h.name} ${h.done?'incomplete':'complete'}`} aria-pressed={h.done}>{h.done&&<Icon name="check" size={20}/>}</button>
      <button className="habit-copy" onClick={()=>onStreak(h)}><strong>{h.name}</strong><span>{h.note}</span></button>
      <button className="streak" onClick={()=>onStreak(h)} aria-label={`View ${h.name} streak, ${h.streak} days`}><Icon name="flame" size={17}/><span>{h.streak}</span></button>
   </article>)}</div></section>
   <p className="encouragement">Consistency grows quietly.</p>
   <BottomNav onAdd={onAdd}/>
 </main>
}

function BottomNav({onAdd}) {return <nav className="bottom-nav" aria-label="Primary navigation"><button className="nav-item active" aria-current="page"><Icon name="home"/><span>Today</span></button><button className="add-button" onClick={onAdd} aria-label="Add habit"><Icon name="plus" size={27}/></button><button className="nav-item" onClick={()=>alert('Insights become available after 7 days.')}><Icon name="chart"/><span>Insights</span></button></nav>}

function StreakDetail({habit,onBack}) {
 const days=['M','T','W','T','F','S','S'];
 const marks=[1,1,1,1,1,0,1, 1,1,1,1,0,1,1, 1,1,1,1,1,1,1, 1,1,1,0,0,0,0];
 return <main className="view detail-view" id="main-content"><header className="detail-top"><button className="icon-button" onClick={onBack} aria-label="Back to today"><Icon name="back"/></button><span>Streak detail</span><span className="top-spacer"/></header>
 <section className="streak-hero"><div className="flame-mark"><Icon name="flame" size={34}/></div><p>{habit.name}</p><h1>{habit.streak} days</h1><span>Current streak</span></section>
 <section className="calendar" aria-labelledby="calendar-heading"><div className="section-head"><h2 id="calendar-heading">September</h2><span>24 of 28 days</span></div><div className="week-labels">{days.map((d,i)=><span key={i}>{d}</span>)}</div><div className="day-grid">{marks.map((m,i)=><span key={i} className={m?'marked':''} aria-label={`September ${i+1}, ${m?'complete':'not complete'}`}>{m?<Icon name="check" size={15}/>:i+1}</span>)}</div></section>
 <section className="record"><div><span>Best streak</span><strong>{Math.max(21,habit.streak)} days</strong></div><div><span>Started</span><strong>12 Aug</strong></div></section>
 <blockquote>“You don’t need a perfect week. You need the next mark.”</blockquote>
 </main>
}

function AddSheet({onClose,onSave}) {
 const [name,setName]=useState(''); const [freq,setFreq]=useState('Every day');
 const [error,setError]=useState('');
 const submit=e=>{e.preventDefault(); if(!name.trim()){setError('Enter a habit name to add it.');return} onSave(name.trim(),freq)};
 return <div className="sheet-layer" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}><section className="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title"><div className="grab"/><header><div><p>New ritual</p><h2 id="sheet-title">Add a habit</h2></div><button className="icon-button" onClick={onClose} aria-label="Close"><Icon name="close"/></button></header><form onSubmit={submit}><label>Habit name<input name="habit-name" autoComplete="off" value={name} onChange={e=>{setName(e.target.value);setError('')}} placeholder="e.g. Stretch for 5 minutes…" aria-describedby={error?'name-error':undefined}/></label>{error&&<p className="form-error" id="name-error" role="alert">{error}</p>}<fieldset><legend>Repeat</legend><div className="choice-row">{['Every day','Weekdays','Custom'].map(x=><button type="button" key={x} onClick={()=>setFreq(x)} className={freq===x?'selected':''} aria-pressed={freq===x}>{x}</button>)}</div></fieldset><label>Reminder<span className="input-like">8:00 AM <span>Change</span></span></label><button className="save-button">Add Habit</button></form></section></div>
}

function App(){const [habits,setHabits]=useState(habitsSeed);const [detail,setDetail]=useState(null);const [sheet,setSheet]=useState(false);const save=(name,freq)=>{setHabits([...habits,{id:Date.now(),name,note:freq,done:false,streak:0}]);setSheet(false)};return <div className="app-shell"><a className="skip-link" href="#main-content">Skip to main content</a>{detail?<StreakDetail habit={detail} onBack={()=>setDetail(null)}/>:<Today habits={habits} setHabits={setHabits} onStreak={setDetail} onAdd={()=>setSheet(true)}/>} {sheet&&<AddSheet onClose={()=>setSheet(false)} onSave={save}/>}<div className="desktop-note" aria-hidden="true"><span>FIELDNOTE</span><p>A small mark,<br/>every day.</p></div></div>}

createRoot(document.getElementById('root')).render(<App/>);
