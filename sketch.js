let log;
let capacitanceNow = 1000;
let hue = 100;
let leafX;
let leafY;
let leafDir;
let leafDiam;
let leafDia = 8;
let leafDirs = [-1, 1];

log = { today: [3],
           week: [ 0, 1, 0, 0, 0, 3, 1],
           month: [5, 3, 2, 0],
           year: [9, 4, 0, 5, 0, 3, 5, 1, 6, 2, 0, 0],
           years: 4 };

 // variables: F+-[]
 // axiom: F
 // rules: F -> FF+[+F-F-F]-[-F+F+F]
 var angle;
 var axiom = "F";
 var rules = []
     rules[0] = { a: "F",
                  //b: "FF+[++F-F-FL]-[--F+F+FL]"} //original
                  b: "FF+[+FF-FL]-[-F+F-FL]"} //happy tree
                  //b: "F+[+F-F+F]-[-FF+F]"}
                  //b: "F+[+F+F-FL]-[-FF+FL]"}

      // rules[1] = { a: "L",
      //              //b: "FF+[+F-F-FL]-[-F+F+FL]"}
      //              //b: "FF+[+F+F-FL]--[F++FL]"}
      //              b: "[FFL]"
      //            }


 var sentence = axiom;
 var len = 40;
 var strokeW = 5;

 function setup(){
   //noCanvas();
   //createP(axiom);
   colorMode(HSB, 360, 100, 100, 100);
   ellipseMode(CENTER);
   angle = PI/8;
   createCanvas(600, 600);
   background(100,0,100,100);
   turtle();

   stroke(0, 0, 0);
   strokeWeight(5);
   //line(10, height/2, width/2, height/2);
 }

 function generate(){
   len *= .65;
   strokeW *= .6; //.7
   var nextSentence = "";
   for(var i = 0; i < sentence.length; i++){
     var current = sentence.charAt(i);
     var found = false;
     for (var j = 0; j < rules.length; j++){
       if(current == rules[j].a){
         found = true;
         nextSentence += rules[j].b;
         //break;
       }
     }
     if(!found){
       nextSentence += current;
     }
   }
   sentence = nextSentence;
   //createP(sentence);

 }

 function generate_2(){

   len *= 1;
   strokeW *= .6; //.7
   for(var p = 1; p < log.week.length + 1; p++){
     sentence += "-[+F-F+FL]";
   }
 }

 function mousePressed(){

   generate();
   push();
   translate(width/2,height/2);
   turtle();
   pop();

   push();
   translate(width/2,height/2);
   rotate(PI/3+random(-PI/12, PI/12));
   turtle();
   pop();

   push();
   translate(width/2,height/2);
   rotate(PI*2/3+random(-PI/12, PI/12));
   turtle();
   pop();

   push();
   translate(width/2,height/2);
   rotate(PI*3/3+random(-PI/12, PI/12));
   turtle();
   pop();

   push();
   translate(width/2,height/2);
   rotate(PI*4/3+random(-PI/12, PI/12));
   turtle();
   pop();
 }

 function turtle(){
   //translate(width/2,height/2);
   for (var i = 0; i < sentence.length; i++){
     var current = sentence.charAt(i);
     if (current == "F"){
       stroke(36, 0, 30, 100);
       strokeWeight(strokeW);
       line(0,0,0, -len);
       translate(0, -len);

     } else if (current == "+"){
       rotate(angle);
     } else if (current == "-"){
       rotate(-angle);
     } else if (current == "["){
       push();
     } else if (current == "]"){
       pop();
     } else if(current == "L"){
       if(strokeW < 4){
         let leafGen = random(0, 5);
         let leaves = [];

         for(var n = 1; n < leafGen + 1; n++){
           if(n == 1){
             //leafDir = PI/2;
             leafDir = angle;
           } else if(n % 2 == 0){
             //leafDir = PI/3;
             leafDir = PI/4;
           } else if (n % 2 == 1){
             //leafDir = PI/3 + PI/2;
             leafDir = -PI/4;
           }
           leafX = 0;
           leafY = (n - 1)*1;
           capacitanceNow = random(800, 12000);
           leaves[n] = new Leaf(capacitanceNow, hue, leafX, leafY, leafDir);
          }
          rotate(PI-angle*2);
          for(var m = 1; m < leaves.length; m++){
           fill(map(m, 1, leaves.length, 8, 55), 70, map(m, 1, leaves.length, 100, 100), 70);
           translate(0, -leafY);
           leaves[m].display();
          }
      }
   }
 }
 } //end turtle()

 function draw(){

 }

 class Leaf{

   constructor(capacitanceNow, hue, leafX, leafY, leafDir){
     this.capNow = capacitanceNow;
     this.hue = hue;
     this.leafX = leafX;
     this.leafDir = leafDir;
     this.leafY = leafY;
   }

   display(){

     let leafLength = map(this.capNow, 800, 12000, 10, 20);
     rotate(this.leafDir);

     //push();
     for(let k = 0; k < leafLength; k++){
       var leafDiam = map(k, 0, leafLength, 0, leafDia);
       //var x = this.leafX + cos(this.leafDir - PI)*k;
       //var y = this.leafY + sin(this.leafDir - PI)*k;
       var x = 4;
       var y = k + 1;
         //fill(this.hue, 50, 100, 30);
         stroke(this.hue, 50, 100, 0);
         ellipse(x, y, leafDiam, leafDiam*.7);
     }
     //pop();
   }
 }
