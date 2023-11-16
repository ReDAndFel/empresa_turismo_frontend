import './Modal.css'

const Modal = ({ title, children, state, setState, handleClose }) => {

    const handleClickClose = () =>{
        handleClose()
    }

    const handleModalContainerClick = e => e.stopPropagation();
    return (
        <section className={`modal ${state && "is_open"}`} onClick={ handleClickClose }>
            <div className="modal_container" onClick={handleModalContainerClick}>
                <div className="modal_header">
                    {title}
                    <button className="modal_close_button" onClick={handleClickClose}>X</button>
                </div>
                <div className="modal_content">
                    {children}
                </div>
            </div>

        </section>
    )
}

export default Modal