
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



var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    //.call(zoomer);

let scale = 1;
console.log(scale)


// create a path that is bound to the projection
var path = d3.geoPath()
    .projection(projection);

projection.fitExtent([[20, 20], [920, 440]], arteries);

svg.selectAll("."+ styles.artery)
    .data(arteries.features)
    .enter().append("path")
    .attr("class", styles.artery)
    .attr("d", path)

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

svg.selectAll("."+ styles.freeway)
    .data(freeways.features)
    .enter().append("path")
    .attr("class", styles.freeway)
    .attr("d", path)


window.center = function () {
    console.log(arteries);
    let a = arteries;
 var bounds = path.bounds(arteries),
     currTranslate = projection.translate(),
      dx = bounds[1][0] - bounds[0][0],
      dy = bounds[1][1] - bounds[0][1],
      x = bounds[0][0],
      y = bounds[0][1],
      translate;
    
    translate = [currTranslate[0]- x, currTranslate[1] - y]
  projection
  .translate(translate);
    
    svg.selectAll("."+ styles.artery).attr("d", path)
}
//center();


    function log() {
    var bounds = path.bounds(arteries),
      dx = bounds[1][0] - bounds[0][0],
      dy = bounds[1][1] - bounds[0][1],
      minX = Math.min(bounds[0][0], bounds[1][0]),
      minY = Math.min(bounds[0][1], bounds[1][1]),
      maxX = Math.max(bounds[0][0], bounds[1][0]),
      maxY = Math.max(bounds[0][1], bounds[1][1]);
    
    console.table({
        scale,
        dx,
        dy,
        minX,
        minY,
        maxX,
        maxY,
    })
    }

function zoom(e, addition) {
    console.log(arguments)
    log();
    addition = addition || 10000;
    scale += addition;
    projection.scale(scale)
    
    center();
    svg.selectAll("."+ styles.artery).attr("d", path)
    log();
    console.log(d3.event);
}

function zoomToView() {
    var bounds = path.bounds(arteries),
        currScale = projection.scale(),
        dx = bounds[1][0] - bounds[0][0],
        dy = bounds[1][1] - bounds[0][1];
    
    scale = 0.9 / Math.max(dx / width, dy / height);
    
    log();
    projection.scale(scale);
    
    svg.selectAll("."+ styles.artery).attr("d", path)
    log();
}

Object.assign(window, {
    projection,
    path,
    svg,
    center,
    styles,
    arteries,
    zoom,
        log,
    d3,
    zoomToView
});

//-----------------------------




window.test = projection;




var graticule = d3.geoGraticule();



//svg.append("path")
//    .datum(graticule)
//    .attr("class", styles.graticule)
//    .attr("d", path);
//