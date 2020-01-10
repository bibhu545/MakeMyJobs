import React, { Component } from 'react'
import StudentSideBar from '../Student/StudentSideBar'
import Utils from '../../../Utils/Utils'
import HttpService from '../../../Utils/HttpServices'


export class ViewApplicants extends Component {
    constructor(props) {
        super(props)
        this.utils = new Utils()
        this.http = new HttpService()
        this.userInfoFromCookies = new Utils().getUserInfoFromCookies();
        this.jobId = 0;
        this.state = {
            studentApplicants: [],
            employeeApplicants: [],
            applicantDetails: null
        }
    }

    componentDidMount() {
        this.getAppliedProfiles();
    }

    getAppliedProfiles = () => {
        var jobId = this.utils.getQueryStringValue("jobId");
        this.jobId = jobId;
        var internshipId = this.utils.getQueryStringValue("internshipId");
        if (this.utils.isLoggedIn() && this.utils.getUserTypeFromCookies() === '3') {
            if (jobId != null) {
                if (internshipId != null) {
                    window.location = '/user-home';
                }
                else {
                    this.http.getData('http://makemyjobs.me/Corporate/GetAppliedProfiles?jobId=' + jobId + '&internshipId=0').then(response => {
                        if (response.data.results != null) {
                            this.setState({
                                studentApplicants: response.data.results[0],
                                employeeApplicants: response.data.results[1]
                            })
                        }
                        else {
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
            this.utils.clearLoginDataFromCookies();
            window.location = '/login';
        }
    }

    openApplicantDetails = (e, item) => {
        this.setState({
            applicantDetails: item
        });
    }

    onApplicantActionTaken = (e, forStudent = false, forReject = false, userId, jobId) => {
        var forRejectInt = forReject ? 1 : 0;
        var forStudentInt = forStudent ? 1 : 0;
        var url = "http://makemyjobs.me/Corporate/SaveApplicantResponse?forStudent=" + forStudentInt + "&forReject=" + forRejectInt + "&userId=" + userId + "&jobId=" + jobId;

        //Make methods for save response message 

        this.http.getData(url).then(response => {
            if (response.data != null) {
                this.utils.showDefaultMessage("Status updated.");
                this.getAppliedProfiles();
            }
            else {
                this.utils.showErrorMessage("Some error occured, Please try again.");
            }
        }).catch(error => {
            console.log(error)
            this.utils.showErrorMessage("Internal error occured. Please try again.");
        });

    }

    renderApplicationStatus = (status, item) => {
        switch (status) {
            case 0:
                return <React.Fragment>
                    <a href="##" onClick={(e) => this.onApplicantActionTaken(e, true, false, item.applicationInfo.userId, item.applicationInfo.jobId)} className='text-success'>Accept </a>
                    /
                    <a href="##" onClick={(e) => this.onApplicantActionTaken(e, true, true, item.applicationInfo.userId, item.applicationInfo.jobId)} className='text-danger'> Reject</a>
                </React.Fragment>
            case 2:
                return <span className='text-success'>Approved</span>
            case 3:
                return <span className='text-danger'>Rejected</span>
            default:
                return "";
        }
    }

    render() {
        const { studentApplicants, employeeApplicants, applicantDetails } = this.state
        return (
            <div className='container gradient-container'>
                <div className='row'>
                    <div className='col-sm-8 col-xs-12 left-table'>

                        <div className='center-content'>
                            <h4>Applicants for Job</h4>
                        </div>

                        {/* Place datatable here */}

                        <div className='table-responsive'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <td colSpan='5' className='center-content text-primary'>
                                            <strong>Students</strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Contact Number</th>
                                        <th>Resume</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        studentApplicants.map((item, index) =>
                                            <tr key='index'>
                                                <td>{item.studentInfo.firstName + " " + item.studentInfo.lastName}</td>
                                                <td>{item.studentInfo.email}</td>
                                                <td>
                                                    {
                                                        item.studentInfo.contactNumber == null ?
                                                            <small><i>Not provided</i></small> :
                                                            item.studentInfo.contactNumber
                                                    }
                                                </td>
                                                <td>
                                                    {item.studentInfo.resume == null ? <small><i>Not provided</i></small> : <a href="##" onClick={(e) => this.utils.getResume(e, item.studentInfo.studentId, 0)}>Veiw</a>}
                                                </td>
                                                <td>
                                                    <a href="##" onClick={(e) => this.openApplicantDetails(e, item.studentInfo)} data-toggle="modal" data-target="#applicantDetailsModal">View Details</a>
                                                    <br />

                                                    {
                                                        this.renderApplicationStatus(item.applicationInfo.status, item)
                                                    }

                                                </td>
                                            </tr>
                                        )
                                    }
                                    <tr>
                                        <td colSpan='5' className='center-content text-primary'>
                                            <strong>Proffesionals</strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Contact Number</th>
                                        <th>Resume</th>
                                        <th>Action</th>
                                    </tr>
                                    {
                                        employeeApplicants.map((item, index) =>
                                            <tr key='index'>
                                                <td>{item.employeeInfo.firstName + " " + item.employeeInfo.lastName}</td>
                                                <td>{item.employeeInfo.email}</td>
                                                <td>
                                                    {
                                                        item.employeeInfo.contactNumber == null ?
                                                            <small><i>Not provided</i></small> :
                                                            item.employeeInfo.contactNumber
                                                    }
                                                </td>
                                                <td>
                                                    {item.employeeInfo.resume == null ? <small><i>Not provided</i></small> : <a href="##" onClick={(e) => this.utils.getResume(e, 0, item.employeeInfo.employeeId)}>Veiw</a>}
                                                </td>
                                                <td>
                                                    <a href="##" onClick={(e) => this.openApplicantDetails(e, item.employeeInfo)} data-toggle="modal" data-target="#applicantDetailsModal">View Details</a>
                                                    <br />
                                                    {
                                                        this.renderApplicationStatus(item.applicationInfo.status, item)
                                                    }
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>

                            <div id="applicantDetailsModal" className="modal fade" role="dialog">
                                <div className="modal-dialog">

                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                                            <h4 className="modal-title center-content">Applicant Details</h4>
                                        </div>
                                        <div className="modal-body">
                                            {
                                                applicantDetails == null ? null :
                                                    <React.Fragment>
                                                        <div className='row'>
                                                            <div className='col-sm-4 col-xs-12'>
                                                                Name:
                                                            </div>
                                                            <div className='col-sm-8 col-xs-12'>
                                                                {applicantDetails.firstName + " " + applicantDetails.lastName}
                                                            </div>
                                                        </div>
                                                        <div className='row'>
                                                            <div className='col-sm-4 col-xs-12'>
                                                                Date of birth:
                                                            </div>
                                                            <div className='col-sm-8 col-xs-12'>
                                                                {this.utils.GetDateFromServer(applicantDetails.dateOfBirth)}
                                                            </div>
                                                        </div>
                                                        {
                                                            applicantDetails.studentId == null ? null :
                                                                <div className='row'>
                                                                    <div className='col-sm-4 col-xs-12'>
                                                                        College Name:
                                                                    </div>
                                                                    <div className='col-sm-8 col-xs-12'>
                                                                        {applicantDetails.collegeName}
                                                                    </div>
                                                                </div>
                                                        }
                                                        {
                                                            applicantDetails.employeeId == null ? null :
                                                                <div className='row'>
                                                                    <div className='col-sm-4 col-xs-12'>
                                                                        Current city:
                                                                    </div>
                                                                    <div className='col-sm-8 col-xs-12'>
                                                                        {applicantDetails.city}
                                                                    </div>
                                                                </div>
                                                        }
                                                        <div className='row'>
                                                            <div className='col-sm-4 col-xs-12'>
                                                                Address:
                                                            </div>
                                                            <div className='col-sm-8 col-xs-12'>
                                                                {applicantDetails.address}
                                                            </div>
                                                        </div>
                                                        <div className='row'>
                                                            <div className='col-sm-4 col-xs-12'>
                                                                Email:
                                                            </div>
                                                            <div className='col-sm-8 col-xs-12'>
                                                                {applicantDetails.email}
                                                            </div>
                                                        </div>
                                                        <div className='row'>
                                                            <div className='col-sm-4 col-xs-12'>
                                                                Contact Number:
                                                            </div>
                                                            <div className='col-sm-8 col-xs-12'>
                                                                {applicantDetails.contactNumber}
                                                            </div>
                                                        </div>
                                                        {/* <div className='row'>
                                                            <div className='col-sm-4 col-xs-12'>
                                                                Resume:
                                                            </div>
                                                            <div className='col-sm-8 col-xs-12'>
                                                                {
                                                                    applicantDetails.resume == null ?
                                                                        <small><i>Not provided</i></small> :
                                                                        <a href={'/download-resume?employeeId=' + applicantDetails.employeeId} target='_blank' rel='noopener noreferrer'>Veiw Applicant Resume</a>
                                                                }
                                                            </div>
                                                        </div> */}
                                                    </React.Fragment>
                                            }
                                        </div>
                                        <div className="modal-footer">
                                            {/* <button className='btn btn-primary'>Approve</button>
                                            <button className='btn btn-danger'>Reject</button> */}
                                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                    <StudentSideBar user={this.userInfoFromCookies}></StudentSideBar>
                </div>
            </div>
        )
    }
}

export default ViewApplicants
