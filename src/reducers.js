import { combineReducers } from 'redux';

const actionTypes = {
    routeInfosLoaded: "ROUTES_INFO_LOADED",
    routesPathLoaded: "ROUTES_PATH_LOADED"
};
export const actions = {
    routeInfosLoaded: routes => ({
        type: actionTypes.routeInfosLoaded,
        routes
    }),
    routesPathLoaded: routes => ({
        type: actionTypes.routesPathLoaded,
        routes
    })
};

const tags = (state = [], action)=> {
    switch (action.type) {
        case actionTypes.routeInfosLoaded:
            return action.routes ? action.routes.map(r => r.tag) : [];
        default:
            return state;
    }
}

const tagToRouteInfo = (state = {}, action)=> {
    switch (action.type) {
        case actionTypes.routeInfosLoaded:
            return action.routes ?
                action.routes.reduce((map, route) => {
                    map[route.tag] = route;
                    return map;
                }, {}) :
                {};
        default:
            return state;
    }
}

const tagToRoutePath = (state = {}, action)=> {
    switch (action.type) {
        case actionTypes.routesPathLoaded:
            let routes = action.routes;
            routes = routes && !Array.isArray(routes) ? [routes] : routes;
            return routes ?
                routes.reduce((map, route) => {
                    map[route.tag] = route;
                    return map;
                }, {}) :
                {};
        default: 
            return state;
    }
}


let state = {
    tags: [],
    tagToRoutePath: {},
    tagToRouteInfo: {}
}

export default combineReducers({
    tags,
    tagToRouteInfo,
    tagToRoutePath
});

export const getTagList = state => state.tags

export const getPath = (state, tag) => state.tagToRoutePath[tag];

export const getRouteInfo = (state, tag) => state.tagToRouteInfo[tag];