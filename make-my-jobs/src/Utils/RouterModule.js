import React from 'react'
import {
    BrowserRouter as Router, Switch, Route
} from "react-router-dom";
import Home from '../Components/Home/Home';
import Signup from '../Components/Account/Signup';
import Login from '../Components/Account/Login';
import PageNotFound from '../Components/PageNotFound';

function RouterModule() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/signup" component={Signup}></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route exact path="/" component={Home}></Route>
                    <Route component={PageNotFound}></Route>
                </Switch>
            </div>
        </Router>
    )
}

export default RouterModule

