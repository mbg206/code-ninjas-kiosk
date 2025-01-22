const r=await fetch("https://mbg206.github.io/cn-kiosk-better/");
const t=await r.text();
document.open();
document.write(t);
document.close();