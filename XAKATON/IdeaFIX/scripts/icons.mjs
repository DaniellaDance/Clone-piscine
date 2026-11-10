// Generate portable PNG app icons with no image processing dependencies.
import {deflateSync} from 'node:zlib';
import {writeFile,mkdir} from 'node:fs/promises';
function crc(b){let c=0xffffffff;for(const x of b){c^=x;for(let i=0;i<8;i++)c=(c>>>1)^((c&1)?0xedb88320:0)}return (c^0xffffffff)>>>0}
function chunk(t,b){const type=Buffer.from(t),len=Buffer.alloc(4),sum=Buffer.alloc(4);len.writeUInt32BE(b.length);sum.writeUInt32BE(crc(Buffer.concat([type,b])));return Buffer.concat([len,type,b,sum])}
await mkdir('public/assets',{recursive:true});
for(const n of [192,512]){const raw=Buffer.alloc(n*(n*3+1));for(let y=0;y<n;y++)for(let x=0;x<n;x++){const a=x/n,b=y/n;const ink=(a>.27&&a<.35&&b>.28&&b<.72)||(a>.46&&a<.54&&b>.28&&b<.72)||(a>.46&&a<.74&&b>.28&&b<.36)||(a>.46&&a<.69&&b>.46&&b<.54);const c=ink?[217,241,120]:[23,62,54];for(let k=0;k<3;k++)raw[y*(n*3+1)+1+x*3+k]=c[k]}const head=Buffer.alloc(13);head.writeUInt32BE(n);head.writeUInt32BE(n,4);head[8]=8;head[9]=2;await writeFile(`public/assets/icon-${n}.png`,Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk('IHDR',head),chunk('IDAT',deflateSync(raw)),chunk('IEND',Buffer.alloc(0))]))}
