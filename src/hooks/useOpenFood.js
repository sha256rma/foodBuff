import { useState } from 'react'

export const useOpenFood = () => {
    const [openFood, setOpenFood] = useState();
    return {
        openFood,
        setOpenFood
    }
}