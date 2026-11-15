/* ===== Motor de dibujo ===== */
const W=900,H=400,PW=180,OR='#F26A1B',INK='#10213F',ST='#3A4660';
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function wrap(s,n){const w=String(s).split(' '),L=[];let c='';for(const x of w){if(c&&(c+' '+x).length>n){L.push(c);c=x}else c=c?c+' '+x:x}if(c)L.push(c);return L}
const DEFS=`<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
<pattern id="p-conc" width="14" height="14" patternUnits="userSpaceOnUse"><rect width="14" height="14" fill="#BDBDB6"/><circle cx="3" cy="4" r="1.2" fill="#8E8E87"/><circle cx="10" cy="9" r="1.5" fill="#8E8E87"/><circle cx="6" cy="12" r="1" fill="#9A9A93"/></pattern>
<pattern id="p-grav" width="16" height="16" patternUnits="userSpaceOnUse"><rect width="16" height="16" fill="#A9A9A4"/><circle cx="4" cy="4" r="3" fill="#8A8A85"/><circle cx="12" cy="10" r="3.4" fill="#C9C9C4"/><circle cx="4" cy="13" r="2.4" fill="#7F7F7A"/></pattern>
<pattern id="p-wool" width="16" height="16" patternUnits="userSpaceOnUse"><rect width="16" height="16" fill="#F2D275"/><path d="M0 5q4-6 8 0t8 0M0 13q4-6 8 0t8 0" stroke="#C99F2E" stroke-width="1.4" fill="none"/></pattern>
<pattern id="p-brick" width="40" height="20" patternUnits="userSpaceOnUse"><rect width="40" height="20" fill="#C4623A"/><rect width="40" height="2.4" fill="#E9E3D5"/><rect y="10" width="40" height="2.4" fill="#E9E3D5"/><rect width="2.4" height="10" fill="#E9E3D5"/><rect x="20" y="10" width="2.4" height="10" fill="#E9E3D5"/></pattern>
<pattern id="p-block" width="40" height="20" patternUnits="userSpaceOnUse"><rect width="40" height="20" fill="#A8AAA6"/><rect width="40" height="2.4" fill="#DAD8D0"/><rect y="10" width="40" height="2.4" fill="#DAD8D0"/><rect width="2.4" height="10" fill="#DAD8D0"/><rect x="20" y="10" width="2.4" height="10" fill="#DAD8D0"/></pattern>
<pattern id="p-demo" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="10" stroke="#D32F2F" stroke-width="3" opacity=".75"/></pattern>
<pattern id="p-earth" width="18" height="18" patternUnits="userSpaceOnUse"><rect width="18" height="18" fill="#8B6B4A"/><circle cx="5" cy="5" r="1.6" fill="#6E5336"/><circle cx="13" cy="12" r="2" fill="#A68764"/></pattern>
<marker id="arr" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="var(--ar)"/></marker>
</defs></svg>`;
const fillOf=l=>l.p?`url(#p-${l.p})`:(l.c||'#DDD');

/* ---- callouts ---- */
function layoutSide(items){
  items.sort((a,b)=>a.ay-b.ay);let prev=6;
  for(const it of items){it.y=Math.max(it.ay-it.h/2,prev);prev=it.y+it.h+8}
  let lim=H-6;for(let i=items.length-1;i>=0;i--){const it=items[i];if(it.y+it.h>lim)it.y=lim-it.h;lim=it.y-8}
  if(items.length&&items[0].y<4){let p=4;for(const it of items){it.y=Math.max(it.y,p);p=it.y+it.h+8}}
}
function callouts(cs){
  const L=[],R=[];
  cs.forEach(c=>{c.lines=wrap(c.label,22);c.h=Math.max(38,c.lines.length*16+14);(c.side?c.side==='L':c.ax<W/2)?L.push(c):R.push(c)});
  layoutSide(L);layoutSide(R);
  let lines='',pills='',dots='';
  for(const c of [...L,...R]){
    const left=L.includes(c),x=left?10:W-10-PW,cy=c.y+c.h/2,bx=left?x+PW-19:x+19;
    lines+=`<line x1="${bx}" y1="${cy}" x2="${c.ax}" y2="${c.ay}" stroke="${OR}" stroke-width="2.2" stroke-linecap="round"/>`;
    dots+=`<circle cx="${c.ax}" cy="${c.ay}" r="4.6" fill="${OR}" stroke="#fff" stroke-width="1.6"/>`;
    const tx=left?x+11:x+38;
    pills+=`<rect x="${x}" y="${c.y}" width="${PW}" height="${c.h}" rx="7" fill="var(--pill)" stroke="#C7D0DF" stroke-width="1"/>`+
      `<circle cx="${bx}" cy="${cy}" r="12.5" fill="${OR}"/><text x="${bx}" y="${cy+5}" text-anchor="middle" fill="#fff" class="cb">${c.n}</text>`+
      `<text class="cl" fill="var(--pill-ink)">${c.lines.map((t,i)=>`<tspan x="${tx}" y="${c.y+19+i*16}">${esc(t)}</tspan>`).join('')}</text>`;
  }
  return lines+dots+pills;
}
const svgWrap=(inner,extra='')=>`<svg viewBox="0 0 ${W} ${H}" role="img" xmlns="http://www.w3.org/2000/svg">${inner}${extra}</svg>`;
const label=(x,y,t,a='middle',cls='cl2')=>`<text x="${x}" y="${y}" text-anchor="${a}" class="${cls}" fill="${INK}">${esc(t)}</text>`;

/* ---- capas horizontales (top -> bottom). item: [titulo,espesor,altura relativa,color|patron,demo,etiqueta] ---- */
const COL={conc:'p:conc',grav:'p:grav',wool:'p:wool',earth:'p:earth',brick:'p:brick',block:'p:block'};
function pickFill(f){if(f.startsWith('p:'))return{p:f.slice(2)};if(['conc','grav','wool','earth','brick','block'].includes(f))return{p:f};return{c:f}}
function dLayersH(d){
  const X=290,Wd=320,Y0=36,Ht=330,items=d.layers.map(a=>({lab:a[0],e:a[1],h:a[2]||1,f:pickFill(a[3]||'#DDD'),demo:a[4],t:a[5]||a[0]}));
  const sum=items.reduce((s,i)=>s+i.h,0);items.forEach(i=>i.hh=Math.max(34,i.h/sum*Ht));
  const tot=items.reduce((s,i)=>s+i.hh,0);let y=Y0+Math.max(0,(Ht-tot)/2),g='',cs=[];
  items.forEach((it,i)=>{
    g+=`<rect x="${X}" y="${y}" width="${Wd}" height="${it.hh}" fill="${fillOf(it.f)}" stroke="${ST}" stroke-width="1.6"/>`;
    if(it.demo)g+=`<rect x="${X}" y="${y}" width="${Wd}" height="${it.hh}" fill="url(#p-demo)" stroke="#D32F2F" stroke-width="2.4" stroke-dasharray="7 4"/>`;
    if(it.e)g+=`<text x="${X+Wd/2}" y="${y+it.hh/2+5}" text-anchor="middle" class="cl" fill="#10213F" stroke="#fff" stroke-width="3.2" paint-order="stroke">${esc(it.e)}</text>`;
    const right=i%2===0;cs.push({n:i+1,label:it.t,ax:right?X+Wd-16:X+16,ay:y+it.hh/2,side:right?'R':'L'});y+=it.hh;
  });
  if(d.perim)g+=`<rect x="${X-9}" y="${Y0}" width="9" height="${tot}" fill="#F2D275" stroke="${ST}" stroke-width="1"/>`;
  return svgWrap(g,callouts(cs));
}
/* ---- capas verticales (de izquierda a derecha) ---- */
function dLayersV(d){
  const items=d.layers.map(a=>({lab:a[0],e:a[1],w:a[2]||1,f:pickFill(a[3]||'#DDD'),demo:a[4],t:a[5]||a[0]}));
  const sum=items.reduce((s,i)=>s+i.w,0),X0=110,TW=680;items.forEach(i=>i.ww=Math.max(96,i.w/sum*TW));
  const tot=items.reduce((s,i)=>s+i.ww,0),sc=tot>TW?TW/tot:1;let x=X0+(TW-tot*sc)/2,g='',cs=[];
  const Y0=96,Y1=304;
  items.forEach((it,i)=>{
    const w=it.ww*sc;
    g+=`<rect x="${x}" y="${Y0}" width="${w}" height="${Y1-Y0}" fill="${fillOf(it.f)}" stroke="${ST}" stroke-width="1.6"/>`;
    if(it.demo)g+=`<rect x="${x}" y="${Y0}" width="${w}" height="${Y1-Y0}" fill="url(#p-demo)" stroke="#D32F2F" stroke-width="2.4" stroke-dasharray="7 4"/>`;
    if(it.e)g+=`<text x="${x+w/2}" y="${(Y0+Y1)/2+5}" text-anchor="middle" class="cl" fill="#10213F" stroke="#fff" stroke-width="3.2" paint-order="stroke">${esc(it.e)}</text>`;
    cs.push({n:i+1,cx:x+w/2,label:it.t,top:i%2===0});x+=w;
  });
  // pastillas arriba / abajo
  let out='',lines='',pills='';
  for(const c of cs){
    c.lines=wrap(c.label,22);const h=Math.max(38,c.lines.length*16+14);
    const px=Math.min(W-PW-8,Math.max(8,c.cx-PW/2)),py=c.top?8:H-8-h,bx=px+19,cy=py+h/2;
    const ay=c.top?Y0+46:Y1-46;
    lines+=`<line x1="${c.cx}" y1="${c.top?py+h:py}" x2="${c.cx}" y2="${ay}" stroke="${OR}" stroke-width="2.2"/>`+
           `<circle cx="${c.cx}" cy="${ay}" r="4.6" fill="${OR}" stroke="#fff" stroke-width="1.6"/>`;
    pills+=`<rect x="${px}" y="${py}" width="${PW}" height="${h}" rx="7" fill="var(--pill)" stroke="#C7D0DF"/>`+
      `<circle cx="${bx}" cy="${cy}" r="12.5" fill="${OR}"/><text x="${bx}" y="${cy+5}" text-anchor="middle" fill="#fff" class="cb">${c.n}</text>`+
      `<text class="cl" fill="var(--pill-ink)">${c.lines.map((t,i)=>`<tspan x="${px+38}" y="${py+19+i*16}">${esc(t)}</tspan>`).join('')}</text>`;
  }
  return svgWrap(g,lines+pills);
}
/* ---- tabique con montantes (alzado) ---- */
function dStud(d){
  const yT=44,yB=348;let s='';
  const conc=(x,y,w,h)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#p-conc)" stroke="${ST}" stroke-width="1.4"/>`;
  s+=conc(206,26,488,18)+conc(206,348,488,18)+conc(206,44,24,304)+conc(670,44,24,304);
  const steel='#AEBACB',sl='#5E6B82';
  let xs=[250,306,362,418,474,530,586,642];
  if(d.door)xs=[250,306,362,418,642];
  // lana
  if(d.wool!==false)for(let i=0;i<3;i++)s+=`<rect x="${xs[i]+5}" y="54" width="${xs[i+1]-xs[i]-10}" height="284" fill="url(#p-wool)"/>`;
  // montantes
  xs.forEach(x=>{s+=`<rect x="${x-5}" y="54" width="10" height="284" fill="${steel}" stroke="${sl}" stroke-width="1.2"/>`});
  s+=`<rect x="230" y="44" width="440" height="10" fill="#8FA0B6" stroke="${sl}"/><rect x="230" y="338" width="440" height="10" fill="#8FA0B6" stroke="${sl}"/>`;
  if(d.banda)s+=`<rect x="230" y="334" width="440" height="4" fill="#2F3B52"/>`;
  // placa
  const pl=d.open?'':(d.door?`<path d="M418 54H670V338H418ZM492 134V338H570V134Z" fill="#E7E9EC" stroke="#8E95A3" stroke-width="1.5" fill-rule="evenodd"/>`:`<rect x="418" y="54" width="252" height="284" fill="#E7E9EC" stroke="#8E95A3" stroke-width="1.5"/>`);
  s+=pl;
  if(d.door){
    s+=`<rect x="478" y="54" width="10" height="84" fill="${steel}" stroke="${sl}"/><rect x="530" y="54" width="10" height="80" fill="${steel}" stroke="${sl}" transform="translate(-5 0)"/><rect x="574" y="54" width="10" height="84" fill="${steel}" stroke="${sl}"/>`;
    s+=`<rect x="478" y="134" width="106" height="10" fill="#8FA0B6" stroke="${sl}"/>`;
    s+=`<rect x="478" y="144" width="10" height="194" fill="#8FA0B6" stroke="${sl}"/><rect x="574" y="144" width="10" height="194" fill="#8FA0B6" stroke="${sl}"/>`;
    s+=`<rect x="492" y="146" width="78" height="192" fill="var(--draw)" stroke="#B98A5A" stroke-width="3" stroke-dasharray="6 3"/>`;
  }
  if(!d.open){
    const sx=d.door?[418,642]:[418,474,530,586,642];
    sx.forEach(x=>{for(let y=64;y<=328;y+=25)s+=`<circle cx="${x}" cy="${y}" r="2.1" fill="#4A5568"/>`});
    s+=`<line x1="${d.door?618:544}" y1="54" x2="${d.door?618:544}" y2="338" stroke="#8E95A3" stroke-width="1.4"/>`;
    if(d.doble)s+=`<line x1="${d.door?460:600}" y1="54" x2="${d.door?460:600}" y2="338" stroke="${OR}" stroke-width="1.6" stroke-dasharray="6 4"/>`;
    if(d.demo)s+=`<rect x="418" y="54" width="252" height="284" fill="url(#p-demo)" stroke="#D32F2F" stroke-width="2.4" stroke-dasharray="7 4"/>`;
  }
  s+=`<line x1="254" y1="104" x2="302" y2="104" stroke="${OR}" stroke-width="2" marker-end="url(#arr)" marker-start="url(#arr)"/>`;
  const A={canalSup:[330,49],canalInf:[330,343],montante:[306,210],dim:[278,104],lana:[334,250],
    placa:d.door?[450,230]:[610,250],tornillo:[d.door?418:474,139],junta:[d.door?618:544,200],
    jamba:[481,300],dintel:[530,139],cerco:[530,300],banda:[330,336],doble:[d.door?460:600,300],estructura:[218,200]};
  const cs=d.parts.map((p,i)=>{const a=A[p[0]];return{n:i+1,label:p[1],ax:a[0],ay:a[1],side:p[2]}});
  return svgWrap(s,callouts(cs));
}
/* ---- fábrica de ladrillo / bloque (alzado) ---- */
function dBrick(d){
  let s='';const conc=(x,y,w,h)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#p-conc)" stroke="${ST}" stroke-width="1.4"/>`;
  s+=conc(206,26,488,20)+conc(206,348,488,18)+conc(206,46,26,302)+conc(668,46,26,302);
  const pat=d.bloque?'block':'brick';
  s+=`<rect x="232" y="62" width="436" height="276" fill="url(#p-${pat})" stroke="${ST}" stroke-width="1.4"/>`;
  s+=`<rect x="232" y="46" width="436" height="16" fill="url(#p-wool)" stroke="${ST}" stroke-width="1"/>`;
  if(d.door){
    s+=`<rect x="430" y="172" width="100" height="166" fill="var(--draw)" stroke="${ST}" stroke-width="1.4"/>`;
    s+=`<rect x="414" y="150" width="132" height="22" fill="#9AA7B8" stroke="${ST}" stroke-width="1.4"/>`;
  }
  if(d.demo)s+=`<rect x="232" y="62" width="436" height="276" fill="url(#p-demo)" stroke="#D32F2F" stroke-width="2.4" stroke-dasharray="7 4"/>`;
  const A={pilar:[219,200],forjado:[450,36],juntaSup:[600,54],mortero:[320,222],hilada:[600,130],cargadero:[480,161],hueco:[480,260],replanteo:[300,343],anclaje:[232,262],pegado:[560,302]};
  const cs=d.parts.map((p,i)=>{const a=A[p[0]];return{n:i+1,label:p[1],ax:a[0],ay:a[1],side:p[2]}});
  return svgWrap(s,callouts(cs));
}
/* ---- huecos: ventana, puerta, corredera, vidrio ---- */
function dOpening(d){
  let s='';const conc=(x,y,w,h)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#p-conc)" stroke="${ST}" stroke-width="1.4"/>`;
  s+=conc(206,26,488,18)+conc(206,356,488,18);
  s+=`<rect x="226" y="44" width="448" height="312" fill="#DAD6CC" stroke="${ST}" stroke-width="1.4"/>`;
  const wood='#B98A5A',al='#AEB8C6';let A={};
  if(d.kind==='window'){
    s+=conc(340,92,220,18);
    if(d.toldo)s+=`<path d="M330 60H570L585 92H315Z" fill="${OR}" stroke="${ST}"/><path d="M360 60L350 92M400 60L395 92M440 60L440 92M480 60L485 92M520 60L530 92" stroke="#fff" stroke-width="5"/>`;
    s+=`<rect x="352" y="112" width="196" height="160" fill="${al}" stroke="${ST}" stroke-width="2"/>`;
    s+=`<rect x="366" y="126" width="168" height="132" fill="#BCD9EE" stroke="${ST}" stroke-width="1.5"/><path d="M380 250L430 134M410 250L460 134" stroke="#fff" stroke-width="6" opacity=".55"/>`;
    s+=`<rect x="448" y="124" width="4" height="136" fill="${al}" stroke="${ST}"/>`;
    s+=`<rect x="334" y="272" width="232" height="12" fill="#7F8AA0" stroke="${ST}" stroke-width="1.4"/>`;
    s+=`<rect x="349" y="109" width="202" height="166" fill="none" stroke="#2F3B52" stroke-width="3" stroke-dasharray="5 3"/>`;
    if(d.reja){for(let x=366;x<=534;x+=24)s+=`<line x1="${x}" y1="114" x2="${x}" y2="270" stroke="#2F3B52" stroke-width="4"/>`;s+=`<line x1="356" y1="150" x2="544" y2="150" stroke="#2F3B52" stroke-width="4"/><line x1="356" y1="230" x2="544" y2="230" stroke="#2F3B52" stroke-width="4"/>`}
    A={dintel:[450,101],premarco:[349,190],marco:[352,200],vidrio:[410,190],hoja:[450,190],vierteaguas:[450,278],sellado:[551,130],reja:[500,150],toldo:[450,76],pelo:[534,190]};
  }else if(d.kind==='door'||d.kind==='doorMetal'){
    const col=d.kind==='doorMetal'?'#8D9BAE':wood;
    s+=`<rect x="384" y="106" width="132" height="250" fill="none" stroke="#2F3B52" stroke-width="3" stroke-dasharray="5 3"/>`;
    s+=`<rect x="392" y="114" width="116" height="236" fill="${col}" stroke="${ST}" stroke-width="2"/>`;
    s+=`<rect x="404" y="130" width="92" height="90" fill="none" stroke="${ST}" stroke-opacity=".5"/><rect x="404" y="236" width="92" height="98" fill="none" stroke="${ST}" stroke-opacity=".5"/>`;
    s+=`<rect x="378" y="100" width="144" height="12" fill="#E8E8E3" stroke="${ST}"/><rect x="378" y="100" width="12" height="256" fill="#E8E8E3" stroke="${ST}"/><rect x="510" y="100" width="12" height="256" fill="#E8E8E3" stroke="${ST}"/>`;
    [138,230,322].forEach(y=>{s+=`<rect x="390" y="${y}" width="6" height="22" fill="#5A6475" stroke="#222"/>`});
    s+=`<rect x="484" y="232" width="22" height="7" rx="3" fill="#C9CED8" stroke="#222"/>`;
    s+=`<rect x="392" y="350" width="116" height="6" fill="#fff" opacity=".0"/><rect x="226" y="338" width="152" height="18" fill="#EFEFE9" stroke="${ST}"/><rect x="522" y="338" width="152" height="18" fill="#EFEFE9" stroke="${ST}"/>`;
    A={precerco:[384,200],cerco:[516,150],tapajuntas:[378,260],bisagras:[393,149],hoja:[450,170],manilla:[495,236],holgura:[450,353],dintel:[450,104],cerradura:[500,225],rodapie:[300,347]};
  }else if(d.kind==='cassette'){
    s+=`<rect x="226" y="44" width="448" height="62" fill="#E7E9EC" stroke="#8E95A3"/>`;
    s+=`<rect x="486" y="106" width="188" height="250" fill="#CBD0D9" stroke="${ST}" stroke-dasharray="7 4" stroke-width="1.6"/>`;
    s+=`<rect x="486" y="106" width="188" height="250" fill="url(#p-wool)" opacity=".18"/>`;
    s+=`<rect x="396" y="112" width="190" height="238" fill="${wood}" stroke="${ST}" stroke-width="2"/>`;
    s+=`<rect x="380" y="100" width="300" height="9" fill="#7F8AA0" stroke="${ST}"/>`;
    s+=`<rect x="396" y="112" width="10" height="238" fill="#5B6475" opacity=".35"/>`;
    s+=`<rect x="410" y="214" width="14" height="40" rx="5" fill="#C9CED8" stroke="#222"/>`;
    s+=`<rect x="380" y="106" width="16" height="250" fill="#8FA0B6" stroke="${ST}"/>`;
    A={guia:[540,104],cassette:[600,240],hoja:[460,170],jamba:[388,230],cierre:[640,70],tirador:[417,234],dintel:[300,76],suelo:[540,352]};
  }else if(d.kind==='glass'){
    s+=`<rect x="372" y="104" width="156" height="252" fill="#BCD9EE" stroke="${ST}" stroke-width="2"/><path d="M392 340L470 120M424 340L500 120" stroke="#fff" stroke-width="9" opacity=".5"/>`;
    s+=`<rect x="372" y="104" width="156" height="8" fill="#2F3B52"/><rect x="372" y="348" width="156" height="8" fill="#2F3B52"/><rect x="372" y="104" width="8" height="252" fill="#2F3B52"/>`;
    s+=`<rect x="505" y="190" width="9" height="90" rx="4" fill="#C9CED8" stroke="#222"/>`;
    s+=`<circle cx="376" cy="108" r="6" fill="#C9CED8" stroke="#222"/><circle cx="376" cy="352" r="6" fill="#C9CED8" stroke="#222"/>`;
    A={vidrio:[450,210],perfil:[450,108],bisagras:[376,108],tirador:[509,236],suelo:[450,352],cerradura:[509,270],hoja:[420,160],sello:[528,300]};
  }
  const cs=d.parts.map((p,i)=>{const a=A[p[0]];return{n:i+1,label:p[1],ax:a[0],ay:a[1],side:p[2]}});
  return svgWrap(s,callouts(cs));
}
/* ---- diagrama de proceso ---- */
function dFlow(d){
  const N=d.nodes,k=N.length,per=k<=4?k:(k<=6?3:4),rows=Math.ceil(k/per);
  const bw=Math.min(184,(W-40)/per-30),bh=rows>1?112:128,cw=(W-40)/per,rh=(H-30)/rows;
  const pos=N.map((n,i)=>{const r=Math.floor(i/per),c=i%per;return{x:20+cw*(c+.5),y:15+rh*(r+.5)}});
  let g='';
  for(let i=0;i<k-1;i++){
    const a=pos[i],b=pos[i+1];
    if(a.y===b.y)g+=`<line x1="${a.x+bw/2+2}" y1="${a.y}" x2="${b.x-bw/2-8}" y2="${b.y}" stroke="var(--ar)" stroke-width="2.4" marker-end="url(#arr)"/>`;
    else g+=`<path d="M${a.x} ${a.y+bh/2+2}V${(a.y+b.y)/2}H${b.x}V${b.y-bh/2-8}" fill="none" stroke="var(--ar)" stroke-width="2.4" marker-end="url(#arr)"/>`;
  }
  N.forEach((n,i)=>{
    const p=pos[i],t=wrap(n[0],bw>150?17:14),sub=wrap(n[1]||'',bw>150?24:19).slice(0,5);
    g+=`<rect x="${p.x-bw/2}" y="${p.y-bh/2}" width="${bw}" height="${bh}" rx="9" fill="var(--pill)" stroke="${n[2]?'#D32F2F':'#C7D0DF'}" stroke-width="${n[2]?2.6:1.4}"/>`;
    g+=`<text fill="var(--pill-ink)" font-family="'Barlow Condensed','Arial Narrow',Arial" font-weight="800" font-size="19">${t.map((x,j)=>`<tspan x="${p.x-bw/2+16}" y="${p.y-bh/2+34+j*19}">${esc(x.toUpperCase())}</tspan>`).join('')}</text>`;
    const y0=p.y-bh/2+34+t.length*19+6;
    g+=`<text fill="#4A5A75" class="cl2">${sub.map((x,j)=>`<tspan x="${p.x-bw/2+16}" y="${y0+j*15}">${esc(x)}</tspan>`).join('')}</text>`;
    g+=`<circle cx="${p.x-bw/2}" cy="${p.y-bh/2}" r="14" fill="${OR}" stroke="#fff" stroke-width="2"/><text x="${p.x-bw/2}" y="${p.y-bh/2+6}" text-anchor="middle" fill="#fff" class="cb" style="font-size:17px">${i+1}</text>`;
  });
  return svgWrap(g);
}
const DRAW={layersH:dLayersH,layersV:dLayersV,stud:dStud,brick:dBrick,opening:dOpening,flow:dFlow};

/* ===== Interfaz ===== */
const CAPS={'00':'Honorarios de obra','01':'Demoliciones','02':'Albañilería','03':'Solados y alicatados','04':'Fontanería','05':'Climatización y gas','06':'Electricidad','07':'Carpintería exterior','08':'Carpintería interior','09':'Chapados','10':'Pintura','11':'Cartelería','12':'Sanitarios y grifería','13':'Iluminación','14':'Mobiliario de obra','15':'Protección contra incendios','16':'Cimentación y estructura'};
const MK={no:`<svg class="mk" viewBox="0 0 30 30" aria-label="No"><path d="M5 5L25 25M25 5L5 25" stroke="#D32F2F" stroke-width="6" stroke-linecap="round"/></svg>`,
 si:`<svg class="mk" viewBox="0 0 30 30" aria-label="Sí"><path d="M4 16L12 24L27 6" fill="none" stroke="#1B8F50" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>`};
function match(f){
  const keys=f.m||[];return BUDGET.filter(b=>(f.caps||[f.cap]).includes(b[0])&&keys.some(k=>b[1].toUpperCase().includes(k)));
}
function fichaHTML(f,i){
  const ps=match(f);
  const pc=ps.map(b=>`<span><b>${b[0]}</b>${esc(b[1].toLowerCase().replace(/^./,c=>c.toUpperCase()))}</span>`).join('');
  return `<article class="ficha" id="f${i+1}" data-cap="${f.cap}" data-q="${esc((f.t+' '+f.s+' '+ps.map(p=>p[1]).join(' ')+' '+f.steps.map(x=>x[0]).join(' ')).toLowerCase())}">
  <div class="fh"><div class="meta"><span>Ficha ${String(i+1).padStart(2,'0')}</span><span class="cap">${f.cap} · ${CAPS[f.cap]}</span></div>
  <h3>${esc(f.t)}</h3><p>${esc(f.s)}</p></div>
  <div class="bar"><i>1</i>Cómo se ve</div>
  ${drawBlock(f,i)}
  <div class="bar"><i>2</i>Paso a paso</div>
  <div class="steps">${f.steps.map((s,j)=>`<div class="step"><span class="dot">${j+1}</span><b>${esc(s[0])}</b><p>${esc(s[1])}</p></div>`).join('')}</div>
  <div class="bar"><i>3</i>Lo que no y cómo va</div>
  <div class="cols"><div class="colh no">✕ Lo que no</div><div class="colh si">✓ Cómo va</div></div>
  <div class="pairs">${f.no.map((n,j)=>`<div class="cell no">${MK.no}<p>${esc(n)}</p></div><div class="cell si">${MK.si}<p>${esc(f.si[j])}</p></div>`).join('')}</div>
  <div class="foot"><div><h4>Foto antes de tapar</h4><p>${esc(f.foto)}</p></div>
  <div><h4>En tu presupuesto (${ps.length} partidas)</h4><div class="pchips">${pc||'<span>Sin partidas enlazadas</span>'}</div></div></div>
  </article>`;
}
function init(){
  document.getElementById('defs').innerHTML=DEFS;
  const box=document.getElementById('fichas');box.innerHTML=FICHAS.map(fichaHTML).join('');
  const caps=['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16'];
  const nF=c=>FICHAS.filter(f=>f.cap===c).length;
  document.getElementById('tiles').innerHTML=caps.map(c=>`<button class="tile" data-c="${c}"><b>${c}</b><span>${CAPS[c]}</span><small>${nF(c)} ficha${nF(c)==1?'':'s'} · ${BUDGET.filter(b=>b[0]===c).length} partidas</small></button>`).join('');
  document.getElementById('chips').innerHTML=`<button class="chip" data-c="" aria-pressed="true">Todo</button>`+caps.filter(c=>nF(c)).map(c=>`<button class="chip" data-c="${c}" aria-pressed="false">${c} ${CAPS[c]}</button>`).join('');
  let cap='',q='';
  const apply=()=>{let n=0;document.querySelectorAll('.ficha').forEach(a=>{const ok=(!cap||a.dataset.cap===cap)&&(!q||a.dataset.q.includes(q));a.hidden=!ok;if(ok)n++});
    document.getElementById('count').textContent=n+' de '+FICHAS.length+' fichas';document.getElementById('vacio').hidden=n>0;
    document.querySelectorAll('.chip').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.c===cap)))};
  const setCap=c=>{cap=c;apply()};
  document.getElementById('chips').addEventListener('click',e=>{const b=e.target.closest('.chip');if(b)setCap(b.dataset.c)});
  document.getElementById('tiles').addEventListener('click',e=>{const b=e.target.closest('.tile');if(b){setCap(b.dataset.c);document.getElementById('tools').scrollIntoView({behavior:'smooth'})}});
  document.getElementById('q').addEventListener('input',e=>{q=e.target.value.trim().toLowerCase();apply()});
  apply();
  if(window.THREE)init3d();
}
