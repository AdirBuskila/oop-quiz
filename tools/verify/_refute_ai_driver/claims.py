import json,sys
code=sys.argv[1]
d=json.load(open(f'tools/raw/{code}.json',encoding='utf8'))
for q in d['questions']:
    if q.get('official') is False or q.get('answerSource')=='solved':
        e=q.get('explanation','').replace('\n',' ')
        e=e.split('_(')[0]
        print(f"Q{q['num']} key={q.get('correctId')} acc={q.get('acceptedIds')} conf={q.get('confidence')} note={q.get('note')}\n   EXPL: {e[:int(sys.argv[2]) if len(sys.argv)>2 else 350]}")
