import React, { Component } from 'react'
import axios from 'axios'

export class Signup extends Component {
    constructor(props) {
        super(props)
        this.user = {
            email: '',
            password: '',
            userType: 0
        }
    }

    onSignupFormSubmitHandler = (e) => {
        e.preventDefault();
        this.user = {
            email: e.target.email.value,
            password: e.target.password.value
        }
        console.log(this.user);
        axios.post('http://makemyjobs.me/Account/Signup', this.user);
    }

    onSignupFormChangeHandler = (e) => {

    }

    render() {
        // const { user } = this.state
        //console.log(this.state)
        return (
            <form onSubmit={this.onSignupFormSubmitHandler}>
                {/* <div>
                    <label>UserName</label>
                    <input type='text' name='userName' value={userName} onChange={this.onSignupFormChangeHandler} />
                </div> */}
                <div>
                    <label>Email</label>
                    <input type='text' name='email' />
                </div>
                <div>
                    <label>password</label>
                    <input type='password' name='password' />
                </div>
                <button type='submit'>Submit</button>
            </form>
        )
    }
}

export default Signup

