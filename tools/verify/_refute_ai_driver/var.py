# usage: var.py CODE  (compiles tools/verify/CODE/refute_ai/var_*.cpp at 14/17/20 and runs)
import sys,glob,subprocess,os
CL=r'C:\Users\Adir\AppData\Local\Programs\Swift\Toolchains\6.1.0+Asserts\usr\bin\clang++'
code=sys.argv[1]
for p in sorted(glob.glob(f'tools/verify/{code}/refute_ai/var_*.cpp')):
    src=open(p,encoding='utf8').read()
    out=[]
    for s in ['c++11','c++14','c++17','c++20']:
        if s=='c++11' and '#include' in src: out.append('11=n/a'); continue
        exe=os.path.abspath(p[:-4]+'.exe')
        a=[CL,'-std='+s,'-w','-fms-extensions',p]+(['-o',exe] if 'int main' in src else ['-fsyntax-only'])
        c=subprocess.run(a,capture_output=True,text=True)
        if c.returncode:
            e=[l for l in c.stderr.splitlines() if 'error' in l][:1]
            out.append(s[-2:]+'=CE '+(e[0].split('error:')[-1][:70] if e else '?'))
        elif 'int main' in src:
            r=subprocess.run([exe],capture_output=True,text=True,timeout=5); out.append(s[-2:]+f'=OUT{r.stdout!r}')
            os.remove(exe)
        else: out.append(s[-2:]+'=OK')
    print(os.path.basename(p),' ; '.join(out))
