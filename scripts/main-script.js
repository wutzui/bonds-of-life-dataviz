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
            d3.select("h2").html(d.relation); 
            d3.select("h3").html(d.relation); 
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
    



    // set variables. 
    // var firstModal = document.getElementById ('first-modal');
    // var firstModalBtn = document.getElementById ('first-modal-btn');

    // // set a function to open the first modal.
    // function openFirstModal() {
    //     firstModal.style.display ='block';     
    //     firstModalBtn.style.transition ='.35s ease-in-out';
    //     firstModalBtn.style.transform ='rotate(45deg)';
    // }

    // // set the function to close the first modal.
    // function xClose() {
    //     firstModal.style.display ='none';   
    //     firstModalBtn.style.transition ='.35s ease-in-out';     
    //     firstModalBtn.style.transform ='rotate(270deg)';
    // }

    // // set the click toggle modal function.
    // function toggleModal() {
    //     if (firstModal.style.display != 'block') {
    //         openFirstModal();
    //     } else {
    //         xClose();
    //     }
    // }

    // // call the toggleModal function.
    // firstModalBtn.addEventListener ('click', toggleModal, false);

    /******************************************************************************/

});

