/* ===== Librito: ayudas y tabiquería (unidades en cm) ===== */
const MATL=c=>new THREE.MeshLambertMaterial({color:c});
function orient(m,a,b){const d=b.clone().sub(a);m.position.copy(a.clone().add(b).multiplyScalar(.5));m.quaternion.setFromUnitVectors(V3(0,1,0),d.clone().normalize())}
function dim(g,a,b,col,r){
  col=col||0xF26A1B;r=r||.35;const A=V3(...a),B=V3(...b),L=A.distanceTo(B),d=B.clone().sub(A).normalize(),c=r*3.2;
  const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,Math.max(.1,L-2*c),8),MATL(col));orient(m,A.clone().add(d.clone().multiplyScalar(c)),B.clone().sub(d.clone().multiplyScalar(c)));g.add(m);
  [[A,1],[B,-1]].forEach(([P,s])=>{const k=new THREE.Mesh(new THREE.ConeGeometry(r*2,c*1.6,10),MATL(col));k.position.copy(P.clone().add(d.clone().multiplyScalar(s*c*.8)));k.quaternion.setFromUnitVectors(V3(0,1,0),d.clone().multiplyScalar(-s));g.add(k)});
  return()=>A.clone().add(B).multiplyScalar(.5);
}
function pipe(pts,col,r,o){
  o=o||{};const P=[];const R=o.round===undefined?1.6:o.round;
  const v=pts.map(p=>V3(...p));
  for(let i=0;i<v.length;i++){
    if(i===0||i===v.length-1||R===0){P.push(v[i]);continue}
    const a=v[i-1],b=v[i],c=v[i+1],d1=b.clone().sub(a),d2=c.clone().sub(b),r1=Math.min(R,d1.length()/2.2),r2=Math.min(R,d2.length()/2.2);
    P.push(b.clone().sub(d1.normalize().multiplyScalar(r1)),b.clone(),b.clone().add(d2.normalize().multiplyScalar(r2)));
  }
  const cur=new THREE.CatmullRomCurve3(P,false,'catmullrom',.05);
  const m=new THREE.Mesh(new THREE.TubeGeometry(cur,Math.max(24,P.length*10),r,10,false),
    o.stripe?new THREE.MeshLambertMaterial({map:stripeTex(cur.getLength()/(r*7))}):new THREE.MeshLambertMaterial({color:col,transparent:o.op!=null,opacity:o.op==null?1:o.op}));
  return m;
}
let _st=null;
function stripeTex(rep){
  const c=document.createElement('canvas');c.width=64;c.height=8;const g=c.getContext('2d');g.fillStyle='#F2D31B';g.fillRect(0,0,64,8);g.fillStyle='#2E9E3F';g.fillRect(0,0,34,8);
  const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(rep,1);return t;
}
function txtPlane(text,w,h,x,y,z,o){
  o=o||{};const cv=document.createElement('canvas');cv.width=256;cv.height=Math.round(256*h/w);const c=cv.getContext('2d');
  if(o.bg){c.fillStyle=o.bg;c.fillRect(0,0,cv.width,cv.height)}else c.clearRect(0,0,cv.width,cv.height);
  c.fillStyle=o.fg||'#10213F';c.font=`800 ${Math.round(cv.height*(o.fs||.62))}px Barlow Condensed, Arial Narrow, Arial`;c.textAlign='center';c.textBaseline='middle';
  const lines=String(text).split('\n');lines.forEach((t,i)=>c.fillText(t,cv.width/2,cv.height*(lines.length===1?.52:(.3+i*.42))));
  const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(cv),transparent:true,depthWrite:false}));
  m.position.set(x,y,z);if(o.rx)m.rotation.x=o.rx;if(o.ry)m.rotation.y=o.ry;return m;
}
const STU='#B9C4D4',CAN='#8FA0B6',PLC='#E9EBEE',PLC2='#DDE0E6',BANDA='#4F5868',MEM='#2B3445',WOOLF='wool';

/* ---- muro de pladur parametrico ---- */
function studWall(o){
  o=Object.assign({len:240,h:100,sp:60,prof:48,caras:1,mem:false,lana:true,banda:true,step:true,door:null,ceil:false,exp:false,floorDetail:false,ceilDetail:false,gap:true,studsOnly:false,exs:1,woolOp:null,s1f:0},o);
  const g=new THREE.Group(),pw=o.prof/10,T=.45,t=1.25,mt=.22,ex=[],an={},L=o.len,h=o.h,hp=h;
  const yb=o.banda?.45:0;
  if(o.slab!==false){g.add(box(L+(o.slabW||24),14,o.slabD||46,'conc',L/2,-7,0));
  if(o.ceil)g.add(box(L+(o.slabW||24),14,o.slabD||46,'conc',L/2,h+7,0))}
  let banda;
  if(o.banda){banda=box(L,.45,pw+1.2,BANDA,L/2,.225,0,{eo:.3});g.add(banda);ex.push({o:banda,dir:V3(0,-10,0)});an.banda=()=>V3(L*.3,.22,pw/2+.62)}
  if(o.ceil&&o.banda){const b2=box(L,.45,pw+1.2,BANDA,L/2,h-.225,0,{eo:.3});g.add(b2);ex.push({o:b2,dir:V3(0,10,0)});an.bandaSup=()=>V3(L*.3,h-.22,pw/2+.62)}
  const cw=pw+.2,ytop=o.ceil?h-yb:h;
  const canal=(y,up)=>{const gg=new THREE.Group();gg.add(box(L,T,cw,CAN,L/2,y+(up?-T/2:T/2),0));[1,-1].forEach(s=>gg.add(box(L,3,T,CAN,L/2,y+(up?-1.5:1.5),s*(cw/2-T/2))));return gg};
  const cI=canal(yb,false);g.add(cI);ex.push({o:cI,dir:V3(0,-5,0)});an.canal=()=>V3(L*.18,yb+1.5,cw/2+.1);
  if(o.ceil){const cS=canal(ytop,true);g.add(cS);ex.push({o:cS,dir:V3(0,5,0)});an.canalSup=()=>V3(L*.18,ytop-1.5,cw/2+.1)}
  const n=Math.round(L/o.sp);let xs=[];for(let i=0;i<=n;i++)xs.push(i*o.sp);
  const door=o.door;
  const stud=(x,y0,y1,dir)=>{const hh=y1-y0,gg=new THREE.Group(),wx=dir>0?x+T/2:x-T/2,fx=dir>0?x+T+1.75:x-T-1.75;
    gg.add(box(T,hh,pw-.2,STU,wx,y0+hh/2,0,{eo:.4}));[1,-1].forEach(s=>gg.add(box(3.5,hh,T,STU,fx,y0+hh/2,s*(pw/2-.1-T/2),{eo:.4})));return gg};
  const y0s=yb+T,y1s=o.ceil?ytop-T-(o.gap?1:0):h;
  const studsList=[];
  xs.forEach((x,i)=>{
    const last=i===n;
    if(door&&x>door.x0+1&&x<door.x1-1)return;
    const s=stud(last?x-T:x,y0s,y1s,last?-1:1);g.add(s);studsList.push({x,s});
  });
  if(door){
    [door.x0,door.x1].forEach((x,k)=>{[0,1].forEach(j=>{const s=stud(k?x-T-j*(T+.2):x+j*(T+.2),y0s,y1s,k?-1:1);g.add(s)})});
    const dh=door.h,dl=door.x1-door.x0;
    const din=new THREE.Group();din.add(box(dl,T,cw,CAN,(door.x0+door.x1)/2,yb+T+dh,0));[1,-1].forEach(s=>din.add(box(dl,3,T,CAN,(door.x0+door.x1)/2,yb+T+dh+1.5,s*(cw/2-T/2))));g.add(din);
    const xm=(door.x0+door.x1)/2;g.add(stud(xm,yb+T+dh+3.2,y1s,1));
    an.dintel=()=>V3(xm,yb+T+dh+1,cw/2+.1);an.jamba=()=>V3(door.x0+T+.1,yb+40,cw/2+.1);an.montSobre=()=>V3(xm+T+1.5,yb+T+dh+22,pw/2);
    const ph=new THREE.Mesh(new THREE.BoxGeometry(.1,.1,.1));
    g.add(dashed(dl-2,dh,pw+1,xm,yb+T+dh/2,0,0xB98A5A));an.precerco=()=>V3(door.x0+3,yb+T+dh*.6,pw/2+.7);
  }
  if(o.lana&&!o.studsOnly)for(let i=0;i<n;i++){const a=xs[i]+T,b=xs[i+1];if(door&&b>door.x0&&a<door.x1)continue;
    g.add(box(b-a,y1s-y0s,pw-1.2,WOOLF,(a+b)/2,(y0s+y1s)/2,0,o.woolOp?{eo:.2,op:o.woolOp}:{eo:.2}))}
  if(o.lana&&!o.studsOnly)an.lana=()=>V3(xs[0]+o.sp*.5,h*.5,(pw-1.2)/2+.05);
  an.montante=()=>V3(xs[1]+T/2,y1s,0);
  an.cavidad=()=>V3(xs[0]+o.sp*.5,y1s,0);
  // placas
  if(!o.studsOnly&&o.caras>0){
    const k2=o.caras===2,full=!o.step;
    const s1=full?0:L*(o.s1f||(k2?.17:.3)),sM=full?0:L*.4,s2=full?0:L*.62;
    const zf=(k)=>pw/2+t/2+k*(t+(o.mem?mt:0));
    const yy0=o.gap?1:yb,yy1=o.ceil?(o.gap?h-1.2:h):h;
    const hole=door?{x0:door.x0,x1:door.x1,y1:yb+T+door.dh}:null;
    const F=[],F2=[],B=[],B2=[];
    panels(g,s1,L,[xs[1]===undefined?60:xs[1]],yy0,yy1,zf(0),t,PLC,hole,false,F);
    if(k2)panels(g,s2,L,[xs[3]||180],yy0,yy1,zf(1),t,PLC2,hole,false,F2);
    panels(g,0,L,[xs[2]||120],yy0,yy1,-zf(0),t,PLC,hole,false,B);
    if(k2)panels(g,0,L,[xs[3]||180],yy0,yy1,-zf(1),t,PLC2,hole,false,B2);
    F.forEach(m=>ex.push({o:m,dir:V3(0,0,10)}));F2.forEach(m=>ex.push({o:m,dir:V3(0,0,22)}));B.forEach(m=>ex.push({o:m,dir:V3(0,0,-10)}));B2.forEach(m=>ex.push({o:m,dir:V3(0,0,-22)}));
    let M=null;
    if(o.mem&&k2){M=box(L-sM,yy1-yy0-.2,mt,MEM,(sM+L)/2,(yy0+yy1)/2,pw/2+t+mt/2,{eo:.5});g.add(M);ex.push({o:M,dir:V3(0,0,16)});
      g.add(box(L,yy1-yy0-.2,mt,MEM,L/2,(yy0+yy1)/2,-(pw/2+t+mt/2),{eo:.5}))}
    // tornillos
    const sg=new THREE.CylinderGeometry(.5,.5,.4,10),sm=MATL(0x39424F);
    const zs1=pw/2+t+.15,zs2=pw/2+t+(o.mem?t+mt:t)+.15;
    xs.forEach((x,i)=>{
      if(door&&x>door.x0&&x<door.x1)return;const fx=x+T+1.75-(i===n?2*(T+1.75):0);
      const sp1=k2?75:25;
      if(fx>s1+3&&fx<(k2?s2-3:L+1)){for(let y=yy0+12;y<yy1-6;y+=sp1){const s=new THREE.Mesh(sg,sm);s.rotation.x=Math.PI/2;s.position.set(fx,y,zs1);g.add(s)}}
      if(k2&&fx>s2+3){for(let y=yy0+12;y<yy1-6;y+=25){const s=new THREE.Mesh(sg,sm);s.rotation.x=Math.PI/2;s.position.set(fx,y,zs2);g.add(s)}}
    });
    an.placa1=()=>V3(k2?(s1+sM)/2:(s1+L)/2+10,h*.35,zf(0)+t/2);
    an.placa2=()=>V3((s2+L)/2,h*.4,zf(1)+t/2+(o.mem?mt:0));
    an.membrana=()=>V3(sM+10,h,pw/2+t+mt/2);
    const si=Math.min(2,n-1),sj=Math.min(3,n-1);
    an.tornillo=()=>V3(xs[si]+T+1.75,yy0+12+(k2?75:25),zs1+.2);
    an.tornillo2=()=>V3(xs[sj]+T+1.75,yy0+12+25*2,zs2+.2);
    an.junta=()=>V3(xs[1],h*.7,zf(0)+t/2);
    an.junta2=()=>V3(xs[3],h*.6,zf(1)+t/2);
    an.trasera=()=>V3(L*.9,h*.5,-zf(0)-t/2);
    an.holgura=()=>V3(L*.45,.5,zf(0)+t/2);
    an.holguraSup=()=>V3(L*.45,h-.6,zf(0)+t/2);
  }
  // cotas
  const zd=pw/2+(o.caras||0)*(t+(o.mem?mt:0))+3;
  if(!o.studsOnly&&!o.noCota)an.cota=dim(g,[xs[0],h+.6,zd],[xs[1],h+.6,zd]);
  an.espesor=dim(g,[L*.88-0,h+.6,-pw/2-(o.caras||0)*(t+(o.mem?mt:0))],[L*.88,h+.6,pw/2+(o.caras||0)*(t+(o.mem?mt:0))],0x2F3B52,.25);
  ex.forEach(e=>e.dir.multiplyScalar(o.exs));
  return{g,anMap:an,ex,ex0:o.exp?1:0,xs};
}

/* ---- detalle de encuentro con suelo / techo ---- */
function detalleSuelo(o){
  const s=studWall(Object.assign({len:100,h:42,sp:60,caras:o.caras||1,mem:!!o.mem,step:true,s1f:.45,banda:true,lana:true,gap:true},o));
  const g=s.g,an=s.anMap,pw=4.8;
  // taco
  const tc=cyl(.45,5,0x8A8F99,60,-1.5,0);g.add(tc);const th=cyl(.9,.5,0x6C727D,60,.95+.2,0);g.add(th);
  an.taco=()=>V3(60,1.2,pw/2+.2);
  // sellador junta 1 cm
  g.add(box(100,.35,.5,'#7A8696',50,.7,pw/2+1.25+.25,{eo:.2}));g.add(box(100,.35,.5,'#7A8696',50,.7,-(pw/2+1.25+.25),{eo:.2}));
  an.sellador=()=>V3(30,.7,pw/2+1.75);
  an.gap1=dim(g,[8,0,pw/2+1.6],[8,1,pw/2+1.6],0x2F3B52,.12);
  return s;
}
function detalleTecho(o){
  const s=studWall(Object.assign({len:100,h:42,sp:60,caras:o.caras||1,step:true,s1f:.45,banda:true,lana:true,ceil:true,gap:true},o));
  const an=s.anMap,pw=4.8,g=s.g;
  g.add(box(100,.35,.5,'#7A8696',50,40.8,pw/2+1.25+.25,{eo:.2}));an.sellador=()=>V3(30,40.8,pw/2+1.75);
  an.holgSup=dim(g,[8,41.0,pw/2+1.6],[8,42,pw/2+1.6],0x2F3B52,.12);
  return s;
}
/* ---- separación de montantes: 3 filas ---- */
function sSeparacion(){
  const g=new THREE.Group(),an={};
  [[60,'60'],[40,'40'],[30,'30']].forEach(([sp,l],i)=>{
    const s=studWall({len:120,h:48,sp,caras:0,lana:false,banda:true,studsOnly:true,step:false});
    s.g.position.z=i*62-62;s.g.position.x=0;g.add(s.g);
    an['c'+l]=()=>V3(sp/2,49,i*62-62);
    const d=dim(g,[0,50,i*62-62+4],[sp,50,i*62-62+4]);
    an['c'+l]=d;
  });
  return{g,anMap:an,ex:[],ex0:0};
}
/* ---- detalle de juntas ---- */
function sJuntas(){
  const g=new THREE.Group(),an={};const W=34,t=3,rec=.45;
  const shape=(sign)=>{const s=new THREE.Shape();const x0=sign<0?-W:0,x1=sign<0?0:W;const e=sign<0?x1:x0;
    // perfil de placa con borde afinado (recorte) hacia la junta
    if(sign<0){s.moveTo(x0,0);s.lineTo(x1,0);s.lineTo(x1,t-rec);s.lineTo(x1-8,t);s.lineTo(x0,t);s.lineTo(x0,0)}
    else{s.moveTo(x0,0);s.lineTo(x1,0);s.lineTo(x1,t);s.lineTo(x0+8,t);s.lineTo(x0,t-rec);s.lineTo(x0,0)}
    return s};
  const mk=(sign)=>{const geo=new THREE.ExtrudeGeometry(shape(sign),{depth:40,bevelEnabled:false});geo.translate(0,0,-20);
    const m=new THREE.Mesh(geo,MATL(PLC));m.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo),new THREE.LineBasicMaterial({color:0x26324D,transparent:true,opacity:.55})));return m};
  const A=mk(-1),B=mk(1);A.position.x=-.12;B.position.x=.12;g.add(A,B);
  const ex=[];
  // montantes bajo
  const stuA=box(3.5,.5,40,STU,0,-.3,0);const stu2=box(3.5,.5,40,STU,-30,-.3,0);const stu3=box(3.5,.5,40,STU,30,-.3,0);
  g.add(stuA,stu2,stu3);
  const cinta=box(11,.12,40,'#F5F0DA',0,t-rec+.06,0,{eo:.3});g.add(cinta);ex.push({o:cinta,dir:V3(0,6,0)});
  const p1=box(16,.2,40,'#D6D2C4',0,t-rec+.24,0,{eo:.3});g.add(p1);ex.push({o:p1,dir:V3(0,11,0)});
  const p2=box(24,.14,40,'#E3DFD2',0,t-rec+.41,0,{eo:.3});g.add(p2);ex.push({o:p2,dir:V3(0,16,0)});
  const p3=box(34,.1,40,'#F1EEE6',0,t-rec+.54,0,{eo:.3});g.add(p3);ex.push({o:p3,dir:V3(0,21,0)});
  const sg=new THREE.CylinderGeometry(.55,.55,.5,10);[[-14],[14]].forEach(([x])=>{[-12,0,12].forEach(z=>{const s=new THREE.Mesh(sg,MATL(0x39424F));s.position.set(x,t-.05,z);g.add(s)})});
  g.scale.set(1.3,1.3,1.3);
  an.ba=()=>V3(-9,t*1.3-.6,12*1.3);an.cinta=()=>V3(0,(t-rec+.1)*1.3+ex[0].dir.y*0,-14*1.3);an.p1=()=>V3(3*1.3,(t-rec+.24)*1.3,-15*1.3);an.p2=()=>V3(8*1.3,(t-rec+.41)*1.3,-8*1.3);an.p3=()=>V3(14*1.3,(t-rec+.54)*1.3,-2*1.3);an.tornillo=()=>V3(-14*1.3,t*1.3,0);an.montante=()=>V3(-30*1.3,-.3*1.3,16*1.3);an.junta=()=>V3(0,(t-rec)*1.3,-19*1.3);
  return{g,anMap:an,ex,ex0:0};
}
/* ---- encuentros en planta ---- */
function plantaPared(g,pts,pw,opt){
  // pts: [x0,z0,x1,z1] eje de pared en planta (segmento recto); construye perfilería + placas para altura corta
}
function sEncuentros(){
  const g=new THREE.Group(),an={},pw=4.8,t=1.25,h=14,T=.45;
  g.add(box(150,6,150,'conc',0,-3,0));
  const wall=(x0,z0,x1,z1,o)=>{o=o||{};const dx=x1-x0,dz=z1-z0,L=Math.hypot(dx,dz),ang=-Math.atan2(dz,dx);const w=new THREE.Group();
    w.add(box(L,.45,pw+.2,CAN,L/2,.22,0,{eo:.3}));
    for(let x=0;x<=L+.1;x+=Math.max(10,Math.min(60,L/Math.round(L/60)))){const xx=Math.min(x,L-T);w.add(box(T,h,pw-.2,STU,xx+T/2,h/2,0,{eo:.3}));[1,-1].forEach(s=>w.add(box(3.5,h,T,STU,xx+T+1.75,h/2,s*(pw/2-.1-T/2),{eo:.3})))}
    w.add(box(L,h-1,pw-1.2,WOOLF,L/2,h/2,0,{eo:.2}));
    if(!o.noP){w.add(box(L,h,t,PLC,L/2,h/2+.0,pw/2+t/2));w.add(box(L,h,t,PLC,L/2,h/2,-(pw/2+t/2)))}
    w.position.set(x0,0,z0);w.rotation.y=ang;g.add(w);return w};
  // esquina en L
  wall(-70,-52,-18,-52);wall(-70,-52,-70,-2,{});
  // T
  wall(-10,-52,60,-52);wall(25,-52,25,-2);
  // contra muro existente
  g.add(box(50,h+6,10,'conc',-45,(h+6)/2,45));g.add(box(4.5,.45,pw+1.2,BANDA,-45,.22,39.2,{eo:.3}));
  wall(-70,32,-20,32);
  // esquinero
  g.add(box(.5,h,5,'#9AA7B8',-70.8,h/2,-52.8,{eo:.3}));
  an.esquina=()=>V3(-70,h,-52);an.te=()=>V3(25,h,-52);an.muro=()=>V3(-45,h,34);an.banda=()=>V3(-45,.4,36);an.mont=()=>V3(25,h+.1,-46);an.cantonera=()=>V3(-70.8,h*.7,-52.6);
  return{g,anMap:an,ex:[],ex0:0};
}
/* ---- pasos de instalaciones ---- */
function sPasos(){
  const s=studWall({len:240,h:100,sp:60,caras:1,step:true,banda:true,lana:true,woolOp:.3,s1f:.55});
  const g=s.g,an=s.anMap,xs=s.xs,pw=4.8;
  // tubos corrugados horizontales a traves de montantes con casquillo
  [[40,0xE5762A],[55,0x2E6FD8]].forEach(([y,c])=>{const m=pipe([[xs[0]+3,y,0],[xs[3]+5,y,0]],c,.9,{round:0});g.add(m)});
  [1,2,3].forEach(i=>{const r=new THREE.Mesh(new THREE.TorusGeometry(1.5,.28,8,18),MATL(0x2A2F3A));r.position.set(xs[i]+.25,40,0);r.rotation.y=Math.PI/2;g.add(r);const r2=r.clone();r2.position.y=55;g.add(r2)});
  // caja de mecanismo en placa 1 (zona 1ª placa) con tubo vertical
  const cx=xs[2]+30;
  const caja=box(6.5,6.5,4.5,'#F3F3EF',cx,72,pw/2+.5,{eo:.4});g.add(caja);
  g.add(pipe([[cx,72,pw/2],[cx,72,0.5],[cx,40,0.5]],0xE5762A,.9,{round:0}));
  an.pasa=()=>V3(xs[1]+.3,40,1.6);an.cajaLana=()=>V3(xs[0]+30,70,1.5);an.tubo=()=>V3(xs[2]-14,40,.9);an.tubo2=()=>V3(xs[1]+25,55,.9);an.caja=()=>V3(cx+3.3,72,pw/2+1.4);
  return s;
}
/* ---- anatomía del tabique (despiece) ---- */
function sAnatomia(){
  return studWall({len:120,h:60,sp:60,caras:1,step:false,banda:true,lana:true,exp:true,gap:true,exs:2.6});
}
/* ---- falso techo ---- */
function sFalsoTecho(){
  const g=new THREE.Group(),an={},ex=[];
  g.add(box(180,10,150,'conc',0,60,0));
  // varillas
  const vx=[-60,0,60];vx.forEach(x=>[-40,40].forEach(z=>{g.add(cyl(.35,36,0x9AA0AA,x,36,z));g.add(box(3,.3,6,'#B5BAC4',x,18,z,{eo:.3}));g.add(box(2,3,.5,'#8FA0B6',x,22,z,{eo:.3}))}));
  // primarios
  [-40,40].forEach(z=>g.add(box(170,2.7,6,CAN,0,15.5,z,{eo:.5})));
  // secundarios (maestras) cada 50 cm perpendiculares... aquí a lo largo X
  for(let x=-75;x<=75;x+=50)g.add(box(3,2.7,150,STU,x,12.2,0,{eo:.5}));
  const pl=box(170,1.25,140,PLC,0,9.9,0);pl.material.forEach(m=>{m.transparent=true;m.opacity=.82});g.add(pl);ex.push({o:pl,dir:V3(0,-22,0)});
  // perfil angular perimetral
  g.add(box(170,3,.4,CAN,0,6,-72,{eo:.5}));
  const sg=new THREE.CylinderGeometry(.5,.5,.4,10);
  for(let x=-75;x<=75;x+=50)for(let z=-60;z<=60;z+=25){const s=new THREE.Mesh(sg,MATL(0x39424F));s.position.set(x,9.2,z);g.add(s)}
  an.forjado=()=>V3(60,66,60);an.varilla=()=>V3(60,38,40);an.horquilla=()=>V3(0,22,40);an.primario=()=>V3(-50,15.5,40);an.maestra=()=>V3(25,12.2,-20);an.placa=()=>V3(-30,9.3,60);an.tornillo=()=>V3(-25,9.2,35);an.angular=()=>V3(-40,6,-72);
  return{g,anMap:an,ex,ex0:0};
}
/* ---- trasdosado ---- */
function sTrasdosado(){
  const g=new THREE.Group(),an={},ex=[];
  g.add(box(160,6,70,'conc',0,-3,0));
  g.add(box(150,60,12,'conc',0,30,-30));
  // autoportante: canal, montante, lana, placa
  g.add(box(150,.45,5,CAN,0,.22,-17));
  [-60,0,60].forEach(x=>{g.add(box(.45,58,4.5,STU,x,29.5,-17,{eo:.4}));[1,-1].forEach(s=>g.add(box(3.5,58,.45,STU,x+2,29.5,-17+s*2.0,{eo:.4})))});
  [-30,30].forEach(x=>g.add(box(56,58,3.6,'wool',x,29.5,-17,{eo:.2})));
  const pl=box(150,59,1.25,PLC,0,29.8,-17+2.4+.65);g.add(pl);ex.push({o:pl,dir:V3(0,0,12)});
  // pelladas (trasdosado directo)
  g.add(box(150,.45,5,CAN,0,.22,40,{noedge:true,op:0}));
  an.muro=()=>V3(50,45,-24);an.canal=()=>V3(-30,.3,-14.5);an.montante=()=>V3(0,50,-17);an.lana=()=>V3(30,25,-15);an.placa=()=>V3(-40,30,-12.5);an.camara=()=>V3(-30,59,-17);
  return{g,anMap:an,ex,ex0:0};
}

/* ---- sección horizontal despiezada de un tabique ---- */
function sSection(o){
  o=Object.assign({caras:1,mem:false},o);
  const g=new THREE.Group(),an={},pw=4.8,T=.45,t=1.25,mt=.25,L=16,hgt=3,gap=1.5;
  // zócalo guía (no se dibuja)
  const bx=(w,hh,d,fill,x,y,z,opt)=>{const m=box(w,hh,d,fill,x,y,z,opt||{});g.add(m);return m};
  // montante en C (centro)
  bx(T,hgt,pw-.2,STU,T/2,hgt/2,0);
  [1,-1].forEach(s=>{bx(3.5,hgt,T,STU,T+1.75,hgt/2,s*(pw/2-.1-T/2));bx(T,hgt,.9,STU,T+3.5-T/2,hgt/2,s*(pw/2-.1-T-.45))});
  // lana
  bx(L-T,hgt,pw-1.0,'wool',T+(L-T)/2,hgt/2,0,{eo:.2});
  const layers=[];const zp=[];let z=pw/2+gap;
  const pushLayer=(sign)=>{let zz=pw/2+gap;const out=[];for(let k=0;k<o.caras;k++){
      out.push({kind:'placa',z:sign*(zz+t/2)});zz+=t+gap;
      if(o.mem&&k===0&&o.caras>1){out.push({kind:'mem',z:sign*(zz-gap/2+0)});}
    }return out};
  const mk=(sign)=>{const arr=[];let zz=pw/2+gap;
    for(let k=0;k<o.caras;k++){
      arr.push(bx(L,hgt,t,k?PLC2:PLC,L/2,hgt/2,sign*(zz+t/2)));
      zz+=t;
      if(o.mem&&o.caras>1&&k===0){zz+=gap*.55;arr.push(bx(L,hgt,mt,MEM,L/2,hgt/2,sign*(zz+mt/2),{eo:.8}));zz+=mt+gap*.55}else zz+=gap;
    }return arr};
  const F=mk(1),B=mk(-1);
  an.montante=()=>V3(T/2,hgt,0);an.lana=()=>V3(L*.7,hgt,.0);an.espesor=()=>V3(L*.9,hgt,0);
  an.placa1=()=>V3(L*.5,hgt,F[0].position.z);an.placa2=()=>V3(L*.5,hgt,F[o.mem?2:1]?F[o.mem?2:1].position.z:0);
  an.membrana=()=>V3(L*.5,hgt,F[1]?F[1].position.z:0);an.trasera=()=>V3(L*.5,hgt,B[B.length-1].position.z);
  return{g,anMap:an,ex:[],ex0:0,pitch:1.2};
}
