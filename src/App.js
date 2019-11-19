import React, { Fragment } from 'react';

import { Navbar } from './components/navbar/Navbar';
import { Menu } from './components/menu/Menu';

import { FoodDialog } from './components/foodDialog/FoodDialog';
import { Order } from './components/order/Order';
import { OrderDialog } from './components/order/OrderDialog'


//React Hooks
import { GoogleAuthentication } from './hooks/GoogleAuthentication'
import { FoodPopup } from './hooks/FoodPopup'

import { useOrders } from './hooks/useOrders'
import { useOrderDialog } from './hooks/useOrderDialog'

const App = () => {

  const authentication = GoogleAuthentication();
  const foodDialog = FoodPopup();
  const orders = useOrders();

  const orderDialog = useOrderDialog();
  
  return (
    
    <Fragment>

      <Navbar {...authentication} />
      <Menu {...foodDialog} {...authentication} />
      <FoodDialog {...foodDialog} {...orders} />
      <OrderDialog {...orderDialog} {...orders} />
      <Order {...orders} {...foodDialog} {...authentication} {...orderDialog} />

    </Fragment>

  );

}

export default App;