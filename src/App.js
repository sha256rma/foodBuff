import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
 
import Main from './Main';
import Admin from './Admin';
import Error from './Error';
import MapContainer from '../src/components/delivery/MapContainer'
 
class App extends Component {
  render() {
    return (      
       <BrowserRouter>
        <div>
            <Switch>
             <Route path="/" component={Main} exact/>
             <Route path="/admin" component={Admin}/>
             <Route path="/delivery" component={MapContainer}/>
            <Route component={Error}/>
           </Switch>
        </div> 
      </BrowserRouter>
    );
  }
}
 
export default App;