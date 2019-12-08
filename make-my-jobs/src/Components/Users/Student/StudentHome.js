import React, { Component } from 'react';
import HttpService from '../../../Utils/HttpServices';
import '../users.css';
import Utils from '../../../Utils/Utils';
import { UserModel } from '../../../Utils/Models';
import StudentSideBar from './StudentSideBar';

export class StudentHome extends Component {
    constructor(props) {
        super(props);
        this.http = new HttpService();
        this.userInfoFromCookies = new Utils().getUserInfoFromCookies();
        this.state = {
            userType: new Utils().getUserTypeFromCookies(),
            user: new UserModel()
        }
    }

    componentDidMount() {
        this.http.postData('http://makemyjobs.me/Student/GetStudentInfo?id=' + this.userInfoFromCookies.userId).then(
            response => {
                if (response.data.results == null) {
                    window.location = '/login';
                }
                else {
                    this.setState({
                        user: response.data.results[0]
                    })
                }
            }).catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <React.Fragment>
                <div className='container gradient-container'>
                    <div className='row student-home-wrapper'>
                        <div className='col-md-8 col-xs-12'>
                            <h3 className='center-content'>- My DashBoard -</h3>
                            <div className='center-content'>
                                <h4>You have not applied to any internships yet.</h4>
                                <p>Please complete your profile <a href='/edit-profile'>here</a> to get more personalized internships.</p>
                            </div>
                        </div>
                        <StudentSideBar user={this.state.user}></StudentSideBar>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default StudentHome
