import * as d3 from 'd3';
import * as topojson from 'topojson';
import * as styles from "$src/styles/main.scss";
import arteries from "$src/maps/arteries.json";
//'use strict'

console.log(arteries);

var width = 960,
    height = 480;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .on("onScroll", function(d) {
    console.log(arguments)
});;

let scale = 1;
console.log(scale)
// create a projection
var projection = d3.geoEquirectangular()
//var projection = d3.geoMercator()
    //.scale(scale)
    //.translate([width / 2 + 600, height / 2 + 200]);


// create a path that is bound to the projection
var path = d3.geoPath()
    .projection(projection);

svg.selectAll("."+ styles.artery)
    .data(arteries.features)
    .enter().append("path")
    .attr("class", styles.artery)
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

function zoom(addition) {
    log();
    addition = addition || 1;
    scale += addition;
    projection.scale(scale)
    
    
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
});

//-----------------------------




window.test = projection;




var graticule = d3.geoGraticule();



//svg.append("path")
//    .datum(graticule)
//    .attr("class", styles.graticule)
//    .attr("d", path);
//
//
//svg.insert("path", "." + styles.graticule)
//  .datum(arteries)
//  .attr("class", styles.boundary)
//  .attr("d", path);

window.stop = () => {
    console.log(path)
    debugger
}

//setInterval(function(){
// currentScale = (currentScale + 1) % 350;
// projection.scale(currentScale);
// svg.selectAll("." + styles.boundary)
//       .attr("d", path);
//},100);