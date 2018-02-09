
import * as topojson from 'topojson';
import freeways from "$src/maps/freeways.json";
import streets from "$src/maps/streets.json";
import neighborhoods from "$src/maps/neighborhoods.json";
import React from 'react';
import ReactDOM from 'react-dom';
import Map from "$src/components/Map/Map.jsx";

ReactDOM.render(<Map />, document.getElementById('root'))