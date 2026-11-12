import {readFile} from 'node:fs/promises';
import {createNeonClient} from '@neon/sdk';
const {NEON_API_KEY,HORSECUP_DATABASE_URL,GITHUB_SHA}=process.env;
if(!NEON_API_KEY)throw Error('GitHub secret NEON_API_KEY is required');
const neon=createNeonClient({apiKey:NEON_API_KEY,throwOnError:true});
const projectId='rapid-shadow-79011591',branchId='br-patient-wildflower-baqlr622',slug='horsecup';
const path=process.argv[2];if(!path)throw Error('Usage: deploy-neon.mjs <zip>');
const bytes=await readFile(path);console.log('Deploying HorseCup:',bytes.length,'bytes');
const environment={NEON_FUNCTION:'1',...(HORSECUP_DATABASE_URL?{DATABASE_URL:HORSECUP_DATABASE_URL}:{})};
const d=await neon.functions.deploy({projectId,branchId,slug,zip:new File([bytes],'horsecup.zip',{type:'application/zip'}),runtime:'nodejs24',environment});
console.log('Neon deployment accepted',d?.id||'pending');
let active=false;const deadline=Date.now()+240000;
while(Date.now()<deadline){const fn=await neon.functions.get({projectId,branchId,slug});const cur=fn.current_deployment;if(['failed','error'].includes(cur?.status))throw Error('Neon deployment failed: '+(cur.error||cur.status));if(cur?.status==='completed'&&fn.active_deployment?.id===cur.id){active=true;console.log('Active deployment:',cur.id);break}await new Promise(r=>setTimeout(r,5000))}
if(!active)throw Error('Neon deployment activation timeout');
const fn=await neon.functions.get({projectId,branchId,slug});const url=fn.invocation_url||'https://br-patient-wildflower-baqlr622-horsecup.compute.c-8.eu-central-1.aws.neon.tech';
console.log('Neon function URL:',url);
for(const route of ['/healthz','/','/manifest.webmanifest','/js/game.js','/images/voronaya.webp','/images/animations/black.gif']){const resp=await fetch(url.replace(/\/$/,'')+route,{signal:AbortSignal.timeout(20000),headers:{'Cache-Control':'no-cache'}});if(!resp.ok)throw Error('Smoke test '+route+' failed: '+resp.status);console.log('OK',route,resp.status)}
let verified=false;for(let attempt=0;attempt<30;attempt++){const revision=await fetch(url.replace(/\/$/,'')+'/deployment.json?revision='+GITHUB_SHA+'&attempt='+attempt,{signal:AbortSignal.timeout(20000),cache:'no-store',headers:{'Cache-Control':'no-cache'}}).then(r=>r.json());if(revision.commit===GITHUB_SHA){verified=true;break}await new Promise(r=>setTimeout(r,2000))}if(!verified)throw Error('Published revision mismatch after propagation wait');
console.log('HorseCup Neon verified:',url,'commit:',GITHUB_SHA);

