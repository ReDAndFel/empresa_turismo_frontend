import { useState } from "react"

export const useRoomTransaction = () => {
    const [unitsRoom, setUnitsRoom] = useState({})


    const roomReservationDTO = {
        idReserva: 0,
        idCliente: 0,
        idRegimen: 0,
        idAgencia: 0,
        idEstadoReserva: 0,
        fechaInicio: "",
        fechaFinal: "",
        estado: true,
        valorTotal: 0,
        roomReservationDetail: []
    }

    const [roomReservation, setRoomReservation] = useState(roomReservationDTO)


    const [roomReservationList, setRoomReservationList] = useState([
        {
            idReserva: 1,
            idCliente: 1,
            idRegimen: 1,
            idAgencia: 1,
            idEstadoReserva: 1,
            fechaInicio: "2023-10-22",
            fechaFinal: "2023-10-23",
            estado: true,
            valorTotal: 10
        },
        {
            idReserva: 2,
            idCliente: 2,
            idRegimen: 2,
            idAgencia: 2,
            idEstadoReserva: 1,
            fechaInicio: "2023-11-22",
            fechaFinal: "2023-11-23",
            estado: true,
            valorTotal: 20
        },
        {
            idReserva: 3,
            idCliente: 3,
            idRegimen: 3,
            idAgencia: 3,
            idEstadoReserva: 1,
            fechaInicio: "2023-11-24",
            fechaFinal: "2023-11-25",
            estado: true,
            valorTotal: 20
        }

    ])

    const [auxDetailRoomReservation, setAuxDetailRoomReservation] = useState([])

    const [detailRoomReservation, setDetailRoomReservation] = useState([])

    const addDetail = (item) => {
        const { idHabitacion, precioNoche } = item;

        const newDetail = {
            idHabitacion,
            precioNoche,
            unidades: 1,
            precio: precioNoche,
        };

        const listAux = [...auxDetailRoomReservation];
        !listAux.some(detail => detail.idHabitacion === newDetail.idHabitacion) && setAuxDetailRoomReservation([...listAux, newDetail]);
    }

    const removeDetail = (item) => {
        const listAux = auxDetailRoomReservation.filter((itemAux) => itemAux !== item)
        setAuxDetailRoomReservation(listAux)
    }

    const createReservation = (form) => {
        alert("Reserva creada")
        console.log(form)
    }

    const handleUnitsDetail = (units, roomId) => {
        const newUnits = { ...unitsRoom };
        newUnits[roomId] = units;

        const updatedAuxDetails = auxDetailRoomReservation.map(detail => {
            if (detail.idHabitacion === roomId) {
                const unidades = newUnits[roomId];
                const precio = unidades * detail.precioNoche
                return { ...detail, unidades, precio }
            }
            return detail;
        });

        setUnitsRoom(newUnits);
        setAuxDetailRoomReservation(updatedAuxDetails)

    }

    return { roomReservationList, roomReservation, auxDetailRoomReservation,unitsRoom, setAuxDetailRoomReservation,handleUnitsDetail, addDetail, removeDetail, createReservation, detailRoomReservation }
}