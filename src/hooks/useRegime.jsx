import { useState } from "react"

export const useRegime = () =>{

    const regimeDTO = {

    }

    const [regime, setRegime] = useState(regimeDTO)
    const [regimeList,setRegimeList] = useState([

    ])

    return {regimeList}
}