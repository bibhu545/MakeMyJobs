import React, { Component } from 'react'
import Utils from '../../Utils/Utils';
import StudentHome from './Student/StudentHome';
import ProffesionalHome from './Proffesional/ProffesionalHome';
import CorporateHome from './Corporate/CorporateHome';

export class UserHome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userType: new Utils().getUserTypeFromCookies()
        }
    }

    render() {
        if (this.state.userType === '1') {
            return (
                <StudentHome></StudentHome>
            )
        }
        else if (this.state.userType === '2')
            return (
                <ProffesionalHome></ProffesionalHome>
            )
        else if(this.state.userType === '3'){
            return (
                <CorporateHome></CorporateHome>
            )
        }
        else{
            window.location = '/login';
        }
    }
}

export default UserHome
