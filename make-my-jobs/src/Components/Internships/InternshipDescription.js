import React, { Component } from 'react'
import logo1 from '../../Assets/Uploads/logos/client-5.png'

export class InternshipDescription extends Component {
    render() {
        return (
            <React.Fragment>
                <div className='container gradient-container'>
                    <div className='row'>
                        <div className='col-md-2'></div>
                        <div className='col-md-8 col-xs-12'>
                            <br />
                            <h4>Campus Ambassador programme at Cognizance IIT Roorkee</h4>
                            <div className="panel panel-default">
                                <div className="panel-body">
                                    <div className='row'>
                                        <div className='col-xs-9'>
                                            <p>Campus Ambassador programme</p>
                                            <p>Cognizance IIT Roorkee</p>
                                            <p>Location(s): Work From Home</p>
                                        </div>
                                        <div className='col-xs-3'>
                                            <img src={logo1} alt='company logo' className='img img-logo' />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-3 col-xs-6'>
                                            <strong>Start Date</strong>
                                            <br />
                                            Immediately
                                        </div>
                                        <div className='col-md-3 col-xs-6'>
                                            <strong>Duration</strong>
                                            <br />
                                            3 Months
                                        </div>
                                        <div className='col-md-3 col-xs-6'>
                                            <strong>Rewards and stipend</strong>
                                            <br />
                                            Performance Based
                                        </div>
                                        <div className='col-md-3 col-xs-12'>
                                            <strong>Apply by</strong>
                                            <br />
                                            21 Dec'19
                                        </div>
                                    </div>
                                </div>
                                <div className="panel-footer right-content">Posted on 17 Nov'19</div>
                            </div>

                            <div className="panel panel-default">
                                <div className="panel-body">
                                    <p>
                                        <strong>About Cognizance IIT Roorkee (<a href='https://www.cognizance.org.in'>https://www.cognizance.org.in</a>)
                                        </strong>
                                    </p>
                                    <p>
                                        Initiated in 2003, Cognizance is the annual Techno-Socio-Managerial Festival of IIT Roorkee that experiences a conglomeration of over 200 events with participation from over 1,50,000 students from all over the world. The events are held at a two-tier level and include 22 different disciplines (the only technical Institute in the country to do so) that cover almost every field of technical, social and management spectrum. We provide a platform to the flourishing minds of the nation to exhibit their knowledge and innovation in an environment of like-minded excellence and intellect.
                                    </p>

                                    <p>
                                        <strong>About the internship:</strong>
                                    </p>
                                    <p>
                                        Initiated in 2003, Cognizance is the annual Techno-Socio-Managerial Festival of IIT Roorkee that experiences a conglomeration of over 200 events with participation from over 1,50,000 students from all over the world. The events are held at a two-tier level and include 22 different disciplines (the only technical Institute in the country to do so) that cover almost every field of technical, social and management spectrum. We provide a platform to the flourishing minds of the nation to exhibit their knowledge and innovation in an environment of like-minded excellence and intellect.
                                    </p>


                                    <p>
                                        <strong>Selection Procedure</strong>
                                    </p>
                                    <p>
                                        Application-based, followed by a telephonic interview
                                    </p>

                                    <p>
                                        <strong># of jobs/internships available: </strong> 10
                                    </p>

                                    <p>
                                        <strong>Skill(s) required: </strong> Digital Marketing and English Proficiency (Spoken)
                                    </p>

                                    <div className='center-content'>
                                        <button className='btn btn-primary'>Apply Now</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-2'></div>
                    </div>

                </div>
            </React.Fragment>
        )
    }
}

export default InternshipDescription
