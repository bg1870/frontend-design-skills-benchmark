import json,glob,os,sys
def stats(pat):
    tin=cr=out=rea=0; cost=0.0; turns=0; tools=0
    for f in glob.glob(pat):
        for line in open(f,encoding='utf8',errors='replace'):
            o=json.loads(line)
            if o.get("type")!="message": continue
            m=o["message"]; u=m.get("usage") or {}
            tin+=u.get("input",0); cr+=u.get("cacheRead",0); out+=u.get("output",0); rea+=u.get("reasoning",0)
            cost+=((u.get("cost") or {}).get("total") or 0)
            if m.get("role")=="assistant": turns+=1
            c=m.get("content")
            if isinstance(c,list): tools+=sum(1 for b in c if isinstance(b,dict) and b.get("type")=="toolCall")
    return dict(tin=tin,cr=cr,out=out,rea=rea,cost=cost,turns=turns,tools=tools)
rows=[]
for c in sys.argv[1:]:
    secs=sum(int(open(f"{c}/{s}/meta.txt").read().split("seconds=")[1]) for s in ["WDE-01","WDE-02","WDE-03","WDE-04","WDE-05"])
    d=stats(f"{c}/*/.session/*.jsonl"); d["cfg"]=c; d["secs"]=secs
    rows.append(d)
    print(f'{c:<15} ${d["cost"]:>6.2f} in={d["tin"]:>8,} cache={d["cr"]:>9,} out={d["out"]:>7,} think={d["rea"]:>7,} turns={d["turns"]:>4} tools={d["tools"]:>4} wall={secs:>5}s')
json.dump(rows,open("/home/basil/tmp/.local/stats-runs.json","w"),indent=1)
