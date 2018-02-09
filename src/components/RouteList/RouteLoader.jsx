import React from "react";
import { connect } from "react-redux";
import { routeInfosLoaded } from "$src/actions/actions.js";
import { Get } from "react-axios";
import RouteList from "$components/RouteList/RouteList.jsx";

const RouteLoader = ({
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

export default connect(null, {
    routeInfosLoaded
})(RouteLoader);
