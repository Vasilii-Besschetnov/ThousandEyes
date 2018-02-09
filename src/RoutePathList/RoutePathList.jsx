import React from "react";
import RoutePath from "$src/RoutePath/RoutePath.jsx";

let RoutePathList = ({
    tags
}) => {
    return (
        <React.Fragment>
            {
                tags.map(t =>
                    <RoutePath
                        key={t}
                        tag={t}
                        />)
            }
        </React.Fragment>        
    )
};

export default connect(state => ({
    tags: selectors.getTagList(state)
}))(RoutePathList);