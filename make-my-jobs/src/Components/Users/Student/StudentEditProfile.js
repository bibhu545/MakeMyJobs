import React, { Component } from 'react'
import StudentSideBar from './StudentSideBar'
import Utils from '../../../Utils/Utils';
import { UserModel } from '../../../Utils/Models';
import axios from 'axios'
import '../users.css'

export class StudentEditProfile extends Component {
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

    handleEditFormChange = (e) => {
        let inputName = e.target.name;
        let inputValue = e.target.value;
        let statusCopy = Object.assign({}, this.state);
        statusCopy.user[inputName] = inputValue;
        this.setState(statusCopy);
    }

    onEditFormSubmitted = (e) => {
        e.preventDefault();
        console.log(this.state.user);
    }

    render() {
        return (
            <React.Fragment>
                <div className='container gradient-container'>
                    <div className='row student-home-wrapper'>
                        <div className='col-md-8 col-xs-12'>
                            <h3 className='center-content'>- Update Profile -</h3>
                            {/* <hr className='short-hr' /> */}
                            <br />
                            <div className='row'>
                                <div className='col-md-2'></div>
                                <div className='col-md-8'>
                                    <form className="form-horizontal" onSubmit={this.onEditFormSubmitted}>
                                        <div className="form-group">
                                            <label className="control-label col-sm-4" htmlFor="firstName">First name:</label>
                                            <div className="col-sm-8">
                                                <input type="text" className="form-control" id="firstName" placeholder="E.g. John" name="firstName" value={this.state.user.firstName} onChange={this.handleEditFormChange} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label col-sm-4" htmlFor="lastName">Last name:</label>
                                            <div className="col-sm-8">
                                                <input type="text" className="form-control" id="lastName" placeholder="E.g. Doe" name="lastName" value={this.state.user.lastName} onChange={this.handleEditFormChange} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label col-sm-4" htmlFor="email">First name:</label>
                                            <div className="col-sm-8">
                                                <input type="email" className="form-control" id="email" placeholder="John@gmail.com" name="email" value={this.state.user.email} onChange={this.handleEditFormChange} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label col-sm-4" htmlFor="contactNumber">Contact number:</label>
                                            <div className="col-sm-8">
                                                <input type="text" className="form-control" id="contactNumber" placeholder="Enter your 10 digit mobile number" name="contactNumber" value={this.state.user.contactNumber == null ? "" : this.state.user.contactNumber} onChange={this.handleEditFormChange} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label col-sm-4" htmlFor="dateOfBirth">Date of birth:</label>
                                            <div className="col-sm-8">
                                                <input type="date" className="form-control" id="dateOfBirth" name="dateOfBirth" value={this.state.user.dateOfBirth == null ? "" : this.state.user.dateOfBirth} onChange={this.handleEditFormChange} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label col-sm-4" htmlFor="collegeName">College:</label>
                                            <div className="col-sm-8">
                                                <input type="text" className="form-control" id="collegeName" placeholder="Enter your college name" name="collegeName" value={this.state.user.collegeName == null ? "" : this.state.user.collegeName} onChange={this.handleEditFormChange} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label col-sm-4" htmlFor="address">Address:</label>
                                            <div className="col-sm-8">
                                                <input type="text" className="form-control" id="address" placeholder="Enter complete address" name="address" value={this.state.user.address == null ? "" : this.state.user.address} onChange={this.handleEditFormChange} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label col-sm-4" htmlFor="pinCode">Pin Code:</label>
                                            <div className="col-sm-8">
                                                <input type="text" className="form-control" id="pinCode" placeholder="Enter Pincode" name="pinCode" value={this.state.user.pinCode == null ? "" : this.state.user.pinCode} onChange={this.handleEditFormChange} />
                                            </div>
                                        </div>
                                        {/* <div className="form-group">
                                            <label className="control-label col-sm-4" htmlFor="resume">Resume:</label>
                                            <div className="col-sm-8">
                                                <input type="file" className="form-control" id="resume" name="resume" value={this.state.user.resume == null ? "" : this.state.user.resume} onChange={this.handleEditFormChange} />
                                            </div>
                                        </div> */}
                                        <div className='center-content'>
                                            <button type='submit' className='btn btn-primary'>Update Now</button>
                                        </div>
                                        <br />
                                    </form>
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

export default StudentEditProfile
