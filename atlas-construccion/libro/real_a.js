/* ===== Objetos reales en 3D (cm) — parte A: fontanería, sanitarios, clima, gas, radiadores ===== */
const WHT='#F4F3EE',GRY='#B7BDC8',DKG='#2B2F38',C_RED=0xD32F2F,C_BLU=0x2E6FD8,C_CU=0xC9772E,C_STEEL=0x9AA0AA;
function floorSlab(g,w,d,col){g.add(box(w,4,d,col||'#CFC8B6',0,-2,0,{eo:.25}))}
function backWall(g,w,h,z,col){g.add(box(w,h,6,col||'#E7E3D8',0,h/2,z-3,{eo:.2}))}
function valveObj(g,x,y,z,col){
  g.add(cyl(2.4,7,C_CU,x,y,z,[0,0,Math.PI/2]));g.add(cyl(.7,5,C_STEEL,x,y+3.4,z));g.add(box(9,1.2,2,col||'#D32F2F',x,y+6,z,{noedge:true}));
}
function toiletObj(g,x,y,z){
  const b=cyl(17,16,0xF4F3EE,x,y+8,z+8);b.scale.set(1,1,1.35);g.add(b);
  g.add(box(38,42,16,WHT,x,y+31,z-14));g.add(box(40,3,18,'#E4E2DA',x,y+53,z-14,{eo:.3}));
  const seat=new THREE.Mesh(new THREE.TorusGeometry(15,2,8,24),MATL(0xE9E7DF));seat.rotation.x=Math.PI/2;seat.scale.set(1,1.3,1);seat.position.set(x,y+17,z+8);g.add(seat);
  g.add(cyl(3,1.4,C_STEEL,x+12,y+54.5,z-14));
}
function sinkObj(g,x,y,z){
  g.add(box(56,10,42,WHT,x,y,z));g.add(box(44,2,30,'#DDE3EA',x,y+5.2,z+1,{eo:.3}));g.add(cyl(2,.4,0x6C727D,x,y+6.3,z+1));
  g.add(cyl(1.6,12,C_STEEL,x,y+12,z-16));g.add(pipe([[x,y+17,z-16],[x,y+19,z-10],[x,y+19,z-4],[x,y+13,z-2]],C_STEEL,1.2,{round:2}));
  g.add(box(2.4,6,2.4,'#2E6FD8',x-6,y+8,z-16,{noedge:true}));g.add(box(2.4,6,2.4,'#D32F2F',x+6,y+8,z-16,{noedge:true}));
}
function showerTray(g,x,y,z){
  g.add(box(90,7,90,WHT,x,y+3.5,z));g.add(box(80,1,80,'#DDE3EA',x,y+7.3,z,{eo:.25}));g.add(cyl(4.5,.5,0x6C727D,x+20,y+7.9,z+20));
}
function heaterTank(g,x,y,z,h,r){
  const c=cyl(r,h,0xF4F3EE,x,y+h/2,z);g.add(c);g.add(cyl(r*1.02,2,0xD9DEE6,x,y+1,z));g.add(cyl(r*1.02,2,0xD9DEE6,x,y+h-1,z));
  g.add(cyl(3.2,2.4,0x2B2F38,x,y+h*.42,z+r+.6,[Math.PI/2,0,0]));g.add(box(6,1.6,.6,'#2E9E3F',x,y+h*.6,z+r+.4,{noedge:true}));
}
function splitInt(g,x,y,z){
  g.add(box(92,30,22,WHT,x,y,z,{eo:.35}));g.add(box(88,5,14,'#E4E6EA',x,y-15.5,z+5,{eo:.3}));g.add(box(90,1.6,12,'#B8BDC7',x,y-17.5,z+5,{eo:.3}));
  g.add(box(6,1.6,.4,'#2E9E3F',x+34,y+4,z+11.2,{noedge:true}));
}
function splitExt(g,x,y,z){
  g.add(box(84,58,32,'#E6E8EC',x,y,z,{eo:.35}));const gr=cyl(21,2,0x23262C,x-10,y,z+16.2,[Math.PI/2,0,0]);g.add(gr);
  [0,2.1,4.2].forEach(a=>{const b=box(38,2.6,.6,'#6C727D',x-10,y,z+17.4,{noedge:true});b.rotation.z=a;g.add(b)});
  g.add(box(10,48,3,'#B8BDC7',x+34,y,z+16.5,{eo:.3}));
  g.add(box(6,6,36,'#98A0AE',x-30,y-32,z,{eo:.3}));g.add(box(6,6,36,'#98A0AE',x+30,y-32,z,{eo:.3}));
}
function radiatorObj(g,x,y,z,n,h){
  n=n||8;h=h||60;
  for(let i=0;i<n;i++)g.add(box(5.4,h,9,'#F7F7F3',x+i*6.3,y+h/2,z,{eo:.45}));
  g.add(box(n*6.3,3,9,'#E9E9E4',x+(n-1)*3.15,y+h+1.5,z,{eo:.4}));g.add(box(n*6.3,3,9,'#E9E9E4',x+(n-1)*3.15,y-1.5,z,{eo:.4}));
}
function hoodObj(g,x,y,z){
  const f=new THREE.Mesh(new THREE.CylinderGeometry(14,36,20,4,1),MATL(0xDADFE6));f.rotation.y=Math.PI/4;f.scale.set(1.5,1,.9);f.position.set(x,y,z);g.add(f);
  g.add(box(20,60,16,'#C9CFD8',x,y+40,z-2,{eo:.4}));
}
function cooktop(g,x,y,z){
  g.add(box(70,3,52,'#23262C',x,y,z,{eo:.3}));[[-16,-10],[16,-10],[-16,12],[16,12]].forEach(a=>g.add(cyl(8,.4,0x4A4F5A,x+a[0],y+1.7,z+a[1])));
}
function gasCock(g,x,y,z){g.add(pipe([[x,y,z],[x,y-14,z]],0xE0B040,1.2,{round:0}));g.add(box(5,3,3,'#E0B040',x,y-14,z+.6));g.add(box(2,8,1.4,'#D32F2F',x,y-8,z+3,{noedge:true}));g.add(cyl(3.2,2,0xD9B24A,x,y-18,z+1,[Math.PI/2,0,0]))}

/* 1. Fontanería: de la acometida al grifo */
function rFontaneria(){
  const g=new THREE.Group();floorSlab(g,290,100);backWall(g,290,150,-45);
  // contador
  g.add(box(22,30,12,'#8FA0B6',-120,100,-38));g.add(cyl(7,2,0xF4F3EE,-120,104,-31.5,[Math.PI/2,0,0]));g.add(box(9,2.4,.3,'#2B2F38',-120,104,-30.4,{noedge:true}));
  g.add(pipe([[-120,85,-38],[-120,62,-38]],C_BLU,1.5,{round:0}));valveObj(g,-120,66,-38);
  // distribución fría (azul) y caliente (roja)
  g.add(pipe([[-120,55,-38],[-120,36,-38],[110,36,-38]],C_BLU,1.5,{round:3}));
  heaterTank(g,-62,45,-30,78,17);
  g.add(pipe([[-62,36,-38],[-62,45,-38]],C_BLU,1.3,{round:0}));
  g.add(pipe([[-62,123,-30],[-62,132,-38],[22,132,-38],[22,92,-38]],C_RED,1.3,{round:3}));
  g.add(pipe([[22,36,-38],[22,64,-38],[22,92,-38]],C_BLU,1.3,{round:0}));
  valveObj(g,22,48,-38,'#2E6FD8');valveObj(g,92,36,-38,'#2E6FD8');
  sinkObj(g,22,78,-22);toiletObj(g,92,0,-18);
  g.add(pipe([[92,36,-38],[92,52,-38]],C_BLU,1.3,{round:0}));
  return{g,an:[()=>V3(-120,100,-30),()=>V3(-120,66,-33),()=>V3(-40,36,-36),()=>V3(22,48,-33),()=>V3(-62,95,-12),()=>V3(60,60,-10)],pitch:.3,ex:[],ex0:0};
}
/* 2. Aparatos sanitarios */
function rSanitarios(){
  const g=new THREE.Group();floorSlab(g,280,130);backWall(g,280,170,-60);g.add(box(6,170,130,'#E1DDD0',-143,85,0,{eo:.2}));
  showerTray(g,-85,0,-15);
  const gl=box(90,170*0.55,1,'#8EC5EC',-85,100,33,{op:.35,eo:.5});g.add(gl);g.add(box(1,95,90,'#8EC5EC',-40,100,-15,{op:.0,noedge:true}));
  g.add(cyl(1,4,C_STEEL,-85,150,-55));g.add(pipe([[-85,145,-56],[-85,150,-50],[-70,158,-50]],C_STEEL,1,{round:2}));g.add(cyl(7,1.4,C_STEEL,-70,158,-47));
  toiletObj(g,25,0,-30);
  g.add(box(64,50,38,'#B98A5A',100,35,-40));sinkObj(g,100,63,-38);
  g.add(box(46,60,2,'#CFE6F4',100,125,-56,{eo:.5}));
  // desagües
  g.add(pipe([[-65,-3,5],[-65,-3,-55]],0x6C727D,2.6,{round:0}));
  return{g,an:[()=>V3(-65,8,5),()=>V3(25,30,-14),()=>V3(100,50,-20),()=>V3(100,86,-52),()=>V3(-85,100,33),()=>V3(100,125,-54)],pitch:.35,ex:[],ex0:0};
}
/* 3. Splits */
function rSplits(){
  const g=new THREE.Group();floorSlab(g,300,100);
  g.add(box(150,150,6,'#E7E3D8',-70,75,-26,{eo:.2}));// interior wall
  splitInt(g,-70,120,-18);
  // pared exterior
  g.add(box(110,150,6,'#D8D2C2',105,75,-26,{eo:.2}));splitExt(g,105,50,-4);
  // línea frigorífica (cobre y aislante)
  g.add(pipe([[-30,108,-24],[-10,108,-24],[40,100,-24],[40,60,-24],[70,60,-24]],0x3B3F47,2.2,{round:5}));
  g.add(pipe([[-30,112,-24],[-10,112,-24],[44,104,-24],[44,64,-24],[70,64,-24]],0xB06A2A,1.1,{round:5}));
  // condensados
  g.add(pipe([[-100,108,-22],[-112,100,-22],[-112,10,-22],[-90,0,-22]],0x6B9AD8,1.2,{round:4}));
  // linea eléctrica
  g.add(pipe([[-70,150,-24],[-70,140,-24],[20,140,-24],[20,34,-24],[70,34,-24]],0xE5762A,1.2,{round:4}));
  g.add(box(10,10,3,'#F4F3EE',70,34,-22));
  return{g,an:[()=>V3(105,50,12),()=>V3(10,106,-22),()=>V3(-70,120,-6),()=>V3(-112,60,-22),()=>V3(20,80,-22),()=>V3(70,34,-19)],pitch:.28,ex:[],ex0:0};
}
/* 4. Gas, humos y ventilación */
function rGas(){
  const g=new THREE.Group();floorSlab(g,300,100);backWall(g,300,220,-35);
  g.add(box(160,86,60,'#CFD6E0',-40,43,-6));cooktop(g,-40,87,-6);
  hoodObj(g,-40,160,-12);g.add(pipe([[-40,205,-18],[-40,222,-18]],0x9AA0AA,5,{round:0}));
  gasCock(g,-90,64,-32);g.add(pipe([[-90,46,-32],[-90,30,-32],[-52,30,-32],[-52,48,-32]],0xE0B040,1.2,{round:3}));
  // extractor ventilación forzada
  g.add(box(30,30,10,'#E4E6EA',90,160,-31,{eo:.3}));g.add(cyl(11,2,0x23262C,90,160,-25.6,[Math.PI/2,0,0]));
  [0,2.1,4.2].forEach(a=>{const b=box(18,2,.6,'#6C727D',90,160,-24.4,{noedge:true});b.rotation.z=a;g.add(b)});
  g.add(box(26,34,1,'#FFFFFF',120,110,-33.5,{eo:.4}));g.add(txtPlane('CERT.\nGAS',20,14,120,110,-32.8,{fs:.5}));
  return{g,an:[()=>V3(-90,52,-28),()=>V3(-40,88,-6),()=>V3(-40,150,-12),()=>V3(-40,215,-18),()=>V3(90,160,-24),()=>V3(120,110,-32)],pitch:.25,ex:[],ex0:0};
}
/* 5. Radiadores y toalleros */
function rRadiadores(){
  const g=new THREE.Group();floorSlab(g,240,80);backWall(g,240,140,-30);
  radiatorObj(g,-30,12,-22,10,60);
  // soportes
  [-24,24,56].forEach(x=>g.add(box(4,5,5,'#8A8F99',x,26,-28.5)));
  // llave de reglaje (arriba) y detentor (abajo)
  g.add(cyl(2.2,6,C_CU,-38,14,-22,[0,0,Math.PI/2]));g.add(box(4,8,3.4,'#E5E7EC',-40,18,-22));
  g.add(cyl(2.2,6,C_CU,36,14,-22,[0,0,Math.PI/2]));g.add(cyl(1.6,5,0x9AA0AA,36,18,-22));
  // tuberías
  g.add(pipe([[-38,14,-22],[-52,14,-26],[-52,14,-29],[-52,-2,-29]],C_CU,1.1,{round:2}));g.add(pipe([[40,14,-22],[56,14,-26],[56,-2,-29]],C_CU,1.1,{round:2}));
  // purgador
  g.add(cyl(1.6,5,0xC9A24B,30,74,-22));g.add(cyl(.5,2,0x6C727D,30,78,-22));
  // toallero
  const tx=98;for(let i=0;i<7;i++)g.add(box(36,1.3,1.3,'#F7F7F3',tx,30+i*9,-24,{eo:.3}));g.add(box(2,62,1.8,'#F7F7F3',tx-18,59,-24,{eo:.3}));g.add(box(2,62,1.8,'#F7F7F3',tx+18,59,-24,{eo:.3}));
  return{g,an:[()=>V3(-10,40,-16),()=>V3(-38,18,-18),()=>V3(36,14,-18),()=>V3(24,26,-26),()=>V3(30,78,-20),()=>V3(98,60,-22)],pitch:.2,ex:[],ex0:0};
}
