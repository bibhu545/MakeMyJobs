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
import ChangePassword from '../Components/Users/ChangePassword';
import MyJobs from '../Components/Users/Corporate/MyJobs';
import MyInternships from '../Components/Users/Corporate/MyInternships';
import EditJob from '../Components/Jobs/EditJob';
import EditInternship from '../Components/Internships/EditInternship';
import ApplyJob from '../Components/Jobs/ApplyJob';
import ViewApplicants from '../Components/Users/Corporate/ViewApplicants';
import DownloadResume from '../Components/Users/Corporate/DownloadResume';
import ApplyInternship from '../Components/Internships/ApplyInternship';
import CorporateHome2 from '../Components/Users/Corporate/CorporateHome2';

function RouterModule() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/jobs" component={Jobs}></Route>
                    <Route path="/internships" component={Internships}></Route>
                    <Route path="/search" component={SearchResult}></Route>
                    <Route path="/add-job" component={AddJob}></Route>
                    <Route path="/edit-job" component={EditJob}></Route>
                    <Route path="/job-description" component={JobDescription}></Route>
                    <Route path="/view-applicants" component={ViewApplicants}></Route>
                    <Route path="/download-resume" component={DownloadResume}></Route>
                    <Route path="/apply-job" component={ApplyJob}></Route>
                    <Route path="/apply-internship" component={ApplyInternship}></Route>
                    <Route path="/add-internship" component={AddInternship}></Route>
                    <Route path="/edit-internship" component={EditInternship}></Route>
                    <Route path="/internship-description" component={InternshipDescription}></Route>
                    <Route path="/signup" component={Signup}></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/user-home" component={UserHome}></Route>
                    <Route path="/home2" component={CorporateHome2}></Route>
                    <Route path="/my-profile" component={UserProfile}></Route>
                    <Route path="/edit-profile" component={UserEditProfile}></Route>
                    <Route path="/my-jobs" component={MyJobs}></Route>
                    <Route path="/my-internships" component={MyInternships}></Route>
                    <Route path="/change-password" component={ChangePassword}></Route>
                    <Route exact path="/" component={Home}></Route>
                    <Route component={PageNotFound}></Route>
                </Switch>
            </div>
        </Router>
    )
}

export default RouterModule

