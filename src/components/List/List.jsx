import "./List.css"
const List = ({children, maxHeight}) =>{
    const listStyle = {
        maxHeight: `${maxHeight}px`,
      };
    return(
        <div className="list_container" style={listStyle}>
            {children}
        </div>
    )
}

export default List