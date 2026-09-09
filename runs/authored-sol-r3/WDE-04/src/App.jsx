import { useMemo, useState } from 'react';

const seedHabits = [
  { id: 1, name: 'Morning pages', note: '10 minutes', time: 'Morning', color: '#e86f4f', done: true, streak: 12, icon: 'write' },
  { id: 2, name: 'Move gently', note: '20 minutes', time: 'Afternoon', color: '#4b7658', done: true, streak: 8, icon: 'move' },
  { id: 3, name: 'Read a chapter', note: 'Before bed', time: 'Evening', color: '#cd9843', done: false, streak: 21, icon: 'book' },
  { id: 4, name: 'Screen-free wind down', note: '30 minutes', time: 'Evening', color: '#527697', done: false, streak: 5, icon: 'moon' },
];

function Icon({ name, size = 22 }) {
  const paths = {
    plus: <><path d="M12 5v14M5 12h14" /></>,
    arrow: <><path d="m9 18 6-6-6-6" /></>,
    back: <><path d="m15 18-6-6 6-6" /></>,
    check: <><path d="m5 12 4 4L19 7" /></>,
    write: <><path d="M4 20h4L19 9l-4-4L4 16v4Z" /><path d="m13.5 6.5 4 4" /></>,
    move: <><circle cx="12" cy="5" r="2"/><path d="m9 22 2-7-3-3 2-4 4 3 3 1"/><path d="m14 22-2-7 3-2 2 3 4 2"/></>,
    book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v17H6.5A2.5 2.5 0 0 0 4 22V5.5Z"/><path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v17h4.5A2.5 2.5 0 0 1 20 22V5.5Z"/></>,
    moon: <><path d="M20 15.5A9 9 0 0 1 8.5 4 8 8 0 1 0 20 15.5Z" /></>,
    flame: <><path d="M12 22c4 0 7-2.8 7-7 0-3.5-2-6.5-5-9 .1 2-1 3.3-2 4-1-3-3-5-5-6 .2 3-2 5.4-2 9.4C5 18.3 8 22 12 22Z"/><path d="M9.5 18c0-2 1.5-3 2.5-5 1.7 1.5 2.5 2.8 2.5 4.3 0 1.5-1.1 2.7-2.5 2.7s-2.5-.8-2.5-2Z"/></>,
    leaf: <><path d="M20 4C12 4 5 7 5 14c0 3 2 5 5 5 7 0 10-7 10-15Z"/><path d="M4 21c3-6 7-9 12-12"/></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></>
  };
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

function App() {
  const [habits, setHabits] = useState(seedHabits);
  const [view, setView] = useState('today');
  const [detailId, setDetailId] = useState(null);
  const [sheet, setSheet] = useState(false);
  const [toast, setToast] = useState('');
  const [form, setForm] = useState({ name: '', note: '', time: 'Morning', color: '#e86f4f' });
  const now = useMemo(() => new Date(), []);
  const dateLabel = new Intl.DateTimeFormat(undefined, { weekday: 'long', month: 'long', day: 'numeric' }).format(now);
  const completed = habits.filter(h => h.done).length;
  const progress = habits.length ? Math.round(completed / habits.length * 100) : 0;
  const selected = habits.find(h => h.id === detailId) || habits[2];

  function toggle(id) {
    setHabits(items => items.map(h => h.id === id ? { ...h, done: !h.done } : h));
  }
  function openDetail(id) { setDetailId(id); setView('detail'); window.scrollTo(0, 0); }
  function addHabit(e) {
    e.preventDefault();
    if (!form.name.trim()) return;
    setHabits(items => [...items, { ...form, id: Date.now(), done: false, streak: 0, icon: 'leaf', note: form.note || 'Daily practice' }]);
    setForm({ name: '', note: '', time: 'Morning', color: '#e86f4f' });
    setSheet(false); setView('today'); setToast('Habit added to today');
    setTimeout(() => setToast(''), 2400);
  }

  return <main className="stage">
    <section className="phone" aria-label="Tend habit tracker prototype">
      <div className="topline"><span>TEND</span><span className="sample">Sample data</span></div>
      {view === 'today' ? <Today {...{ habits, completed, progress, dateLabel, toggle, openDetail, setSheet }} /> : <Detail habit={selected} onBack={() => setView('today')} onToggle={() => toggle(selected.id)} />}
      {sheet && <AddSheet form={form} setForm={setForm} onClose={() => setSheet(false)} onSubmit={addHabit} />}
      {toast && <div className="toast" role="status"><Icon name="check" size={18}/>{toast}</div>}
    </section>
    <aside className="desktop-note" aria-hidden="true"><Icon name="leaf" size={28}/><p>Small rituals,<br/>tended daily.</p><span>A clickable mobile prototype</span></aside>
  </main>
}

function Today({ habits, completed, progress, dateLabel, toggle, openDetail, setSheet }) {
  return <div className="screen">
    <header className="today-head">
      <p className="date">{dateLabel}</p>
      <h1>{completed === habits.length ? 'A day well tended.' : 'Make a little room<br/>for yourself.'}</h1>
      <div className="progress-row">
        <div className="progress-copy"><strong>{completed} of {habits.length}</strong><span>rituals complete</span></div>
        <div className="progress-track" aria-label={`${progress}% complete`}><span style={{width: `${progress}%`}} /></div>
        <strong className="percentage">{progress}%</strong>
      </div>
    </header>
    <section className="habit-section" aria-labelledby="today-list">
      <div className="section-title"><h2 id="today-list">Today’s rhythm</h2><button className="add-small" onClick={() => setSheet(true)}><Icon name="plus" size={19}/> Add habit</button></div>
      <div className="habit-list">{habits.map((habit, i) => <article className={`habit ${habit.done ? 'is-done' : ''}`} key={habit.id} style={{'--habit-color': habit.color, '--delay': `${i * 40}ms`}}>
        <button className="check" onClick={() => toggle(habit.id)} aria-label={`${habit.done ? 'Mark incomplete' : 'Complete'} ${habit.name}`} aria-pressed={habit.done}>{habit.done && <Icon name="check" size={19}/>}</button>
        <button className="habit-main" onClick={() => openDetail(habit.id)}>
          <span className="habit-icon"><Icon name={habit.icon}/></span>
          <span className="habit-copy"><strong>{habit.name}</strong><small>{habit.note}</small></span>
          <span className="streak"><Icon name="flame" size={15}/>{habit.streak}</span>
          <Icon name="arrow" size={18}/>
        </button>
      </article>)}</div>
    </section>
    <button className="fab" onClick={() => setSheet(true)} aria-label="Add a new habit"><Icon name="plus" size={25}/></button>
  </div>
}

function Detail({ habit, onBack, onToggle }) {
  const weeks = [[1,1,1,1,1,0,1],[1,1,1,1,1,1,1],[1,1,1,0,1,1,1],[1,1,1,1,1,1,0],[1,1,1,1,1,0,0]];
  return <div className="screen detail-screen">
    <header className="detail-nav"><button onClick={onBack} aria-label="Back to today"><Icon name="back"/></button><span>Streak detail</span><span className="nav-spacer"/></header>
    <section className="streak-hero">
      <span className="detail-icon" style={{background: habit.color}}><Icon name={habit.icon} size={27}/></span>
      <p>{habit.name}</p><h1>{habit.streak}<small>day streak</small></h1>
      <span className="encouragement">Your longest yet. Keep the thread going.</span>
    </section>
    <section className="calendar-block">
      <div className="calendar-title"><div><h2>Last 5 weeks</h2><p>28 of 35 days completed</p></div><Icon name="calendar"/></div>
      <div className="week-labels"><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span></div>
      <div className="heatmap">{weeks.flatMap((week, wi) => week.map((done, di) => <span key={`${wi}-${di}`} className={done ? 'filled' : ''} title={done ? 'Completed' : 'Not completed'} />))}</div>
      <div className="legend"><span><i/>Rest day</span><span><i className="filled"/>Completed</span></div>
    </section>
    <section className="streak-facts"><div><small>Current</small><strong>{habit.streak} days</strong></div><div><small>Best</small><strong>{Math.max(habit.streak, 21)} days</strong></div></section>
    <button className={`complete-button ${habit.done ? 'done' : ''}`} onClick={onToggle}><Icon name="check"/>{habit.done ? 'Completed today' : 'Mark complete'}</button>
  </div>
}

function AddSheet({ form, setForm, onClose, onSubmit }) {
  const colors = ['#e86f4f','#4b7658','#cd9843','#527697'];
  return <div className="scrim" onMouseDown={e => e.target === e.currentTarget && onClose()}>
    <section className="sheet" role="dialog" aria-modal="true" aria-labelledby="add-title">
      <div className="sheet-handle"/><div className="sheet-head"><div><p>NEW RITUAL</p><h2 id="add-title">What would you like to tend?</h2></div><button onClick={onClose} aria-label="Close"><Icon name="close"/></button></div>
      <form onSubmit={onSubmit}>
        <label>Habit name<input autoFocus required placeholder="e.g. Drink a glass of water" value={form.name} onChange={e => setForm({...form, name:e.target.value})}/></label>
        <label>Gentle cue <input placeholder="e.g. After I wake up" value={form.note} onChange={e => setForm({...form, note:e.target.value})}/></label>
        <fieldset><legend>Time of day</legend><div className="segments">{['Morning','Afternoon','Evening'].map(t => <button type="button" className={form.time === t ? 'active' : ''} onClick={() => setForm({...form,time:t})} key={t}>{t}</button>)}</div></fieldset>
        <fieldset><legend>Color</legend><div className="colors">{colors.map(c => <button type="button" key={c} style={{background:c}} className={form.color === c ? 'active' : ''} onClick={() => setForm({...form,color:c})} aria-label={`Choose ${c} color`}>{form.color === c && <Icon name="check" size={18}/>}</button>)}</div></fieldset>
        <button className="create" type="submit">Add to today <Icon name="arrow"/></button>
      </form>
    </section>
  </div>
}

export default App;
