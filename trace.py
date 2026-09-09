import json,glob,sys
def calls(p):
    out=[]
    for line in open(p,encoding="utf8",errors="replace"):
        o=json.loads(line)
        if o.get("type")!="message": continue
        c=o["message"].get("content")
        if isinstance(c,list):
            for b in c:
                if isinstance(b,dict) and b.get("type")=="toolCall":
                    out.append((b["name"], b.get("arguments") or {}))
    return out
cfgs=sys.argv[1].split(",") if len(sys.argv)>1 else ["base","wde","design-list","discovered"]
scs=sys.argv[2].split(",") if len(sys.argv)>2 else ["WDE-01","WDE-02","WDE-03","WDE-04","WDE-05"]
for c in cfgs:
    for s in scs:
        g=glob.glob(f"/home/basil/tmp/frontend/runs/{c}/{s}/.session/*.jsonl")
        if not g: continue
        cl=calls(g[0])
        print(f"===== {c}/{s} : {len(cl)} tool calls =====")
        for n,a in cl:
            if n=="read": print("  READ  ",a.get("path"))
            elif n=="bash": print("  BASH  ",(a.get("command") or "").replace("\n"," ")[:170])
            elif n in ("write","edit"): print(f"  {n.upper():6}",a.get("path"))
            else: print("  "+n, str(a)[:120])
