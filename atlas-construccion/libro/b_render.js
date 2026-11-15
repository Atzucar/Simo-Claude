const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const only=process.argv.slice(2);
const b=await chromium.launch({args:['--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
const p=await b.newPage({viewport:{width:900,height:560},deviceScaleFactor:2});
await p.route('**/three.min.js',r=>r.fulfill({body:fs.readFileSync('/tmp/claude-0/three.min.js'),contentType:'application/javascript'}));
const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('file://'+process.cwd()+'/b_page.html');await p.waitForTimeout(800);
const n=await p.evaluate(()=>FIGS.map(f=>f.id));fs.mkdirSync('figs',{recursive:true});
for(let i=0;i<n.length;i++){if(only.length&&!only.includes(n[i]))continue;
 const r=await p.evaluate(i=>{try{return renderFig(i)}catch(e){return 'ERR '+e.message+' '+(e.stack||'').split('\n')[1]}},i);
 if(r!=='ok'){console.log(n[i],r);continue}
 await p.waitForTimeout(350);
 await p.locator('#fig').screenshot({path:'figs/'+n[i]+'.png'});await p.evaluate(()=>V.unmount());}
console.log('errs',errs.slice(0,5));await b.close()})();
