
//setup
var height = 500,
    width = 600,
    margin = 100;
barWidth = 40,
    barOffset = 20;

var data = [1700, 1500, 1600, 1550, 1625, 1300, 1400];
var weeks = [1, 2, 3, 4, 5, 6, 7];

var yScale = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, height]);

var yAxisScale = d3.scaleLinear()
    .domain([d3.max(data), 0])
    .range([0, height]);

var xScale = d3.scaleBand()
    .domain(d3.range(0, data.length))
    .range([0, width])


var svg = d3.select("#bargraph").append("svg")
    .attr('width', width + 2 * margin)
    .attr('height', height + 2 * margin)
    .attr('margin', '50px')

var g = svg.append("g")
    .attr("transform", "translate(" + 100 + "," + 110 + ")");

// end of setup


//draw bars
g.selectAll('rect').data(data)
    .enter().append('rect')
    .attr('width', xScale.bandwidth() - 25)
    .attr('height', function (data) {
        return yScale(data);
    })
    .attr('x', function (data, i) {
        return xScale(i) + 12.5;
    })
    .attr('y', function (data) {
        return height - yScale(data);
    })
    .style('fill', 'grey')
    .style('stroke', 'white')
    .style('stroke-width', 5)
    .style('opacity', 1);

//end of draw bars

//draw axis and labels

//x axis
g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale));

//x axis label
g.append("text")
    .attr("y", height + 50)
    .attr("x", width -50)
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

//y axis scale
g.append("text")
    .attr("y", -25)
    .attr("x", 10)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("Metabolic Rate");

//end of draw labels


