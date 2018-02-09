import React from "react";
import { connect } from "react-redux";
import { vehiclesLoaded } from "$src/actions/actions.js";
import { Get } from "react-axios";

class VehicleLoader extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            lastTime: null
        };
    }
    
    updateData(lastTime) {
        if (this.timeoutId) return;
        this.timeoutId = setTimeout(() => {
            this.setState({
                lastTime
            }, ()=> {
                this.timeoutId = null;
            });
        }, 15000)
    }
    
    componentWillUnmount() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.this.timeoutId = null;
        }
    }
    
    render() {
        const {
            vehiclesLoaded
        } = this.props;
        const params = {
            command: "vehicleLocations",
            a: "sf-muni", // agency  
            t: this.state.lastTime
            //r: "E"//route tag
        };

        return (
            <Get params={params}>
                {(error, response, isLoading, onReload) => {
                    response = response && response.data;
                  if(error) {
                      onReload();
                  }
                  else if(response !== null) {
                    vehiclesLoaded(response.vehicle);
                    this.updateData(response.lastTime.time);
                  }
                  return ("")
                }}
            </Get>
        )
    }    
}

export default connect(null, {
    vehiclesLoaded
})(VehicleLoader);