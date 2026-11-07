// Deterministic Russian-language baseline. Keep both browser and server checks identical.
const aliases={a:'а',c:'с',e:'е',o:'о',p:'р',x:'х',y:'у',k:'к',m:'м',t:'т',b:'в',h:'н',u:'у',i:'и','0':'о','3':'з'};
const normalize=value=>String(value||'').normalize('NFKC').toLowerCase().replace(/ё/g,'е').replace(/[aceopxykmtbhui03]/g,c=>aliases[c]);
const stems=['бля(?:д|т|ть|ха)','(?:на|по|за|вы|от|до|при|про)?хуй','хуе','хуя','(?:по|за|вы|от|до|при|про)?пизд','(?:за|вы|от|до|при|про|на|по)?еб(?:а|у|и|л|н)','ебан','ебуч','ебен','сука','суки','суке','суку','сукой','мудак','мудил','долбоеб','гандон','говнюк','идиот','дебил','кретин','тупиц','мраз','урод','дурак','дурач','дура','сволоч','придур'];
const direct=new RegExp('(?:^|[^а-я])(?:'+stems.join('|')+')[а-я]*(?=$|[^а-я])','u');
const disguised=['бляд','блять','хуй','пизд','ебан','мудак','долбоеб','идиот','дебил'].map(stem=>new RegExp('(?:^|[^а-я])'+Array.from(stem).join('[\\s\\p{P}\\p{S}\\d]*')+'[а-я]*(?=$|[^а-я])','u'));
export const TEXT_POLICY_MESSAGE='Смена тона увеличит скорость обработки заявки в 2 раза';
export function hasAbuse(...values){return values.some(value=>{const text=normalize(value);return direct.test(text)||disguised.some(re=>re.test(text)||re.test(normalize(String(value).replace(/[0-9]/g,''))));});}
