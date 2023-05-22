(function(){"use strict";var t={214:function(t,e,r){var o=r(6369),n=function(){var t=this,e=t._self._c;return e("div",{staticClass:"container pt-2",attrs:{id:"main"}},[e("div",{staticClass:"row custom-row mb-0"},[e("div",{staticClass:"col-sm-4 col-md-4 col-xs-12"}),e("div",{staticClass:"col-sm-4 col-md-4 col-xs-12 mb-2 mt-3 text-center"},[e("div",{staticClass:"card custom-card custom-clock-current"},[e("div",{staticClass:"card-body text-center"},[e("h5",{staticClass:"card-title custom-title"},[t._v(t._s(t.zoneName))]),e("h6",{staticClass:"card-subtitle mb-1 custom-date"},[t._v(t._s(t.currentDate))]),e("p",{staticClass:"card-text custom-hour"},[t._v(t._s(t._f("formatTime")(t.currentTime)))])])])]),e("div",{staticClass:"col-sm-4 col-md-4 col-xs-12"})]),e("div",{staticClass:"row custom-row pt-3"},t._l(t.zones,(function(r,o){return e("div",{key:o,staticClass:"col-sm-4 mb-3"},[e("div",{staticClass:"card custom-card"},[e("div",{staticClass:"card-body text-center"},[e("h5",{staticClass:"card-title custom-title"},[t._v(t._s(r.zoneName))]),e("h6",{staticClass:"card-subtitle mb-1 custom-date"},[t._v(t._s(r.date))]),e("p",{staticClass:"card-text custom-hour blink-animation"},[t._v(t._s(r.time))])])])])})),0),t.error?e("div",{staticClass:"alert alert-danger text-center",attrs:{role:"alert"}},[t._v(" Falha ao obter dados | "),e("i",[t._v(t._s(t.error))]),e("br"),t._v(" O servidor intermediário está indisponível no momento."),e("br"),t._v(" Experimente recarregar a página daqui a algum tempo. ")]):t._e()])},i=[],a={data(){return{currentTimezone:"",currentDate:"",currentTime:"",currentMinute:null,previousTime:null,error:null,latitude:null,longitude:null,countryCode:"",countryName:"",regionName:"",cityName:"",zoneName:"",abbreviation:"",zones:[]}},beforeDestroy(){localStorage.setItem("currentMinute",this.currentMinute)},mounted(){this.obterLatitudeLongitude(),this.fetchZones(),this.startClock(),this.currentMinute=localStorage.getItem("currentMinute")},methods:{async obterLatitudeLongitude(){navigator.geolocation?navigator.geolocation.getCurrentPosition((t=>{this.latitude=t.coords.latitude,this.longitude=t.coords.longitude,this.obterDadosAPI()}),(t=>{console.error("Erro ao obter a localização:",t)})):console.error("Geolocalização não é suportada pelo navegador.")},async obterDadosAPI(){try{const t=await fetch(`http://localhost:3001/api/user-timezone/${this.latitude}/${this.longitude}`),e=await t.json();this.countryCode=e.countryCode,this.countryName=e.countryName,this.regionName=e.regionName,this.cityName=e.cityName,this.zoneName=e.zoneName,this.abbreviation=e.abbreviation,this.currentDate=e.date}catch(t){console.error("Erro ao consultar a API na função obterDadosAPI:",t)}},fetchZones(){fetch("http://localhost:3001/api/zones").then((t=>t.json())).then((t=>{"OK"===t.status?this.zones=t.zones:console.error("Erro na resposta da API:",t.message)})).catch((t=>{console.error("Erro na requisição:",t)}))},startClock(){setInterval((()=>{this.currentTime=new Date}),1e3)}},watch:{currentTime(t){const e=t.getMinutes();e!==this.currentMinute&&(this.currentMinute=e,this.fetchZones())}},filters:{formatTime(t){if(t instanceof Date){const e={hour:"numeric",minute:"numeric",second:"numeric"};return t.toLocaleTimeString([],e)}return""}}},s=a,c=r(1001),u=(0,c.Z)(s,n,i,!1,null,"44b266ed",null),l=u.exports;o.ZP.config.productionTip=!1,new o.ZP({render:t=>t(l)}).$mount("#app")}},e={};function r(o){var n=e[o];if(void 0!==n)return n.exports;var i=e[o]={exports:{}};return t[o].call(i.exports,i,i.exports,r),i.exports}r.m=t,function(){var t=[];r.O=function(e,o,n,i){if(!o){var a=1/0;for(l=0;l<t.length;l++){o=t[l][0],n=t[l][1],i=t[l][2];for(var s=!0,c=0;c<o.length;c++)(!1&i||a>=i)&&Object.keys(r.O).every((function(t){return r.O[t](o[c])}))?o.splice(c--,1):(s=!1,i<a&&(a=i));if(s){t.splice(l--,1);var u=n();void 0!==u&&(e=u)}}return e}i=i||0;for(var l=t.length;l>0&&t[l-1][2]>i;l--)t[l]=t[l-1];t[l]=[o,n,i]}}(),function(){r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,{a:e}),e}}(),function(){r.d=function(t,e){for(var o in e)r.o(e,o)&&!r.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})}}(),function(){r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={143:0};r.O.j=function(e){return 0===t[e]};var e=function(e,o){var n,i,a=o[0],s=o[1],c=o[2],u=0;if(a.some((function(e){return 0!==t[e]}))){for(n in s)r.o(s,n)&&(r.m[n]=s[n]);if(c)var l=c(r)}for(e&&e(o);u<a.length;u++)i=a[u],r.o(t,i)&&t[i]&&t[i][0](),t[i]=0;return r.O(l)},o=self["webpackChunkdbc_timezones"]=self["webpackChunkdbc_timezones"]||[];o.forEach(e.bind(null,0)),o.push=e.bind(null,o.push.bind(o))}();var o=r.O(void 0,[998],(function(){return r(214)}));o=r.O(o)})();
//# sourceMappingURL=app.c1e8edc9.js.map