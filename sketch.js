//Empty array for circle objects
let circles1 = [];

let index;

//Color and opacity variables
let red;
let green;
let blue;
let opacity;

let rowNumber = 0;

//The length of the time window being visualized
let timeFrame = 30;

//Animation frame rate
let fps =24;

//Loading Data
function preload(){
sp500 = loadTable("sp500.csv", "csv" ,"header");
}

//Visuzalization setup
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  smooth(8);
  frameRate(fps);
  
  // Extracting the data for visualization
  returnArray = sp500.getColumn('return');
  yearArray = sp500.getColumn('year');
  
  maxReturn = max(returnArray.slice(1,returnArray.length));
  minReturn = min(returnArray.slice(1,returnArray.length));
  
  maxYear =  max(yearArray.slice(1,yearArray.length));
  minYear =  min(yearArray.slice(1, yearArray.length));
}


//The visualization 
function draw() {
  background(250, 250, 250, 80);
  
  rowNumber = rowNumber +1;
  
  // Parameter that adjusts the sizes of the visualization elements based on aspect ratio
  let scaleParameter;
  
    if(window.innerWidth > window.innerHeight){
      scaleParameter = 2;
    } else {
      scaleParameter = 3.5;
    }
  
  //Timeline
  strokeWeight(10);
  stroke(50);
  point(window.innerWidth*0.1, window.innerHeight*0.9);
  point(window.innerWidth*0.9, window.innerHeight*0.9);
  strokeWeight(2);
  line(window.innerWidth*0.1, window.innerHeight*0.9, window.innerWidth*0.9, window.innerHeight*0.9);
  
  
  //Date variables
  let year1 = sp500.getNum(rowNumber,"year");
  let month1 = sp500.getNum(rowNumber,"month");
  let day1 = sp500.getNum(rowNumber,"day");
  let year2 = sp500.getNum(rowNumber + timeFrame,"year");
  let month2 = sp500.getNum(rowNumber + timeFrame,"month");
  let day2 = sp500.getNum(rowNumber + timeFrame,"day");
  
  
  //Visualization Title
  textFont('Calibri');
  noStroke();
  fill(50);
  textAlign(CENTER);
    
  textSize(windowWidth*0.02*scaleParameter);
  text("The Ring of Returns", windowWidth/2, windowHeight*0.15);
  
  //Date labels 
  textSize(windowWidth*0.01*scaleParameter);
  textAlign(RIGHT);
  text(day1 + ' / ' + month1 + ' / ' + year1, windowWidth/2 - windowWidth/10 ,windowHeight*0.96);
  textAlign(RIGHT);
  
  if(window.innerWidth > window.innerHeight){
      text(day2 + ' / ' + month2 + ' / ' + year2, windowWidth/2 + windowWidth/4.7 ,windowHeight*0.96);
    } else {
      text(day2 + ' / ' + month2 + ' / ' + year2, windowWidth/2 + windowWidth/3.4 ,windowHeight*0.96);
    }
  

  //Return rings
  for(var x = rowNumber; x <= rowNumber + timeFrame; x+=1 ){   
  
  // Progression line
  strokeWeight(4);  
  let timeLineLength = dist(window.innerWidth*0.1, window.innerHeight*0.9, window.innerWidth*0.9, window.innerHeight*0.9);
  let stepLength = map(x, 1, returnArray.length, 1, timeLineLength);
  let timeWindowLength = map(timeFrame, 0, (maxYear - minYear + 1)*365, 0, timeLineLength);
  
    
  stroke(255, 222, 0, 100);  
  line(window.innerWidth*0.1 + stepLength, window.innerHeight*0.9, window.innerWidth*0.1 + stepLength + timeWindowLength, window.innerHeight*0.9);
  
  strokeWeight(4)  
  line(window.innerWidth*0.41, window.innerHeight*0.955, window.innerWidth*0.6, window.innerHeight*0.955);
  
  ellipseMode(CENTER);
  let dailyReturn = sp500.getNum(x,"return");
  
  let diameter;
  
     if(dailyReturn < 0){
       red = 201;
       green = 0;
       blue = 0;
       diameter = map(dailyReturn, minReturn, 0, 0, width*0.1*scaleParameter);
     } else {
       red = 0;
       green = 201;
       blue = 0;
       diameter = map(dailyReturn,0, maxReturn, width*0.1*scaleParameter, width*0.3*scaleParameter);
     }
    
  opacity = 100/(0.5*fps)*(1 + abs(dailyReturn));
  strokeSize = 10/(1 + abs(dailyReturn));
     
  
  circles1[index] = new Circle(window.innerWidth/2, window.innerHeight/2, diameter);
  circles1[index].show(red,green,blue,opacity,strokeSize);
       
  }

}



class Circle {
  constructor(xcoord, ycoord, diameter) {

   this.xcoord = xcoord;
   this.ycoord = ycoord;
   this.diameter = diameter;
  }

  show(r,g,b,o,w) {

   stroke(r,g,b,o);
   strokeWeight(w);
   noFill();
   ellipse(this.xcoord, this.ycoord, this.diameter, this.diameter);
   noStroke();
   fill(242,97,1);
  }

  move(p) {
  this.xcoord = mouseX + 300*p;
  this.ycoord = mouseY;
  }
}

function mousePressed(){
  noLoop()
}

function mouseReleased(){
  loop()
}