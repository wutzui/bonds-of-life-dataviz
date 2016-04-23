$("document").ready(function(){

	/// d3 actionsssss		
    d3.json("../data/relation-viz.json", function(error, json) {
        if (error) throw error;

 	var data = json;

    });


	var cw = 800,
    	ch = 250,
    	radius = Math.min(cw, ch) / 2;

	var color = d3.scale.ordinal()
    			  .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

	var arc = d3.svg.arc()
                .outerRadius(radius - 10)
                .innerRadius(radius - 20);

	var pie = d3.layout.pie()
    		    .sort(null)
    			.value(function (d) {
    				return d.count;
				});

	var svg = d3.select("body").append("svg")
			    .attr("width", cw)
    			.attr("height", ch)
    			.append("g")
    			.attr("transform", "translate(" + cw / 2 + "," + ch / 2 + ")");

    var g = svg.selectAll(".arc")
        	   .data(pie(data))
        	   .enter().append("g")
               .attr("class", "arc");

    g.append("path")
     .attr("d", arc)
     .style("fill", function (d) {
		return color(d.data.name);
     });

    g.append("text")
     .attr("transform", function (d) {
        return "translate(" + arc.centroid(d) + ")";
     })
     .attr("dy", ".35em")
     .style("text-anchor", "middle")
     .text(function (d) {
        return d.data.name;
    });



});