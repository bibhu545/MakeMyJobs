import React, { Component } from 'react'
import { SuccessMessage } from '../Common/Messages';
import { ErrorMessage } from '../Common/Messages';
import { LoginModel, LoginResponseModel } from '../../Utils/Models';
import Axios from 'axios';
import Utils from '../../Utils/Utils';

export class Login extends Component {

    constructor(props) {
        super(props)
        this.user = new LoginModel();
        this.loginResponse = new LoginResponseModel();
        this.state = {
            successMessage: '',
            errorMessage: ''
        }
    }


    onLoginFormSubmitHandler = (e) => {
        e.preventDefault();
        this.user.email = e.target.email.value;
        this.user.password = e.target.password.value;
        Axios.post('http://makemyjobs.me/Account/Login', this.user).then(response => {
            this.loginResponse = response.data.results[0];
            if (this.loginResponse.loggedIn === 0) {
                this.setState({
                    errorMessage: 'Invalid username or password.'
                });
            }
            else {
                new Utils().saveLoginDataInCookies(this.loginResponse);
                window.location = "/user-home";
            }
        }).catch(error => {
            this.setState({
                errorMessage: 'Some error occured. Please try again.'
            });
        });
    }

    render() {
        var successMessage = this.props.location.state !== undefined ? this.props.location.state.successMessage ?
            <SuccessMessage message={this.props.location.state.successMessage}></SuccessMessage> : null : null;
        var errorMessage = this.props.location.state !== undefined ? this.props.location.state.errorMessage ?
            <ErrorMessage message={this.props.location.state.errorMessage}></ErrorMessage> : null : null;
        if (this.state.errorMessage) {
            errorMessage = <ErrorMessage message={this.state.errorMessage}></ErrorMessage>;
        }
        return (
            <div className="container">
                <div className='row'>
                    <div className='col-sm-4'></div>
                    <div className='col-sm-4'>
                        {successMessage}
                        {errorMessage}
                    </div>
                    <div className='col-sm-4'></div>
                </div>
                <div className="content-wrapper">
                    <div className="form-conrainer">
                        <div className="form-overlay">
                            <div className='row'>
                                <div className='login-overlay'>
                                    <div className='col-sm-6'></div>
                                    <div className='col-sm-6 form-container-right'>
                                        <h4 className="center-content">Login and Explore</h4>
                                        <form onSubmit={this.onLoginFormSubmitHandler}>
                                            <div className='form-group'>
                                                <label htmlFor='email'>Email*:</label>
                                                <input type='text' name='email' id='email' className='form-control' placeholder='E.g. jhon@gmail.com' />
                                            </div>
                                            <div className='form-group'>
                                                <label htmlFor='password'>Password*:</label>
                                                <input type='password' name='password' id='password' className='form-control' placeholder='Enter password' />
                                            </div>
                                            <label className="checkbox-inline"><input type="checkbox" value="" />Remember Me</label>
                                            <br />
                                            <br />
                                            <button type='submit' className='btn btn-primary' >Login</button>
                                            <span className='login-prompt'>Don't have an account? <a href='/signup'>Join Now</a></span>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login
