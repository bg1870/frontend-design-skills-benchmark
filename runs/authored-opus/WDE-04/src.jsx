import React,{useState} from 'react';
import{createRoot}from'react-dom/client';
import{Plus,Flame,ChevronRight,X,Check,Home,BarChart3,User,Clock,Leaf,BookOpen,Dumbbell,Droplets}from'lucide-react';
import'./style.css';

const starter=[
 {id:1,name:'Morning stretch',sub:'10 minutes',icon:'dumbbell',color:'#ee6a48',done:true,streak:12},
 {id:2,name:'Read 20 pages',sub:'Every day',icon:'book',color:'#6558ca',done:false,streak:7},
 {id:3,name:'Drink water',sub:'6 of 8 glasses',icon:'water',color:'#268d95',done:false,streak:18,progress:75},
 {id:4,name:'Evening reflection',sub:'Before bed',icon:'leaf',color:'#c58b2b',done:false,streak:4}
];
const icons={dumbbell:Dumbbell,book:BookOpen,water:Droplets,leaf:Leaf};
const colors=['#ee6a48','#6558ca','#268d95','#c58b2b','#4778b9'];
const weeks=[[1,1,1,1,1,0,1],[1,1,1,0,1,1,1],[1,1,1,1,1,1,1],[1,1,1,1,1,1,0],[1,1,1,1,1,0,0]];
function App(){
 const[habits,setHabits]=useState(starter),[screen,setScreen]=useState('today'),[selected,setSelected]=useState(null),[sheet,setSheet]=useState(false),[name,setName]=useState(''),[color,setColor]=useState(colors[0]);
 const done=habits.filter(h=>h.done).length; const toggle=id=>setHabits(x=>x.map(h=>h.id===id?{...h,done:!h.done}:h));
 function add(e){e.preventDefault();if(!name.trim())return;setHabits(x=>[...x,{id:Date.now(),name:name.trim(),sub:'Every day',icon:'leaf',color,done:false,streak:0}]);setName('');setSheet(false)}
 const openDetail=h=>{setSelected(h);setScreen('detail')};
 return <div className="stage"><div className="phone">
  <div className="status"><b>9:41</b><span>●●● ᯤ ▰</span></div>
  {screen==='today'?<main className="today">
   <header><div><p className="eyebrow">TUESDAY, SEP 8</p><h1>Good morning<span>.</span></h1><p className="muted">Small steps, beautiful change.</p></div><button className="avatar"><span>JM</span><i/></button></header>
   <section className="progress-card"><div className="ring" style={{'--p':`${done/habits.length*360}deg`}}><div><b>{done}</b><small>of {habits.length}</small></div></div><div><p>TODAY'S PROGRESS</p><h2>{done===habits.length?'All done — wonderful!':done?'You’re off to a great start':'Ready when you are'}</h2><span>{habits.length-done} habit{habits.length-done===1?'':'s'} left for today</span></div></section>
   <div className="section-title"><h2>Today’s habits</h2><span>{done}/{habits.length} done</span></div>
   <div className="habits">{habits.map(h=>{const Icon=icons[h.icon]||Leaf;return <article className={'habit '+(h.done?'complete':'')} key={h.id}><button className="check" onClick={()=>toggle(h.id)} style={{'--c':h.color}}>{h.done&&<Check size={19}/>}</button><button className="habit-main" onClick={()=>openDetail(h)}><span className="habit-icon" style={{background:h.color+'18',color:h.color}}><Icon size={21}/></span><span className="habit-copy"><b>{h.name}</b><small>{h.sub}</small>{h.progress&&<i><em style={{width:h.progress+'%',background:h.color}}/></i>}</span><span className="streak"><Flame size={14} fill="currentColor"/>{h.streak}</span><ChevronRight size={18}/></button></article>})}</div>
   <button className="add" onClick={()=>setSheet(true)}><Plus size={22}/> Add a habit</button>
  </main>:<Detail habit={selected||habits[0]} back={()=>setScreen('today')} toggle={()=>toggle(selected.id)}/>} 
  <nav><button className={screen==='today'?'active':''} onClick={()=>setScreen('today')}><Home/><span>Today</span></button><button onClick={()=>setScreen('detail')} className={screen==='detail'?'active':''}><BarChart3/><span>Insights</span></button><button><User/><span>Profile</span></button></nav>
  {sheet&&<><div className="scrim" onClick={()=>setSheet(false)}/><form className="sheet" onSubmit={add}><div className="grab"/><div className="sheet-head"><div><p>NEW ROUTINE</p><h2>Add a habit</h2></div><button type="button" onClick={()=>setSheet(false)}><X/></button></div><label>What do you want to do?</label><input autoFocus value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Take a morning walk"/><label>Color</label><div className="colors">{colors.map(c=><button type="button" key={c} style={{background:c}} className={color===c?'picked':''} onClick={()=>setColor(c)}>{color===c&&<Check/>}</button>)}</div><div className="schedule"><Clock/><div><b>Every day</b><span>Once a day · Any time</span></div><ChevronRight/></div><button className="create">Create habit</button></form></>}
 </div><p className="assumption">A calm daily ritual, designed for one-handed use.</p></div>
}
function Detail({habit,back,toggle}){return <main className="detail"><div className="detail-top"><button onClick={back}>‹</button><span>Habit details</span><button>•••</button></div><div className="hero-icon" style={{background:habit.color+'18',color:habit.color}}><Flame/></div><h1>{habit.name}</h1><p>Every day · {habit.sub}</p><section className="streak-card"><div><span>CURRENT STREAK</span><h2>{habit.streak} days</h2><p>Your longest yet. Keep it going!</p></div><Flame fill="#ef6b45" color="#ef6b45" size={48}/></section><section className="calendar"><div className="cal-head"><div><span>CONSISTENCY</span><h2>Last 5 weeks</h2></div><b>87%</b></div><div className="days">{'MTWTFSS'.split('').map((d,i)=><span key={i}>{d}</span>)}</div>{weeks.map((w,i)=><div className="week" key={i}>{w.map((v,j)=><i key={j} className={v?'filled':''} style={v?{background:habit.color}:null}>{i===4&&j===1?<Check/>:''}</i>)}</div>)}</section><button className="done-button" style={{background:habit.color}} onClick={toggle}><Check/> Mark complete today</button></main>}
createRoot(document.getElementById('root')).render(<App/>);
