var startposition = 50;

/*ref : "x_axis": x좌표, "y_axis": y좌표, "radius": 원 크기, "color" : 색깔,"region_name": 지역이름,"temperature": 온도,etc */
/*bref : 기후 바람 추가 해야할듯*/
var jsonCircles = [
  { "x_axis": 60, "y_axis": 100, "radius": 60, "color" : "black","region_name":"서울","temperature": 10 }, //0
  { "x_axis": 180, "y_axis": 50, "radius": 40, "color" : "blue","region_name":"강원","temperature": 12 },  //1
  { "x_axis": 50, "y_axis": 250, "radius": 50, "color" : "red","region_name":"대전","temperature": 13 },   //2
  { "x_axis": 300, "y_axis": 300, "radius": 50, "color" : "green","region_name":"대구","temperature": 14 },//3
  { "x_axis": 350, "y_axis": 400, "radius": 60, "color" : "purple","region_name":"부산","temperature": 15 },//4
  { "x_axis": 80, "y_axis": 400, "radius": 30, "color" : "black","region_name":"전주","temperature": 16 },  //5
  { "x_axis": 50, "y_axis": 500, "radius": 40, "color" : "green","region_name":"광주","temperature": 17 },  //6
  { "x_axis": 100, "y_axis": 580, "radius": 30, "color" : "blue","region_name":"제주","temperature": 11 },  //7
  { "x_axis": 400, "y_axis": 80, "radius": 30, "color" : "purple","region_name":"울릉","temperature": 18},  //8
  { "x_axis": 500, "y_axis": 100, "radius": 30, "color" : "red","region_name":"독도","temperature": 19}];   //9

/*패스 배열*/
var jsonPath = [];

