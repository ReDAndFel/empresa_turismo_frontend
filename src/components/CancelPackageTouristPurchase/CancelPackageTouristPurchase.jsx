import './CancelPackageTouristPurchase.css'
import Form from "../Form/Form"
import List from "../List/List"
import Button from "../Button/Button"
import SubmitButton from "../SubmitButton/SubmitButton"
import Row from "../Row/Row"
import { useState } from "react"
import { useForm } from "../../hooks/useForm"
import { useTouristPackageTransaction } from "../../hooks/useTouristPackageTransaction"
import Modal from '../Modal/Modal'

const CancelPackageTouristPurchase = () => {

    const { purchaseTouristPackageList, cancelPurchaseTouristPackageList, cancelPurchase, cancelPurchaseTouristPackage } = useTouristPackageTransaction()
    const { form, handleChange, cleanForm } = useForm(cancelPurchaseTouristPackage)
    const [stateModal, setStateModal] = useState(false)
    const [stateItemModal, setStateItemModal] = useState(false)
    const [selectedPurchase, setSelectedPurchase] = useState()
    const [selectedItem, setSelectedItem] = useState()

    const handleSubmit = (e) => {
        e.preventDefault()
        cancelPurchase({ ...form, idCompraPaquete: selectedPurchase });
        cleanForm()
    }

    const handleModal = (idCompra) => {
        setStateModal(true)
        setSelectedPurchase(idCompra)
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
        <div className="cancel_purchase_tourist_package_container">
            <h1>Cancelar compra de paquetes turísticos</h1>
            <div className="list_purchase_tourist_package">
                <h3>Compras de paquete</h3>
                <List maxHeight={500}>
                    {purchaseTouristPackageList.map((item) => (
                        <Row key={item.idCompra}>
                            <span>ID Compra: {item.idCompra}</span>
                            <span>ID Cliente: {item.idCliente}</span>
                            <span>Fecha Compra: {item.fechaCompra}</span>
                            <span>Fecha Requerida: {item.fechaRequerida}</span>
                            <span>Valor total: ${item.valorTotal}</span>
                            {item.idEstadoCompra !== 2 && <Button handleClick={() => handleModal(item.idCompra)}>Cancelar</Button>}
                            <Button handleClick={() => handleClickItem(item)}>Ver Info</Button>
                        </Row>
                    ))}
                </List>
            </div >

            <div className="list_cancel_purchase_tourist_package">
                <h3>Cancelaciones de compras</h3>
                <List maxHeight={500}>
                    {cancelPurchaseTouristPackageList.map((item) => (
                        <Row key={item.idCompra}>
                            <span>ID Compra: {item.idCompra}</span>
                            <span>Fecha: {item.fecha}</span>
                            <span>Costo: ${item.costo}</span>
                            <Button handleClick={() => handleClickItem(item)}>Ver Info</Button>
                        </Row>
                    ))}
                </List>
            </div >
            <Modal title={"Cancelacion de Compra"} state={stateModal} setState={setStateModal} handleClose={handleClose}>
                <Form handleSubmit={handleSubmit}>
                    <div className="text_field_container">
                        <label>Motivo:</label>
                        <input className="text_field" type="text" name="motivo" value={form.motivo} onChange={handleChange} />
                    </div>
                    <SubmitButton>Cancelar compra</SubmitButton>
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

export default CancelPackageTouristPurchase