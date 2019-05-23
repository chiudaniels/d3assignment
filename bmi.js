//general setup
var screenHeight = $(window).height(),
    screenWidth = $(window).width();

var svgHeight = screenHeight * .41,
    svgWidth = screenWidth * .46,
    svgMargin = screenWidth * .05,
    svgXPos = screenWidth * .1,
    svgYPos = screenHeight * .1;
//

if (svgHeight > svgWidth *1.25) {
    svgHeight = screenHeight * .15;
}

$("body").css({ "font-family": "Avenir Next" })


//demo data//
var weight = 95.55,
    height = 61.3,
    name = "Rosie",
    testdate = "05/09/2019"
    bmi = Math.round((weight / (height * height) * 703) * 100) / 100;
//

d3.select("body")
    .style("font", "Avenir Next");


//test date and print button//
var d = new Date(testdate);
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
$("#testDate").html("Test Date: " + monthNames[d.getMonth()] +" " +d.getDay() +", " + d.getFullYear());
$("#testDate").append('<br> <div style="padding-right: 2%"> <button class="btn btn-secondary hidden-print" onclick="myFunction()"<span class="glyphicon glyphicon-print" aria-hidden="true"></span> Print</button> </div>');
$("#testDate").css({"text-align":"right", "padding-right":"2%", "padding-top":"2%"});

function myFunction() {
    window.print();
}

//


//make bmi graph
var svg = d3.select("#bmiGraph").append("svg")
    .attr('width', "100%")
    .attr('height', svgHeight)
    .attr('margin', svgMargin)
    .style("background", "black");

var g = svg.append("g");

//length of entire graph
var graphLength = $("#graphPart").width() / 2 * .75;
//length of individual section of box
sectionLength = graphLength / 4,
    sectionHeight = svgHeight * .1,
    graphXStart = svgWidth * .115;

d3.select('#graphPart')
    .style("padding", 0)
    .style("background","black");


//set up position for bmi indicator
var secMax = [0, 18.5, 25, 30, 40];

var sectionPos = -1,
    secPosPercentage;

if (bmi < secMax[1]) {
    sectionPos = 0;
    secPosPercentage = (bmi) / (secMax[1]);
}
else if (bmi < secMax[2]) {
    sectionPos = 1;
    secPosPercentage = (bmi - secMax[1]) / (secMax[2] - secMax[1]);
}
else if (bmi < secMax[3]) {
    sectionPos = 2;
    secPosPercentage = (bmi - secMax[2]) / (secMax[3] - secMax[2]);
}
else {
    sectionPos = 3;
    secPosPercentage = (bmi - secMax[3]) / (secMax[4] - secMax[3]);
    if (secPosPercentage > 1) {
        secPosPercentage = 1;
    }
}
//

// make boxes for the graph
var i,
    graphColors = ["#dfe0e2", "#89bd7b", "#ffb877", "#ff6839"];
for (i = 0; i < 4; i++) {
    g.append('rect')
        .attr("y", svgHeight * .5)
        .attr("x", graphXStart + (sectionLength * i))
        .attr("width", sectionLength)
        .attr("height", sectionHeight)
        .style("fill", graphColors[i])
        .style("stroke", "white")
        .style("stroke-width", ".07rem");
    if (i != 4) {
        g.append('text')
            .attr("y", svgHeight * .65)
            .attr("x", graphXStart + (sectionLength * i))
            .text(secMax[i])
            .style("size", "1rem")
            .style("stroke", "white")
            .style("font", "Verdana")
            .style("stroke-width", ".07rem");
    }
}
//
//current bmi
g.append('line')
    .attr("x1", graphXStart + (sectionLength * sectionPos) + (sectionLength * secPosPercentage))
    .attr("x2", graphXStart + (sectionLength * sectionPos) + (sectionLength * secPosPercentage))
    .attr("y1", svgHeight * .4)
    .attr("y2", svgHeight * .5 + sectionHeight)
    .style("stroke", "grey")
    .style("stroke-width", ".2rem")

g.append('text')
    .attr("y", svgHeight * .35)
    .attr("x", graphXStart + (sectionLength * sectionPos) + (sectionLength * (secPosPercentage - .15)))
    .text(bmi)
    .style("size", "1rem")
    .style("stroke", "white")
    .style("font", "Verdana")
    .style("text-align", "center");
//

//low text
g.append('text')
    .attr("y", svgHeight * .45)
    .attr("x", graphXStart * .8)
    .text("Low")
    .style("fill", "white")
    .style("size", "1rem");
//high text
g.append('text')
    .attr("y", svgHeight * .45)
    .attr("x", graphXStart * .8 + sectionLength * 4)
    .text("High")
    .style("fill", "white")
    .style("size", "1rem");

// end of make bmi graph

//bmi title
var title = d3.select("#bmiTitle")
    .style("padding", "70px")
    .style("text-align", "center");

var bmiTitle = name + ", you have a ";
switch (sectionPos) {
    case 0:
        bmiTitle += "somewhat low BMI of ";
        break;
    case 1:
        bmiTitle += "healthy BMI of ";
        break;
    case 2:
        bmiTitle += "somewhat high BMI of ";
        break;
    case 3:
        bmiDesc += "high BMI of ";
        break;
}

bmiTitle += bmi;

title.append('text')
    .text(bmiTitle)
    .attr("width", "100%")
    .style("font-size", "3.75rem")
//end of bmi title

//bmi desc
var desc = d3.select("#bmiDesc")
    .attr("height", svgHeight)
    .attr("width", svgWidth)
    .style("text-align", "justify")
    .style("font-style", "Avenir")

d3.select("#descPart")
    .attr("height", "100%")
    .style("vertical-align", "text-top")
    .style("background-color", "#EEEEEE")

var bmiDesc = "Your BMI (Body Mass Index) is ";

if (sectionPos != 1){
    bmiDesc += "outside the healthy range.";
}
else{
    bmiDesc += "in the healthy range.";
}

desc.append('p')
    .text(bmiDesc)
    .style("font-size", "2rem");

desc.append('p')
    .style("padding", "10%");


desc.append('p')
    .text("However, BMI results should be reviewed along with body composition results.")
    .style("font-size", "2rem");

desc.append('p')
    .text(" See your BOD POD  results.")
    .style("font-size", "2rem");


d3.selectAll("td")
    .attr("height", "100%")
    .attr("width", "50%");

//end of bmi desc

//body and height text
d3.select("#wh")
    .attr("height", svgHeight)

var weightDesc = d3.select("#weight")
    .style("background-color", "#B3B3B3")
    .style("vertical-align", "text-top");

weightDesc.append('p')
    .text("Body Weight")
    .style("font-size", "3.75rem")
    .style("color", "white")
    .style("padding-left","1.5%");

weightDesc.append('p')
    .style("padding", "3.75rem");

weightDesc.append('p')
    .text(weight + " lb")
    .style("padding-left","1.5%")    
    .style("font-size", "3.75rem");

var heightDesc = d3.select("#height")
    .style("vertical-align", "text-top")
    .style("background-color", "#EEEEEE");

heightDesc.append('p')
    .text("Height")
    .style("font-size", "3.75rem")
    .style("padding-left","1.5%")    
    .style("color", "#f2740c");

heightDesc.append('p')
    .style("padding", "3rem");

heightDesc.append('p')
    .text(height + " in")
    .style("padding-left","1.5%")
    .style("font-size", "3.75rem");

//end of body and height text

$("tr").css({ "line-height": "0" })
$("p").css({ "line-height": "1.5" })
$("text").css({ "line-height": "1.5" })
