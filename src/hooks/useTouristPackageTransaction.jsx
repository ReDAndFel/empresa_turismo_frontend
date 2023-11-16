import { useState } from "react"

export const useTouristPackageTransaction = () => {

    const [unitsPackage, setUnitsPackage] = useState({})

    const purchaseTouristPackageDTO = {
        idCompra: 0,
        idCliente: 0,
        idAgencia: 0,
        idEstadoCompra: 0,
        valorTotal: 0,
        fechaCompra: "",
        fechaRequerida: "",
        estado: true,
        purchaseTouristPackageDetail: []
    }

    const cancelPurchaseTouristPackageDTO = {
        idCompraPaquete: 0,
        fecha: "",
        estado: true,
        valor:0,
        motivo: ""
    }

    const [purchaseTouristPackage, setPurchaseTouristPackage] = useState(purchaseTouristPackageDTO)
    const [cancelPurchaseTouristPackage, setCancelPurchaseTouristPackage] = useState(cancelPurchaseTouristPackageDTO)
    const [purchaseTouristPackageList, setPurchaseTouristPackageList] = useState([
        {
            idCompra: 1,
            idCliente: 1,
            idAgencia: 1,
            idEstadoCompra: 2,
            valorTotal: 200,
            fechaCompra: "2023-01-20",
            fechaRequerida: "2023-10-22",
            estado: true
        },
        {
            idCompra: 2,
            idCliente: 2,
            idAgencia: 2,
            idEstadoCompra: 1,
            valorTotal: 500,
            fechaCompra: "2023-02-24",
            fechaRequerida: "2023-12-25",
            estado: true
        }
    ])

    const [cancelPurchaseTouristPackageList, setCancelPurchaseTouristPackageList] = useState([
        {
            idCompraPaquete: 1,
            fecha: "2023-04-15",
            estado: true,
            costo:0,
            motivo: "Ya no quiero el paquete."
        }
    ])

    const [auxDetailPackageTransaction, setAuxDetailPackageTransaction] = useState([])

    const [detailPackageTransaction, setDetailPackageTransaction] = useState([])

    const addDetail = (item) => {
        const { idPaquete, precio } = item;

        const newDetail = {
            idPaquete,
            unidades: 1,
            estado: true,
            precio,
            descuento: 0,
            precioDetalle: precio,
        };

        const listAux = [...auxDetailPackageTransaction];
        !listAux.some(detail => detail.idPaquete === newDetail.idPaquete) && setAuxDetailPackageTransaction([...listAux, newDetail]);
    }

    const removeDetail = (item) => {
        const listAux = auxDetailPackageTransaction.filter((itemAux) => itemAux !== item)
        setAuxDetailPackageTransaction(listAux)
    }

    const createPurchase = (form) => {
        alert("Compra creada")
        console.log(form)
    }

    const cancelPurchase = (form) => {
        alert("Compra de Paquete turistico Cancelada")
        console.log(form)
    }

    const handleUnitsDetail = (units, packageId) => {
        const newUnits = { ...unitsPackage };
        newUnits[packageId] = units;

        const updatedAuxDetails = auxDetailPackageTransaction.map(detail => {
            if (detail.idPaquete === packageId) {
                const unidades = newUnits[packageId]
                const descuento = detail.descuento
                const precioDetalle = (unidades * detail.precio)
                return { ...detail, unidades, descuento, precioDetalle }
            }
            return detail;
        });

        setUnitsPackage(newUnits);
        setAuxDetailPackageTransaction(updatedAuxDetails)

    }

    return { purchaseTouristPackage, purchaseTouristPackageList,cancelPurchaseTouristPackageList, cancelPurchase,cancelPurchaseTouristPackage, auxDetailPackageTransaction, setAuxDetailPackageTransaction, addDetail, removeDetail, createPurchase, cancelPurchase, handleUnitsDetail }
}