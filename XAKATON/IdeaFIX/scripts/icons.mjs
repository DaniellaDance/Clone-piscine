// Preserve the approved raster identity: builds must never redraw the logo.
import {readFile} from 'node:fs/promises';
for(const [file,size] of [['icon-192.png',192],['icon-512.png',512],['icon-maskable-512.png',512]]){
 const b=await readFile('public/assets/'+file);
 if(b.toString('hex',0,8)!=='89504e470d0a1a0a'||b.readUInt32BE(16)!==size||b.readUInt32BE(20)!==size)throw new Error('Invalid approved icon: '+file);
}
await readFile('public/assets/fix-idea-logo.webp');
console.log('Approved Fix Idea logo and PWA icons verified');
