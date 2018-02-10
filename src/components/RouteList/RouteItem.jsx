import React from "react";
import { connect } from "react-redux";
import { getRouteInfo, isRouteSelected } from "$src/reducers/reducers.js";
import { routeSelectionChanged } from "$src/actions/actions.js";
import { routeItem, selected } from "./routeList.scss";

const stateToProps = (state, { tag }) => {
    const routeInfo = getRouteInfo(state, tag),
          isSelected = isRouteSelected(state, tag);
    
    return {
        ...routeInfo,
        isSelected
    };
    
};

const dispatchToProps = (dispatch, { tag }) => ({
    onClick: () => dispatch(routeSelectionChanged(tag))
});
    
const RouteItem = ({
    tag,
    title,
    isSelected,
    
    onClick
}) => {
    const cls = [routeItem]
    
    if (isSelected)
        cls.push(selected);
        
    return (
        <div className={cls.join(" ")}
            onClick={onClick}>
            {title} ({tag})
        </div>
    );
}

export default connect(stateToProps, dispatchToProps)(RouteItem);