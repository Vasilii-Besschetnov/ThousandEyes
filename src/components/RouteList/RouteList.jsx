import React from "react";
import { connect } from "react-redux";
import { getTagList } from "$src/reducers/reducers.js";
import RouteItem from "./RouteItem.jsx";
import * as styles from "./routeList.scss";
import { routeInfosLoaded } from "$src/actions/actions.js";
import { withAxios } from "react-axios";



class RouteList extends React.Component {
    
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
            command: "routeList",
            a: "sf-muni" // agency
        };
        
        const {
            axios,
            routeInfosLoaded
        } = this.props;
        axios.get("", { params }).then((response) => {
            this.isLoading = false;
            const data = response && response.data;
            if (data) {
                if (data.route) {
                    routeInfosLoaded(Array.from(data.route));
                }
            }
        }, (err) => {
            this.isLoading = false;
            this.loadData();
        });
        
    }
    
    render () {
        const {
            tagList,

        } = this.props;
        
        return (
            <section className={styles.routeList}>
                <div className={styles.list}>
                    {tagList.map(tag =>
                        <RouteItem
                            key={tag} tag={tag}
                            />)}
                </div>
                <div className={styles.footer}>
                    <button onClick={this.loadData}>Refresh</button>
                </div>
            </section>
        );
    }
}

export default withAxios(connect((state) => ({
    tagList: getTagList(state)
}), {
    routeInfosLoaded
})(RouteList))