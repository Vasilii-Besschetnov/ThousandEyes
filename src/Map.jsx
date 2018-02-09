import React from "react";
import * as d3 from 'd3';
import arteries from "$src/maps/arteries.json";
import * as styles from "$src/styles/main.scss";
import { AxiosProvider } from "react-axios";
import axios from "axios";
import { Provider } from "react-redux";
import createMapStore from "./configureStore.js";
import { D3ContextProvider } from "$src/react-d3.js";
import RoutePathList from "$src/RoutePathList/RoutePathList.jsx";
import RoutePathLoader from "$src/RoutePathList/RoutePathLoader.jsx";
import RouteLoader from "$src/RouteList/RouteLoader.jsx";
import VehicleLoader from "$src/Vehicle/VehicleLoader.jsx";






const Path = ({
    pathGenerator,
    feature
}) => {
    return (
        <path
         d={pathGenerator(feature)}
         className={styles.artery}
         />
    );
}

const Map = ({ }) => {
    // create a projection
    const projection = d3.geoMercator();
    projection.fitExtent([[20, 20], [920, 440]], arteries);
    
    // create a path that is bound to the projection
    const path = d3.geoPath().projection(projection);
    
    const axiosInstance = axios.create({
        baseURL: 'http://webservices.nextbus.com/service/publicJSONFeed',
        timeout: 2000,
        headers: { "Access-Control-Allow-Origin": '*'}
    });
    
    return (
        <Provider store={createMapStore()}>
            <D3ContextProvider projection={projection}>
                <AxiosProvider instance={axiosInstance}>
                    <section className={styles.map}>
                        <aside className={styles.leftColumn}>
                            <RouteLoader />
                        </aside>
                        <section className={styles.rightColumn}>
                            <svg width={960} height={480} className={styles}>
                                <g>
                                    {arteries.features.map((a, i) =>
                                        <Path
                                             key={i}
                                             feature={a}
                                             pathGenerator={path} />
                                    )}
                                </g>
                                <RoutePathList />
                                <RoutePathLoader/>
                                <VehicleLoader />
                            </svg>
                        </section>
                    </section>
                </AxiosProvider>
            </D3ContextProvider>
        </Provider>
    );
}

export default Map;