var Weather = (function(){

	var events = {},
	    lastUid = -1;

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
	
	var on = function(event, data) {
		return dispatcher(event, data, false);
	};

	var bind = function(event, func) {
		if(!events.hasOwnProperty(event)) {
			events[event] = [];
		}
		
		var token = (++lastUid).toString();
		
		events[event].push({token: token, func: func});
		
		return token;
	};
	
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
	
	return {
		on: on,
		bind: bind,
		unbind: unbind
	};
})();


Weather.bind('aa', function(event, data){
	console.log(event, data);
});

Weather.on('aa', 1);