import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

const source=readFileSync(new URL('./public/assets/catalog-ui.js',import.meta.url),'utf8');
for(const selected of ['vendors','clients','map'])test(`periodic catalog refresh preserves ${selected} tab`,()=>{
 let resized=0;
 const view={dataset:{catalogMode:'ecosystem'},querySelector(selector){
  if(selector==='#vendor-search')return {};
  if(selector==='[data-partner-tab="map"].active')return selected==='map'?{}:null;
  return null;
 }};
 const context=vm.createContext({Intl,window:{IFCatalog:{}},$:selector=>selector==='#view'?view:null});
 vm.runInContext(source,context);
 context.resize=()=>resized++;
 vm.runInContext('partnerMap={invalidateSize:resize};selectPartnerTab=()=>{throw Error("Unexpected tab change")};renderCatalog("ecosystem");renderCatalog("ecosystem")',context);
 assert.equal(resized,selected==='map'?2:0);
});
