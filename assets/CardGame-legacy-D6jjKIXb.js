!function(){function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function r(e){for(var r=1;r<arguments.length;r++){var o=null!=arguments[r]?arguments[r]:{};r%2?t(Object(o),!0).forEach((function(t){n(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):t(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function n(t,r,n){var o;return o=function(t,r){if("object"!=e(t)||!t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var o=n.call(t,r||"default");if("object"!=e(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(t)}(r,"string"),(r="symbol"==e(o)?o:o+"")in t?Object.defineProperty(t,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[r]=n,t}System.register(["./index-legacy-CJqHbtN3.js"],(function(e,t){"use strict";var n,o,a,i,l,c,u,f,s,d,p,v,m;return{setters:[function(e){n=e.d,o=e.e,a=e.i,i=e.c,l=e.a,c=e.F,u=e.f,f=e.g,s=e.w,d=e.v,p=e.o,v=e.n,m=e.t}],execute:function(){var b=document.createElement("style");b.textContent="@keyframes flip{to{transform:rotateY(180deg)}}@keyframes close{0%,50%{transform:rotateY(180deg)}to{transform:rotateY(0)}}.card-wrapper{display:flex;flex-direction:row;flex-wrap:wrap;justify-content:space-evenly;padding:5.333vw;gap:1.333vw;perspective:266.667vw}.card{position:relative;width:21.333vw;height:26.667vw;transform-style:preserve-3d;animation:close 1.5s both}.card .card-front{position:absolute;top:0;right:0;bottom:0;left:0;display:flex;justify-content:center;align-items:center;font-size:11.2vw;font-weight:bolder;border:.8vw double #00a2e0;backface-visibility:hidden;transform:rotateY(180deg)}.card .card-back{position:absolute;top:0;right:0;bottom:0;left:0;background:url("+new URL("sprigatito-lUDghoMX.png",t.meta.url).href+") 11%/333% no-repeat;backface-visibility:hidden}.card.card--open{animation:flip .5s both}.game-again{display:flex;flex-direction:column;align-items:center;margin-top:2.667vw}\n",document.head.appendChild(b);var y={class:"card-wrapper"},g={class:"card-front"},h=["onClick"],w={class:"game-again"},O=l("div",null,":::tada:::",-1);e("default",n(r(r({},{name:"CardGame"}),{},{__name:"CardGame",setup:function(e){var t=[],n=new Set,b=o(new Array),j=o(),k=o(0),x=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return Math.ceil(Math.random()*(e-(t>0&&t<=e?t:0)))};function S(e){for(;e>0;)t.push(String.fromCharCode("A".charCodeAt(0)+x(26))),e--;b.value.length=0,function(){k.value=t.length;for(;t.length>0;){var e=x(t.length);b.value.push({index:b.value.length,val:t[e],open:!1}),n.has(t[e])?(n.delete(t[e]),t.length>1&&(t[e]=t[t.length-1]),t.pop()):n.add(t[e])}}()}function P(){S(x(10))}return a((function(){P()})),function(e,t){return p(),i(c,null,[l("div",y,[(p(!0),i(c,null,u(f(b),(function(e){return p(),i("div",{class:v(["card",{"card--open":e.open}]),key:e.index},[l("div",g,m(e.val),1),l("div",{class:"card-back",onClick:function(t){return function(e){if(e.open=!0,j.value){if(j.value.val===e.val)k.value--;else var t=j.value.index,n=setTimeout((function(){clearTimeout(n),b.value[t].open=!1,e.open=!1}),500);j.value=null}else j.value=r({},e)}(e)}},null,8,h)],2)})),128))]),s(l("div",w,[O,l("button",{onClick:t[0]||(t[0]=function(e){return P()})},"Try again?")],512),[[d,!f(k)]])],64)}}})))}}}))}();