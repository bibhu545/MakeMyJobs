import React, { Component } from 'react'
import logo1 from '../../Assets/Uploads/logos/client-5.png'
import Utils from '../../Utils/Utils'
import HttpService from '../../Utils/HttpServices';
import { JobModel } from '../../Utils/Models';
import StudentSideBar from '../Users/Student/StudentSideBar';

export class JobDescription extends Component {
    constructor(props) {
        super(props)
        this.utils = new Utils();
        this.http = new HttpService();
        this.userInfoFromCookies = new Utils().getUserInfoFromCookies();
        this.jobId = 0
        this.state = {
            jobDetails: new JobModel()
        }
    }

    componentDidMount() {
        this.jobId = this.utils.getQueryStringValue("id");
        if (!this.utils.isLoggedIn() || this.jobId == null) {
            window.location = '/login';
        }
        else {
            this.http.getData('http://makemyjobs.me/Corporate/GetJobInfo?id=' + this.jobId + "&userId=" + this.userInfoFromCookies.userId).then(response => {
                if (response.data != null) {
                    if (response.data.results[0] != null) {
                        this.setState({
                            jobDetails: response.data.results[0]
                        })
                    }
                    else {
                        this.utils.showErrorMessage("Some error occured.");
                    }
                }
                else {
                    this.utils.showErrorMessage("Some error occured.");
                }
            }).catch(error => {
                console.log(error);
                this.utils.showErrorMessage("Some error occured.");
            });
        }
    }

    render() {
        const { jobDetails } = this.state;
        console.log(jobDetails)
        return (
            <React.Fragment>
                <div className='container gradient-container'>
                    <div className='row'>
                        <div className='col-md-8 col-xs-12'>
                            <br />
                            <h4>{jobDetails.jobTitle} in {jobDetails.locationNames}</h4>
                            <div className="panel panel-default">
                                <div className="panel-body">
                                    <div className='row'>
                                        <div className='col-xs-9'>
                                            <p>{jobDetails.jobTitle}</p>
                                            {/* <p>by Cognizance IIT Roorkee</p> */}
                                            <p>Location(s): {jobDetails.locationNames}</p>
                                        </div>
                                        <div className='col-xs-3'>
                                            <img src={logo1} alt='company logo' className='img img-logo' />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-3 col-xs-6'>
                                            <strong>Experience</strong>
                                            <br />
                                            {jobDetails.experience} Years
                                        </div>
                                        <div className='col-md-3 col-xs-6'>
                                            <strong>Openings</strong>
                                            <br />
                                            {jobDetails.postsAvailable}
                                        </div>
                                        <div className='col-md-3 col-xs-6'>
                                            <strong>Salary</strong>
                                            <br />
                                            {jobDetails.minSalary}
                                        </div>
                                        <div className='col-md-3 col-xs-12'>
                                            <strong>Apply by</strong>
                                            <br />
                                            {this.utils.GetDateFromServer(jobDetails.expiryDate)}
                                        </div>
                                    </div>
                                </div>
                                <div className="panel-footer right-content">Posted on {this.utils.GetDateFromServer(jobDetails.postedOn)}</div>
                            </div>

                            <div className="panel panel-default">
                                <div className="panel-body">
                                    <p>
                                        <strong>About {jobDetails.companyName == null ? <span>Company:</span> : jobDetails.companyName}:
                                        {/* (<a href='https://www.cognizance.org.in'>https://www.cognizance.org.in</a>) */}
                                        </strong>
                                    </p>
                                    <p className='justify'>
                                        {jobDetails.companyInfo == null ? <span>Not Provided</span> : jobDetails.companyInfo}
                                    </p>

                                    <p>
                                        <strong>About the job:</strong>
                                    </p>
                                    <p className='justify'>
                                        {jobDetails.description}
                                    </p>


                                    <p>
                                        <strong>Selection Procedure</strong>
                                    </p>
                                    <p>
                                        Application-based, followed by a telephonic interview
                                    </p>

                                    <p>
                                        <strong># of posts available: </strong> {jobDetails.postsAvailable}
                                    </p>

                                    <p>
                                        <strong>Skill(s) required: </strong> {jobDetails.skillNames}
                                    </p>

                                    <p>
                                        <strong>Tag(s): </strong> {jobDetails.tagNames}
                                    </p>

                                    {
                                        this.utils.getUserTypeFromCookies() === '3' ? null :
                                            <React.Fragment>
                                                <div className='center-content'>
                                                    <a href={'apply-job?id=' + jobDetails.jobId} className={'btn btn-primary ' + (jobDetails.applied ? 'disabled' : '')}>
                                                        {
                                                            jobDetails.applied ? "Applied" : "Apply Now"
                                                        }
                                                    </a>
                                                </div>
                                                {jobDetails.applied ? <p>Response from Recruiter: {jobDetails.message == null ? "No messages" : jobDetails.message}</p> : null}
                                            </React.Fragment>
                                    }
                                </div>
                            </div>
                        </div>
                        <StudentSideBar user={this.userInfoFromCookies}></StudentSideBar>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default JobDescription
