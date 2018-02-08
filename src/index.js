
import * as topojson from 'topojson';
import freeways from "$src/maps/freeways.json";
import streets from "$src/maps/streets.json";
import neighborhoods from "$src/maps/neighborhoods.json";
import React from 'react';
import ReactDOM from 'react-dom';
import Map from "$src/Map.jsx";

//'use strict'

var width = 960,
    height = 480;

ReactDOM.render(<Map />, document.getElementById('root'))



// create a path that is bound to the projection
//var path = d3.geoPath()
//    .projection(projection);

//svg.selectAll("."+ styles.artery)
//    .data(arteries.features)
//    .enter().append("path")
//    .attr("class", styles.artery)
//    .attr("d", path)

//svg.selectAll("."+ styles.neighborhood)
//    .data(neighborhoods.features)
//    .enter().append("path")
//    .attr("class", styles.neighborhood)
//    .attr("d", path)

//svg.selectAll("."+ styles.street)
//    .data(streets.features)
//    .enter().append("path")
//    .attr("class", styles.street)
//    .attr("d", path)

//svg.selectAll("."+ styles.freeway)
//    .data(freeways.features)
//    .enter().append("path")
//    .attr("class", styles.freeway)
//    .attr("d", path)



//svg.append("path")
//    .datum(graticule)
//    .attr("class", styles.graticule)
//    .attr("d", path);
//