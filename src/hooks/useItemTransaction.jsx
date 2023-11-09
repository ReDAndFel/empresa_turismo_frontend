import { useState } from "react"

export const useItemTransaction = () => {

    const [unitsItem, setUnitsItem] = useState({})

    const itemTransactionDTO = {
        idCompra: 0,
        idCliente: 0,
        fecha: "",
        estado: true,
        valorTotal: 0,
        itemTransactionDetail: []
    }

    const [itemTransaction, setItemTransaction] = useState(itemTransactionDTO)
    const [itemTransactionList, setItemTransactionList] = useState([
        {
            idCompra: 1,
            idCliente: 1,
            fecha: "2023-10-10",
            estado: true,
            valorTotal: 10,
        },
        {
            idCompra: 2,
            idCliente: 2,
            fecha: "2023-10-02",
            estado: true,
            valorTotal: 30,
        },
        {
            idCompra: 3,
            idCliente: 3,
            fecha: "2023-10-04",
            estado: true,
            valorTotal: 55,
        }
    ])
    const [auxDetailItemTransaction, setAuxDetailItemTransaction] = useState([])

    const [detailItemTransaction, setDetailItemTransaction] = useState([])

    const addDetail = (item) => {
        const { idArticulo, precio } = item;

        const newDetail = {
            idArticulo,
            precio,
            unidades: 1,
            precioDetalle: precio
        };

        const listAux = [...auxDetailItemTransaction];
        !listAux.some(detail => detail.idArticulo === newDetail.idArticulo) && setAuxDetailItemTransaction([...listAux, newDetail]);
    }

    const removeDetail = (item) => {
        const listAux = auxDetailItemTransaction.filter((itemAux) => itemAux !== item)
        setAuxDetailItemTransaction(listAux)
    }

    const createTransaction = (form) => {
        alert("Compra creada")
        console.log(form)
    }

    const handleUnitsDetail = (units, itemId) => {
        const newUnits = { ...unitsItem };
        newUnits[itemId] = units;

        const updatedAuxDetails = auxDetailItemTransaction.map(detail => {
            if (detail.idArticulo === itemId) {
                const unidades = newUnits[itemId];
                const precioDetalle = unidades * detail.precio
                return { ...detail, unidades, precioDetalle }
            }
            return detail;
        });

        setUnitsItem(newUnits);
        setAuxDetailItemTransaction(updatedAuxDetails)

    }

    

    return { itemTransaction, itemTransactionList, auxDetailItemTransaction,setAuxDetailItemTransaction, addDetail, removeDetail, createTransaction, handleUnitsDetail }
}