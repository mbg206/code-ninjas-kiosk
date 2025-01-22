(async()=>{
if(typeof students=="object")return;
const r=await fetch("https://mbg206.github.io/cn-kiosk-better/");
const t=await r.text();
const d=document;
d.open();
d.write(t);
d.close();
})();