/* ===== Librito: electricidad (unidades en cm) ===== */
const C_FASE=0x8B4A2B,C_NEU=0x2E6FD8,C_RET=0xE58A2B,C_V1=0x9AA0AA,C_V2=0x1E2229,C_GOLD=0xD9B24A;
function board(W,H){const g=new THREE.Group();g.add(box(W,H,3,'#E6E3DA',0,0,-1.5,{eo:.3}));return g}
function W3(g,pts,lane,col,o){
  o=o||{};const z=3.9+lane*1.0;
  const m=pipe(pts.map(p=>[p[0],p[1],z]),col,o.r||.46,{stripe:o.stripe,round:o.round===undefined?2.2:o.round});g.add(m);return m;
}
function terminal(g,x,y,col){const c=cyl(.65,1.1,col||C_GOLD,x,y,3.4,[Math.PI/2,0,0]);g.add(c);return[x,y]}
function mec(g,x,y,type,o){
  o=o||{};const T={};g.add(box(9.5,9.5,3,'#F4F3EE',x,y,1.5,{eo:.4}));
  g.add(box(6.2,6.2,.2,'#E4E2DA',x,y,3.1,{eo:.2}));
  const lab=(t,dx,dy)=>g.add(txtPlane(t,5.2,2.2,x+dx,y+dy,3.25,{fs:.7}));
  if(type==='int'){T.a=terminal(g,x,y+3);T.b=terminal(g,x,y-3);lab('ENTRADA',0,4.8);lab('SALIDA',0,-4.8)}
  if(type==='conm'){const f=o.flip?-1:1;T.com=terminal(g,x-4*f,y);T.l1=terminal(g,x+4*f,y+2.2);T.l2=terminal(g,x+4*f,y-2.2);lab('COM',-1.2*f,0);lab('L1',1.6*f,3.9);lab('L2',1.6*f,-3.9);}
  if(type==='cruce'){T.a1=terminal(g,x-4,y+2.2);T.a2=terminal(g,x-4,y-2.2);T.b1=terminal(g,x+4,y+2.2);T.b2=terminal(g,x+4,y-2.2);
    const bar=(dy)=>{const b=box(8,.35,.35,'#7B8496',x,y,3.3,{noedge:true});b.rotation.z=Math.atan2(dy,8);return b};g.add(bar(-4.4),bar(4.4));lab('CRUCE',0,4.8)}
  return T;
}
function lamp(g,x,y,o){
  o=o||{};const T={};
  const r=cyl(7,2,0xF4F3EE,x,y,1,[Math.PI/2,0,0]);g.add(r);
  const b=new THREE.Mesh(new THREE.SphereGeometry(3.6,18,14),new THREE.MeshLambertMaterial({color:0xFFE9A6,emissive:0x6A5A20}));b.position.set(x,y,5.4);g.add(b);
  g.add(box(14,4.2,3,'#F4F3EE',x,y-9,1.5,{eo:.4}));
  T.f=terminal(g,x-4,y-9);T.n=terminal(g,x,y-9);T.t=terminal(g,x+4,y-9);
  g.add(txtPlane('F',2.4,2,x-4,y-11.2,3.2,{fs:.7}));g.add(txtPlane('N',2.4,2,x,y-11.2,3.2,{fs:.7}));g.add(txtPlane('T',2.4,2,x+4,y-11.2,3.2,{fs:.7}));
  return T;
}
function deriv(g,cx,cy,w,h){
  w=w||18;h=h||14;const wall='#EDEBE4';
  g.add(box(w,.8,3.4,wall,cx,cy+h/2-.4,1.7,{eo:.3}));g.add(box(w,.8,3.4,wall,cx,cy-h/2+.4,1.7,{eo:.3}));
  g.add(box(.8,h-1.6,3.4,wall,cx-w/2+.4,cy,1.7,{eo:.3}));g.add(box(.8,h-1.6,3.4,wall,cx+w/2-.4,cy,1.7,{eo:.3}));
  g.add(box(w-1.6,h-1.6,.5,'#F7F6F2',cx,cy,.25,{eo:.2}));
  const reg=(y,col)=>{g.add(box(w-5,2.6,2.2,col,cx,y,1.6,{eo:.4}));for(let i=0;i<4;i++)g.add(box(1.6,.6,.8,'#F2994A',cx-5+i*3.2,y,3,{eo:.3}))};
  const R={f:[cx,cy+4.2],n:[cx,cy],t:[cx,cy-4.2]};
  reg(R.f[1],'#C9B8A8');reg(R.n[1],'#B9CCE8');reg(R.t[1],'#CFE0B0');
  return{R,xl:cx-(w-5)/2,xr:cx+(w-5)/2};
}
/* ---- punto de luz sencillo ---- */
function sLuzSencillo(){
  const g=board(150,84),an={};
  const D=deriv(g,-45,20);
  const S=mec(g,-45,-14,'int');
  const L=lamp(g,45,24);
  W3(g,[[-78,D.R.f[1]],[D.xl,D.R.f[1]]],0,C_FASE);W3(g,[[-78,D.R.n[1]],[D.xl,D.R.n[1]]],0,C_NEU);W3(g,[[-78,D.R.t[1]],[D.xl,D.R.t[1]]],0,0,{stripe:true});
  W3(g,[[D.xr,D.R.f[1]],[-30,D.R.f[1]],[-30,S.a[1]+0],[S.a[0],S.a[1]]],1,C_FASE);
  W3(g,[[S.b[0],S.b[1]],[S.b[0],-30],[L.f[0],-30],[L.f[0],L.f[1]]],2,C_RET);
  W3(g,[[D.xr,D.R.n[1]],[-24,D.R.n[1]],[-24,8],[L.n[0],8],[L.n[0],L.n[1]]],0,C_NEU);
  W3(g,[[D.xr,D.R.t[1]],[-18,D.R.t[1]],[-18,2],[L.t[0],2],[L.t[0],L.t[1]]],0,0,{stripe:true});
  an.linea=()=>V3(-70,D.R.n[1],4.4);an.deriv=()=>V3(-45,27.4,3.6);an.interruptor=()=>V3(-49.5,-14,3);an.fase=()=>V3(-30,0,4.9);an.retorno=()=>V3(5,-30,5.9);an.lampara=()=>V3(52,26,4);an.neutro=()=>V3(2,8,4.9);an.tierra=()=>V3(10,2,4.9);an.regleta=()=>V3(-45,D.R.f[1],3.6);
  return{g,anMap:an,ex:[],ex0:0,pitch:.55};
}
function sConmutado(){
  const g=board(176,84),an={};
  const D=deriv(g,-72,20);
  const C1=mec(g,-36,-12,'conm');const C2=mec(g,36,-12,'conm',{flip:true});
  const L=lamp(g,0,26);
  W3(g,[[-100,D.R.f[1]],[D.xl,D.R.f[1]]],0,C_FASE);W3(g,[[-100,D.R.n[1]],[D.xl,D.R.n[1]]],0,C_NEU);W3(g,[[-100,D.R.t[1]],[D.xl,D.R.t[1]]],0,0,{stripe:true});
  W3(g,[[D.xr,D.R.f[1]],[-58,D.R.f[1]],[-58,C1.com[1]],[C1.com[0],C1.com[1]]],1,C_FASE);
  W3(g,[C1.l1,[C2.l1[0],C2.l1[1]]],0,C_V1);W3(g,[C1.l2,[C2.l2[0],C2.l2[1]]],1,C_V2);
  W3(g,[C2.com,[50,C2.com[1]],[50,2],[L.f[0],2],[L.f[0],L.f[1]]],2,C_RET);
  W3(g,[[D.xr,D.R.n[1]],[-48,D.R.n[1]],[-48,12],[L.n[0],12],[L.n[0],L.n[1]]],0,C_NEU);
  W3(g,[[D.xr,D.R.t[1]],[-42,D.R.t[1]],[-42,6],[L.t[0],6],[L.t[0],L.t[1]]],0,0,{stripe:true});
  an.conm1=()=>V3(-40,-17,3);an.conm2=()=>V3(40,-17,3);an.fase=()=>V3(-58,5,4.9);an.v1=()=>V3(0,C1.l1[1],4.9);an.v2=()=>V3(0,C1.l2[1],5.9);an.retorno=()=>V3(50,-4,5.9);an.lampara=()=>V3(8,28,4);an.neutro=()=>V3(-20,12,4.9);an.tierra=()=>V3(-20,6,4.9);an.deriv=()=>V3(-72,27.4,3.6);an.com1=()=>V3(C1.com[0],C1.com[1],4);
  return{g,anMap:an,ex:[],ex0:0,pitch:.55};
}
function sCruce(){
  const g=board(200,84),an={};
  const D=deriv(g,-90,20);
  const C1=mec(g,-52,-12,'conm');const X=mec(g,0,-12,'cruce');const C2=mec(g,52,-12,'conm',{flip:true});
  const L=lamp(g,0,26);
  W3(g,[[-116,D.R.f[1]],[D.xl,D.R.f[1]]],0,C_FASE);W3(g,[[-116,D.R.n[1]],[D.xl,D.R.n[1]]],0,C_NEU);W3(g,[[-116,D.R.t[1]],[D.xl,D.R.t[1]]],0,0,{stripe:true});
  W3(g,[[D.xr,D.R.f[1]],[-74,D.R.f[1]],[-74,C1.com[1]],[C1.com[0],C1.com[1]]],1,C_FASE);
  W3(g,[C1.l1,X.a1],0,C_V1);W3(g,[C1.l2,X.a2],1,C_V2);
  W3(g,[X.b1,C2.l1],0,C_V1);W3(g,[X.b2,C2.l2],1,C_V2);
  W3(g,[C2.com,[66,C2.com[1]],[66,2],[L.f[0],2],[L.f[0],L.f[1]]],2,C_RET);
  W3(g,[[D.xr,D.R.n[1]],[-64,D.R.n[1]],[-64,12],[L.n[0],12],[L.n[0],L.n[1]]],0,C_NEU);
  W3(g,[[D.xr,D.R.t[1]],[-60,D.R.t[1]],[-60,6],[L.t[0],6],[L.t[0],L.t[1]]],0,0,{stripe:true});
  an.conm1=()=>V3(-56,-17,3);an.cruce=()=>V3(0,-17.5,3);an.conm2=()=>V3(56,-17,3);an.v1=()=>V3(-26,C1.l1[1],4.9);an.v2=()=>V3(-26,C1.l2[1],5.9);an.v3=()=>V3(26,X.b1[1],4.9);an.retorno=()=>V3(66,-4,5.9);an.lampara=()=>V3(8,28,4);an.fase=()=>V3(-74,6,4.9);an.deriv=()=>V3(-90,27.4,3.6);
  return{g,anMap:an,ex:[],ex0:0,pitch:.55};
}
/* ---- enchufes ---- */
function schuko(g,x,y){
  const T={},r=cyl(7.5,2.4,0xF4F3EE,x,y,1.2,[Math.PI/2,0,0]);g.add(r);
  const r2=cyl(5.6,.3,0xE9E7DF,x,y,2.5,[Math.PI/2,0,0]);g.add(r2);
  [-1.1,1.1].forEach(s=>g.add(cyl(.65,.5,0x23262C,x+s*2.3,y,2.7,[Math.PI/2,0,0])));
  [[0,3.3],[0,-3.3]].forEach(a=>g.add(box(.7,1.6,.5,'#A8AEB8',x+a[0]+(a[1]>0?-4:4)*.0,y+a[1]-0.0+(a[1]>0?0:0),2.7,{noedge:true})));
  g.add(box(2.4,.5,.6,'#B9BEC7',x-4.6,y,2.7,{noedge:true}));g.add(box(2.4,.5,.6,'#B9BEC7',x+4.6,y,2.7,{noedge:true}));
  // regleta de bornes bajo el aparato
  g.add(box(18,5,2.6,'#F4F3EE',x,y-11,1.3,{eo:.4}));
  T.fL=terminal(g,x-6,y-9.6);T.nL=terminal(g,x-2,y-9.6);T.tL=terminal(g,x+2,y-9.6);
  T.fR=terminal(g,x-6,y-12.6);T.nR=terminal(g,x-2,y-12.6);T.tR=terminal(g,x+2,y-12.6);
  g.add(txtPlane('F',2.2,1.8,x-6,y-14.5,3,{fs:.7}));g.add(txtPlane('N',2.2,1.8,x-2,y-14.5,3,{fs:.7}));g.add(txtPlane('T',2.2,1.8,x+2,y-14.5,3,{fs:.7}));
  return T;
}
function sEnchufes(){
  const g=board(170,80),an={};
  const A=schuko(g,-28,12),B=schuko(g,42,12);
  const y1=-27,y2=-30,y3=-33;
  W3(g,[[-88,A.fL[1]],[-50,A.fL[1]],[-50,A.fL[1]],[A.fL[0],A.fL[1]]],0,C_FASE);
  W3(g,[[-88,A.nL[1]-4],[-44,A.nL[1]-4],[-44,A.nL[1]],[A.nL[0],A.nL[1]]],1,C_NEU);
  W3(g,[[-88,A.tL[1]-8],[-38,A.tL[1]-8],[-38,A.tL[1]],[A.tL[0],A.tL[1]]],2,0,{stripe:true});
  W3(g,[[A.fL[0],A.fL[1]],[-8,A.fL[1]],[-8,-18],[B.fL[0],-18],[B.fL[0],B.fL[1]]],0,C_FASE);
  W3(g,[[A.nL[0],A.nL[1]],[-6,A.nL[1]],[-6,-22],[B.nL[0],-22],[B.nL[0],B.nL[1]]],1,C_NEU);
  W3(g,[[A.tL[0],A.tL[1]],[-4,A.tL[1]],[-4,-26],[B.tL[0],-26],[B.tL[0],B.tL[1]]],2,0,{stripe:true});
  an.linea=()=>V3(-80,A.fL[1],4.9);an.toma=()=>V3(-28,16,3);an.bornes=()=>V3(-28,A.fL[1],4.4);an.cadena=()=>V3(14,-20,5.4);an.toma2=()=>V3(42,16,3);an.neutro=()=>V3(-46,A.nL[1]-4,5);an.tierra=()=>V3(-40,A.tL[1]-8,6);
  return{g,anMap:an,ex:[],ex0:0,pitch:.5};
}
/* ---- caja de derivación (detalle) ---- */
function sDeriv(){
  const g=new THREE.Group(),an={};const wall='#EDEBE4',W=64,H=46;
  g.add(box(W,H,3,'#E6E3DA',0,0,-1.5,{eo:.3}));
  g.add(box(W,2,10,wall,0,H/2-1,5,{eo:.3}));g.add(box(W,2,10,wall,0,-H/2+1,5,{eo:.3}));g.add(box(2,H-4,10,wall,-W/2+1,0,5,{eo:.3}));g.add(box(2,H-4,10,wall,W/2-1,0,5,{eo:.3}));
  g.add(box(W-4,H-4,1,'#F7F6F2',0,0,.5,{eo:.2}));
  const reg=(y,col,n)=>{const h=new THREE.Group();h.add(box(26,6,7,col,0,y,4.5,{eo:.5,op:.6}));for(let i=0;i<n;i++){h.add(box(3.6,1.2,2.4,'#F2994A',-9+i*4.5,y,8.4,{eo:.5}));h.add(box(3.6,3,.8,'#3A3F4B',-9+i*4.5,y-1.2,8.2,{noedge:true}))}g.add(h);return h};
  reg(13,'#C9B8A8',5);reg(0,'#B9CCE8',5);reg(-13,'#CFE0B0',5);
  const wr=(y,xs,col,o)=>{W3(g,[[-70,y],[-13,y]],0+(o&&o.l||0),col,o);};
  wr(13,0,C_FASE);wr(0,0,C_NEU);wr(-13,0,0,{stripe:true});
  const wout=(y,dy,col,o)=>{W3(g,[[13,y],[40,y],[40,y+dy],[70,y+dy]],1,col,o);W3(g,[[13,y],[38,y],[38,y-dy*0.0],[70,y-dy*1.0-4]],2,col,o)};
  wout(13,8,C_FASE);wout(0,5,C_NEU);wout(-13,4,0,{stripe:true});
  an.linea=()=>V3(-50,13,5.1);an.regletaF=()=>V3(0,13,9.3);an.regletaN=()=>V3(0,0,9.3);an.regletaT=()=>V3(0,-13,9.3);an.salida=()=>V3(55,21,4.9);an.caja=()=>V3(-W/2+1,-H/2+1,10.2);an.palanca=()=>V3(-9,13,9.7);
  return{g,anMap:an,ex:[],ex0:0,pitch:.6};
}
/* ---- cuadro eléctrico ---- */
function modulo(g,x,y,w,label,col,lever){
  g.add(box(w,9,6,'#F2F2EE',x,y,3,{eo:.5}));g.add(box(w*.55,1.8,1.8,lever||'#2B2F38',x,y+1.5,6.4,{eo:.4}));
  g.add(box(w*.75,2.4,.2,col||'#2B6CB0',x,y-2.2,6.1,{noedge:true}));
  g.add(txtPlane(label,w*.9,2.6,x,y-3.7,6.2,{fs:.62}));
}
function sCuadro(){
  const g=new THREE.Group(),an={};
  g.add(box(54,40,2,'#D7DBE3',0,0,-1,{eo:.4}));
  [-8,8].forEach((y)=>{});
  const rails=(y)=>g.add(box(50,3.5,.8,'#9AA0AA',0,y,.4,{eo:.5}));
  rails(8);rails(-12);
  // fila 1: IGA + ID
  modulo(g,-9,8,3.6,'IGA\n25/40A','#2B6CB0','#8B1E1E');modulo(g,-3.4,8,3.6,'ID\n30mA','#B83280','#2B2F38');
  // fila 2: PIAs
  const pias=[['C1\n10 A','#E8B100'],['C2\n16 A','#2F9E44'],['C3\n25 A','#D9480F'],['C4\n20 A','#1C7ED6'],['C5\n16 A','#9C36B5']];
  pias.forEach((p,i)=>modulo(g,-16+i*4.2,-12,3.6,p[0],p[1]));
  // pletinas de conexión
  g.add(box(26,1,1.2,'#B87333',-3,-5.3,2.2,{eo:.3}));
  // cables salida
  const sal=[C_FASE,C_FASE,C_FASE,C_FASE,C_FASE];pias.forEach((p,i)=>{g.add(pipe([[-16+i*4.2,-17,3],[-16+i*4.2,-24,3],[-16+i*4.2-3+(i*3),-30,3]],C_FASE,.45,{round:1}))});
  g.add(pipe([[-9,13,3],[-9,19,3],[-9,28,3]],C_FASE,.9,{round:0}));g.add(pipe([[-10.6,13,3],[-10.6,20,3],[-12,28,3]],C_NEU,.9,{round:0}));
  an.iga=()=>V3(-9,8,6.5);an.id=()=>V3(-3.4,8,6.5);an.pia1=()=>V3(-16,-12,6.5);an.pia2=()=>V3(-11.8,-12,6.5);an.pia3=()=>V3(-7.6,-12,6.5);an.pia4=()=>V3(-3.4,-12,6.5);an.pia5=()=>V3(.8,-12,6.5);an.carril=()=>V3(14,-12,1);an.pletina=()=>V3(7,-5.3,2.8);an.entrada=()=>V3(-9,24,3);
  return{g:scaleG(g,2.4),anMap:scaleAn(an,2.4),ex:[],ex0:0,pitch:.3};
}
function scaleG(g,s){g.scale.setScalar(s);const o=new THREE.Group();o.add(g);return o}
function scaleAn(an,s){const r={};for(const k in an){const f=an[k];r[k]=()=>f().multiplyScalar(s)}return r}
/* ---- cables y tubos ---- */
function sCables(){
  const g=new THREE.Group(),an={};
  g.add(box(120,2,60,'#E6E3DA',0,-1,0,{eo:.3}));
  const spec=[[1.5,.30,C_FASE,'1,5 mm²'],[2.5,.36,C_FASE,'2,5 mm²'],[4,.43,C_FASE,'4 mm²'],[6,.49,C_FASE,'6 mm²']];
  spec.forEach((s,i)=>{const z=-20+i*13,r=s[1]*7,len=38;
    const c=cyl(r,len,s[2],-40+len/2,r,z,[0,0,Math.PI/2]);g.add(c);
    const cu=cyl(s[0]===1.5?r*.52:s[0]===2.5?r*.55:s[0]===4?r*.6:r*.62,6,0xC9772E,-40-3,r,z,[0,0,Math.PI/2]);g.add(cu);
    an['c'+i]=()=>V3(-20,r*1.8,z);
    // etiqueta
    g.add(txtPlane(s[3],10,4,-48,.2,z+0,{rx:-Math.PI/2,fs:.7}));
  });
  // tubos
  const tub=[[16,3.2,0],[20,3.8,0],[25,4.6,0]];
  tub.forEach((tb,i)=>{const x=22,z=-20+i*20,r=tb[1],len=34;
    const t=cyl(r,len,0xE5762A,x+len/2,r,z,[0,0,Math.PI/2]);t.material.transparent=true;t.material.opacity=.45;g.add(t);
    for(let k=0;k<12;k++){const ring=new THREE.Mesh(new THREE.TorusGeometry(r,.22,6,20),MATL(0xC9601C));ring.position.set(x+2+k*2.8,r,z);ring.rotation.y=Math.PI/2;g.add(ring)}
    const n=i===0?3:3;[C_FASE,C_NEU].forEach((c,j)=>g.add(cyl(r*.28,len-2,c,x+len/2,r*.7+j*.0,z+(j?1:-1)*r*.4,[0,0,Math.PI/2])));
    g.add(cyl(r*.28,len-2,0x2E9E3F,x+len/2,r*1.35,z,[0,0,Math.PI/2]));
    an['t'+i]=()=>V3(x+len*.55,r*2.2,z);
    g.add(txtPlane('Ø'+tb[0],9,4,x-6,.2,z+0,{rx:-Math.PI/2,fs:.7}));
  });
  an.cobre=()=>V3(-43,1.2,-20);an.aislante=()=>V3(-20,2.4,-7);
  return{g,anMap:an,ex:[],ex0:0,pitch:.5};
}
/* ---- caja de mecanismo empotrada (corte por el eje) ---- */
function sCajaEmpotrada(){
  const g=new THREE.Group(),an={};
  g.add(box(22,54,10.6,{p:'brick'},-11,27,-1.7));
  g.add(box(18.75,54,3.4,{p:'brick'},-12.625,27,5.2));
  g.add(box(3.25,46,3.4,{c:'#E9E2C8'},-1.625,31,5.2,{op:.45,eo:.5}));
  g.add(box(22,54,1.6,'#EFEAD9',-11,27,8.1,{eo:.3}));
  g.add(pipe([[-.9,6,5.4],[-.9,40,5.4]],0xE5762A,.9,{round:0}));
  g.add(box(3.4,6.8,4.6,'#C9D5E8',-1.7,22,5.5,{eo:.6,op:.75}));
  g.add(box(4.3,8.6,.8,'#F4F3EE',-2.15,22,9.3,{eo:.5}));g.add(box(2.6,5.2,.5,'#E4E2DA',-1.3,22,9.9,{eo:.4}));
  g.add(pipe([[-1.4,22,4.6],[-1.4,28,5.0],[-1.0,40,5.4]],C_FASE,.28,{round:1}));g.add(pipe([[-.5,22,4.6],[-.5,28,5.0],[-.3,40,5.4]],C_NEU,.28,{round:1}));
  an.ladrillo=()=>V3(-8,12,-3);an.tubo=()=>V3(0,36,5.4);an.roza=()=>V3(0,12,5.4);an.caja=()=>V3(0,22,5.5);an.mecanismo=()=>V3(0,22,9.6);an.guarnecido=()=>V3(0,48,8.5);an.cable=()=>V3(-.4,32,5.2);
  return{g,anMap:an,ex:[],ex0:0,pitch:.3};
}
/* ---- alturas y distancias ---- */
function sAlturas(){
  const g=new THREE.Group(),an={};
  g.add(box(200,14,20,'conc',0,-7,0));
  g.add(box(200,260,12,'#E7E3D8',0,130,-6,{eo:.15}));
  // puerta
  g.add(box(84,206,4,'#B98A5A',-50,103,.2,{eo:.3}));g.add(box(5,210,13,'#EDEDE8',-94,105,-3,{eo:.3}));g.add(box(5,210,13,'#EDEDE8',-6,105,-3,{eo:.3}));
  // rodapié
  g.add(box(200,8,1,'#EFEFE9',0,4,.5,{eo:.3}));
  // mecanismos: interruptor a 105, enchufe a 30, encimera 110 + enchufe a 115
  const mec=(x,y)=>{g.add(box(8.6,8.6,1.3,'#F4F3EE',x,y,.7,{eo:.5}));g.add(box(5,5,.6,'#E4E2DA',x,y,1.4,{eo:.3}))};
  mec(18,105);mec(60,30);mec(60,115);
  g.add(box(70,4,60,'#9B9C9E',60,110-2,30,{eo:.4}));g.add(box(70,90,2,'#D9DDE4',60,55,-.5,{eo:.2}));
  an.h1=dim(g,[34,0,2],[34,105,2],0x2F3B52,.4);
  an.h2=dim(g,[78,0,2],[78,30,2],0x2F3B52,.4);
  an.h3=dim(g,[102,0,2],[102,115,2],0x2F3B52,.4);
  an.d1=dim(g,[0,125,2],[18-4.3,125,2],0x2F3B52,.4);
  an.sw=()=>V3(18,105,1.8);an.en=()=>V3(60,30,1.8);an.enc=()=>V3(60,115,1.8);an.marco=()=>V3(-6,150,3);an.encimera=()=>V3(90,108,50);
  return{g,anMap:an,ex:[],ex0:0,pitch:.18};
}
/* ---- recorrido de tubos en una habitación ---- */
function sEstancia(){
  const g=new THREE.Group(),an={};
  g.add(box(300,6,260,'#CFC8B6',0,-3,0));
  g.add(box(300,260,6,'#E7E3D8',0,130,-133,{eo:.2}));g.add(box(6,260,260,'#E1DDD0',-153,130,0,{eo:.2}));
  const T=C_RET;
  // punto de luz en techo (lámpara)
  g.add(cyl(14,3,0xF4F3EE,40,252,-60,[0,0,0]));
  const bulb=new THREE.Mesh(new THREE.SphereGeometry(8,16,12),new THREE.MeshLambertMaterial({color:0xFFE9A6,emissive:0x6A5A20}));bulb.position.set(40,242,-60);g.add(bulb);
  // caja de derivación techo
  g.add(box(14,3,14,'#EDEBE4',-120,257,-60,{eo:.4}));
  g.add(pipe([[-120,257,-60],[40,257,-60],[40,252,-60]],0xE5762A,2,{round:0}));
  // bajante al interruptor
  g.add(pipe([[-120,257,-60],[-120,105,-60]],0xE5762A,2,{round:0}));
  g.add(box(9,9,2,'#F4F3EE',-120,105,-126,{eo:.4}));
  // pared trasera: interruptor + enchufes a 30
  g.add(pipe([[-120,257,-128],[-120,105,-128]],0xE5762A,2,{round:0}));
  [[ -30],[70]].forEach(([x])=>g.add(box(9,9,2,'#F4F3EE',x,30,-127.5,{eo:.4})));
  g.add(pipe([[-30,30,-128],[-30,200,-128],[-120,200,-128]],0x2E6FD8,2,{round:0}));g.add(pipe([[70,30,-128],[70,200,-128],[-30,200,-128]],0x2E6FD8,2,{round:0}));
  an.deriv=()=>V3(-120,257,-60);an.techo=()=>V3(-40,257,-60);an.baja=()=>V3(-120,160,-60);an.interruptor=()=>V3(-120,105,-125);an.enchufe=()=>V3(70,30,-126);an.tuboEnch=()=>V3(30,200,-128);an.lampara=()=>V3(40,252,-60);
  return{g,anMap:an,ex:[],ex0:0,pitch:.35};
}
