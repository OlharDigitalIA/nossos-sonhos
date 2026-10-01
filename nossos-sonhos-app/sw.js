/* Nossos Sonhos – cache do app para abrir rápido e funcionar com internet fraca.
   Os dados (Supabase) nunca são guardados em cache. */
const VERSAO="sonhos-v11";
const BASE=["/","/index.html","/manifest.webmanifest","/icons/icon-192.png","/icons/icon-512.png","/icons/apple-touch-icon.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(VERSAO).then(c=>c.addAll(BASE)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSAO).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=="GET"||u.hostname.endsWith("supabase.co")||u.pathname.startsWith("/api/"))return;
  if(e.request.mode==="navigate"||u.pathname==="/"||u.pathname.endsWith(".html")){
    e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(VERSAO).then(x=>x.put("/",c));return r}).catch(()=>caches.match("/")));return}
  e.respondWith(caches.match(e.request).then(hit=>{const net=fetch(e.request).then(r=>{if(r.ok){const c=r.clone();caches.open(VERSAO).then(x=>x.put(e.request,c))}return r}).catch(()=>hit);return hit||net}));
});
