import './CancelRoomReservation.css'
import Form from "../Form/Form"
import List from "../List/List"
import Button from "../Button/Button"
import SubmitButton from "../SubmitButton/SubmitButton"
import Row from "../Row/Row"
import { useState } from "react"
import { useForm } from "../../hooks/useForm"
import { useRoomTransaction } from "../../hooks/useRoomTransaction"
import Modal from '../Modal/Modal'

const CancelRoomReservation = () => {

    const { cancelRoomReservation, cancelReservation, roomReservationList, cancelRoomReservationList } = useRoomTransaction()
    const { form, handleChange, cleanForm } = useForm(cancelRoomReservation)
    const [stateModal, setStateModal] = useState(false)
    const [stateItemModal, setStateItemModal] = useState(false)
    const [selectedReservation, setSelectedReservation] = useState()
    const [selectedItem, setSelectedItem] = useState()

    const handleSubmit = (e) => {
        e.preventDefault()
        cancelReservation({ ...form, idReservaHabitacion: selectedReservation });
        cleanForm()
    }

    const handleModal = (idReservaHabitacion) => {
        setStateModal(true)
        setSelectedReservation(idReservaHabitacion)
    }

    const handleClose = () => {
        setStateModal(false)
        setStateItemModal(false)
        cleanForm()
    }

    const handleClickItem = (item) => {
        setStateItemModal(true)
        setSelectedItem(item)
    }

    return (
        <div className="cancel_room_reservation_container">
            <h1>Cancelar reserva de habitacion</h1>
            <div className="list_reservation">
                <h3>Reservas</h3>
                <List maxHeight={500}>
                    {roomReservationList.map((item) => (
                        <Row key={item.idReserva}>
                            <span>ID Reserva: {item.idReserva}</span>
                            <span>ID Cliente: {item.idCliente}</span>
                            <span>Fecha Inicio: {item.fechaInicio}</span>
                            <span>Fecha final: {item.fechaFinal}</span>
                            <span>Valor total: ${item.valorTotal}</span>
                            {item.idEstadoReserva !== 2 && <Button handleClick={() => handleModal(item.idReserva)}>Cancelar</Button>}
                            <Button handleClick={() => handleClickItem(item)}>Ver Info</Button>
                        </Row>
                    ))}
                </List>
            </div >

            <div className="list_cancel_reservation">
                <h3>Cancelaciones de reserva</h3>
                <List maxHeight={500}>
                    {cancelRoomReservationList.map((item) => (
                        <Row key={item.idReservaHabitacion}>
                            <span>ID Reserva: {item.idReservaHabitacion}</span>
                            <span>Fecha: {item.fecha}</span>
                            <span>Costo: ${item.costo}</span>
                            <Button handleClick={() => handleClickItem(item)}>Ver Info</Button>
                        </Row>
                    ))}
                </List>
            </div >
            <Modal title={"Cancelacion de Reserva"} state={stateModal} setState={setStateModal} handleClose={handleClose}>
                <Form handleSubmit={handleSubmit}>

                    <div className="text_field_container">
                        <label>Motivo:</label>
                        <input className="text_field" type="text" name="motivo" value={form.motivo} onChange={handleChange} />
                    </div>
                    <SubmitButton>Cancelar Reserva</SubmitButton>
                </Form>
            </Modal>

            <Modal title={"Informacion"} state={stateItemModal} setState={setStateItemModal} handleClose={handleClose}>
                {selectedItem && Object.entries(selectedItem).map(([key, value]) => (
                    <p key={key}>
                        {key}: {value.toString()}
                    </p>
                ))}
            </Modal>

        </div >


    )
}

export default CancelRoomReservation