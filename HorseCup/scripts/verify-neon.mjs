import {spawnSync} from 'node:child_process';
const response=await fetch('https://console.neon.tech/api/v2/projects/rapid-shadow-79011591/connection_uri?branch_id=br-icy-salad-bakduri7&database_name=neondb&role_name=neondb_owner',{headers:{Authorization:'Bearer '+process.env.NEON_API_KEY},signal:AbortSignal.timeout(20000)});
if(!response.ok)throw Error('Cannot connect to isolated HorseCup verification database: '+response.status);
const data=await response.json();if(!data.uri)throw Error('No verification connection returned');
const result=spawnSync(process.execPath,['integration-neon.mjs'],{env:{...process.env,DATABASE_URL:data.uri},stdio:'inherit',timeout:120000});
if(result.status!==0)throw Error('HorseCup database integration checks failed');
