var svgContainer = d3.select("body")
                    .selectAll("#colum")
                    .append("svg")
                    .attr("height",startposition+650)
                    .attr("width",startposition+550);

/*지역 그리기*/
function drawCircle() {
 svgContainer.selectAll("circle").remove();
    var circles = svgContainer.selectAll("circle")
                          .data(jsonCircles)
                          .enter()
                          .append("circle")                          
                          .attr("cx", function (d) { return startposition + d.x_axis; })
                          .attr("cy", function (d) { return startposition + d.y_axis; })
                          .attr("r", function (d) { return d.radius; })
                          .attr("class","bubble")                                                   
                          .style("fill", function(d) { return d.color; })
                          .on("mousedown", function(d) { secLayoutViewer(d); });//클릭 이벤트 ;
    
}

/*지역명 표기*/

function drawText() {
  svgContainer.selectAll("text").remove();
    var text_temperature = svgContainer
                          .selectAll("circles")
                          .data(jsontext)
                          .enter()                          
                          .append("text")                     
                          .text(function(d){return d.temperature;})
                          .attr("class","txt_type1")
                          .attr("transform", function (d) {
                                 return "translate("+(startposition + d.x_axis-10)+","+(startposition + d.y_axis+20)+")";
                           }).on("mousedown", function(d) { 
                            secLayoutViewer(d);
                           });//클릭 이벤트 ;;

   var text_region = svgContainer
                      .selectAll("circles")
                      .data(jsontext)
                      .enter()                          
                      .append("text")                          
                      .text(function(d){return d.region_name;})
                      .attr("class","txt_type1")
                      .attr("transform", function (d) {
                             return "translate("+(startposition + d.x_axis-15)+","+ (startposition + d.y_axis)+")";
                       }).on("mousedown", function(d) {
                        secLayoutViewer(d);
                        });//클릭 이벤트 ;;
}

function secLayoutViewer(data){
  // $('#popup_secViewer').removeClass("hide").addClass("show");
  var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,];

  var windtest = [
    {"date":"1-May-12","close": 582.13},
    {"date":"30-Apr-12","close" : 583.98},
    {"date":"27-Apr-12","close" : 603.00},
    {"date":"26-Apr-12","close" : 607.70},
    {"date":"25-Apr-12","close" : 610.00},
    {"date":"24-Apr-12","close" : 560.28},
    {"date":"23-Apr-12","close" : 571.70}
    //  {"data":1,"close": 582},
    // {"data":30,"close" : 583},
    // {"data":27,"close" : 603},
    // {"data":26,"close" : 607},
    // {"data":25,"close" : 610},
    // {"data":24,"close" : 560},
    // {"data":23,"close" : 571}
];
  /*  var CityCode = {
      '서울': 'KSXX0037',
      '대전': 'KSXX0027',
      '대구': 'KSXX0026',
      '전주': 'KSXX0047',
      '광주': 'KSXX7663',
      '부산': 'KSXX0050',
      '제주': 'KSJU0110',
      '강릉': 'KSXX0011',
      '울릉': 'KSXX0039',
      '독도': 'KSXX0036'
    };
    
    Weather.getWeather(function(data){
      console.log(data);
    }, CityCode);*/

  
  $('#myModal .modal-header .modal-title').text(data.region_name);

  temperatureChart(dataset);
  windChart(windtest);

  $('#myModal').modal('show');

}



function survePathdraw(){
    var survepath = [
      { "prev":0, "next":2},
      { "prev":0, "next":3},
      { "prev":1, "next":3},
      { "prev":1, "next":4},
      { "prev":1, "next":8},
      { "prev":2, "next":5},
      { "prev":3, "next":5},
      { "prev":3, "next":6},
      { "prev":4, "next":6},
      { "prev":4, "next":7},
    ];

    for (var i = survepath.length - 1; i >= 0; i--) {
        jsonPath.push({
          "x1" : startposition + jsonCircles[survepath[i].prev].x_axis,
          "y1" : startposition + jsonCircles[survepath[i].prev].y_axis,
          "x2" : startposition + jsonCircles[survepath[i].next].x_axis,
          "y2" : startposition + jsonCircles[survepath[i].next].y_axis,
        });
    }
}
/*패스 push*/
function pushPath(){

  /*메인 패스*/
  for(var i = 0 ; i < jsonCircles.length -1; i++){     
      if(i == 7){
        continue;
      }
      jsonPath.push(
      {
        "x1" : startposition + jsonCircles[i].x_axis,
        "y1" : startposition + jsonCircles[i].y_axis,
        "x2" : startposition + jsonCircles[i+1].x_axis,
        "y2" : startposition + jsonCircles[i+1].y_axis,
      });
  }

  /*서브 패스*/ 
  survePathdraw();
}

/*패스 그리기*/
function drawPath(){
  svgContainer.selectAll("line").remove();
  jsonPath = [];
  pushPath();

  var text_temperature = svgContainer
  .selectAll("line")
  .data(jsonPath)
  .enter()
  .append("line")
  .attr("x1",function(d){return d.x1;})
  .attr("y1",function(d){return d.y1;})
  .attr("x2",function(d){return d.x2;})
  .attr("y2",function(d){return d.y2;})
  .attr("stroke","black")
  .attr("stroke-width",2)
  .attr("class","line")
  ;
}

var iterCircle = 0;
function eventCircle(){
  setInterval(function(){
  /*$('svg Circle').eq(iterCircle).fadeOut(100, function(){ 
  
    $('svg Circle').eq(iterCircle).fadeIn(300);
    iterCircle++;

    if(iterCircle == 10){
      iterCircle = 0;
    }
  });*/
    // d3.select("#colum").selectAll("svg").remove();

    for(var i = 0 ; i < jsonCircles.length ; i++){
      var  loc = (randomInt(0, 1) - randomInt(0, 1))/10;

      jsonCircles[i]["x_axis"] += loc;
      // loc = (randomInt(0, 1) - randomInt(0, 1))/5;
      // jsonCircles[i]["y_axis"] += loc;
      loc = (randomInt(0, 1) - randomInt(0, 1))/10;
      jsonCircles[i]["radius"] += loc;
     
    }
    drawPath();
    drawCircle();
    drawText();

  }, 10);
}


function randomInt(from, to)   
{  
    return (Math.random()*(to - from + 1)) + from;  
} 





// function bootstrap(){  
//   $(".alert").alert('close');
// }

// 
/*시작*/
drawPath();
drawCircle();
drawText();

eventCircle();

