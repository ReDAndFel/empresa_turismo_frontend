import { useState } from "react"

export const useCarTransaction = () => {
    const [unitsCar, setUnitsCar] = useState({})
    const carReservationDTO = {
        idReserva: 0,
        idCliente: 0,
        idAgencia: 0,
        fechaInicio: "",
        fechaFinal: "",
        estado: true,
        valorTotal:0,
        carReservationDetail:[]
    }

    const [carReservation, setCarReservation] = useState(carReservationDTO)
    const [carReservationList, setCarReservationList] = useState([
        {
            idReserva: 1,
            idCliente: 1,
            idAgencia: 1,
            fechaInicio: "2023-10-10",
            fechaFinal: "2023-10-11",
            estado: true,
            valorTotal:500
        },
        {
            idReserva: 2,
            idCliente: 2,
            idAgencia: 1,
            fechaInicio: "2023-11-10",
            fechaFinal: "2023-11-11",
            estado: true,
            valorTotal:600
        }
    ])
    const [auxDetailCarReservation, setAuxDetailCarReservation] = useState([])

    const [detailCarReservation, setDetailCarReservation] = useState([])

    const addDetail = (item) => {
        const { idAutomovil, placa, precio } = item;

        const newDetail = {
            idAutomovil,
            placa,
            precio,
            unidades: 1,
            seguro: false,
            gps: false,
            estado: true,
            precioDetalle: precio
        };

        const listAux = [...auxDetailCarReservation];
        !listAux.some(detail => detail.idAutomovil === newDetail.idAutomovil) && setAuxDetailCarReservation([...listAux, newDetail]);
    }

    const removeDetail = (item) => {
        const listAux = auxDetailCarReservation.filter((itemAux) => itemAux !== item)
        setAuxDetailCarReservation(listAux)
    }

    const createReservation = (form) => {
        alert("Reserva creada")
        console.log(form)
    }

    const handleDetail = (event, carId) => {
        const newUnits = { ...unitsCar };
        newUnits[carId] = units;

        const updatedAuxDetails = auxDetailCarReservation.map(detail => {
            if (detail.idAutomovil === carId) {
                const unidades = newUnits[carId];
                const precioDetalle = unidades * detail.precio
                return { ...detail, unidades, precioDetalle }
            }
            return detail;
        });

        setUnitsCar(newUnits);
        setAuxDetailCarReservation(updatedAuxDetails)
    }

    return { carReservationList, carReservation, auxDetailCarReservation, setAuxDetailCarReservation,handleDetail, addDetail, removeDetail, createReservation, detailCarReservation }
}