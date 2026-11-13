// Run on GitHub's runner, whose network can reach the isolated branch directly.
import {spawnSync} from 'node:child_process';
const project='aged-wildflower-12030818',branch='br-fragrant-meadow-b9qekwt1';
if(!process.env.NEON_API_KEY)throw Error('NEON_API_KEY required for isolated checks');
const params=new URLSearchParams({branch_id:branch,database_name:'neondb',role_name:'neondb_owner',pooled:'false'});
const response=await fetch(`https://console.neon.tech/api/v2/projects/${project}/connection_uri?${params}`,{headers:{Authorization:'Bearer '+process.env.NEON_API_KEY},signal:AbortSignal.timeout(30000)});
if(!response.ok)throw Error('Cannot retrieve isolated branch connection: '+response.status);
const data=await response.json();if(!data.uri)throw Error('No isolated URI');
console.log('::add-mask::'+data.uri);
const result=spawnSync(process.execPath,['--test','upgrade.integration.test.mjs'],{stdio:'inherit',env:{...process.env,DATABASE_URL:data.uri,TEST_DATABASE_URL:data.uri,NEON_FUNCTION:'1',DIRECTOR_PASSWORD:''},timeout:180000,killSignal:'SIGKILL'});
if(result.status!==0)process.exit(result.status||1);
