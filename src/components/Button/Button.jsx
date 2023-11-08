const SubmitButton = ({children, handleClick}) =>{
    return(
        <button className="button" onClick={() => handleClick}>{children}</button>
    )
}

export default SubmitButton