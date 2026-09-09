import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';
import {ArrowLeft, BarChart3, BookOpen, Check, ChevronRight, Dumbbell, Flame, Home, MoreHorizontal, Plus, Settings, Sparkles, Target, X} from 'lucide-react';
import './styles.css';

const initialHabits = [
  {id:1,name:'Morning stretch',meta:'10 minutes',icon:Dumbbell,color:'#7c5ce5',done:true,streak:12},
  {id:2,name:'Read 20 pages',meta:'Before bed',icon:BookOpen,color:'#ea714f',done:false,streak:8},
  {id:3,name:'No screens after 10',meta:'Every evening',icon:Sparkles,color:'#2c9c83',done:false,streak:5},
];
const colors=['#7c5ce5','#ea714f','#2c9c83','#e7ae37'];

function App(){
 const [habits,setHabits]=useState(initialHabits); const [detail,setDetail]=useState(null); const [sheet,setSheet]=useState(false); const [name,setName]=useState(''); const [color,setColor]=useState(colors[0]);
 const toggle=id=>setHabits(h=>h.map(x=>x.id===id?{...x,done:!x.done}:x));
 const add=()=>{if(!name.trim())return; setHabits(h=>[...h,{id:Date.now(),name:name.trim(),meta:'Every day',icon:Target,color,done:false,streak:0}]);setName('');setSheet(false)};
 const selected=habits.find(h=>h.id===detail);
 if(selected) return <Detail habit={selected} onBack={()=>setDetail(null)}/>;
 return <div className="app"><header><div><p className="eyebrow">THURSDAY, MAY 23</p><h1>Good morning, Alex</h1><p className="sub">Small steps make remarkable days.</p></div><button className="avatar">AL</button></header>
 <section className="progressCard"><div className="ring" style={{'--p':`${habits.filter(h=>h.done).length/habits.length*360}deg`}}><div><b>{habits.filter(h=>h.done).length}/{habits.length}</b><span>done</span></div></div><div><p className="eyebrow">TODAY'S PROGRESS</p><h2>{habits.filter(h=>h.done).length===habits.length?'Perfect day!':'Keep the rhythm going'}</h2><p>{habits.length-habits.filter(h=>h.done).length} habits left for today</p></div><Flame className="flame" fill="currentColor"/></section>
 <div className="sectionTitle"><div><p className="eyebrow">MY ROUTINE</p><h2>Today</h2></div><button className="round" onClick={()=>setSheet(true)}><Plus/></button></div>
 <main className="habitList">{habits.map((h,i)=><Habit key={h.id} h={h} index={i} toggle={toggle} open={()=>setDetail(h.id)}/>)}</main>
 <div className="quote"><Sparkles/><p>“We are what we repeatedly do.”</p><span>— Aristotle</span></div>
 <nav><button className="active"><Home/><span>Today</span></button><button><BarChart3/><span>Insights</span></button><button><Settings/><span>Settings</span></button></nav>
 {sheet&&<AddSheet name={name} setName={setName} color={color} setColor={setColor} close={()=>setSheet(false)} add={add}/>}</div>
}
function Habit({h,index,toggle,open}){const Icon=h.icon;return <article className={'habit '+(h.done?'completed':'')} style={{animationDelay:`${index*70}ms`}}><button className="check" onClick={()=>toggle(h.id)} style={{'--c':h.color}}>{h.done&&<Check/>}</button><button className="habitBody" onClick={open}><span className="iconBox" style={{color:h.color,background:h.color+'18'}}><Icon/></span><span><b>{h.name}</b><small>{h.meta}</small></span><span className="streak"><Flame fill="currentColor"/>{h.streak}</span><ChevronRight/></button></article>}
function Detail({habit,onBack}){const days=[true,true,true,true,true,true,false,true,true,true,true,true,true,true,true,true,true,true,true,false,true,true,true,true,false,false,false,false];return <div className="app detail"><header className="detailHead"><button className="plain" onClick={onBack}><ArrowLeft/></button><p>Habit details</p><button className="plain"><MoreHorizontal/></button></header><section className="hero"><span className="bigIcon" style={{color:habit.color,background:habit.color+'18'}}><habit.icon/></span><h1>{habit.name}</h1><p>{habit.meta} · Every day</p><div className="heroStats"><div><Flame fill="currentColor"/><b>{habit.streak}</b><span>Current streak</span></div><i></i><div><Target/><b>84%</b><span>Completion</span></div></div></section><section className="calendar"><div className="month"><button>‹</button><h2>May 2024</h2><button>›</button></div><div className="week">{['M','T','W','T','F','S','S'].map((x,i)=><span key={i}>{x}</span>)}</div><div className="grid">{days.map((d,i)=><span key={i} className={d?'doneDay':i===24?'today':''}>{i+1}{d&&<Check/>}</span>)}</div></section><section className="best"><div className="iconBox"><Flame/></div><div><small>PERSONAL BEST</small><b>18 day streak</b><p>April 2 — April 19</p></div><span>Best</span></section><button className="editBtn">Edit habit</button></div>}
function AddSheet({name,setName,color,setColor,close,add}){return <div className="overlay" onMouseDown={e=>e.target===e.currentTarget&&close()}><section className="sheet"><div className="handle"/><div className="sheetHead"><div><p className="eyebrow">NEW ROUTINE</p><h2>Add a habit</h2></div><button className="plain" onClick={close}><X/></button></div><label>Habit name<input autoFocus placeholder="e.g. Drink more water" value={name} onChange={e=>setName(e.target.value)} onKeyDown={e=>e.key==='Enter'&&add()}/></label><label>Repeat<div className="select">Every day <ChevronRight/></div></label><label>Color<div className="colors">{colors.map(c=><button key={c} onClick={()=>setColor(c)} className={color===c?'chosen':''} style={{background:c}}>{color===c&&<Check/>}</button>)}</div></label><button className="create" onClick={add}>Create habit <ArrowLeft className="arrowRight"/></button></section></div>}
createRoot(document.getElementById('root')).render(<App/>);
