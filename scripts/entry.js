import{a as T}from"./chunk-app-BE8u40BB.js";function u(n,t){return new URL(n).searchParams.get(t)}var E={APP_BASE:"/",APP_TITLE:"Boilerplate",APP_DESCRIPTION:"Apenas um show",APP_TARGET_JS:"boilerplate_js",APP_NS:"lagden_boilerplate",APP_ENV:"production",BASE_URL:"./",MODE:"production",DEV:!1,PROD:!0,SSR:!1};function P(){return E??{}}const a=new Set,r=new Set;function c(...n){if(a.size===1)return[...a][0];const[t]=n,e={};if(t){const o=globalThis.document.getElementById(t);if(o){for(const[d,i]of Object.entries(o.dataset))e[d]=i;e.elementID=t,a.add(e)}}return e}function A(...n){if(r.size===1)return[...r][0];const[t]=n,e=c(t),o=globalThis.document.getElementById(e.target)??globalThis.document.body;return r.add(o),o}const _=P(),g=u(import.meta.url,"TARGET_JS"),f=_?.VITE_APP_TARGET_JS,s=g??f??"",l=A(s),m=c(s);l.dataset.theme="tex-dark";console.debug("TARGET_JS",s);console.table(_);console.table(m);T(l);
