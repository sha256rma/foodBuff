import { useState } from 'react'

export const FoodPopup = () => {
    const [openPopup, setPopup] = useState();
    return {
        openPopup,
        setPopup
    }
}