function temperatureChart(dataset)
{

  var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 500 - margin.left - margin.right,
    height = 150 - margin.top - margin.bottom;

  
  var padding=20;
  var y = d3.scale.linear()
              .domain([0, d3.max(dataset)])
              .range([height-padding,0])
  var x = d3.scale.linear()
              .domain([0, dataset.length])
              .range([padding, width])
  d3.select("#myModal .modal-body").selectAll("svg").remove();

  var tChartsvg = d3.select("#myModal .modal-body .temperature")    
        .append("svg")
        .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)

  tChartsvg.selectAll('rect')
         .data(dataset)
         .enter()
         .append('rect')
         .attr('x', function (d, i) {
           return x(i);
          })
         .attr('y', function(d) {
           return y(d);
         })
         .attr('width', function (d,i) {
           return parseInt(( width-padding )/ dataset.length) - 1;
         })
         .attr('height', function (d) {
            return height-y(d)+40;
          })
         .attr('fill', 'black');

    var xAxis = d3.svg.axis()
                  .scale(x)
                  .orient('bottom');
    var yAxis = d3.svg.axis()
                  .scale(y)
                  .ticks(5)
                  .orient('left');

    tChartsvg.selectAll('text')
       .data(dataset)
       .enter()
       .append('text')
       .text(function(d) {
         return d;
       })
       .attr('x', function(d, i) {
         return parseInt(x(i)) + 1;
       })
       .attr('y', function(d) {
         return y(d)+10;
       })
       .attr('font-size','10px')
       .attr('fill', 'white')
}


function windChart(winddata){
 var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 500 - margin.left - margin.right,
    height = 150 - margin.top - margin.bottom;

var parseDate = d3.time.format("%d-%b-%y").parse;

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });

var svg = d3.select("#myModal .modal-body .wind").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  winddata.forEach(function(d) {
    d.date = parseDate(d.date);
    d.close = +d.close;
  });

  x.domain(d3.extent(winddata, function(d) { return d.date; }));
  y.domain(d3.extent(winddata, function(d) { return d.close; }));

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")      

  svg.append("path")
      .datum(winddata)
      .attr("class", "line")
      .attr("d", line);
  
}