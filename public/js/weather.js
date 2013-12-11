var Weather = (function(){
	"use strict";

	var events = {},
	    lastUid = -1;

	/*
	 * @function dispatcher
	 * @param (event) : fire event name
	 * @param (data) : hanling data
	 *
	 */
	var dispatcher = function(event, data) {
		if(!events.hasOwnProperty(event)) {
			return false;
		}
		
		var notify = function() {
			var dispatchers = events[event],
			    throwException = function(e) {
				    return function() {
					    throw e;
				    };
			    };
			    
			for(var i=0, j=dispatchers.length; i<j; i++) {
				try {
					dispatchers[i].func(event, data);
				} catch(e) {
					setTimeout(throwException(e), 0);
				}
			}
		};
		
		setTimeout(notify, 0);
		
		return true;
	};
	
	
	/*
	 * @function on
	 * @param (event) : fire event name
	 * @param (data) : hanling data
	 *
	 * Weather.on('event', { ... });
	 *
	 */ 
	var on = function(event, data) {
		return dispatcher(event, data, false);
	};


	/*
	 * @function bind
	 * @param (event) : fire event name
	 * @param (func) : callback func
	 *
	 * Weather.bind('event', function(){ ... });
	 *
	 */ 
	var bind = function(event, func) {
		if(!events.hasOwnProperty(event)) {
			events[event] = [];
		}
		
		var token = (++lastUid).toString();
		
		events[event].push({token: token, func: func});
		
		return token;
	};
	
	
	/*
	 * @function unbind
	 * @param (token) : unbind event name
	 *
	 * Weather.unbind('event');
	 *
	 */ 
	var unbind = function(token) {
		for(var e in events) {
			if(events.hasOwnProperty(e)) {
				for(var i=0, j=events[e].length; i<j; i++) {
					events[e].splice(i, 1);
					
					return token;
				}
			}
		}
		
		return false;
	};
	
	
	/*
	 * @function getWeather
	 * @param (data) : city code obj
	 * @param (func) : callback
	 *
	 * var objs = {'city': code, 'city': code};
	 * Weather.getWeather(objs, function(data){ ... });
	 *
	 */                   
	var getWeather = function(data, func) {
		var result = [];
		
		var _url
		  , i = 0
		  , j = 0
		  , len = 0
		  , code;
		
		for(i in data) { 
			len++;
		}
		
		j = 0;
		Weather.bind('onWeatherReceive', function(e, d){
			result.push(d);
			j++;
			
			if(j == len) {
				func.call(result, result);
				Weather.unbind('onWeatherReceive');
			}
		});
		
		for(i in data) {
			// using YQL weather query
			_url = 'http://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where location="' + data[i] + '" and u="c"&format=json';
			
			$.ajax({
				url: _url,
				dataType: 'json',
				type: 'get',
				async: true,
				success: function(data) {
					Weather.on('onWeatherReceive', data.query);
				}
			});
		}
	};
	
	
	/*
	 * @function getLocation
	 * @param (func) : callback
	 * @param (coord) : geolocation coords(lat, lng)
	 *
	 * var geocoords = {'lat': 37.24324, 'lng': 127.34533};
	 * Weather.getLocation(function(data){ ... }, geocoords);
	 * Weather.getLocation(function(data){ ... });
	 *
	 */
	var getLocation = function(func, coord) {
		var GeocodingRequestURL = "http://maps.googleapis.com/maps/api/geocode/json";
		var lat, lng;
		var address;
		
		var _getLoc = function(){
			var results, result;
			$.ajax({
				url: GeocodingRequestURL,
				data: 'latlng=' + lat + ',' + lng + '&sensor=false',
				dataType: 'json',
				type: 'get',
				asyc: false,
				success: function(data) {
					results = data.results;
					result = results[results.length-3].formatted_address;
					
					func.call(window, result, results);
				}
			});
		};
		
		if(coord == undefined) {
			if(navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function(pos){
					lat = pos.coords.latitude;
					lng = pos.coords.longitude;
					
					_getLoc();
				});
			} else {
				address = "좌표를 불러올 수 없습니다.";
			}
		} else {
			lat = coord.lat;
			lng = coord.lng;
			
			_getLoc();
		}
	};
	
	var getTime = function(func) {
		var interval;
		
		var now
		  , hour
		  , min
		  , seconds
		  , noon;
		
		Weather.bind('onReceiveTime', function(e, time){
			func.call(time, time);
		});
		
		var _calcTime = function() {
			now = new Date();
			hour = now.getHours();
			min = now.getMinutes();
			seconds = now.getSeconds();
			
			now = null;
			
			noon = 'am';
			if(hour > 12) {
				hour = hour %12;
				if(hour < 10) {
					hour = '0' + hour;
				}
				noon = 'pm';
			}
			
			min = (min > 9) ? min.toString() : '0' + min;
			seconds = (seconds > 9) ? seconds.toString() : '0' + seconds;
			
			return {
				hour: hour,
				min: min,
				seconds: seconds,
				noon: noon
			};
		}
		
		interval = setInterval(function(){
			Weather.on('onReceiveTime', _calcTime());
		}, 1000);
	};
	
	return {
		on: on,
		bind: bind,
		unbind: unbind,
		getWeather: getWeather,
		getLocation: getLocation,
		getTime: getTime
	};
})();