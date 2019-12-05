import React, { Component } from 'react'
import Utils from '../../Utils/Utils'
import StudentProfile from './Student/StudentProfile'
import ProffesionalProfile from './Proffesional/ProffesionalProfile'
import CorporateProfile from './Corporate/CorporateProfile'

export class UserProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userType: new Utils().getUserTypeFromCookies()
        }
    }
    
    render() {
        if (this.state.userType === '1') {
            return (
                <StudentProfile></StudentProfile>
            )
        }
        else if (this.state.userType === '2')
            return (
                <ProffesionalProfile></ProffesionalProfile>
            )
        else if(this.state.userType === '3'){
            return (
                <CorporateProfile></CorporateProfile>
            )
        }
        else{
            window.location = '/login';
        }
    }
}

export default UserProfile
