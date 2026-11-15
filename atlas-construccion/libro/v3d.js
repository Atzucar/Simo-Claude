/* ===== Motor 3D (Three.js) ===== */
const TILE={conc:[7,7],grav:[8,8],wool:[5,5],earth:[8,8],brick:[4.8,1.4],block:[4.8,1.4],demo:[2.4,2.4],stripe:[3,3]};
const TEXC={};
function patTex(n){
  if(TEXC[n])return TEXC[n];
  const c=document.createElement('canvas');c.width=128;c.height=n==='brick'||n==='block'?64:128;
  const g=c.getContext('2d');let s=7;const r=()=>(s=(s*16807)%2147483647)/2147483647;
  if(n==='conc'){g.fillStyle='#BDBDB6';g.fillRect(0,0,128,128);for(let i=0;i<110;i++){g.fillStyle=r()>.5?'#8E8E87':'#D2D2CB';g.beginPath();g.arc(r()*128,r()*128,1+r()*2.2,0,7);g.fill()}}
  else if(n==='grav'){g.fillStyle='#A9A9A4';g.fillRect(0,0,128,128);for(let i=0;i<46;i++){g.fillStyle=['#8A8A85','#C9C9C4','#7F7F7A','#B5B5B0'][i%4];g.beginPath();g.arc(r()*128,r()*128,5+r()*7,0,7);g.fill()}}
  else if(n==='earth'){g.fillStyle='#8B6B4A';g.fillRect(0,0,128,128);for(let i=0;i<90;i++){g.fillStyle=r()>.5?'#6E5336':'#A68764';g.beginPath();g.arc(r()*128,r()*128,2+r()*3,0,7);g.fill()}}
  else if(n==='wool'){g.fillStyle='#F2D275';g.fillRect(0,0,128,128);g.strokeStyle='#C99F2E';g.lineWidth=3;for(let y=10;y<128;y+=22){g.beginPath();g.moveTo(0,y);for(let x=0;x<=128;x+=32)g.quadraticCurveTo(x+8,y-14,x+16,y),g.quadraticCurveTo(x+24,y+14,x+32,y);g.stroke()}}
  else if(n==='brick'||n==='block'){g.fillStyle=n==='brick'?'#C4623A':'#A8AAA6';g.fillRect(0,0,128,64);
    g.fillStyle=n==='brick'?'#E9E3D5':'#DAD8D0';g.fillRect(0,0,128,4);g.fillRect(0,32,128,4);g.fillRect(0,0,4,32);g.fillRect(64,0,4,32);g.fillRect(32,32,4,32);g.fillRect(96,32,4,32);
    for(let i=0;i<60;i++){g.fillStyle='rgba(0,0,0,.07)';g.fillRect(r()*128,r()*64,3+r()*8,2)}}
  else if(n==='demo'){g.clearRect(0,0,128,128);g.strokeStyle='rgba(211,47,47,.8)';g.lineWidth=9;for(let k=-128;k<256;k+=32){g.beginPath();g.moveTo(k,128);g.lineTo(k+128,0);g.stroke()}}
  else if(n==='stripe'){for(let i=0;i<8;i++){g.fillStyle=i%2?'#FFFFFF':'#F26A1B';g.fillRect(i*16,0,16,128)}}
  const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;if(THREE.sRGBEncoding)t.encoding=THREE.sRGBEncoding;TEXC[n]=t;return t;
}
const V3=(x=0,y=0,z=0)=>new THREE.Vector3(x,y,z);
function mat(fill,fw,fh,o){
  let m;
  if(fill.p){const t=patTex(fill.p).clone();t.needsUpdate=true;const T=TILE[fill.p];t.repeat.set(Math.max(.2,fw/T[0]),Math.max(.2,fh/T[1]));m=new THREE.MeshLambertMaterial({map:t})}
  else m=new THREE.MeshLambertMaterial({color:new THREE.Color(fill.c)});
  if(o.op!=null||fill.p==='demo'){m.transparent=true;m.opacity=o.op==null?1:o.op;m.depthWrite=false}
  return m;
}
function box(w,h,d,fill,x=0,y=0,z=0,o={}){
  if(typeof fill==='string')fill=pickFill(fill);
  const geo=new THREE.BoxGeometry(w,h,d),dims=[[d,h],[d,h],[w,d],[w,d],[w,h],[w,h]];
  const m=new THREE.Mesh(geo,dims.map(a=>mat(fill,a[0],a[1],o)));m.position.set(x,y,z);
  if(!o.noedge){m.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo),new THREE.LineBasicMaterial({color:o.ec||0x26324D,transparent:true,opacity:o.eo||.55})))}
  return m;
}
function dashed(w,h,d,x,y,z,col){
  const l=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(w,h,d)),new THREE.LineDashedMaterial({color:col||0xF26A1B,dashSize:.35,gapSize:.22,depthTest:false}));
  l.computeLineDistances();l.position.set(x,y,z);l.renderOrder=5;return l;
}
function cyl(r,h,col,x,y,z,rot){
  const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,14),new THREE.MeshLambertMaterial({color:col}));m.position.set(x,y,z);if(rot)m.rotation.set(rot[0],rot[1],rot[2]);return m;
}
function wallHole(W,H,T,h,fill,o){
  const g=new THREE.Group(),add=(x0,x1,y0,y1)=>{if(x1-x0>.01&&y1-y0>.01)g.add(box(x1-x0,y1-y0,T,fill,(x0+x1)/2,(y0+y1)/2,0,o||{eo:.3}))};
  add(-W/2,h.x0,-H/2,H/2);add(h.x1,W/2,-H/2,H/2);add(h.x0,h.x1,h.y1,H/2);add(h.x0,h.x1,-H/2,h.y0);return g;
}
const AL='#AEB8C6',WOOD='#B98A5A',PLASTER='#DAD6CC',STEEL='#9AA7B8',STEEL2='#8FA0B6';

/* ---- escenas ---- */
function sLayersH(d){
  const g=new THREE.Group(),L=d.layers,n=L.length,W=8.4,D=5.2,TH=4.8,sum=L.reduce((s,a)=>s+(a[2]||1),0);
  const hs=L.map(a=>Math.max(.5,(a[2]||1)/sum*TH));let y=0;const pos=[];
  for(let i=n-1;i>=0;i--){pos[i]=y+hs[i]/2;y+=hs[i]}
  const ex=[],an=[];
  L.forEach((a,i)=>{
    const m=box(W,hs[i],D,pickFill(a[3]||'#DDD'),0,pos[i],0);
    if(a[4])m.add(box(W*1.012,hs[i]*1.02,D*1.012,{p:'demo'},0,0,0,{op:.55,ec:0xD32F2F,eo:1}));
    g.add(m);ex.push({o:m,dir:V3(0,(n-1-i)*1.05,0)});
    const sx=i%2===0?.3:-.3;an.push(()=>V3(m.position.x+W*sx,m.position.y,D/2));
  });
  if(d.perim)[-1,1].forEach(s=>g.add(box(.3,y,D,{c:'#F2D275'},s*(W/2+.2),y/2,0)));
  return{g,an,ex,ex0:1};
}
function sLayersV(d){
  const g=new THREE.Group(),L=d.layers,n=L.length,TW=9.5,H=4.6,D=3.6,sum=L.reduce((s,a)=>s+(a[2]||1),0);
  const ws=L.map(a=>Math.max(1.5,(a[2]||1)/sum*TW)),tot=ws.reduce((a,b)=>a+b,0);let x=-tot/2;const ex=[],an=[];
  L.forEach((a,i)=>{
    const cx=x+ws[i]/2;x+=ws[i];
    const m=box(ws[i],H,D,pickFill(a[3]||'#DDD'),cx,H/2,0);
    if(a[4])m.add(box(ws[i]*1.01,H*1.01,D*1.01,{p:'demo'},0,0,0,{op:.7,ec:0xD32F2F,eo:1}));
    g.add(m);ex.push({o:m,dir:V3((i-(n-1)/2)*.8,0,0)});
    an.push(()=>V3(m.position.x,m.position.y+((i%3)-1)*.7,D/2));
  });
  return{g,an,ex,ex0:1};
}
function panels(g,x0,x1,seams,y0,y1,z,t,col,hole,demo,reg){
  const xs=[x0,...seams.filter(s=>s>x0&&s<x1),x1];
  for(let i=0;i<xs.length-1;i++){
    const a=xs[i]+.04,b=xs[i+1]-.04,pcs=[];
    if(hole&&b>hole.x0&&a<hole.x1){pcs.push([a,Math.min(b,hole.x0),y0,y1]);pcs.push([Math.max(a,hole.x1),b,y0,y1]);pcs.push([Math.max(a,hole.x0),Math.min(b,hole.x1),hole.y1,y1])}
    else pcs.push([a,b,y0,y1]);
    pcs.forEach(p=>{if(p[1]-p[0]>.05&&p[3]-p[2]>.05){const m=box(p[1]-p[0],p[3]-p[2],t,col,(p[0]+p[1])/2,(p[2]+p[3])/2,z);
      if(demo)m.add(box((p[1]-p[0])*1.01,(p[3]-p[2])*1.01,t*1.4,{p:'demo'},0,0,0,{op:.7,ec:0xD32F2F,eo:1}));g.add(m);reg.push(m)}});
  }
}
function sStud(d){
  const g=new THREE.Group(),sp=6,bays=6,Wd=sp*bays,Ht=24,x0=-Wd/2,y0=-Ht/2+.5,y1=Ht/2-.5,ex=[],an={};
  g.add(box(Wd+5,1.2,6,'conc',0,-Ht/2-.6,0));g.add(box(Wd+5,1.2,6,'conc',0,Ht/2+.6,0));
  g.add(box(Wd,.6,2.6,STEEL2,0,-Ht/2+.3,0));g.add(box(Wd,.6,2.6,STEEL2,0,Ht/2-.3,0));
  const door=!!d.door,holeX0=x0+24.4,holeX1=x0+30.6,holeY1=-Ht/2+.6+17;
  const hole=door?{x0:holeX0,x1:holeX1,y1:holeY1}:null;
  const stX=[];for(let i=0;i<=bays;i++){const x=x0+i*sp;if(door&&(i===5))continue;stX.push(x)}
  if(door)stX.push(x0+31);
  stX.sort((a,b)=>a-b);
  stX.forEach(x=>{const inHole=door&&x>holeX0-.8&&x<holeX1+.8;const isJ=door&&(Math.abs(x-(x0+24))<.1||Math.abs(x-(x0+31))<.1);
    if(!door||!(x>holeX0&&x<holeX1))g.add(box(.7,Ht-1.2,2.1,STEEL,x,0,0));
    if(isJ)g.add(box(.7,Ht-1.2,2.1,STEEL,x+(x<x0+25?.8:-.8),0,0))});
  if(door){g.add(box(7.6,.8,2.1,STEEL2,(holeX0+holeX1)/2,holeY1+.4,0));g.add(box(.7,Ht-1.2-17.4,2.1,STEEL,x0+27.5,(holeY1+.8+y1)/2,0));
    const cer=dashed(6.2,17,1.2,(holeX0+holeX1)/2,-Ht/2+.6+8.5,0,0xB98A5A);g.add(cer);an.cerco=()=>V3((holeX0+holeX1)/2,-Ht/2+9,.75)}
  const wool=[];
  if(d.wool!==false)for(let i=0;i<3;i++){const m=box(sp-.9,Ht-1.2,1.7,'wool',x0+i*sp+sp/2,0,0,{eo:.2});g.add(m)}
  const pl='#E7E9EC',xp0=x0+3*sp,xp1=x0+Wd;
  const front=[],outer=[],back=[];
  panels(g,xp0,xp1,[xp0+12],y0,y1,1.45,.5,pl,hole,d.demo,front);
  if(d.doble)panels(g,xp0+4,xp1,[xp0+10],y0,y1,1.95,.5,'#DCDFE4',hole,false,outer);
  panels(g,xp0,xp1,[xp0+6],y0,y1,-1.45,.5,pl,hole,false,back);
  front.forEach(m=>ex.push({o:m,dir:V3(0,0,.9)}));outer.forEach(m=>ex.push({o:m,dir:V3(0,0,1.8)}));back.forEach(m=>ex.push({o:m,dir:V3(0,0,-.9)}));
  // tornillos
  const sg=new THREE.SphereGeometry(.17,8,6),sm=new THREE.MeshLambertMaterial({color:0x4A5568});
  const scX=door?[xp0,x0+24,x0+31,xp1]:[xp0,x0+4*sp,x0+5*sp,xp1];
  scX.forEach(x=>{if(d.doble&&x<xp0+4.2)return;const zz=d.doble?2.22:1.72;for(let y=y0+1.2;y<y1-.5;y+=2.5){if(door&&x>holeX0-.2&&x<holeX1+.2&&y<holeY1+.5)continue;const s=new THREE.Mesh(sg,sm);s.position.set(x,y,zz);g.add(s)}});
  // cota 60 cm
  const ya=7,za=1.4;g.add(box(sp-.8,.12,.12,{c:'#F26A1B'},x0+sp*1.5,ya,za,{noedge:true}));
  [x0+sp+.1,x0+2*sp-.1].forEach((x,i)=>{const c=new THREE.Mesh(new THREE.ConeGeometry(.35,.8,10),new THREE.MeshLambertMaterial({color:0xF26A1B}));c.rotation.z=i?-Math.PI/2:Math.PI/2;c.position.set(x,ya,za);g.add(c)});
  const xc=(a,b)=>(a+b)/2;
  Object.assign(an,{canalInf:()=>V3(x0+sp*1.5,-Ht/2+.3,1.35),canalSup:()=>V3(x0+sp*1.5,Ht/2-.3,1.35),montante:()=>V3(x0+sp,-1,1.06),dim:()=>V3(x0+sp*1.5,ya,za),
    lana:()=>V3(x0+sp*.5,-4,.86),placa:()=>V3(door?x0+20.5:x0+30,-3,front[0]?front[0].position.z+front[0].position.z*0+.28:1.75),tornillo:()=>V3(door?x0+24:x0+4*sp,2.5,(d.doble?2.22:1.72)),
    junta:()=>V3(xp0+12,6,1.75),doble:()=>V3(xp0+10,8.5,2.22),jamba:()=>V3(x0+24.8,-5,1.1),dintel:()=>V3(xc(holeX0,holeX1),holeY1+.4,1.1),banda:()=>V3(x0+sp*1.5,-Ht/2+.7,1.3),estructura:()=>V3(x0-2.5,0,2)});
  if(!an.cerco)an.cerco=an.jamba;
  return{g,anMap:an,ex,ex0:0};
}
function sBrick(d){
  const g=new THREE.Group(),W=24,H=15,T=2.4,ex=[];
  const wall=wallHole(W,H,T,{x0:-3,x1:3,y0:-H/2,y1:3},{p:d.bloque?'block':'brick'});wall.position.y=-.5;g.add(wall);
  g.add(box(30,1.4,4.2,'conc',0,8.7,0));g.add(box(30,1.4,4.2,'conc',0,-8.7,0));
  g.add(box(2.6,17.4,3.6,'conc',-13.3,0,0));g.add(box(2.6,17.4,3.6,'conc',13.3,0,0));
  g.add(box(24,1,T,'wool',0,7.5+.5+.0-.5+.0,0,{eo:.3}));
  g.add(box(10,1.2,T+.7,STEEL,0,2.5+.6,0));
  if(d.demo)g.add(box(W,H,T+.1,{p:'demo'},0,-.5,0,{op:.6,ec:0xD32F2F,eo:1}));
  const an={pilar:()=>V3(-13.3,-3,1.8),anclaje:()=>V3(-12,-1,T/2),mortero:()=>V3(-8,-4.8,T/2),hilada:()=>V3(8,3,T/2),cargadero:()=>V3(0,3.1,T/2+.35),juntaSup:()=>V3(8,7.5,T/2),replanteo:()=>V3(-8,-7.9,T/2),hueco:()=>V3(0,-3,0),forjado:()=>V3(4,9.4,2.1),pegado:()=>V3(8,-4,T/2)};
  return{g,anMap:an,ex,ex0:0};
}
function sOpening(d){
  const k=d.kind,g=new THREE.Group(),W=k==='cassette'?20:(k==='window'?18:13),H=k==='window'?13:14,T=1.6,ex=[],an={};
  g.add(box(W+4,1.2,5,'conc',0,-H/2-.6,0));g.add(box(W+4,1.2,5,'conc',0,H/2+.6,0));
  if(k==='window'){
    const h={x0:-4.6,x1:4.6,y0:-2,y1:4.5};
    g.add(wallHole(W,H,T,h,PLASTER));
    const fw=.55,mid=(h.y0+h.y1)/2;
    g.add(box(fw,h.y1-h.y0,1.2,AL,h.x0+fw/2,mid,.1));g.add(box(fw,h.y1-h.y0,1.2,AL,h.x1-fw/2,mid,.1));
    g.add(box(h.x1-h.x0,fw,1.2,AL,0,h.y1-fw/2,.1));g.add(box(h.x1-h.x0,fw,1.2,AL,0,h.y0+fw/2,.1));g.add(box(.4,h.y1-h.y0-1.1,1,AL,0,mid,.1));
    g.add(box(h.x1-h.x0-1.1,h.y1-h.y0-1.1,.16,{c:'#8EC5EC'},0,mid,.1,{op:.5,eo:.25}));
    g.add(box(10.6,.45,2.6,'#7F8AA0',0,h.y0-.22,.55));
    g.add(box(11.8,1.3,T+.5,'conc',0,h.y1+.65,0));
    [[0,h.y1+.05,10.2,.18],[0,h.y0+.05,10.2,.18]].forEach(a=>g.add(box(a[2],a[3],.2,'#26324D',a[0],a[1],T/2+.1,{noedge:true})));
    [h.x0-.05,h.x1+.05].forEach(x=>g.add(box(.18,h.y1-h.y0,.2,'#26324D',x,mid,T/2+.1,{noedge:true})));
    g.add(dashed(9.6,6.9,T*.8,0,mid,-.2));
    if(d.reja){for(let x=-4;x<=4;x+=.9)g.add(cyl(.1,6.9,0x2F3B52,x,mid,1.25));[mid-1.8,mid+1.8].forEach(y=>g.add(box(9.4,.22,.22,'#2F3B52',0,y,1.25,{noedge:true})))}
    let toldoY=h.y1+3;
    if(d.toldo){const t=new THREE.Mesh(new THREE.BoxGeometry(11.6,.16,3.8),[0,1,2,3,4,5].map(()=>{const m=new THREE.MeshLambertMaterial({map:patTex('stripe').clone()});m.map.needsUpdate=true;m.map.repeat.set(1.6,1);return m}));
      t.position.set(0,toldoY,T/2+1.5);t.rotation.x=.42;g.add(t);g.add(box(11.6,.5,.12,'#F26A1B',0,toldoY-1.6,T/2+3.2,{noedge:true}));
      an.toldo=()=>V3(3,toldoY,T/2+2.2)}
    Object.assign(an,{dintel:()=>V3(-4,h.y1+.65,T/2+.3),premarco:()=>V3(h.x0,.5,0),marco:()=>V3(h.x0+.27,.5,.72),vidrio:()=>V3(-2.3,1.8,.2),hoja:()=>V3(2.4,1.8,.2),vierteaguas:()=>V3(3,h.y0-.22,1.9),sellado:()=>V3(h.x1+.05,h.y1-.6,T/2+.12),reja:()=>V3(2,.2,1.4),pelo:()=>V3(0,0,0)});
  }else if(k==='door'||k==='doorMetal'){
    const h={x0:-2.9,x1:2.9,y0:-H/2,y1:3};
    g.add(wallHole(W,H,T,h,PLASTER));
    g.add(box(.5,10.5,T+.3,'#EDEDE8',h.x0+.25,-2.25,0));g.add(box(.5,10.5,T+.3,'#EDEDE8',h.x1-.25,-2.25,0));g.add(box(5.8,.5,T+.3,'#EDEDE8',0,h.y1-.25,0));
    const lc=k==='doorMetal'?'#8D9BAE':WOOD;
    g.add(box(4.6,10,.5,lc,0,-2.4,0));
    [[-4.4],[-1.2]].forEach(a=>g.add(box(3.4,3.5,.08,k==='doorMetal'?'#7B8899':'#9C7347',0,a[0]+.3-.2,.28,{eo:.3})));
    g.children[g.children.length-1].position.y=-5.4;g.children[g.children.length-2].position.y=0.4;
    [-5.8,-2.6,.6].forEach(y=>g.add(cyl(.15,.6,0x5A6475,-2.4,y,.33)));
    g.add(box(.9,.16,.3,'#C9CED8',1.8,-3.6,.45,{noedge:true}));g.add(cyl(.2,.3,0xC9CED8,1.8,-3.6,.32,[Math.PI/2,0,0]));
    [-7.5,7.5].forEach(x=>g.add(box(8,.8,.3,'#EFEFE9',x,-H/2+.4,T/2+.15)));
    g.add(dashed(6.6,10.9,T*.7,0,-2,-.1));
    Object.assign(an,{precerco:()=>V3(h.x0-.2,2,T/2),dintel:()=>V3(-4,h.y1+1.4,T/2),cerco:()=>V3(h.x1-.25,0,T/2+.2),tapajuntas:()=>V3(h.x0+.25,1.5,T/2+.2),bisagras:()=>V3(-2.4,-2.6,.4),hoja:()=>V3(0,-.2,.28),manilla:()=>V3(1.8,-3.6,.5),holgura:()=>V3(0,-H/2+.2,.3),cerradura:()=>V3(1.8,-3.1,.45),rodapie:()=>V3(-7.5,-H/2+.5,T/2+.3)});
  }else if(k==='cassette'){
    const h={x0:-8,x1:-2.4,y0:-H/2,y1:3};
    g.add(wallHole(W,H,T,h,PLASTER));
    g.add(box(.5,10.5,T,STEEL2,h.x0+.25,-2.25,0));
    g.add(box(6.6,10.4,T+.1,{c:'#CBD0D9'},.8,-2.25,0,{op:.28,eo:.8}));g.add(dashed(6.6,10.4,T+.3,.8,-2.25,0,0x5B6475));
    g.add(box(5.2,10,.5,WOOD,-.2,-2.4,0));g.add(box(.35,.35,.35,'#8E7048',-2.7,-2.4,0));
    g.add(box(14.6,.45,.9,'#7F8AA0',-1.5,h.y1+.25,0));
    g.add(box(.3,2.2,.4,'#C9CED8',-2.3,-2.4,.4,{noedge:true}));
    Object.assign(an,{guia:()=>V3(3,h.y1+.25,.5),cassette:()=>V3(2.4,-4,.7),hoja:()=>V3(-1.2,-1.4,.3),jamba:()=>V3(h.x0+.25,-1,T/2),cierre:()=>V3(3.2,2.4,.9),tirador:()=>V3(-2.3,-2.4,.55),dintel:()=>V3(-6,h.y1+1.8,T/2),suelo:()=>V3(3,-H/2,.4)});
  }else if(k==='glass'){
    const h={x0:-2.9,x1:2.9,y0:-H/2,y1:3};
    g.add(wallHole(W,H,T,h,PLASTER));
    g.add(box(5.2,10,.3,{c:'#8EC5EC'},0,-2.2,0,{op:.5,eo:.5}));
    const dk='#2F3B52';g.add(box(5.2,.35,.5,dk,0,2.65,0));g.add(box(5.2,.35,.5,dk,0,-7.2,0));g.add(box(.35,9.9,.5,dk,-2.5,-2.2,0));g.add(box(.35,9.9,.5,dk,2.5,-2.2,0));
    g.add(cyl(.17,3.4,0xC9CED8,2.1,-3,.45));g.add(cyl(.2,.2,0xC9CED8,-2.5,2.6,.3,[Math.PI/2,0,0]));g.add(cyl(.2,.2,0xC9CED8,-2.5,-7.1,.3,[Math.PI/2,0,0]));
    Object.assign(an,{vidrio:()=>V3(0,-1.5,.2),perfil:()=>V3(0,2.65,.3),bisagras:()=>V3(-2.5,2.6,.35),tirador:()=>V3(2.1,-3,.55),suelo:()=>V3(0,-7.3,.3),cerradura:()=>V3(2.1,-4.5,.55),hoja:()=>V3(-1,-4.5,.2),sello:()=>V3(2.5,-6,.3)});
  }
  return{g,anMap:an,ex,ex0:0};
}
function sFlow(d){
  const g=new THREE.Group(),N=d.nodes,k=N.length,bw=3.6,bd=3.4,gx=.7,gz=.8,per=k<=4?k:3,rows=Math.ceil(k/per),an=[];
  const tw=per*bw+(per-1)*gx,td=rows*bd+(rows-1)*gz;
  g.add(box(tw+2,.5,td+2,{c:'#CBD3E0'},0,-.25,0,{eo:.3}));
  N.forEach((n,i)=>{
    const r=Math.floor(i/per),c=i%per,h=1.3+i*.6,x=-tw/2+bw/2+c*(bw+gx),z=td/2-bd/2-r*(bd+gz),warn=!!n[2];
    g.add(box(bw,h,bd,{c:warn?'#F3B4B4':'#FFFFFF'},x,h/2,z));
    const cv=document.createElement('canvas');cv.width=288;cv.height=256;const cx=cv.getContext('2d');
    cx.fillStyle=warn?'#D32F2F':'#F26A1B';cx.fillRect(0,0,288,256);cx.fillStyle='rgba(255,255,255,.22)';cx.fillRect(0,0,288,6);
    cx.fillStyle='#fff';cx.font='800 92px Barlow Condensed, Arial Narrow, Arial';cx.textAlign='center';cx.fillText(String(i+1),144,92);
    cx.font='800 38px Barlow Condensed, Arial Narrow, Arial';const ws=wrap(n[0].toUpperCase(),13);ws.slice(0,3).forEach((t,j)=>cx.fillText(t,144,150+j*40));
    const tp=new THREE.Mesh(new THREE.PlaneGeometry(bw-.5,bd-.5),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(cv)}));tp.rotation.x=-Math.PI/2;tp.position.set(x,h+.04,z);g.add(tp);
    an.push(()=>V3(x,h+.15,z));
  });
  return{g,an,ex:[],ex0:0,pitch:.5};
}
function buildScene(d){
  const s={layersH:sLayersH,layersV:sLayersV,stud:sStud,brick:sBrick,opening:sOpening,flow:sFlow}[d.k](d);
  if(!s.an){const keys=(d.parts||[]).map(p=>p[0]);s.an=keys.map(k=>s.anMap[k]||(()=>V3()))}
  return s;
}
function labelsOf(d){
  if(d.k==='flow')return d.nodes.map(n=>({t:n[0],s:n[1]||''}));
  if(d.layers)return d.layers.map(a=>({t:(a[5]||a[0])+(a[1]&&a[1].length<12&&!/conserva/i.test(a[1])?' · '+a[1]:''),s:''}));
  return d.parts.map(p=>({t:p[1],s:'',side:p[2]}));
}
function drawBlock(f,i){
  const L=labelsOf(f.d),fl=f.d.k==='flow';
  return `<div class="draw"><div class="v3d" id="v${i}" tabindex="0" role="group" aria-label="Modelo 3D: ${esc(f.t)}. Arrastra para girar.">
    <div class="fb">${DRAW[f.d.k](f.d)}</div><canvas hidden></canvas><svg class="ov" hidden></svg>
    <div class="ctl" hidden><button type="button" data-a="spin" aria-pressed="true">Girar</button>${f.d.k==='layersH'||f.d.k==='layersV'||f.d.k==='stud'?'<button type="button" data-a="ex" aria-pressed="false">Despiece</button>':''}<button type="button" data-a="reset">Vista inicial</button></div>
    <div class="hint" hidden>Arrastra para girar</div></div>
    <ol class="leg${fl?' keep':''}">${L.map((l,j)=>`<li><b>${j+1}</b><span><strong>${esc(l.t)}</strong>${l.s?' · '+esc(l.s):''}</span></li>`).join('')}</ol></div>`;
}
class View3D{
  constructor(el,f){this.el=el;this.f=f;this.on=false;this.yaw=-.55;this.pitch=.3;this.spin=!matchMedia('(prefers-reduced-motion: reduce)').matches;this.ex=0;this.exT=0;this.t0=0}
  mount(){
    if(this.on||!window.THREE)return;
    const el=this.el;this.canvas=el.querySelector('canvas');this.ov=el.querySelector('.ov');
    try{this.r=new THREE.WebGLRenderer({canvas:this.canvas,alpha:true,antialias:true});}catch(e){this.failed=true;return}
    this.on=true;this.r.setPixelRatio(Math.min(devicePixelRatio||1,2));this.r.setClearColor(0,0);
    this.scene=new THREE.Scene();this.cam=new THREE.PerspectiveCamera(28,2.2,1,8000);
    this.scene.add(new THREE.AmbientLight(0xffffff,.6));this.scene.add(this.cam);
    const dl=new THREE.DirectionalLight(0xffffff,.5);dl.position.set(6,10,14);this.cam.add(dl);this.cam.add(dl.target);dl.target.position.set(0,0,-10);
    const dl2=new THREE.DirectionalLight(0xffffff,.15);dl2.position.set(-10,-2,6);this.cam.add(dl2);this.cam.add(dl2.target);dl2.target.position.set(0,0,-10);
    this.pivot=new THREE.Group();this.scene.add(this.pivot);
    const s=buildScene(this.f.d);this.s=s;this.content=s.g;this.pivot.add(s.g);
    s.g.updateMatrixWorld(true);const bb=new THREE.Box3().setFromObject(s.g);
    if(s.ex.length){s.ex.forEach(e=>{e.b=e.o.position.clone();e.o.position.copy(e.b).add(e.dir)});s.g.updateMatrixWorld(true);bb.union(new THREE.Box3().setFromObject(s.g));s.ex.forEach(e=>e.o.position.copy(e.b))}
    this.bb=bb;const c=bb.getCenter(new THREE.Vector3());s.g.position.sub(c);
    const sz=bb.getSize(new THREE.Vector3());this.sz=sz;
    // sombra de contacto
    const cv=document.createElement('canvas');cv.width=cv.height=128;const cx=cv.getContext('2d'),gr=cx.createRadialGradient(64,64,6,64,64,64);gr.addColorStop(0,'rgba(10,20,40,.35)');gr.addColorStop(1,'rgba(10,20,40,0)');cx.fillStyle=gr;cx.fillRect(0,0,128,128);
    const sh=new THREE.Mesh(new THREE.PlaneGeometry(sz.x*1.5,sz.z*1.8),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(cv),transparent:true,depthWrite:false}));
    sh.rotation.x=-Math.PI/2;sh.position.y=-sz.y/2-.05;this.pivot.add(sh);
    if(s.pitch){this.pitch=s.pitch;this.pitch0=s.pitch}this.ex0=s.ex0||0;this.ex=this.ex0;this.exT=this.ex0;
    if(this.ex0)this.el.querySelector('[data-a="ex"]')?.setAttribute('aria-pressed','true');
    this.bind();this.resize();
    el.querySelector('.fb').hidden=true;this.canvas.hidden=false;this.ov.hidden=false;el.querySelector('.ctl').hidden=false;el.querySelector('.hint').hidden=false;
    this.raf=requestAnimationFrame(t=>this.loop(t));
  }
  unmount(){
    if(!this.on)return;cancelAnimationFrame(this.raf);this.on=false;
    try{this.pivot.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material)(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>{if(m.map)m.map.dispose();m.dispose()})});this.r.dispose();this.r.forceContextLoss()}catch(e){}
    this.el.querySelector('.fb').hidden=false;const nc=this.canvas.cloneNode(false);nc.hidden=true;this.canvas.replaceWith(nc);this.canvas=nc;this.ov.hidden=true;this.el.querySelector('.ctl').hidden=true;this.el.querySelector('.hint').hidden=true;
    if(this.ro)this.ro.disconnect();this.unbind&&this.unbind();
  }
  bind(){
    const el=this.el;let down=null;
    const pd=e=>{if(e.target.closest('.ctl'))return;down={x:e.clientX,y:e.clientY,yaw:this.yaw,pitch:this.pitch,id:e.pointerId};this.spin=false;this.syncSpin();try{el.setPointerCapture(e.pointerId)}catch(_){}el.classList.add('drag')};
    const pm=e=>{if(!down)return;this.yaw=Math.max(-1.35,Math.min(1.35,down.yaw+(e.clientX-down.x)*.008));if(e.pointerType==='mouse')this.pitch=Math.max(.02,Math.min(.95,down.pitch+(e.clientY-down.y)*.006))};
    const pu=()=>{down=null;el.classList.remove('drag')};
    const kd=e=>{const k=e.key;if(k==='ArrowLeft')this.yaw=Math.max(-1.35,this.yaw-.1);else if(k==='ArrowRight')this.yaw=Math.min(1.35,this.yaw+.1);else if(k==='ArrowUp')this.pitch=Math.min(.95,this.pitch+.05);else if(k==='ArrowDown')this.pitch=Math.max(.02,this.pitch-.05);else return;this.spin=false;this.syncSpin();e.preventDefault()};
    const cl=e=>{const b=e.target.closest('button');if(!b)return;const a=b.dataset.a;
      if(a==='spin'){this.spin=!this.spin;this.syncSpin()}
      else if(a==='ex'){this.exT=this.exT>.5?0:1;b.setAttribute('aria-pressed',String(this.exT>.5))}
      else if(a==='reset'){this.yaw=-.55;this.pitch=this.pitch0||.3;this.exT=this.ex0;this.spin=true;this.syncSpin();const x=el.querySelector('[data-a="ex"]');if(x)x.setAttribute('aria-pressed',String(!!this.ex0))}};
    el.addEventListener('pointerdown',pd);el.addEventListener('pointermove',pm);el.addEventListener('pointerup',pu);el.addEventListener('pointercancel',pu);el.addEventListener('keydown',kd);el.addEventListener('click',cl);
    this.unbind=()=>{el.removeEventListener('pointerdown',pd);el.removeEventListener('pointermove',pm);el.removeEventListener('pointerup',pu);el.removeEventListener('pointercancel',pu);el.removeEventListener('keydown',kd);el.removeEventListener('click',cl)};
    this.ro=new ResizeObserver(()=>this.resize());this.ro.observe(el);
  }
  syncSpin(){const b=this.el.querySelector('[data-a="spin"]');if(b)b.setAttribute('aria-pressed',String(this.spin))}
  resize(){
    const w=this.el.clientWidth,h=this.el.clientHeight;if(!w||!h)return;
    this.mobile=w<700;this.r.setSize(w,h,false);this.cam.aspect=w/h;
    this.cam.updateProjectionMatrix();this.fit(this.mobile?.9:.56,.86);
    this.OW=this.mobile?420:900;this.OH=this.mobile?Math.round(420*h/w):400;this.ov.setAttribute('viewBox',`0 0 ${this.OW} ${this.OH}`);
  }
  fit(fx,fy){
    const h=this.sz.clone().multiplyScalar(.5),cs=[];
    for(const a of[-1,1])for(const b of[-1,1])for(const c of[-1,1])cs.push(V3(a*h.x,b*h.y,c*h.z));
    const tmp=new THREE.Object3D(),cam=this.cam;
    const ok=d=>{cam.position.set(0,0,d);cam.updateMatrixWorld(true);
      for(const yaw of(this.static?[this.yaw]:[-1.05,-.55,-.05])){tmp.rotation.set(this.pitch,yaw,0,'XYZ');tmp.updateMatrixWorld(true);
        for(const c of cs){const v=c.clone().applyMatrix4(tmp.matrixWorld).project(cam);if(Math.abs(v.x)>fx||Math.abs(v.y)>fy)return false}}return true};
    let lo=2,hi=5000;for(let i=0;i<34;i++){const m=(lo+hi)/2;if(ok(m))hi=m;else lo=m}
    cam.position.set(0,0,hi);cam.updateMatrixWorld(true);
  }
  loop(t){
    if(!this.on)return;this.raf=requestAnimationFrame(t=>this.loop(t));
    if(!this.t0)this.t0=t;
    const yaw=this.spin?-.55+Math.sin((t-this.t0)/2400)*.5:this.yaw;if(this.spin)this.yaw=yaw;
    this.pivot.rotation.set(this.pitch,this.yaw,0,'XYZ');
    this.ex+=(this.exT-this.ex)*.12;if(Math.abs(this.exT-this.ex)<.002)this.ex=this.exT;
    this.s.ex.forEach(e=>{if(!e.b)e.b=e.o.position.clone();e.o.position.copy(e.b).addScaledVector(e.dir,this.ex)});
    this.r.render(this.scene,this.cam);
    this.drawOverlay();
  }
  drawOverlay(){
    const L=this.labels||(this.labels=labelsOf(this.f.d)),OW=this.OW,OH=this.OH,cs=[];
    this.content.updateMatrixWorld(true);
    this.s.an.forEach((fn,i)=>{const v=fn().applyMatrix4(this.content.matrixWorld).project(this.cam);cs.push({n:i+1,label:L[i].t,ax:(v.x+1)/2*OW,ay:(1-v.y)/2*OH,vis:v.z<1})});
    if(this.mobile){
      this.ov.innerHTML=cs.map(c=>`<circle cx="${c.ax}" cy="${c.ay}" r="12" fill="${OR}" stroke="#fff" stroke-width="2"/><text x="${c.ax}" y="${c.ay+5}" text-anchor="middle" fill="#fff" class="cb">${c.n}</text>`).join('');
    }else{
      this.ov.innerHTML=callouts(cs);
    }
  }
}
function init3d(){
  const views=[...document.querySelectorAll('.v3d')].map(el=>new View3D(el,FICHAS[+el.id.slice(1)]));
  window.__views=views;
  const io=new IntersectionObserver(es=>es.forEach(e=>{const v=e.target.__v;if(!v)return;if(e.isIntersecting)v.mount();else v.unmount()}),{rootMargin:'150px'});
  views.forEach(v=>{v.el.__v=v;io.observe(v.el)});
}
