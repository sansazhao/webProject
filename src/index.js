import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
//import { Router, Route} from 'react-router';
//import { HashRouter,BrowserRouter} from 'react-router-dom';




ReactDOM.render(<App />, document.getElementById('root'));
//ReactDOM.render(<Sider1 />, document.getElementById('menu'));
//ReactDOM.render(<LoginForm />, document.getElementById('example'));
registerServiceWorker();
