import React, { Component } from 'react'
import HttpService from '../../../Utils/HttpServices';
import { CorporateModel } from '../../../Utils/Models';
import Utils from '../../../Utils/Utils';
import StudentSideBar from '../Student/StudentSideBar';

export class CorporateHome extends Component {
    constructor(props) {
        super(props);
        this.http = new HttpService();
        this.userInfoFromCookies = new Utils().getUserInfoFromCookies();
        this.state = {
            userType: new Utils().getUserTypeFromCookies(),
            user: new CorporateModel()
        }
    }

    componentDidMount() {
        this.http.postData('http://makemyjobs.me/Corporate/GetCorporateInfo?id=' + this.userInfoFromCookies.userId).then(
            response => {
                if (response.data.results == null) {
                    window.location = '/login';
                }
                else {
                    this.setState({
                        user: response.data.results[0]
                    })
                }
            }).catch(error => {
                console.log(error);
            });
    }
    render() {
        return (
            <React.Fragment>
                <div className='container gradient-container'>
                    <div className='row student-home-wrapper'>
                        <div className='col-md-8 col-xs-12 left-content'>
                            <div className='center-content'>
                                <h3>- My DashBoard -</h3>
                                {
                                    this.state.user.corporateJobs.length > 0 || this.state.user.corporateInternships.length > 0 ?
                                        null :
                                        <h4>
                                            You have not posted any jobs
                                            <a href='/add-job'>(add now)</a> or internships
                                            <a href='/add-internship'>(add now)</a> yet.</h4>
                                }
                                <p>Please complete your profile <a href='/edit-profile'>here</a>.</p>
                            </div>
                            <br />
                            {
                                this.state.user.corporateJobs.length === 0 ? null :
                                    <React.Fragment>
                                        <h4>Jobs posted by you: 
                                        <a href='/add-job' className='btn btn-primary float-right'>Add new job</a>
                                        </h4>
                                    </React.Fragment>
                            }
                            <br />
                            {
                                this.state.user.corporateInternships.length === 0 ? null :
                                    <React.Fragment>
                                        <h4>Internships posted by you: 
                                        <a href='/add-internship' className='btn btn-primary float-right'>Add new job</a>
                                        </h4>
                                    </React.Fragment>
                            }
                        </div>
                        <StudentSideBar user={this.userInfoFromCookies}></StudentSideBar>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default CorporateHome
