const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..');
const hash=crypto.createHash('sha256');
for(const name of fs.readdirSync(root).filter(name=>/\.(html|css|js|png|svg|webmanifest)$/.test(name)&&name!=='sw.js').sort()) hash.update(name).update(fs.readFileSync(path.join(root,name)));
const sw=path.join(root,'sw.js');
fs.writeFileSync(sw,fs.readFileSync(sw,'utf8').replace(/const CACHE_NAME = PREFIX\+'[^']+';/,"const CACHE_NAME = PREFIX+'"+hash.digest('hex').slice(0,12)+"';"));
console.log('Offline release version updated.');
