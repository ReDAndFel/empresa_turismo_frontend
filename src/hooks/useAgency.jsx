import { useState } from "react"

export const useAgency = () => {

    const agencyDTO = {
        idAgencia: 0,
        nombre: "",
        estado: true
    }

    const [agency, setAgency] = useState(agencyDTO)
    const [agencyList, setAgencyList] = useState([
        {
            idAgencia: 1,
            nombre: "Turismo YA",
            estado: true
        },
        {
            idAgencia: 2,
            nombre: "Empreturismo",
            estado: true
        },
        {
            idAgencia: 3,
            nombre: "ReservasTurismoSaS",
            estado: true
        }

    ])

    return { agencyList }
}