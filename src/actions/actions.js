import * as actionTypes from "$src/actions/actionTypes.js";

export const routeInfosLoaded = routes => ({
    type: actionTypes.routeInfosLoaded,
    routes
});

export const routesPathLoaded = routes => ({
    type: actionTypes.routesPathLoaded,
    routes
});

export const vehiclesLoaded = vehicles => ({
    type: actionTypes.vehiclesLoaded,
    vehicles        
});

export const routeSelectionChanged = tag => ({
    type: actionTypes.routeSelectionChanged,
    tag        
});