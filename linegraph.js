
//general setup
var height = 500,
    width = 600,
    margin = 100;
barWidth = 40,
    barOffset = 20;

var systoic = [115, 120, 110, 90, 117, 103];
var diastoic = [75, 65, 60, 72, 80, 68];
var weeks = [1, 2, 3, 4, 5, 6, 7];

var yScale = d3.scaleLinear()
    .domain([0, d3.max(systoic)])
    .range([height, 0]);


var yAxisScale = d3.scaleLinear()
    .domain([d3.max(systoic), 0])
    .range([0, height]);

var xScale = d3.scalePoint()
    .domain(d3.range(0, systoic.length))
    .range([0, width])


var svg = d3.select("#linegraph").append("svg")
    .attr('width', width + 2 * margin)
    .attr('height', height + 2 * margin)

var g = svg.append("g")
    .attr("transform", "translate(" + 100 + "," + 110 + ")");

var line = d3.line()
    .x(function (d, i) {
        return xScale(i);
    })
    .y(function (d) {
        return yScale(d);
    });

//end of setup


//make axis

//x axis
g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale))
    .selectAll(".tick")
    .select('line')
    .attr("stroke", "#777")
    .attr("y1", -1 * height)
    .attr("stroke-dasharray", "2,2");

//x axis label
g.append("text")
    .attr("y", height + 50)
    .attr("x", width - 50)
    .attr("text-anchor", "end")
    .text("Week");

//y axis 
g.append("g")
    .call(d3.axisLeft(yAxisScale)
        .ticks(10))
    .selectAll(".tick")
    .select('line')
    .attr("stroke", "#777")
    .attr("x2", width)
    .attr("stroke-dasharray", "2,2");

//y axis label
g.append("text")
    .attr("y", -25)
    .attr("x", 10)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("Blood Pressure");

//line 1 label
g.append("text")
    .attr("y", yScale(d3.min(systoic)))
    .attr("x", width + 60)
    .attr("dy", "0.1em")
    .attr("text-anchor", "end")
    .text("Systoic");

//line 2 label
g.append("text")
    .attr("y", yScale(d3.min(diastoic)))
    .attr("x", width + 60)
    .attr("dy", "0.1em")
    .attr("text-anchor", "end")
    .text("Diastoic");
//end of axis

// make lines
g.append("svg:path")
    .attr("d", line(systoic))
    .attr("stroke", "red")
    .attr("fill", "none");;

g.append("svg:path")
    .attr("d", line(diastoic))
    .attr("stroke", "green")
    .attr("fill", "none");;

// end of make lines

//make color fill
g.append('rect')
    .attr('width', width)
    .attr('height', height - yScale(d3.max(systoic) - d3.min(systoic)))
    .attr('x', 0)
    .attr('y', yScale(d3.max(systoic)))
    .attr('fill', 'red')
    .attr('fill-opacity', .15);

g.append('rect')
    .attr('width', width)
    .attr('height', height - yScale(d3.max(diastoic) - d3.min(diastoic)))
    .attr('x', 0)
    .attr('y', yScale(d3.max(diastoic)))
    .attr('fill', 'green')
    .attr('fill-opacity', .15);



//end of make color fill