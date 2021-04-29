// variables: F+-[]
// axiom: F
// rules: F -> FF+[+F-F-F]-[-F+F+F]
var angle;
var axiom = "F";
var rules = []
    rules[0] = { a: "F",
                 //b: "FF+[+F-F-F]-[-F+F+F]"}
                 b: "FF+[+F+F-F]-[-F+F]"}


var sentence = axiom;
var len = 150;
var strokeW = 6;

function setup(){
  //noCanvas();
  //createP(axiom);
  colorMode(HSB, 360, 100, 100, 100);
  angle = PI/20;
  createCanvas(600, 600);
  background(0);
  turtle();
}

function generate(){
  len *= .5;
  strokeW *= .8;
  var nextSentence = "";
  for(var i = 0; i < sentence.length; i++){
    var current = sentence.charAt(i);
    var found = false;
    for (var j = 0; j < rules.length; j++){
      if(current == rules[j].a){
        found = true;
        nextSentence += rules[j].b;
        break;
      }
    }
    if(!found){
      nextSentence += current;
    }
  }
  sentence = nextSentence;
  //createP(sentence);
}

function mousePressed(){
  generate();
  turtle();
}

function turtle(){
  translate(width/2,height-20);
  stroke(36, 50, 100, 20);
  strokeWeight(strokeW);
  for (var i = 0; i < sentence.length; i++){
    var current = sentence.charAt(i);
    if (current == "F"){
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
    }
  }
} //end turtle()

function draw(){

}
