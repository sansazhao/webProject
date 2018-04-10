import React from 'react';
import LoginPage from './LoginPage';
import RegisPage from './RegisPage';
import HomePage from './HomePage';
import Order from './Order';
import Setting from './Setting';
import AdmisPage from './admin/AdmisPage';
//import HomePage from './HomePage';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import {Switch} from "react-router";


class App extends React.Component {
    render(){
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/login" component={LoginPage}/>
                        <Route exact path="/regis" component={RegisPage}/>
                        <Route exact path="/" component={HomePage}/>
                        <Route exact path="/admis" component={AdmisPage}/>
                        <Route exact path="/order" component={Order}/>
                        <Route exact path="/setting" component={Setting}/>
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App;
