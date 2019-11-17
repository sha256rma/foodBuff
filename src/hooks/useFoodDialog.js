import { useState } from 'react'

export const useFoodDialog = () => {
    const [openFoodDialog, setFoodDialog] = useState();
    return {
        openFoodDialog,
        setFoodDialog
    }
}