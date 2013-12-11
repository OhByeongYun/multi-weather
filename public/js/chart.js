function temperatureChart(dataset)
{
  var width=520;
  var height=220;
  var padding=20;
  var y = d3.scale.linear()
              .domain([0, d3.max(dataset)])
              .range([height-padding,0])
  var x = d3.scale.linear()
              .domain([0, dataset.length])
              .range([padding, width])
  d3.select("#myModal .modal-body").selectAll("svg").remove();

  var svg = d3.select("#myModal .modal-body .temperature")    
        .append("svg")
        .attr('width', width)
        .attr('height', height);

  svg.selectAll('rect')
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
            return height-y(d)-padding;
          })
         .attr('fill', 'black');

    var xAxis = d3.svg.axis()
                  .scale(x)
                  .orient('bottom');
    var yAxis = d3.svg.axis()
                  .scale(y)
                  .ticks(5)
                  .orient('left');
    svg.selectAll('text')
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