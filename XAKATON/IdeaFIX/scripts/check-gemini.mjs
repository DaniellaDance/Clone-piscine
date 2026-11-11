// CI preflight: verify Gemini credentials and a real generateContent request.
const key=process.env.GEMINI_API_KEY?.trim();
if(!key)throw new Error('GEMINI_API_KEY secret is missing');
const preferred=[process.env.GEMINI_MODEL,'gemini-2.5-flash','gemini-2.5-flash-lite','gemini-2.0-flash'].filter(Boolean);
const headers={'x-goog-api-key':key,'content-type':'application/json'};
const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),25000);
try{
 const r=await fetch('https://generativelanguage.googleapis.com/v1beta/models?pageSize=1000',{headers,signal:controller.signal});
 if(!r.ok)throw new Error('Gemini models.list failed HTTP '+r.status);
 const data=await r.json();
 const available=new Set((data.models||[]).filter(m=>(m.supportedGenerationMethods||[]).includes('generateContent')).map(m=>m.name?.replace(/^models\//,'')));
 const candidates=[...new Set(preferred)].filter(m=>available.has(m));
 if(!candidates.length)throw new Error('No supported Gemini generateContent model available for this key');
 let selected=null;
 for(const model of candidates){
  const test=await fetch('https://generativelanguage.googleapis.com/v1beta/models/'+encodeURIComponent(model)+':generateContent',{method:'POST',headers,signal:controller.signal,body:JSON.stringify({contents:[{parts:[{text:'Return exactly: OK'}]}],generationConfig:{maxOutputTokens:16}})});
  console.log('Gemini model preflight',model,'HTTP',test.status);
  if(test.ok){selected=model;break}
  if(test.status===401||test.status===403)throw new Error('Gemini authorization denied HTTP '+test.status);
  if(test.status===429)throw new Error('Gemini quota exhausted HTTP 429');
 }
 if(!selected)throw new Error('No candidate Gemini model passed generateContent');
 const fs=await import('node:fs');
 fs.appendFileSync(process.env.GITHUB_ENV,'GEMINI_MODEL='+selected+'\n');
 console.log('Verified Gemini model:',selected);
}catch(e){console.error('Gemini preflight failed:',e.message);process.exitCode=1}finally{clearTimeout(timer)}
