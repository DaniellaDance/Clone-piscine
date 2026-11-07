// Modus Trade Centre: integration boundary. No corporate credentials in source code.
const supported=['1c','bitrix24','postgresql'];
export function integrationConfig(env=process.env){
 const kind=String(env.CORPORATE_INTEGRATION||'none').toLowerCase();
 if(kind!=='none'&&!supported.includes(kind))throw Error('Unknown integration type');
 return {kind,enabled:kind!=='none',baseUrl:env.CORPORATE_API_URL||'',timeoutMs:8000};
}
export function normalizeTicket(source,item){
 if(!item||typeof item!=='object')throw Error('Invalid ticket');
 return {externalId:String(item.id||item.ID||item.number||''),title:String(item.title||item.TITLE||item.subject||''),description:String(item.description||item.DESCRIPTION||''),status:String(item.status||item.STAGE_ID||'new'),updatedAt:item.updatedAt||item.DATE_MODIFY||null,source};
}
export function normalizePerson(source,item){
 if(!item||typeof item!=='object')throw Error('Invalid person');
 return {externalId:String(item.id||item.ID||''),name:String(item.name||item.NAME||''),email:String(item.email||item.EMAIL||''),source};
}
export function createCorporateAdapter(env=process.env){
 const config=integrationConfig(env);
 if(!config.enabled)return {kind:'none',enabled:false,async health(){return {configured:false}}};
 if(config.kind==='postgresql')return {kind:'postgresql',enabled:true,async health(){return {configured:Boolean(env.CORPORATE_DATABASE_URL),connected:false,reason:'Read-only SQL integration requires approved schema and service credentials'}}};
 if(!config.baseUrl||!config.baseUrl.startsWith('https://'))throw Error('Corporate API HTTPS URL is required');
 const allowed=new URL(config.baseUrl);if(allowed.username||allowed.password)throw Error('Do not put credentials in URL');
 const token=config.kind==='bitrix24'?env.BITRIX24_TOKEN:env.CORPORATE_API_TOKEN;
 return {kind:config.kind,enabled:true,async health(){return {configured:Boolean(token),connected:false,reason:'Endpoint mapping and permission review required'}}};
}
