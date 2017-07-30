const IJPApi = (()=> {
	
	//options for API
	const appOptions = {
		domStrings: {
			ijpData: '.station__data-ijp',
			pm10Data: '.station__data-pm1',
			pm25Data: '.station__data-pm2'
		},
		ijpApi: {
			apiKey: '1487184056',
			pointsId: {
				chabry: '5ccf7fc18200',
				pulaskiego: '5ccf7fc255ee',
				pileckiego: '6001940094f8',
				pasieka: '5ccf7fc17d7d',
				nowaWiesKrol: '5ccf7fc18052',
				grudzice: '60019400a82b'

			}
		},
		apixuApi: {

		}
	};
	// connection to API - loop trought all IJP points
	const connectionToIJP = ()=> {
		for(let point of Object.values(appOptions.ijpApi.pointsId)){
			const request = new Request(`http://api.looko2.com/?method=GetLOOKO&id=${point}&token=${appOptions.ijpApi.apiKey}`, {
			method: 'GET'
		});
		fetch(request)
			.then((response)=> {
				let data;
				return data = response.json();
			})
			.then((data)=> {
				console.log(data);
				insertIJPData(data)
			});	
		};
	};
	// insert data to DOM
	const insertIJPData = (data)=> {
		let html, stationName, ijpBcgColor, pm25BcgColor;
			// getting the coect nam of station
			stationName = nameChange(data);
			ijpBcgColor = checkValueOfIJP(data);
			pm25BcgColor = checkValueOfPM25(data);

			// insertin data to the DOM
			html = `<div class="station__container"><h2 class="station__container-header">${stationName}</h2><div class="station__container-data flex flex__row flex__justify-between"><div class="station__data-ijp ${ijpBcgColor}"><h3>IJP</h3><p class="data__ijp">${data.IJP}</p><p class="text__ijp">${data.IJPString}</p></div><div class="station__data-pm2 ${pm25BcgColor}"><h3>PM 2.5</h3><p class="data__pm2">${data.PM25}</p><p class="units">&microg/m<sup>3</sup></p></div><div class="station__data-pm1"><h3>PM 10</h3><p class="data__pm1">${data.PM10}</p><p class="units">&microg/m<sup>3</sup></p></div></div></div>`;
			document.querySelector('.data__container-data').insertAdjacentHTML('beforeend', html);			
	};
	
	// change the name of teh IJP station
	const nameChange = (data)=> {
		let station;

		if (data.Name === 'Opole_Opolski_Alarm_Smogowy_Grud') {
			station = 'Grudzice';
		} else if (data.Name === 'Opole_STE_Silesia_Chabry') {
			station = 'Osiedle Chabry';
		} else if (data.Name === 'Opole_Opolski_Alarm_Smogowy_NWK') {
			station = 'Nowa Wieś Królewska';
		} else if (data.Name === 'Opole_Komitet_Obrony_Pasieki_Pas') {
			station = 'Pasieka';
		} else if (data.Name === 'Opole_Liceum_NR_II_Pulaskiego3') {
			station = 'LO nr II - Puławskiego';
		} else if (data.Name === 'Opole_Opolski_Alarm_SmogowyBuhla') {
			station = 'Opole - Groszowice';
		}
		return station;
	};

	// setting the bcg color of IJP container
	const checkValueOfIJP = (data)=> {
		let ijpBcg;

		if (data.IJP >= 0 && data.IJP <= 1) {
			ijpBcg = 'data__bcg-dgreen';
		} else if (data.IJP >= 2 && data.IJP <= 3) {
			ijpBcg = 'data__bcg-green';
		} else if (data.IJP >= 4 && data.IJP <= 5) {
			ijpBcg = 'data__bcg-yellow';
		} else if (data.IJP >= 6 && data.IJP <= 7) {
			ijpBcg = 'data__bcg-orange';
		} else if (data.IJP >= 8 && data.IJP <= 9) {
			ijpBcg = 'data__bcg-red';
		} else if (data.IJP >= 10) {
			ijpBcg = 'data__bcg-black';
		}

		return ijpBcg;
	};

	// setting the bcg color of PM2.5 container
	const checkValueOfPM25 = (data)=> {
		let pm25Bcg;

		if (data.PM25 >= 0 && data.PM25 <= 12) {
		 	pm25Bcg = 'data__bcg-dgreen';
	 	} else if (data.PM25 >= 13 && data.PM25 <= 36) {
			pm25Bcg = 'data__bcg-green';
		} else if (data.PM25 >= 37 && data.PM25 <= 60) {
			pm25Bcg = 'data__bcg-yellow';
		} else if (data.PM25 >= 61 && data.PM25 <= 84) {
			pm25Bcg = 'data__bcg-orange';
		} else if (data.PM25 >= 85 && data.PM25 <= 120) {
			pm25Bcg = 'data__bcg-red';
		} else if (data.PM25 > 121) {
			pm25Bcg = 'data__bcg-black';
		}

		return pm25Bcg;
	};

	// setting the bcg color of PM10 container
//	const checkValueOfPM10 = (data)=> {
//		let 
	// 	let pm10Container = document.querySelectorAll(appOptions.domStrings.pm10Data);

	// 	pm10Container.forEach((element)=> {
	// 		if (data.PM10 >= 0 && data.PM10 <= 20) {
	// 			element.style.backgroundColor = '#1b5e20';
	// 		} else if (data.PM10 >= 21 && data.PM10 <= 60) {
	// 			element.style.backgroundColor = '#8bc34a';
	// 		} else if (data.PM10 >= 61 && data.PM10 <= 100) {
	// 			element.style.backgroundColor = '#fdd835';
	// 		} else if (data.PM10 >= 101 && data.PM10 <= 140) {
	// 			element.style.backgroundColor = '#bf360c';
	// 		} else if (data.PM10 >= 141 && data.PM10 <= 200) {
	// 			element.style.backgroundColor = '#b71c1c';
	// 		} else if (data.PM10 > 201) {
	// 			element.style.backgroundColor = '#000';
	// 		}
	// 	});
//	};

	// public functions 
	return {
		init: ()=> {
			console.log('app is running!');
			connectionToIJP();
		}
	};
})();

IJPApi.init();









// const connectionController = (()=> {
// 	const pointsConfig = {
// 		apiKey: '1487184056',
// 		points: {
// 			chabry: {
// 				key: '5ccf7fc18200'
// 			}
// 		}
// 	};
// 	return {
// 		connectToIJPApi: ()=> {

// 			console.log(pointsConfig);
// 			console.log('api con i done');
// 		},
// 		publicTest: ()=> {
// 			console.log('connectionCtrl is running!');
// 		}
// 	}
// })();
// const api = ((conCtrl)=>{
// 	return {
// 		init: ()=> {
// 			console.log('app is running!');
// 			conCtrl.connectToIJPApi();
// 			conCtrl.publicTest();
// 		}
// 	};
// })(connectionController);

// api.init();