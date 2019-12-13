import React, { Component } from 'react'
import HttpService from '../../../Utils/HttpServices';
import { CorporateModel } from '../../../Utils/Models';
import Utils from '../../../Utils/Utils';
import StudentSideBar from '../Student/StudentSideBar';
// import {logo} from '../../../Assets/Uploads/logos/client-2.png'

export class CorporateHome extends Component {
    constructor(props) {
        super(props);
        this.http = new HttpService();
        this.userInfoFromCookies = new Utils().getUserInfoFromCookies();
        this.utils = new Utils();
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
                                this.state.user.corporateJobs.length === 0 ?
                                    <div className='center-content'>
                                        You have not posted any jobs yet. <a href='/add-jobs'>(Add now)</a>
                                    </div> :
                                    <React.Fragment>
                                        <h4>Jobs posted by you:
                                        <a href='/add-job' className='btn btn-primary float-right'>Add new job</a>
                                        </h4>
                                        <br />
                                        {
                                            this.state.user.corporateJobs.map(item =>
                                                <React.Fragment key={item.jobId}>
                                                    <div className='job-desc-user'>
                                                        <div className='row'>
                                                            <div className='col-sm-10'>
                                                                <h4><a href='/jobs'>{item.jobTitle}</a></h4>
                                                                <p>{item.company}</p>
                                                            </div>
                                                            {/* <div className='col-sm-3'>
                                                                <img src={logo} alt='company logo' className='img img-logo' />
                                                            </div> */}
                                                        </div>
                                                        <div className='row'>
                                                            <div className='col-sm-5'>
                                                                <i className="fas fa-suitcase"></i>Experience: {item.experience} yrs
                                                            </div>
                                                            <div className='col-sm-7'>
                                                                <i className="fas fa-map-marked"></i> {item.locationNames}
                                                            </div>
                                                        </div>
                                                        {/* <div className='row'>
                                                            <div className='col-sm-12'>
                                                                <i className="fas fa-tags"></i> {item.tags}
                                                            </div>
                                                        </div> */}
                                                        <div className='row'>
                                                            <div className='col-sm-5'>
                                                                <i className="fas fa-rupee-sign"></i>
                                                                Posted on: {this.utils.GetDateFromServer(item.postedOn)}
                                                            </div>
                                                            <div className='col-sm-7'>
                                                                <i className="fas fa-user"></i>
                                                                Expiry date: {this.utils.GetDateFromServer(item.expiryDate)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </React.Fragment>
                                            )
                                        }
                                        {
                                            this.state.user.corporateJobs.length > 5 ?
                                                <a href='/my-jobs' className='btn btn-default float-right'>View all</a> :
                                                null
                                        }
                                    </React.Fragment>
                            }
                            <br />
                            <br />
                            {
                                this.state.user.corporateInternships.length === 0 ?
                                    <div className='center-content'>
                                        You have not posted any internships yet. <a href='/add-internship'>(Add now)</a>
                                    </div> :
                                    <React.Fragment>
                                        <h4>Internships posted by you:
                                        <a href='/add-internship' className='btn btn-primary float-right'>Add new internship</a>
                                        </h4>
                                        <br />
                                        {
                                            this.state.user.corporateInternships.map(item =>
                                                <React.Fragment key={item.internshipId}>
                                                    <div className='job-desc-user'>
                                                        <div className='row'>
                                                            <div className='col-sm-10'>
                                                                <h4><a href='/jobs'>{item.title}</a></h4>
                                                                <p>{item.company}</p>
                                                            </div>
                                                            {/* <div className='col-sm-3'>
                                                                <img src={logo} alt='company logo' className='img img-logo' />
                                                            </div> */}
                                                        </div>
                                                        <div className='row'>
                                                            <div className='col-sm-5'>
                                                                <i className="fas fa-suitcase"></i>Starts from: {this.utils.GetDateFromServer(item.startDate)}
                                                            </div>
                                                            <div className='col-sm-7'>
                                                                <i className="fas fa-map-marked"></i> {item.locationNames}
                                                            </div>
                                                        </div>
                                                        {/* <div className='row'>
                                                            <div className='col-sm-12'>
                                                                <i className="fas fa-tags"></i> {item.tags}
                                                            </div>
                                                        </div> */}
                                                        <div className='row'>
                                                            <div className='col-sm-5'>
                                                                <i className="fas fa-rupee-sign"></i>
                                                                Posted on: {this.utils.GetDateFromServer(item.postedOn)}
                                                            </div>
                                                            <div className='col-sm-7'>
                                                                <i className="fas fa-user"></i>
                                                                Expiry date: {this.utils.GetDateFromServer(item.expiryDate)}
                                                            </div>
                                                        </div>
                                                        <div className='row'>
                                                            <div className='col-sm-10'>
                                                                <i className="fas fa-suitcase"></i>
                                                                {
                                                                    item.isWFHAvailable === 1 ?
                                                                        <span>Work from home available, </span> : null
                                                                }
                                                                {
                                                                    item.isPartTimeAvailable === 1 ?
                                                                        <span>Part time available, </span> : null
                                                                }
                                                                {
                                                                    item.jobOffer === 1 ?
                                                                        <span>Job offer on completion</span> : null
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </React.Fragment>
                                            )
                                        }
                                        {
                                            this.state.user.corporateJobs.length > 5 ?
                                                <a href='/my-internships' className='btn btn-default float-right'>View all</a> :
                                                null
                                        }
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
