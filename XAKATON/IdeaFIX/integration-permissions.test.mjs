import {test} from 'node:test';
import assert from 'node:assert/strict';
import {handleBitrixAccount} from './bitrix-account.mjs';
import {handleBitrix} from './bitrix.mjs';
import {handleFathom} from './fathom.mjs';
const fail=(status,message)=>{throw Object.assign(new Error(message),{status})};
for(const role of ['employee','lead'])for(const [handler,path,method] of [
 [handleBitrixAccount,'/api/bitrix/account','PUT'],
 [handleBitrixAccount,'/api/bitrix/account','DELETE'],
 [handleBitrix,'/api/bitrix/config','PUT'],
 [handleFathom,'/api/fathom/connection','GET'],
 [handleFathom,'/api/fathom/connection','PUT'],
])test(`${role} cannot configure ${method} ${path}`,async()=>{
 await assert.rejects(handler({url:new URL('https://test'+path),req:{method},u:{id:'u',role},fail,
  body:()=>{throw Error('Unauthorized body read')},query:()=>{throw Error('Unauthorized database access')}}),{status:403});
});
for(const role of ['director','admin'])test(`${role} can manage Bitrix and Fathom connections`,async()=>{
 const context={u:{id:'u',role},fail,send(){},query:async()=>({rows:[]}),body:async()=>({enabled:false})};
 assert.equal(await handleBitrixAccount({...context,url:new URL('https://test/api/bitrix/account'),req:{method:'DELETE'}}),true);
 assert.equal(await handleFathom({...context,url:new URL('https://test/api/fathom/connection'),req:{method:'PUT'}}),true);
 await assert.rejects(handleBitrix({...context,url:new URL('https://test/api/bitrix/config'),req:{method:'GET'}}),{status:405});
});
