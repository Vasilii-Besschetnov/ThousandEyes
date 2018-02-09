import React from "react";
import { vehicle as vehicleCls } from "./vehicle.scss";

const Vehicle = ({
    x,
    y
}) => {
    return (
        <circle className={vehicleCls} cx={x} cy={y} />
    )
};

export default Vehicle;