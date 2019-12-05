import React from 'react'
import {
    BrowserRouter as Router, Switch, Route
} from "react-router-dom";
import Home from '../Components/Home/Home';
import Signup from '../Components/Account/Signup';
import Login from '../Components/Account/Login';
import PageNotFound from '../Components/PageNotFound';
import Jobs from '../Components/Jobs/Jobs';
import Internships from '../Components/Internships/Internships';
import SearchResult from '../Components/SearchResult';
import AddJob from '../Components/Jobs/AddJob';
import AddInternship from '../Components/Internships/AddInternship';
import JobDescription from '../Components/Jobs/JobDescription';
import InternshipDescription from '../Components/Internships/InternshipDescription';
import UserHome from '../Components/Users/UserHome';
import UserProfile from '../Components/Users/UserProfile';
import UserEditProfile from '../Components/Users/UserEditProfile';

function RouterModule() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/jobs" component={Jobs}></Route>
                    <Route path="/internships" component={Internships}></Route>
                    <Route path="/search" component={SearchResult}></Route>
                    <Route path="/add-job" component={AddJob}></Route>
                    <Route path="/job-description" component={JobDescription}></Route>
                    <Route path="/add-internship" component={AddInternship}></Route>
                    <Route path="/internship-description" component={InternshipDescription}></Route>
                    <Route path="/signup" component={Signup}></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/user-home" component={UserHome}></Route>
                    <Route path="/my-profile" component={UserProfile}></Route>
                    <Route path="/edit-profile" component={UserEditProfile}></Route>
                    <Route exact path="/" component={Home}></Route>
                    <Route component={PageNotFound}></Route>
                </Switch>
            </div>
        </Router>
    )
}

export default RouterModule

