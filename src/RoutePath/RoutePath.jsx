const RoutePath = ({
    tag,
    path,
    cars,
    convertToCoordinates
}) => {
    if (!path) return null;
    
    return (
        <g className={styles.route} stroke={"#" + path.color}>
            <g>//path group
            {
                path.path.map((p, i) => <PathPart key={i} coords={p.point.map(convertToCoordinates)} />)
            }
            </g>
            <g fill={"#" + path.color}> // cars group
                {(cars || []).map(car => <Vehicle key={car.id} {...car} />)}
            </g>
        </g>
    );
}

export default connect((state, { tag }) =>({
    path: selectors.getPath(state, tag),
    cars: selectors.getVehicles(state, tag).map(v => ({id: v.id, ...toCoords(v)})),
}))(RoutePath)