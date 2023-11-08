import { useState } from "react"

export const useRoomTransaction = () => {

    const roomReservationDTO = {
        idReserva: 0,
        idCliente: 0,
        idRegimen: 0,
        idAgencia: 0,
        idEstadoReserva: 0,
        fechaInicio: "",
        fechaFinal: "",
        estado:true,
        valorTotal:0
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
            estado:true,
            valorTotal:10
        },
        {
            idReserva: 2,
            idCliente: 2,
            idRegimen: 2,
            idAgencia: 2,
            idEstadoReserva: 1,
            fechaInicio: "2023-11-22",
            fechaFinal: "2023-11-23",
            estado:true,
            valorTotal:20
        },
        {
            idReserva: 3,
            idCliente: 3,
            idRegimen: 3,
            idAgencia: 3,
            idEstadoReserva: 1,
            fechaInicio: "2023-11-24",
            fechaFinal: "2023-11-25",
            estado:true,
            valorTotal:20
        }

    ])

    const [auxDetailRoomReservation, setAuxDetailRoomReservation] = useState([])

    const [detailRoomReservation, setDetailRoomReservation] = useState([])

    return { roomReservationList, auxDetailRoomReservation, detailRoomReservation }
}