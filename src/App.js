import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
 
import Main from './Main';
import Admin from './Admin';
import Error from './Error';
import MapContainer from '../src/components/delivery/MapContainer'
import Homepage from '../src/components/homepage/Homepage'
import Salespeople from './Salespeople';
import Cook from './Cook';
import Salary from './Salary';
 
class App extends Component {
  render() {
    return (      
       <BrowserRouter>
        <div>
            <Switch>
              <Route path="/" component={Main} exact/>
              <Route path="/admin" component={Admin}/>
              <Route path="/delivery" component={MapContainer}/>
              <Route path="/homepage" component={Homepage}/>
              <Route path="/salespeople" component={Salespeople}/>
              <Route path="/cook" component={Cook}/>
              <Route path="/salary" component={Salary}/>
              <Route component={Error}/>
           </Switch>
        </div> 
      </BrowserRouter>
    );
  }
}
 
export default App;