import React, { Component } from 'react'
import logo1 from '../../Assets/Uploads/logos/client-5.png'
import { InternshipModel } from '../../Utils/Models';
import Utils from '../../Utils/Utils';
import HttpService from '../../Utils/HttpServices';
import StudentSideBar from '../Users/Student/StudentSideBar';

export class InternshipDescription extends Component {
    constructor(props) {
        super(props)
        this.utils = new Utils();
        this.http = new HttpService();
        this.userInfoFromCookies = new Utils().getUserInfoFromCookies();
        this.internshipId = 0
        this.state = {
            internDetails: new InternshipModel()
        }
    }

    componentDidMount() {
        this.internshipId = this.utils.getQueryStringValue("id");
        if (!this.utils.isLoggedIn() || this.internshipId == null) {
            window.location = '/login';
        }
        else {
            this.http.getData('http://makemyjobs.me/Corporate/GetInternshipInfo?id=' + this.internshipId).then(response => {
                if (response.data != null) {
                    if (response.data.results[0] != null) {
                        this.setState({
                            internDetails: response.data.results[0]
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
        const { internDetails } = this.state;
        return (
            <React.Fragment>
                <div className='container gradient-container'>
                    <div className='row'>
                        <div className='col-md-8 col-xs-12'>
                            <br />
                            <h4>{internDetails.title}</h4>
                            <div className="panel panel-default">
                                <div className="panel-body">
                                    <div className='row'>
                                        <div className='col-xs-9'>
                                            <p>{internDetails.title}</p>
                                            <p>Cognizance IIT Roorkee</p>
                                            <p>Location(s): {internDetails.locationNames}</p>
                                        </div>
                                        <div className='col-xs-3'>
                                            <img src={logo1} alt='company logo' className='img img-logo' />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-3 col-xs-6'>
                                            <strong>Start Date</strong>
                                            <br />
                                            {this.utils.GetDateFromServer(internDetails.startDate)}
                                        </div>
                                        <div className='col-md-3 col-xs-6'>
                                            <strong>Duration</strong>
                                            <br />
                                            3 Months
                                        </div>
                                        <div className='col-md-3 col-xs-6'>
                                            <strong>Rewards and stipend</strong>
                                            <br />
                                            {internDetails.minStipend}
                                        </div>
                                        <div className='col-md-3 col-xs-12'>
                                            <strong>Apply by</strong>
                                            <br />
                                            {this.utils.GetDateFromServer(internDetails.expiryDate)}
                                        </div>
                                    </div>
                                </div>
                                <div className="panel-footer right-content">Posted on {this.utils.GetDateFromServer(internDetails.postedOn)}</div>
                            </div>

                            <div className="panel panel-default">
                                <div className="panel-body">
                                    <p>
                                        <strong>About Cognizance IIT Roorkee (<a href='https://www.cognizance.org.in'>https://www.cognizance.org.in</a>)
                                        </strong>
                                    </p>
                                    <p className='justify'>
                                        Initiated in 2003, Cognizance is the annual Techno-Socio-Managerial Festival of IIT Roorkee that experiences a conglomeration of over 200 events with participation from over 1,50,000 students from all over the world. The events are held at a two-tier level and include 22 different disciplines (the only technical Institute in the country to do so) that cover almost every field of technical, social and management spectrum. We provide a platform to the flourishing minds of the nation to exhibit their knowledge and innovation in an environment of like-minded excellence and intellect.
                                    </p>

                                    <p>
                                        <strong>About the internship:</strong>
                                    </p>
                                    <p className='justify'>
                                        {internDetails.description}
                                    </p>


                                    <p>
                                        <strong>Selection Procedure</strong>
                                    </p>
                                    <p>
                                        Application-based, followed by a telephonic interview
                                    </p>

                                    <p>
                                        <strong># of jobs/internships available: </strong> {internDetails.postsAvailable}
                                    </p>

                                    <p>
                                        <strong>Skill(s) required: </strong> {internDetails.skillNames}
                                    </p>

                                    {
                                        this.utils.getUserTypeFromCookies() === '3' ? null :
                                            <div className='center-content'>
                                                <button className='btn btn-primary'>Apply Now</button>
                                            </div>
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

export default InternshipDescription
