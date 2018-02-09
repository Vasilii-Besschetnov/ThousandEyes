import React from "react";
import * as d3 from 'd3';
import arteries from "$src/maps/arteries.json";
import * as styles from "$src/styles/main.scss";
import { AxiosProvider, Get } from "react-axios";
import axios, * as ttt from "axios";
import { connect, Provider } from "react-redux";
import reducers, * as selectors from "./reducers.js";
import createMapStore from "./configureStore.js";


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

let d3Context = {
    projection: null,
    path: null
}

let state = {
    tags: [],
    tagToRoutePath: {},
    tagToRountInfo: {}
}

let RoutePath = ({
    tag,
    path
}) => {
    if (!path) return null;
    let geoPath = d3Context.path;
    return (
        <path 
            className={styles.route}
            d={geoPath(path.path[0].point)} />
    );
}

RoutePath = connect((state, { tag }) =>({
    path: selectors.getPath(state, tag)
}))(RoutePath)

let RoutePathList = ({
    tags
}) => {
    return (
        <div>
            {tags.map(t =>
                <RoutePath
                    key={t}
                    tag={t}
                    />)}
        </div>
    )
};

RoutePathList = connect(state => ({
    tags: selectors.getTagList(state)
}))(RoutePathList);


let RoutePathLoader = ({
    routesPathLoaded
})=>{
    const params = {
        command: "routeConfig",
        a: "sf-muni", // agency
        r: "E"//route tag
    };
    
    return (
        <Get params={params}>
            {(error, response, isLoading, onReload) => {
                response = response && response.data;
              if(error) {
                return (<div>Something bad happened: {error.message} <button onClick={() => onReload({ params })}>Retry</button></div>)
              }
              else if(isLoading) {
                return (<div>Loading...</div>)
              }
              else if(response !== null) {
                routesPathLoaded(response.route);
                return (
                    <div>
                        <RoutePathList />
                        <RouteList onReload={onReload} />
                    </div>
                );
              }
              return (<div>Default message before request is made.</div>)
            }}
        </Get>
    )
};

RoutePathLoader = connect(null, {
    routesPathLoaded: selectors.actions.routesPathLoaded
})(RoutePathLoader);


let RouteItem = ({
    tag,
    title
}) => {
    return (
        <div>
            {title} ({tag})
        </div>
    );
}

RouteItem = connect((state, { tag }) => {
    const tagInfo = selectors.getRouteInfo(state, tag);
    
    return tagInfo;
})(RouteItem);

let RouteList = ({
    tagList,
    onReload
}) => {
    
    return (
        <div>
            {tagList.map(tag =>
                <RouteItem
                    key={tag} tag={tag}
                    />)}
            <button onClick={onReload}>Refresh</button>
        </div>
    );
};

RouteList = connect((state) => ({
    tagList: selectors.getTagList(state)
}))(RouteList)

let RouteLoader = ({
    routeInfosLoaded
}) => {
    const params = {
        command: "routeList",
        a: "sf-muni" // agency
    };
    
    return (
        <Get params={params}>
            {(error, response, isLoading, onReload) => {
                response = response && response.data;
              if(error) {
                return (<div>Something bad happened: {error.message} <button onClick={() => onReload({ params })}>Retry</button></div>)
              }
              else if(isLoading) {
                return (<div>Loading...</div>)
              }
              else if(response !== null) {
                routeInfosLoaded(response.route);
                return (
                    <div>
                        
                        <RouteList onReload={onReload} />
                    </div>
                );
              }
              return (<div>Default message before request is made.</div>)
            }}
        </Get>
    )
}

RouteLoader = connect(null, {routeInfosLoaded: selectors. actions.routeInfosLoaded})(RouteLoader);




const Map = ({ }) => {
    // create a projection
    const projection = d3Context.projection = d3.geoMercator();
    projection.fitExtent([[20, 20], [920, 440]], arteries);
    
    // create a path that is bound to the projection
    const path = d3Context.path = d3.geoPath().projection(projection);
    
    const axiosInstance = axios.create({
        baseURL: 'http://webservices.nextbus.com/service/publicJSONFeed',
        timeout: 2000,
        headers: { "Access-Control-Allow-Origin": '*'}
    });
    
    return (
        <Provider store={createMapStore()}>
            <AxiosProvider instance={axiosInstance}>
                <section className={styles.map}>
                    <aside className={styles.leftColumn}>
                        <RouteLoader />
                    </aside>
                    <section className={styles.rightColumn}>
                        <svg width={960} height={480} className={styles}>
                            {arteries.features.map((a, i) =>
                                <Path
                                     key={i}
                                     feature={a}
                                     pathGenerator={path} />
                            )}
                            <RoutePathLoader/>
                        </svg>
                    </section>
                </section>
            </AxiosProvider>
        </Provider>
    );
}

export default Map;