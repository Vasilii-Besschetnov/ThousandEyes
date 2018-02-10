import React from "react";
import * as d3 from 'd3';
import { AxiosProvider } from "react-axios";
import axios from "axios";
import { Provider } from "react-redux";
import * as styles from "./map.scss";
import arteries from "$src/maps/arteries.json";
import createMapStore from "$src/configureStore.js";
import { D3ContextProvider } from "$components/react-d3.js";
import RoutePathList from "$components/RoutePathList/RoutePathList.jsx";
import RoutePathLoader from "$components/RoutePathList/RoutePathLoader.jsx";
import RouteList from "$components/RouteList/RouteList.jsx";
import VehicleLoader from "$components/Vehicle/VehicleLoader.jsx";

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
        timeout: 5000
    });
    
    return (
        <Provider store={createMapStore()}>
            <D3ContextProvider projection={projection}>
                <AxiosProvider instance={axiosInstance}>
                    <section className={styles.map}>
                        <aside className={styles.leftColunm}>
                            <RouteList />
                        </aside>
                        <section className={styles.rightColumn}>
                            <svg className={styles.mapSvg}>
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