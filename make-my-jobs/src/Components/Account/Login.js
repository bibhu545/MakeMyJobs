import React, { Component } from 'react';
import { LoginModel, LoginResponseModel } from '../../Utils/Models';
import HttpService from '../../Utils/HttpServices'
import Utils from '../../Utils/Utils';

export class Login extends Component {

    constructor(props) {
        super(props);
        this.http = new HttpService();
        this.user = new LoginModel();
        this.loginResponse = new LoginResponseModel();
        this.state = {
            successMessage: '',
            errorMessage: ''
        }
    }

    componentDidMount() {
        if (this.state.successMessage !== "") {
            new Utils().showDefaultMessage("Successfully signed up. Please login to continue.");
        }
    }

    onLoginFormSubmitHandler = (e) => {
        e.preventDefault();
        this.user.email = e.target.email.value;
        this.user.password = e.target.password.value;
        this.http.postData('http://makemyjobs.me/Account/Login', this.user).then(response => {
            this.loginResponse = response.data.results[0];
            if (this.loginResponse.loggedIn === 0) {
                new Utils().showErrorMessage('Invalid username or password.');
            }
            else {
                new Utils().saveLoginDataInCookies(this.loginResponse);
                window.location = "/user-home";
            }
        }).catch(error => {
            new Utils().showErrorMessage(error);
        });
    }

    render() {

        return (
            <div className="container">
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
