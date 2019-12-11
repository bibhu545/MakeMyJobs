import React, { Component } from 'react'
import StudentSideBar from '../Student/StudentSideBar'
import HttpService from '../../../Utils/HttpServices';
import Utils from '../../../Utils/Utils';
import { ProffessionalModel } from '../../../Utils/Models';

export class ProffesionalHome extends Component {
    constructor(props) {
        super(props);
        this.http = new HttpService();
        this.userInfoFromCookies = new Utils().getUserInfoFromCookies();
        this.state = {
            userType: new Utils().getUserTypeFromCookies(),
            user: new ProffessionalModel()
        }
    }
    
    render() {
        return (
            <React.Fragment>
                <div className='container gradient-container'>
                    <div className='row student-home-wrapper'>
                        <div className='col-md-8 col-xs-12'>
                            <h3 className='center-content'>- My DashBoard -</h3>
                            <div className='center-content'>
                                <h4>You have not applied to any jobs yet.</h4>
                                <p>Please complete your profile <a href='/edit-profile'>here</a> to get more personalized jobs.</p>
                            </div>
                        </div>
                        <StudentSideBar user={this.userInfoFromCookies}></StudentSideBar>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ProffesionalHome
