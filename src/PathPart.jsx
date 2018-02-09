import React from "react";

const PathPart = ({
    coords
}) => {
    const coordAsStr = coords.map(c => {        
        return c.x + "," + c.y;
    });
    return (        
        <path d={"M" + coordAsStr.join("L")} />        
    )
};

export default PathPart;