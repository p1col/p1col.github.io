!function(){function t(t,n){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,a,i,l=[],c=!0,u=!1;try{if(a=(n=n.call(t)).next,0===e){if(Object(n)!==n)return;c=!1}else for(;!(c=(r=a.call(n)).done)&&(l.push(r.value),l.length!==e);c=!0);}catch(t){u=!0,o=t}finally{try{if(!c&&null!=n.return&&(i=n.return(),Object(i)!==i))return}finally{if(u)throw o}}return l}}(t,n)||e(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function e(t,e){if(t){if("string"==typeof t)return n(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(t,e):void 0}}function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function r(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function o(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?r(Object(n),!0).forEach((function(e){l(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function a(t){return a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a(t)}function i(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,c(r.key),r)}}function l(t,e,n){return(e=c(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function c(t){var e=function(t,e){if("object"!=a(t)||!t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,e||"default");if("object"!=a(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(t,"string");return"symbol"==a(e)?e:e+""}System.register(["./index-legacy-DQ55wrcG.js"],(function(n,r){"use strict";var c,u,f,s,d,y,v,b,p,h,m,g,w,k,j;return{setters:[function(t){c=t.d,u=t.r,f=t.c,s=t.a,d=t.o,y=t.b,v=t.e,b=t.F,p=t.f,h=t.w,m=t.v,g=t.n,w=t.u,k=t.t,j=t.g}],execute:function(){var r=document.createElement("style");r.textContent="@keyframes resetColor-a2739512{to{background:transparent}}.grid[data-v-a2739512]{display:flex;flex-direction:column;align-items:center;margin-top:6.4vw;color:#00a2e0}.row[data-v-a2739512]{display:flex;border-bottom:1px dashed #00a2e0}.row[data-v-a2739512]:first-of-type{border-top:1px solid #00a2e0}.row[data-v-a2739512]:nth-of-type(3n){border-bottom-style:solid}.cell[data-v-a2739512]{display:flex;justify-content:center;align-items:center;width:9.333vw;height:9.333vw;font-style:italic;border-right:1px dashed #00a2e0}.cell[data-v-a2739512]:first-child{border-left:1px solid #00a2e0}.cell[data-v-a2739512]:nth-of-type(3n){border-right-style:solid}.cell.cell--focus[data-v-a2739512]{background:#ffda9b;animation:resetColor-a2739512 .2s ease-in-out reverse backwards}.cell[aria-checked=true][data-v-a2739512]{background:#ffb12a}.cell.is-readonly[data-v-a2739512]{color:#00a2e0;font-weight:700}.keyboard[data-v-a2739512]{display:flex;justify-content:center;margin-top:6.4vw;color:#00a2e0}.keyboard__btn[data-v-a2739512]{position:relative;width:8vw;height:8vw;line-height:8vw;text-align:center;background:#f6f5f7;box-shadow:0 0 0 1px #00a2e0}.keyboard__btn.keyboard__btn--disabled[data-v-a2739512]{color:#b8deed}\n",document.head.appendChild(r);var x=function(t,e){return 3*Math.floor(t/3)+Math.floor(e/3)},O=function(t){return t>0?Math.pow(2,9-t):0},S=function(t){return"0".repeat(9-t.length)+t},_=function(t,e){return t|O(e)},P=function(t,e){return"".concat(t,"-").concat(e)},A=function(){return t=function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),l(this,"info",{}),l(this,"question",void 0),this.question=e,this.setTips(this.getNumberExist())},(e=[{key:"getNumberExist",value:function(){for(var t=new Array(9).fill(0),e=new Array(9).fill(0),n=new Array(9).fill(0),r=0;r<9;){for(var o=0;o<9;){if(this.question[r][o]>0){var a=x(r,o);t[r]=_(t[r],this.question[r][o]),e[o]=_(e[o],this.question[r][o]),n[a]=_(n[a],this.question[r][o])}o++}r++}return{rows:t,cols:e,zones:n}}},{key:"setTips",value:function(t){for(var e=t.rows,n=t.cols,r=t.zones,o=0;o<9;){for(var a=0;a<9;){var i=x(o,a),l=!!this.question[o][a],c="";l||(c=(e[o]|n[a]|r[i]).toString(2),c=S(c)),this.info[P(o,a)]={x:o,y:a,z:i,val:this.question[o][a],readonly:l,options:c},a++}o++}}},{key:"updateTip",value:function(t,e,n){var r=this.info[P(t,e)];if(r&&("object"!==a(r)||0!==Object.keys(r).length)&&(r.val||n)){this.question[t][e]=n;for(var o,i,l=0;l<9;){for(var c=0;c<9;){var u=x(l,c),f=this.info[P(l,c)];if((l===t||c===e||u===r.z)&&!f.readonly){var s=_((o=parseInt(f.options,2),i=r.val,o&511-O(i)),n).toString(2);f.options=S(s),console.log("修改".concat(l,"-").concat(c,"的选项为：").concat(s,"。旧值：").concat(r.x,"-").concat(r.y,"-").concat(r.val,"当前值为：").concat(n))}c++}l++}r.val=n}}}])&&i(t.prototype,e),n&&i(t,n),Object.defineProperty(t,"prototype",{writable:!1}),t;var t,e,n}(),q={class:"grid"},C=["aria-checked","onClick"],E={class:"keyboard"},T=["onClick"],z=function(n,r){var o,a=n.__vccOpts||n,i=function(t,n){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=e(t))||n&&t&&"number"==typeof t.length){r&&(t=r);var o=0,a=function(){};return{s:a,n:function(){return o>=t.length?{done:!0}:{done:!1,value:t[o++]}},e:function(t){throw t},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,l=!0,c=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return l=t.done,t},e:function(t){c=!0,i=t},f:function(){try{l||null==r.return||r.return()}finally{if(c)throw i}}}}(r);try{for(i.s();!(o=i.n()).done;){var l=t(o.value,2),c=l[0],u=l[1];a[c]=u}}catch(f){i.e(f)}finally{i.f()}return a}(c(o(o({},{name:"Sudoku2"}),{},{__name:"Sudoku2",setup:function(t){var e=u(new A([[0,0,0,0,3,0,6,8,0],[2,0,0,0,5,0,0,0,0],[0,0,0,4,0,0,0,1,3],[0,0,0,2,7,0,0,3,1],[5,0,0,9,0,0,0,0,0],[3,7,0,0,0,0,9,0,0],[0,9,8,5,0,0,0,0,0],[1,0,2,0,0,0,4,6,0],[0,0,0,0,0,0,0,0,0]])),n=f((function(){return e.info})),r=s({x:-1,y:-1,z:-1,val:0,readonly:!1,options:""}),o=f((function(){return r.value.options.split("").map((function(t,e){return{readonly:"1"===t,val:e+1}}))})),a=f((function(){return r.value.options}));function i(t,e){var o=n.value[P(t,e)];return o.x===r.value.x||o.y===r.value.y||o.z===r.value.z}return function(t,l){return d(),y(b,null,[v("div",q,[(d(!0),y(b,null,p(e.question,(function(t,e){return d(),y("div",{class:"row",key:"row-".concat(e)},[(d(!0),y(b,null,p(t,(function(t,o){return d(),y("div",{class:g(["cell",{"is-readonly":n.value["".concat(e,"-").concat(o)].readonly,"cell--focus":i(e,o)}]),key:"cell-".concat(e,"-").concat(o),"aria-checked":w(r).x===e&&w(r).y===o,onClick:function(t){var a;(a=n.value["".concat(e,"-").concat(o)]).readonly||(r.value=a)}},[h(v("div",null,k(t),513),[[m,t]])],10,C)})),128))])})),128))]),h(v("div",E,[(d(!0),y(b,null,p(o.value,(function(t){return d(),y("div",{class:g(["keyboard__btn",{"keyboard__btn--disabled":t.readonly}]),key:"key-".concat(t.val),onClick:function(n){return o=t.readonly,a=t.val,void(o||e.updateTip(r.value.x,r.value.y,a));var o,a}},k(t.val),11,T)})),128))],512),[[m,a.value]])],64)}}})),[["__scopeId","data-v-a2739512"]]);n("default",c({__name:"SudokuGame",setup:function(t){return function(t,e){return d(),j(z)}}}))}}}))}();
