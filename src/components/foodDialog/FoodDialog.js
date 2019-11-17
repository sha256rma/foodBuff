import React from 'react';
import { intToUSD } from '../common/intToUSD';
import { Quantity } from './Quantity';
import { Choices } from "./Choices";
import { Dialog, DialogShadow, DialogBanner, DialogBannerName, DialogContent, DialogFooter, ConfirmButton } from './FoodDialog-Style';

//hooks
import { useQuantity } from "../../hooks/useQuantity";
import { useChoice } from "../../hooks/useChoices";

export const getPrice = (order) => order.quantity * order.price;

export const FoodDialogContainer  = ({ openFood, setOpenFood, setOrders, orders }) => {

    const quantity = useQuantity(openFood && openFood.quantity);
    const choiceRadio = useChoice(openFood.choice);
    const isEditing = openFood.index > -1;

    const close = () => setOpenFood();

    if (!openFood) return null;

    const order = {
        ...openFood,
        quantity: quantity.value,
        choice: choiceRadio.value
    }


  const editOrder = () => {
    const newOrders = [...orders];
    newOrders[openFood.index] = order;
    setOrders(newOrders);
    close();
  }

    const addToOrder = () => {
        setOrders([...orders, order]);
        close();
    }

   

    return (openFood ? (
        <React.Fragment>
            <Dialog>
                <DialogBanner img={openFood.img}>
                    <DialogBannerName> {openFood.name} </DialogBannerName>
                </DialogBanner>
                <DialogContent>
                    <Quantity quantity={quantity}/>
                    {openFood.choices && (
                        <Choices openFood={openFood} choiceRadio={choiceRadio} />
                    )}
                </DialogContent>
                <DialogFooter>
                    <ConfirmButton
                        onClick={isEditing ? editOrder : addToOrder}
                        disabled={openFood.choices && !choiceRadio.value}
                    >
                        {isEditing ? `Update order: ` : `Add to order: `}
                        {intToUSD(getPrice(order))}
                    </ConfirmButton>
                </DialogFooter>
               
            </Dialog>
            <DialogShadow onClick={close}/>
        </React.Fragment>
    ) : null
    )
}

export const FoodDialog = (props) =>  {
    if (!props.openFood) return null;
    return <FoodDialogContainer {...props} /> 
}