import React from "react";
import { connect } from "react-redux";
import { getTagList } from "$src/reducers/reducers.js";
import RouteItem from "$src/RouteItem.jsx";

const RouteList = ({
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

export default connect((state) => ({
    tagList: getTagList(state)
}))(RouteList)