import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';
import {ArrowLeft, BarChart3, CalendarDays, Check, ChevronRight, Flame, Home, Plus, Settings2, X} from 'lucide-react';
import './styles.css';

const initialHabits = [
  {id:1, name:'Morning walk', detail:'20 minutes', time:'Before 9:00', color:'#ff765d', done:true, streak:12},
  {id:2, name:'Read a chapter', detail:'1 chapter', time:'Anytime', color:'#5352a2', done:true, streak:8},
  {id:3, name:'Drink water', detail:'6 of 8 glasses', time:'All day', color:'#147b68', done:false, streak:21},
  {id:4, name:'Evening stretch', detail:'10 minutes', time:'After 7:00', color:'#bd612c', done:false, streak:5},
];
const week = [{d:'M',n:7,v:true},{d:'T',n:8,v:true},{d:'W',n:9,v:true},{d:'T',n:10,v:true},{d:'F',n:11,v:true},{d:'S',n:12,v:true},{d:'S',n:13,v:false}];
const todayLabel = new Intl.DateTimeFormat('en-US',{weekday:'long',month:'long',day:'numeric'}).format(new Date());

function Ring({done,total}) { const pct=done/total; return <div className="ring" style={{'--p':`${pct*360}deg`}}><strong>{done}</strong><span>of {total}</span></div> }
function Today({habits,setHabits,onStreak,onAdd}) {
 const done=habits.filter(h=>h.done).length;
 return <main className="page today">
  <header className="top"><div><p className="date">{todayLabel}</p><h1>Keep your rhythm.</h1></div><button className="icon-button" aria-label="Open settings"><Settings2/></button></header>
  <section className="pulse"><Ring done={done} total={habits.length}/><div><p className="pulse-label">Today’s pace</p><h2>{done===habits.length?'All done':`${habits.length-done} left for today`}</h2><button className="streak-link" onClick={onStreak}><Flame/> 12 day streak <ChevronRight/></button></div></section>
  <div className="section-head"><h2>Today</h2><span>{done}/{habits.length} complete</span></div>
  <div className="habit-list">{habits.map((h,i)=><button className={'habit '+(h.done?'is-done':'')} key={h.id} onClick={()=>setHabits(habits.map(x=>x.id===h.id?{...x,done:!x.done}:x))} style={{'--habit':h.color}}><span className="check">{h.done&&<Check/>}</span><span className="habit-copy"><strong>{h.name}</strong><small>{h.detail} · {h.time}</small></span><span className="mini-streak"><Flame/>{h.streak}</span></button>)}</div>
  <button className="add" onClick={onAdd}><Plus/> Add a habit</button>
 </main>
}
function Streak({onBack}) {return <main className="page detail">
 <header className="detail-head"><button className="icon-button" onClick={onBack} aria-label="Back to today"><ArrowLeft/></button><span>Streak detail</span><button className="icon-button" aria-label="Open calendar"><CalendarDays/></button></header>
 <section className="streak-hero"><div className="sun"><Flame/></div><p>Current streak</p><h1>12 <span>days</span></h1><p className="quiet">Your longest steady run this month.</p></section>
 <section className="week-panel"><div className="section-head"><h2>This week</h2><span>6 of 7 days</span></div><div className="week">{week.map((x,i)=><div key={i} className={x.v?'hit':''}><span>{x.d}</span><b>{x.v?<Check/>:x.n}</b></div>)}</div></section>
 <section className="streak-copy"><h2>You’re building momentum</h2><p>Complete today to keep the chain moving. Three more days will make this your best streak yet.</p><div className="milestone"><div><span>Next milestone</span><strong>15 days</strong></div><span className="track"><i/></span></div></section>
 </main>}
function AddSheet({onClose,onSave}) {const [name,setName]=useState(''); const [frequency,setFrequency]=useState('Every day'); return <div className="scrim" onMouseDown={e=>e.target===e.currentTarget&&onClose()}><section className="sheet" role="dialog" aria-modal="true" aria-labelledby="add-title"><div className="grab"/><header><div><p>Create a rhythm</p><h2 id="add-title">Add a habit</h2></div><button className="icon-button" onClick={onClose} aria-label="Close add habit"><X/></button></header><label>Habit name<input name="habit-name" autoComplete="off" value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Practice guitar…" maxLength="80"/></label><fieldset><legend>Frequency</legend><div className="segments">{['Every day','Weekdays','Custom'].map(x=><button type="button" className={frequency===x?'active':''} onClick={()=>setFrequency(x)} key={x}>{x}</button>)}</div></fieldset><label>Reminder time<input name="reminder-time" autoComplete="off" type="time" defaultValue="08:00"/></label><button className="save" disabled={!name.trim()} onClick={()=>onSave(name)}>Add habit</button></section></div>}
function App(){const [view,setView]=useState('today'); const [sheet,setSheet]=useState(false); const [habits,setHabits]=useState(initialHabits); const save=name=>{setHabits([...habits,{id:Date.now(),name,detail:'1 time',time:'Anytime',color:'#5352a2',done:false,streak:0}]);setSheet(false)}; return <div className="app-shell"><div className="phone">{view==='today'?<Today habits={habits} setHabits={setHabits} onStreak={()=>setView('streak')} onAdd={()=>setSheet(true)}/>:<Streak onBack={()=>setView('today')}/>}<nav aria-label="Primary"><button className={view==='today'?'active':''} onClick={()=>setView('today')}><Home/><span>Today</span></button><button className={view==='streak'?'active':''} onClick={()=>setView('streak')}><BarChart3/><span>Progress</span></button><button onClick={()=>setSheet(true)}><Plus/><span>Add</span></button></nav>{sheet&&<AddSheet onClose={()=>setSheet(false)} onSave={save}/>}</div></div>}

createRoot(document.getElementById('root')).render(<App/>);
