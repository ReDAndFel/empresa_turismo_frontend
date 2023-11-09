import Form from "../Form/Form"
import List from "../List/List"
import Button from "../Button/Button"
import SubmitButton from "../SubmitButton/SubmitButton"
import ComboBox from "../ComboBox/ComboBox"
import Row from "../Row/Row"
import "./RoomReservation.css"
import { useEffect, useState } from "react"
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
    const { auxDetailRoomReservation, unitsRoom, handleUnitsDetail, setAuxDetailRoomReservation, roomReservation, addDetail, removeDetail, createReservation, roomReservationList } = useRoomTransaction()

    const { form, handleChange, cleanForm} = useForm(roomReservation)

    const handleSubmit = (e) => {
        e.preventDefault()
        form.roomReservationDetail = auxDetailRoomReservation
        form.valorTotal = valorTotal
        createReservation(form)
        cleanForm()
        setAuxDetailRoomReservation([])
        setValorTotal(0)
    }

    const handleClickAddDetail = (item) => {
        addDetail(item)
    }

    const handleClickRemoveDetail = (item) => {
        removeDetail(item)
    }

    const handleUnitsRoom = (e, roomId) => {
        const units = parseInt(e.target.value)
        handleUnitsDetail(units, roomId)
    }

    useEffect(() => {
        const total = auxDetailRoomReservation.reduce((accumulator, item) => {
            return accumulator + (item.precio);
        }, 0);
        setValorTotal(total);
    }, [auxDetailRoomReservation]);

    return (
        <div className="room_reservation_container">
            <h1>Reservar habitacion</h1>
            <Form handleSubmit={handleSubmit}>
                <div className="text_field_container">
                    <label>Cliente:</label>
                    <ComboBox name="idCliente" selectedValue={form.idCliente} onChange={handleChange}>
                        <option className="option_combo_box" value="">Seleccione un cliente</option>
                        {clientList.map((item) => (
                            <option key={item.idCliente} className="option_combo_box" value={item.idCliente}>
                                {item.idCliente} {item.nombre}  {item.apellido}
                            </option>
                        ))}
                    </ComboBox>

                </div>
                <div className="text_field_container">
                    <label>Regimen:</label>
                    <ComboBox name="idRegimen" selectedValue={form.idRegimen} onChange={handleChange}>
                        <option className="option_combo_box" value="">Seleccione un regimen</option>
                        {regimeList.map((item) => (
                            <option key={item.idRegimen} className="option_combo_box" value={item.idRegimen}>{item.descripcion}</option>
                        ))}
                    </ComboBox>

                </div>
                <div className="text_field_container">
                    <label>Agencia:</label>
                    <ComboBox name="idAgencia" selectedValue={form.idAgencia} onChange={handleChange}>
                        <option className="option_combo_box" value="">Seleccione una agencia</option>
                        {agencyList.map((item) => (
                            <option key={item.idAgencia} className="option_combo_box" value={item.idAgencia}>{item.nombre}</option>
                        ))}
                    </ComboBox>

                </div>
                <div className="text_field_container">
                    <label>Fecha inicio:</label>
                    <input className="text_field" type="date" name="fechaInicio" value={form.fechaInicio} onChange={handleChange} />
                </div>
                <div className="text_field_container">
                    <label>Fecha final:</label>
                    <input className="text_field" type="date" name="fechaFinal" value={form.fechaFinal} onChange={handleChange} />
                </div>
                <div className="list_menu_container">
                    <div className="list_menu">
                        <h3>Habitaciones</h3>
                        <List maxHeight={300}>
                            {roomList.map((item) => (
                                <Row key={item.idHabitacion}>
                                    <span>ID Habitacion: {item.idHabitacion}</span>
                                    <span>ID Hotel: {item.idHotel}</span>
                                    <span>ID Nivel: {item.idNivel}</span>
                                    <span>Cantidad: {item.cantidad}</span>
                                    <span>Precio: ${item.precioNoche}</span>
                                    <Button handleClick={() => handleClickAddDetail(item)}>Agregar a reserva</Button>
                                </Row>
                            ))}
                        </List>
                    </div>
                    <div className="list_menu">
                        <h3>Habitaciones a reservar</h3>
                        <List maxHeight={500}>
                            {auxDetailRoomReservation.map((item) => (
                                <Row key={item.idHabitacion}>
                                    <span>ID Habitacion: {item.idHabitacion}</span>
                                    <span>Precio: {item.precio} </span>
                                    <span>Cantidad: <input type="number" value={item.cantidad} onChange={(e) => handleUnitsRoom(e, item.idHabitacion)} /></span>
                                    <Button handleClick={() => handleClickRemoveDetail(item)}>Quitar de reserva</Button>
                                </Row>
                            ))}
                        </List>
                    </div>
                </div>
                <label className="total_price">Valor Total: ${valorTotal}</label>
                <SubmitButton>Reservar</SubmitButton>
            </Form>
            <div className="list_reservation">
                <h3>Reservas</h3>
                <List maxHeight={500}>
                    {roomReservationList.map((item) => (
                        <Row key={item.idReserva}>
                            <span>ID Cliente: {item.idCliente}</span>
                            <span>Fecha Inicio: {item.fechaInicio}</span>
                            <span>Fecha final: {item.fechaFinal}</span>
                            <span>Valor total: ${item.valorTotal}</span>
                            <span>ID Estado: {item.idEstadoReserva}</span>
                        </Row>
                    ))}
                </List>
            </div >

        </div >


    )
}

export default RoomReservation