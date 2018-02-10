import React from "react";
import { connect } from "react-redux";
import { vehiclesLoaded } from "$src/actions/actions.js";
import { withAxios } from "react-axios";

const dispatchToProps = {
    vehiclesLoaded
};

class VehicleLoader extends React.Component {
    constructor(props) {
        super(props);
        this.loadData = this.loadData.bind(this);
    }
    
    componentDidMount() {
        this.loadData();
    }
    
    loadData () {        
        if (this.timeoutId) return;
        const params = {
            command: "vehicleLocations",
            a: "sf-muni", // agency  
            t: this._lastTime || ''
            //r: "E"//route tag
        };
        const {
            axios,
            vehiclesLoaded,
            timeout = 15000
        } = this.props;
        axios.get("", { params }).then((response) => {
            const data = response && response.data;
            if (data) {
                this.timeoutId = null;
                this._lastTime = data.lastTime.time
                if (data.vehicle) {
                    vehiclesLoaded(Array.from(data.vehicle));
                }
                
                setTimeout(this.loadData, timeout)
            }
        }, (err) => {
            this.timeoutId = null;
            this.loadData();
        })
    }
    
    componentWillUnmount() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
    }
    
    render() {
        return ("");
    }    
}

export default withAxios(connect(null, dispatchToProps)(VehicleLoader));