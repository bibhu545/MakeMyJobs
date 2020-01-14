import React, { Component } from 'react'
import StudentSideBar from '../Student/StudentSideBar'
import HttpService from '../../../Utils/HttpServices';
import Utils from '../../../Utils/Utils';
import { ProffessionalModel } from '../../../Utils/Models';

export class ProffesionalHome extends Component {
    constructor(props) {
        super(props);
        this.http = new HttpService();
        this.userInfoFromCookies = new Utils().getUserInfoFromCookies();
        this.utils = new Utils()
        this.state = {
            userType: new Utils().getUserTypeFromCookies(),
            user: new ProffessionalModel(),
            appliedJobs: []
        }
    }

    componentDidMount() {
        if (!this.utils.isLoggedIn()) {
            window.location = '/login';
        }
        else {
            this.http.postData('http://makemyjobs.me/Corporate/GetApplications?id=' + this.userInfoFromCookies.userId).then(
                response => {
                    if (response.data.results == null) {
                        window.location = '/login';
                    }
                    else {
                        this.setState({
                            appliedJobs: response.data.results[0]
                        })
                    }
                }).catch(error => {
                    console.log(error);
                });
        }
    }
    
    render() {
        const { appliedJobs } = this.state;
        return (
            <React.Fragment>
                <div className='container gradient-container'>
                    <div className='row student-home-wrapper'>
                        <div className='col-md-8 col-xs-12'>
                            <h3 className='center-content'>- My DashBoard -</h3>
                            <div className='center-content'>
                                <h4>You have not applied to any jobs yet.</h4>
                                <p>Please complete your profile <a href='/edit-profile'>here</a> to get more personalized jobs.</p>
                            </div>
                            <h4>Jobs you have applied for:</h4>
                            {
                                appliedJobs.length === 0 ? null :
                                    appliedJobs.map((item, index) =>
                                        <React.Fragment key={index}>
                                            <a target='_blank' rel='noopener noreferrer' className='job-link' href={'/job-description?id=' + item.jobDetails.jobId}>
                                                <div className='job-desc-user job-desc'>
                                                    <div className='row'>
                                                        <div className='col-xs-10'>
                                                            <h4>{item.jobDetails.jobTitle}</h4>
                                                            <p>{item.jobDetails.company}</p>

                                                            <p>
                                                                <i className="fas fa-map-marked"></i>Locations:
                                                        {item.jobDetails.locationNames == null ? <span>Not specified</span> : item.jobDetails.locationNames}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className='row'>
                                                        <div className='col-sm-5'>
                                                            <i className="fas fa-suitcase"></i>Experience: {item.jobDetails.experience} yrs
                                            </div>
                                                        <div className='col-sm-7'>
                                                            <i className="fas fa-rupee-sign"></i>
                                                            Salary: {item.jobDetails.minSalary}
                                                        </div>
                                                    </div>
                                                    <div className='row'>
                                                        <div className='col-sm-5'>
                                                            {
                                                                item.jobDetails.skillNames == null ? null :
                                                                    <span>
                                                                        <i className="fas fa-laptop-code"></i>
                                                                        Skills: {item.jobDetails.skillNames}
                                                                    </span>
                                                            }
                                                        </div>
                                                        <div className='col-sm-7'>
                                                            {
                                                                item.jobDetails.tagNames == null ? null :
                                                                    <span>
                                                                        <i className="fas fa-tags"></i>
                                                                        Tags: {item.jobDetails.tagNames}
                                                                    </span>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className='row'>
                                                        <div className='col-sm-5'>
                                                            <i className="fas fa-calendar-week"></i>
                                                            Posted on: {this.utils.GetDateFromServer(item.jobDetails.postedOn)}
                                                        </div>
                                                        <div className='col-sm-7'>
                                                            <i className="fas fa-calendar-week"></i>
                                                            Expiry date: {this.utils.GetDateFromServer(item.jobDetails.expiryDate)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </React.Fragment>
                                    )
                            }
                        </div>
                        <StudentSideBar user={this.userInfoFromCookies}></StudentSideBar>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ProffesionalHome
