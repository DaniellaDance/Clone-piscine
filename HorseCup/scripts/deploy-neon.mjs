import {readFile} from 'node:fs/promises';
import {createNeonClient} from '@neon/sdk';
const {NEON_API_KEY,HORSECUP_DATABASE_URL,GITHUB_SHA}=process.env;
if(!NEON_API_KEY)throw Error('GitHub secret NEON_API_KEY is required');
const neon=createNeonClient({apiKey:NEON_API_KEY,throwOnError:true});
const projectId='rapid-shadow-79011591',branchId='br-patient-wildflower-baqlr622',slug='horsecup';
const path=process.argv[2];if(!path)throw Error('Usage: deploy-neon.mjs <zip>');
const bytes=await readFile(path);console.log('Deploying HorseCup:',bytes.length,'bytes');
const environment=HORSECUP_DATABASE_URL?{DATABASE_URL:HORSECUP_DATABASE_URL}:{};
const d=await neon.functions.deploy({projectId,branchId,slug,zip:new File([bytes],'horsecup.zip',{type:'application/zip'}),runtime:'nodejs24',environment});
console.log('Neon deployment accepted',d?.id||'pending');
let active=false;const deadline=Date.now()+240000;
while(Date.now()<deadline){const fn=await neon.functions.get({projectId,branchId,slug});const cur=fn.current_deployment;if(['failed','error'].includes(cur?.status))throw Error('Neon deployment failed');if(cur?.status==='completed'&&fn.active_deployment?.id===cur.id){active=true;console.log('Active deployment:',cur.id);break}await new Promise(r=>setTimeout(r,5000))}
if(!active)throw Error('Neon deployment activation timeout');
const fn=await neon.functions.get({projectId,branchId,slug});const url=fn.url||fn.endpoint||fn.invoke_url||('https://'+branchId+'-'+slug+'.compute.c-7.eu-central-1.aws.neon.tech');
console.log('Neon function URL:',url);
for(const route of ['/healthz','/','/manifest.webmanifest']){const resp=await fetch(url+route,{signal:AbortSignal.timeout(20000),headers:{'Cache-Control':'no-cache'}});if(!resp.ok)throw Error('Smoke test '+route+' failed: '+resp.status);console.log('OK',route,resp.status)}
console.log('HorseCup Neon verified:',url,'commit:',GITHUB_SHA);
