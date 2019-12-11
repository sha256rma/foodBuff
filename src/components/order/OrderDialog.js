import React from 'react';
import {Dialog, DialogContent, DialogShadow, DialogFooter, ConfirmButton} from '../foodDialog/FoodDialog-Style';
import Rating from 'react-rating';
import { database } from '../../firebase';

export function OrderDialog({openOrderDialog, setOpenOrderDialog, setOrders}){
  return openOrderDialog ? <>
    <DialogShadow/>
    <Dialog>
      <DialogContent>
        <h2>Your order is on the way! </h2>
        <p>
          Please use the below form to rate the cook and delivery person:
        </p>
        <p>Delivery Person</p><Rating onClick={ (value) =>  database.ref(`ratings/customer`).push({rating: value}) }/>
        <p>Cook</p><Rating onClick={ (value) =>  database.ref(`ratings/customer`).push({rating: value}) }/>
        <p>Complaint Delivery</p><input/>
        <p>Complaint Cook</p><input/>
      </DialogContent>
      <DialogFooter>
        <ConfirmButton onClick={() => {
          setOrders([]);
          setOpenOrderDialog();
        }}>
          Close
        </ConfirmButton>
      </DialogFooter>
    </Dialog>
  </> : <div/>
}
