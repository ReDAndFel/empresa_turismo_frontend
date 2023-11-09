import { useState } from "react"

export const useTouristPackage = () => {

    const touristPackageDTO = {
        idPaquete: 0,
        estado: true,
        nombre: "",
        precio: 0
    }

    const [touristPackage, setTouristPackage] = useState(touristPackageDTO)
    const [touristPackageList, setTouristPackageList] = useState([
        {
            idPaquete: 1,
            estado: true,
            nombre: "Ruta turistica Barcelona",
            precio: 10
        },
        {
            idPaquete: 2,
            estado: true,
            nombre: "Ruta turistica Madrid",
            precio: 10
        },
        {
            idPaquete: 3,
            estado: true,
            nombre: "Crucero por San Andrés",
            precio: 100
        }
    ])

    return { touristPackageList }
}