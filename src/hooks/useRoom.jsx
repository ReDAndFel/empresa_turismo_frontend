import { useState } from "react"

export const useRoom = () => {

    const roomDTO = {
        idHabitacion: 0,
        idHotel: 0,
        idNivel: 0,
        cantidad: 0,
        estado: true,
        precioNoche: 0
    }

    const [room, setRoom] = useState(roomDTO)
    const [roomList, setRoomList] = useState([
        {
            idHabitacion: 1,
            idHotel: 1,
            idNivel: 1,
            cantidad: 10,
            estado: true,
            precioNoche: 10
        },
        {
            idHabitacion: 2,
            idHotel: 1,
            idNivel: 2,
            cantidad: 10,
            estado: true,
            precioNoche: 20
        },
        {
            idHabitacion: 3,
            idHotel: 2,
            idNivel: 1,
            cantidad: 6,
            estado: true,
            precioNoche: 5
        }
    ])

    const [roomReservationList, setRoomReservationList] = useState([

    ])
   


    return { roomList }
}