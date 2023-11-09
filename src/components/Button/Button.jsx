import "./Button.css"
const Button = ({ children, handleClick }) => {
    const handleClickButton = (e) => {
        e.preventDefault()
        handleClick()
    };
    return (
        <button className="button" onClick={handleClickButton}>{children}</button>
    )
}

export default Button