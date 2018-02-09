import React from "react";
import { connect } from "react-redux";
import { getTagList } from "$src/reducers/reducers.js";
import RouteItem from "./RouteItem.jsx";
import * as styles from "./routeList.scss";

const RouteList = ({
    tagList,
    onReload
}) => {
    return (
        <section className={styles.routeList}>
            <div className={styles.list}>
                {tagList.map(tag =>
                    <RouteItem
                        key={tag} tag={tag}
                        />)}
            </div>
            <div className={styles.footer}>
                <button onClick={onReload}>Refresh</button>
            </div>
        </section>
    );
};

export default connect((state) => ({
    tagList: getTagList(state)
}))(RouteList)