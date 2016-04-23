window.onload = function() {
    'use strict';

    var margin = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50
    },
    width = 860,
    height = 50;

    var x = d3.scale.linear()
              .domain([1990, 2016])
              .range([0, width])
              .clamp(true);

    var brush = d3.svg.brush()
                  .x(x)
                  .extent([0, 0])
                  .on("brush", brushed);

    var svg = d3.select("#year-slider").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
       .attr("class", "x axis")
       .attr("transform", "translate(0," + height / 2 + ")")
       .call(d3.svg.axis()
       .scale(x)
       .orient("bottom")
       .tickFormat(function(d) { return d; })
       .tickSize(0)
       .tickPadding(12))
       .select(".domain")
       .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
       .attr("class", "halo");

    var slider = svg.append("g")
                    .attr("class", "slider")
                    .call(brush);

    slider.selectAll(".extent,.resize")
          .remove();

    slider.select(".background")
          .attr("height", height);

    var handle = slider.append("circle")
                       .attr("class", "handle")
                       .attr("transform", "translate(0," + height / 2 + ")")
                       .attr("r", 9);


    slider.call(brush.event)
          .transition() // gratuitous intro!
          .duration(750)
          .call(brush.extent(1990, 2016])) // set the initial value.
          .call(brush.event);

    function brushed() {
        var value = brush.extent()[0];

        if (d3.event.sourceEvent) { // not a programmatic event
            value = x.invert(d3.mouse(this)[0]);
            brush.extent([value, value]);
        }

        handle.attr("cx", x(value));
        
        force.start();
    }

}