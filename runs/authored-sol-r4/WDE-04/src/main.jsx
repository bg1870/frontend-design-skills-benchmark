import React, {useMemo, useState} from 'react';
import { createRoot } from 'react-dom/client';
import { Plus, ChevronRight, ArrowLeft, X, Check, CalendarDays, Flame, BarChart3, Home, Sparkles } from 'lucide-react';
import './styles.css';

const seed = [
  {id:1,name:'Morning walk',note:'20 minutes outside',color:'#315f49',done:true,icon:'walk'},
  {id:2,name:'Read ten pages',note:'Before screen time',color:'#db6b43',done:true,icon:'read'},
  {id:3,name:'Drink water',note:'6 of 8 glasses',color:'#477b91',done:false,icon:'water'},
  {id:4,name:'Evening stretch',note:'8 minutes',color:'#80629a',done:false,icon:'stretch'},
];
const days = [
  {d:'T',n:3,state:'done'}, {d:'W',n:4,state:'done'}, {d:'T',n:5,state:'done'},
  {d:'F',n:6,state:'done'}, {d:'S',n:7,state:'done'}, {d:'S',n:8,state:'done'}, {d:'M',n:9,state:'today'}
];
const history = [
  {label:'This week',marks:[1,1,1,1,1,1,2]},
  {label:'Last week',marks:[1,1,1,0,1,1,1]},
  {label:'Aug 25–31',marks:[1,1,0,1,1,1,1]},
  {label:'Aug 18–24',marks:[0,1,1,1,0,1,1]},
];
function Mark({state='done',children}) {return <span className={`mark ${state}`}>{state==='done'?<Check size={15}/>:children}</span>}
function Today({habits,setHabits,onDetail,onAdd}){
 const complete=habits.filter(h=>h.done).length; const pct=Math.round(complete/habits.length*100)||0;
 const toggle=id=>setHabits(x=>x.map(h=>h.id===id?{...h,done:!h.done}:h));
 return <main className="screen today" aria-labelledby="today-title">
   <header className="topbar"><div><div className="brand"><i/> tempo <span>Sample data</span></div><h1 id="today-title">Today</h1><p>Wednesday, September 9</p></div><button className="avatar" aria-label="Open profile">T</button></header>
   <section className="week" aria-label="Week overview">{days.map((x,i)=><div className={x.state==='today'?'active':''} key={i}><span>{x.d}</span><Mark state={x.state}>{x.n}</Mark><small>{x.n}</small></div>)}</section>
   <button className="streak-strip" onClick={onDetail}><span className="flame"><Flame size={20}/></span><span><strong>12 day rhythm</strong><small>Your longest stretch yet</small></span><ChevronRight size={20}/></button>
   <section className="list-head"><div><h2>Daily rhythm</h2><p>{complete} of {habits.length} complete</p></div><div className="progress" aria-label={`${pct}% complete`} style={{'--p':pct}}><b>{pct}</b><small>%</small></div></section>
   <section className="habit-list" aria-label="Habits">{habits.map(h=><button className={`habit ${h.done?'is-done':''}`} key={h.id} onClick={()=>toggle(h.id)}><span className="habit-mark" style={{'--habit':h.color}}>{h.done&&<Check size={18}/>}</span><span><strong>{h.name}</strong><small>{h.note}</small></span><span className="toggle-word">{h.done?'Done':'Mark done'}</span></button>)}</section>
   <button className="add-inline" onClick={onAdd}><Plus size={18}/> Add a habit</button>
 </main>
}
function Detail({onBack}){return <main className="screen detail" aria-labelledby="detail-title">
 <header className="navhead"><button className="iconbtn" onClick={onBack} aria-label="Back to today"><ArrowLeft/></button><span>Streak detail</span><button className="iconbtn" aria-label="Open calendar"><CalendarDays/></button></header>
 <section className="streak-hero"><div className="orb"><Flame/></div><p>Current rhythm</p><h1 id="detail-title">12 days</h1><span>Aug 29 – Sep 9</span></section>
 <section className="metric-row"><div><b>12</b><span>Current</span></div><div><b>12</b><span>Best</span></div><div><b>86%</b><span>30 days</span></div></section>
 <section className="calendar-block"><div className="section-title"><div><h2>Consistency</h2><p>Past 28 days</p></div><span className="legend"><i/> All habits</span></div><div className="daylabels">{['M','T','W','T','F','S','S'].map((x,i)=><span key={i}>{x}</span>)}</div>{history.map((w,wi)=><div className="history-row" key={w.label} aria-label={w.label}>{w.marks.map((m,i)=><span key={i} className={m===1?'filled':m===2?'current':'empty'}>{m===1&&<Check size={14}/>}</span>)}</div>)}</section>
 <section className="keep"><Sparkles/><div><h2>Keep the chain gentle.</h2><p>A missed day is information, not failure. Pick up with the next cue.</p></div></section>
 </main>}
function AddSheet({onClose,onSave}){
 const [name,setName]=useState(''); const [note,setNote]=useState(''); const [freq,setFreq]=useState('Daily'); const [color,setColor]=useState('#315f49'); const [error,setError]=useState(false);
 const submit=e=>{e.preventDefault();if(!name.trim()){setError(true);return} onSave({id:Date.now(),name:name.trim(),note:note.trim()||freq,color,done:false})}
 return <div className="sheet-wrap" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}><section className="sheet" role="dialog" aria-modal="true" aria-labelledby="add-title"><div className="grab"/><header><div><p>New rhythm</p><h2 id="add-title">Add a habit</h2></div><button className="iconbtn" onClick={onClose} aria-label="Close"><X/></button></header><form onSubmit={submit}>
 <label>Habit name<input autoFocus value={name} onChange={e=>{setName(e.target.value);setError(false)}} placeholder="e.g. Journal for five minutes" aria-invalid={error}/>{error&&<small className="error">Give your habit a name.</small>}</label>
 <label>Helpful cue <span>Optional</span><input value={note} onChange={e=>setNote(e.target.value)} placeholder="When or where will you do it?"/></label>
 <fieldset><legend>Frequency</legend><div className="segments">{['Daily','Weekdays','Weekly'].map(x=><button type="button" className={freq===x?'selected':''} onClick={()=>setFreq(x)} key={x}>{x}</button>)}</div></fieldset>
 <fieldset><legend>Color</legend><div className="colors">{['#315f49','#db6b43','#477b91','#80629a','#c89b36'].map(x=><button type="button" key={x} style={{background:x}} className={color===x?'selected':''} onClick={()=>setColor(x)} aria-label={`Select color ${x}`}>{color===x&&<Check/>}</button>)}</div></fieldset>
 <button className="save" type="submit">Add to today <ArrowLeft/></button></form></section></div>
}
function App(){const [view,setView]=useState('today');const [sheet,setSheet]=useState(false);const [habits,setHabits]=useState(seed);const save=h=>{setHabits(x=>[...x,h]);setSheet(false)};return <div className="stage"><aside className="desk-note"><div className="brand large"><i/> tempo</div><h2>Small actions.<br/>Visible rhythm.</h2><p>A tactile mobile prototype for returning to what matters, one day at a time.</p><div className="desk-rule"><span>01</span> TODAY <span>02</span> STREAKS <span>03</span> ADD</div></aside><div className="phone">{view==='today'?<Today habits={habits} setHabits={setHabits} onDetail={()=>setView('detail')} onAdd={()=>setSheet(true)}/>:<Detail onBack={()=>setView('today')}/>}<nav className="bottomnav" aria-label="Primary"><button className={view==='today'?'active':''} onClick={()=>setView('today')}><Home/>Today</button><button className={view==='detail'?'active':''} onClick={()=>setView('detail')}><BarChart3/>Rhythm</button><button className="addfab" onClick={()=>setSheet(true)} aria-label="Add habit"><Plus/></button></nav>{sheet&&<AddSheet onClose={()=>setSheet(false)} onSave={save}/>}</div></div>}
createRoot(document.getElementById('root')).render(<App/>);
