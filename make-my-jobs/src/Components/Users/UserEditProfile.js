import React, { Component } from 'react'
import StudentEditProfile from './Student/StudentEditProfile'
import ProffesionalEditProfile from './Proffesional/ProffesionalEditProfile'
import CorporateEditProfile from './Corporate/CorporateEditProfile'
import Utils from '../../Utils/Utils'

export class UserEditProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userType: new Utils().getUserTypeFromCookies()
        }
    }
    render() {
        if (this.state.userType === '1') {
            return (
                <StudentEditProfile></StudentEditProfile>
            )
        }
        else if (this.state.userType === '2')
            return (
                <ProffesionalEditProfile></ProffesionalEditProfile>
            )
        else if (this.state.userType === '3') {
            return (
                <CorporateEditProfile></CorporateEditProfile>
            )
        }
        else {
            window.location = '/login';
        }
    }
}

export default UserEditProfile
