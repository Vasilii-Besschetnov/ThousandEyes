import React from "react";
import { connect } from "react-redux";
import RoutePath from "$components/RoutePath/RoutePath.jsx";
import { getSelectedRoutes } from "$src/reducers/reducers.js";
import { routesPathLoaded } from "$src/actions/actions.js";
import { withAxios } from "react-axios";

const stateToProps = state => ({
    tags: getSelectedRoutes(state)
});

const dispatchToProps = {
    routesPathLoaded
};


class RoutePathList extends React.Component {
    
    constructor(props) {
        super(props);
        this.loadData = this.loadData.bind(this);
    }
    
    componentDidMount() {
        this.loadData();
    }
    
    loadData() {        
        if (this.isLoading) return;

        this.isLoading = true;
        const params = {
            command: "routeConfig",
            a: "sf-muni", // agency
            useForUI: true,
            //r: "E"//route tag
        };
        
        const {
            axios,
            routesPathLoaded
        } = this.props;
        
        axios.get("", { params }).then((response) => {
            this.isLoading = false;
            const data = response && response.data;
            if (data) {
                if (data.route) {
                    routesPathLoaded(Array.from(data.route));
                }
            }
        }, (err) => {
            this.isLoading = false;
            this.loadData();
        });
        
    }
    
    render () {
        const {
            tags
        } = this.props;
        
        return (
            <React.Fragment>
                {tags.map(t =>
                    <RoutePath
                        key={t}
                        tag={t}
                        />)}
            </React.Fragment>        
        );
    }
};


export default withAxios(connect(stateToProps, dispatchToProps)(RoutePathList));