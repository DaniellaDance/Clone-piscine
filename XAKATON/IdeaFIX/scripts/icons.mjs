// Render the same native vector geometry into SVG and installable PNG icons.
import {deflateSync} from 'node:zlib';
import {writeFile,mkdir} from 'node:fs/promises';
// One mountain and an orange trail, with no letters in the phone icon.
const mountain=[[32,201],[128,43],[224,201]];
const snow=[[100,89],[128,43],[157,91],[136,78],[124,91],[115,78]];
const curve=[];
const trail=[[73,201],[155,169],[110,146],[153,121],[128,101],[139,83],[128,60]];
for(let i=1;i<trail.length;i++)for(let j=0;j<=25;j++){const t=j/25;curve.push([trail[i-1][0]*(1-t)+trail[i][0]*t,trail[i-1][1]*(1-t)+trail[i][1]*t])}
const pts=p=>p.map(v=>v.join(',')).join(' ');
function mark(){return `<polygon points="${pts(mountain)}" fill="#235784"/><polygon points="${pts(snow)}" fill="#ffffff"/><polyline points="${pts(trail)}" fill="none" stroke="#ff792f" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>`}
await mkdir('public/assets',{recursive:true});
await writeFile('public/assets/brand-mark.svg',`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">${mark()}</svg>`);
await writeFile('public/assets/icon.svg',`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" rx="54" fill="#edf7ff"/>${mark()}</svg>`);
const inside=(x,y,p)=>{let hit=false;for(let i=0,j=p.length-1;i<p.length;j=i++){if(((p[i][1]>y)!==(p[j][1]>y))&&x<(p[j][0]-p[i][0])*(y-p[i][1])/(p[j][1]-p[i][1])+p[i][0])hit=!hit}return hit};
function distance(x,y,a,b){const dx=b[0]-a[0],dy=b[1]-a[1],t=Math.max(0,Math.min(1,((x-a[0])*dx+(y-a[1])*dy)/(dx*dx+dy*dy)));return Math.hypot(x-a[0]-t*dx,y-a[1]-t*dy)}
function crc(b){let c=0xffffffff;for(const x of b){c^=x;for(let i=0;i<8;i++)c=(c>>>1)^((c&1)?0xedb88320:0)}return(c^0xffffffff)>>>0}
function chunk(t,b){const type=Buffer.from(t),len=Buffer.alloc(4),sum=Buffer.alloc(4);len.writeUInt32BE(b.length);sum.writeUInt32BE(crc(Buffer.concat([type,b])));return Buffer.concat([len,type,b,sum])}
for(const n of [192,512]){const raw=Buffer.alloc(n*(n*3+1));for(let y=0;y<n;y++)for(let x=0;x<n;x++){const a=x/n*256,b=y/n*256;let c=[237,247,255];if(inside(a,b,mountain))c=[35,87,132];if(inside(a,b,snow))c=[255,255,255];if(curve.some((p,i)=>i&&distance(a,b,curve[i-1],p)<5))c=[255,121,47];for(let k=0;k<3;k++)raw[y*(n*3+1)+1+x*3+k]=c[k]}const head=Buffer.alloc(13);head.writeUInt32BE(n);head.writeUInt32BE(n,4);head[8]=8;head[9]=2;await writeFile(`public/assets/icon-${n}.png`,Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk('IHDR',head),chunk('IDAT',deflateSync(raw)),chunk('IEND',Buffer.alloc(0))]))}

