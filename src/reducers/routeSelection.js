import * as actionTypes from "$src/actions/actionTypes.js";

const routeSelection = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.routeSelectionChanged:
            const { [action.tag]: curr, ...rest } = state;
            if (!curr) {
                rest[action.tag] = true;
            }
            return rest;
        default:
            return state;
    }
};

export default routeSelection;

export const isSelected = (state, tag) => !!state[tag];
export const getSelectedRoutes = state => Object.keys;