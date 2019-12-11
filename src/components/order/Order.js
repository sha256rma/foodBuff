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
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import Speech from 'react-speech';

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

const sendOrder = (description, total, orders, { email, displayName }) => {
  
  var orderDate = Date.now();
  var orderStatus = "Pending";
  var deliveryStatus = "Bidding Not Started";
  var cook = "Not Assigned";
  var customerName = displayName;
  var customerEmail = email;
  var orderTotal = total;

  var customerAddress = description;

  const newOrderRef = database.ref("orders").push();

  const newOrders = orders.map(order => {
    return Object.keys(order).reduce((acc, orderKey) => {
      if (!order[orderKey]) {
        // undefined value
        return acc;
      }
      return {
        ...acc,
        [orderKey]: order[orderKey]
      };
    }, {});
  });
  newOrderRef.set({
    customerOrder: newOrders,
    customerEmail,
    customerName,
    customerAddress,
    orderDate,
    orderTotal,
    orderStatus,
    deliveryStatus,
    cook    
  });
}

const Rating = (loggedIn) => {

  if (loggedIn) {

    //Registered Customer
    if (loggedIn.userType === "Registered_User") {
      if (loggedIn.orders.length > 3) {
        
        //average rating >4 is automatically promoted to a VIP
        if (loggedIn.AverageRating > 4.0) {
          database.ref(`users/${loggedIn.userID}`).update({userType: "VIP" });
        }

        //average rating <2 but >1 is demoted to a visitor
        if (loggedIn.AverageRating < 2.0 && loggedIn.AverageRating > 1.0) {
          database.ref(`users/${loggedIn.userID}`).update({userType: "Visitor" });
        }

        //average rating is 1 then the customer is put in the customer blacklist who can never be a registered user
        if (loggedIn.AverageRating < 2.0 && loggedIn.AverageRating === 1.0) {
          database.ref(`users/${loggedIn.userID}`).update({userType: "BLACKLISTED" });
        }
      }
    }

    //Delivery Person
    if (loggedIn.userType === "Delivery_person") {
      if (loggedIn.orders.length > 3) {
        
        //average rating <2 for the last 3 deliveries will receive a warning
        if (loggedIn.Rating.slice(-1)[0,1,2] < 2.0 ) {
          database.ref(`deliveryPerson/${loggedIn.userID}`).update({warning: 1 });
        }

        //more than 3 warnings will be laid off
        if (loggedIn.warnings >= 3) {
          database.ref(`deliveryPerson/${loggedIn.userID}`).update({userType: "LAID_OFF" });
        }
      }
    }

    //Food Item
    if ("foodItem".rating.slice(-1)[0,1,2] < 2) {
      database.ref("food/${foodItem}").delete();
    }

    //Salesperson
    if (loggedIn.userType === "Salesperson") {
        
      //received 3 straight 5’s will receive 10% raise
      if (loggedIn.Ratings.slice(-1)[0,1,2] === 5.0) {
        database.ref(`salesperson/${loggedIn.userID}`).update({salary: "salary*1.10"});
      }

      //complained by cooks 3 times, this sales person will receive 10% commission reduction
      if (loggedIn.complaints.length >= 3) {
        database.ref(`salesperson/${loggedIn.userID}`).update({salary: "salary*0.90"});
        
        database.ref(`salesperson/${loggedIn.userID}`).update({warning: 1 });
      }

      //average rating is 1 then the customer is put in the customer blacklist who can never be a registered user
      if (loggedIn.warnings >= 3) {
        database.ref(`salesperson/${loggedIn.userID}`).update({userType: "LAID_OFF" });
      }
    }

  }

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
                <div>Sales tax:</div>
                <div>{intToUSD(tax)}</div>
              </OrderItem>

              <OrderItem>
                <div>Total:</div>
                <div>{intToUSD(total)}</div>
                <Speech text={intToUSD(total)} />
              </OrderItem>

            </OrderContainer>

            <GooglePlacesAutocomplete
              onSelect={({ description }) => (
                sendOrder(description, total, orders, loggedIn)
              )}
            />
          </OrderContent>
      
      
      
      }
      {orders.length > 0 && <DialogFooter>
        <ConfirmButton 
          onClick={() => {
            if (loggedIn) {
              setOpenOrderDialog(true);
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