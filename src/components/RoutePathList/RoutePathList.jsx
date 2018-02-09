import React from "react";
import { connect } from "react-redux";
import RoutePath from "$components/RoutePath/RoutePath.jsx";
import * as selectors from "$src/reducers/reducers.js";

const RoutePathList = ({
    tags
}) => {
    return (
        <React.Fragment>
        {tags.map(t =>
            <RoutePath
                key={t}
                tag={t}
                />)}
            </React.Fragment>
        
    )
};


export default connect(state => ({
    tags: selectors.getTagList(state)
}))(RoutePathList);