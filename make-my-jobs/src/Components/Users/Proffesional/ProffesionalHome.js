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
            appliedJobs: [],
            appliedInternships: []
        }
    }

    componentDidMount() {
        if (!this.utils.isLoggedIn()) {
            window.location = '/login';
        }
        else {
            this.http.getData('http://makemyjobs.me/Corporate/GetApplications?id=' + this.userInfoFromCookies.userId).then(
                response => {
                    console.log(response)
                    if (response.data.results == null) {
                        window.location = '/login';
                    }
                    else {
                        var responseData = response.data.results[0]
                        this.setState({
                            appliedJobs: responseData.filter(item => item.postDetails.postType === 1),
                            appliedInternships: responseData.filter(item => item.postDetails.postType === 2)
                        })
                    }
                }).catch(error => {
                    console.log(error);
                });
        }
    }

    render() {
        const { appliedJobs, appliedInternships } = this.state;
        console.log(appliedJobs)
        console.log(appliedInternships)
        return (
            <React.Fragment>
                <div className='container gradient-container'>
                    <div className='row student-home-wrapper'>
                        <div className='col-md-8 col-xs-12'>
                            <h3 className='center-content'>- My DashBoard -</h3>
                            <div className='center-content'>
                                {
                                    appliedJobs.length !== 0 ? null :
                                        <h4>You have not applied to any internships yet.</h4>
                                }
                                <p>Please complete your profile <a href='/edit-profile'>here</a> to get more personalized internships.</p>
                                <br />
                            </div>
                            <h4>Jobs you have applied for:</h4>
                            {
                                appliedJobs.length === 0 ? "You have not applied for any jobs." :
                                    appliedJobs.map((item, index) =>
                                        <React.Fragment key={index}>
                                            <a target='_blank' rel='noopener noreferrer' className='job-link' href={'/job-description?id=' + item.postDetails.postId}>
                                                <div className='job-desc-user job-desc'>
                                                    <div className='row'>
                                                        <div className='col-xs-10'>
                                                            <h4>{item.postDetails.title}</h4>
                                                            <p>{item.postDetails.companyName}</p>

                                                            <p>
                                                                <i className="fas fa-map-marked"></i>Locations:
                                                                {item.postDetails.locationNames == null ? <span>Not specified</span> : item.postDetails.locationNames}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className='row'>
                                                        <div className='col-sm-5'>
                                                            <i className="fas fa-suitcase"></i>Experience: {item.postDetails.experience} yrs
                                                        </div>
                                                        <div className='col-sm-7'>
                                                            <i className="fas fa-rupee-sign"></i>
                                                            Salary: {item.postDetails.minSalary}
                                                        </div>
                                                    </div>
                                                    <div className='row'>
                                                        <div className='col-sm-5'>
                                                            {
                                                                item.postDetails.skillNames == null ? null :
                                                                    <span>
                                                                        <i className="fas fa-laptop-code"></i>
                                                                        Skills: {item.postDetails.skillNames}
                                                                    </span>
                                                            }
                                                        </div>
                                                        <div className='col-sm-7'>
                                                            {
                                                                item.postDetails.tagNames == null ? null :
                                                                    <span>
                                                                        <i className="fas fa-tags"></i>
                                                                        Tags: {item.postDetails.tagNames}
                                                                    </span>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className='row'>
                                                        <div className='col-sm-5'>
                                                            <i className="fas fa-calendar-week"></i>
                                                            Posted on: {this.utils.GetDateFromServer(item.postDetails.postedOn)}
                                                        </div>
                                                        <div className='col-sm-7'>
                                                            <i className="fas fa-calendar-week"></i>
                                                            Expiry date: {this.utils.GetDateFromServer(item.postDetails.expiryDate)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </React.Fragment>
                                    )
                            }
                            <h4>Internships you have applied for:</h4>
                            {
                                appliedInternships.length === 0 ? "You have not applied for any internships." :
                                    appliedInternships.map((item, index) =>
                                        <React.Fragment key={index}>
                                            <a target='_blank' rel='noopener noreferrer' className='job-link' href={'/internship-description?id=' + item.postDetails.postId}>
                                                <div className='job-desc-user job-desc'>
                                                    <div className='row'>
                                                        <div className='col-xs-10'>
                                                            <h4>{item.postDetails.title}</h4>
                                                            <p>{item.postDetails.companyName}</p>

                                                            <p>
                                                                <i className="fas fa-map-marked"></i>Locations:
                                                            {item.postDetails.locationNames == null ? <span>Not specified</span> : item.postDetails.locationNames}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className='row'>
                                                        <div className='col-sm-5'>
                                                            <i className="fas fa-suitcase"></i>Starts from: {this.utils.GetDateFromServer(item.postDetails.startDate)}
                                                        </div>
                                                        <div className='col-sm-7'>
                                                            <i className="fas fa-rupee-sign"></i>
                                                            Stipend:
                                                            {item.postDetails.minStipend}
                                                            {
                                                                item.postDetails.maxStipend === 0 ? null :
                                                                    <span>- {item.postDetails.maxStipend}</span>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className='row'>
                                                        <div className='col-sm-5'>
                                                            {
                                                                item.postDetails.skillNames == null ? null :
                                                                    <span>
                                                                        <i className="fas fa-laptop-code"></i>
                                                                        Skills: {item.postDetails.skillNames}
                                                                    </span>
                                                            }
                                                        </div>
                                                        <div className='col-sm-7'>
                                                            {
                                                                item.postDetails.tagNames == null ? null :
                                                                    <span>
                                                                        <i className="fas fa-tags"></i>
                                                                        Tags: {item.postDetails.tagNames}
                                                                    </span>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className='row'>
                                                        <div className='col-sm-5'>
                                                            <i className="fas fa-calendar-week"></i>
                                                            Posted on: {this.utils.GetDateFromServer(item.postDetails.postedOn)}
                                                        </div>
                                                        <div className='col-sm-7'>
                                                            <i className="fas fa-calendar-week"></i>
                                                            Expiry date: {this.utils.GetDateFromServer(item.postDetails.expiryDate)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </React.Fragment>
                                    )
                            }
                        </div>
                        <StudentSideBar user={this.state.user}></StudentSideBar>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ProffesionalHome
