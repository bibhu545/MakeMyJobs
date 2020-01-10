import React, { Component } from 'react'
import Utils from '../../../Utils/Utils';
import { UserModel } from '../../../Utils/Models';
import HttpService from '../../../Utils/HttpServices';
import StudentSideBar from './StudentSideBar';
import '../users.css'

export class StudentProfile extends Component {
    constructor(props) {
        super(props)
        this.userInfoFromCookies = new Utils().getUserInfoFromCookies();
        this.utils = new Utils()
        this.http = new HttpService();
        this.state = {
            userType: new Utils().getUserTypeFromCookies(),
            user: new UserModel()
        }
    }

    componentDidMount() {
        this.http.getData('http://makemyjobs.me/Student/GetStudentInfo?id=' + this.userInfoFromCookies.userId).then(
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
        console.log(this.state);
        return (
            <React.Fragment>
                <div className='container gradient-container'>
                    <div className='row student-home-wrapper'>
                        <div className='col-md-8 col-xs-12'>
                            <h3 className='center-content'>- My Profile -</h3>
                            <div className='center-content'>
                                <p>Please complete your profile <a href='/edit-profile'>here</a> to get more personalized internships.</p>
                            </div>
                            <hr className='short-hr' />
                            <div className='row'>
                                <div className='col-md-2'></div>
                                <div className='col-md-8'>
                                    <div className='row'>
                                        <div className='col-sm-3'>
                                            <p>
                                                <strong>Name:</strong>
                                            </p>
                                        </div>
                                        <div className='col-sm-9'>
                                            <p>
                                                {this.state.user.firstName} {this.state.user.lastName}
                                            </p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-sm-3'>
                                            <p>
                                                <strong>Email:</strong>
                                            </p>
                                        </div>
                                        <div className='col-sm-9'>
                                            <p>
                                                {this.state.user.email}
                                            </p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-sm-3'>
                                            <p>
                                                <strong>Phone:</strong>
                                            </p>
                                        </div>
                                        <div className='col-sm-9'>
                                            <p>
                                                {
                                                    this.state.user.contactNumber == null ?
                                                        <span className='light-text'><i>Please update your contact number.</i></span>
                                                        : this.state.user.contactNumber
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-sm-3'>
                                            <p>
                                                <strong>Date of birth:</strong>
                                            </p>
                                        </div>
                                        <div className='col-sm-9'>
                                            <p>
                                                {
                                                    this.state.user.dateOfBirth == null ?
                                                        <span className='light-text'><i>Please update your Date of birth.</i></span>
                                                        : new Utils().GetDateFromServer(this.state.user.dateOfBirth)
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-sm-3'>
                                            <p>
                                                <strong>College:</strong>
                                            </p>
                                        </div>
                                        <div className='col-sm-9'>
                                            <p>
                                                {
                                                    this.state.user.collegeName == null ?
                                                        <span className='light-text'><i>Please update your college.</i></span>
                                                        : this.state.user.collegeName
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-sm-3'>
                                            <p>
                                                <strong>Address:</strong>
                                            </p>
                                        </div>
                                        <div className='col-sm-9'>
                                            <p>
                                                {
                                                    this.state.user.address == null ?
                                                        <span className='light-text'><i>Please update your address.</i></span>
                                                        : this.state.user.address
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-sm-3'>
                                            <p>
                                                <strong>Pin Code:</strong>
                                            </p>
                                        </div>
                                        <div className='col-sm-9'>
                                            <p>
                                                {
                                                    this.state.user.zipCode == null ?
                                                        <span className='light-text'><i>Please update your pin.</i></span>
                                                        : this.state.user.zipCode
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-sm-3'>
                                            <p>
                                                <strong>Resume:</strong>
                                            </p>
                                        </div>
                                        <div className='col-sm-9'>
                                            <p>
                                                {
                                                    this.state.user.resume == null ?
                                                        <span className='light-text'><i>Please add your resume.</i></span>
                                                        : <a href="##" onClick={(e) => this.utils.getResume(e, this.state.user.studentId, 0)}>View Resume</a>
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-2'></div>
                            </div>
                            <div className='center-content'>
                                <a href='edit-profile' className='btn btn-primary'>Update Now</a>
                            </div>
                        </div>
                        <StudentSideBar user={this.state.user}></StudentSideBar>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default StudentProfile
