import React, { Component } from 'react'

export class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {

        }
    }


    onLoginFormSubmitHandler() {

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
