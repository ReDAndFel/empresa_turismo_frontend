import Form from "../Form/Form"
import List from "../List/List"
import Button from "../Button/Button"
import SubmitButton from "../SubmitButton/SubmitButton"
import ComboBox from "../ComboBox/ComboBox"
import "./RoomReservation.css"
import { useState } from "react"
import { useForm } from "../../hooks/useForm"
import { useRegime } from "../../hooks/useRegime"
import { useClient } from "../../hooks/useClient"
import { useAgency } from "../../hooks/useAgency"
import { useRoom } from "../../hooks/useRoom"
import { useRoomTransaction } from "../../hooks/useRoomTransaction"
const RoomReservation = () => {

    const { clientList } = useClient()
    const { regimeList } = useRegime()
    const { agencyList } = useAgency()
    const [valorTotal, setValorTotal] = useState(0)
    const { roomList } = useRoom()
    const { auxDetailRoomReservation, roomReservationList } = useRoomTransaction()

    const { form } = useForm()

    const handleSubmit = (e) => {
        e.preventDefault()
        alert("reserva realizada")
    }

    const handleClickAddReservation = () => {

    }

    const handleClickRemoveReservation = () => {

    }

    return (
        <div className="room_reservation_container">
            <h1>Reservar habitacion</h1>
            <Form handleSubmit={handleSubmit}>
                <div className="text_field_container">
                    <label>Cliente:</label>
                    <ComboBox>
                        {clientList.map((item) => (
                            <option value={item.idCliente}>{item.idCliente}{item.nombre}{item.apellido}</option>
                        ))}
                    </ComboBox>

                </div>
                <div className="text_field_container">
                    <label>Regimen:</label>
                    <ComboBox>
                        {regimeList.map((item) => (
                            <option value={item.idRegimen}>{item.descripcion}</option>
                        ))}
                    </ComboBox>

                </div>
                <div className="text_field_container">
                    <label>Agencia:</label>
                    <ComboBox>
                        {agencyList.map((item) => (
                            <option value={item.idAgencia}>{item.nombre}</option>
                        ))}
                    </ComboBox>

                </div>
                <div className="text_field_container">
                    <label>Fecha inicio:</label>
                    <input type="date" />
                </div>
                <div className="text_field_container">
                    <label>Fecha final:</label>
                    <input type="date" />
                </div>
                <div className="list_menu_container">
                    <div className="list_menu">
                        <span>Habitaciones</span>
                        <List>
                            {roomList.map((item) => (
                                <div className="item_list">
                                    {item.idHotel}
                                    {item.idNivel}
                                    {item.cantidad}
                                    {item.precioNoche}
                                    <Button handleClick={handleClickAddReservation}>Agregar a reserva</Button>
                                </div>
                            ))}
                        </List>
                    </div>
                    <div className="list_menu">
                        <span>Habitaciones a reservar</span>
                        <List>
                            {auxDetailRoomReservation.map((item) => (
                                <div className="item_list">
                                    {item.idHotel}
                                    {item.idNivel}
                                    {item.cantidad}
                                    {item.precioNoche}
                                    <Button handleClick={handleClickRemoveReservation}>Quitar de reserva</Button>
                                </div>
                            ))}
                        </List>
                    </div>
                </div>
                <label className="total_price">$ {valorTotal}</label>
                <SubmitButton>Reservar</SubmitButton>
            </Form>
            <div className="list_reservation">
                <span>Reservas</span>
                <List>
                    {roomReservationList.map((item) => (
                        <div className="item_list">
                            {item.idCliente}
                            {item.fechaInicio}
                            {item.fechaFinal}
                            {item.valorTotal}
                            {item.idEstadoReserva}
                        </div>
                    ))}
                </List>
            </div>

        </div>


    )
}

export default RoomReservation