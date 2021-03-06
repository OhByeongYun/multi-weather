var startposition = 50;

/*ref : "x_axis": x좌표, "y_axis": y좌표, "radius": 원 크기, "color" : 색깔,"region_name": 지역이름,"temperature": 온도,etc */
/*bref : 기후 바람 추가 해야할듯*/
var jsonCircles = [
  { "x_axis": 60, "y_axis": 100, "radius": 50, "color" : "#A05CE2","region_name":"서울","temperature": 10 }, //0
  { "x_axis": 250, "y_axis": 50, "radius": 50, "color" : "#E25BD6","region_name":"강릉","temperature": 12 },  //1
  { "x_axis": 50, "y_axis": 250, "radius": 50, "color" : "#56C272","region_name":"대전","temperature": 13 },   //2
  { "x_axis": 200, "y_axis": 300, "radius": 50, "color" : "#5CCAA4","region_name":"대구","temperature": 14 },//3
  { "x_axis": 350, "y_axis": 450, "radius": 50, "color" : "#E4BC66","region_name":"부산","temperature": 15 },//4
  { "x_axis": 80, "y_axis": 380, "radius": 50, "color" : "#EA8D8D","region_name":"전주","temperature": 16 },  //5
  { "x_axis": 50, "y_axis": 500, "radius": 50, "color" : "#5C64CA","region_name":"광주","temperature": 17 },  //6
  { "x_axis": 100, "y_axis": 650, "radius": 50, "color" : "#9855B2","region_name":"제주","temperature": 11 },  //7
  { "x_axis": 400, "y_axis": 80, "radius": 50, "color" : "#979797","region_name":"울릉","temperature": 18},  //8
  { "x_axis": 550, "y_axis": 100, "radius": 50, "color" : "#DE93B1","region_name":"독도","temperature": 19}];   //9


var jsontext = [
   { "x_axis": 60, "y_axis": 100, "radius": 50, "color" : "#A05CE2","region_name":"서울","temperature": 10 }, //0
  { "x_axis": 250, "y_axis": 50, "radius": 50, "color" : "#E25BD6","region_name":"강릉","temperature": 12 },  //1
  { "x_axis": 50, "y_axis": 250, "radius": 50, "color" : "#56C272","region_name":"대전","temperature": 13 },   //2
  { "x_axis": 200, "y_axis": 300, "radius": 50, "color" : "#5CCAA4","region_name":"대구","temperature": 14 },//3
  { "x_axis": 350, "y_axis": 450, "radius": 50, "color" : "#E4BC66","region_name":"부산","temperature": 15 },//4
  { "x_axis": 80, "y_axis": 380, "radius": 50, "color" : "#EA8D8D","region_name":"전주","temperature": 16 },  //5
  { "x_axis": 50, "y_axis": 500, "radius": 50, "color" : "#5C64CA","region_name":"광주","temperature": 17 },  //6
  { "x_axis": 100, "y_axis": 650, "radius": 50, "color" : "#9855B2","region_name":"제주","temperature": 11 },  //7
  { "x_axis": 400, "y_axis": 80, "radius": 50, "color" : "#979797","region_name":"울릉","temperature": 18},  //8
  { "x_axis": 550, "y_axis": 100, "radius": 50, "color" : "#DE93B1","region_name":"독도","temperature": 19}];   //9

var CityCode = {
      '서울': 'KSXX0037',
      '강릉': 'KSXX0011',
      '대전': 'KSXX0027',
      '대구': 'KSXX0026',
      '부산': 'KSXX0050',
      '전주': 'KSXX0047',
      '광주': 'KSXX0014',      
      '제주': 'KSXX0053',      
      '울릉': 'KSXX0039',
      '독도': 'KSXX0036'
};

var CityName = [
      "Seoul",
      "Kangnung",
      "Taejon",
      "Taegu",
      "Pusan",
      "Chonju",
      "Kwangju",
      "Cheju Upper/Radar",
      "Ullungdo",
      "Tonghae Radar Site"
];



/*패스 배열*/
var jsonPath = [];