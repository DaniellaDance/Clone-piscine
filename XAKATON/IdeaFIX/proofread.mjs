// A conservative editor: spelling suggestions are always reviewed by the author.
export function formatText(text) {
  let out=text.replace(/\r\n?/g,'\n').replace(/[\t \u00a0]+/g,' ').replace(/ *\n */g,'\n').replace(/\n{3,}/g,'\n\n').trim();
  out=out.replace(/ +([,;!?])/g,'$1').replace(/(^|[!?]\s+|\n)(\p{Ll})/gu,(_,prefix,c)=>prefix+c.toUpperCase());
  if(out&&!/[.!?:;…»"\)\]]$/u.test(out)&&/\p{L}$/u.test(out))out+='.';
  return out;
}
export function applySuggestions(text,errors) {
  if(!Array.isArray(errors))throw new Error('Invalid spelling response');
  let out=text,end=text.length,changes=[];
  for(const e of [...errors].sort((a,b)=>b.pos-a.pos)){
    if(!Number.isInteger(e.pos)||!Number.isInteger(e.len)||e.pos<0||e.len<1||e.pos+e.len>end||text.slice(e.pos,e.pos+e.len)!==e.word)continue;
    const replacement=e.s?.[0];
    // Preserve names, abbreviations, identifiers, URLs, numbers, and unsupported scripts.
    if(typeof replacement!=='string'||!replacement||replacement.length>120||/\d|[@/:]/u.test(e.word)||/^\p{Lu}/u.test(e.word)||/[әғқңөұүһі]/iu.test(e.word)||!/[\p{L}]/u.test(e.word))continue;
    out=out.slice(0,e.pos)+replacement+out.slice(e.pos+e.len);end=e.pos;
    changes.unshift({from:e.word,to:replacement});
  }
  return {text:formatText(out),changes};
}
export async function proofread(text,language='ru',fetcher=fetch){
  if(typeof text!=='string'||text.trim().length<10||text.length>5000)throw Object.assign(new Error('Текст должен содержать от 10 до 5000 символов'),{status:400});
  if(!['ru','en','kk'].includes(language))throw Object.assign(new Error('Выберите язык текста'),{status:400});
  if(language==='kk')return {text:formatText(text),changes:[],checked:false,reason:'language'};
  try{
    const response=await fetcher('https://speller.yandex.net/services/spellservice.json/checkText',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({text,lang:language==='ru'?'ru,en':'en',options:'7',format:'plain'}),signal:AbortSignal.timeout(12000),redirect:'error'});
    if(!response.ok)throw new Error('Spelling service unavailable');
    const result=applySuggestions(text,await response.json());
    if(result.text.length>5000)throw new Error('Result too long');
    return {...result,checked:true};
  }catch{return {text:formatText(text),changes:[],checked:false,reason:'unavailable'}}
}
