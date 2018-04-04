$(document).ready(function(){

	// get location by IP
	function currentWeather() {
		$.getJSON("https://ipapi.co/json", function(location) {
	// get weather by location
			var api = "https://fcc-weather-api.glitch.me/api/current?lat=" + location.latitude + "&lon=" + location.longitude;
			var metric = "&units=metric";
			var imperial = "&units=imperial";
			var url = api + metric;
			var conditions;
			var weather;

	// write location in Title	
			$("#localCity").text(location.city + ", " + location.region);

	// get temperature and conditions	
			$.getJSON(url, function(weather) {
				console.log(weather);
				imperial = Math.round(((weather.main.temp * 9) / 5) + 32); // get farenheight
				metric = Math.round(weather.main.temp); // get celsius
				conditions = weather.weather[0].description; // get description of weather
				$("#currentTemp").text(metric);
				$("#farenheight").toggleClass('opClass');
				$("#celsius").click(function() {
					$("#currentTemp").text(metric);							
					$("#farenheight").toggleClass('opClass').removeClass('active');		
					$("#celsius").toggleClass('active').removeClass('opClass');
				});
				$("#farenheight").click(function() {
					$("#currentTemp").text(imperial);
					$("#celsius").toggleClass('opClass').removeClass('active');
					$("#farenheight").toggleClass('active').removeClass('opClass');
				});		
				$(".wi").addClass("wi-owm-" + weather.weather[0].id);// get icon of weather
				$("#weatherConditions").hide();//hide icon and conditions by click
				$("#weatherIcon").click(function() {
					$("#weatherConditions").html(conditions).show();
				});
				$("#weatherConditions").click(function() {
					$("#weatherConditions").hide();
				});
			})
		})
	}
	
	currentWeather();
	
	// background is changed depending on the season of year
	var date = new Date();

	switch(date.getMonth()) {
		case 11:
		case 0:
		case 1:
				document.body.style.cssText = "background:  url('img/winter.jpg') no-repeat center center fixed; background-size: cover;";
				break;
		case 2:
		case 3:
		case 4:
				document.body.style.cssText = "background:  url('img/spring.jpg') no-repeat center center fixed; background-size: cover;";
				break;
		case 5:
		case 6:
		case 7:
				document.body.style.cssText = "background:  url('img/summer.jpg') no-repeat center center fixed; background-size: cover;";
				break;
		case 8:
		case 9:
		case 10:
				document.body.style.cssText = "background:  url('img/autumn.jpg') no-repeat center center fixed; background-size: cover;";	
				break;
	}

});

