import { useState } from "react"

export const useClient = () => {

    const clientDTO = {
        idCliente: 0,
        telefono: 0,
        estado: true,
        nombre: "",
        apellido: "",
        correo: ""

    }

    const [client, setClient] = useState(clientDTO)
    const [clientList, setClientList] = useState([
        {
            idCliente: 1,
            telefono: 32345601923,
            estado: true,
            nombre: "Andres",
            apellido: "Castro",
            correo: "andres@gmail.com"
        },
        {
            idCliente: 2,
            telefono: 31045623923,
            estado: true,
            nombre: "Mauricio",
            apellido: "Burgos",
            correo: "mauricio@gmail.com"
        },
        {
            idCliente: 3,
            telefono: 3207893123,
            estado: true,
            nombre: "Laura",
            apellido: "Lopez",
            correo: "laura@gmail.com"
        }
    ])

    return { clientList }
}