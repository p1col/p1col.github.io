var F=Object.defineProperty;var M=(o,t,l)=>t in o?F(o,t,{enumerable:!0,configurable:!0,writable:!0,value:l}):o[t]=l;var $=(o,t,l)=>(M(o,typeof t!="symbol"?t+"":t,l),l);import{d as A,r as j,b as g,e as D,o as c,c as h,a as w,F as y,f as b,n as z,g as C,w as N,t as x,v as T,h as K}from"./index-BPDpIh1D.js";import{_ as G}from"./_plugin-vue_export-helper-DlAUqK2U.js";const q=(o,t)=>Math.floor(o/3)*3+Math.floor(t/3),E=o=>o>0?2**(9-o):0,B=o=>"0".repeat(9-o.length)+o,k=(o,t)=>o|E(t),L=(o,t)=>o&511-E(t),m=(o,t)=>"".concat(o,"-").concat(t);let O=class{constructor(t){$(this,"info",{});$(this,"question");this.question=t,this.setTips(this.getNumberExist())}getNumberExist(){let t=new Array(9).fill(0),l=new Array(9).fill(0),n=new Array(9).fill(0),e=0;for(;e<9;){let s=0;for(;s<9;){if(this.question[e][s]>0){const a=q(e,s);t[e]=k(t[e],this.question[e][s]),l[s]=k(l[s],this.question[e][s]),n[a]=k(n[a],this.question[e][s])}s++}e++}return{rows:t,cols:l,zones:n}}setTips({rows:t,cols:l,zones:n}){let e=0;for(;e<9;){let s=0;for(;s<9;){let a=q(e,s);const f=!!this.question[e][s];let r="";f||(r=(t[e]|l[s]|n[a]).toString(2),r=B(r)),this.info[m(e,s)]={x:e,y:s,z:a,val:this.question[e][s],readonly:f,options:r},s++}e++}}updateTip(t,l,n){const e=this.info[m(t,l)];if(!e||typeof e=="object"&&Object.keys(e).length===0||!e.val&&!n)return;this.question[t][l]=n;let s=0;for(;s<9;){let a=0;for(;a<9;){let f=q(s,a),r=this.info[m(s,a)];if((s===t||a===l||f===e.z)&&!r.readonly){let p=k(L(parseInt(r.options,2),e.val),n).toString(2);r.options=B(p),console.log("修改".concat(s,"-").concat(a,"的选项为：").concat(p,"。旧值：").concat(e.x,"-").concat(e.y,"-").concat(e.val,"当前值为：").concat(n))}a++}s++}e.val=n}};const P={class:"grid"},V=["aria-checked","onClick"],Z={class:"keyboard"},H=["onClick"],J=A({name:"Sudoku2",__name:"Sudoku2",setup(o){const t=[[0,0,0,0,3,0,6,8,0],[2,0,0,0,5,0,0,0,0],[0,0,0,4,0,0,0,1,3],[0,0,0,2,7,0,0,3,1],[5,0,0,9,0,0,0,0,0],[3,7,0,0,0,0,9,0,0],[0,9,8,5,0,0,0,0,0],[1,0,2,0,0,0,4,6,0],[0,0,0,0,0,0,0,0,0]],l=j(new O(t)),n=g(()=>l.info);let e=D({x:-1,y:-1,z:-1,val:0,readonly:!1,options:""});const s=g(()=>e.value.options.split("").map((u,_)=>({readonly:u==="1",val:_+1}))),a=g(()=>e.value.options);function f(u,_){u||l.updateTip(e.value.x,e.value.y,_)}function r(u){u.readonly||(e.value=u)}function p(u,_){let i=n.value[m(u,_)];return i.x===e.value.x||i.y===e.value.y||i.z===e.value.z}return(u,_)=>(c(),h(y,null,[w("div",P,[(c(!0),h(y,null,b(l.question,(i,d)=>(c(),h("div",{class:"row",key:"row-".concat(d)},[(c(!0),h(y,null,b(i,(S,v)=>(c(),h("div",{class:z(["cell",{"is-readonly":n.value["".concat(d,"-").concat(v)].readonly,"cell--focus":p(d,v)}]),key:"cell-".concat(d,"-").concat(v),"aria-checked":C(e).x===d&&C(e).y===v,onClick:R=>r(n.value["".concat(d,"-").concat(v)])},[N(w("div",null,x(S),513),[[T,S]])],10,V))),128))]))),128))]),N(w("div",Z,[(c(!0),h(y,null,b(s.value,i=>(c(),h("div",{class:z(["keyboard__btn",{"keyboard__btn--disabled":i.readonly}]),key:"key-".concat(i.val),onClick:d=>f(i.readonly,i.val)},x(i.val),11,H))),128))],512),[[T,a.value]])],64))}}),Q=G(J,[["__scopeId","data-v-d2ae1a77"]]),I=A({__name:"SudokuGame",setup(o){return(t,l)=>(c(),K(Q))}});export{I as default};
