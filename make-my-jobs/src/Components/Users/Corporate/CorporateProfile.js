import React, { Component } from 'react'
import Utils, { API_ENDPOINTS } from '../../../Utils/Utils'
import { CorporateModel } from '../../../Utils/Models';
import HttpService from '../../../Utils/HttpServices';
import StudentSideBar from '../Student/StudentSideBar';

export class CorporateProfile extends Component {
    constructor(props) {
        super(props);
        this.http = new HttpService();
        this.utils = new Utils();
        this.userInfoFromCookies = new Utils().getUserInfoFromCookies();
        this.user = new CorporateModel();
        this.state = {
            userType: new Utils().getUserTypeFromCookies(),
            user: new CorporateModel(),
            edit: false,
            editId: 0
        }
    }
    componentDidMount() {
        this.renderCorporate();
    }

    renderCorporate = () => {
        this.http.postData(API_ENDPOINTS.GetCorporateInfo + '?id=' + this.userInfoFromCookies.userId).then(
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
                            <h3 className='center-content'>- My Profile -</h3>
                            <div className='center-content'>
                                <p>Please complete your profile <a href='/edit-profile'>here</a>.</p>
                            </div>
                            <hr className='short-hr' />
                            <br />
                            <div className='row'>
                                <div className='col-md-1'></div>
                                <div className='col-md-10'>
                                    <div className='row'>
                                        <div className='col-sm-3'>
                                            <p>
                                                <strong>Name:</strong>
                                            </p>
                                        </div>
                                        <div className='col-sm-8'>
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
                                        <div className='col-sm-8'>
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
                                        <div className='col-sm-8'>
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
                                        <div className='col-sm-8'>
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
                                                <strong>City:</strong>
                                            </p>
                                        </div>
                                        <div className='col-sm-8'>
                                            <p>
                                                {
                                                    this.state.user.city == null ?
                                                        <span className='light-text'><i>Please update your current city.</i></span>
                                                        : this.state.user.city
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
                                        <div className='col-sm-8'>
                                            <p>
                                                {
                                                    this.state.user.address === "" ?
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
                                        <div className='col-sm-8'>
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
                                                <strong>Logo:</strong>
                                            </p>
                                        </div>
                                        <div className='col-sm-8'>
                                            <p>
                                                {
                                                    this.state.user.logo == null ?
                                                        <span className='light-text'><i>Please add logo of your company.</i></span>
                                                        : this.state.user.logo
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-sm-3'>
                                            <p>
                                                <strong>Company name:</strong>
                                            </p>
                                        </div>
                                        <div className='col-sm-8'>
                                            <p>
                                                {
                                                    this.state.user.companyName == null ?
                                                        <span className='light-text'><i>Please add name of your company.</i></span>
                                                        : this.state.user.companyName
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-sm-12'>
                                            <p>
                                                <strong>About company:</strong>
                                            </p>
                                        </div>
                                        <div className='col-sm-12'>
                                            <p>
                                                {
                                                    this.state.user.companyInfo == null ?
                                                        <span className='light-text'><i>Please describe your company.</i></span>
                                                        : this.state.user.companyInfo
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-1'></div>
                            </div>
                            <br />
                            <div className='center-content'>
                                <a href='edit-profile' className='btn btn-primary'>Update Now</a>
                            </div>
                            <br />
                        </div>
                        <StudentSideBar user={this.userInfoFromCookies}></StudentSideBar>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default CorporateProfile
