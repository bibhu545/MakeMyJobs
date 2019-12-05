import React, { Component } from 'react'
import Utils from '../../../Utils/Utils';
import { UserModel } from '../../../Utils/Models';
import axios from 'axios'
import StudentSideBar from './StudentSideBar';
import '../users.css'

export class StudentProfile extends Component {
    constructor(props) {
        super(props)
        this.userInfoFromCookies = new Utils().getUserInfoFromCookies();
        this.state = {
            userType: new Utils().getUserTypeFromCookies(),
            user: new UserModel()
        }
    }

    componentDidMount() {
        axios.get('http://makemyjobs.me/Student/GetStudentInfo?id=' + this.userInfoFromCookies.userId).then(
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
                                        <div className='col-md-6'>
                                            <p>
                                                <strong>First name:</strong>
                                                {this.state.user.firstName}
                                            </p>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>
                                                <strong>Last name:</strong>
                                                {this.state.user.lastName}
                                            </p>
                                        </div>
                                    </div>
                                    <p>
                                        <strong>Email:</strong>
                                        {this.state.user.email}
                                    </p>
                                    <p>
                                        <strong>Phone:</strong>
                                        {
                                            this.state.user.contactNumber == null ?
                                                <span className='light-text'><i>Please update your contact number.</i></span>
                                                : this.state.user.contactNumber
                                        }
                                    </p>
                                    <p>
                                        <strong>Date of birth:</strong>
                                        {
                                            this.state.user.dateOfBirth == null ?
                                                <span className='light-text'><i>Please update your Date of birth.</i></span>
                                                : this.state.user.dateOfBirth
                                        }
                                    </p>
                                    <p>
                                        <strong>College:</strong>
                                        {
                                            this.state.user.collegeName == null ?
                                                <span className='light-text'><i>Please update your college.</i></span>
                                                : this.state.user.collegeName
                                        }
                                    </p>
                                    <p>
                                        <strong>Address:</strong>
                                        {
                                            this.state.user.address == null ?
                                                <span className='light-text'><i>Please update your address.</i></span>
                                                : this.state.user.address
                                        }
                                    </p>
                                    <p>
                                        <strong>Resume:</strong>
                                        {
                                            this.state.user.resume == null ?
                                                <span className='light-text'><i>Please add your resume.</i></span>
                                                : this.state.user.resume
                                        }
                                    </p>
                                </div>
                                <div className='col-md-2'></div>
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
