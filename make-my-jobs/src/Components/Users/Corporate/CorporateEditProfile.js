import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import HttpService from '../../../Utils/HttpServices';
import { CorporateModel, LoginResponseModel } from '../../../Utils/Models';
import Utils, { API_ENDPOINTS } from '../../../Utils/Utils';
import StudentSideBar from '../Student/StudentSideBar';

export class CorporateEditProfile extends Component {
    constructor(props) {
        super(props)
        this.http = new HttpService();
        this.userInfoFromCookies = new Utils().getUserInfoFromCookies();
        this.utils = new Utils();
        this.state = {
            userType: new Utils().getUserTypeFromCookies(),
            user: new CorporateModel(),
            states: [],
            countries: [],
            updated: 0
        }
    }

    componentDidMount() {
        this.http.getData(API_ENDPOINTS.GetStateAndCountries).then(response => {
            if (response.data.results.length > 0) {
                this.setState({
                    states: response.data.results[0],
                    countries: response.data.results[1]
                })
            }
        }).catch(error => {
            console.log(error);
        });
        this.http.getData('http://makemyjobs.me/Corporate/GetCorporateInfoForEdit?id=' + this.userInfoFromCookies.userId).then(
            response => {
                if (response.data.results[0] == null) {
                    this.utils.clearLoginDataFromCookies();
                    window.location = '/login';
                }
                else {
                    var tempUser = response.data.results[0];
                    if (tempUser.dateOfBirth !== "" && tempUser.dateOfBirth != null) {
                        tempUser.dateOfBirth = this.utils.formatDateToBind(tempUser.dateOfBirth);
                    }
                    else {
                        tempUser.dateOfBirth = ""
                    }
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
        requestData.append('contactNumber', this.state.user.contactNumber);
        requestData.append('address', this.state.user.address);
        requestData.append('city', this.state.user.city);
        requestData.append('companyName', this.state.user.companyName);
        requestData.append('companyInfo', this.state.user.companyInfo);
        requestData.append('country', this.state.user.country);
        requestData.append('dateOfBirth', this.state.user.dateOfBirth);
        requestData.append('state', this.state.user.state);
        requestData.append('zipCode', this.state.user.zipCode);
        requestData.append('logo', this.state.user.logo);
        requestData.append('userId', this.state.user.userId);
        requestData.append('corporateId', this.state.user.corporateId);
        requestData.append('dateJoined', this.state.user.dateJoined);

        this.http.postData('http://makemyjobs.me/Corporate/UpdateCorporateBasicInfo', requestData).then(response => {
            if (response.data == null) {
                new Utils().showErrorMessage('Error occured in updating data.');
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
                    this.setState({
                        updated: 1
                    });
                }
                else {
                    window.location = '/login';
                }
            }
        }).catch(error => {
            console.log(error);
        });
    }

    fileChangedHandler = (e) => {
        let user = { ...this.state.user };
        user['logo'] = e.target.files[0];
        this.setState({ user });
    };

    render() {
        if (this.state.updated === 1) {
            return (
                <Redirect to={
                    {
                        pathname: '/my-profile',
                        state: { updated: 1 }
                    }
                }
                />
            )
        }
        return (
            <React.Fragment>
                <div className='container gradient-container'>
                    <div className='row student-home-wrapper'>
                        <div className='col-md-8 col-xs-12'>
                            <div className='center-content'>
                                <h3 >- Update Profile -</h3>
                                <p>Please go to <a href='/user-home'>home</a> page to post jobs or internships.</p>
                            </div>
                            <hr className='short-hr' />
                            <br />
                            <div className='row'>
                                <div className='col-md-12'>
                                    <form encType="multipart/form-data" className="form-horizontal" onSubmit={this.onEditFormSubmitted}>

                                        <div className="form-group">
                                            <label className="control-label col-sm-3" htmlFor="firstName">First name*:</label>
                                            <div className="col-sm-8">
                                                <input type="text" className="form-control" id="firstName" placeholder="E.g. John" name="firstName" value={this.state.user.firstName} onChange={this.handleEditFormChange} />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="control-label col-sm-3" htmlFor="lastName">Last name*:</label>
                                            <div className="col-sm-8">
                                                <input type="text" className="form-control" id="lastName" placeholder="E.g. Doe" name="lastName" value={this.state.user.lastName} onChange={this.handleEditFormChange} />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="control-label col-sm-3" htmlFor="email">Email*:</label>
                                            <div className="col-sm-8">
                                                <input type="email" className="form-control" id="email" placeholder="John@gmail.com" name="email" value={this.state.user.email} onChange={this.handleEditFormChange} />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="control-label col-sm-3" htmlFor="contactNumber">Contact number:</label>
                                            <div className="col-sm-8">
                                                <input type="text" className="form-control" id="contactNumber" placeholder="Enter your 10 digit mobile number" name="contactNumber" value={this.state.user.contactNumber == null ? "" : this.state.user.contactNumber} onChange={this.handleEditFormChange} />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="control-label col-sm-3" htmlFor="dateOfBirth">Date of birth:</label>
                                            <div className="col-sm-8">
                                                <input type="date" className="form-control" id="dateOfBirth" name="dateOfBirth" value={this.state.user.dateOfBirth} onChange={this.handleEditFormChange} />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="control-label col-sm-3" htmlFor="city">City:</label>
                                            <div className="col-sm-8">
                                                <input type="text" className="form-control" id="city" placeholder="Enter your current city" name="city" value={this.state.user.city == null ? "" : this.state.user.city} onChange={this.handleEditFormChange} />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="control-label col-sm-3" htmlFor="address">Address:</label>
                                            <div className="col-sm-8">
                                                <input type="text" className="form-control" id="address" placeholder="Enter complete address" name="address" value={this.state.user.address == null ? "" : this.state.user.address} onChange={this.handleEditFormChange} />
                                            </div>
                                        </div>

                                        <div className='form-group'>
                                            <label className="control-label col-sm-3" htmlFor="state">State:</label>
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
                                            <label className="control-label col-sm-3" htmlFor="country">Country:</label>
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
                                            <label className="control-label col-sm-3" htmlFor="zipCode">Pin Code:</label>
                                            <div className="col-sm-8">
                                                <input type="text" className="form-control" id="zipCode" placeholder="Enter pincode" name="zipCode" value={this.state.user.zipCode == null ? "" : this.state.user.zipCode} onChange={this.handleEditFormChange} />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="control-label col-sm-3" htmlFor="companyName">Company name:</label>
                                            <div className="col-sm-8">
                                                <input type="text" className="form-control" id="companyName" placeholder="Enter company name" name="companyName" value={this.state.user.companyName == null ? "" : this.state.user.companyName} onChange={this.handleEditFormChange} />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="control-label col-sm-3" htmlFor="companyInfo">About company:</label>
                                            <div className="col-sm-8">
                                                <textarea rows='5' className="form-control" id="companyInfo" placeholder="Describe your company" name="companyInfo" value={this.state.user.companyInfo == null ? "" : this.state.user.companyInfo} onChange={this.handleEditFormChange}>
                                                </textarea>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label col-sm-3" htmlFor="logo">Update logo:</label>
                                            <div className="col-sm-8">
                                                <input type="file" accept="image/*" className="form-control" id="logo" name="logo" onChange={this.fileChangedHandler} />
                                            </div>
                                        </div>
                                        <div className='center-content'>
                                            <button type='submit' className='btn btn-primary'>Update Now</button>
                                            <a href='/my-profile' className='btn btn-default'>Cancel</a>
                                        </div>
                                        <br />
                                    </form>
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

export default CorporateEditProfile
