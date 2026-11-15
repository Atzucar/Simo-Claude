python3 - <<'P'
e=open('engine.js').read().replace("const W=900,H=400,PW=180","const W=900,H=560,PW=190")
v=open('v3d.js').read().replace("this.OH=this.mobile?Math.round(420*h/w):400","this.OH=560").replace("this.mobile=w<700;","this.mobile=false;")
v=v.replace("function buildScene(d){","function buildScene(d){\n  if(d.build){const s=d.build(d);if(!s.an)s.an=(d.parts||[]).map(p=>s.anMap[p[0]]||(()=>V3()));return s}",1)
open('b_engine.js','w').write(e+"\n"+v)
P
cat b_head.txt b_engine.js book_a.js book_b.js figs.js b_tail.txt > b_page.html
