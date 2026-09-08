import React, {useEffect, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {ArrowLeft, Bell, BookOpen, CaretRight, Check, Fire, Footprints, GearSix, Leaf, Plus, Sparkle, X} from '@phosphor-icons/react';
import './styles.css';

const seedHabits = [
  {id:1, name:'Morning walk', note:'20 minutes outside', icon:Footprints, tone:'rose', streak:12, done:true},
  {id:2, name:'Read a chapter', note:'Before reaching for your phone', icon:BookOpen, tone:'sand', streak:7, done:false},
  {id:3, name:'Evening reset', note:'Clear one surface', icon:Sparkle, tone:'sage', streak:4, done:false},
];
const week = [{d:'M',n:7,on:true},{d:'T',n:8,on:true},{d:'W',n:9,on:true},{d:'T',n:10,on:true},{d:'F',n:11,on:true},{d:'S',n:12,on:false},{d:'S',n:13,on:false}];

function App(){
 const [view,setView]=useState('today'); const [habits,setHabits]=useState(seedHabits); const [sheet,setSheet]=useState(false); const [saved,setSaved]=useState(''); const [loading,setLoading]=useState(true);
 useEffect(()=>{const t=setTimeout(()=>setLoading(false),550);return()=>clearTimeout(t)},[]);
 const done=habits.filter(h=>h.done).length;
 const toggle=id=>setHabits(v=>v.map(h=>h.id===id?{...h,done:!h.done}:h));
 const addHabit=name=>{const next={id:Date.now(),name,note:'Daily practice',icon:Leaf,tone:'sage',streak:0,done:false};setHabits(v=>[...v,next]);setSaved(`${name} added`);setSheet(false);setTimeout(()=>setSaved(''),2600)};
 return <div className="stage"><div className="phone-shell">
   <header className="status"><span>9:41</span><span className="status-mark">stead / 04</span><span>● ◒</span></header>
   {view==='today'?<Today habits={habits} done={done} toggle={toggle} loading={loading} openSheet={()=>setSheet(true)} openDetail={()=>setView('detail')}/>:<Detail back={()=>setView('today')}/>} 
   {sheet&&<AddSheet close={()=>setSheet(false)} save={addHabit}/>}<div className="live" aria-live="polite">{saved}</div>
 </div></div>
}

function Today({habits,done,toggle,loading,openSheet,openDetail}){
 return <main id="main" className="screen today-screen">
  <div className="topline"><button className="wordmark" aria-label="Today"><span className="brand-mark"><i/><i/><i/></span>stead</button><button className="icon-btn" aria-label="Notifications"><Bell size={20}/><span className="dot"/></button></div>
  <section className="intro"><p className="date">Monday, 7 September</p><h1>Keep the day<br/>gently moving.</h1><div className="progress-copy"><span>{done} of {habits.length} complete</span><span>{Math.round(done/habits.length*100)}%</span></div><div className="progress"><i style={{transform:`scaleX(${done/habits.length})`}}/></div></section>
  <section className="habit-section" aria-labelledby="today-title"><div className="section-head"><h2 id="today-title">Today</h2><span>{habits.length} practices</span></div>
   <div className="habit-list">{loading?[0,1,2].map(i=><div className="habit skeleton" key={i}><i/><div><b/><span/></div></div>):habits.length?habits.map((h,i)=><Habit key={h.id} habit={h} index={i} toggle={()=>toggle(h.id)} detail={h.id===1?openDetail:undefined}/>):<div className="empty"><Leaf size={28}/><h3>Your day is open</h3><p>Add one small practice to begin.</p><button className="text-button" onClick={openSheet}>Add your first habit</button></div>}</div>
  </section>
  <button className="add-button" onClick={openSheet}><Plus size={20} weight="bold"/>Add habit</button>
  <nav className="bottom-nav" aria-label="Primary"><button className="active"><span className="nav-glyph"><Check size={18} weight="bold"/></span>Today</button><button onClick={openDetail}><span className="nav-glyph"><Fire size={18}/></span>Streaks</button><button><span className="nav-glyph"><GearSix size={18}/></span>Settings</button></nav>
 </main>
}
function Habit({habit,index,toggle,detail}){const Icon=habit.icon;return <article className={`habit ${habit.done?'is-done':''}`} style={{'--delay':`${index*55}ms`}}><button className="habit-main" onClick={detail||toggle} aria-label={detail?`View ${habit.name} streak`:`Toggle ${habit.name}`}><span className={`habit-icon ${habit.tone}`}><Icon size={22}/></span><span className="habit-copy"><strong>{habit.name}</strong><small>{habit.note}</small></span>{detail&&<CaretRight size={18} className="chevron"/>}</button><button className="check" onClick={toggle} aria-label={`${habit.done?'Mark incomplete':'Complete'} ${habit.name}`} aria-pressed={habit.done}>{habit.done&&<Check size={18} weight="bold"/>}</button></article>}

function Detail({back}){return <main id="main" className="screen detail-screen"><div className="detail-nav"><button className="icon-btn" onClick={back} aria-label="Back to today"><ArrowLeft size={20}/></button><span>Morning walk</span><button className="icon-btn" aria-label="Habit settings"><GearSix size={20}/></button></div><section className="streak-hero"><div className="sun"><span><Fire size={30} weight="fill"/></span></div><p>Current streak</p><h1>12</h1><span>days in a row</span></section><section className="week-card"><div className="week-head"><h2>This week</h2><span>5 of 7</span></div><div className="week-row">{week.map((x,i)=><div key={i} className={x.on?'on':''}><small>{x.d}</small><span>{x.on?<Check size={15} weight="bold"/>:x.n}</span></div>)}</div></section><section className="note-card"><span className="note-number">12</span><div><h2>Your longest run yet</h2><p>You have walked 8 more days than your previous best.</p></div></section><section className="rhythm"><div className="section-head"><h2>September rhythm</h2><span>12 walks</span></div><div className="heatmap" aria-label="Activity calendar for September">{Array.from({length:28},(_,i)=><i key={i} className={i<12||[14,17,20].includes(i)?'filled':''}/>)}</div><div className="legend"><span>Less</span><i/><i className="mid"/><i className="filled"/><span>More</span></div></section><button className="detail-action" onClick={back}>Back to today</button></main>}

function AddSheet({close,save}){const [name,setName]=useState('');const [error,setError]=useState('');const panel=useRef(null);useEffect(()=>{const onKey=e=>e.key==='Escape'&&close();document.addEventListener('keydown',onKey);return()=>document.removeEventListener('keydown',onKey)},[close]);const submit=e=>{e.preventDefault();if(!name.trim()){setError('Give this habit a short name.');return}save(name.trim())};return <div className="sheet-wrap" role="presentation" onMouseDown={e=>e.target===e.currentTarget&&close()}><section className="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title" ref={panel}><div className="grabber"/><div className="sheet-title"><div><p>New practice</p><h2 id="sheet-title">What would feel good to repeat?</h2></div><button className="icon-btn" onClick={close} aria-label="Close add habit"><X size={20}/></button></div><form onSubmit={submit} noValidate><label htmlFor="habit-name">Habit name</label><input id="habit-name" name="habit-name" value={name} onChange={e=>{setName(e.target.value);setError('')}} placeholder="Evening stretch…" autoComplete="off" maxLength="36" aria-invalid={!!error} aria-describedby={error?'name-error':undefined}/>{error&&<p className="error" id="name-error">{error}</p>}<fieldset><legend>Choose a rhythm</legend><div className="segmented"><label><input type="radio" name="rhythm" defaultChecked/><span>Daily</span></label><label><input type="radio" name="rhythm"/><span>Weekdays</span></label><label><input type="radio" name="rhythm"/><span>Custom</span></label></div></fieldset><label className="reminder"><span><Bell size={20}/><span><strong>Gentle reminder</strong><small>At 8:00 AM</small></span></span><input type="checkbox" defaultChecked/></label><button className="save" type="submit" disabled={!name.trim()}>Create habit</button></form></section></div>}

createRoot(document.getElementById('root')).render(<App/>);
