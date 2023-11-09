import { useState } from "react"

export const useRegime = () => {

    const regimeDTO = {
        idRegimen: 0,
        descripcion: ""
    }

    const [regime, setRegime] = useState(regimeDTO)
    const [regimeList, setRegimeList] = useState([
        {
            idRegimen: 1,
            descripcion: "Todo incluido"
        },
        {
            idRegimen: 2,
            descripcion: "Solo cena"
        },
        {
            idRegimen: 3,
            descripcion: "Solo almuerzo"
        }
    ])

    return { regimeList }
}