# usage: mk.py CODE ; reads tools/verify/CODE/refute_ai/mine.json {num: "a" | "b,c" | ["a", "note"]}  optional "_flags": {num: "explanation/alt issue text"}
import json,sys
code=sys.argv[1]
mine=json.load(open(f'tools/verify/{code}/refute_ai/mine.json',encoding='utf8'))
flags=mine.pop('_flags',{})
d=json.load(open(f'tools/raw/{code}.json',encoding='utf8'))
items={};ag=dis=0
for q in d['questions']:
    if not(q.get('official') is False or q.get('answerSource')=='solved'): continue
    n=str(q['num']); m=mine.get(n)
    if m is None: print('MISSING',n); continue
    note=''
    if isinstance(m,list): m,note=m
    unc=m.startswith('?'); m=m.lstrip('?')
    ms=set(m.split(','))
    key=q['correctId']; acc=set(q.get('acceptedIds') or [key])
    v='unclear' if unc else ('agree' if key in ms else 'disagree')
    altmiss=sorted(ms-acc) if v=='agree' else []
    if v=='unclear': it0=note
    it={'mine':sorted(ms),'key':key,'acceptedIds':sorted(acc),'verdict':v}
    if v=='unclear': it['reason']=note
    if v=='disagree': it['firstDivergence']=note or 'my derivation gives a different option than the key'
    elif note: it['notes']=note
    if altmiss: it['altsIssue']=f'options {altmiss} also correct by my runs but not in acceptedIds'
    if n in flags: it['flag']=flags[n]
    items[n]=it
    if v=='agree': ag+=1
    elif v=='unclear': print('UNCLEAR',n,m,'key',key)
    else: dis+=1; print('DISAGREE',n,m,'key',key)
out={'code':code,'scope':'AI-keyed (official:false) mcq items','method':'own clang++ runs at c++11/14/17/20 (see tools/verify/%s/refute_ai/), derived before reading claims'%code,'agree':ag,'disagree':dis,'unclear':sum(1 for i in items.values() if i['verdict']=='unclear'),'items':items}
json.dump(out,open(f'tools/raw/_verify_ai_{code}.json','w',encoding='utf8'),ensure_ascii=False,indent=1)
print(code,'agree',ag,'disagree',dis,'flags',[ (k,v.get('altsIssue') or v.get('flag')) for k,v in items.items() if v.get('altsIssue') or v.get('flag')])
