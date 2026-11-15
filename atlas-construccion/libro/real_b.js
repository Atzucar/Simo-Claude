/* ===== Objetos reales en 3D (cm) — parte B ===== */
function doorLeaf(g,x,y,z,w,h,col){
  g.add(box(w,h,4,col||'#B98A5A',x,y,z));[-1,1].forEach((s,i)=>g.add(box(w*.7,h*.3,.6,'#9C7347',x,y+s*h*.22,z+2.2,{eo:.3})));
}
function personVest(g,x,z){ // operario simple con chaleco y casco
  g.add(box(14,34,9,'#C9D83A',x,48,z,{eo:.3}));g.add(box(5,34,6,'#2F3B52',x-4,17,z));g.add(box(5,34,6,'#2F3B52',x+4,17,z));
  const h=new THREE.Mesh(new THREE.SphereGeometry(6,12,10),MATL(0xF4F4F4));h.position.set(x,72,z);g.add(h);
}
/* 6. Desmontaje de carpintería y elementos */
function rDesmontaje(){
  const g=new THREE.Group();floorSlab(g,300,110);backWall(g,300,160,-45);
  // film protector en suelo
  g.add(box(150,.5,100,{c:'#BCD9EE'},-30,.4,0,{op:.45,eo:.7}));
  // hueco de puerta con precerco y bisagras
  g.add(box(4,150,6,'#EDEDE8',-105,75,-42));g.add(box(84,4,6,'#EDEDE8',-62,150,-42));
  [30,75,120].forEach(y=>g.add(cyl(1.3,5,0x6C727D,-103,y,-38)));
  // puerta descolgada apoyada
  const d=new THREE.Group();doorLeaf(d,0,0,0,80,140);d.position.set(10,70,-12);d.rotation.z=-.16;d.rotation.y=.25;g.add(d);
  // herrajes en bolsa
  g.add(box(16,14,10,'#BCD9EE',75,7,-5,{op:.6}));[0,5,10].forEach(i=>g.add(cyl(1.4,6,0x9AA0AA,70+i,10,-5,[0,0,1.2])));
  // armario desmontado y etiquetas
  g.add(box(50,90,30,'#D8CBB0',110,45,-25));g.add(box(8,12,.8,'#F26A1B',110,60,-9.5,{noedge:true}));g.add(box(8,12,.8,'#F26A1B',12,100,-9.5,{noedge:true}));
  // tablilla de inventario
  g.add(box(26,34,1.6,'#9C7347',-85,60,-10,{eo:.3}));g.add(box(22,28,.6,'#FFFFFF',-85,60,-9.2,{noedge:true}));g.add(txtPlane('LISTA',18,6,-85,70,-8.8,{fs:.7}));
  // carretilla
  g.add(box(40,3,60,'#8A8F99',-30,18,40,{eo:.4}));g.add(box(2,46,60,'#8A8F99',-50,41,40,{eo:.4}));[-12,12].forEach(z=>g.add(cyl(8,3,0x23262C,-10,8,40+z,[Math.PI/2,0,0])));
  return{g,an:[()=>V3(-85,60,-8.5),()=>V3(-30,1,-5),()=>V3(10,100,-8),()=>V3(110,60,-9),()=>V3(75,12,0),()=>V3(-30,36,40)],pitch:.28,ex:[],ex0:0};
}
/* 7. Anulación de instalaciones */
function rAnulacion(){
  const g=new THREE.Group();floorSlab(g,320,100);backWall(g,320,170,-40);
  // cuadro con IGA en OFF y candado
  g.add(box(44,60,8,'#D7DBE3',-125,100,-34));g.add(box(8,16,6,'#F2F2EE',-135,108,-28));g.add(box(3,4,3,'#2B2F38',-135,104,-24.5,{noedge:true}));
  g.add(box(8,16,6,'#F2F2EE',-122,108,-28));g.add(box(3,4,3,'#2B2F38',-122,112,-24.5,{noedge:true}));g.add(box(8,16,6,'#F2F2EE',-109,108,-28));
  g.add(box(6,5,3,'#D32F2F',-135,98,-26));g.add(pipe([[-135,99,-26],[-139,94,-26],[-139,90,-26]],0xD32F2F,.8,{round:2}));
  // comprobador / multímetro
  g.add(box(16,28,6,'#F2C230',-65,18,20,{eo:.4}));g.add(box(11,8,.6,'#2B3445',-65,24,23.4,{noedge:true}));g.add(cyl(3.4,.8,0x2B2F38,-65,12,23.4,[Math.PI/2,0,0]));
  g.add(pipe([[-60,2,22],[-40,0,30],[-26,10,28]],0xD32F2F,.5,{round:3}));g.add(pipe([[-70,2,22],[-80,0,30],[-92,10,28]],0x1E2229,.5,{round:3}));
  // tubería con tapón
  g.add(pipe([[-20,90,-38],[-20,60,-38],[40,60,-38]],C_BLU,1.5,{round:3}));g.add(cyl(2.2,3,0x6C727D,42,60,-38,[0,0,Math.PI/2]));
  // caja de mecanismos con cables capuchados
  g.add(box(14,14,4,WHT,80,90,-37));[[-4,0xE5762A],[0,0x2E6FD8],[4,0x2E9E3F]].forEach(([dx,c])=>{g.add(pipe([[80+dx,90,-34],[80+dx,98,-30],[80+dx,104,-30]],c,.7,{round:2}));g.add(cyl(1.4,2.4,0xF2C230,80+dx,105,-30))});
  // split desmontado + botella de recuperación
  g.add(box(72,24,18,WHT,120,20,0,{eo:.35}));g.add(cyl(8,34,0x2E9E3F,160,17,10));g.add(cyl(3,6,0x6C727D,160,37,10));
  g.add(pipe([[150,14,4],[134,14,-6],[130,16,-6]],0xB06A2A,.9,{round:3}));
  return{g,an:[()=>V3(-135,100,-24),()=>V3(-65,24,24),()=>V3(42,60,-34),()=>V3(80,100,-28),()=>V3(160,17,19)],pitch:.28,ex:[],ex0:0};
}
/* 8. Descombro */
function rDescombro(){
  const g=new THREE.Group();floorSlab(g,320,140,'#B9B4A6');
  // contenedor
  const c=new THREE.Mesh(new THREE.CylinderGeometry(52,40,38,4,1),MATL(0xE5762A));c.rotation.y=Math.PI/4;c.scale.set(1.5,1,.8);c.position.set(-80,22,-10);g.add(c);
  g.add(box(100,3,60,'#B3541A',-80,42,-10,{op:.0,noedge:true}));
  [-3,0,3].forEach(i=>g.add(box(18+i*6,8,14,'#B8B2A5',-95+i*18,42+Math.abs(i),-12+i*4,{eo:.3})));
  g.add(box(112,2,70,'#2B2F38',-80,1,-10,{noedge:true}));
  // telesacos
  [[40,0],[70,-10]].forEach(([x,z],i)=>{g.add(box(30,44,30,'#E8E3D2',x,22,z,{eo:.4}));g.add(box(6,14,2,'#6C727D',x,42,z+15.5,{noedge:true}))});
  // carretilla
  g.add(box(44,4,28,'#8A8F99',10,22,40,{eo:.4}));g.add(box(3,16,28,'#8A8F99',-12,30,40,{eo:.4}));g.add(cyl(8,3,0x23262C,26,8,40,[Math.PI/2,0,0]));g.add(box(8,4,4,'#B8B2A5',2,26,40));
  // camión
  const t=new THREE.Group();t.add(box(30,34,40,'#F4F3EE',-55,26,0));t.add(box(70,30,40,'#2E6FD8',0,26,0));t.add(box(120,4,44,'#2B2F38',20,8,0));
  [-50,10,60,90].forEach(x=>t.add(cyl(9,6,0x23262C,x,9,24,[Math.PI/2,0,0])));
  t.position.set(120,0,-30);g.add(t);
  // hoja de seguimiento
  g.add(box(28,38,.8,'#FFFFFF',-10,24,-50,{eo:.4}));g.add(txtPlane('GESTOR',22,6,-10,36,-49.4,{fs:.7}));
  return{g,an:[()=>V3(-80,44,-10),()=>V3(40,44,3),()=>V3(10,30,40),()=>V3(150,50,-30),()=>V3(-10,40,-49)],pitch:.35,ex:[],ex0:0};
}
/* 9. Andamios y plataforma */
function rAndamio(){
  const g=new THREE.Group();floorSlab(g,320,100,'#B9B4A6');backWallBld(g);
  const tub=0x9AA0AA;
  const frame=(x,z)=>{[0,1].forEach(s=>g.add(cyl(1.7,180,tub,x+s*100,90,z)));[60,120,180].forEach(y=>g.add(cyl(1.5,100,tub,x+50,y,z,[0,0,Math.PI/2])))};
  [-90,10].forEach(x=>{[10,-25].forEach(z=>frame(x,z))});
  // largueros y diagonales
  [0,1,2].forEach(i=>{const d=cyl(1.1,120,tub,-40+i*100-50,90,10);d.rotation.z=.8;g.add(d)});
  // bases con husillo
  [-90,10,110].forEach(x=>[10,-25].forEach(z=>{g.add(box(14,2,14,'#6C727D',x,1,z));g.add(cyl(1.2,8,0x6C727D,x,6,z))}));
  // plataformas
  [60,120].forEach(y=>g.add(box(200,3,34,'#B98A5A',10,y+1.5,-7,{eo:.4})));
  // barandilla y rodapié arriba
  g.add(box(200,.8,.8,'#F2C230',10,150,12,{noedge:true}));g.add(box(200,.8,.8,'#F2C230',10,135,12,{noedge:true}));g.add(box(200,8,1,'#B98A5A',10,124,12,{eo:.3}));
  // anclajes a fachada
  [-60,60].forEach(x=>g.add(cyl(1.2,26,0x6C727D,x,110,-30,[Math.PI/2,0,0])));
  // plataforma elevadora tijera
  const L=new THREE.Group();L.add(box(60,10,40,'#F2C230',0,5,0));
  for(let i=0;i<3;i++){const a=box(4,60,3,'#8A8F99',0,18+i*0,0);}
  [-14,14].forEach(s=>{const b=cyl(1.8,70,0x8A8F99,s*0,40,0);});
  const d1=cyl(1.8,72,0x8A8F99,0,40,18);d1.rotation.x=0;L.add(d1);
  const x1=box(3,3,90,'#8A8F99',0,40,0,{noedge:true});
  L.add(box(60,3,36,'#B8BDC7',0,78,0));L.add(box(60,2,2,'#F2C230',0,92,16,{noedge:true}));
  const a=cyl(1.8,70,0x8A8F99,-12,40,17);a.rotation.z=.45;L.add(a);const b2=cyl(1.8,70,0x8A8F99,12,40,17);b2.rotation.z=-.45;L.add(b2);
  L.position.set(150,0,25);g.add(L);
  return{g,an:[()=>V3(10,6,12),()=>V3(60,100,10),()=>V3(10,121,10),()=>V3(10,145,12),()=>V3(60,110,-30),()=>V3(150,60,25)],pitch:.25,ex:[],ex0:0};
}
function backWallBld(g){g.add(box(320,200,8,{p:'brick'},0,100,-38));}
/* 10. Telecomunicaciones, seguridad y sonido */
function rTelecom(){
  const g=new THREE.Group();floorSlab(g,320,90);backWall(g,320,170,-35);
  // toma de datos + latiguillo
  g.add(box(9,9,2,WHT,-120,30,-33));g.add(box(4,3,1,'#2B2F38',-120,30,-31.8,{noedge:true}));g.add(pipe([[-120,30,-30],[-120,18,-20],[-100,8,0]],0x2E6FD8,.45,{round:3}));
  // rack
  g.add(box(42,86,28,'#2B2F38',-30,43,-18,{eo:.4}));[0,1,2,3].forEach(i=>{g.add(box(38,5,.8,'#6C727D',-30,70-i*14,-3.6));[0,1,2,3,4,5].forEach(j=>g.add(box(2,1.6,.4,j%2?'#2E9E3F':'#F2C230',-44+j*3.2+6,71-i*14,-3,{noedge:true})))});
  // cámara
  g.add(cyl(4,16,0xE4E6EA,40,130,-20,[0,0,0]));g.add(cyl(5,10,0xF4F4F4,40,128,-12,[Math.PI/2,0,0]));g.add(cyl(2.5,.8,0x23262C,40,128,-6.5,[Math.PI/2,0,0]));g.add(box(8,4,10,'#9AA0AA',40,138,-26,{eo:.3}));
  // timbre / videoportero
  g.add(box(14,22,3,'#2B3445',100,100,-33));g.add(box(9,10,.6,'#8EC5EC',100,105,-31.2,{noedge:true}));g.add(cyl(2,.8,0xF2C230,100,93,-31.2,[Math.PI/2,0,0]));
  // altavoz de techo
  g.add(cyl(11,3,0xE9E9E4,150,150,-5));g.add(cyl(7,.6,0x4A4F5A,150,148.3,-5));
  // luz de emergencia
  g.add(box(30,10,8,'#F4F3EE',-120,110,-32));g.add(box(24,5,.6,'#FFF7C2',-120,110,-27.6,{noedge:true}));
  return{g,an:[()=>V3(-120,30,-31),()=>V3(-30,56,-3),()=>V3(100,100,-30),()=>V3(40,128,-8),()=>V3(150,148,-5),()=>V3(-120,110,-27)],pitch:.2,ex:[],ex0:0};
}
/* 11. Rótulos, vinilos y señalética */
function rRotulos(){
  const g=new THREE.Group();floorSlab(g,320,70,'#B9B4A6');g.add(box(320,180,10,'#D8D2C2',0,90,-35,{eo:.2}));
  // escaparate
  g.add(box(130,90,2,'#8EC5EC',-80,60,-29,{op:.45,eo:.6}));g.add(txtPlane('ABIERTO\n10-20 h',60,26,-80,70,-27.8,{fs:.5,fg:'#FFFFFF'}));
  // rótulo corpóreo
  g.add(box(100,28,6,'#F4F3EE',80,132,-26,{eo:.4}));g.add(txtPlane('MOTIVA',90,22,80,132,-22.8,{fs:.7,fg:'#F26A1B'}));
  // rótulo de bandeja luminoso
  g.add(box(80,34,9,'#2B3445',80,86,-26,{eo:.4}));g.add(box(72,26,.6,'#FFF3C2',80,86,-21.2,{noedge:true}));g.add(txtPlane('PANADERÍA',70,16,80,86,-20.6,{fs:.6}));
  // puerta con señalética
  g.add(box(36,100,3,'#B98A5A',-5,50,-30,{eo:.3}));g.add(box(14,14,.8,'#2E9E3F',-5,90,-28,{noedge:true}));g.add(txtPlane('SALIDA',12,5,-5,90,-27.4,{fs:.5,fg:'#FFFFFF'}));
  // transporte e instalación: escalera
  g.add(cyl(1.2,110,0x9AA0AA,140,55,10));g.add(cyl(1.2,110,0x9AA0AA,160,55,10));[10,30,50,70,90].forEach(y=>g.add(cyl(1,20,0x9AA0AA,150,y,10,[0,0,Math.PI/2])));
  return{g,an:[()=>V3(-80,60,-27),()=>V3(80,132,-22),()=>V3(80,86,-20),()=>V3(-5,90,-27),()=>V3(150,70,10)],pitch:.18,ex:[],ex0:0};
}
/* 12. Luminarias */
function rLuminarias(){
  const g=new THREE.Group();g.add(box(300,4,160,'#E7E3D8',0,160,0,{eo:.2}));g.add(box(300,90,6,'#E1DDD0',0,115,-80,{eo:.2}));
  // downlights empotrados
  [-100,-50].forEach(x=>{g.add(cyl(7,3,0xF4F3EE,x,157.5,0));g.add(cyl(5,.6,0xFFF7C2,x,155.8,0))});
  // driver
  g.add(box(18,5,8,'#2B2F38',-75,165,0,{eo:.4}));g.add(pipe([[-75,165,0],[-100,162,0],[-100,159,0]],0xE5762A,.6,{round:2}));
  // foseado con tira LED
  g.add(box(100,12,6,'#F4F3EE',60,148,-72));g.add(box(98,1.2,1.2,'#FFE08A',60,143,-68,{noedge:true}));
  // luminaria colgante
  g.add(cyl(.4,50,0x23262C,110,135,20));const d=new THREE.Mesh(new THREE.SphereGeometry(14,16,10,0,Math.PI*2,0,Math.PI/2),MATL(0xE5E7EC));d.position.set(110,85,20);g.add(d);
  g.add(new THREE.Mesh(new THREE.SphereGeometry(5,10,8),new THREE.MeshLambertMaterial({color:0xFFE9A6,emissive:0x6A5A20}))).position.set(110,88,20);
  // emergencia
  g.add(box(30,10,8,'#F4F3EE',-120,120,-76));g.add(box(24,5,.6,'#FFF7C2',-120,120,-71.6,{noedge:true}));
  return{g,an:[()=>V3(-100,157,0),()=>V3(-75,165,0),()=>V3(60,143,-68),()=>V3(110,85,20),()=>V3(-120,120,-71)],pitch:.2,ex:[],ex0:0};
}
/* 13. Cocina */
function rCocina(){
  const g=new THREE.Group();floorSlab(g,340,110);backWall(g,340,230,-50);
  const cab=(x,w,h,col)=>{g.add(box(w,h,56,col||'#D8CBB0',x,h/2+8,-20));g.add(box(w-2,.8,.8,'#8A7A5E',x,h/2+8,8.2,{noedge:true}))};
  [-120,-60,0,60].forEach(x=>cab(x,60,82));
  g.add(box(250,4,60,'#8A8F99',-30,92,-20,{eo:.4}));
  cooktop(g,-40,94.5,-20);
  g.add(box(58,40,56,'#2B2F38',-60,32,-20+30));// horno (frente)
  g.add(box(46,28,.8,'#6C727D',-60,32,38.4,{noedge:true}));g.add(box(30,2,2,'#C9CED8',-60,50,39));
  // fregadero
  g.add(box(46,3,36,'#C9CED8',40,94,-20,{eo:.3}));g.add(cyl(1.4,16,C_STEEL,40,104,-34));g.add(pipe([[40,112,-34],[40,114,-28],[40,108,-26]],C_STEEL,1.2,{round:2}));
  // lavavajillas
  g.add(box(60,82,56,'#E4E6EA',105,49,-20,{eo:.35}));g.add(box(40,3,.8,'#6C727D',105,86,8.4,{noedge:true}));
  // nevera
  g.add(box(62,180,60,'#E4E6EA',160,98,-20,{eo:.4}));g.add(box(2,50,3,'#9AA0AA',148,120,11));
  hoodObj(g,-40,152,-30);
  return{g,an:[()=>V3(-120,50,8),()=>V3(-40,96,-20),()=>V3(-60,34,38),()=>V3(-40,150,-18),()=>V3(40,106,-34),()=>V3(105,49,8),()=>V3(160,100,11)],pitch:.25,ex:[],ex0:0};
}
/* 14. Mobiliario especial */
function rMobiliario(){
  const g=new THREE.Group();floorSlab(g,340,120);backWall(g,340,200,-50);
  // banco corrido tapizado
  g.add(box(120,36,40,'#8A3B3B',-110,18,-25));g.add(box(120,40,12,'#8A3B3B',-110,50,-44));[-50,-20,10,40].forEach(x=>g.add(box(.6,36,40,'#5E2626',-110+x*.0+x,18,-25,{noedge:true})));
  // cabina acústica
  g.add(box(90,200,90,'#DADFE6',20,100,-5,{eo:.4}));g.add(box(60,120,.8,'#8EC5EC',20,110,41,{op:.45,eo:.7}));g.add(box(90,6,90,'#2B2F38',20,203,-5,{eo:.4}));
  // salvaescaleras: raíl inclinado + asiento
  const r=cyl(1.8,160,0x9AA0AA,135,60,-10);r.rotation.z=-.9;g.add(r);const r2=cyl(1.8,160,0x9AA0AA,135,45,-10);r2.rotation.z=-.9;g.add(r2);
  const s=new THREE.Group();s.add(box(34,4,34,'#2B3445',0,0,0));s.add(box(34,30,4,'#2B3445',0,16,-16));s.add(box(4,16,32,'#2B3445',-16,10,0));s.position.set(110,52,-10);s.rotation.z=-.9+Math.PI*0;g.add(s);
  // silla operativa
  g.add(cyl(3,36,0x6C727D,-10,28,50));g.add(box(40,5,40,'#2B3445',-10,48,50));g.add(box(40,40,4,'#2B3445',-10,70,32));[0,1,2,3,4].forEach(i=>g.add(box(30,2.4,3,'#6C727D',-10+Math.cos(i*1.256)*0,10,50+Math.sin(i*1.256)*0,{noedge:true})));
  return{g,an:[()=>V3(-110,36,-5),()=>V3(20,150,41),()=>V3(135,60,-10),()=>V3(-10,60,50)],pitch:.3,ex:[],ex0:0};
}
/* 15. Detección y alarma de incendios */
function rDeteccion(){
  const g=new THREE.Group();g.add(box(340,4,160,'#E7E3D8',0,170,0,{eo:.2}));g.add(box(340,120,6,'#E1DDD0',0,112,-80,{eo:.2}));
  // central
  g.add(box(46,62,10,'#D7DBE3',-130,110,-74));g.add(box(30,14,.8,'#2B3445',-130,125,-68.4,{noedge:true}));[0,1,2,3].forEach(i=>g.add(cyl(1.6,.8,[0x2E9E3F,0xF2C230,0xD32F2F,0x2E9E3F][i],-142+i*8,108,-68.4,[Math.PI/2,0,0])));g.add(txtPlane('CENTRAL',34,8,-130,98,-68.2,{fs:.7}));
  // batería
  g.add(box(16,10,8,'#2B3445',-130,66,-74));
  // lazo de cableado
  g.add(pipe([[-110,120,-76],[-60,120,-76],[-60,170,-60],[80,170,-60],[80,170,0]],0xD32F2F,.7,{round:5}));
  // detectores
  [-40,20,80].forEach((x,i)=>{g.add(cyl(7,2.5,0xF4F4F4,x,166.5,-30+i*0));g.add(cyl(2.4,.4,0xD32F2F,x,165.2,-30))});
  // pulsador
  g.add(box(10,10,3,'#D32F2F',110,110,-74,{eo:.4}));g.add(box(6,6,.8,'#F4F4F4',110,110,-72,{noedge:true}));g.add(txtPlane('ALARMA',9,3,110,100,-72.4,{fs:.7}));
  // sirena óptico-acústica
  g.add(cyl(6,8,0xD32F2F,150,130,-74));g.add(cyl(8,2,0xE4E6EA,150,126,-74));g.add(cyl(3,3,0xF2C230,150,136.5,-74));
  return{g,an:[()=>V3(-130,125,-68),()=>V3(-100,120,-76),()=>V3(20,165,-30),()=>V3(110,110,-72),()=>V3(150,134,-74),()=>V3(-130,70,-70)],pitch:.2,ex:[],ex0:0};
}
/* 16. Rociadores, extintores y evacuación */
function rRociadores(){
  const g=new THREE.Group();g.add(box(340,4,160,'#E7E3D8',0,170,0,{eo:.2}));g.add(box(340,170,6,'#E1DDD0',0,85,-80,{eo:.2}));floorSlab(g,340,160);
  // red principal roja
  g.add(pipe([[-150,176,-60],[150,176,-60]],0xD32F2F,3,{round:0}));
  [-100,-30,40,110].forEach(x=>{g.add(pipe([[x,176,-60],[x,176,0],[x,168,0]],0xD32F2F,1.5,{round:0}));g.add(cyl(1.6,6,0xC9772E,x,164,0));g.add(cyl(5,.8,0xC9A24B,x,160,0));const bulb=cyl(1.2,3,0xD32F2F,x,162,0);g.add(bulb)});
  // extintor
  g.add(cyl(8,38,0xD32F2F,-100,24,-72));g.add(cyl(3,6,0x23262C,-100,46,-72));g.add(box(12,3,3,'#23262C',-96,52,-72));g.add(pipe([[-100,48,-72],[-92,44,-66],[-86,34,-64]],0x23262C,.8,{round:3}));g.add(box(14,16,.8,'#D32F2F',-100,84,-76,{noedge:true}));g.add(txtPlane('EXT.',12,7,-100,84,-75.4,{fs:.7,fg:'#FFFFFF'}));
  // señal de evacuación
  g.add(box(40,18,2,'#2E9E3F',60,140,-76));g.add(txtPlane('SALIDA ➜',36,12,60,140,-74.6,{fs:.7,fg:'#FFFFFF'}));
  // bie / ascensor señal
  g.add(box(14,14,1.4,'#F4F4F4',130,70,-76));
  return{g,an:[()=>V3(-30,176,-60),()=>V3(40,160,0),()=>V3(-100,40,-62),()=>V3(60,140,-74),()=>V3(130,70,-75),()=>V3(110,164,0)],pitch:.22,ex:[],ex0:0};
}
/* 17. Movimiento de tierras */
function rTierras(){
  const g=new THREE.Group();
  g.add(box(180,40,150,{p:'earth'},-140,-20,0));g.add(box(180,40,150,{p:'earth'},140,-20,0));
  g.add(box(100,4,150,{p:'earth'},0,-42,0));
  g.add(box(180,5,150,'#4E8F3C',-140,2.5,0,{eo:.3}));g.add(box(180,5,150,'#4E8F3C',140,2.5,0,{eo:.3}));
  [[-200,-40],[-160,30],[-120,-10],[170,40],[210,-30]].forEach(a=>{const s=new THREE.Mesh(new THREE.SphereGeometry(9,10,8),MATL(0x2E7D32));s.position.set(a[0],15,a[1]);g.add(s);g.add(cyl(1.5,8,0x6B4A2A,a[0],6,a[1]))});
  const m=new THREE.Mesh(new THREE.ConeGeometry(28,22,12),MATL(0x6B8F3C));m.position.set(140,16,95);g.add(m);
  g.add(box(3,44,150,'#B98A5A',-48,-20,0,{eo:.4}));g.add(box(3,44,150,'#B98A5A',48,-20,0,{eo:.4}));
  [-50,0,50].forEach(z=>g.add(box(94,4,4,'#8A8F99',0,-6,z,{eo:.4})));
  g.add(box(96,1,148,'#CFC8B6',0,-39.5,0,{eo:.2}));
  [[-215,-85],[-215,85],[215,-85],[215,85]].forEach(([x,z])=>{g.add(box(3,26,3,'#B98A5A',x,13,z,{eo:.3}));g.add(box(3,3,3,'#F26A1B',x,27,z,{noedge:true}))});
  g.add(pipe([[-215,24,-85],[215,24,-85]],0xF2C230,.4,{round:0}));g.add(pipe([[-215,24,85],[215,24,85]],0xF2C230,.4,{round:0}));
  return{g,an:[()=>V3(-215,26,85),()=>V3(-140,5,10),()=>V3(0,-20,-60),()=>V3(-48,-14,20),()=>V3(0,-39,40),()=>V3(140,22,95)],pitch:.5,ex:[],ex0:0};
}
