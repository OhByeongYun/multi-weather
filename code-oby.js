String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/gi, "");
}

var CityCode = {
	'서울': 'KSXX0037',
	'대전': 'KSXX0027',
	'대구': 'KSXX0026',
	'전주': 'KSXX0047',
	'광주': 'KSXX0014',
	'부산': 'KSXX0050',
	'제주': 'KSXX0053',
	'강릉': 'KSXX0011',
	'울릉': 'KSXX0039',
	'독도': 'KSXX0036'
};

Weather.getWeather(function(data){
	drawInfo(data[0]);
	drawGraph(data);
}, {'전주': 'KSXX0047'});

function drawInfo(data) {
	var city = data.city;
	var humidity = data.humidity;
	var sunrise = data.sunrise;
	var sunset = data.sunset;
	var condition = data.condition;
	var wind = data.wind;
	
	$("#local-info .location .city-en").text(city);
	$("#local-info .location .update-time").text(condition.date);
	$("#weather-now .box .temp .t").text(condition.temp);
	$("#weather-now .box .c").text(condition.text);
	$("#weather-humidity .box .humi .t").text(humidity);
	$("#weather-wind .box .direction .d").text(wind.direction);
	$("#weather-wind .box .speed .s").text(wind.speed)
	$("#weather-sun .box .rise .time .a").text(sunrise.split(" ")[0]);
	$("#weather-sun .box .rise .time .n").text(sunrise.split(" ")[1]);
	$("#weather-sun .box .set .time .a").text(sunset.split(" ")[0]);
	$("#weather-sun .box .set .time .n").text(sunset.split(" ")[1]);
}

$("#select .box").on("click", function(){
	$("#select .box").removeClass("active");
	$(this).addClass("active");
	
	var city = ($(this).parent().text()).trim();
	$("#local-info .location .city-ko").text(city);
	
	
	
	var citycode;
	for(i in CityCode) {
		if(i == city) {
			citycode = CityCode[i];
		}
	}
	
	Weather.getWeather(function(data){
		drawInfo(data[0]);
		drawGraph(data);
	}, {city: citycode});
});

function drawGraph(data) {
	var data = data[0].forecast;
	var obj = [];
	
	data.forEach(function(d){
		var date = (new Date(d.date)).getDate();
		
		var o = {};
		o.date = date;
		o.high = +d.high;
		o.low = +d.low;
		o.text = d.text;
		
		obj.push(o);
	});
	
	var margin = {top: 20, right: 30, bottom: 30, left: 40},
		width = 1100 - margin.left - margin.right,
		height = 300 - margin.top - margin.bottom;
		
	var x = d3.scale.linear().range([0, width]);
	var y = d3.scale.linear().range([height, 0]);
	
	var xAxis = d3.svg.axis().scale(x).orient("bottom").tickFormat(function(d) { return d + "일";});
	var yAxis = d3.svg.axis().scale(y).orient("left");
	
	var line = d3.svg.line().interpolate(interpolateSankey).x(function(d){ return x(d.date) }).y(function(d){ return y(d.high) });
	
	d3.select("#forecast").selectAll("g").remove();
	var svg = d3.select("#forecast").attr("id", "forecast").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
	x.domain(d3.extent(obj, function(d) { return d.date; }));
	y.domain(d3.extent(obj, function(d) { return d.high; }));
	
	svg.append("g").attr("class", "x axis").attr("transform", "translate(0, " + height + ")").call(xAxis).append("text").attr("x", 5).attr("transform", "translate(" + (width - 100) + ", -10)").text("최고온도 (단위: 일)");
	
	svg.append("g").attr("class", "y axis").call(yAxis).append("text").attr("y", 5).attr("transform", "translate(0, -10)").text("도(C)");
	
	svg.selectAll(".point").data(obj).enter().append("svg:circle").attr("stroke", "#ffa951").attr("fill", function(d) { return "#ffa951"; }).attr("cx", function(d) { return x(d.date); }).attr("cy", function(d) { return y(d.high) }).attr("r", function(d) { return 4; });
	
	svg.append("path").datum(obj).attr("class", "line").attr("d", line);
	
	d3.selectAll("circle").each(function(){ this.parentNode.appendChild(this); });
	
	svg.append("svg:line");
}

function interpolateSankey(points) {
	var x0 = points[0][0], y0 = points[0][1], x1, y1, x2,
	path = [x0, ",", y0],
	i = 0,
	n = points.length;
	while (++i < n) {
		x1 = points[i][0], y1 = points[i][1], x2 = (x0 + x1) / 2;
		path.push("C", x2, ",", y0, " ", x2, ",", y1, " ", x1, ",", y1);
		x0 = x1, y0 = y1;
	}
	return path.join("");
}