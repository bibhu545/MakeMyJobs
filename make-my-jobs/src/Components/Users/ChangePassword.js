import React, { Component } from 'react'
import StudentSideBar from './Student/StudentSideBar'
import Utils from '../../Utils/Utils';
import { UserModel, ChangePasswordModel } from '../../Utils/Models';
import HttpService from '../../Utils/HttpServices';

export class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.http = new HttpService();
        this.userInfoFromCookies = new Utils().getUserInfoFromCookies();
        this.state = {
            userType: new Utils().getUserTypeFromCookies(),
            user: new UserModel(),
            passwordMatched: true
        }
    }

    onChangePasswordFormSubmitted = (e) => {
        e.preventDefault();
        if (e.target.updatedPassword.value !== e.target.confirmUpdatedPassword.value) {
            new Utils().showErrorMessage('Passwords did not match.');
        }
        else {
            var changePasswordModel = new ChangePasswordModel();
            changePasswordModel.userId = new Utils().getUserInfoFromCookies().userId;
            changePasswordModel.currentPassword = e.target.currentPassword.value;
            changePasswordModel.updatedPassword = e.target.confirmUpdatedPassword.value;
            this.http.postData('http://makemyjobs.me/Account/ChangePassword', changePasswordModel).then(response => {
                console.log(response);
                if (response.data.results[0] === 0) {
                    new Utils().showErrorMessage('Incorect current password.');
                }
                else {
                    window.location = '/my-profile';
                }
            }).catch(error => {

            });
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className='container gradient-container'>
                    <div className='col-md-8 col-xs-12'>
                        <div className='row'>
                            <div className='col-md-2'></div>
                            <div className='col-md-8 col-xs-12'>
                                <br />
                                <br />
                                <h3 className='center-content'>- Change Password -</h3>
                                <br />
                                <form onSubmit={this.onChangePasswordFormSubmitted}>
                                    <div className='form-group'>
                                        <label htmlFor='currentPassword'>Current password*:</label>
                                        <input type='password' className='form-control' name='currentPassword' id='currentPassword' placeholder='Enter current password' />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='updatedPassword'>New Password*:</label>
                                        <input type='password' className='form-control' name='updatedPassword' id='updatedPassword' placeholder='Enter new password' />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='confirmNewPassword'>Confirm new password*:</label>
                                        <input type='password' className='form-control' name='confirmUpdatedPassword' id='confirmUpdatedPassword' placeholder='Confirm current password' />
                                    </div>
                                    <div className='center-content'>
                                        <button type='submit' className='btn btn-primary'>Change Now</button>
                                        <a href="/my-profile" className='btn btn-default'>Cancel</a>
                                    </div>
                                </form>
                            </div>
                            <div className='col-md-2'></div>
                        </div>
                    </div>
                    <StudentSideBar user={this.userInfoFromCookies}></StudentSideBar>
                </div>
            </React.Fragment>
        )
    }
}

export default ChangePassword
