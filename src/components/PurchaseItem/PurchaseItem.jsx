import "./PurchaseItem.css"
import { useEffect, useState } from "react"
import { useClient } from "../../hooks/useClient"
import { useItem } from "../../hooks/useItem"
import { useItemTransaction } from "../../hooks/useItemTransaction"
import { useForm } from "../../hooks/useForm"
import Form from "../Form/Form"
import ComboBox from "../ComboBox/ComboBox"
import List from "../List/List"
import SubmitButton from "../SubmitButton/SubmitButton"
import Button from "../Button/Button"
import Row from "../Row/Row"
import Modal from "../Modal/Modal"

const PurchaseItem = () => {
    const { clientList } = useClient()
    const [valorTotal, setValorTotal] = useState(0)
    const { itemList } = useItem()
    const { itemTransaction, itemTransactionList, auxDetailItemTransaction, setAuxDetailItemTransaction, addDetail, removeDetail, createTransaction, handleUnitsDetail } = useItemTransaction()
    const { form, handleChange, cleanForm } = useForm(itemTransaction)
    const [selectedItem, setSelectedItem] = useState()
    const [stateItemModal, setStateItemModal] = useState(false)

    const handleClose = () => {
        setStateItemModal(false)
    }

    const handleClickItem = (item) => {
        setStateItemModal(true)
        setSelectedItem(item)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        form.itemTransactionDetail = auxDetailItemTransaction
        form.valorTotal = valorTotal
        createTransaction(form)
        cleanForm()
        setAuxDetailItemTransaction([])
        setValorTotal(0)
    }

    const handleClickAddDetail = (item) => {
        addDetail(item)
    }

    const handleClickRemoveDetail = (item) => {
        removeDetail(item)
    }

    const handleUnitsItem = (e, itemId) => {
        const units = parseInt(e.target.value)
        handleUnitsDetail(units, itemId)
    }

    useEffect(() => {
        const total = auxDetailItemTransaction.reduce((accumulator, item) => {
            return accumulator + (item.precioDetalle);
        }, 0);
        setValorTotal(total);
    }, [auxDetailItemTransaction])

    return (
        <div className="item_transaction_container">
            <h1>Compra de Articulo</h1>
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
                    <label>Fecha:</label>
                    <input className="text_field" type="date" name="fecha" value={form.fecha} onChange={handleChange} />
                </div>
                <div className="list_menu_container">
                    <div className="list_menu">
                        <h3>Articulos</h3>
                        <List maxHeight={300}>
                            {itemList.map((item) => (
                                <Row key={item.idArticulo}>
                                    <span>ID Articulo: {item.idArticulo}</span>
                                    <span>Nombre: {item.nombre}</span>
                                    <span>Precio: {item.precio}</span>
                                    <Button handleClick={() => handleClickItem(item)}>Ver Info</Button>
                                    <Button handleClick={() => handleClickAddDetail(item)}>Agregar a compra</Button>
                                </Row>
                            ))}
                        </List>
                    </div>
                    <div className="list_menu">
                        <h3>Articulos a comprar</h3>
                        <List maxHeight={500}>
                            {auxDetailItemTransaction.map((item) => (
                                <Row key={item.idArticulo}>
                                    <span>ID Articulo: {item.idArticulo}</span>
                                    <span>Nombre: {item.nombre}</span>
                                    <span>Precio: {item.precioDetalle}</span>
                                    <span>Unidades: <input type="number" value={item.unidades} onChange={(e) => handleUnitsItem(e, item.idArticulo)} /></span>
                                    <Button handleClick={() => handleClickItem(item)}>Ver Info</Button>
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
                    {itemTransactionList.map((item) => (
                        <Row key={item.idCompra}>
                            <span>ID Compra: {item.idCompra}</span>
                            <span>ID Cliente: {item.idCliente}</span>
                            <span>Fecha: {item.fecha}</span>
                            <span>Valor total: ${item.valorTotal}</span>
                            <Button handleClick={() => handleClickItem(item)}>Ver Info</Button>
                        </Row>
                    ))}
                </List>
            </div >
            <Modal title={"Informacion"} state={stateItemModal} setState={setStateItemModal} handleClose={handleClose}>
                {selectedItem && Object.entries(selectedItem).map(([key, value]) => (
                    <p key={key}>
                        {key}: {value.toString()}
                    </p>
                ))}
            </Modal>
        </div>
    )
}

export default PurchaseItem