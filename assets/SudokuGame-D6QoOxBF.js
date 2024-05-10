var A=Object.defineProperty;var E=(o,t,n)=>t in o?A(o,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):o[t]=n;var $=(o,t,n)=>(E(o,typeof t!="symbol"?t+"":t,n),n);import{d as T,r as F,c as g,a as M,o as u,b as d,e as j,F as v,f as b,g as z,n as C,u as S,t as N,h as K}from"./index-BHSPlCbY.js";const q=(o,t)=>Math.floor(o/3)*3+Math.floor(t/3),B=o=>o>0?2**(9-o):0,x=o=>"0".repeat(9-o.length)+o,k=(o,t)=>o|B(t),O=(o,t)=>o&511-B(t),m=(o,t)=>"".concat(o,"-").concat(t);let V=class{constructor(t){$(this,"info",{});$(this,"question");this.question=t,this.setTips(this.getNumberExist())}getNumberExist(){let t=new Array(9).fill(0),n=new Array(9).fill(0),l=new Array(9).fill(0),e=0;for(;e<9;){let s=0;for(;s<9;){if(this.question[e][s]>0){const a=q(e,s);t[e]=k(t[e],this.question[e][s]),n[s]=k(n[s],this.question[e][s]),l[a]=k(l[a],this.question[e][s])}s++}e++}return{rows:t,cols:n,zones:l}}setTips({rows:t,cols:n,zones:l}){let e=0;for(;e<9;){let s=0;for(;s<9;){let a=q(e,s);const h=!!this.question[e][s];let r="";h||(r=(t[e]|n[s]|l[a]).toString(2),r=x(r)),this.info[m(e,s)]={x:e,y:s,z:a,val:this.question[e][s],readonly:h,options:r},s++}e++}}updateTip(t,n,l){const e=this.info[m(t,n)];if(!e||typeof e=="object"&&Object.keys(e).length===0||!e.val&&!l)return;this.question[t][n]=l;let s=0;for(;s<9;){let a=0;for(;a<9;){let h=q(s,a),r=this.info[m(s,a)];if((s===t||a===n||h===e.z)&&!r.readonly){let p=k(O(parseInt(r.options,2),e.val),l).toString(2);r.options=x(p),console.log("修改".concat(s,"-").concat(a,"的选项为：").concat(p,"。旧值：").concat(e.x,"-").concat(e.y,"-").concat(e.val,"当前值为：").concat(l))}a++}s++}e.val=l}};const D={class:"grid"},G=["aria-checked","onClick"],L={key:0},P={key:0,class:"keyboard"},Z=["onClick"],H=T({name:"Sudoku2",__name:"Sudoku2",setup(o){const t=[[0,0,0,0,3,0,6,8,0],[2,0,0,0,5,0,0,0,0],[0,0,0,4,0,0,0,1,3],[0,0,0,2,7,0,0,3,1],[5,0,0,9,0,0,0,0,0],[3,7,0,0,0,0,9,0,0],[0,9,8,5,0,0,0,0,0],[1,0,2,0,0,0,4,6,0],[0,0,0,0,0,0,0,0,0]],n=F(new V(t)),l=g(()=>n.info);let e=M({x:-1,y:-1,z:-1,val:0,readonly:!1,options:""});const s=g(()=>e.value.options.split("").map((c,f)=>({readonly:c==="1",val:f+1}))),a=g(()=>e.value.options);function h(c,f){c||n.updateTip(e.value.x,e.value.y,f)}function r(c){c.readonly||(e.value=c)}function p(c,f){let i=l.value[m(c,f)];return i.x===e.value.x||i.y===e.value.y||i.z===e.value.z}return(c,f)=>(u(),d(v,null,[j("div",D,[(u(!0),d(v,null,b(n.question,(i,_)=>(u(),d("div",{class:"row",key:"row-".concat(_)},[(u(!0),d(v,null,b(i,(w,y)=>(u(),d("div",{class:C(["cell",{"is-readonly":l.value["".concat(_,"-").concat(y)].readonly,"cell--focus":p(_,y)}]),key:"cell-".concat(_,"-").concat(y),"aria-checked":S(e).x===_&&S(e).y===y,onClick:R=>r(l.value["".concat(_,"-").concat(y)])},[w?(u(),d("div",L,N(w),1)):z("",!0)],10,G))),128))]))),128))]),a.value?(u(),d("div",P,[(u(!0),d(v,null,b(s.value,i=>(u(),d("div",{class:C(["keyboard__btn",{"keyboard__btn--disabled":i.readonly}]),key:"key-".concat(i.val),onClick:_=>h(i.readonly,i.val)},N(i.val),11,Z))),128))])):z("",!0)],64))}}),J=(o,t)=>{const n=o.__vccOpts||o;for(const[l,e]of t)n[l]=e;return n},Q=J(H,[["__scopeId","data-v-6c4c1165"]]),Y=T({__name:"SudokuGame",setup(o){return(t,n)=>(u(),K(Q))}});export{Y as default};
