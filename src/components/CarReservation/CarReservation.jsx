import "./CarReservation.css"
import { useEffect, useState } from "react"
import { useCar } from "../../hooks/useCar"
import { useAgency } from "../../hooks/useAgency"
import { useClient } from "../../hooks/useClient"
import { useCarTransaction } from "../../hooks/useCarTransaction"
import { useForm } from "../../hooks/useForm"
import Form from "../Form/Form"
import ComboBox from "../ComboBox/ComboBox"
import List from "../List/List"
import Row from "../Row/Row"
import Button from "../Button/Button"
import SubmitButton from "../SubmitButton/SubmitButton"

const CarReservation = () => {
    const { clientList } = useClient()
    const { agencyList } = useAgency()
    const [valorTotal, setValorTotal] = useState(0)
    const { carList } = useCar()
    const { auxDetailCarReservation, handleDetail, setAuxDetailCarReservation, carReservation, addDetail, removeDetail, createReservation, carReservationList } = useCarTransaction()
    const { form, handleChange, cleanForm } = useForm(carReservation)

    const handleSubmit = (e) => {
        e.preventDefault()
        form.carReservationDetail = auxDetailCarReservation
        form.valorTotal = valorTotal
        createReservation(form)
        cleanForm()
        setAuxDetailCarReservation([])
        setValorTotal(0)
    }

    const handleClickAddDetail = (item) => {
        addDetail(item)
    }

    const handleClickRemoveDetail = (item) => {
        removeDetail(item)
    }

    const handleReservationDetail = (event, carId) => {
        handleDetail(event, carId)
    }

    useEffect(() => {
        const total = auxDetailCarReservation.reduce((accumulator, item) => {
            return accumulator + (item.precioDetalle);
        }, 0);
        setValorTotal(total);
    }, [auxDetailCarReservation])

    return (
        <div className="car_reservation_container">
            <h1>Reservacion de Carro</h1>
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
                        <h3>Automoviles</h3>
                        <List maxHeight={300}>
                            {carList.map((item) => (
                                <Row key={item.idAutomovil}>
                                    <span>ID Automovil: {item.idAutomovil}</span>
                                    <span>ID Gama: {item.idGama}</span>
                                    <span>ID Tipo: {item.idTipo}</span>
                                    <span>ID Marca: {item.idMarca}</span>
                                    <span>Placa: {item.placa}</span>
                                    <span>Precio: ${item.precio}</span>
                                    <Button handleClick={() => handleClickAddDetail(item)}>Agregar a reserva</Button>
                                </Row>
                            ))}
                        </List>
                    </div>
                    <div className="list_menu">
                        <h3>Automoviles a reservar</h3>
                        <List maxHeight={500}>
                            {auxDetailCarReservation.map((item) => (
                                <Row key={item.idAutomovil}>
                                    <span>ID Automovil: {item.idAutomovil}</span>
                                    <span>Precio: {item.precioDetalle} </span>
                                    <span>GPS: <input type="checkbox" name="gps" checked={item.gps} onChange={(event) => handleReservationDetail(event, item.idAutomovil)} /></span>
                                    <span>Seguro: <input type="checkbox" name="seguro" checked={item.seguro} onChange={(event) => handleReservationDetail(event, item.idAutomovil)} /></span>
                                    <span>Unidades: <input type="number" name="unidades" value={item.unidades} onChange={(event) => handleReservationDetail(event, item.idAutomovil)} /></span>
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
                    {carReservationList.map((item) => (
                        <Row key={item.idReserva}>
                            <span>ID Cliente: {item.idCliente}</span>
                            <span>Fecha Inicio: {item.fechaInicio}</span>
                            <span>Fecha final: {item.fechaFinal}</span>
                            <span>Valor total: ${item.valorTotal}</span>
                        </Row>
                    ))}
                </List>
            </div >
        </div>
    );
}
export default CarReservation