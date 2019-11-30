import React, { Component } from 'react'
import './account.css'
import { Snackbar } from '../../Utils/snackbar/Snackbar'
// import axios from 'axios'

export class Signup extends Component {
    constructor(props) {
        super(props)
        this.user = {
            email: '',
            password: '',
            userType: 0
        }
        this.snackbarRef = React.createRef();
    }

    _showSnackbarHandler = (message) => {
        this.snackbarRef.current.openSnackBar(message);
    }

    onSignupFormSubmitHandler = (e) => {
        e.preventDefault();
        this.user = {
            email: e.target.email.value,
            password: e.target.password.value
        }
        console.log(this.user);
        this._showSnackbarHandler('bibhu');
        //axios.post('http://makemyjobs.me/Account/Signup', this.user);
    }

    render() {
        return (
            <div className="container">
                <Snackbar ref={this.snackbarRef} />
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
                                                <select className="form-control" id="role">
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

export default Signup

