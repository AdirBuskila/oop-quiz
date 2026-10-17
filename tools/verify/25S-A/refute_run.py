import json,re,subprocess,os,sys
BIN=r'C:\Users\Adir\AppData\Local\Programs\Swift\Toolchains\6.1.0+Asserts\usr\bin'
HERE=os.path.dirname(os.path.abspath(__file__))
d=json.load(open(os.path.join(HERE,'..','..','raw','_blind_25S-A.json'),encoding='utf8'))
def code(q):
    m=re.search(r'```cpp\n(.*?)```',q['question'],re.S); return m.group(1) if m else None
def comp(src,name,run=False):
    p=os.path.join(HERE,'refute_'+name+'.cpp')
    open(p,'w',encoding='utf8',newline='\n').write(src)
    exe=p[:-4]+'.exe'
    r=subprocess.run([BIN+r'\clang++.exe','-std=c++17','-fsyntax-only' if not run else '-o'+exe,p],capture_output=True,text=True)
    errs=sorted(set(int(x) for x in re.findall(r'cpp:(\d+):\d+: error',r.stderr)))
    out=None
    if run and r.returncode==0:
        out=subprocess.run([exe],capture_output=True,text=True).stdout
    return r.returncode,errs,out,r.stderr
for q in d['questions']:
    n=q['num']
    if n in(1,17): continue
    c=code(q)
    if '// line' in c or '//line' in c:
        rc,errs,_,_=comp(c,'q%02d_full'%n)
        print('Q%d full: rc=%d errlines=%s'%(n,rc,errs))
        lines=c.split('\n')
        idx=[i for i,l in enumerate(lines) if re.search(r'//\s*line\s*\d+',l)]
        bad=[]
        for k in idx:
            # keep only line k among marked lines
            L=[('' if (i in idx and i!=k) else l) for i,l in enumerate(lines)]
            rc,e,_,_=comp('\n'.join(L),'q%02d_l%d'%(n,idx.index(k)+1))
            print('  only line',idx.index(k)+1,'-> ','ERR' if rc else 'ok',e)
    else:
        rc,errs,out,err=comp(c,'q%02d'%n,True)
        print('Q%d rc=%d errlines=%s out=%r'%(n,rc,errs,out))
        if rc and n in(12,15,16): print(err[:1500])
