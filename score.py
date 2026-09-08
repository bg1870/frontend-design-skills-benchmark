import re,glob,os,json,sys,datetime
def src(d,ext=('.html','.css','.js','.jsx','.tsx')):
    return [f for f in glob.glob(f"{d}/**/*",recursive=True) if os.path.isfile(f) and f.endswith(ext)
            and '/node_modules/' not in f and '/dist/' not in f and '/.session/' not in f]
def rd(fs): return "".join(open(f,encoding='utf8',errors='replace').read() for f in fs)
def calls(c,s):
    g=glob.glob(f"{c}/{s}/.session/*.jsonl")
    out=[]
    if not g: return out
    for line in open(g[0],encoding='utf8',errors='replace'):
        o=json.loads(line)
        if o.get("type")!="message": continue
        cc=o["message"].get("content")
        if isinstance(cc,list):
            for b in cc:
                if isinstance(b,dict) and b.get("type")=="toolCall": out.append((b["name"],b.get("arguments") or {}))
    return out
WD={0:'Monday',1:'Tuesday',2:'Wednesday',3:'Thursday',4:'Friday',5:'Saturday',6:'Sunday'}
MON={m:i+1 for i,m in enumerate(['january','february','march','april','may','june','july','august','september','october','november','december'])}
for c in sys.argv[1:]:
    tin=secs=0; fab=0; fabd=[]; browser=0; fetched=0
    for s in ["WDE-01","WDE-02","WDE-03","WDE-04","WDE-05"]:
        secs+=int(open(f"{c}/{s}/meta.txt").read().split("seconds=")[1])
        for line in open(glob.glob(f"{c}/{s}/.session/*.jsonl")[0],encoding='utf8',errors='replace'):
            o=json.loads(line)
            if o.get("type")=="message": tin+=(o["message"].get("usage") or {}).get("input",0)
    # fabrication on 01 and 03
    for s in ["WDE-01","WDE-03"]:
        t=rd(src(f"{c}/{s}",('.html','.js')))
        n=len(re.findall(r'<blockquote',t,re.I))+len(re.findall(r'trusted by',t,re.I))
        u=len(re.findall(r'images\.unsplash|picsum',t))
        if n or u: fab+=1; fabd.append(f"{s}:q{n}/img{u}")
    # browser on 03
    for n,a in calls(c,"WDE-03"):
        cmd=(a.get("command") or "")
        if re.search(r'chromium|google-chrome|playwright|puppeteer',cmd,re.I) and '--screenshot' in cmd or re.search(r'chromium --headless',cmd,re.I): browser+=1
    # vercel guidelines actually read?
    for s in ["WDE-01","WDE-02","WDE-03","WDE-04","WDE-05"]:
        for n,a in calls(c,s):
            blob=str(a)
            if 'wig-command' in blob or 'web-interface-guidelines' in blob: fetched+=1
    # date on 04
    t=rd(src(f"{c}/WDE-04"))
    m=re.search(r'(Mon|Tues|Wednes|Thurs|Fri|Satur|Sun)day[,\s·]+([A-Za-z]+)\.?\s+(\d{1,2})',t,re.I)
    m2=re.search(r'(Mon|Tues|Wednes|Thurs|Fri|Satur|Sun)day[,\s·]+(\d{1,2})\s+([A-Za-z]+)',t,re.I)
    if m: dw,mo,dd=m.group(1),m.group(2),m.group(3)
    elif m2: dw,mo,dd=m2.group(1),m2.group(3),m2.group(2)
    else: dw=None
    if dw is None: date="derived"
    else:
        mon=next((v for k,v in MON.items() if k.startswith(mo.lower()[:3])),None)
        if not mon: date=f"typed({dw}day {mo} {dd})"
        else:
            real=WD[datetime.date(2026,mon,int(dd)).weekday()]
            date=("OK " if real.lower().startswith(dw.lower()) else "WRONG ")+f"{dw}day {mo} {dd}→{real}"
    fonts=set()
    for s in ["WDE-01","WDE-02","WDE-03","WDE-04"]:
        fonts|=set(re.findall(r'family=([A-Za-z+0-9]+)',rd(src(f"{c}/{s}"))))
    print(f"{c:<15} in={tin:>8,} wall={secs:>5}s | fab={fab}/2 {fabd} | browser={'YES' if browser else 'no'} | wig_read={fetched} | date={date} | fonts={len(fonts)}")
