import "./ComboBox.css"
const ComboBox = ({ children, name, selectedValue, onChange }) => {
    return (
        <select className="combo_box" name={name} value={selectedValue} onChange={onChange}>
            {children}
        </select>
    )
}

export default ComboBox