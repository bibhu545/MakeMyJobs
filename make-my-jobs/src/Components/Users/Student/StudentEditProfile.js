import React, { Component } from 'react'
import StudentSideBar from './StudentSideBar'
import Utils from '../../../Utils/Utils';
import { UserModel, LoginResponseModel } from '../../../Utils/Models';
import HttpService from '../../../Utils/HttpServices';
import '../users.css'

export class StudentEditProfile extends Component {
    constructor(props) {
        super(props)
        this.http = new HttpService();
        this.userInfoFromCookies = new Utils().getUserInfoFromCookies();
        this.utils = new Utils()
        this.state = {
            userType: new Utils().getUserTypeFromCookies(),
            user: new UserModel(),
            states: [],
            countries: []
        }
    }

    componentDidMount() {
        this.http.getData('http://makemyjobs.me/Common/GetStateAndCountries').then(response => {
            if (response.data.results.length > 0) {
                this.setState({
                    states: response.data.results[0],
                    countries: response.data.results[1]
                })
            }
        }).catch(error => {
            console.log(error);
        });
        this.http.getData('http://makemyjobs.me/Student/GetStudentInfoForEdit?id=' + this.userInfoFromCookies.userId).then(
            response => {
                if (response.data.results == null) {
                    window.location = '/login';
                }
                else {
                    var tempUser = response.data.results[0];
                    this.setState({
                        user: tempUser
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

        const requestData = new FormData();
        requestData.append('firstName', this.state.user.firstName);
        requestData.append('lastName', this.state.user.lastName);
        requestData.append('email', this.state.user.email);
        requestData.append('collegeName', this.state.user.collegeName);
        requestData.append('contactNumber', this.state.user.contactNumber);
        requestData.append('address', this.state.user.address);
        requestData.append('country', this.state.user.country);
        requestData.append('dateOfBirth', this.state.user.dateOfBirth);
        requestData.append('state', this.state.user.state);
        requestData.append('zipCode', this.state.user.zipCode);
        requestData.append('resume', this.state.user.resume);
        requestData.append('userId', this.state.user.userId);
        requestData.append('studentId', this.state.user.studentId);
        requestData.append('dateJoined', this.state.user.dateJoined);

        if (this.state.user.resume != null && !this.utils.validateResume(this.state.user.resume.name)) {
            this.utils.showErrorMessage("Invalid file type.");
        }
        else {
            this.http.postData('http://makemyjobs.me/Student/UpdateStudentInfo', requestData).then(response => {
                if (response.data.results[0] == null) {
                    console.log('Error occured in updating data.');
                }
                else {
                    var updatedUserInCookies = new LoginResponseModel();
                    var updatedUser = response.data.results[0];
                    if (new Utils().isLoggedIn()) {
                        updatedUserInCookies.loggedIn = 1;
                        updatedUserInCookies.userId = updatedUser.userId;
                        updatedUserInCookies.email = updatedUser.email;
                        updatedUserInCookies.firstName = updatedUser.firstName;
                        updatedUserInCookies.lastName = updatedUser.lastName;
                        updatedUserInCookies.userType = new Utils().getUserTypeFromCookies();
                        new Utils().saveLoginDataInCookies(updatedUserInCookies);
                        window.location = '/my-profile';
                    }
                    else {
                        window.location = '/login';
                    }
                }
            }).catch(error => {
                console.log(error);
            });
        }
    }

    fileChangedHandler = (e) => {
        let user = { ...this.state.user };
        user['resume'] = e.target.files[0];
        this.setState({ user });
    };

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
                                    <form encType="multipart/form-data" className="form-horizontal" onSubmit={this.onEditFormSubmitted}>
                                        <div className="form-group">
                                            <label className="control-label col-sm-4" htmlFor="firstName">First name*:</label>
                                            <div className="col-sm-8">
                                                <input type="text" className="form-control" id="firstName" placeholder="E.g. John" name="firstName" value={this.state.user.firstName} onChange={this.handleEditFormChange} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label col-sm-4" htmlFor="lastName">Last name*:</label>
                                            <div className="col-sm-8">
                                                <input type="text" className="form-control" id="lastName" placeholder="E.g. Doe" name="lastName" value={this.state.user.lastName} onChange={this.handleEditFormChange} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label col-sm-4" htmlFor="email">Email*:</label>
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
                                        <div className='form-group'>
                                            <label className="control-label col-sm-4" htmlFor="state">State:</label>
                                            <div className="col-sm-8">
                                                <select className="form-control" id="state" name='state' onChange={this.handleEditFormChange} value={this.state.user.state}>
                                                    {
                                                        this.state.states.map(item =>
                                                            <React.Fragment key={item.value}>
                                                                <option value={item.value}>{item.text}</option>
                                                            </React.Fragment>
                                                        )
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className='form-group'>
                                            <label className="control-label col-sm-4" htmlFor="country">Country:</label>
                                            <div className="col-sm-8">
                                                <select className="form-control" id="country" name='country' onChange={this.handleEditFormChange} value={this.state.user.country}>
                                                    {
                                                        this.state.countries.map(item =>
                                                            <React.Fragment key={item.value}>
                                                                <option value={item.value}>{item.text}</option>
                                                            </React.Fragment>
                                                        )
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label col-sm-4" htmlFor="zipCode">Pin Code:</label>
                                            <div className="col-sm-8">
                                                <input type="text" className="form-control" id="zipCode" placeholder="Enter Pincode" name="zipCode" value={this.state.user.zipCode == null ? "" : this.state.user.zipCode} onChange={this.handleEditFormChange} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label col-sm-4" htmlFor="resume">Resume:</label>
                                            <div className="col-sm-8">
                                                <input type="file" accept="application/pdf" className="form-control" id="resume" name="resume" onChange={this.fileChangedHandler} />
                                            </div>
                                        </div>
                                        <div className='center-content'>
                                            <button type='submit' className='btn btn-primary'>Update Now</button>
                                            <a href='/my-profile' className='btn btn-default'>Cancel</a>
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
