import{d as C,e as u,c,a as l,F as h,f as w,g as f,w as k,v as x,o as v,n as S,t as y}from"./index-Dzvy8LKq.js";const G={class:"card-wrapper"},A={class:"card-front"},B=["onClick"],M={class:"game-again"},T=l("div",null,":::tada:::",-1),F=C({name:"CardGame",__name:"CardGame",setup(b){let n=[],i=new Set,s=u(new Array),o=u(),r=u(0);const d=(e,a=0)=>Math.ceil(Math.random()*(e-(a>0&&a<=e?a:0)));function m(e){for(;e>0;)n.push(String.fromCharCode(65+d(26))),e--;s.value.length=0,g()}function g(){for(r.value=n.length;n.length>0;){const e=d(n.length);s.value.push({index:s.value.length,val:n[e],open:!1}),i.has(n[e])?(i.delete(n[e]),n.length>1&&(n[e]=n[n.length-1]),n.pop()):i.add(n[e])}}function _(e){if(e.open=!0,o.value){if(o.value.val===e.val)r.value--;else{const a=o.value.index;let t=setTimeout(()=>{clearTimeout(t),s.value[a].open=!1,e.open=!1},500)}o.value=null}else o.value={...e}}function p(){m(d(10))}return p(),(e,a)=>(v(),c(h,null,[l("div",G,[(v(!0),c(h,null,w(f(s),t=>(v(),c("div",{class:S(["card",{"card--open":t.open}]),key:t.index},[l("div",A,y(t.val),1),l("div",{class:"card-back",onClick:q=>_(t)},null,8,B)],2))),128))]),k(l("div",M,[T,l("button",{onClick:a[0]||(a[0]=t=>p())},"Try again?")],512),[[x,!f(r)]])],64))}});export{F as default};
