import React, { Fragment } from 'react';

import { Navbar } from './components/navbar/Navbar';
import { Menu } from './components/menu/Menu';


//React Hooks
import { GoogleAuthentication } from './hooks/GoogleAuthentication'
import { useOpenFood } from './hooks/useOpenFood'

const App = () => {

  const authentication = GoogleAuthentication();
  const openFood = useOpenFood();
  
  return (
    
    <Fragment>

      <Navbar {...authentication} />
      <Menu {...openFood} />

    </Fragment>

  );

}

export default App;