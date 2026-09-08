import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Plus, Check, Flame, ChevronRight, ArrowLeft, MoreHorizontal, X, Sunrise, BookOpen, Droplets, Footprints, Dumbbell, Sparkles, Home, ChartNoAxesColumnIncreasing} from 'lucide-react';
import './styles.css';

const iconMap={Sunrise,BookOpen,Droplets,Footprints,Dumbbell,Sparkles};
const initial=[
 {id:1,name:'Morning sunlight',note:'10 minutes outside',icon:'Sunrise',color:'#ff775f',done:true,streak:12,time:'Morning'},
 {id:2,name:'Read a little',note:'At least 10 pages',icon:'BookOpen',color:'#7457d9',done:false,streak:8,time:'Anytime'},
 {id:3,name:'Drink water',note:'6 of 8 glasses',icon:'Droplets',color:'#278fb0',done:false,streak:24,time:'All day'},
 {id:4,name:'Evening walk',note:'20 minutes',icon:'Footprints',color:'#38866d',done:true,streak:5,time:'Evening'}
];
const week=['M','T','W','T','F','S','S'];

function HabitIcon({name,color,size=20}){const I=iconMap[name]||Sparkles;return <span className="habit-icon" style={{background:`${color}18`,color}}><I size={size}/></span>}
function App(){
 const [habits,setHabits]=useState(initial); const [view,setView]=useState('today'); const [selected,setSelected]=useState(null); const [sheet,setSheet]=useState(false); const [toast,setToast]=useState('');
 const done=habits.filter(h=>h.done).length;
 const toggle=id=>setHabits(habits.map(h=>h.id===id?{...h,done:!h.done}:h));
 const openDetail=h=>{setSelected(h);setView('detail')};
 const addHabit=e=>{e.preventDefault();const fd=new FormData(e.currentTarget); const name=fd.get('name').trim();if(!name)return;setHabits([...habits,{id:Date.now(),name,note:fd.get('goal')||'Once a day',icon:fd.get('icon')||'Sparkles',color:'#7457d9',done:false,streak:0,time:fd.get('time')}]);setSheet(false);setToast('Habit added');setTimeout(()=>setToast(''),2200)};
 return <div className="stage"><main className="phone">
   <div className="status"><span>9:41</span><span className="status-icons">● ᯤ ▰</span></div>
   {view==='today'?<Today habits={habits} done={done} toggle={toggle} openDetail={openDetail}/>:<Detail habit={selected||habits[0]} back={()=>setView('today')}/>} 
   <nav className="nav" aria-label="Main navigation"><button className={view==='today'?'active':''} onClick={()=>setView('today')}><Home/><span>Today</span></button><button className={view==='detail'?'active':''} onClick={()=>{setSelected(habits[0]);setView('detail')}}><ChartNoAxesColumnIncreasing/><span>Progress</span></button><button className="add" onClick={()=>setSheet(true)} aria-label="Add habit"><Plus/></button></nav>
   {sheet&&<AddSheet close={()=>setSheet(false)} submit={addHabit}/>} {toast&&<div className="toast"><Check size={17}/>{toast}</div>}
 </main><p className="desktop-note">A small daily practice, beautifully kept.</p></div>
}
function Today({habits,done,toggle,openDetail}){const pct=Math.round(done/habits.length*100);return <div className="screen today">
 <header><div><p className="date">Monday, September 7</p><h1>Good morning, Alex.</h1></div><button className="avatar" aria-label="Open profile">A</button></header>
 <section className="pulse"><div className="ring" style={{'--p':`${pct*3.6}deg`}}><div><strong>{done}</strong><span>of {habits.length}</span></div></div><div className="pulse-copy"><h2>{done===habits.length?'All loops closed':'Keep your rhythm'}</h2><p>{done===habits.length?'You showed up for everything today.':`${habits.length-done} habits left. Small steps still count.`}</p><div className="streak"><Flame size={16} fill="currentColor"/> 12 day best streak</div></div></section>
 <div className="section-title"><h2>Today’s loops</h2><span>{done}/{habits.length} done</span></div>
 <div className="habit-list">{habits.map(h=><article className={`habit ${h.done?'done':''}`} key={h.id}><button className="habit-main" onClick={()=>openDetail(h)}><HabitIcon name={h.icon} color={h.color}/><span className="habit-copy"><strong>{h.name}</strong><small>{h.note}</small></span><span className="habit-streak"><Flame size={13}/>{h.streak}</span><ChevronRight size={18}/></button><button className="check" style={{'--c':h.color}} onClick={()=>toggle(h.id)} aria-label={`${h.done?'Unmark':'Mark'} ${h.name} complete`}>{h.done&&<Check size={19}/>}</button></article>)}</div>
 <p className="encouragement">Consistency is quieter than motivation.<br/>You’re doing just fine.</p>
 </div>}
function Detail({habit,back}){return <div className="screen detail"><header className="detail-head"><button className="round-btn" onClick={back} aria-label="Back"><ArrowLeft/></button><span>Streak detail</span><button className="round-btn" aria-label="More options"><MoreHorizontal/></button></header>
 <section className="habit-hero"><HabitIcon name={habit.icon} color={habit.color} size={26}/><h1>{habit.name}</h1><p>{habit.note}</p></section>
 <section className="streak-big"><Flame size={32} fill="currentColor"/><strong>{habit.streak}</strong><span>days in a row</span><p>Your longest streak yet. Keep the thread going today.</p></section>
 <section className="calendar"><div className="calendar-title"><div><h2>September</h2><p>18 of 21 days completed</p></div><button>2026 <ChevronRight size={15}/></button></div><div className="week labels">{week.map((d,i)=><span key={i}>{d}</span>)}</div><div className="days">{[...Array(30)].map((_,i)=>{const n=i+1;const complete=[1,2,3,4,5,7,8,9,10,11,12,14,15,16,17,18,19,20,21].includes(n);return <span key={n} className={`${complete?'complete':''} ${n===7?'today-dot':''}`}>{complete?<Check size={15}/>:n}</span>})}</div></section>
 <section className="stats"><div><strong>{habit.streak}</strong><span>Current</span></div><div><strong>24</strong><span>Best</span></div><div><strong>86%</strong><span>Success</span></div></section></div>}
function AddSheet({close,submit}){const [icon,setIcon]=useState('Sparkles');return <div className="overlay" onMouseDown={e=>{if(e.target===e.currentTarget)close()}}><section className="sheet" role="dialog" aria-modal="true" aria-labelledby="add-title"><div className="grab"/><div className="sheet-head"><div><p>New loop</p><h2 id="add-title">What do you want to repeat?</h2></div><button onClick={close} aria-label="Close"><X/></button></div><form onSubmit={submit}><label>Habit name<input autoFocus name="name" placeholder="e.g. Stretch after waking" required/></label><label>Daily goal<input name="goal" placeholder="e.g. 5 minutes"/></label><fieldset><legend>Choose a symbol</legend><div className="icons">{Object.keys(iconMap).map(n=>{const I=iconMap[n];return <button type="button" key={n} className={icon===n?'picked':''} onClick={()=>setIcon(n)}><I/></button>})}</div></fieldset><input type="hidden" name="icon" value={icon}/><label>When<select name="time"><option>Anytime</option><option>Morning</option><option>Afternoon</option><option>Evening</option></select></label><button className="save" type="submit">Add to my day</button></form></section></div>}
createRoot(document.getElementById('root')).render(<App/>);
