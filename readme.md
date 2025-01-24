(async ()=>{
const r=await fetch("https://mbg206.github.io/cn-kiosk-better/bookmarklet.js");
const t=await r.text();
eval(decodeURIComponent(t.slice(11)));
})();