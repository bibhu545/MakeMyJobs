import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap-theme.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import 'jquery/src/jquery';
import 'bootstrap/dist/js/bootstrap.min.js';
import RouterModule from './Utils/RouterModule.js';
import Navbar from './Components/Common/Navbar';
import Footer from './Components/Common/Footer';
import Preloader from './Utils/Preloader';

ReactDOM.render(
    <React.Fragment>
        <Preloader></Preloader>
        <Navbar></Navbar>
        <RouterModule />
        <Footer></Footer>
    </React.Fragment>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
