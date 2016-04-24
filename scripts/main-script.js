/* jslint browser: true, devel: true, maxlen: 85 */
/* global window */

$("document").ready(function(){

    /******************************************************************************/

    // some colour variables
    var tcBlack = "#130C0E";

    // force variables.
    var w = 1280,
        h = 670,
        maxNodeSize = 50,
        x_browser = 20,
        y_browser = 25,
        root;
 
    var vis;
    var force = d3.layout.force(); 

    vis = d3.select("#vis").append("svg")
                           .attr("width", w)
                           .attr("height", h);


    /******************************************************************************/
    //pie chart variables.

    var cw = 200,
        ch = 200,
        radius = Math.min(cw, ch) / 2;

    var color = d3.scale.ordinal()
                  .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);



    /******************************************************************************/
    //line chart variables and data.

    var lw = 460,
        lh = 200;

    var lineData_phyiscal = [
      {x: 0, y: 200-(5*3)}, {x: 1, y: 200-(6*3)},
      {x: 2, y: 200-(7*3)}, {x: 3, y: 200-(8*3)},
      {x: 4, y: 200-(6*3)}, {x: 5, y: 200-(9*3)},
      {x: 6, y: 200-(9*3)}, {x: 7, y: 200-(9*3)},
      {x: 8, y: 200-(9*3)}, {x: 9, y: 200-(11*3)},
      {x: 10, y: 200-(14*3)}, {x: 11, y: 200-(12*3)},
      {x: 12, y: 200-(13*3)}, {x: 13, y: 200-(16*3)},
      {x: 14, y: 200-(15*3)}, {x: 15, y: 200-(18*3)},
      {x: 16, y: 200-(17*3)}, {x: 17, y: 200-(16*3)},
      {x: 18, y: 200-(29*3)}, {x: 19, y: 200-(24*3)},
      {x: 20, y: 200-(31*3)}, {x: 21, y: 200-(24*3)},
      {x: 22, y: 200-(22*3)}, {x: 23, y: 200-(16*3)},
      {x: 24, y: 200-(14*3)}, {x: 25, y: 200-(16*3)},
      {x: 26, y: 200-(7*3)}
    ];

    var lineData_phone = [
      {x: 6, y: 200-(3*3)}, {x: 7, y: 200-(3*3)},
      {x: 8, y: 200-(3*3)}, {x: 9, y: 200-(3*3)},
      {x: 10, y: 200-(3*3)}, {x: 11, y: 200-(3*3)},
      {x: 12, y: 200-(7*3)}, {x: 13, y: 200-(7*3)},
      {x: 14, y: 200-(7*3)}, {x: 15, y: 200-(7*3)},
      {x: 16, y: 200-(6*3)}, {x: 17, y: 200-(7*3)},
      {x: 18, y: 200-(8*3)}, {x: 19, y: 200-(9*3)},
      {x: 20, y: 200-(9*3)}, {x: 21, y: 200-(8*3)},
      {x: 22, y: 200-(8*3)}, {x: 23, y: 200-(6*3)},
      {x: 24, y: 200-(7*3)}, {x: 25, y: 200-(6*3)},
      {x: 26, y: 200-(5*3)}
    ];

    var lineData_post = [
      {x: 10, y: 200-(2*3)}, {x: 11, y: 200-(2*3)},
      {x: 12, y: 200-(5*3)}, {x: 13, y: 200-(5*3)},
      {x: 14, y: 200-(5*3)}, {x: 15, y: 200-(5*3)},
      {x: 16, y: 200-(7*3)}, {x: 17, y: 200-(3*3)},
      {x: 18, y: 200-(2*3)}, {x: 19, y: 200-(3*3)},
      {x: 20, y: 200-(4*3)}, {x: 21, y: 200-(3*3)},
      {x: 22, y: 200-(3*3)}, {x: 23, y: 200-(9*3)},
      {x: 24, y: 200-(5*3)}, {x: 25, y: 200-(6*3)},
      {x: 26, y: 200-(8*3)}
    ];

    var lineData_email = [
      {x: 18, y: 200-(11*3)}, {x: 19, y: 200-(11*3)},
      {x: 20, y: 200-(13*3)}, {x: 21, y: 200-(13*3)},
      {x: 22, y: 200-(15*3)}, {x: 23, y: 200-(4*3)},
      {x: 24, y: 200-(4*3)}, {x: 25, y: 200-(8*3)},
      {x: 26, y: 200-(6*3)}
    ];

    var lineData_msn = [
                             {x: 13, y: 200-(5*3)},
      {x: 14, y: 200-(5*3)}, {x: 15, y: 200-(8*3)},
      {x: 16, y: 200-(13*3)}, {x: 17, y: 200-(13*3)},
      {x: 18, y: 200-(12*3)}, {x: 19, y: 200-(12*3)},
      {x: 20, y: 200-(9*3)}, {x: 21, y: 200-(9*3)}
    ];

    var lineData_blog = [
                              {x: 15, y: 200-(4*3)},
      {x: 16, y: 200-(10*3)}, {x: 17, y: 200-(10*3)},
      {x: 18, y: 200-(18*3)}, {x: 19, y: 200-(19*3)},
      {x: 20, y: 200-(19*3)}, {x: 21, y: 200-(10*3)},
      {x: 22, y: 200-(2*3)}, {x: 23, y: 200-(2*3)}
    ];

    var lineData_message = [
      {x: 16, y: 200-(3*3)}, {x: 17, y: 200-(3*3)},
      {x: 18, y: 200-(4*3)}, {x: 19, y: 200-(4*3)},
      {x: 20, y: 200-(5*3)}, {x: 21, y: 200-(6*3)},
      {x: 22, y: 200-(10*3)}, {x: 23, y: 200-(18*3)},
      {x: 24, y: 200-(16*3)}, {x: 25, y: 200-(25*3)},
      {x: 26, y: 200-(20*3)}
    ];

    var lineData_facebook = [
                             {x: 19, y: 200-(20*3)},
      {x: 20, y: 200-(27*3)}, {x: 21, y: 200-(30*3)},
      {x: 22, y: 200-(38*3)}, {x: 23, y: 200-(37*3)},
      {x: 24, y: 200-(38*3)}, {x: 25, y: 200-(45*3)},
      {x: 26, y: 200-(47*3)}
    ];

    var svg = d3.select('#line-chart')
    .append('svg')
    .attr({
      'width': lw,
      'height': lh
    });

    var line = d3.svg.line()
      .x(function(d) { return d.x * 18; })
      .y(function(d) { return d.y ; })
      .interpolate('basis');

    svg.append('path')
    .attr('class', 'line-physical')
    .attr({
      'd': line(lineData_phyiscal),
      'y': 0,
      'stroke': '#FFB580',
      'stroke-width': '2px',
      'fill': 'none',
      'opacity': '0.3'
    });

    svg.append('path')
    .attr('class', 'line-phone')
    .attr({
      'd': line(lineData_phone),
      'y': 0,
      'stroke': '#B7BC07',
      'stroke-width': '2px',
      'fill': 'none',
      'opacity': '0.3'
    });  

    svg.append('path')
    .attr('class', 'line-post')
    .attr({
      'd': line(lineData_post),
      'y': 0,
      'stroke': '#C5AF82',
      'stroke-width': '2px',
      'fill': 'none',
      'opacity': '0.3'
    });   

    svg.append('path')
    .attr('class', 'line-email')
    .attr({
      'd': line(lineData_email),
      'y': 0,
      'stroke': '#E86E6E',
      'stroke-width': '2px',
      'fill': 'none',
      'opacity': '0.3'
    });   

    svg.append('path')
    .attr('class', 'line-msn')
    .attr({
      'd': line(lineData_msn),
      'y': 0,
      'stroke': '#54D164',
      'stroke-width': '2px',
      'fill': 'none',
      'opacity': '0.3'
    });   

    svg.append('path')
    .attr('class', 'line-blog')
    .attr({
      'd': line(lineData_blog),
      'y': 0,
      'stroke': '#E3AAD6',
      'stroke-width': '2px',
      'fill': 'none',
      'opacity': '0.3'
    });   

    svg.append('path')
    .attr('class', 'line-message')
    .attr({
      'd': line(lineData_message),
      'y': 0,
      'stroke': '#A4E0D8',
      'stroke-width': '2px',
      'fill': 'none',
      'opacity': '0.3'
    });   

    svg.append('path')
    .attr('class', 'line-facebook')
    .attr({
      'd': line(lineData_facebook),
      'y': 0,
      'stroke': '#6D8BC9',
      'stroke-width': '2px',
      'fill': 'none',
      'opacity': '0.3'
    });   

    // =================================================================================
    // data json
    // =================================================================================
    
    d3.json("data/relation-viz.json", function(error, json) {
        if (error) throw error;

        root = json;
        root.fixed = true;
        root.x = w / 2;
        root.y = h / 2;

        var datapie = json;

        // Build the path
        var defs = vis.insert("svg:defs")
                      .data(["end"]);
 
        defs.enter().append("svg:path") 
            .attr("d", "M2,-210,0L2,200");  //path code.
 
        update();
    });

 
    // =================================================================================
    // update
    // =================================================================================

    function update() {
        

        /******************************************************************************/
        //draw: force layout.

        var nodes = flatten(root),
            links = d3.layout.tree().links(nodes);
 
        // Restart the force layout.
        force.nodes(nodes)
             .links(links)
             .gravity(0.01)
             .charge(-3000)
             .linkDistance(40)
             .friction(0.4)
             .linkStrength(function(l, i) { return 1; })
             .size([w, h])
             .on("tick", tick)
             .start();
 
        var path = vis.selectAll("path.link")
                      .data(links, function(d) { return d.target.id; });
 
        path.enter().insert("svg:path")
            .attr("class", "link")
            // .attr("marker-end", "url(#end)")
            .style("stroke", "#eee"); //stroke color

 
        // Exit any old paths.
        path.exit().remove();
 
        // Update the nodes…
        var node = vis.selectAll("g.node")
                      .data(nodes, function(d) { return d.id; });
 
        // Enter any new nodes.
        var nodeEnter = node.enter().append("svg:g")
                                    .attr("class", "node")
                                    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
                                    // .on("click", click)
                                    .call(force.drag);

        // Append a circle
        nodeEnter.append("svg:circle")
                 .attr("r", 35)
                 .style("fill", "none");
                 
        // Append images
        var images = nodeEnter.append("svg:image")
        .attr("xlink:href",  function(d) { return d.img;})
        .attr("x", function(d) { return -25;})
        .attr("y", function(d) { return -25;})
        .attr("height", 50)
        .attr("width", 50);
                

        // attach a circle
        var circle = nodeEnter.append("svg:circle")
                              .attr("r", 25)             // set the radius
                              .style("stroke", "transparent")    // set the line colour
                              .style("stroke-width", "6")
                              .style("fill", "none");    // set the fill colour 
  

        // /******************************************************************************/
        // //draw: pie chart. 

        // var arc = d3.svg.arc()
        //                 .outerRadius(radius - 10)
        //                 .innerRadius(radius - 20);

        // var pie = d3.layout.pie()
        //             .sort(null)
        //             .value(function (d) {
        //                 return d.count;
        //             });

        // var svg = d3.select("#pie-chart").append("svg")
        //             .attr("width", cw)
        //             .attr("height", ch)
        //             .append("g")
        //             .attr("transform", "translate(" + cw / 2 + "," + ch / 2 + ")");

        // var g = svg.selectAll(".arc")
        //            .data(pie(datapie))
        //            .enter().append("g")
        //            .attr("class", "arc");

        // g.append("path")
        //  .attr("d", arc)
        //  .style("fill", function (d) {
        //     return color(d.datapie.name);
        //  });

        // // g.append("text")
        // //  .attr("transform", function (d) {
        // //     return "translate(" + arc.centroid(d) + ")";
        // //  })
        // //  .attr("dy", ".35em")
        // //  .style("text-anchor", "middle")
        // //  .text(function (d) {
        // //     return d.data.crimeType;
        // // });

        /******************************************************************************/
        // make the image grow a little on mouse over and add the text details on click
        var setEvents = images
        
        // Append hero text
        .on( 'click', function (d) {
            d3.select("#name").text(d.name); 
            d3.select("#relation").html(d.relation); 
            d3.select("#description").html(d.description); 
        })

        .on( 'mouseenter', function() {
            // select element in current context
            d3.select(this)
              .transition()
              .attr("x", function(d) { return -60;})
              .attr("y", function(d) { return -60;})
              .attr("height", 100)
              .attr("width", 100);
        })
        
        // set back
        .on( 'mouseleave', function() {
            d3.select(this)
              .transition()
              .attr("x", function(d) { return -25;})
              .attr("y", function(d) { return -25;})
              .attr("height", 50)
              .attr("width", 50);
        });

        // Append hero name on roll over next to the node as well
        nodeEnter.append("text")
                 .attr("class", "nodetext")
                 .attr("x", x_browser +30)
                 .attr("y", y_browser -20)
                 .attr("fill", tcBlack)
                 .text(function(d) { return d.relation; 
                 });
        

        // Exit any old nodes.
        node.exit().remove();

        // Re-select for update.
        path = vis.selectAll("path.link");
        node = vis.selectAll("g.node");
 
        function tick() {
 
            path.attr("d", function(d) {
 
                var dx = d.target.x - d.source.x,
                    dy = d.target.y - d.source.y,
                    dr = Math.sqrt(dx * dx + dy * dy);
                    return  "M" + d.source.x + "," 
                    + d.source.y + "A" + dr + "," 
                    + dr + " 0 0,1 " + d.target.x + "," 
                    + d.target.y;
            });
    
            node.attr("transform", nodeTransform);    
        }

        /******************************************************************************/
        //before slider: buttons actions.

                var sliderCircle = d3.selectAll("circle");
                var sliderImage = d3.selectAll("image");  

                $("#physical-btn").mouseover(function(){

                        sliderCircle
                        .transition()
                        .attr("cx", function(d) { return -5;})
                        .attr("cy", function(d) { return -5;})
                        .style("stroke", "#FFB580")
                        .style("opacity", "0.7")
                        .attr("r", 35);
                        sliderImage 
                        .transition()
                        .attr("x", function(d) { return -40;})
                        .attr("y", function(d) { return -40;})
                        .attr("height", 70)
                        .attr("width", 70);
                        
                            sliderCircle
                            .filter(function(d) {return d.physical_2016 !== 1;})
                            .transition()
                            .attr("cx", function(d) { return 0;})
                            .attr("cy", function(d) { return 0;})
                            .style("fill", "none")
                            .style( "stroke", "transparent")
                            .style("opacity", "1")
                            .attr("r", 25);  
                            sliderImage 
                            .filter(function(d) {return d.physical_2016 !== 1;})
                            .transition()
                            .attr("x", function(d) { return -25;})
                            .attr("y", function(d) { return -25;})
                            .attr("height", 50)
                            .attr("width", 50)
                            .style("opacity", "0.3");

                          d3.select('.line-physical')
                            .style("opacity", "1");
                })

                $("#physical-btn").mouseout(function(){

                          sliderCircle
                          .transition()
                          .attr("cx", function(d) { return 0;})
                          .attr("cy", function(d) { return 0;})
                          .style("fill", "none")
                          .style( "stroke", "transparent")
                          .style("opacity", "1")
                          .attr("r", 25);  
                          sliderImage 
                          .transition()
                          .attr("x", function(d) { return -25;})
                          .attr("y", function(d) { return -25;})
                          .attr("height", 50)
                          .attr("width", 50)
                          .style("opacity", "1");

                          d3.select('.line-physical')
                            .style("opacity", "0.3");
                }) 


                $("#phone-btn").mouseover(function(){
                    
                        sliderCircle
                        .transition()
                        .attr("cx", function(d) { return -5;})
                        .attr("cy", function(d) { return -5;})
                        .style("stroke", "#B7BC07")
                        .style("opacity", "0.7")
                        .attr("r", 35);
                        sliderImage 
                        .transition()
                        .attr("x", function(d) { return -40;})
                        .attr("y", function(d) { return -40;})
                        .attr("height", 70)
                        .attr("width", 70);
                        
                            sliderCircle
                            .filter(function(d) {return d.phone_2016 !== 1;})
                            .transition()
                            .attr("cx", function(d) { return 0;})
                            .attr("cy", function(d) { return 0;})
                            .style( "stroke", "transparent") 
                            .style("opacity", "1")
                            .attr("r", 25);  
                            sliderImage 
                            .filter(function(d) {return d.phone_2016 !== 1;})
                            .transition()
                            .attr("x", function(d) { return -25;})
                            .attr("y", function(d) { return -25;})
                            .attr("height", 50)
                            .attr("width", 50)
                            .style("opacity", "0.3");  
                          
                          d3.select('.line-phone')
                            .style("opacity", "1");                                                          
                })

                $("#phone-btn").mouseout(function(){

                          sliderCircle
                          .transition()
                          .attr("cx", function(d) { return 0;})
                          .attr("cy", function(d) { return 0;})
                          .style( "stroke", "transparent")
                          .style("opacity", "1")
                          .attr("r", 25);  
                          sliderImage 
                          .transition()
                          .attr("x", function(d) { return -25;})
                          .attr("y", function(d) { return -25;})
                          .attr("height", 50)
                          .attr("width", 50)
                          .style("opacity", "1");

                          d3.select('.line-phone')
                            .style("opacity", "0.3");    
                }) 

                $("#post-btn").mouseover(function(){

                        sliderCircle
                        .transition()
                        .attr("cx", function(d) { return -5;})
                        .attr("cy", function(d) { return -5;})
                        .style("stroke", "#C5AF82")
                        .style( "opacity", "0.7") 
                        .attr("r", 35);
                        sliderImage 
                        .transition()
                        .attr("x", function(d) { return -40;})
                        .attr("y", function(d) { return -40;})
                        .attr("height", 70)
                        .attr("width", 70);
                        
                            sliderCircle
                            .filter(function(d) {return d.post_2016 !== 1;})
                            .transition()
                            .attr("cx", function(d) { return 0;})
                            .attr("cy", function(d) { return 0;})
                            .style( "stroke", "transparent")
                            .style( "opacity", "1")  
                            .attr("r", 25);  
                            sliderImage 
                            .filter(function(d) {return d.post_2016 !== 1;})
                            .transition()
                            .attr("x", function(d) { return -25;})
                            .attr("y", function(d) { return -25;})
                            .attr("height", 50)
                            .attr("width", 50)
                            .style("opacity", "0.3");                            

                          d3.select('.line-post')
                            .style("opacity", "1");
                })

                $("#post-btn").mouseout(function(){

                          sliderCircle
                          .transition()
                          .attr("cx", function(d) { return 0;})
                          .attr("cy", function(d) { return 0;})
                          .style( "stroke", "transparent")
                          .style( "opacity", "1")  
                          .attr("r", 25);  
                          sliderImage 
                          .transition()
                          .attr("x", function(d) { return -25;})
                          .attr("y", function(d) { return -25;})
                          .attr("height", 50)
                          .attr("width", 50)
                          .style("opacity", "1");

                          d3.select('.line-post')
                            .style("opacity", "0.3");
                }) 

                $("#email-btn").mouseover(function(){

                        sliderCircle
                        .transition()
                        .attr("cx", function(d) { return -5;})
                        .attr("cy", function(d) { return -5;})
                        .style("stroke", "#E86E6E")
                        .style( "opacity", "0.7") 
                        .attr("r", 35);
                        sliderImage 
                        .transition()
                        .attr("x", function(d) { return -40;})
                        .attr("y", function(d) { return -40;})
                        .attr("height", 70)
                        .attr("width", 70);
                        
                            sliderCircle
                            .filter(function(d) {return d.email_2016 !== 1;})
                            .transition()
                            .attr("cx", function(d) { return 0;})
                            .attr("cy", function(d) { return 0;})
                            .style( "stroke", "transparent") 
                            .style( "opacity", "1") 
                            .attr("r", 25);  
                            sliderImage 
                            .filter(function(d) {return d.email_2016 !== 1;})
                            .transition()
                            .attr("x", function(d) { return -25;})
                            .attr("y", function(d) { return -25;})
                            .attr("height", 50)
                            .attr("width", 50)
                            .style("opacity", "0.3");  
                          
                          d3.select('.line-email')
                            .style("opacity", "1");                         
                })

                $("#email-btn").mouseout(function(){

                          sliderCircle
                          .transition()
                          .attr("cx", function(d) { return 0;})
                          .attr("cy", function(d) { return 0;})
                          .style( "stroke", "transparent") 
                          .style( "opacity", "1") 
                          .attr("r", 25);  
                          sliderImage 
                          .transition()
                          .attr("x", function(d) { return -25;})
                          .attr("y", function(d) { return -25;})
                          .attr("height", 50)
                          .attr("width", 50)
                          .style("opacity", "1");

                          d3.select('.line-email')
                            .style("opacity", "0.3");  
                }) 

                $("#msn-btn").mouseover(function(){

                        sliderCircle
                        .transition()
                        .attr("cx", function(d) { return -5;})
                        .attr("cy", function(d) { return -5;})
                        .style("stroke", "#54D164")
                        .style("opacity", 0.7)
                        .attr("r", 35);
                        sliderImage 
                        .transition()
                        .attr("x", function(d) { return -40;})
                        .attr("y", function(d) { return -40;})
                        .attr("height", 70)
                        .attr("width", 70);
                        
                            sliderCircle
                            .filter(function(d) {return d.msn_2016 !== 1;})
                            .transition()
                            .attr("cx", function(d) { return 0;})
                            .attr("cy", function(d) { return 0;})
                            .style( "stroke", "transparent")
                            .style("opacity", 1)
                            .attr("r", 25);  
                            sliderImage 
                            .filter(function(d) {return d.msn_2016 !== 1;})
                            .transition()
                            .attr("x", function(d) { return -25;})
                            .attr("y", function(d) { return -25;})
                            .attr("height", 50)
                            .attr("width", 50)
                            .style("opacity", "0.3");
                          
                          d3.select('.line-msn')
                            .style("opacity", "1");
                })

                $("#msn-btn").mouseout(function(){

                          sliderCircle
                          .transition()
                          .attr("cx", function(d) { return 0;})
                          .attr("cy", function(d) { return 0;})
                          .style( "stroke", "transparent")
                          .style("opacity", 1)
                          .attr("r", 25);  
                          sliderImage 
                          .transition()
                          .attr("x", function(d) { return -25;})
                          .attr("y", function(d) { return -25;})
                          .attr("height", 50)
                          .attr("width", 50)
                          .style("opacity", "1");
                          
                          d3.select('.line-msn')
                            .style("opacity", "0.3");
                })

                $("#blog-btn").mouseover(function(){

                        sliderCircle
                        .transition()
                        .attr("cx", function(d) { return -5;})
                        .attr("cy", function(d) { return -5;})
                        .style("stroke", "#E3AAD6")
                        .style("opacity", 0.7)
                        .attr("r", 35);
                        sliderImage 
                        .transition()
                        .attr("x", function(d) { return -40;})
                        .attr("y", function(d) { return -40;})
                        .attr("height", 70)
                        .attr("width", 70);
                        
                            sliderCircle
                            .filter(function(d) {return d.blog_2016 !== 1;})
                            .transition()
                            .attr("cx", function(d) { return 0;})
                            .attr("cy", function(d) { return 0;})
                            .style( "stroke", "transparent")
                            .style("opacity", 1)
                            .attr("r", 25);  
                            sliderImage 
                            .filter(function(d) {return d.blog_2016 !== 1;})
                            .transition()
                            .attr("x", function(d) { return -25;})
                            .attr("y", function(d) { return -25;})
                            .attr("height", 50)
                            .attr("width", 50)
                            .style("opacity", "0.3");

                          d3.select('.line-blog')
                            .style("opacity", "1");
                })

                $("#blog-btn").mouseout(function(){

                          sliderCircle
                          .transition()
                          .attr("cx", function(d) { return 0;})
                          .attr("cy", function(d) { return 0;})
                          .style( "stroke", "transparent")
                          .style("opacity", 1)
                          .attr("r", 25);  
                          sliderImage 
                          .transition()
                          .attr("x", function(d) { return -25;})
                          .attr("y", function(d) { return -25;})
                          .attr("height", 50)
                          .attr("width", 50)
                          .style("opacity", "1");

                          d3.select('.line-blog')
                            .style("opacity", "0.3");
                }) 

                $("#message-btn").mouseover(function(){

                        sliderCircle
                        .transition()
                        .attr("cx", function(d) { return -5;})
                        .attr("cy", function(d) { return -5;})
                        .style("stroke", "#A4E0D8")
                        .style("opacity", "0.7")
                        .attr("r", 35);
                        sliderImage 
                        .transition()
                        .attr("x", function(d) { return -40;})
                        .attr("y", function(d) { return -40;})
                        .attr("height", 70)
                        .attr("width", 70);
                        
                            sliderCircle
                            .filter(function(d) {return d.message_2016 !== 1;})
                            .transition()
                            .attr("cx", function(d) { return 0;})
                            .attr("cy", function(d) { return 0;})
                            .style( "stroke", "transparent") 
                            .style("opacity", "1")
                            .attr("r", 25);  
                            sliderImage 
                            .filter(function(d) {return d.message_2016 !== 1;})
                            .transition()
                            .attr("x", function(d) { return -25;})
                            .attr("y", function(d) { return -25;})
                            .attr("height", 50)
                            .attr("width", 50)
                            .style("opacity", "0.3"); 

                          d3.select('.line-message')
                            .style("opacity", "1");                             
                })

                $("#message-btn").mouseout(function(){

                          sliderCircle
                          .transition()
                          .attr("cx", function(d) { return 0;})
                          .attr("cy", function(d) { return 0;})
                          .style( "stroke", "transparent") 
                          .style("opacity", "1")
                          .attr("r", 25);  
                          sliderImage 
                          .transition()
                          .attr("x", function(d) { return -25;})
                          .attr("y", function(d) { return -25;})
                          .attr("height", 50)
                          .attr("width", 50)
                          .style("opacity", "1");

                          d3.select('.line-message')
                            .style("opacity", "0.3");        
                }) 

                $("#facebook-btn").mouseover(function(){

                        sliderCircle
                        .transition()
                        .attr("cx", function(d) { return -5;})
                        .attr("cy", function(d) { return -5;})
                        .style("stroke", "#6D8BC9")
                        .style("opacity", "0.7")
                        .attr("r", 35);
                        sliderImage 
                        .transition()
                        .attr("x", function(d) { return -40;})
                        .attr("y", function(d) { return -40;})
                        .attr("height", 70)
                        .attr("width", 70);
                        
                            sliderCircle
                            .filter(function(d) {return d.facebook_2016 !== 1;})
                            .transition()
                            .attr("cx", function(d) { return 0;})
                            .attr("cy", function(d) { return 0;})
                            .style("stroke", "transparent")
                            .style("opacity", "1")
                            .attr("r", 25);  
                            sliderImage 
                            .filter(function(d) {return d.facebook_2016 !== 1;})
                            .transition()
                            .attr("x", function(d) { return -25;})
                            .attr("y", function(d) { return -25;})
                            .attr("height", 50)
                            .attr("width", 50)
                            .style("opacity", "0.3");

                          d3.select('.line-facebook')
                            .style("opacity", "1");    
                })

                $("#facebook-btn").mouseout(function(){

                          sliderCircle
                          .transition()
                          .attr("cx", function(d) { return 0;})
                          .attr("cy", function(d) { return 0;})
                          .style( "stroke", "transparent")
                          .style("opacity", "1")
                          .attr("r", 25);  
                          sliderImage 
                          .transition()
                          .attr("x", function(d) { return -25;})
                          .attr("y", function(d) { return -25;})
                          .attr("height", 50)
                          .attr("width", 50)
                          .style("opacity", "1");

                          d3.select('.line-facebook')
                            .style("opacity", "0.3");    
                }) 


        /******************************************************************************/
        // slider!!
        $("#year-slider").slider({ 
            value: 2016,
            min: 1990,
            max: 2016,
            step:1,
            slide: function(event, ui){
                // console.log(ui.value);
                if(ui.value) {
                    d3.selectAll('g.node')
                      .filter(function(d) { return d.start >= ui.value;})
                      .transition()
                      .style('opacity', '0')
                      .style('display', 'none');
                    vis.selectAll("path.link")
                       .filter(function(d) { return d.target.start >= ui.value;})
                       .transition()
                       .style('opacity', '0')
                       .style('display', 'none');
                    
                    d3.selectAll('g.node')
                      .filter(function(d) { return d.start <= ui.value;})
                      .transition()
                      .style('opacity', '1')
                      .style('display', 'block');
                    vis.selectAll("path.link")
                       .filter(function(d) { return d.target.start <= ui.value;})
                       .transition()
                       .style('opacity', '1')
                       .style('display', 'block');
                }

                var sliderCircle = d3.selectAll("circle");
                var sliderImage = d3.selectAll("image");  

                $("#physical-btn").mouseover(function(){

                    if(ui.value) {
                        sliderCircle
                        .transition()
                        .attr("cx", function(d) { return -5;})
                        .attr("cy", function(d) { return -5;})
                        .style("stroke", "#FFB580")
                        .style("opacity", "0.7")
                        .attr("r", 35);
                        sliderImage 
                        .transition()
                        .attr("x", function(d) { return -40;})
                        .attr("y", function(d) { return -40;})
                        .attr("height", 70)
                        .attr("width", 70);
                        
                        
                        // if(ui.value == 1993) {
                            sliderCircle
                            .filter(function(d) {return d["physical_"+ui.value] !== 1;})
                            .transition()
                            .attr("cx", function(d) { return 0;})
                            .attr("cy", function(d) { return 0;})
                            .style("fill", "none")
                            .style( "stroke", "transparent")
                            .style("opacity", "1")
                            .attr("r", 25);  
                            sliderImage 
                            .filter(function(d) {return d["physical_"+ui.value] !== 1;})
                            .transition()
                            .attr("x", function(d) { return -25;})
                            .attr("y", function(d) { return -25;})
                            .attr("height", 50)
                            .attr("width", 50)
                            .style("opacity", "0.3");
                            
                        // }
                       
                    }
                })

                $("#physical-btn").mouseout(function(){

                    if(ui.value) {
                          sliderCircle
                          .transition()
                          .attr("cx", function(d) { return 0;})
                          .attr("cy", function(d) { return 0;})
                          .style("fill", "none")
                          .style( "stroke", "transparent")
                          .style("opacity", "1")
                          .attr("r", 25);  
                          sliderImage 
                          .transition()
                          .attr("x", function(d) { return -25;})
                          .attr("y", function(d) { return -25;})
                          .attr("height", 50)
                          .attr("width", 50)
                          .style("opacity", "1");

                    } 
                }) 

                $("#phone-btn").mouseover(function(){
                    if(ui.value) {
                        sliderCircle
                        .transition()
                        .attr("cx", function(d) { return -5;})
                        .attr("cy", function(d) { return -5;})
                        .style("stroke", "#B7BC07")
                        .style("opacity", "0.7")
                        .attr("r", 35);
                        sliderImage 
                        .transition()
                        .attr("x", function(d) { return -40;})
                        .attr("y", function(d) { return -40;})
                        .attr("height", 70)
                        .attr("width", 70);
                        
                            sliderCircle
                            .filter(function(d) {return d["phone_"+ui.value] !== 1;})
                            .transition()
                            .attr("cx", function(d) { return 0;})
                            .attr("cy", function(d) { return 0;})
                            .style( "stroke", "transparent") 
                            .style("opacity", "1")
                            .attr("r", 25);  
                            sliderImage 
                            .filter(function(d) {return d["phone_"+ui.value] !== 1;})
                            .transition()
                            .attr("x", function(d) { return -25;})
                            .attr("y", function(d) { return -25;})
                            .attr("height", 50)
                            .attr("width", 50)
                            .style("opacity", "0.3");                                
                    }
                })

                $("#phone-btn").mouseout(function(){

                    if(ui.value) {
                          sliderCircle
                          .transition()
                          .attr("cx", function(d) { return 0;})
                          .attr("cy", function(d) { return 0;})
                          .style( "stroke", "transparent")
                          .style("opacity", "1")
                          .attr("r", 25);  
                          sliderImage 
                          .transition()
                          .attr("x", function(d) { return -25;})
                          .attr("y", function(d) { return -25;})
                          .attr("height", 50)
                          .attr("width", 50)
                          .style("opacity", "1");
                    } 
                }) 

                $("#post-btn").mouseover(function(){
                    if(ui.value) {
                        sliderCircle
                        .transition()
                        .attr("cx", function(d) { return -5;})
                        .attr("cy", function(d) { return -5;})
                        .style("stroke", "#C5AF82")
                        .style( "opacity", "0.7") 
                        .attr("r", 35);
                        sliderImage 
                        .transition()
                        .attr("x", function(d) { return -40;})
                        .attr("y", function(d) { return -40;})
                        .attr("height", 70)
                        .attr("width", 70);
                        
                            sliderCircle
                            .filter(function(d) {return d["post_"+ui.value] !== 1;})
                            .transition()
                            .attr("cx", function(d) { return 0;})
                            .attr("cy", function(d) { return 0;})
                            .style( "stroke", "transparent")
                            .style( "opacity", "1")  
                            .attr("r", 25);  
                            sliderImage 
                            .filter(function(d) {return d["post_"+ui.value] !== 1;})
                            .transition()
                            .attr("x", function(d) { return -25;})
                            .attr("y", function(d) { return -25;})
                            .attr("height", 50)
                            .attr("width", 50)
                            .style("opacity", "0.3");                            
                    }
                })

                $("#post-btn").mouseout(function(){

                    if(ui.value) {
                          sliderCircle
                          .transition()
                          .attr("cx", function(d) { return 0;})
                          .attr("cy", function(d) { return 0;})
                          .style( "stroke", "transparent")
                          .style( "opacity", "1")  
                          .attr("r", 25);  
                          sliderImage 
                          .transition()
                          .attr("x", function(d) { return -25;})
                          .attr("y", function(d) { return -25;})
                          .attr("height", 50)
                          .attr("width", 50)
                          .style("opacity", "1");
                    } 
                }) 

                $("#email-btn").mouseover(function(){
                    if(ui.value) {
                        sliderCircle
                        .transition()
                        .attr("cx", function(d) { return -5;})
                        .attr("cy", function(d) { return -5;})
                        .style("stroke", "#E86E6E")
                        .style( "opacity", "0.7") 
                        .attr("r", 35);
                        sliderImage 
                        .transition()
                        .attr("x", function(d) { return -40;})
                        .attr("y", function(d) { return -40;})
                        .attr("height", 70)
                        .attr("width", 70);
                        
                            sliderCircle
                            .filter(function(d) {return d["email_"+ui.value] !== 1;})
                            .transition()
                            .attr("cx", function(d) { return 0;})
                            .attr("cy", function(d) { return 0;})
                            .style( "stroke", "transparent") 
                            .style( "opacity", "1") 
                            .attr("r", 25);  
                            sliderImage 
                            .filter(function(d) {return d["email_"+ui.value] !== 1;})
                            .transition()
                            .attr("x", function(d) { return -25;})
                            .attr("y", function(d) { return -25;})
                            .attr("height", 50)
                            .attr("width", 50)
                            .style("opacity", "0.3");                            
                    }
                })

                $("#email-btn").mouseout(function(){

                    if(ui.value) {
                          sliderCircle
                          .transition()
                          .attr("cx", function(d) { return 0;})
                          .attr("cy", function(d) { return 0;})
                          .style( "stroke", "transparent") 
                          .style( "opacity", "1") 
                          .attr("r", 25);  
                          sliderImage 
                          .transition()
                          .attr("x", function(d) { return -25;})
                          .attr("y", function(d) { return -25;})
                          .attr("height", 50)
                          .attr("width", 50)
                          .style("opacity", "1");
                    } 
                }) 

                $("#msn-btn").mouseover(function(){
                    if(ui.value) {
                        sliderCircle
                        .transition()
                        .attr("cx", function(d) { return -5;})
                        .attr("cy", function(d) { return -5;})
                        .style("stroke", "#54D164")
                        .style("opacity", 0.7)
                        .attr("r", 35);
                        sliderImage 
                        .transition()
                        .attr("x", function(d) { return -40;})
                        .attr("y", function(d) { return -40;})
                        .attr("height", 70)
                        .attr("width", 70);
                        
                            sliderCircle
                            .filter(function(d) {return d["msn_"+ui.value] !== 1;})
                            .transition()
                            .attr("cx", function(d) { return 0;})
                            .attr("cy", function(d) { return 0;})
                            .style( "stroke", "transparent")
                            .style("opacity", 1)
                            .attr("r", 25);  
                            sliderImage 
                            .filter(function(d) {return d["msn_"+ui.value] !== 1;})
                            .transition()
                            .attr("x", function(d) { return -25;})
                            .attr("y", function(d) { return -25;})
                            .attr("height", 50)
                            .attr("width", 50)
                            .style("opacity", "0.3");                            
                    }
                })

                $("#msn-btn").mouseout(function(){

                    if(ui.value) {
                          sliderCircle
                          .transition()
                          .attr("cx", function(d) { return 0;})
                          .attr("cy", function(d) { return 0;})
                          .style( "stroke", "transparent")
                          .style("opacity", 1)
                          .attr("r", 25);  
                          sliderImage 
                          .transition()
                          .attr("x", function(d) { return -25;})
                          .attr("y", function(d) { return -25;})
                          .attr("height", 50)
                          .attr("width", 50)
                          .style("opacity", "1");
                    } 
                })

                $("#blog-btn").mouseover(function(){
                    if(ui.value) {
                        sliderCircle
                        .transition()
                        .attr("cx", function(d) { return -5;})
                        .attr("cy", function(d) { return -5;})
                        .style("stroke", "#E3AAD6")
                        .style("opacity", 0.7)
                        .attr("r", 35);
                        sliderImage 
                        .transition()
                        .attr("x", function(d) { return -40;})
                        .attr("y", function(d) { return -40;})
                        .attr("height", 70)
                        .attr("width", 70);
                        
                            sliderCircle
                            .filter(function(d) {return d["blog_"+ui.value] !== 1;})
                            .transition()
                            .attr("cx", function(d) { return 0;})
                            .attr("cy", function(d) { return 0;})
                            .style( "stroke", "transparent")
                            .style("opacity", 1)
                            .attr("r", 25);  
                            sliderImage 
                            .filter(function(d) {return d["blog_"+ui.value] !== 1;})
                            .transition()
                            .attr("x", function(d) { return -25;})
                            .attr("y", function(d) { return -25;})
                            .attr("height", 50)
                            .attr("width", 50)
                            .style("opacity", "0.3");                            
                    }
                })

                $("#blog-btn").mouseout(function(){

                    if(ui.value) {
                          sliderCircle
                          .transition()
                          .attr("cx", function(d) { return 0;})
                          .attr("cy", function(d) { return 0;})
                          .style( "stroke", "transparent")
                          .style("opacity", 1)
                          .attr("r", 25);  
                          sliderImage 
                          .transition()
                          .attr("x", function(d) { return -25;})
                          .attr("y", function(d) { return -25;})
                          .attr("height", 50)
                          .attr("width", 50)
                          .style("opacity", "1");
                    } 
                }) 

                $("#message-btn").mouseover(function(){
                    if(ui.value) {
                        sliderCircle
                        .transition()
                        .attr("cx", function(d) { return -5;})
                        .attr("cy", function(d) { return -5;})
                        .style("stroke", "#A4E0D8")
                        .style("opacity", "0.7")
                        .attr("r", 35);
                        sliderImage 
                        .transition()
                        .attr("x", function(d) { return -40;})
                        .attr("y", function(d) { return -40;})
                        .attr("height", 70)
                        .attr("width", 70);
                        
                            sliderCircle
                            .filter(function(d) {return d["message_"+ui.value] !== 1;})
                            .transition()
                            .attr("cx", function(d) { return 0;})
                            .attr("cy", function(d) { return 0;})
                            .style( "stroke", "transparent") 
                            .style("opacity", "1")
                            .attr("r", 25);  
                            sliderImage 
                            .filter(function(d) {return d["message_"+ui.value] !== 1;})
                            .transition()
                            .attr("x", function(d) { return -25;})
                            .attr("y", function(d) { return -25;})
                            .attr("height", 50)
                            .attr("width", 50)
                            .style("opacity", "0.3");                                
                    }
                })

                $("#message-btn").mouseout(function(){

                    if(ui.value) {
                          sliderCircle
                          .transition()
                          .attr("cx", function(d) { return 0;})
                          .attr("cy", function(d) { return 0;})
                          .style( "stroke", "transparent") 
                          .style("opacity", "1")
                          .attr("r", 25);  
                          sliderImage 
                          .transition()
                          .attr("x", function(d) { return -25;})
                          .attr("y", function(d) { return -25;})
                          .attr("height", 50)
                          .attr("width", 50)
                          .style("opacity", "1");
                    } 
                }) 

                $("#facebook-btn").mouseover(function(){
                    if(ui.value) {
                        sliderCircle
                        .transition()
                        .attr("cx", function(d) { return -5;})
                        .attr("cy", function(d) { return -5;})
                        .style("stroke", "#6D8BC9")
                        .style("opacity", "0.7")
                        .attr("r", 35);
                        sliderImage 
                        .transition()
                        .attr("x", function(d) { return -40;})
                        .attr("y", function(d) { return -40;})
                        .attr("height", 70)
                        .attr("width", 70);
                        
                            sliderCircle
                            .filter(function(d) {return d["facebook_"+ui.value] !== 1;})
                            .transition()
                            .attr("cx", function(d) { return 0;})
                            .attr("cy", function(d) { return 0;})
                            .style("stroke", "transparent")
                            .style("opacity", "1")
                            .attr("r", 25);  
                            sliderImage 
                            .filter(function(d) {return d["facebook_"+ui.value] !== 1;})
                            .transition()
                            .attr("x", function(d) { return -25;})
                            .attr("y", function(d) { return -25;})
                            .attr("height", 50)
                            .attr("width", 50)
                            .style("opacity", "0.3");                              
                    }
                })

                $("#facebook-btn").mouseout(function(){

                    if(ui.value) {
                          sliderCircle
                          .transition()
                          .attr("cx", function(d) { return 0;})
                          .attr("cy", function(d) { return 0;})
                          .style( "stroke", "transparent")
                          .style("opacity", "1")
                          .attr("r", 25);  
                          sliderImage 
                          .transition()
                          .attr("x", function(d) { return -25;})
                          .attr("y", function(d) { return -25;})
                          .attr("height", 50)
                          .attr("width", 50)
                          .style("opacity", "1");
                    } 
                }) 

                // $sliderValue = $("#year-slider").slider("value");
                $("#show-year").text("year " + ui.value);
            }


        }); // End of slider


                
    }// End of update()


    /******************************************************************************/
    
    function nodeTransform(d) {
        d.x = Math.max(maxNodeSize, Math.min(w - (d.imgwidth/2 || 16), d.x));
        d.y = Math.max(maxNodeSize, Math.min(h - (d.imgheight/2 || 16), d.y));
        return "translate(" + d.x + "," + d.y + ")";
    }
 
    function flatten(root) {
        var nodes = []; 
        var i = 0;
 
        function recurse(node) {
            if (node.children) 
                node.children.forEach(recurse);
            if (!node.id) 
                node.id = ++i;
            nodes.push(node);
        }
 
        recurse(root);
        return nodes;

    } 
    

    /******************************************************************************/

    // set variables. 
    var firstModal = document.getElementById ('about-modal');
    var firstModalBtn = document.getElementById('about-btn');
    var closeBtn = document.getElementById('close-btn');

    // set a function to open the first modal.
    function openFirstModal() {
        firstModal.style.opacity ='1';
        firstModal.style.zIndex = '10';   
        firstModalBtn.style.transition ='.35s ease-in-out';   
    }

    // set the function to close the first modal.
    function xClose() {
        firstModal.style.opacity ='0';
        firstModal.style.zIndex = '-10';
        firstModalBtn.style.transition ='.35s ease-in-out';  
    }

    // set the click toggle modal function.
    function toggleModal() {
        if (firstModal.style.zIndex !== '10') {
            openFirstModal();
        } else {
            xClose();
        }
    }

    // call the toggleModal function.
    firstModalBtn.addEventListener ('click', toggleModal, false);
    closeBtn.addEventListener ('click', xClose, false);

    /******************************************************************************/

});

