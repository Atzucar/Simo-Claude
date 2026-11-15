# -*- coding: utf-8 -*-
import json,re
from topics import TOPICS
parts=json.load(open('figparts.json'))
B={'fbano':'fInstalacionBano','ftermo':'fTermo','ftub':'fTuberias','fdes':'fDesagues','fgab':'fGabinete','fpru':'fPrueba','csis':'cSistemas','csplit':'cSplit','cmulti':'cMulti','ccas':'cCassette','ccon':'cConductos','cfrig':'cFrigorifica','ccond':'cCondensados','cvent':'cVentilacion'}
def tag(s): return re.sub(r'<[^>]+>','',s)
def step(s):
    m=re.match(r'<b>(.*?)</b>[:\s]*(.*)',s)
    t,x=(m.group(1),m.group(2)) if m else (tag(s)[:30],tag(s))
    t=t.rstrip(':.')
    return [t,tag(x).strip().capitalize() if x else '']
out=[]
for t in TOPICS:
    f=dict(cap=t['cap'],t=t['titulo'],s=t['sub'],m=t['m'],d=dict(k='real',build=B[t['id']],nodes=[[n,''] for n in parts[t['id']]]),
           steps=[step(s) for s in t['pasos'][:5]],no=t['no'],si=t['si'],foto=t['foto'])
    if len(t['caps'])>1:f['caps']=t['caps']
    out.append(f)
js='''/* ===== Fichas nuevas: fontanería y climatización (detalle técnico) ===== */
(function(){
const OLD=['Fontanería: de la acometida al grifo','Aparatos sanitarios y grifería','Climatización: splits y aire por conductos','Gas, humos y ventilación forzada'];
for(let i=FICHAS.length-1;i>=0;i--)if(OLD.includes(FICHAS[i].t))FICHAS.splice(i,1);
const NEW=%s;
NEW.forEach(f=>FICHAS.push(f));
const idx=FICHAS.map((f,i)=>[f,i]).sort((a,b)=>(a[0].cap>b[0].cap?1:a[0].cap<b[0].cap?-1:a[1]-b[1]));
const sorted=idx.map(x=>x[0]);FICHAS.length=0;sorted.forEach(f=>FICHAS.push(f));
})();
'''%json.dumps(out,ensure_ascii=False)
open('data4.js','w',encoding='utf-8').write(js)
print(len(out),'fichas nuevas')
