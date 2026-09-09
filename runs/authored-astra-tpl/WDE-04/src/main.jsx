import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Plus, Flame, ChevronRight, X, Check, ArrowLeft, MoreHorizontal, ChevronDown, Target, CalendarDays} from 'lucide-react';
import './styles.css';

const initialHabits=[
 {id:1,name:'Morning stretch',meta:'10 min',icon:'stretch',color:'#7856d8',done:true,streak:12},
 {id:2,name:'Drink water',meta:'8 glasses',icon:'water',color:'#328a80',done:true,streak:8},
 {id:3,name:'Read',meta:'20 pages',icon:'read',color:'#db8044',done:false,streak:24},
 {id:4,name:'Evening walk',meta:'30 min',icon:'walk',color:'#c34f69',done:false,streak:5},
];
const colors=['#7856d8','#328a80','#db8044','#c34f69','#3b70b5'];
const icons={stretch:'↗',water:'≈',read:'▤',walk:'⌁',meditate:'○'};
const week=['M','T','W','T','F','S','S'];

function App(){
 const [habits,setHabits]=useState(initialHabits); const [screen,setScreen]=useState('today'); const [sheet,setSheet]=useState(false); const [selected,setSelected]=useState(initialHabits[2]);
 const done=habits.filter(h=>h.done).length;
 const toggle=id=>setHabits(habits.map(h=>h.id===id?{...h,done:!h.done}:h));
 const openDetail=h=>{setSelected(h);setScreen('detail')};
 return <div className="page"><main className="phone">
  {screen==='today'?<Today habits={habits} done={done} toggle={toggle} openDetail={openDetail} add={()=>setSheet(true)}/>:<Detail habit={selected} back={()=>setScreen('today')}/>} 
  <nav className="nav"><button className={screen==='today'?'active':''} onClick={()=>setScreen('today')}><span className="navdot">●</span>Today</button><button onClick={()=>{setSelected(habits[2]);setScreen('detail')}} className={screen==='detail'?'active':''}><Flame size={20}/>Streaks</button></nav>
  {sheet&&<AddSheet close={()=>setSheet(false)} add={h=>{setHabits([...habits,{...h,id:Date.now(),done:false,streak:0}]);setSheet(false)}}/>}
 </main></div>
}
function Today({habits,done,toggle,openDetail,add}){const pct=Math.round(done/habits.length*100); return <div className="screen today">
 <header><div><p className="eyebrow">MONDAY · MAY 20</p><h1>Good morning, Mina</h1></div><button className="avatar" aria-label="Profile">M</button></header>
 <section className="progress"><div className="progress-top"><div><span className="big-num">{done}</span><span className="slash"> / {habits.length}</span><p>habits complete</p></div><div className="ring" style={{'--p':pct+'%'}}><span>{pct}%</span></div></div><div className="bar"><i style={{width:pct+'%'}}/></div><p className="encourage">{done===habits.length?'A perfect day — beautifully done.':'A steady start. Keep your rhythm.'}</p></section>
 <div className="section-head"><h2>Today</h2><span>{habits.length} habits</span></div>
 <div className="habit-list">{habits.map(h=><article className={'habit '+(h.done?'completed':'')} key={h.id}>
   <button className="check" onClick={()=>toggle(h.id)} aria-label={`Mark ${h.name} ${h.done?'incomplete':'complete'}`} style={{'--habit':h.color}}>{h.done&&<Check size={18} strokeWidth={3}/>}</button>
   <button className="habit-main" onClick={()=>openDetail(h)}><span className="habit-icon" style={{background:h.color+'18',color:h.color}}>{icons[h.icon]||'○'}</span><span><strong>{h.name}</strong><small>{h.meta} · <Flame size={12}/>{h.streak} day streak</small></span><ChevronRight className="chev" size={20}/></button>
 </article>)}</div>
 <button className="add" onClick={add}><Plus size={22}/> Add a habit</button>
 </div>}
function Detail({habit,back}){return <div className="screen detail"><header className="detail-head"><button className="icon-btn" onClick={back}><ArrowLeft/></button><p>Streak details</p><button className="icon-btn"><MoreHorizontal/></button></header>
 <section className="detail-hero"><span className="hero-icon" style={{background:habit.color+'18',color:habit.color}}>{icons[habit.icon]}</span><p>{habit.name}</p><h1>{habit.streak}</h1><div className="streak-label"><Flame size={17} fill="currentColor"/> day streak</div><small>Your longest streak yet</small></section>
 <section className="calendar"><div className="calendar-title"><h2>May 2025</h2><button>Month <ChevronDown size={15}/></button></div><div className="week-label">{week.map((d,i)=><span key={i}>{d}</span>)}</div><div className="days">{[0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25].map((d,i)=><span key={i} className={d&&d<20?'hit':d===20?'today-dot':''}>{d||''}</span>)}</div></section>
 <div className="stats"><div><Target/><span><strong>86%</strong><small>Completion rate</small></span></div><div><CalendarDays/><span><strong>43</strong><small>Total completions</small></span></div></div>
 <blockquote>“Small steps, every day.”</blockquote></div>}
function AddSheet({close,add}){const [name,setName]=useState('');const [goal,setGoal]=useState('10 min');const [color,setColor]=useState(colors[0]); return <div className="overlay" onMouseDown={e=>e.target===e.currentTarget&&close()}><section className="sheet" role="dialog" aria-modal="true"><div className="handle"/><div className="sheet-head"><div><p className="eyebrow">NEW ROUTINE</p><h2>Add a habit</h2></div><button className="icon-btn" onClick={close}><X/></button></div>
 <label>Habit name<input autoFocus placeholder="e.g. Morning meditation" value={name} onChange={e=>setName(e.target.value)}/></label>
 <label>Daily goal<div className="input-row"><input value={goal} onChange={e=>setGoal(e.target.value)}/><ChevronDown size={18}/></div></label>
 <fieldset><legend>Color</legend><div className="colors">{colors.map(c=><button key={c} className={color===c?'chosen':''} style={{background:c}} onClick={()=>setColor(c)}>{color===c&&<Check size={18}/>}</button>)}</div></fieldset>
 <div className="sheet-note"><Flame size={18}/><span><strong>Every day</strong><small>Build consistency with a daily rhythm</small></span></div>
 <button className="save" disabled={!name.trim()} onClick={()=>add({name:name.trim(),meta:goal,icon:'meditate',color})}>Create habit</button></section></div>}

createRoot(document.getElementById('root')).render(<App/>);
