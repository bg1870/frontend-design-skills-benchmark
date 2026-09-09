import React,{useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Plus,Flame,ChevronRight,ChevronLeft,X,Home,BarChart3,User,Check,Leaf,Dumbbell,BookOpen,Droplets,Sun,MoreHorizontal,Clock,CalendarDays} from 'lucide-react';
import './style.css';

const starter=[
 {id:1,name:'Morning meditation',meta:'10 min · Every day',icon:Leaf,color:'#b8d7a6',done:true,streak:12},
 {id:2,name:'Drink 8 glasses',meta:'6 of 8 glasses',icon:Droplets,color:'#add8ed',done:false,progress:75,streak:5},
 {id:3,name:'Read 20 pages',meta:'Evening · Every day',icon:BookOpen,color:'#e8c5a2',done:false,streak:8},
 {id:4,name:'Move your body',meta:'30 min · Mon, Wed, Fri',icon:Dumbbell,color:'#d8c2e8',done:false,streak:3},
];
const suggestions=[{name:'Drink water',icon:Droplets,color:'#add8ed'},{name:'Read',icon:BookOpen,color:'#e8c5a2'},{name:'Exercise',icon:Dumbbell,color:'#d8c2e8'},{name:'Meditate',icon:Leaf,color:'#b8d7a6'}];
function App(){
 const [habits,setHabits]=useState(starter),[screen,setScreen]=useState('today'),[sheet,setSheet]=useState(false),[selected,setSelected]=useState(starter[0]),[name,setName]=useState(''),[emoji,setEmoji]=useState('🌱');
 const complete=habits.filter(x=>x.done).length;
 const toggle=id=>setHabits(habits.map(h=>h.id===id?{...h,done:!h.done}:h));
 const openDetail=h=>{setSelected(h);setScreen('detail')};
 const add=()=>{if(!name.trim())return;setHabits([...habits,{id:Date.now(),name:name.trim(),meta:'Every day',icon:null,emoji,color:'#c9d9a8',done:false,streak:0}]);setName('');setSheet(false)};
 return <div className="page"><main className="phone">
  {screen==='today'?<>
   <header><div><span className="eyebrow">WEDNESDAY, MAY 22</span><h1>Good morning, Mia.</h1><p>Small steps make bright days.</p></div><button className="avatar"><span>M</span></button></header>
   <section className="progress-card"><div className="ring" style={{'--p':`${complete/habits.length*360}deg`}}><div>{complete}<small>of {habits.length}</small></div></div><div className="progress-copy"><span>TODAY'S PROGRESS</span><strong>{complete===habits.length?'A perfect day!':'You’re off to a great start!'}</strong><p>{habits.length-complete} habits left for today</p></div><Flame className="flame"/></section>
   <div className="section-title"><div><h2>Today</h2><span>{complete}/{habits.length} completed</span></div><button onClick={()=>setSheet(true)}><Plus size={19}/> Add habit</button></div>
   <section className="list">{habits.map(h=>{const Icon=h.icon;return <article className={'habit '+(h.done?'done':'')} key={h.id}>
    <button className="check" onClick={()=>toggle(h.id)}>{h.done&&<Check size={19}/>}</button>
    <button className="habit-main" onClick={()=>openDetail(h)}><span className="habit-icon" style={{background:h.color}}>{Icon?<Icon size={21}/>:h.emoji}</span><span><b>{h.name}</b><small>{h.meta}</small>{h.progress&&<i><em style={{width:h.progress+'%'}}/></i>}</span></button>
    <button className="go" onClick={()=>openDetail(h)}><span><Flame size={14}/>{h.streak}</span><ChevronRight size={18}/></button>
   </article>})}</section>
   <blockquote>“We are what we repeatedly do.”<small>— Aristotle</small></blockquote>
  </>:<Detail habit={selected} back={()=>setScreen('today')}/>} 
  <nav><button className={screen==='today'?'active':''} onClick={()=>setScreen('today')}><Home/><span>Today</span></button><button><BarChart3/><span>Insights</span></button><button><User/><span>Profile</span></button></nav>
  {sheet&&<AddSheet close={()=>setSheet(false)} name={name} setName={setName} emoji={emoji} setEmoji={setEmoji} add={add}/>} 
 </main></div>
}
function Detail({habit,back}){const days=[['M',true],['T',true],['W',true],['T',true],['F',true],['S',false],['S',true]];return <div className="detail">
 <div className="topbar"><button onClick={back}><ChevronLeft/></button><b>Habit details</b><button><MoreHorizontal/></button></div>
 <div className="detail-head"><span className="big-icon" style={{background:habit.color}}>{habit.icon?React.createElement(habit.icon):habit.emoji}</span><h1>{habit.name}</h1><p><Clock size={15}/> {habit.meta}</p></div>
 <section className="streak-hero"><span><Flame/></span><div><small>CURRENT STREAK</small><strong>{habit.streak} days</strong><p>Keep showing up — you’re doing great.</p></div></section>
 <div className="stats"><div><b>{habit.streak}</b><span>Current streak</span></div><div><b>18</b><span>Best streak</span></div><div><b>86%</b><span>Completion rate</span></div></div>
 <section className="calendar"><div className="cal-title"><div><h2>May</h2><span>18 days completed</span></div><CalendarDays/></div><div className="week">{days.map((d,i)=><div key={i}><small>{d[0]}</small><span className={d[1]?'hit':''}>{d[1]?<Check size={15}/>:18+i}</span></div>)}</div><div className="month-grid">{Array.from({length:28},(_,i)=><span className={(i<17||[18,20,22,24].includes(i))?'filled':''} key={i}>{i+1}</span>)}</div></section>
 </div>}
function AddSheet({close,name,setName,emoji,setEmoji,add}){return <div className="overlay" onMouseDown={e=>e.target===e.currentTarget&&close()}><section className="sheet"><div className="grab"/><div className="sheet-title"><div><h2>Create a habit</h2><p>What do you want to make a ritual?</p></div><button onClick={close}><X/></button></div><label>HABIT NAME</label><div className="input"><span>{emoji}</span><input autoFocus value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Morning walk" onKeyDown={e=>e.key==='Enter'&&add()}/></div><label>QUICK START</label><div className="suggestions">{suggestions.map((s,i)=>{let Icon=s.icon;return <button key={s.name} onClick={()=>{setName(s.name);setEmoji(['💧','📖','💪','🌱'][i])}}><span style={{background:s.color}}><Icon/></span>{s.name}</button>})}</div><div className="rows"><button><span><CalendarDays/> Repeat</span><b>Every day <ChevronRight/></b></button><button><span><Clock/> Reminder</span><b>8:00 AM <ChevronRight/></b></button></div><button className="create" disabled={!name.trim()} onClick={add}>Create habit</button></section></div>}
createRoot(document.getElementById('root')).render(<App/>);
