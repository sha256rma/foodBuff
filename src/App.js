import React, { Fragment } from 'react';

import { Navbar } from './components/navbar/Navbar';
import { Menu } from './components/menu/Menu';
import { FoodDialog } from './components/foodDialog/FoodDialog';


//React Hooks
import { GoogleAuthentication } from './hooks/GoogleAuthentication'
import { useFoodDialog } from './hooks/useFoodDialog'
import { useOrders } from './hooks/useOrders'

const App = () => {

  const authentication = GoogleAuthentication();
  const foodDialog = useFoodDialog();
  const orders = useOrders();
  
  return (
    
    <Fragment>

      <Navbar {...authentication} />
      <Menu {...foodDialog} />
      <FoodDialog {...foodDialog} {...orders} />

    </Fragment>

  );

}

export default App;