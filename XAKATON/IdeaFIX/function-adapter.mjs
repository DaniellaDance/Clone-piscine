import {handleRequest,init} from './server.mjs';
let ready;
export default {async fetch(request){
ready ||= init().catch(e=>{ready=null;throw e});await ready;
const url=new URL(request.url), headers=Object.fromEntries(request.headers);
headers.host=url.host;headers['x-forwarded-proto']=url.protocol.slice(0,-1);
const req={url:url.pathname+url.search,headers,method:request.method,socket:{remoteAddress:'function'},async *[Symbol.asyncIterator](){yield Buffer.from(await request.arrayBuffer())}};
const outputHeaders=new Headers();let status=200,output;
const res={setHeader(k,v){outputHeaders.set(k,String(v))},writeHead(s,h={}){status=s;for(const [k,v]of Object.entries(h))outputHeaders.set(k,v)},end(b){output=b}};
await handleRequest(req,res);return new Response(output,{status,headers:outputHeaders});
}};
