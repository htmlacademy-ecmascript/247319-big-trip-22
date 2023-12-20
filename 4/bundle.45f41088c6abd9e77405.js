(()=>{var e={484:function(e){e.exports=function(){"use strict";var e=6e4,t=36e5,n="millisecond",i="second",s="minute",r="hour",a="day",l="week",o="month",c="quarter",d="year",p="date",u="Invalid Date",f=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,v=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,_={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],n=e%100;return"["+e+(t[(n-20)%10]||t[n]||t[0])+"]"}},h=function(e,t,n){var i=String(e);return!i||i.length>=t?e:""+Array(t+1-i.length).join(n)+e},m={s:h,z:function(e){var t=-e.utcOffset(),n=Math.abs(t),i=Math.floor(n/60),s=n%60;return(t<=0?"+":"-")+h(i,2,"0")+":"+h(s,2,"0")},m:function e(t,n){if(t.date()<n.date())return-e(n,t);var i=12*(n.year()-t.year())+(n.month()-t.month()),s=t.clone().add(i,o),r=n-s<0,a=t.clone().add(i+(r?-1:1),o);return+(-(i+(n-s)/(r?s-a:a-s))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(e){return{M:o,y:d,w:l,d:a,D:p,h:r,m:s,s:i,ms:n,Q:c}[e]||String(e||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}},b="en",y={};y[b]=_;var $=function(e){return e instanceof D},g=function e(t,n,i){var s;if(!t)return b;if("string"==typeof t){var r=t.toLowerCase();y[r]&&(s=r),n&&(y[r]=n,s=r);var a=t.split("-");if(!s&&a.length>1)return e(a[0])}else{var l=t.name;y[l]=t,s=l}return!i&&s&&(b=s),s||!i&&b},M=function(e,t){if($(e))return e.clone();var n="object"==typeof t?t:{};return n.date=e,n.args=arguments,new D(n)},w=m;w.l=g,w.i=$,w.w=function(e,t){return M(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var D=function(){function _(e){this.$L=g(e.locale,null,!0),this.parse(e)}var h=_.prototype;return h.parse=function(e){this.$d=function(e){var t=e.date,n=e.utc;if(null===t)return new Date(NaN);if(w.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var i=t.match(f);if(i){var s=i[2]-1||0,r=(i[7]||"0").substring(0,3);return n?new Date(Date.UTC(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)):new Date(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)}}return new Date(t)}(e),this.$x=e.x||{},this.init()},h.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},h.$utils=function(){return w},h.isValid=function(){return!(this.$d.toString()===u)},h.isSame=function(e,t){var n=M(e);return this.startOf(t)<=n&&n<=this.endOf(t)},h.isAfter=function(e,t){return M(e)<this.startOf(t)},h.isBefore=function(e,t){return this.endOf(t)<M(e)},h.$g=function(e,t,n){return w.u(e)?this[t]:this.set(n,e)},h.unix=function(){return Math.floor(this.valueOf()/1e3)},h.valueOf=function(){return this.$d.getTime()},h.startOf=function(e,t){var n=this,c=!!w.u(t)||t,u=w.p(e),f=function(e,t){var i=w.w(n.$u?Date.UTC(n.$y,t,e):new Date(n.$y,t,e),n);return c?i:i.endOf(a)},v=function(e,t){return w.w(n.toDate()[e].apply(n.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(t)),n)},_=this.$W,h=this.$M,m=this.$D,b="set"+(this.$u?"UTC":"");switch(u){case d:return c?f(1,0):f(31,11);case o:return c?f(1,h):f(0,h+1);case l:var y=this.$locale().weekStart||0,$=(_<y?_+7:_)-y;return f(c?m-$:m+(6-$),h);case a:case p:return v(b+"Hours",0);case r:return v(b+"Minutes",1);case s:return v(b+"Seconds",2);case i:return v(b+"Milliseconds",3);default:return this.clone()}},h.endOf=function(e){return this.startOf(e,!1)},h.$set=function(e,t){var l,c=w.p(e),u="set"+(this.$u?"UTC":""),f=(l={},l[a]=u+"Date",l[p]=u+"Date",l[o]=u+"Month",l[d]=u+"FullYear",l[r]=u+"Hours",l[s]=u+"Minutes",l[i]=u+"Seconds",l[n]=u+"Milliseconds",l)[c],v=c===a?this.$D+(t-this.$W):t;if(c===o||c===d){var _=this.clone().set(p,1);_.$d[f](v),_.init(),this.$d=_.set(p,Math.min(this.$D,_.daysInMonth())).$d}else f&&this.$d[f](v);return this.init(),this},h.set=function(e,t){return this.clone().$set(e,t)},h.get=function(e){return this[w.p(e)]()},h.add=function(n,c){var p,u=this;n=Number(n);var f=w.p(c),v=function(e){var t=M(u);return w.w(t.date(t.date()+Math.round(e*n)),u)};if(f===o)return this.set(o,this.$M+n);if(f===d)return this.set(d,this.$y+n);if(f===a)return v(1);if(f===l)return v(7);var _=(p={},p[s]=e,p[r]=t,p[i]=1e3,p)[f]||1,h=this.$d.getTime()+n*_;return w.w(h,this)},h.subtract=function(e,t){return this.add(-1*e,t)},h.format=function(e){var t=this,n=this.$locale();if(!this.isValid())return n.invalidDate||u;var i=e||"YYYY-MM-DDTHH:mm:ssZ",s=w.z(this),r=this.$H,a=this.$m,l=this.$M,o=n.weekdays,c=n.months,d=function(e,n,s,r){return e&&(e[n]||e(t,i))||s[n].slice(0,r)},p=function(e){return w.s(r%12||12,e,"0")},f=n.meridiem||function(e,t,n){var i=e<12?"AM":"PM";return n?i.toLowerCase():i},_={YY:String(this.$y).slice(-2),YYYY:this.$y,M:l+1,MM:w.s(l+1,2,"0"),MMM:d(n.monthsShort,l,c,3),MMMM:d(c,l),D:this.$D,DD:w.s(this.$D,2,"0"),d:String(this.$W),dd:d(n.weekdaysMin,this.$W,o,2),ddd:d(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(r),HH:w.s(r,2,"0"),h:p(1),hh:p(2),a:f(r,a,!0),A:f(r,a,!1),m:String(a),mm:w.s(a,2,"0"),s:String(this.$s),ss:w.s(this.$s,2,"0"),SSS:w.s(this.$ms,3,"0"),Z:s};return i.replace(v,(function(e,t){return t||_[e]||s.replace(":","")}))},h.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},h.diff=function(n,p,u){var f,v=w.p(p),_=M(n),h=(_.utcOffset()-this.utcOffset())*e,m=this-_,b=w.m(this,_);return b=(f={},f[d]=b/12,f[o]=b,f[c]=b/3,f[l]=(m-h)/6048e5,f[a]=(m-h)/864e5,f[r]=m/t,f[s]=m/e,f[i]=m/1e3,f)[v]||m,u?b:w.a(b)},h.daysInMonth=function(){return this.endOf(o).$D},h.$locale=function(){return y[this.$L]},h.locale=function(e,t){if(!e)return this.$L;var n=this.clone(),i=g(e,t,!0);return i&&(n.$L=i),n},h.clone=function(){return w.w(this.$d,this)},h.toDate=function(){return new Date(this.valueOf())},h.toJSON=function(){return this.isValid()?this.toISOString():null},h.toISOString=function(){return this.$d.toISOString()},h.toString=function(){return this.$d.toUTCString()},_}(),T=D.prototype;return M.prototype=T,[["$ms",n],["$s",i],["$m",s],["$H",r],["$W",a],["$M",o],["$y",d],["$D",p]].forEach((function(e){T[e[1]]=function(t){return this.$g(t,e[0],e[1])}})),M.extend=function(e,t){return e.$i||(e(t,D,M),e.$i=!0),M},M.locale=g,M.isDayjs=$,M.unix=function(e){return M(1e3*e)},M.en=y[b],M.Ls=y,M.p={},M}()}},t={};function n(i){var s=t[i];if(void 0!==s)return s.exports;var r=t[i]={exports:{}};return e[i].call(r.exports,r,r.exports,n),r.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";function e(e){const t=document.createElement("div");return t.innerHTML=e,t.firstElementChild}function t(e,t,n="beforeend"){t.insertAdjacentElement(n,e.getElement())}var i=n(484),s=n.n(i);const r="MMM DD";function a(e){return e?s()(e).format(r.toUpperCase()):""}function l(e){return e?s()(e).format("DD/MM/YY HH:mm".toUpperCase()):""}function o({id:e,title:t,price:n},i){return`<div class="event__offer-selector">\n      <input class="event__offer-checkbox  visually-hidden" id="${e}" type="checkbox" name="${t}" ${i.includes(e)?"checked":""}>\n      <label class="event__offer-label" for="${e}">\n        <span class="event__offer-title">${t}</span>\n        &plus;&euro;&nbsp;\n        <span class="event__offer-price">${n}</span>\n      </label>\n    </div>`}function c({pointType:e,pointId:t,type:n}){const i=e.charAt(0).toUpperCase()+e.slice(1);return`<div class="event__type-item">\n      <input id="event-type-${e}-${t}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${e}" ${e===n?"checked":""}>\n      <label class="event__type-label  event__type-label--${e}" for="event-type-${e}-${t}">${i}</label>\n    </div>\n  `}function d(e){return`<option value="${e.name}"></option>`}const p=["taxi","bus","train","ship","drive","flight","check-in","sightseeing","restaurant"];class u{constructor(e,t,n){this.points=e,this.offers=n,this.destinations=t}getTemplate(){return function(e,t,n){const{basePrice:i,dateFrom:s,dateTo:r,type:a,offers:u}=e,f=e.id||0,v=t.find((t=>t.id===e.destination)),{name:_,description:h}=v||{},m=p.map((e=>c({pointType:e,pointId:f,type:a}))).join(""),b=t.map((e=>d(e))).join(""),y=n.find((t=>t.type===e.type)),$=y?y.offers.map((e=>o(e,u))).join(""):"";return`<li class="trip-events__item"><form class="event event--edit" action="#" method="post">\n  <header class="event__header">\n    <div class="event__type-wrapper">\n      <label class="event__type  event__type-btn" for="event-type-toggle-${f}">\n        <span class="visually-hidden">Choose event type</span>\n        <img class="event__type-icon" width="17" height="17" src="img/icons/${a}.png" alt="Event type icon">\n      </label>\n      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${f}" type="checkbox">\n\n      <div class="event__type-list">\n        <fieldset class="event__type-group">\n          <legend class="visually-hidden">Event type</legend>\n          ${m}\n        </fieldset>\n      </div>\n    </div>\n\n    <div class="event__field-group  event__field-group--destination">\n      <label class="event__label  event__type-output" for="event-destination-${f}">\n        ${a}\n      </label>\n      <input class="event__input  event__input--destination" id="event-destination-${f}" type="text" name="event-destination" value="${_}" list="destination-list-${f}">\n      <datalist id="destination-list-${f}">\n        ${b};\n      </datalist>\n    </div>\n\n    <div class="event__field-group  event__field-group--time">\n      <label class="visually-hidden" for="event-start-time-${f}">From</label>\n      <input class="event__input  event__input--time" id="event-start-time-${f}" type="text" name="event-start-time" value="${l(s)}">\n      &mdash;\n      <label class="visually-hidden" for="event-end-time-${f}">To</label>\n      <input class="event__input  event__input--time" id="event-end-time-${f}" type="text" name="event-end-time" value="${l(r)}">\n    </div>\n\n    <div class="event__field-group  event__field-group--price">\n      <label class="event__label" for="event-price-${f}">\n        <span class="visually-hidden">Price</span>\n        &euro;\n      </label>\n      <input class="event__input  event__input--price" id="event-price-${f}" type="text" name="event-price" value="${i}">\n    </div>\n\n    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n    <button class="event__reset-btn" type="reset">Cancel</button>\n  </header>\n  <section class="event__details">\n    <section class="event__section  event__section--offers">\n        <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n        <div class="event__available-offers">\n          ${$}\n        </div>\n    </section>\n    <section class="event__section  event__section--destination">\n      <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n      <p class="event__destination-description">${h}</p>\n     </section>\n  </section>\n  </form></li>`}(this.points,this.destinations,this.offers)}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class f{constructor(e,t,n){this.points=e,this.offers=n,this.destinations=t}getTemplate(){return function(e,t,n){const{basePrice:i,dateFrom:s,dateTo:r,type:a,offers:u}=e,f=e.id||0,v=t.find((t=>t.id===e.destination)),{name:_,description:h,pictures:m}=v||{},b=p.map((e=>c({pointType:e,pointId:f,type:a}))).join(""),y=t.map((e=>d(e))).join(""),$=n.find((t=>t.type===e.type)),g=$?$.offers.map((e=>o(e,u))).join(""):"";return`<li class="trip-events__item"><form class="event event--edit" action="#" method="post">\n  <header class="event__header">\n    <div class="event__type-wrapper">\n      <label class="event__type  event__type-btn" for="event-type-toggle-${f}">\n        <span class="visually-hidden">Choose event type</span>\n        <img class="event__type-icon" width="17" height="17" src="img/icons/${a}.png" alt="Event type icon">\n      </label>\n      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${f}" type="checkbox">\n\n      <div class="event__type-list">\n        <fieldset class="event__type-group">\n          <legend class="visually-hidden">Event type</legend>\n          ${b}\n        </fieldset>\n      </div>\n    </div>\n\n    <div class="event__field-group  event__field-group--destination">\n      <label class="event__label  event__type-output" for="event-destination-${f}">\n        ${a}\n      </label>\n      <input class="event__input  event__input--destination" id="event-destination-${f}" type="text" name="event-destination" value="${_||""}" list="destination-list-${f}">\n      <datalist id="destination-list-${f}">\n        ${y};\n      </datalist>\n    </div>\n\n    <div class="event__field-group  event__field-group--time">\n      <label class="visually-hidden" for="event-start-time-${f}">From</label>\n      <input class="event__input  event__input--time" id="event-start-time-${f}" type="text" name="event-start-time" value="${l(s)}">\n      &mdash;\n      <label class="visually-hidden" for="event-end-time-${f}">To</label>\n      <input class="event__input  event__input--time" id="event-end-time-${f}" type="text" name="event-end-time" value="${l(r)}">\n    </div>\n\n    <div class="event__field-group  event__field-group--price">\n      <label class="event__label" for="event-price-${f}">\n        <span class="visually-hidden">Price</span>\n        &euro;\n      </label>\n      <input class="event__input  event__input--price" id="event-price-${f}" type="text" name="event-price" value="${i}">\n    </div>\n\n    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n    <button class="event__reset-btn" type="reset">Delete</button>\n    <button class="event__rollup-btn" type="button">\n      <span class="visually-hidden">Open event</span>\n    </button>\n  </header>\n  <section class="event__details">\n    <section class="event__section  event__section--offers">\n        <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n        <div class="event__available-offers">\n          ${g}\n        </div>\n    </section>\n    <section class="event__section  event__section--destination">\n      <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n      <p class="event__destination-description">${h}</p>\n        ${function(e){let t="";for(let n=0;n<e.length;n++){const{src:i,description:s}=e[n];t+=`<img class="event__photo" src="${i}" alt="${s}">`}return e.length>0?`<div class="event__photos-container">\n        <div class="event__photos-tape">\n          ${t}\n        </div>\n      </div>`:""}(m)}\n    </section>\n  </section>\n  </form></li>`}(this.points,this.destinations,this.offers)}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class v{constructor(e,t,n){this.points=e,this.offers=n,this.destinations=t}getTemplate(){return function(e,t,n){const{basePrice:i,dateFrom:s,dateTo:r,isFavorite:l,type:o}=e,c=o.charAt(0).toUpperCase()+o.slice(1),d=t.find((t=>t.id===e.destination)),{name:p}=d||{},u=n.find((t=>t.type===e.type)).offers.filter((t=>e.offers.includes(t.id))),f=u?u.map((e=>function({title:e,price:t}){return`<li class="event__offer">\n      <span class="event__offer-title">${e}</span>\n        +€&nbsp;\n      <span class="event__offer-price">${t}</span>\n    </li>`}(e))).join(""):"",v=!0===l?"event__favorite-btn--active":"";return`<li class="trip-events__item">\n  <div class="event">\n    <time class="event__date" datetime=${s}>${a(s)}</time>\n    <div class="event__type">\n      <img class="event__type-icon" width="42" height="42" src="img/icons/${o}.png" alt="Event type icon">\n    </div>\n    <h3 class="event__title">${c} ${p}</h3>\n    <div class="event__schedule">\n      <p class="event__time">\n        <time class="event__start-time" datetime=${s}>${a(s)}</time>\n        —\n        <time class="event__end-time" datetime=${r}>${a(r)}</time>\n      </p>\n      <p class="event__duration">${function(e,t){const n=new Date(e),i=new Date(t),s=Math.abs(i-n),r=Math.floor(s/36e5),a=Math.floor(s/6e4%60);return r>=1?`${r}H ${a}M`:`${a}M`}(s,r)}</p>\n    </div>\n    <p class="event__price">\n      €&nbsp;<span class="event__price-value">${i}</span>\n    </p>\n    <h4 class="visually-hidden">Offers:</h4>\n    <ul class="event__selected-offers">\n    ${f}\n    </ul>\n    <button class="event__favorite-btn ${v}" type="button">\n      <span class="visually-hidden">Add to favorite</span>\n      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>\n      </svg>\n    </button>\n    <button class="event__rollup-btn" type="button">\n      <span class="visually-hidden">Open event</span>\n    </button>\n  </div>\n  </li>`}(this.points,this.destinations,this.offers)}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class _{getTemplate(){return'<ul class="trip-events__list"></ul>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}const h=[{id:"f4b62099-293f-4c3d-a702-66eec4a2808c",basePrice:200,dateFrom:"2023-07-10T22:55:56.845Z",dateTo:"2023-07-11T11:22:13.375Z",destination:"bfa5cb75-a1fe-4b77-a66c-0e528e910e04",isFavorite:!1,offers:["b4c3e4e6-9053-42ce-b747-e111314baa31","b4c3e4e6-9053-42ce-b747-e221314baa31","b4c3e4e6-9053-42ce-b747-e331314baa31"],type:"taxi"},{id:"f4b62099-293f-4c3d-a702-77eec4a2808c",basePrice:1100,dateFrom:"2023-08-10T22:55:56.845Z",dateTo:"2023-08-11T00:12:11.375Z",destination:"bfa5cb75-a1fe-4b77-a77c-0e528e910e04",isFavorite:!1,offers:["b4c3e4e6-9053-42ce-b747-e441314baa31","b4c3e4e6-9053-42ce-b747-e551314baa31"],type:"flight"},{id:"f4b62099-293f-4c3d-a702-88eec4a2808c",basePrice:2e3,dateFrom:"2019-07-10T22:55:56.845Z",dateTo:"2019-07-15T15:22:43.375Z",destination:"bfa5cb75-a1fe-4b77-a88c-0e528e910e04",isFavorite:!0,offers:[],type:"ship"}],m=[{type:"taxi",offers:[{id:"b4c3e4e6-9053-42ce-b747-e111314baa31",title:"Upgrade to a business class",price:120},{id:"b4c3e4e6-9053-42ce-b747-e221314baa31",title:"Meeting with a sign",price:20},{id:"b4c3e4e6-9053-42ce-b747-e331314baa31",title:"Another offer",price:70}]},{type:"flight",offers:[{id:"b4c3e4e6-9053-42ce-b747-e441314baa31",title:"Add luggage",price:30},{id:"b4c3e4e6-9053-42ce-b747-e551314baa31",title:"Meeting with a sign",price:20},{id:"b4c3e4e6-9053-42ce-b747-e661314baa31",title:"Upgrade to a business class",price:120},{id:"b4c3e4e6-9053-42ce-b747-e771314baa31",title:"Switch to comfort class",price:80},{id:"b4c3e4e6-9053-42ce-b747-e881314baa31",title:"Add meal",price:20},{id:"b4c3e4e6-9053-42ce-b747-e991314baa31",title:"Choose seats",price:10}]},{type:"ship",offers:[{id:"b4c3e4a6-9053-42ce-b747-e551314baa31",title:"Add alco free",price:1200},{id:"b4c3e4b6-9053-42ce-b747-e551314baa31",title:"GYM",price:100},{id:"b4c3e4c6-9053-42ce-b747-e551314baa31",title:"Upgrade to a business class",price:120},{id:"b4c3e4d6-9053-42ce-b747-e551314baa31",title:"Upgrade to a comfort class",price:80},{id:"b4c3e4e7-9053-42ce-b747-e551314baa31",title:"Suit with window",price:250}]},{type:"train",offers:[]}],b=[{id:"bfa5cb75-a1fe-4b77-a66c-0e528e910e04",description:"Cotor, is a beautiful city, a true european pearl, with redroofs streets.",name:"Cotor",pictures:[{src:"https://traveltimes.ru/wp-content/uploads/2021/07/img-1006-mini.jpg",description:"Bay of Kotor"}]},{id:"bfa5cb75-a1fe-4b77-a77c-0e528e910e04",description:"Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.",name:"Roma",pictures:[]},{id:"bfa5cb75-a1fe-4b77-a88c-0e528e910e04",description:"Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.",name:"Monaco",pictures:[{src:"https://wikiway.com/upload/uf/9bc/monaco_1.jpg",description:"Monaco casino"},{src:"https://about-planet.ru/images/evropa/strana/monako/monako9.jpg",description:"Monaco beach"}]}],y=document.querySelector(".page-header"),$=document.querySelector(".page-main"),g=y.querySelector(".trip-main"),M=g.querySelector(".trip-controls__filters"),w=$.querySelector(".trip-events");t(new class{getTemplate(){return'<section class="trip-main__trip-info  trip-info">\n  <div class="trip-info__main">\n    <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>\n\n    <p class="trip-info__dates">18&nbsp;&mdash;&nbsp;20 Mar</p>\n  </div>\n\n  <p class="trip-info__cost">\n    Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>\n  </p>\n</section>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}},g,"afterbegin"),t(new class{getTemplate(){return'<form class="trip-filters" action="#" method="get">\n  <div class="trip-filters__filter">\n    <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>\n    <label class="trip-filters__filter-label" for="filter-everything">Everything</label>\n  </div>\n\n  <div class="trip-filters__filter">\n    <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">\n    <label class="trip-filters__filter-label" for="filter-future">Future</label>\n  </div>\n\n  <div class="trip-filters__filter">\n    <input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="present">\n    <label class="trip-filters__filter-label" for="filter-present">Present</label>\n  </div>\n\n  <div class="trip-filters__filter">\n    <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past">\n    <label class="trip-filters__filter-label" for="filter-past">Past</label>\n  </div>\n\n  <button class="visually-hidden" type="submit">Accept filter</button>\n</form>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}},M),t(new class{getTemplate(){return'<form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n  <div class="trip-sort__item  trip-sort__item--day">\n    <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked>\n    <label class="trip-sort__btn" for="sort-day">Day</label>\n  </div>\n\n  <div class="trip-sort__item  trip-sort__item--event">\n    <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>\n    <label class="trip-sort__btn" for="sort-event">Event</label>\n  </div>\n\n  <div class="trip-sort__item  trip-sort__item--time">\n    <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">\n    <label class="trip-sort__btn" for="sort-time">Time</label>\n  </div>\n\n  <div class="trip-sort__item  trip-sort__item--price">\n    <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">\n    <label class="trip-sort__btn" for="sort-price">Price</label>\n  </div>\n\n  <div class="trip-sort__item  trip-sort__item--offer">\n    <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>\n    <label class="trip-sort__btn" for="sort-offer">Offers</label>\n  </div>\n</form>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}},w);const D=new class{constructor(){this.points=[]}init(){this.points=h}getPoints(){return this.points}};D.init();const T=new class{constructor(){this.offers=[]}init(){this.offers=m}getOffers(){return this.offers}};T.init();const S=new class{constructor(){this.destinations=[]}init(){this.destinations=b}getDestinations(){return this.destinations}};S.init();const E=new class{listComponent=new _;constructor({tripEventsContainer:e,pointModel:t,offerModel:n,destinationModel:i}){this.tripEventsContainer=e,this.pointModel=t,this.offerModel=n,this.destinationModel=i}init(){const e=this.pointModel.getPoints(),n=this.destinationModel.getDestinations(),i=this.offerModel.getOffers();t(this.listComponent,this.tripEventsContainer),t(new u(e[1],n,i),this.listComponent.getElement()),t(new f(e[2],n,i),this.listComponent.getElement());for(const s of e)t(new v(s,n,i),this.listComponent.getElement())}}({tripEventsContainer:w,pointModel:D,offerModel:T,destinationModel:S});E.init()})()})();
//# sourceMappingURL=bundle.45f41088c6abd9e77405.js.map