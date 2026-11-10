// Render the same native vector geometry into SVG and installable PNG icons.
import {deflateSync} from 'node:zlib';
import {writeFile,mkdir} from 'node:fs/promises';
const mountain=[[25,76],[78,35],[94,44],[132,12],[170,45],[185,41],[221,76],[182,55],[168,58],[132,27],[99,59],[80,50]];
const letters=[[[73,78],[99,78],[77,141],[51,141]],[[113,78],[178,78],[171,98],[132,98],[128,110],[163,110],[157,129],[122,129],[116,147],[90,147]]];
const spark=[[220,53],[224,65],[235,69],[224,73],[220,86],[216,73],[205,69],[216,65]];
const curve=[];for(let i=0;i<=150;i++){const t=i/150,u=1-t;curve.push([u*u*u*46+3*u*u*t*(-16)+3*u*t*t*194+t*t*t*218,u*u*u*103+3*u*u*t*174+3*u*t*t*163+t*t*t*86])}
const pts=p=>p.map(v=>v.join(',')).join(' ');
function mark(color){return `<polygon points="${pts(mountain)}" fill="${color}"/>${letters.map(p=>`<polygon points="${pts(p)}" fill="${color}"/>`).join('')}<polyline points="${pts(curve)}" fill="none" stroke="#ff6a28" stroke-width="8" stroke-linecap="round"/><polygon points="${pts(spark)}" fill="#ff6a28"/>`}
const svg=(inner)=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 180">${inner}</svg>`;
await mkdir('public/assets',{recursive:true});
await writeFile('public/assets/brand-mark.svg',svg(mark('#222b35')));
await writeFile('public/assets/icon.svg',`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" rx="54" fill="#222b35"/><g transform="translate(9 43) scale(.93)">${mark('#fff')}</g></svg>`);
const inside=(x,y,p)=>{let hit=false;for(let i=0,j=p.length-1;i<p.length;j=i++){if(((p[i][1]>y)!==(p[j][1]>y))&&x<(p[j][0]-p[i][0])*(y-p[i][1])/(p[j][1]-p[i][1])+p[i][0])hit=!hit}return hit};
function distance(x,y,a,b){const dx=b[0]-a[0],dy=b[1]-a[1],t=Math.max(0,Math.min(1,((x-a[0])*dx+(y-a[1])*dy)/(dx*dx+dy*dy)));return Math.hypot(x-a[0]-t*dx,y-a[1]-t*dy)}
function crc(b){let c=0xffffffff;for(const x of b){c^=x;for(let i=0;i<8;i++)c=(c>>>1)^((c&1)?0xedb88320:0)}return(c^0xffffffff)>>>0}
function chunk(t,b){const type=Buffer.from(t),len=Buffer.alloc(4),sum=Buffer.alloc(4);len.writeUInt32BE(b.length);sum.writeUInt32BE(crc(Buffer.concat([type,b])));return Buffer.concat([len,type,b,sum])}
for(const n of [192,512]){const raw=Buffer.alloc(n*(n*3+1));for(let y=0;y<n;y++)for(let x=0;x<n;x++){const a=(x/n*256-9)/.93,b=(y/n*256-43)/.93;let c=[34,43,53];if([mountain,...letters].some(p=>inside(a,b,p)))c=[255,255,255];if(inside(a,b,spark)||curve.some((p,i)=>i&&distance(a,b,curve[i-1],p)<4))c=[255,106,40];for(let k=0;k<3;k++)raw[y*(n*3+1)+1+x*3+k]=c[k]}const head=Buffer.alloc(13);head.writeUInt32BE(n);head.writeUInt32BE(n,4);head[8]=8;head[9]=2;await writeFile(`public/assets/icon-${n}.png`,Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk('IHDR',head),chunk('IDAT',deflateSync(raw)),chunk('IEND',Buffer.alloc(0))]))}
