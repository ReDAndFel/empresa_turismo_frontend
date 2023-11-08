import { useState } from "react"

export const useItemTransaction = () => {

    const itemTransactionDTO = {
        
        
    }

    const [itemTransaction, setItemTransaction] = useState(itemTransactionDTO)
    const [itemTransactionList, setItemTransactionList] = useState([
        {
            
        }
    ])

    return {itemTransactionList}
}