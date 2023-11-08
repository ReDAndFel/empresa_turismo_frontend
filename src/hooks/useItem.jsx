import { useState } from "react"

export const useItem = () => {

    const itemDTO = {
        idArticulo: 0,
        idTipo: 0,
        estado: true,
        nombre: "",
        precio: 0
    }

    const [item, setItem] = useState(itemDTO)
    const [itemList, setItemList] = useState([
        {
            idArticulo: 1,
            idTipo: 1,
            estado: true,
            nombre: "Camara digital",
            precio: 300
        },
        {
            idArticulo: 2,
            idTipo: 1,
            estado: true,
            nombre: "Radio",
            precio: 250
        },
        {
            idArticulo: 3,
            idTipo: 2,
            estado: true,
            nombre: "Equipo Alpinismo",
            precio: 400
        }
    ])

    return {itemList}
}