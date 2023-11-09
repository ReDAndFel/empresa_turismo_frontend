import "./PurchaseTouristPackage.css"
import { useEffect, useState } from "react"
import { useAgency } from "../../hooks/useAgency"
import { useClient } from "../../hooks/useClient"
import { useTouristPackage } from "../../hooks/useTouristPackage"
import { useTouristPackageTransaction } from "../../hooks/useTouristPackageTransaction"
import { useForm } from "../../hooks/useForm"
import Form from "../Form/Form"
import ComboBox from "../ComboBox/ComboBox"
import List from "../List/List"
import Row from "../Row/Row"
import Button from "../Button/Button"
import SubmitButton from "../SubmitButton/SubmitButton"

const PurchaseTouristPackage = () => {
    const { clientList } = useClient()
    const { agencyList } = useAgency()
    const [valorTotal, setValorTotal] = useState(0)
    const { touristPackageList } = useTouristPackage()
    const { purchaseTouristPackage, purchaseTouristPackageList, auxDetailPackageTransaction, setAuxDetailPackageTransaction, addDetail, removeDetail, createPurchase, handleUnitsDetail } = useTouristPackageTransaction()
    const { form, handleChange, cleanForm } = useForm(purchaseTouristPackage)

    const handleSubmit = (e) => {
        e.preventDefault()
        form.purchaseTouristPackageDetail = auxDetailPackageTransaction
        form.valorTotal = valorTotal
        createPurchase(form)
        cleanForm()
        setAuxDetailPackageTransaction([])
        setValorTotal(0)
    }

    const handleClickAddDetail = (item) => {
        addDetail(item)
    }

    const handleClickRemoveDetail = (item) => {
        removeDetail(item)
    }

    const handleUnitsTouristPackage = (e, packageId) => {
        const units = parseInt(e.target.value)
        handleUnitsDetail(units, packageId)
    }

    useEffect(() => {
        const total = auxDetailPackageTransaction.reduce((accumulator, item) => {
            return accumulator + ((item.precioDetalle) - ((item.precioDetalle) * (item.descuento)));
        }, 0);
        setValorTotal(total);
    }, [auxDetailPackageTransaction])

    return (
        <div className="package_transaction_container">
            <h1>Compra de Paquete Turístico</h1>
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
                    <label>Fecha requerida:</label>
                    <input className="text_field" type="date" name="fechaRequerida" value={form.fechaRequerida} onChange={handleChange} />
                </div>
                <div className="list_menu_container">
                    <div className="list_menu">
                        <h3>Paquetes</h3>
                        <List maxHeight={300}>
                            {touristPackageList.map((item) => (
                                <Row key={item.idPaquete}>
                                    <span>ID Paquete: {item.idPaquete}</span>
                                    <span>Nombre: {item.nombre}</span>
                                    <span>Precio: {item.precio}</span>
                                    <Button handleClick={() => handleClickAddDetail(item)}>Agregar a compra</Button>
                                </Row>
                            ))}
                        </List>
                    </div>
                    <div className="list_menu">
                        <h3>Paquetes a comprar</h3>
                        <List maxHeight={500}>
                            {auxDetailPackageTransaction.map((item) => (
                                <Row key={item.idPaquete}>
                                    <span>ID Paquete: {item.idPaquete}</span>
                                    <span>Nombre: {item.nombre}</span>
                                    <span>Precio: {item.precioDetalle}</span>
                                    <span>Unidades: <input type="number" value={item.unidades} onChange={(e) => handleUnitsTouristPackage(e, item.idPaquete)} /></span>
                                    <Button handleClick={() => handleClickRemoveDetail(item)}>Quitar de compra</Button>
                                </Row>
                            ))}
                        </List>
                    </div>
                </div>
                <label className="total_price">Valor Total: ${valorTotal}</label>
                <SubmitButton>Comprar</SubmitButton>
            </Form>
            <div className="list_transaction">
                <h3>Compras</h3>
                <List maxHeight={500}>
                    {purchaseTouristPackageList.map((item) => (
                        <Row key={item.idCompra}>
                            <span>ID Compra: {item.idCompra}</span>
                            <span>ID Cliente: {item.idCliente}</span>
                            <span>Fecha Compra: {item.fechaCompra}</span>
                            <span>Fecha Requerida: {item.fechaRequerida}</span>
                            <span>Valor total: ${item.valorTotal}</span>
                            <span>ID Estado: {item.idEstadoCompra}</span>
                        </Row>
                    ))}
                </List>
            </div >
        </div>
    )
}

export default PurchaseTouristPackage