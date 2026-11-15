/* ===== Fontanería y climatización: instalaciones reales (cm) ===== */
function ductFlex(g,a,b,r,col){
  const A=V3(...a),B=V3(...b),L=A.distanceTo(B),c=new THREE.Mesh(new THREE.CylinderGeometry(r,r,L,16),new THREE.MeshLambertMaterial({color:col||0xC9CED8}));orient(c,A,B);g.add(c);
  const n=Math.max(2,Math.floor(L/4)),q=new THREE.Quaternion().setFromUnitVectors(V3(0,0,1),B.clone().sub(A).normalize());
  for(let i=1;i<n;i++){const ring=new THREE.Mesh(new THREE.TorusGeometry(r,.35,6,18),MATL(0x9AA0AA));ring.position.copy(A.clone().lerp(B,i/n));ring.quaternion.copy(q);g.add(ring)}
}
function arrow1(g,a,b,col,r){
  r=r||1.2;const A=V3(...a),B=V3(...b),L=A.distanceTo(B),d=B.clone().sub(A).normalize(),c=r*3.2;
  const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,Math.max(.1,L-c),8),MATL(col||0xF26A1B));orient(m,A,B.clone().sub(d.clone().multiplyScalar(c)));g.add(m);
  const k=new THREE.Mesh(new THREE.ConeGeometry(r*2.2,c*1.2,12),MATL(col||0xF26A1B));k.position.copy(B.clone().sub(d.clone().multiplyScalar(c*.6)));k.quaternion.setFromUnitVectors(V3(0,1,0),d);g.add(k);
}
function checkValve(g,x,y,z){g.add(cyl(2.6,8,0xC9772E,x,y,z,[0,0,Math.PI/2]));g.add(box(5,.6,.6,'#F4F3EE',x,y+3,z,{noedge:true}))}
function safetyGroup(g,x,y,z){g.add(cyl(3,9,0xC9A24B,x,y,z,[0,0,Math.PI/2]));g.add(cyl(2.4,6,0xC9A24B,x,y+5,z));g.add(box(8,1.2,1.6,'#D32F2F',x,y+9.5,z,{noedge:true}));g.add(cyl(1.8,6,0xC9A24B,x,y-5,z))}
function manometer(g,x,y,z,col){
  g.add(cyl(6,2.4,0xDADFE6,x,y,z,[Math.PI/2,0,0]));g.add(cyl(5,.4,0xFFFFFF,x,y,z+1.3,[Math.PI/2,0,0]));
  const n=box(.5,4.6,.3,'#D32F2F',x+1.6,y+1.6,z+1.7,{noedge:true});n.rotation.z=-.8;g.add(n);g.add(cyl(1.4,4,0xC9A24B,x,y-7,z,[0,0,0]));
}
function clinicSink(g,x,y,z){
  g.add(box(64,12,46,WHT,x,y,z));g.add(box(52,3,34,'#DDE3EA',x,y+5.6,z+1,{eo:.3}));g.add(cyl(2.2,.4,0x6C727D,x,y+7.2,z+1));
  g.add(box(64,26,3,WHT,x,y+19,z-21.5,{eo:.4}));
  g.add(cyl(1.6,16,C_STEEL,x,y+14,z-17));g.add(pipe([[x,y+22,z-17],[x,y+26,z-10],[x,y+26,z+2],[x,y+20,z+4]],C_STEEL,1.3,{round:3}));
  g.add(box(2,1.4,22,'#C9CED8',x,y+16,z-9,{eo:.3}));
}
/* ===== FONTANERÍA ===== */
function fInstalacionBano(){
  const g=new THREE.Group();floorSlab(g,390,190);
  g.add(box(390,160,6,'#E7E3D8',0,80,-88,{eo:.2}));g.add(box(6,160,70,'#E1DDD0',78,80,-52,{op:.5,eo:.3}));
  // acometida, contador y llave general
  g.add(pipe([[-175,-20,-82],[-175,70,-82]],C_BLU,2,{round:0}));
  g.add(box(18,24,10,'#8FA0B6',-175,98,-80));g.add(cyl(6,2,0xF4F3EE,-175,102,-74.5,[Math.PI/2,0,0]));g.add(box(8,2.4,.3,'#2B2F38',-175,102,-73.5,{noedge:true}));
  g.add(pipe([[-175,70,-82],[-175,86,-82]],C_BLU,2,{round:0}));valveObj(g,-175,60,-82);
  // red fría (azul) y caliente (roja)
  g.add(pipe([[-175,50,-82],[-175,42,-82],[160,42,-82]],C_BLU,1.5,{round:3}));
  g.add(pipe([[-130,150,-82],[-130,138,-82],[160,138,-82]],C_RED,1.5,{round:3}));
  // termo
  heaterTank(g,-130,52,-68,100,16);g.add(pipe([[-130,42,-82],[-130,52,-74]],C_BLU,1.5,{round:0}));g.add(pipe([[-130,152,-72],[-130,160,-82],[-130,138,-82]],C_RED,1.5,{round:0}));
  checkValve(g,-130,46,-82);
  // derivaciones con llave de corte
  const drop=(x,yc,yh)=>{if(yc!==null){g.add(pipe([[x,42,-82],[x,yc,-82]],C_BLU,1.2,{round:0}));valveObj(g,x,50,-82,'#2E6FD8')}if(yh!==null)g.add(pipe([[x,138,-82],[x,yh,-82]],C_RED,1.2,{round:0}))};
  // ducha
  showerTray(g,-70,0,-40);drop(-76,100,100);drop(-64,null,null);g.add(pipe([[-64,138,-82],[-64,100,-82]],C_RED,1.2,{round:0}));g.add(pipe([[-64,42,-82],[-64,100,-82]],C_BLU,1.2,{round:0}));
  g.add(box(16,8,6,'#C9CED8',-70,104,-80,{eo:.3}));g.add(cyl(1,16,C_STEEL,-70,124,-80));g.add(cyl(6,1.4,C_STEEL,-70,134,-72,[Math.PI/2.5,0,0]));
  // inodoro (solo fría)
  toiletObj(g,-5,0,-62);drop(-5,44,null);
  // lavabo (fría + ACS)
  sinkObj(g,36,82,-66);drop(30,72,null);g.add(pipe([[42,138,-82],[42,96,-82]],C_RED,1.2,{round:0}));g.add(pipe([[30,42,-82],[30,92,-82]],C_BLU,1.2,{round:0}));
  // gabinete: lavamanos clínico y punto de agua
  clinicSink(g,118,84,-64);g.add(pipe([[112,42,-82],[112,100,-82]],C_BLU,1.2,{round:0}));g.add(pipe([[124,138,-82],[124,100,-82]],C_RED,1.2,{round:0}));valveObj(g,112,50,-82,'#2E6FD8');
  g.add(cyl(1.4,10,C_STEEL,168,100,-76,[Math.PI/2,0,0]));g.add(pipe([[168,42,-82],[168,100,-82]],C_BLU,1.2,{round:0}));g.add(pipe([[172,138,-82],[172,100,-82]],C_RED,1.2,{round:0}));
  return{g,an:[()=>V3(-175,100,-74),()=>V3(-175,60,-78),()=>V3(-130,100,-50),()=>V3(-40,42,-80),()=>V3(60,138,-80),()=>V3(30,50,-78),()=>V3(-70,110,-72),()=>V3(-5,30,-44),()=>V3(36,86,-52),()=>V3(118,100,-50),()=>V3(168,100,-70)],pitch:.35,ex:[],ex0:0};
}
function fTermo(){
  const g=new THREE.Group();floorSlab(g,320,100);g.add(box(320,200,6,'#E7E3D8',0,100,-48,{eo:.2}));
  heaterTank(g,60,45,-24,110,22);
  // soportes
  [60,130].forEach(y=>g.add(box(30,4,10,'#8A8F99',60,y,-42,{eo:.4})));
  // entrada fría con válvulas
  g.add(pipe([[-130,30,-42],[-130,36,-42],[40,36,-42],[40,36,-24]],C_BLU,1.6,{round:3}));
  valveObj(g,-100,36,-42,'#2E6FD8');checkValve(g,-70,36,-42);safetyGroup(g,-35,36,-42);
  g.add(pipe([[-5,36,-42],[44,40,-24]],C_BLU,1.6,{round:3}));
  // vaso de expansión
  g.add(cyl(11,26,0x2E6FD8,-60,70,-30));g.add(pipe([[-60,60,-30],[-60,50,-36],[-60,36,-42]],C_BLU,1.2,{round:2}));
  // desagüe del grupo de seguridad
  g.add(cyl(4,4,0xF4F3EE,-35,16,-42));g.add(pipe([[-35,26,-42],[-35,20,-42]],0x9AA0AA,1.4,{round:0}));g.add(pipe([[-35,12,-42],[-35,2,-42],[-35,-6,-42],[-60,-6,-42]],0x8A8F99,2.2,{round:3}));
  // salida ACS
  g.add(pipe([[60,152,-24],[60,162,-24],[60,172,-42],[150,172,-42]],C_RED,1.6,{round:3}));
  // conexión eléctrica
  g.add(box(10,14,5,WHT,125,110,-44));g.add(box(3,5,2.4,'#D32F2F',125,112,-40.5,{noedge:true}));g.add(pipe([[125,104,-44],[125,80,-44],[84,80,-30],[84,70,-14]],0xE5762A,1,{round:3}));
  return{g,an:[()=>V3(-100,40,-38),()=>V3(-70,40,-38),()=>V3(-35,44,-38),()=>V3(-60,82,-20),()=>V3(60,120,-2),()=>V3(120,172,-42),()=>V3(-35,14,-38),()=>V3(60,130,-37),()=>V3(125,111,-40)],pitch:.28,ex:[],ex0:0};
}
var fTuberias=function(){
  const g=new THREE.Group();g.add(box(300,6,130,'#E6E3DA',0,-3,0,{eo:.3}));
  // colector con llaves
  g.add(box(70,12,12,'#B8BDC7',-95,10,-35,{eo:.5}));
  [-25,-8,9,26].forEach((dx,i)=>{const x=-95+dx;valveObj(g,x,24,-35,i%2?'#2E6FD8':'#D32F2F');g.add(pipe([[x,16,-35],[x,22,-35]],0x9AA0AA,1.2,{round:0}));
    ductFlex(g,[x,10,-29],[x+(i-1.5)*8,6,10],2.1,0xBBD3F0);g.add(pipe([[x,10,-29],[x+(i-1.5)*8,6,10]],i%2?C_BLU:C_RED,1.1,{round:0}))});
  // multicapa con capas
  g.add(cyl(1.0,34,0xEDEDE8,-10,2.4,10,[0,0,Math.PI/2]));g.add(cyl(1.25,28,0xC9CED8,-13,2.4,10,[0,0,Math.PI/2]));g.add(cyl(1.55,22,0xEDEDE8,-16,2.4,10,[0,0,Math.PI/2]));
  g.add(cyl(1.1,34,0xC9CED8,-10,2.4,10,[0,0,Math.PI/2]).clone());
  // cobre
  g.add(cyl(1.7,40,0xC9772E,-12,2,25,[0,0,Math.PI/2]));
  // PP-R verde
  g.add(cyl(1.9,40,0x3C9A4F,-12,2.2,40,[0,0,Math.PI/2]));
  // aislante con tubo rojo
  g.add(cyl(1.4,40,0xD32F2F,-12,3.5,55,[0,0,Math.PI/2]));g.add(cyl(3.2,26,0x2B2F38,-5,3.5,55,[0,0,Math.PI/2]));
  // te y codo
  g.add(cyl(2.2,10,0xC9772E,70,3,10));g.add(cyl(2.2,10,0xC9772E,70,3,10,[0,0,Math.PI/2]));g.add(cyl(2.2,10,0xC9772E,85,3,40,[Math.PI/2,0,0]));g.add(cyl(2.2,10,0xC9772E,92,3,40,[0,0,Math.PI/2]));
  // abrazadera a pared
  g.add(box(2,12,10,'#8A8F99',110,10,-50,{eo:.4}));g.add(cyl(3,20,0x3C9A4F,110,10,-30,[Math.PI/2,0,0]));g.add(box(8,1,8,'#6C727D',110,12,-48));
  return{g,an:[()=>V3(-95,14,-30),()=>V3(-90,8,8),()=>V3(-16,2.5,10),()=>V3(-6,2,25),()=>V3(-6,2.4,40),()=>V3(-5,6.5,55),()=>V3(110,13,-48),()=>V3(70,4,10)],pitch:.6,ex:[],ex0:0};
}
function fDesagues(){
  const g=new THREE.Group();floorSlab(g,320,100,'#CFC8B6');
  g.add(box(320,140,6,'#E7E3D8',0,70,-48,{eo:.2}));
  g.add(box(320,12,100,{p:'conc'},0,-18,0,{op:.55,eo:.3}));
  const GR=0x8A8F99;
  // bajante vertical
  g.add(cyl(5.5,200,GR,-110,40,-38));g.add(cyl(6.2,6,0x6C727D,-110,60,-38));g.add(cyl(8,8,0x6C727D,-110,200,-38));
  // inodoro con manguetón
  toiletObj(g,-30,0,-26);g.add(pipe([[-30,12,-40],[-60,8,-40],[-110,2,-38]],GR,5.5,{round:6}));
  // lavabo con sifón de botella
  sinkObj(g,40,82,-26);
  g.add(cyl(2,16,0xC9CED8,40,66,-24));g.add(cyl(4,12,0xDADFE6,40,56,-24));g.add(pipe([[40,50,-24],[40,46,-30],[0,44,-38],[-110,36,-38]],GR,2.2,{round:3}));
  // ducha con sumidero sifónico
  showerTray(g,95,0,10);g.add(pipe([[115,-6,30],[115,-14,0],[100,-22,-30],[-110,-30,-36]],GR,2.2,{round:6}));
  // pendiente y registro
  arrow1(g,[-20,-34,-28],[-20,-36.5,-28],0xF26A1B,.5);
  g.add(cyl(5,4,0xDADFE6,-110,-6,-30,[Math.PI/2,0,0]));
  return{g,an:[()=>V3(-110,120,-38),()=>V3(-70,8,-40),()=>V3(40,56,-20),()=>V3(115,-14,10),()=>V3(-40,-33,-33),()=>V3(-110,-6,-27),()=>V3(-110,205,-38)],pitch:.35,ex:[],ex0:0};
}
function fGabinete(){
  const g=new THREE.Group();floorSlab(g,300,100);g.add(box(300,200,6,'#E7E3D8',0,100,-48,{eo:.2}));
  clinicSink(g,0,85,-26);
  // soportes y alzado
  g.add(box(4,40,4,'#8A8F99',-26,62,-44,{eo:.4}));g.add(box(4,40,4,'#8A8F99',26,62,-44,{eo:.4}));
  // llaves de escuadra y sifón
  [-9,9].forEach((dx,i)=>{g.add(pipe([[dx,40,-44],[dx,60,-44],[dx*.5,72,-40]],i?C_RED:C_BLU,1.1,{round:2}));valveObj(g,dx,52,-44,i?'#D32F2F':'#2E6FD8')});
  g.add(cyl(1.6,14,0xC9CED8,0,70,-26));g.add(cyl(4,12,0xDADFE6,0,56,-26));g.add(pipe([[0,50,-26],[0,46,-34],[0,40,-44],[0,22,-44],[0,10,-46]],0x8A8F99,2,{round:3}));
  // dosificador y dispensador papel
  g.add(box(10,22,10,'#F4F4F4',-64,115,-42,{eo:.4}));g.add(box(6,4,3,'#2E9E3F',-64,106,-36,{noedge:true}));
  g.add(box(26,34,12,'#F4F4F4',64,125,-40,{eo:.4}));g.add(box(18,1.6,6,'#C9CED8',64,110,-34,{noedge:true}));
  // espejo
  g.add(box(70,60,1.4,'#CFE6F4',0,150,-44.6,{eo:.5}));
  // punto de agua adicional (fregadero técnico)
  g.add(box(46,10,40,'#C9CED8',-120,92,-28,{eo:.4}));g.add(cyl(1.4,16,C_STEEL,-120,106,-44));g.add(pipe([[-120,114,-44],[-120,118,-38],[-120,112,-32]],C_STEEL,1.2,{round:2}));g.add(box(46,86,38,'#B8BDC7',-120,43,-28,{eo:.4}));
  dim(g,[90,0,-6],[90,85,-6],0x2F3B52,.5);
  return{g,an:[()=>V3(0,92,-12),()=>V3(0,106,-17),()=>V3(-9,52,-40),()=>V3(0,56,-22),()=>V3(-64,106,-36),()=>V3(64,115,-34),()=>V3(90,42,-6),()=>V3(-120,106,-44)],pitch:.2,ex:[],ex0:0};
}
var fPrueba=function(){
  const g=new THREE.Group();g.add(box(300,6,100,'#E6E3DA',0,-3,0,{eo:.3}));
  g.add(pipe([[-120,10,-20],[0,10,-20],[0,10,20],[80,10,20]],C_BLU,1.6,{round:4}));
  g.add(pipe([[-120,22,0],[40,22,0],[40,22,30],[110,22,30]],C_RED,1.6,{round:4}));
  [[-120,10,-20,C_BLU],[80,10,20,C_BLU],[-120,22,0,C_RED],[110,22,30,C_RED]].forEach(a=>g.add(cyl(2.4,3,0x6C727D,a[0],a[1],a[2],[0,0,Math.PI/2])));
  // bomba de prueba + manómetro
  g.add(cyl(7,20,0xD32F2F,-140,12,-20));g.add(box(26,2,2,'#2B2F38',-150,26,-20,{eo:.3}));g.add(pipe([[-134,12,-20],[-125,10,-20]],0x2B2F38,1.2,{round:0}));
  manometer(g,-100,28,-20);g.add(pipe([[-100,20,-20],[-100,10,-20]],0xC9A24B,1.2,{round:0}));
  // llaves cerradas
  valveObj(g,-40,10,-20,'#D32F2F');valveObj(g,60,22,0,'#D32F2F');
  return{g,an:[()=>V3(-140,22,-20),()=>V3(-100,30,-19),()=>V3(-120,10,-20),()=>V3(-40,16,-20),()=>V3(110,22,30)],pitch:.5,ex:[],ex0:0};
}
/* ===== CLIMATIZACIÓN ===== */
function cRoom(g,x,w,h,d){g.add(box(w,4,d,'#CFC8B6',x,-2,0,{eo:.25}));g.add(box(w,h,5,'#E7E3D8',x,h/2,-d/2,{eo:.2}))}
function cassetteUnit(g,x,y,z,s){
  g.add(box(s,26,s,'#DADFE6',x,y+13,z,{eo:.45}));g.add(box(s+10,3,s+10,'#F4F4F4',x,y-1.5,z,{eo:.5}));g.add(box(s-14,1,s-14,'#B8BDC7',x,y-3.2,z,{eo:.4}));
  [[1,0],[-1,0],[0,1],[0,-1]].forEach(a=>g.add(box(a[0]?3:s-22,.8,a[0]?s-22:3,'#6C727D',x+a[0]*(s/2-4),y-3.2,z+a[1]*(s/2-4),{noedge:true})));
}
function cSistemas(){
  const g=new THREE.Group();
  [-135,0,135].forEach(x=>{cRoom(g,x,120,120,90);g.add(box(120,3,90,'#F4F3EE',x,120,0,{op:.4,eo:.3}))});
  // split mural
  splitInt(g,-135,100,-38);g.children[g.children.length-1];
  // cassette
  cassetteUnit(g,0,120,0,56);
  // unidad de conductos sobre el techo + rejillas
  g.add(box(70,22,40,'#B8BDC7',135,140,-20,{eo:.45}));[-25,25].forEach(dx=>{ductFlex(g,[135+dx,132,-6],[135+dx,124,20],5,0xC9CED8);g.add(box(30,1.6,12,'#F4F4F4',135+dx,119.5,20,{eo:.4}))});
  // exteriores
  [-135,0,135].forEach(x=>{g.add(box(60,40,22,'#E6E8EC',x,22,-72,{eo:.35}));g.add(cyl(14,1.4,0x23262C,x-6,22,-60,[Math.PI/2,0,0]))});
  return{g,an:[()=>V3(-135,100,-26),()=>V3(0,118,0),()=>V3(135,140,0),()=>V3(160,119,20),()=>V3(135,22,-60)],pitch:.42,ex:[],ex0:0};
}
function cSplit(){
  const g=new THREE.Group();floorSlab(g,360,110);
  g.add(box(26,220,110,{p:'brick'},0,110,0,{eo:.3}));// muro
  g.add(box(160,220,5,'#E7E3D8',-93,110,-50,{eo:.15}));
  g.add(box(12,3,12,'#F4F3EE',-80,220,-40,{op:.0,noedge:true}));g.add(box(160,6,110,'#F4F3EE',-93,223,0,{op:.35,eo:.3}));
  splitInt(g,-90,202,-36);g.add(box(70,22,3,'#8A8F99',-90,202,-46,{eo:.4}));
  // pasamuros
  const pm=cyl(4,40,0xDADFE6,0,190,-36,[0,0,Math.PI/2]);g.add(pm);
  g.add(pipe([[-60,196,-34],[-30,193,-34],[-10,190,-36],[30,188,-36]],0x2B2F38,2.2,{round:4}));g.add(pipe([[-60,200,-34],[-30,197,-34],[-10,194,-36],[30,192,-36],[70,200,-36]],0xB06A2A,1.1,{round:4}));
  g.add(pipe([[-110,196,-34],[-120,200,-30],[-140,180,-20],[-140,40,-20],[-120,30,-30]],0x6B9AD8,1.2,{round:4}));
  // exterior
  splitExt(g,130,70,-20);g.add(box(60,4,50,'#8A8F99',130,36,-20,{eo:.4}));
  g.add(pipe([[30,188,-36],[70,184,-36],[70,100,-36],[100,100,-36]],0x2B2F38,2.2,{round:5}));
  [-30,26].forEach(dx=>g.add(box(40,4,4,'#6C727D',130+dx*0,36,-20+dx*.2,{noedge:true,op:0})));
  dim(g,[-60,222,-36],[-60,208,-36],0x2F3B52,.5);
  return{g,an:[()=>V3(-90,202,-23),()=>V3(-90,202,-47),()=>V3(0,190,-30),()=>V3(-20,191,-34),()=>V3(-140,100,-20),()=>V3(130,70,-6),()=>V3(130,36,5),()=>V3(-60,215,-36)],pitch:.28,ex:[],ex0:0};
}
function cMulti(){
  const g=new THREE.Group();floorSlab(g,380,120);
  g.add(box(150,170,5,'#E7E3D8',-110,85,-55,{eo:.15}));g.add(box(150,170,5,'#E7E3D8',60,85,-55,{eo:.15}));
  splitInt(g,-110,130,-48);splitInt(g,60,130,-48);
  splitExt(g,160,50,-30);g.add(box(70,4,34,'#8A8F99',160,16,-30,{eo:.4}));
  // derivación en Y
  g.add(box(14,8,8,'#C9772E',100,110,-48,{eo:.5}));
  g.add(pipe([[160,100,-38],[130,100,-44],[108,106,-48]],0x2B2F38,2.4,{round:4}));
  g.add(pipe([[92,110,-48],[60,122,-48]],0x2B2F38,2,{round:3}));g.add(pipe([[92,112,-48],[-60,124,-48],[-100,122,-46]],0x2B2F38,2,{round:4}));
  g.add(pipe([[-110,150,-48],[-110,190,-44],[100,190,-44],[160,150,-40]],0xE5762A,.9,{round:5}));
  return{g,an:[()=>V3(160,50,-14),()=>V3(120,102,-44),()=>V3(100,110,-44),()=>V3(60,130,-37),()=>V3(-110,130,-37),()=>V3(0,190,-44),()=>V3(-30,124,-46)],pitch:.28,ex:[],ex0:0};
}
function cCassette(){
  const g=new THREE.Group();
  g.add(box(220,12,150,{p:'conc'},0,175,0,{eo:.3}));// forjado
  // varillas
  [[-50,-50],[50,-50],[-50,50],[50,50]].forEach(a=>{g.add(cyl(.5,52,0x9AA0AA,a[0],148,a[1]));g.add(box(4,.6,4,'#8A8F99',a[0],122,a[1],{noedge:true}))});
  // falso techo registrable 60x60 con hueco para cassette
  const plc=[[-120,-60],[-120,60],[-60,-120],[60,-120],[-60,120],[60,120],[120,-60],[120,60],[120,0],[-120,0]];
  g.add(box(200,2,60,'#F4F4F2',0,119,-90,{eo:.35}));g.add(box(200,2,60,'#F4F4F2',0,119,90,{eo:.35}));g.add(box(66,2,120,'#F4F4F2',-98,119,0,{eo:.35}));g.add(box(66,2,120,'#F4F4F2',98,119,0,{eo:.35}));
  g.add(box(200,2,2,'#B8BDC7',0,121,-60,{noedge:true}));g.add(box(2,2,200,'#B8BDC7',0,121,0,{noedge:true}));
  cassetteUnit(g,0,120,0,56);
  // tubos frigoríficos y condensados
  g.add(pipe([[30,148,20],[60,150,20],[110,150,20],[110,150,-100]],0x2B2F38,2.2,{round:5}));g.add(pipe([[30,152,20],[60,154,20],[114,154,20],[114,154,-100]],0xB06A2A,1.1,{round:5}));
  g.add(pipe([[-26,135,10],[-60,135,10],[-60,126,60],[-100,124,60],[-100,124,100]],0x6B9AD8,1.4,{round:4}));
  g.add(box(14,10,10,'#2B2F38',-60,142,10,{eo:.4}));// bomba condensados
  g.add(pipe([[0,160,-30],[0,162,-60],[40,164,-90]],0xE5762A,1,{round:3}));
  dim(g,[80,119,-28],[80,148,-28],0x2F3B52,.6);
  return{g,an:[()=>V3(0,135,26),()=>V3(0,115,0),()=>V3(50,148,50),()=>V3(110,150,-30),()=>V3(-60,135,10),()=>V3(-100,124,80),()=>V3(80,134,-28),()=>V3(120,119,-60)],pitch:.3,ex:[],ex0:0};
}
function cConductos(){
  const g=new THREE.Group();
  g.add(box(260,12,170,{p:'conc'},0,185,0,{eo:.3}));g.add(box(260,2,170,'#F4F4F2',0,120,0,{op:.38,eo:.3}));
  // unidad de conductos colgada
  g.add(box(100,26,56,'#B8BDC7',-60,150,0,{eo:.5}));[-40,40].forEach(x=>[-18,18].forEach(z=>g.add(cyl(.5,36,0x9AA0AA,-60+x,168,z))));
  // plenum de impulsión
  g.add(box(30,22,46,'#C9CED8',-5,152,0,{eo:.5}));
  // flexibles hacia difusores
  const dif=[[40,0],[90,-45],[90,45],[40,60]];
  g.add(box(64,24,30,'#C9CED8',20,146,0,{op:0,noedge:true}));
  [[55,-30],[100,-50],[100,50],[55,40]].forEach(([x,z],i)=>{ductFlex(g,[-5,152,z*.2],[x,134,z],5.5,0xC9CED8);g.add(box(30,1.6,30,'#F4F4F4',x,119.5,z,{eo:.4}));g.add(box(24,.8,24,'#B8BDC7',x,118.7,z,{noedge:true}))});
  // retorno
  g.add(box(30,22,40,'#C9CED8',-115,150,0,{eo:.5}));g.add(box(40,1.6,40,'#F4F4F4',-115,119.5,0,{eo:.4}));ductFlex(g,[-115,141,0],[-115,126,0],9,0xC9CED8);
  // filtro
  g.add(box(2,22,50,'#F2D275',-110,150,0,{eo:.4}));
  // flechas de aire
  arrow1(g,[40,170,0],[70,170,0],0x2E6FD8,1);arrow1(g,[-115,100,0],[-115,114,0],0xD32F2F,1);
  g.add(pipe([[-60,150,28],[-60,150,70],[110,150,70]],0x2B2F38,2,{round:4}));
  return{g,an:[()=>V3(-60,150,28),()=>V3(-5,152,24),()=>V3(55,134,-30),()=>V3(100,119,50),()=>V3(-115,119,0),()=>V3(-110,150,26),()=>V3(70,170,0),()=>V3(-60,160,0)],pitch:.32,ex:[],ex0:0};
}
var cFrigorifica=function(){
  const g=new THREE.Group();g.add(box(300,6,110,'#E6E3DA',0,-3,0,{eo:.3}));
  // par de tubos aislados con corte
  g.add(pipe([[-130,6,-20],[-40,6,-20]],0x2B2F38,3.4,{round:0}));g.add(pipe([[-130,6,-8],[-40,6,-8]],0x2B2F38,2.4,{round:0}));
  g.add(cyl(1.5,30,0xC9772E,-60,6,-20,[0,0,Math.PI/2]));g.add(cyl(1.0,30,0xC9772E,-60,6,-8,[0,0,Math.PI/2]));
  g.add(box(2,8,26,'#8A8F99',-100,4,-14,{eo:.4}));g.add(box(2,8,26,'#8A8F99',-60,4,-14,{eo:.4}));
  // unión abocardada (tuerca y cono)
  g.add(cyl(1.6,16,0xC9772E,10,6,20,[0,0,Math.PI/2]));g.add(new THREE.Mesh(new THREE.CylinderGeometry(3.6,3.6,5,6),MATL(0xC9A24B)));g.children[g.children.length-1].position.set(25,6,20);g.children[g.children.length-1].rotation.z=Math.PI/2;
  g.add(cyl(1.6,16,0xC9772E,40,6,20,[0,0,Math.PI/2]));
  // curva amplia
  g.add(pipe([[60,6,-30],[100,6,-30],[120,6,-10],[120,6,30]],0xC9772E,1.6,{round:20}));
  // bomba de vacío y manómetros
  g.add(box(36,22,24,'#2E6FD8',-110,11,40,{eo:.4}));g.add(cyl(7,12,0x23262C,-90,16,40,[0,0,Math.PI/2]));
  g.add(box(30,10,8,'#2B2F38',-40,5,40,{eo:.4}));manometer(g,-48,14,42);manometer(g,-32,14,42);
  g.add(pipe([[-90,10,40],[-60,8,40],[-48,5,40]],0x2B2F38,1.2,{round:4}));
  // botella de refrigerante
  g.add(cyl(9,40,0x9CC5A1,60,22,40));g.add(cyl(3,8,0xC9A24B,60,46,40));
  return{g,an:[()=>V3(-100,9,-14),()=>V3(-60,6,-14),()=>V3(-80,6,-12),()=>V3(25,8,20),()=>V3(110,6,-6),()=>V3(-110,22,40),()=>V3(-40,16,42),()=>V3(60,30,40)],pitch:.45,ex:[],ex0:0};
}
function cCondensados(){
  const g=new THREE.Group();floorSlab(g,330,100);g.add(box(330,200,6,'#E7E3D8',0,100,-48,{eo:.2}));
  splitInt(g,-90,150,-36);
  // desagüe con pendiente y sifón
  g.add(pipe([[-130,142,-30],[-140,138,-30],[-140,100,-30],[-140,60,-30],[-100,56,-30]],0x6B9AD8,1.6,{round:5}));
  g.add(pipe([[-100,56,-30],[-40,53,-30],[0,50,-30]],0x6B9AD8,1.6,{round:0}));
  g.add(cyl(4,10,0xDADFE6,0,44,-30));g.add(pipe([[0,38,-30],[0,30,-30],[10,26,-30],[40,26,-30]],0x8A8F99,2,{round:3}));
  // bajante
  g.add(cyl(4,120,0x8A8F99,60,50,-38));g.add(pipe([[40,26,-30],[60,22,-36]],0x8A8F99,2,{round:3}));
  // bomba de condensados con flotador
  g.add(box(26,14,12,'#2B2F38',110,34,-36,{eo:.4}));g.add(pipe([[110,41,-36],[110,56,-36],[110,56,-20]],0x6B9AD8,1,{round:3}));g.add(cyl(1,6,0xF2C230,118,28,-30));g.add(box(2,6,2,'#D32F2F',104,43,-36,{noedge:true}));
  g.add(pipe([[-40,124,-30],[130,124,-30]],0xE5762A,1,{round:0}));
  dim(g,[-130,54,-26],[-130,64,-26],0x2F3B52,.5);
  return{g,an:[()=>V3(-90,150,-26),()=>V3(-140,100,-26),()=>V3(-40,53,-28),()=>V3(0,44,-26),()=>V3(60,100,-34),()=>V3(110,36,-30),()=>V3(118,30,-28)],pitch:.25,ex:[],ex0:0};
}
function cVentilacion(){
  const g=new THREE.Group();
  g.add(box(280,12,170,{p:'conc'},0,185,0,{eo:.3}));g.add(box(280,2,170,'#F4F4F2',0,120,0,{op:.38,eo:.3}));
  g.add(box(6,150,170,{p:'brick'},-140,75,0,{eo:.3}));
  // recuperador
  g.add(box(90,34,50,'#B8BDC7',0,150,0,{eo:.5}));[-34,34].forEach(x=>[-16,16].forEach(z=>g.add(cyl(.5,20,0x9AA0AA,x,172,z))));
  g.add(box(30,.8,36,'#F2D275',0,150,0,{op:.0,noedge:true}));
  // conductos exterior
  ductFlex(g,[-45,156,-12],[-136,156,-12],8,0x2E6FD8);ductFlex(g,[-45,144,12],[-136,144,12],8,0xD32F2F);
  g.add(box(2,22,26,'#8A8F99',-141,156,-12,{eo:.4}));g.add(box(2,22,26,'#8A8F99',-141,144,18,{eo:.4}));
  // impulsión y extracción interior
  ductFlex(g,[45,156,-12],[100,150,-50],6,0xC9CED8);g.add(box(26,1.6,26,'#F4F4F4',100,119.5,-50,{eo:.4}));
  ductFlex(g,[45,144,12],[100,138,50],6,0xC9CED8);g.add(box(26,1.6,26,'#F4F4F4',100,119.5,50,{eo:.4}));
  arrow1(g,[-120,180,-12],[-90,180,-12],0x2E6FD8,1);arrow1(g,[-90,170,12],[-120,170,12],0xD32F2F,1);
  return{g,an:[()=>V3(0,150,26),()=>V3(-100,156,-12),()=>V3(-100,144,12),()=>V3(100,119,-50),()=>V3(100,119,50),()=>V3(-141,156,-12),()=>V3(-105,180,-12)],pitch:.32,ex:[],ex0:0};
}

function scaleScene(r,s){const o=new THREE.Group();r.g.scale.setScalar(s);o.add(r.g);r.g=o;r.an=r.an.map(f=>()=>f().multiplyScalar(s));return r}
const _fTub=fTuberias,_fPru=fPrueba,_cFri=cFrigorifica;
fTuberias=function(){return scaleScene(_fTub(),1.7)};fPrueba=function(){return scaleScene(_fPru(),1.5)};cFrigorifica=function(){return scaleScene(_cFri(),1.6)};
