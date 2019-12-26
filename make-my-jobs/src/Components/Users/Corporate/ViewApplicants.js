import React, { Component } from 'react'
import StudentSideBar from '../Student/StudentSideBar'
import Utils from '../../../Utils/Utils'
import HttpService from '../../../Utils/HttpServices'

export class ViewApplicants extends Component {
    constructor(props) {
        super(props)
        this.utils = new Utils()
        this.http = new HttpService()
        this.userInfoFromCookies = new Utils().getUserInfoFromCookies()
        this.state = {
            applicants: []
        }
    }

    componentDidMount() {
        var jobId = this.utils.getQueryStringValue("jobId");
        var internshipId = this.utils.getQueryStringValue("internshipId");
        console.log(jobId)
        if (this.utils.isLoggedIn()) {
            if (jobId != null) {
                if (internshipId != null) {
                    window.location = '/user-home';
                }
                else {
                    this.http.getData('http://makemyjobs.me/Corporate/GetAppliedProfiles?jobId=' + jobId + '&internshipId=0').then(response => {
                        if (response.data.results != null) {
                            this.setState({
                                applicants: response.data.results[0]
                            })
                        }
                        else{
                            this.utils.showErrorMessage("Some error occured. Please try refrehing the page.");
                        }
                    }).catch(error => {
                        console.log(error);
                        this.utils.showErrorMessage("Some error occured. Please try again.");
                    });
                }
            }
            else if (internshipId != null) {
                if (jobId != null) {
                    window.location = '/user-home';
                }
                else {

                }
            }
            else if (jobId == null && internshipId == null) {
                window.location = '/user-home'
            }
        }
        else {
            window.location = '/login';
        }
    }

    render() {
        // const { applicants } = this.state
        return (
            <div className='container gradient-container'>
                <div className='row'>
                    <div className='col-sm-8 col-xs-12'>
                        {/* Place datatable here */}
                    </div>
                    <StudentSideBar user={this.userInfoFromCookies}></StudentSideBar>
                </div>
            </div>
        )
    }
}

export default ViewApplicants
