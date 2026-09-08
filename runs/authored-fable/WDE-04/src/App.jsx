import React, { useEffect, useMemo, useState } from 'react';

const initialHabits = [
  { id: 1, name: 'Morning pages', note: '10 quiet minutes', time: '7:30', color: '#D85A36', done: true, streak: 12 },
  { id: 2, name: 'Move outside', note: 'Walk, run, or ride', time: '12:30', color: '#2C6E65', done: true, streak: 8 },
  { id: 3, name: 'Read a chapter', note: 'Fiction before screens', time: '21:00', color: '#B48427', done: false, streak: 21 },
  { id: 4, name: 'Kitchen closed', note: 'After 9 pm', time: '21:00', color: '#745F8D', done: false, streak: 5 },
];

function Icon({ name, size = 20 }) {
  const paths = {
    check: <path d="m5 12 4 4L19 7" />,
    plus: <><path d="M12 5v14"/><path d="M5 12h14"/></>,
    flame: <path d="M12 2s1 4-2 7c-2-2-4-1-5 1-2 4 1 10 7 10s9-4 7-9c-1-3-3-5-5-6 0 3-1 4-2 5" />,
    arrow: <><path d="m9 18 6-6-6-6"/></>,
    back: <><path d="m15 18-6-6 6-6"/></>,
    close: <><path d="m6 6 12 12"/><path d="M18 6 6 18"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></>,
    chevron: <path d="m8 10 4 4 4-4"/>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function App() {
  const [route, setRoute] = useState(location.hash.slice(2) || 'today');
  const [habits, setHabits] = useState(initialHabits);
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (!location.hash) location.hash = '/today';
    const onHash = () => setRoute(location.hash.slice(2) || 'today');
    addEventListener('hashchange', onHash);
    return () => removeEventListener('hashchange', onHash);
  }, []);

  const navigate = (view) => { location.hash = `/${view}`; };
  const flash = (message) => { setToast(message); setTimeout(() => setToast(''), 2200); };
  const toggle = (id) => setHabits(list => list.map(h => h.id === id ? {...h, done: !h.done} : h));
  const addHabit = (habit) => {
    setHabits(list => [...list, {...habit, id: Date.now(), done: false, streak: 0}]);
    navigate('today');
    flash(`${habit.name} added to today`);
  };

  return <div className="stage">
    <main className="phone" aria-live="polite">
      <div className="statusbar"><span>9:41</span><span className="status-icons">● ◒ ▰</span></div>
      {route === 'streak' ? <StreakView habits={habits} navigate={navigate} /> : <TodayView habits={habits} toggle={toggle} navigate={navigate} />}
      {route === 'add' && <AddSheet close={() => navigate('today')} submit={addHabit} />}
      {toast && <div className="toast"><Icon name="check" size={18}/>{toast}</div>}
    </main>
  </div>;
}

function TodayView({ habits, toggle, navigate }) {
  const done = habits.filter(h => h.done).length;
  const date = useMemo(() => new Intl.DateTimeFormat('en-US', {weekday:'long', month:'long', day:'numeric'}).format(new Date()), []);
  return <div className="screen today-screen">
    <header className="today-header">
      <p className="eyebrow">{date}</p>
      <div className="title-row"><h1>Today</h1><button className="avatar" aria-label="Open profile">MK</button></div>
      <div className="progress-row">
        <div className="progress-copy"><strong>{done} of {habits.length}</strong><span>{done === habits.length ? 'All done. Nicely held.' : 'Small steps still count.'}</span></div>
        <div className="progress-ring" style={{'--p': `${(done/habits.length)*360}deg`}}><span>{Math.round(done/habits.length*100)}%</span></div>
      </div>
    </header>

    <section className="habit-list" aria-label="Today's habits">
      <div className="section-label"><span>YOUR RHYTHM</span><span>{habits.length} HABITS</span></div>
      {habits.map((habit, i) => <article className={`habit ${habit.done ? 'is-done' : ''}`} key={habit.id} style={{'--delay': `${i*55}ms`}}>
        <button className="check-button" onClick={() => toggle(habit.id)} aria-label={`${habit.done ? 'Undo' : 'Complete'} ${habit.name}`} style={{'--habit': habit.color}}>
          {habit.done && <Icon name="check" size={21}/>}<span className="check-dot" />
        </button>
        <button className="habit-main" onClick={() => navigate('streak')}>
          <span className="habit-name">{habit.name}</span><span className="habit-note">{habit.note} · {habit.time}</span>
        </button>
        <button className="streak-link" onClick={() => navigate('streak')} aria-label={`View ${habit.streak} day streak`}><Icon name="flame" size={17}/><b>{habit.streak}</b><Icon name="arrow" size={16}/></button>
      </article>)}
    </section>

    <button className="fab" onClick={() => navigate('add')}><Icon name="plus" size={24}/><span>Add habit</span></button>
    <nav className="bottom-nav"><button className="active"><span className="nav-mark"/><span>Today</span></button><button onClick={() => navigate('streak')}><Icon name="calendar"/><span>Journey</span></button></nav>
  </div>;
}

const weeks = [
  [1,1,1,1,1,1,1], [1,1,0,1,1,1,1], [1,1,1,1,1,1,1], [1,1,1,0,1,1,1], [1,1,1,1,1,1,0]
];
function StreakView({ navigate }) {
  return <div className="screen streak-screen">
    <header className="detail-head"><button className="icon-button" onClick={() => navigate('today')} aria-label="Back"><Icon name="back"/></button><span>STREAK DETAIL</span><button className="icon-button ghost-dot" aria-label="More options">•••</button></header>
    <section className="streak-hero">
      <div className="flame-figure"><Icon name="flame" size={38}/></div>
      <p className="eyebrow">READ A CHAPTER</p><h1>21 days</h1><p>You’ve made room for a story every night for three weeks.</p>
    </section>
    <section className="calendar-card">
      <div className="calendar-heading"><div><p className="eyebrow">RECENT RHYTHM</p><h2>August — September</h2></div><button className="icon-button"><Icon name="chevron"/></button></div>
      <div className="week-labels">{['M','T','W','T','F','S','S'].map((d,i)=><span key={i}>{d}</span>)}</div>
      <div className="heatmap">{weeks.flatMap((week,w)=>week.map((on,d)=><span key={`${w}-${d}`} className={on ? 'on' : ''} style={{'--i':w*7+d}}/>))}</div>
      <div className="calendar-key"><span><i className="key-on"/>Done</span><span><i/>Missed</span></div>
    </section>
    <section className="stats-strip"><div><span>CURRENT</span><strong>21</strong><small>days</small></div><div><span>PERSONAL BEST</span><strong>34</strong><small>days</small></div><div><span>COMPLETION</span><strong>91</strong><small>%</small></div></section>
    <aside className="note"><span>“</span><p>Consistency is returning, not perfection.</p></aside>
  </div>;
}

function AddSheet({ close, submit }) {
  const [name, setName] = useState('');
  const [note, setNote] = useState('');
  const [time, setTime] = useState('08:00');
  const [error, setError] = useState(false);
  const save = (e) => { e.preventDefault(); if (!name.trim()) {setError(true); return;} submit({name:name.trim(), note:note.trim() || 'Daily practice', time, color:'#D85A36'}); };
  return <div className="sheet-wrap" role="dialog" aria-modal="true" aria-labelledby="sheet-title" onMouseDown={(e)=>{if(e.target===e.currentTarget) close()}}>
    <form className="sheet" onSubmit={save}>
      <div className="sheet-grip"/><div className="sheet-head"><div><p className="eyebrow">A SMALL PROMISE</p><h2 id="sheet-title">Add a habit</h2></div><button type="button" className="icon-button" onClick={close} aria-label="Close"><Icon name="close"/></button></div>
      <label>Habit name<input autoFocus value={name} onChange={e=>{setName(e.target.value);setError(false)}} placeholder="e.g. Drink a glass of water" className={error?'error':''}/>{error && <small className="error-copy">Give your habit a name.</small>}</label>
      <label>Gentle cue <input value={note} onChange={e=>setNote(e.target.value)} placeholder="What makes it easy to begin?"/></label>
      <div className="form-row"><label>Time<input type="time" value={time} onChange={e=>setTime(e.target.value)}/></label><label>Repeat<button type="button" className="select-button">Every day <Icon name="chevron" size={17}/></button></label></div>
      <div className="color-choice"><span>COLOR</span><div>{['#D85A36','#2C6E65','#B48427','#745F8D'].map((c,i)=><button type="button" key={c} className={i===0?'selected':''} style={{background:c}} aria-label={`Choose color ${i+1}`}/>)}</div></div>
      <button className="save-button" type="submit">Add to my rhythm <Icon name="arrow"/></button>
    </form>
  </div>;
}

export default App;
