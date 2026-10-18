import json,glob,os,re,subprocess,sys
from concurrent.futures import ThreadPoolExecutor
CL=r'C:\Users\Adir\AppData\Local\Programs\Swift\Toolchains\6.1.0+Asserts\usr\bin\clang++'
STDS=['c++11','c++14','c++17','c++20']
def run(code,num,bi,src):
    base=f'tools/verify/{code}/refute_ai'
    os.makedirs(base,exist_ok=True)
    p=f'{base}/q{num}_{bi}.cpp'
    open(p,'w',encoding='utf8',newline='\n').write(src)
    res={}
    for s in STDS:
        exe=f'{base}/q{num}_{bi}_{s[-2:]}.exe'
        exe=os.path.abspath(exe)
        hasmain='int main' in src
        stl='#include <' in src and s=='c++11'
        if stl and not '<iostream>' in src.replace('<iostream>','') and False: pass
        args=[CL,'-std='+s,'-w','-fms-extensions',p]+(['-o',exe] if hasmain else ['-fsyntax-only'])
        c=subprocess.run(args,capture_output=True,text=True)
        if c.returncode and stl and 'include' in c.stderr and 'MSVC' in c.stderr:
            res[s]='n/a (MSVC STL needs >=14)'; continue
        if c.returncode:
            errs=[l for l in c.stderr.splitlines() if 'error' in l]
            sh=3 if src.startswith('#include <iostream>\n#include <vector>\nusing namespace std;\n') else 0
            ms=re.findall(r'q\d+_\d+\.cpp:(\d+):\d+: error: ([^\n]*)',c.stderr)
            res[s]='CE lines '+str(sorted({int(a)-sh for a,b in ms}))+': '+' | '.join(f'L{int(a)-sh} {b[:55]}' for a,b in ms[:6])
        elif not hasmain: res[s]='OK-compiles(no main)'
        else:
            try:
                r=subprocess.run([exe],capture_output=True,text=True,timeout=5)
                res[s]=f'OUT[{r.stdout!r}] rc={r.returncode}'+(' ERR:'+r.stderr[:60] if r.stderr else '')
            except Exception as e: res[s]='RUNFAIL '+str(e)[:40]
            try: os.remove(exe)
            except: pass
    return res
def main(code):
    d=json.load(open(f'tools/raw/{code}.json',encoding='utf8'))
    qs=[q for q in d['questions'] if q.get('official') is False or q.get('answerSource')=='solved']
    jobs=[]
    for q in qs:
        blocks=re.findall(r'```(?:cpp|text)\n(.*?)```',q['question'],re.S)
        for bi,b in enumerate(blocks):
            b=re.sub(r'(?m)^\s*\d+(?:\.|(?= ))\s?','',b)
            if ('cout' in b or 'vector' in b) and '#include <iostream>' not in b: b='#include <iostream>\n#include <vector>\nusing namespace std;\n'+b
            b=re.sub(r'\bvoid\s+main\b','int main',b)
            jobs.append((q['num'],bi,b))
    with ThreadPoolExecutor(8) as ex:
        rs=list(ex.map(lambda j:run(code,*j),jobs))
    out=[]
    for (n,bi,b),r in zip(jobs,rs):
        vals=set(r.values())
        out.append(f'Q{n}.{bi}: '+(('ALL: '+list(vals)[0]) if len(vals)==1 else ' ; '.join(f'{k[-2:]}={v}' for k,v in r.items())))
    open(f'tmp_oop_ai_refute/{code}.res','w',encoding='utf8').write('\n'.join(out))
    print('\n'.join(out))
main(sys.argv[1])
