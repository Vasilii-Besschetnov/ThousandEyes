import React from "react";
import * as d3 from 'd3';
import arteries from "$src/maps/arteries.json";
import * as styles from "$src/styles/main.scss";

const Map = ({ }) => {
    // create a projection
    const projection = d3.geoEquirectangular();
    projection.fitExtent([[20, 20], [920, 440]], arteries);
    // create a path that is bound to the projection
    const path = d3.geoPath().projection(projection);
    return (
        <svg width={960} height={480} className={styles}>
        </svg>
    );
}

export default Map;