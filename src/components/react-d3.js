import React from 'react';
import PropTypes from 'prop-types';
const fnName = "convertToCoordinates"

export const withD3Context = (Component) => {
    const hoc = (props, context) => {
        const additionalProps = {
            [fnName]: context[fnName]
        };

        return (<Component {...props} {...additionalProps} />);        
    };
    
    hoc.contextTypes = {
        [fnName]: PropTypes.func.isRequired
    }
    
    return hoc;
};
                    
class D3ContextProvider extends React.Component {    
    getChildContext() {
        return {
            [fnName]: ({
                lon,
                lat
            }) => {
                
                const coords = this.props.projection([lon, lat]);
                return {
                    x: coords[0],
                    y: coords[1]
                };
            }
        }
    }
    
    render() {
        const {
            projection,
            children
        } = this.props;
        
        if (!projection) throw new Error("projection property must be specified");
        
        return children;
    }
}
        
D3ContextProvider.childContextTypes = {
    [fnName]: PropTypes.func.isRequired
};
        
export { D3ContextProvider };
            