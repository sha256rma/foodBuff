import React, { Fragment } from 'react';

import { Navbar } from './components/navbar/Navbar';

//React Hooks
import { GoogleAuthentication } from './hooks/GoogleAuthentication'

const App = () => {

  const authentication = GoogleAuthentication();
  
  return (
    
    <Fragment>

      <Navbar {...authentication} />

    </Fragment>

  );

}

export default App;