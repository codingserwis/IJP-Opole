"use strict";var GoogleMap={init:function(){var t=document.createElement("script");t.type="text/javascript",t.src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCyeImWmy1LmNodXs2VPwMnW0-T_W_rHLw&callback=GoogleMap.create",document.body.appendChild(t)},create:function(){var t={lat:50.6705469,lng:17.8830356};new google.maps.Map(document.getElementById("map"),{zoom:13,center:t})}},IJPApi=function(t){var a={domStrings:{ijpData:".station__data-ijp",pm10Data:".station__data-pm1",pm25Data:".station__data-pm2",IJPDataContainer:".data__container-ijp",cond:".weather__currnet-condition",temp:".weather__currnet-temp"},ijpApi:{apiKey:"1487184056",pointsId:{chabry:"5ccf7fc18200",pulaskiego:"5ccf7fc255ee",pileckiego:"6001940094f8",pasieka:"5ccf7fc17d7d",nowaWiesKrol:"5ccf7fc18052",grudzice:"60019400a82b",osAlSolid:"a020a6036801"}},apixuApi:{apiKey:"48147044f89b4001831152133171402",location:"Opole"}},e=function(){var t=new Request("http://api.apixu.com/v1/current.json?key="+a.apixuApi.apiKey+"&q="+a.apixuApi.location,{method:"GET"});fetch(t).then(function(t){return t.json()}).then(function(t){console.log(t),i(t)})},n=function(){var t=!0,e=!1,n=void 0;try{for(var i,o=Object.values(a.ijpApi.pointsId)[Symbol.iterator]();!(t=(i=o.next()).done);t=!0){var r=i.value,d=new Request("http://api.looko2.com/?method=GetLOOKO&id="+r+"&token="+a.ijpApi.apiKey,{method:"GET"});fetch(d).then(function(t){return t.json()}).then(function(t){console.log(t),c(t)})}}catch(t){e=!0,n=t}finally{try{!t&&o.return&&o.return()}finally{if(e)throw n}}},i=function(t){var e=void 0,n=document.querySelector(a.domStrings.cond),i=document.querySelector(a.domStrings.temp).firstElementChild;e=o(t),n.innerHTML=e,i.innerHTML=t.current.temp_c},o=function(t){if(1===t.current.is_day){if(1e3===t.current.condition.code)return'<i class="wi wi-day-sunny"></i>';if(1003===t.current.condition.code)return'<i class="wi wi-day-cloudy"></i>'}else{if(1e3===t.current.condition.code)return'<i class="wi wi-night-clear"></i>';if(1003===t.current.condition.code)return'<i class="wi wi-night-alt-cloudy"></i>'}},c=function(t){var e=void 0,n=void 0,i=void 0,o=void 0,c=void 0,l=document.querySelector(a.domStrings.IJPDataContainer);n=r(t),i=d(t),o=_(t),c=s(t),e='<div class="station__container">\n\t\t\t\t\t\t<h2 class="station__container-header">'+n+'</h2>\n\t\t\t\t\t\t<div class="station__container-data flex flex__row flex__justify-between">\n\t\t\t\t\t\t\t<div class="station__data-ijp '+i+'">\n\t\t\t\t\t\t\t\t<h3>IJP</h3>\n\t\t\t\t\t\t\t\t<p class="data__ijp">'+t.IJP+'</p>\n\t\t\t\t\t\t\t\t<p class="text__ijp">'+t.IJPString+'</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="station__data-pm2 '+o+'">\n\t\t\t\t\t\t\t\t<h3>PM 2.5</h3>\n\t\t\t\t\t\t\t\t<p class="data__pm2">'+t.PM25+'</p>\n\t\t\t\t\t\t\t\t<p class="units">&microg/m<sup>3</sup></p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="station__data-pm1 '+c+'">\n\t\t\t\t\t\t\t\t<h3>PM 10</h3>\n\t\t\t\t\t\t\t\t<p class="data__pm1">'+t.PM10+'</p>\n\t\t\t\t\t\t\t\t<p class="units">&microg/m<sup>3</sup></p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>',l.insertAdjacentHTML("beforeend",e)},r=function(t){var a=void 0;return"Opole_Opolski_Alarm_Smogowy_Grud"===t.Name?a="Grudzice":"Opole_STE_Silesia_Chabry"===t.Name?a="Osiedle Chabry":"Opole_Opolski_Alarm_Smogowy_NWK"===t.Name?a="Nowa Wieś Królewska":"Opole_Komitet_Obrony_Pasieki_Pas"===t.Name?a="Pasieka":"Opole_Liceum_NR_II_Pulaskiego3"===t.Name?a="LO nr II - Puławskiego":"Opole_Opolski_Alarm_SmogowyBuhla"===t.Name?a="Opole - Groszowice":"Opole_OAS_AlSolidarnosci"===t.Name&&(a="Aleja Solidarności"),a},d=function(t){var a=void 0;return t.IJP>=0&&t.IJP<=1?a="data__bcg-dgreen":t.IJP>=2&&t.IJP<=3?a="data__bcg-green":t.IJP>=4&&t.IJP<=5?a="data__bcg-yellow":t.IJP>=6&&t.IJP<=7?a="data__bcg-orange":t.IJP>=8&&t.IJP<=9?a="data__bcg-red":t.IJP>=10&&(a="data__bcg-black"),a},_=function(t){var a=void 0;return t.PM25>=0&&t.PM25<=12?a="data__bcg-dgreen":t.PM25>=13&&t.PM25<=36?a="data__bcg-green":t.PM25>=37&&t.PM25<=60?a="data__bcg-yellow":t.PM25>=61&&t.PM25<=84?a="data__bcg-orange":t.PM25>=85&&t.PM25<=120?a="data__bcg-red":t.PM25>121&&(a="data__bcg-black"),a},s=function(t){var a=void 0;return t.PM10>=0&&t.PM10<=20?a="data__bcg-dgreen":t.PM10>=21&&t.PM10<=60?a="data__bcg-green":t.PM10>=61&&t.PM10<=100?a="data__bcg-yellow":t.PM10>=101&&t.PM10<=140?a="data__bcg-orange":t.PM10>=141&&t.PM10<=200?pm25Bcg="data__bcg-red":t.PM10>201&&(pm25Bcg="data__bcg-black"),a};return{init:function(){console.log("app is running!"),n(),e(),t.init()}}}(GoogleMap);IJPApi.init();
//# sourceMappingURL=app.js.map
