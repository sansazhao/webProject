import React from 'react';
import LoginPage from './log/LoginPage';
import RegisPage from './log/RegisPage';
import UserPage from './UserPage';
import Order from './function/Order';
import Setting from './function/Setting';
import AdmisPage from './admin/AdmisPage';
import HomePage from './HomePage';
import BookList from './function/Cart';
import '../css/App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import {Switch} from "react-router";
import PropTypes from 'prop-types'
import createStore from './store/store'
import themeReducer from './store/reducer'
import CartTable from "./function/Cart";
import userManagement from "./admin/userManagement";
import sale from "./admin/sale";
import errorPage from "./ErrorPage";
import OrderDetail from "./function/OrDetail";

const store = createStore(themeReducer)

class App extends React.Component {
    static childContextTypes = {
        store: PropTypes.object
    };

    getChildContext () {
        return { store }
    }

    render(){
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/login" component={LoginPage} />
                        <Route exact path="/regis" component={RegisPage} />
                        <Route exact path="/" component={HomePage} />
                        <Route exact path="/user"  component={UserPage} />
                        <Route exact path="/admin"  component={AdmisPage} />
                        <Route exact path="/userManagement" component={userManagement} />
                        <Route exact path="/order"component={Order} />
                        <Route exact path="/detail"component={OrderDetail} />
                        <Route exact path="/cart" component={CartTable} />
                        <Route path="/booklist" component={BookList} />
                        <Route path="/sale" component={sale} />
                        <Route exact path="/setting" component={Setting}/>
                        <Route exact path="/error" component={errorPage} />
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App;
