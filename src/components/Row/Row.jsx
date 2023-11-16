import "./Row.css"
const Row = ({ children }) => {
    return (
        <div className="row_container">
            <div className="row_children_container">
                {children}
            </div>
        </div>
    )
}

export default Row;