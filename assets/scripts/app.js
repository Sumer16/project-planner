!function(t){function e(e){for(var n,o,i=e[0],s=e[1],c=0,d=[];c<i.length;c++)o=i[c],Object.prototype.hasOwnProperty.call(r,o)&&r[o]&&d.push(r[o][0]),r[o]=0;for(n in s)Object.prototype.hasOwnProperty.call(s,n)&&(t[n]=s[n]);for(a&&a(e);d.length;)d.shift()()}var n={},r={0:0};function o(e){if(n[e])return n[e].exports;var r=n[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.e=function(t){var e=[],n=r[t];if(0!==n)if(n)e.push(n[2]);else{var i=new Promise((function(e,o){n=r[t]=[e,o]}));e.push(n[2]=i);var s,c=document.createElement("script");c.charset="utf-8",c.timeout=120,o.nc&&c.setAttribute("nonce",o.nc),c.src=function(t){return o.p+""+t+".app.js"}(t);var a=new Error;s=function(e){c.onerror=c.onload=null,clearTimeout(d);var n=r[t];if(0!==n){if(n){var o=e&&("load"===e.type?"missing":e.type),i=e&&e.target&&e.target.src;a.message="Loading chunk "+t+" failed.\n("+o+": "+i+")",a.name="ChunkLoadError",a.type=o,a.request=i,n[1](a)}r[t]=void 0}};var d=setTimeout((function(){s({type:"timeout",target:c})}),12e4);c.onerror=c.onload=s,document.head.appendChild(c)}return Promise.all(e)},o.m=t,o.c=n,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)o.d(n,r,function(e){return t[e]}.bind(null,r));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="assets/scripts/",o.oe=function(t){throw console.error(t),t};var i=window.webpackJsonp=window.webpackJsonp||[],s=i.push.bind(i);i.push=e,i=i.slice();for(var c=0;c<i.length;c++)e(i[c]);var a=s;o(o.s=0)}([function(t,e,n){"use strict";n.r(e);var r=class{static clearEveListener(t){const e=t.cloneNode(!0);return t.replaceWith(e),e}static moveElement(t,e){const n=document.getElementById(t);document.querySelector(e).append(n),n.scrollIntoView({behavior:"smooth"})}};class o{constructor(t,e,n){this.id=t,this.hasActiveToolTip=!1,this.updateProjList=e,this.connectMoreInfoBtn(),this.connectSwitchBtn(n),this.connectDrag()}showMoreInfoHandler(){if(this.hasActiveToolTip)return;const t=document.getElementById(this.id).dataset.extraInfo;n.e(1).then(n.bind(null,1)).then(e=>{new e.ToolTip(()=>{this.hasActiveToolTip=!1},t,this.id).show(),this.hasActiveToolTip=!0})}connectDrag(){const t=document.getElementById(this.id);t.addEventListener("dragstart",t=>{t.dataTransfer.setData("text/plain",this.id),t.dataTransfer.effectAllowed="move"}),t.addEventListener("dragged",t=>{console.log(t)})}connectMoreInfoBtn(){document.getElementById(this.id).querySelector("button:first-of-type").addEventListener("click",this.showMoreInfoHandler.bind(this))}connectSwitchBtn(t){let e=document.getElementById(this.id).querySelector("button:last-of-type");e=r.clearEveListener(e),e.textContent="active"===t?"Finish":"Activate",e.addEventListener("click",this.updateProjList.bind(null,this.id))}update(t,e){this.updateProjList=t,this.connectSwitchBtn(e)}}class i{constructor(t){this.type=t,this.projects=[];const e=document.querySelectorAll(`#${t}-projects li`);for(const t of e)this.projects.push(new o(t.id,this.switchProject.bind(this),this.type));console.log(this.projects),this.connectDroppable()}connectDroppable(){const t=document.querySelector(`#${this.type}-projects ul`);t.addEventListener("dragenter",e=>{"text/plain"===e.dataTransfer.types[0]&&(t.parentElement.classList.add("droppable"),e.preventDefault())}),t.addEventListener("dragover",t=>{"text/plain"===t.dataTransfer.types[0]&&t.preventDefault()}),t.addEventListener("dragleave",e=>{e.relatedTarget.closest(`#${this.type}-projects ul`)!==t&&t.parentElement.classList.remove("droppable")}),t.addEventListener("drop",e=>{const n=e.dataTransfer.getData("text/plain");this.projects.find(t=>t.id===n)||(document.getElementById(n).querySelector("button:last-of-type").click(),t.parentElement.classList.remove("droppable"),e.preventDefault())})}setSwitchHandler(t){this.switchHanFun=t}addProject(t){this.projects.push(t),r.moveElement(t.id,`#${this.type}-projects ul`),t.update(this.switchProject.bind(this),this.type)}switchProject(t){this.switchHanFun(this.projects.find(e=>e.id===t)),this.projects=this.projects.filter(e=>e.id!==t)}}(class{static init(){const t=new i("active"),e=new i("finished");t.setSwitchHandler(e.addProject.bind(e)),e.setSwitchHandler(t.addProject.bind(t))}static startAnalytics(){const t=document.createElement("script");t.src="./Utility/Analytics.js",t.defer=!0,document.head.append(t)}}).init()}]);
//# sourceMappingURL=app.js.map