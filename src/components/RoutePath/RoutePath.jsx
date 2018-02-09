import React from "react";
import { connect } from "react-redux";
import { withD3Context } from "$components/react-d3.js";
import Vehicle from "$components/Vehicle/Vehicle.jsx";
import { getPath, getVehicles } from "$src/reducers/reducers.js";
import PathPart from "./PathPart.jsx";
import { route as routeCls } from "./routePath.scss";

const RoutePath = ({
    tag,
    pathList,
    color,
    cars
}) => {    
    const content = [];
    
    if (pathList && pathList.length > 0) {
        content.push(
            <g key="route_group">//path group
            {
                pathList.map((p, i) => <PathPart key={i} coords={p} />)
            }
            </g>
        );
    }
    if (cars && cars.length > 0) {
        content.push(        
            <g key="vehicle_group" fill={color}> // cars group
                {cars.map(car => <Vehicle key={car.id} {...car} />)}
            </g>
        )
    }
    
    return (
        <g className={routeCls} stroke={color}>
            {content}
        </g>
    );
}

export default withD3Context(connect((state, { tag, convertToCoordinates }) => {
    const config = getPath(state, tag);
    const resProps = {
        cars: getVehicles(state, tag).map(v => ({
            id: v.id, ...convertToCoordinates(v)
        })),
        pathList: null,
        color: null
    };
    
    if (config) {
        resProps.color = "#" + config.color;
        resProps.pathList = config.path ? config.path.map(p => p.point.map(convertToCoordinates)) : null;
    }
    
    return resProps;
})(RoutePath));