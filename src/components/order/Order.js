import React from 'react';
import styled from 'styled-components';
import {
  DialogContent,
  DialogFooter,
  ConfirmButton
} from '../foodDialog/FoodDialog-Style';
import { intToUSD } from '../common/intToUSD'
import { getPrice } from '../foodDialog/FoodDialog';
import { allResolved } from 'q';
import { database } from '../../firebase'


const OrderStyled = styled.div`
  position: fixed;
  right: 0px;
  top: 0px;
  width: 20%;
  background-color: #FFCC00;
  height: 100%;
  display: flex;
  flex-direction: column;
`


const OrderContent = styled(DialogContent)`
  padding: 20px;
  height: 100%;
`;

const OrderContainer = styled.div`
  padding: 10px 0px;
  border-bottom: 1px solid grey;
`;

const OrderItem = styled.div`
  padding: 10px 0px;
  grid-template-columns: 10px 150px 20px  20px 50px;
  display: flex;
  justify-content: space-between;

`;

const DetailItem = styled.div`
  color: gray;
  font-size: 10px;
`;


const sendOrder = (total, orders, { email, displayName }) => {
  
  var timestamp = Number(new Date());
  var date = new Date(timestamp) ;

  const newOrderRef = database.ref("orders").push();

  const newOrders = orders.map(order => {
    return Object.keys(order).reduce((acc, orderKey) => {
      if (!order[orderKey]) {
        // undefined value
        return acc;
      }
      if (orderKey === "toppings") {
        return {
          ...acc,
          [orderKey]: order[orderKey]
          .filter(({ checked }) => checked)
          .map(({ name }) => name)
        };
      }
      return {
        ...acc,
        [orderKey]: order[orderKey]
      };
    }, {});
  });
  newOrderRef.set({
    order: newOrders,
    email,
    displayName,
    date,
    total
  });
}

export const Order = ({orders, setOrders, setPopup, login, loggedIn, setOpenOrderDialog}) => {

  const subtotal = orders.reduce((total, order) => total + getPrice(order) , 0)
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const deleteItem = index => {
    const newOrders = [...orders];
    newOrders.splice(index, 1);
    setOrders(newOrders);
   
  };

  return (
    <OrderStyled>
      
      { orders.length === 0 
        ? <OrderContent>Looks empty...</OrderContent>
        : <OrderContent>
            {orders.map((order, index) => (
                <OrderContainer key={index+1} editable> 
                    <OrderItem>
                        <div
                          style={{ cursor: "pointer", zIndex:99, pointerEvents:allResolved }}
                          onClick={e => {
                            e.stopPropagation();
                            deleteItem(index);
                          }}
                        >
                          🗑                    ️
                        </div>
                        <div>{order.name}</div>
                        <div>x{order.quantity}</div>
                        <div>{intToUSD(getPrice(order))}</div>
                    </OrderItem>
                    {order.choice && <DetailItem>{order.choice}</DetailItem>}
                </OrderContainer>
                
            ))}
            <OrderContainer> 

              <OrderItem>
                <div>Subtotal:</div>
                <div>{intToUSD(subtotal)}</div>
              </OrderItem>

              <OrderItem>
                <div>Delivery fee:</div>
                <div>{intToUSD(subtotal)}</div>
              </OrderItem>

              <OrderItem>
                <div>Sales tax:</div>
                <div>{intToUSD(tax)}</div>
              </OrderItem>

              <OrderItem>
                <div>Total:</div>
                <div>{intToUSD(total)}</div>
              </OrderItem>

            </OrderContainer>
          </OrderContent>
      
      
      
      }
      {orders.length > 0 && <DialogFooter>
        <ConfirmButton 
          onClick={() => {
            if (loggedIn) {
              setOpenOrderDialog(true);
              sendOrder(total, orders, loggedIn);
            } else {
              login();
            }
          }}
        >
          Checkout
        </ConfirmButton>
      </DialogFooter> }
    </OrderStyled>
  )
}


