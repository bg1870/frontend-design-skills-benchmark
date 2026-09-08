import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';
import {ArrowLeft, BarChart3, CalendarDays, Check, ChevronRight, Flame, Leaf, Plus, X} from 'lucide-react';
import './styles.css';

const seed = [
  {id:1, name:'Morning walk', note:'20 minutes outside', time:'7:30', done:true, streak:18, tone:'#EF5B3F'},
  {id:2, name:'Read ten pages', note:'Keep the book by the sofa', time:'20:00', done:true, streak:7, tone:'#182321'},
  {id:3, name:'Stretch', note:'Five slow minutes', time:'21:30', done:false, streak:4, tone:'#567873'},
  {id:4, name:'No screens in bed', note:'Leave the phone to charge', time:'22:30', done:false, streak:12, tone:'#91A6AA'}
];
const week = ['M','T','W','T','F','S','S'];

function App(){
  const [habits,setHabits]=useState(seed); const [view,setView]=useState('today'); const [sheet,setSheet]=useState(false); const [name,setName]=useState(''); const [time,setTime]=useState('08:00');
  const done=habits.filter(h=>h.done).length;
  const toggle=id=>setHabits(habits.map(h=>h.id===id?{...h,done:!h.done}:h));
  const save=e=>{e.preventDefault();if(!name.trim())return;setHabits([...habits,{id:Date.now(),name:name.trim(),note:'A new daily rhythm',time,done:false,streak:0,tone:'#567873'}]);setName('');setSheet(false);setView('today')};
  return <main className="stage"><a className="skip" href="#content">Skip to habits</a><section className="phone" aria-label="Tend habit tracker">
    {view==='today'?<Today habits={habits} done={done} toggle={toggle} detail={()=>setView('detail')}/>:<Detail back={()=>setView('today')}/>} 
    <nav className="dock" aria-label="Main navigation">
      <button className={view==='today'?'active':''} onClick={()=>setView('today')}><CalendarDays/><span>Today</span></button>
      <button className="add" onClick={()=>setSheet(true)} aria-label="Add a habit"><Plus/></button>
      <button className={view==='detail'?'active':''} onClick={()=>setView('detail')}><BarChart3/><span>Rhythm</span></button>
    </nav>
    {sheet&&<AddSheet name={name} setName={setName} time={time} setTime={setTime} close={()=>setSheet(false)} save={save}/>} 
  </section></main>
}

function Today({habits,done,toggle,detail}){const today=new Intl.DateTimeFormat(undefined,{weekday:'long',day:'numeric',month:'long'}).format(new Date());return <div className="view today-view" id="content">
  <header className="topbar"><div className="brand"><Leaf aria-hidden="true"/> tend</div><button className="avatar" aria-label="Open profile">MO</button></header>
  <div className="date-block"><p>{today}</p><h1>Good morning,<br/>Mara.</h1></div>
  <button className="streak-band" onClick={detail} aria-label="View 18 day streak details">
    <span className="streak-icon"><Flame fill="currentColor"/></span><span><strong>18 days</strong><small>Your longest rhythm yet</small></span><ChevronRight/>
  </button>
  <section className="habits" aria-labelledby="habits-title"><div className="section-head"><h2 id="habits-title">Today</h2><span>{done} of {habits.length}</span></div>
    <div className="progress"><i style={{width:`${done/habits.length*100}%`}}/></div>
    <div className="habit-list">{habits.map((h,i)=><article className={'habit '+(h.done?'is-done':'')} key={h.id}>
      <button className="check" onClick={()=>toggle(h.id)} aria-label={`${h.done?'Mark incomplete':'Complete'} ${h.name}`} aria-pressed={h.done}>{h.done&&<Check/>}</button>
      <div className="habit-copy"><h3>{h.name}</h3><p>{h.note}</p></div><time dateTime={h.time}>{h.time}</time>
      {i<habits.length-1&&<span className="stem" aria-hidden="true"/>}
    </article>)}</div>
  </section>
</div>}

function Detail({back}){return <div className="view detail-view">
  <header className="detail-nav"><button onClick={back} aria-label="Back to today"><ArrowLeft/></button><span>Streak detail</span><span className="spacer"/></header>
  <section className="hero-stat"><Flame className="big-flame" fill="currentColor" aria-hidden="true"/><div><h1>18</h1><p>days of morning walks</p></div></section>
  <section className="calendar"><div className="cal-head"><div><p>September</p><h2>Showed up<br/>every day.</h2></div><span>18 / 18</span></div>
    <div className="week-labels">{week.map((d,i)=><span key={i}>{d}</span>)}</div>
    <div className="days">{Array.from({length:21},(_,i)=><span className={i<18?'filled':''} key={i}>{i+1}</span>)}</div>
  </section>
  <blockquote>“Small steps, repeated, become a path.”</blockquote>
  <section className="insight"><span>Best pattern</span><strong>Weekdays at 7:24</strong><p>You’re most consistent before your first meeting.</p></section>
</div>}

function AddSheet({name,setName,time,setTime,close,save}){return <div className="overlay" onMouseDown={e=>{if(e.target===e.currentTarget)close()}}><section className="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title">
  <div className="grab"/><header><div><p>New rhythm</p><h2 id="sheet-title">What will you tend?</h2></div><button onClick={close} aria-label="Close"><X/></button></header>
  <form onSubmit={save}><label>Habit name<input name="habit-name" autoComplete="off" value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Drink a glass of water…" required/></label>
    <fieldset><legend>Repeat</legend><div className="day-pills">{week.map((d,i)=><button type="button" className="selected" key={i} aria-pressed="true">{d}</button>)}</div></fieldset>
    <label>Gentle reminder<input name="reminder-time" autoComplete="off" type="time" value={time} onChange={e=>setTime(e.target.value)}/></label>
    <button className="save" type="submit">Plant this habit <Leaf/></button>
  </form>
</section></div>}

createRoot(document.getElementById('root')).render(<App/>);
