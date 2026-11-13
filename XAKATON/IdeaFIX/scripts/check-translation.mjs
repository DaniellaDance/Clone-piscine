import {translateTexts} from '../translation.mjs';
for(const language of ['en','kk']){
 const output=await translateTexts(['Пилот складского учёта','Срок проекта — 26.11.2026, бюджет 150000 KZT.'],language);
 if(output.some(s=>!s.trim())||output[0]==='Пилот складского учёта'||!output[1].includes('26.11.2026')||!output[1].includes('150000'))throw Error('Translation smoke check failed for '+language);
 console.log('Content translation provider verified:',language);
}
