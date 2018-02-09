import React from "react";
import { connect } from "react-redux";
import reducers, * as selectors from "$src/reducers.js";
import { Get } from "react-axios";

const RoutePathLoader = ({
    routesPathLoaded
}) => {
    const params = {
        command: "routeConfig",
        a: "sf-muni", // agency
        useForUI: true,
        //r: "E"//route tag
    };
    
    return (
        <Get params={params}>
            {(error, response, isLoading, onReload) => {
                response = response && response.data;
              if(error) {
                  onReload();//retry
              }
              else if(response !== null) {
                routesPathLoaded(response.route);
              }
              return ("")
            }}
        </Get>
    )
};

export default connect(null, {
    routesPathLoaded: selectors.actions.routesPathLoaded
})(RoutePathLoader);