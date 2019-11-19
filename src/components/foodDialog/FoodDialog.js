import React from 'react';
import { intToUSD } from '../common/intToUSD';
import { SetQuantity } from './SetQuantity';
import { Choices } from "./Choices";
import { Dialog, DialogShadow, DialogBanner, DialogBannerName, DialogContent, DialogFooter, ConfirmButton } from './FoodDialog-Style';

//hooks
import { useQuantity } from "../../hooks/useQuantity";
import { useChoice } from "../../hooks/useChoices";

export const getPrice = (order) => order.quantity * order.price;

export const FoodDialogContainer  = ({ openPopup, setPopup, setOrders, orders }) => {

    const quantity = useQuantity(openPopup && openPopup.quantity);
    const choiceRadio = useChoice(openPopup.choice);
    const isEditing = openPopup.index > -1;

    const close = () => setPopup();

    if (!openPopup) return null;

    const order = {
        ...openPopup,
        quantity: quantity.value,
        choice: choiceRadio.value
    }


  const editOrder = () => {
    const newOrders = [...orders];
    newOrders[openPopup.index] = order;
    setOrders(newOrders);
    close();
  }

    const addToOrder = () => {
        setOrders([...orders, order]);
        close();
    }

   

    return (openPopup ? (
        <React.Fragment>
            <Dialog>
                <DialogBanner img={openPopup.img}>
                    <DialogBannerName> {openPopup.name} </DialogBannerName>
                </DialogBanner>
                <DialogContent>
                    <SetQuantity quantity={quantity}/>
                    {openPopup.choices && (
                        <Choices openPopup={openPopup} choiceRadio={choiceRadio} />
                    )}
                </DialogContent>
                <DialogFooter>
                    <ConfirmButton
                        onClick={isEditing ? editOrder : addToOrder}
                        disabled={openPopup.choices && !choiceRadio.value}
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
    if (!props.openPopup) return null;
    return <FoodDialogContainer {...props} /> 
}