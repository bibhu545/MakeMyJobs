import React, { Component } from 'react'
import Utils, { API_ENDPOINTS } from '../../../Utils/Utils';
import HttpService from '../../../Utils/HttpServices';

export class DownloadResume extends Component {
    constructor(props) {
        super(props)
        this.utils = new Utils();
        this.http = new HttpService();
        this.state = {

        }
    }

    componentDidMount() {
        if (this.utils.isLoggedIn()) {
            if (this.utils.getQueryStringValue("studentId") != null) {
                this.getResume(this.utils.getQueryStringValue("studentId"), 0);
            }
            else if (this.utils.getQueryStringValue("employeeId") != null) {
                this.getResume(0, this.utils.getQueryStringValue("employeeId"));
            }
            else {
                window.location = '/user-home';
            }
        }
        else {
            window.location = '/login';
        }
    }

    getResume = (studentId, employeeId) => {
        window.open(API_ENDPOINTS.ViewResume + '?studentId=' + studentId + "&employeeId=" + employeeId);
    }

    render() {
        console.log(this.props);
        return (
            <div className='container gradient-container'>
                <h2 className='center-content'>View Resume here...</h2>
            </div>
        )
    }
}

export default DownloadResume
