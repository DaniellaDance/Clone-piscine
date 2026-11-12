// Render the same native vector geometry into SVG and installable PNG icons.
import {deflateSync} from 'node:zlib';
import {writeFile,mkdir} from 'node:fs/promises';
// One mountain and an orange trail, with no letters in the phone icon.
const mountain=[[32,201],[128,43],[224,201]];
const snow=[[100,89],[128,43],[157,91],[136,78],[124,91],[115,78]];
const trail=[[73,201],[155,169],[110,146],[153,121],[128,101],[139,83],[128,60]];
const curve=[];
const bends=[[[73,201],[53,181],[179,185],[158,163]],[[158,163],[144,149],[99,154],[107,137]],[[107,137],[115,122],[155,124],[146,107]],[[146,107],[140,96],[126,87],[128,61]]];
for(const [a,b,c,d] of bends)for(let i=0;i<=60;i++){const t=i/60,u=1-t;curve.push([u*u*u*a[0]+3*u*u*t*b[0]+3*u*t*t*c[0]+t*t*t*d[0],u*u*u*a[1]+3*u*u*t*b[1]+3*u*t*t*c[1]+t*t*t*d[1]])}
const pts=p=>p.map(v=>v.join(',')).join(' ');
function mark(){return `<polygon points="${pts(mountain)}" fill="#235784"/><polygon points="${pts(snow)}" fill="#ffffff"/><polyline points="${pts(trail)}" fill="none" stroke="#ff792f" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>`}
await mkdir('public/assets',{recursive:true});
await writeFile('public/assets/brand-mark.svg',`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">${mark()}</svg>`);
const iconMark=()=>`<polygon points="${pts(mountain)}" fill="#ffffff"/><polyline points="${pts(curve)}" fill="none" stroke="#ff792f" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>`;
await writeFile('public/assets/icon.svg',`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><circle cx="128" cy="128" r="128" fill="#1454b8"/><g transform="translate(25.6 25.6) scale(.8)">${iconMark()}</g></svg>`);
const inside=(x,y,p)=>{let hit=false;for(let i=0,j=p.length-1;i<p.length;j=i++){if(((p[i][1]>y)!==(p[j][1]>y))&&x<(p[j][0]-p[i][0])*(y-p[i][1])/(p[j][1]-p[i][1])+p[i][0])hit=!hit}return hit};
function distance(x,y,a,b){const dx=b[0]-a[0],dy=b[1]-a[1],t=Math.max(0,Math.min(1,((x-a[0])*dx+(y-a[1])*dy)/(dx*dx+dy*dy)));return Math.hypot(x-a[0]-t*dx,y-a[1]-t*dy)}
function crc(b){let c=0xffffffff;for(const x of b){c^=x;for(let i=0;i<8;i++)c=(c>>>1)^((c&1)?0xedb88320:0)}return(c^0xffffffff)>>>0}
function chunk(t,b){const type=Buffer.from(t),len=Buffer.alloc(4),sum=Buffer.alloc(4);len.writeUInt32BE(b.length);sum.writeUInt32BE(crc(Buffer.concat([type,b])));return Buffer.concat([len,type,b,sum])}
for(const n of [192,512]){const raw=Buffer.alloc(n*(n*3+1));for(let y=0;y<n;y++)for(let x=0;x<n;x++){const a=(x/n*256-25.6)/.8,b=(y/n*256-25.6)/.8;let c=[20,84,184];if(inside(a,b,mountain))c=[255,255,255];if(inside(a,b,snow))c=[255,255,255];if(curve.some((p,i)=>i&&distance(a,b,curve[i-1],p)<5))c=[255,121,47];for(let k=0;k<3;k++)raw[y*(n*3+1)+1+x*3+k]=c[k]}const head=Buffer.alloc(13);head.writeUInt32BE(n);head.writeUInt32BE(n,4);head[8]=8;head[9]=2;await writeFile(`public/assets/icon-${n}.png`,Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk('IHDR',head),chunk('IDAT',deflateSync(raw)),chunk('IEND',Buffer.alloc(0))]))}


// Full-bleed background with the complete mountain inside Android's safe circle.
await writeFile('public/assets/icon-maskable-512.png',await (await import('node:fs/promises')).readFile('public/assets/icon-512.png'));
