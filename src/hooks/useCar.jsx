import { useState } from "react"

export const useCar = () => {

    const carDTO = {
        idAutomovil: 0,
        idGama: 0,
        idTipo: 0,
        idMarca: 0,
        estado: true,
        placa: "",
        precio: 0
    }

    const [car, setCar] = useState(carDTO)
    const [carList, setCarList] = useState([
        {
            idAutomovil: 1,
            idGama: 1,
            idTipo: 1,
            idMarca: 1,
            estado: true,
            placa: "ELX42E",
            precio: 500
        },
        {
            idAutomovil: 2,
            idGama: 1,
            idTipo: 1,
            idMarca: 1,
            estado: true,
            placa: "D123E",
            precio: 1000
        },
        {
            idAutomovil: 3,
            idGama: 2,
            idTipo: 2,
            idMarca: 2,
            estado: true,
            placa: "UUR34A",
            precio: 600
        }
    ])

    return {carList}
}