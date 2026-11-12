// Adapt the existing HTTP routes to Neon's Web-standard function entry point.
process.env.NEON_FUNCTION='1';
const {handleRequest}=await import('./server.mjs');
export default {async fetch(request){
 const url=new URL(request.url),headers=Object.fromEntries(request.headers);headers.host=url.host;
 const req={url:url.pathname+url.search,method:request.method,headers,socket:{remoteAddress:'neon'},async *[Symbol.asyncIterator](){yield Buffer.from(await request.arrayBuffer())}};
 const out=new Headers();let status=200,bytes;
 const res={writeHead(s,h={}){status=s;for(const[k,v]of Object.entries(h))out.set(k,String(v))},setHeader(k,v){out.set(k,String(v))},end(value){bytes=value}};
 await handleRequest(req,res);return new Response(bytes,{status,headers:out});
}};
