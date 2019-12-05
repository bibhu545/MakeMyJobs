import React, { Component } from 'react'
import './account.css'
import { SignpModel } from '../../Utils/Models'
import axios from 'axios'
import { withRouter, Redirect } from 'react-router-dom'

export class Signup extends Component {
    constructor(props) {
        super(props)
        this.user = new SignpModel();
        this.state = {
            signedUp: false
        }
    }

    onSignupFormSubmitHandler = (e) => {
        e.preventDefault();

        this.user.firstName = e.target.firstName.value;
        this.user.lastName = e.target.lastName.value;
        this.user.email = e.target.email.value;
        this.user.password = e.target.password.value;
        this.user.userType = e.target.userType.value;

        axios.post('http://makemyjobs.me/Account/Signup', this.user).then(response => {
            console.log(response);
            if(response.data.results[0] === -1){
                //handle duplicate email
            }
            else if (response.data.results[0] > 0) {
                this.setState({
                    signedUp: true
                });
            }
            else {
                console.log(response.data.errorMessage);
            }
            //this.props.history.push('/login');
        }).catch(error => {
            console.log(error);
        });
    }

    render() {
        
        if (this.state.signedUp) {
            return (
                <Redirect to={
                    {
                        pathname: '/login',
                        state: { successMessage: 'Please login to continue' }
                    }
                }
                />
            )
        }

        return (
            <div className="container">
                <div className="signup-content-wrapper">
                    <div className="signup-form-container">
                        <div className="form-overlay">
                            <div className='row'>
                                <div className='signup-overlay'>
                                    <div className='col-sm-6'></div>
                                    <div className='col-sm-6 signup-form-container-right'>
                                        <h4 className="center-content">Signup and Explore</h4>
                                        <form onSubmit={this.onSignupFormSubmitHandler}>
                                            <div className='row'>
                                                <div className='col-md-6 col-xs-12'>
                                                    <div className='form-group'>
                                                        <label htmlFor='firstName'>First name*:</label>
                                                        <input type='text' name='firstName' id='firstName' className='form-control' placeholder='John' />
                                                    </div>
                                                </div>
                                                <div className='col-md-6 col-xs-12'>
                                                    <div className='form-group'>
                                                        <label htmlFor='lastName'>Last name*:</label>
                                                        <input type='text' name='lastName' id='lastName' className='form-control' placeholder='Doe' />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='form-group'>
                                                <label htmlFor='email'>Email*:</label>
                                                <input type='email' name='email' id='email' className='form-control' placeholder='E.g. jhon@gmail.com' />
                                            </div>
                                            <div className='form-group'>
                                                <label htmlFor='password'>Password*:</label>
                                                <input type='password' name='password' id='password' className='form-control' placeholder='Enter password' />
                                            </div>
                                            <div className='form-group'>
                                                <label htmlFor='confirmPassword'>Confirm Password*:</label>
                                                <input type='password' name='confirmPassword' id='confirmPassword' className='form-control' placeholder='Confirm your password' />
                                            </div>
                                            <div className='form-group'>
                                                <label htmlFor="role">Join as:</label>
                                                <select className="form-control" id="role" name='userType'>
                                                    <option value='1'>Student</option>
                                                    <option value='2'>Professional</option>
                                                    <option value='3'>Corporate</option>
                                                </select>
                                            </div>
                                            <button type='submit' className='btn btn-primary' >Signup</button>
                                            <span className='login-prompt'>Already have an account? <a href='/login'>Login Now</a></span>
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

export default withRouter(Signup)

