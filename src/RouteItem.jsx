import React from "react";
import { connect } from "react-redux";
import { getRouteInfo } from "$src/reducers.js";

const RouteItem = ({
    tag,
    title
}) => {
    return (
        <div>
            {title} ({tag})
        </div>
    );
}

export default connect((state, { tag }) => getRouteInfo(state, tag))(RouteItem);