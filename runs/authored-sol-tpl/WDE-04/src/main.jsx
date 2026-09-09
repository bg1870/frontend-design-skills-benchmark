import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Plus, Flame, ChevronRight, X, Check, ArrowLeft, Sparkles, BookOpen, Footprints, Droplets, Dumbbell, Bell, CalendarDays} from 'lucide-react';
import './styles.css';

const initialHabits = [
  {id:1, name:'Morning pages', note:'10 minutes', icon:'book', color:'#EA765B', done:true, streak:18},
  {id:2, name:'Walk outside', note:'6,000 steps', icon:'walk', color:'#6D8F72', done:true, streak:8},
  {id:3, name:'Drink water', note:'8 glasses', icon:'water', color:'#5E86A6', done:false, streak:12},
  {id:4, name:'Evening stretch', note:'After dinner', icon:'fitness', color:'#A87992', done:false, streak:5},
];
const icons={book:BookOpen,walk:Footprints,water:Droplets,fitness:Dumbbell};
const week=[['M',true],['T',true],['W',true],['T',true],['F',true],['S',true],['S',false]];

function App(){
 const [view,setView]=useState('today'); const [sheet,setSheet]=useState(false); const [habits,setHabits]=useState(initialHabits);
 const [name,setName]=useState(''); const [frequency,setFrequency]=useState('Every day'); const [selectedIcon,setSelectedIcon]=useState('book');
 const completed=habits.filter(h=>h.done).length;
 const toggle=id=>setHabits(habits.map(h=>h.id===id?{...h,done:!h.done}:h));
 const addHabit=e=>{e.preventDefault(); if(!name.trim())return; setHabits([...habits,{id:Date.now(),name:name.trim(),note:frequency,icon:selectedIcon,color:'#EA765B',done:false,streak:0}]);setName('');setSheet(false);setView('today')};
 return <main className="stage"><section className="phone" aria-label="Habit tracking app">
   <div className="status"><span>9:41</span><span className="statusIcons">● ◒ ▰</span></div>
   {view==='today'?<Today habits={habits} completed={completed} toggle={toggle} openDetail={()=>setView('streak')} openSheet={()=>setSheet(true)}/>:<Streak back={()=>setView('today')}/>} 
   {sheet&&<AddSheet close={()=>setSheet(false)} add={addHabit} name={name} setName={setName} frequency={frequency} setFrequency={setFrequency} selected={selectedIcon} setSelected={setSelectedIcon}/>} 
 </section><p className="assumption">Sample progress · interactions are saved for this session</p></main>
}

function Today({habits,completed,toggle,openDetail,openSheet}){return <div className="screen today">
 <header><div><p className="eyebrow">MONDAY · 12 MAY</p><h1>Good morning.</h1><p className="sub">Small things, done with care.</p></div><button className="avatar" aria-label="Profile">AS</button></header>
 <button className="streakHero" onClick={openDetail} aria-label="View 18 day streak details"><span className="flame"><Flame size={25} fill="currentColor"/></span><span><b>18 day streak</b><small>Your longest yet</small></span><ChevronRight size={20}/></button>
 <section className="progress"><div className="progressTitle"><h2>Today</h2><span>{completed} of {habits.length}</span></div><div className="bar"><i style={{width:`${completed/habits.length*100}%`}}/></div></section>
 <div className="habitList">{habits.map((h,i)=><Habit key={h.id} h={h} toggle={()=>toggle(h.id)} index={i}/>)}</div>
 <button className="add" onClick={openSheet}><Plus size={20}/> Add a habit</button>
 <nav><button className="active"><CalendarDays/><span>Today</span></button><button onClick={openDetail}><Flame/><span>Streaks</span></button></nav>
 </div>}
function Habit({h,toggle,index}){const Icon=icons[h.icon]||Sparkles;return <article className={'habit '+(h.done?'isDone':'')} style={{'--delay':`${index*55}ms`}}><span className="habitIcon" style={{background:h.color+'18',color:h.color}}><Icon size={20}/></span><span className="habitText"><b>{h.name}</b><small>{h.done?'Done for today':h.note}</small></span><button className="check" onClick={toggle} aria-label={`${h.done?'Mark incomplete':'Complete'} ${h.name}`}>{h.done&&<Check size={18}/>}</button></article>}
function Streak({back}){return <div className="screen detail"><header className="detailHead"><button className="iconBtn" onClick={back} aria-label="Back"><ArrowLeft/></button><p>STREAK DETAIL</p><span/></header><section className="bigStreak"><span><Flame size={34} fill="currentColor"/></span><strong>18</strong><h1>days in a row</h1><p>You’ve shown up every day since April 25.</p></section><section className="calendar"><div className="calHead"><h2>This week</h2><span>6 of 7</span></div><div className="week">{week.map(([day,done],i)=><div key={i}><small>{day}</small><span className={done?'done':''}>{done?<Check size={17}/>:i+6}</span></div>)}</div></section><section className="records"><h2>At a glance</h2><div><span><small>Current</small><b>18 days</b></span><span><small>Personal best</small><b>18 days</b></span></div></section><blockquote>“We are what we repeatedly do.”<cite>— WILL DURANT</cite></blockquote><button className="primary" onClick={back}>Back to today</button></div>}
function AddSheet({close,add,name,setName,frequency,setFrequency,selected,setSelected}){return <div className="overlay" onMouseDown={e=>e.target===e.currentTarget&&close()}><form className="sheet" onSubmit={add}><div className="grab"/><header><div><p className="eyebrow">NEW ROUTINE</p><h2>Add a habit</h2></div><button type="button" className="iconBtn" onClick={close} aria-label="Close"><X/></button></header><label>What do you want to do?<input autoFocus value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Read for 20 minutes"/></label><fieldset><legend>Choose an icon</legend><div className="iconChoices">{Object.entries(icons).map(([key,Icon])=><button type="button" key={key} className={selected===key?'selected':''} onClick={()=>setSelected(key)} aria-label={key}><Icon/></button>)}</div></fieldset><label>Repeat<select value={frequency} onChange={e=>setFrequency(e.target.value)}><option>Every day</option><option>Weekdays</option><option>Weekends</option><option>3 times a week</option></select></label><label className="reminder"><span><Bell size={19}/><span><b>Gentle reminder</b><small>At 8:00 AM</small></span></span><input type="checkbox" defaultChecked/></label><button className="primary" disabled={!name.trim()}><Plus size={19}/> Add habit</button></form></div>}

createRoot(document.getElementById('root')).render(<App/>);
