const dummyData = [
    { language: "Javascript", rating: 100},
    { language: "C++", rating: 73},
    { language: "Python", rating: 100},
    { language: "Solidity", rating: 78},
    { language: "Java", rating: 82},
    { language: "Ruby", rating: 88},
];

// set the margin, width, and height of our charts
const margin = 60;
const width = 1000 - 2 * margin;
const height = 600 - 2 * margin;

// select our svg element and store it as a container
const svg = d3.select('svg')
    .attr('width', 1000)
    .attr('height', 600)
const chart = svg.append('g')
    .attr('transform', `translate(${margin}, ${margin})`);

// set our y-axis
const yScale = d3.scaleLinear()
    .range([height, 0])
    .domain([0, 100]);
chart.append('g')
    .call(d3.axisLeft(yScale));

// set our x-axis
const xScale = d3.scaleBand()
    .range([0, width])
    .domain(dummyData.map((ele) => ele.language))
    .padding(0.2);
chart.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale));

// adding grid lines to our chart
chart.append('g')
    .attr('class', 'grid')
    .call(d3.axisLeft()
        .scale(yScale)
        .tickSize(-width, 0, 0)
        .tickFormat(''))

// create x and y labels to add to our svg
svg.append('text')
    .attr('x', -(height / 2) - margin)
    .attr('y', margin / 2.4)
    .attr('transform', 'rotate(-90)')
    .attr('text-anchor', 'middle')
    .text('Programming Lanugage Ratings (%)')

svg.append('text')
    .attr('x', width / 2 + margin)
    .attr('y', 40)
    .attr('text-anchor', 'middle')
    .text('Personal Ratings of These Languages')

svg.append('text')
    .attr('class', 'label')
    .attr('x', width / 2 + margin)
    .attr('y', height + margin * 1.7)
    .attr('text-anchor', 'middle')
    .text('Languages')

// add our dummydata values to our chart
chart.selectAll()
    .data(dummyData)
    .enter()
    .append('rect')
chart.selectAll("rect")
    .attr('class', 'bar')
    .attr('x', (ele) => xScale(ele.language))
    .attr('y', (ele) => yScale(ele.rating))
    .attr('height', (ele) => height - yScale(ele.rating))
    .attr('width', xScale.bandwidth())
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut);

function handleMouseOver(d, i) {
    console.log(this)
    d3.select(this).style(
        "fill", "#0000f"
    )
}

function handleMouseOut(d, i) {
    d3.select(this).style({
        fill: "black"
    })
}
