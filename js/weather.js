var Weather = (function(){

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
		  , i
		  , code;
		
		// using YQL weather query
		for(i in data) {
			_url = 'http://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where location="' + data[i] + '" and u="c"&format=json';
			
			$.ajax({
				url: _url,
				dataType: 'json',
				type: 'get',
				async: false,
				success: function(data) {
					result.push(data.query);
				}
			});
		}
		
		func.call(result, result);
	};
	
	return {
		on: on,
		bind: bind,
		unbind: unbind,
		getWeather: getWeather
	};
})();