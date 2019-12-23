import React, { Component } from 'react'
import HttpService from '../../../Utils/HttpServices';
import { CorporateModel, JobModel, InternshipModel } from '../../../Utils/Models';
import Utils from '../../../Utils/Utils';
import StudentSideBar from '../Student/StudentSideBar';
import JobDescription from './JobDescription';
import Swal from 'sweetalert2'
import InternshipDescription from './InternshipDescription';

export class CorporateHome extends Component {
    constructor(props) {
        super(props);
        this.http = new HttpService();
        this.userInfoFromCookies = new Utils().getUserInfoFromCookies();
        this.utils = new Utils();
        this.state = {
            userType: new Utils().getUserTypeFromCookies(),
            user: new CorporateModel(),
            jobViewOpened: 0,
            job: new JobModel(),
            internshipViewOpened: 0,
            internship: new InternshipModel(),
            selectedCity: [],
            cityOpyions: []
        }
    }

    componentDidMount() {
        this.renderEmployeeData();
    }

    renderEmployeeData = () => {
        this.http.postData('http://makemyjobs.me/Corporate/GetCorporateInfo?id=' + this.userInfoFromCookies.userId).then(
            response => {
                if (response.data.results == null) {
                    // window.location = '/login';
                    this.utils.showErrorMessage("Some error occured. Please refresh the page.");
                }
                else {
                    this.setState({
                        user: response.data.results[0],
                    })
                }
            }).catch(error => {
                console.log(error);
            });
    }

    onOpenJobDeacriptionClicked = (e, jobId) => {
        this.renderJobData(jobId);
        e.preventDefault();

    }

    onOpenJobDeacriptionEditClicked = (e, jobId) => {
        e.preventDefault();
        this.renderJobData(jobId, true);
    }

    deleteJob = (e, jobId) => {
        e.preventDefault();
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                this.http.getData('http://makemyjobs.me/Corporate/DeleteJob?id=' + jobId).then(response => {
                    if (response.data.results != null) {
                        this.renderEmployeeData();
                        if (response.data.results[0]) {
                            this.utils.showInlineDefaultMessage('Experience data deleted.');
                        }
                        else {
                            this.utils.showInlineErrorMessage('Some error occured. Please try again.');
                        }
                    }
                    else {
                        this.utils.showInlineErrorMessage('Some error occured. Please try again.');
                    }
                }).catch(error => {
                    console.log(error);
                    this.utils.showInlineErrorMessage('Some error occured. Please try again.', error);
                });
            }
        })
    }

    //Methods for child
    //for job section

    renderJobData = (jobId, forEdit = false) => {
        this.http.getData('http://makemyjobs.me/Corporate/GetJobInfo?id=' + jobId).then(response => {
            if (response.data != null) {
                if (response.data.results[0] != null) {
                    this.setState({
                        job: response.data.results[0],
                        jobViewOpened: forEdit ? 0 : 1,
                        internshipViewOpened: 0,
                    })
                }
                else {
                    this.utils.showErrorMessage("Some error occured.");
                }
            }
            else {
                this.utils.showErrorMessage("Some error occured.");
            }
        }).catch(error => {
            console.log(error);
            this.utils.showErrorMessage("Some error occured.");
        });
    }

    //for internship section

    renderInternshipData = (internshipId, forEdit = false) => {
        this.http.getData('http://makemyjobs.me/Corporate/GetInternshipInfo?id=' + internshipId).then(response => {
            if (response.data != null) {
                if (response.data.results[0] != null) {
                    this.setState({
                        internship: response.data.results[0],
                        internshipViewOpened: forEdit ? 0 : 1,
                        jobViewOpened: 0
                    })
                }
                else {
                    this.utils.showErrorMessage("Some error occured.");
                }
            }
            else {
                this.utils.showErrorMessage("Some error occured.");
            }
        }).catch(error => {
            console.log(error);
            this.utils.showErrorMessage("Some error occured.");
        });
    }

    handleInternshipFormChange = (e) => {

    }

    updateInternshipDetails = () => {

    }

    onOpenInternshipDeacriptionClicked = (e, internshipId) => {
        this.renderInternshipData(internshipId);
        e.preventDefault();
    }

    onOpenInternshipDeacriptionEditClicked = (e, internshipId) => {
        e.preventDefault();
        this.renderInternshipData(internshipId, true);
    }

    deleteInternship = (e, internshipId) => {
        e.preventDefault();
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                this.http.getData('http://makemyjobs.me/Corporate/DeleteInternship?id=' + internshipId).then(response => {
                    if (response.data.results != null) {
                        this.renderEmployeeData();
                        if (response.data.results[0]) {
                            this.utils.showInlineDefaultMessage('Internship data deleted.');
                        }
                        else {
                            this.utils.showInlineErrorMessage('Some error occured. Please try again.');
                        }
                    }
                    else {
                        this.utils.showInlineErrorMessage('Some error occured. Please try again.');
                    }
                }).catch(error => {
                    console.log(error);
                    this.utils.showInlineErrorMessage('Some error occured. Please try again.', error);
                });
            }
        })
    }

    render() {
        return (
            <React.Fragment>
                <div className='container gradient-container'>
                    <div className='row student-home-wrapper'>
                        <div className='col-md-8 col-xs-12 left-content'>
                            <div className='center-content'>
                                <h3>- My DashBoard -</h3>
                                {
                                    this.state.user.corporateJobs.length > 0 || this.state.user.corporateInternships.length > 0 ?
                                        null :
                                        <h4>
                                            You have not posted any jobs
                                            <a href='/add-job'>(add now)</a> or internships
                                            <a href='/add-internship'>(add now)</a> yet.</h4>
                                }
                                <p>Please complete your profile <a href='/edit-profile'>here</a>.</p>
                            </div>
                            <br />
                            {
                                this.state.user.corporateJobs.length === 0 ?
                                    <div className='center-content'>
                                        You have not posted any jobs yet. <a href='/add-jobs'>(Add now)</a>
                                    </div> :
                                    <React.Fragment>
                                        <h4>Jobs posted by you:
                                        <a href='/add-job' className='btn btn-primary float-right'>Add new job</a>
                                        </h4>
                                        <br />
                                        {
                                            this.state.user.corporateJobs.filter((item, index) => index < 4).map(item =>
                                                <React.Fragment key={item.jobId}>
                                                    <div className='job-desc-user'>
                                                        <div className='row'>

                                                            <div className='col-xs-10'>
                                                                <h4><a href='/jobs'>{item.jobTitle}</a></h4>
                                                                <p>{item.company}</p>
                                                            </div>

                                                            <div className='col-xs-2 right-content'>
                                                                <a href="##" onClick={(e) => this.onOpenJobDeacriptionClicked(e, item.jobId)} data-toggle="modal" data-target="#jobDetailsModal">
                                                                    <span className="glyphicon glyphicon-share"></span>
                                                                </a>

                                                                &nbsp;
                                                                <a href={"edit-job?id=" + item.jobId}>
                                                                    <span className="glyphicon glyphicon-pencil"></span>
                                                                </a>

                                                                &nbsp;
                                                                <a href="##" onClick={(e) => this.deleteJob(e, item.jobId)} >
                                                                    <span className="glyphicon glyphicon-trash"></span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div className='row'>
                                                            <div className='col-sm-5'>
                                                                <i className="fas fa-suitcase"></i>Experience: {item.experience} yrs
                                                            </div>
                                                            <div className='col-sm-7'>
                                                                <i className="fas fa-map-marked"></i> {item.locationNames}
                                                            </div>
                                                        </div>
                                                        {/* <div className='row'>
                                                            <div className='col-sm-12'>
                                                                <i className="fas fa-tags"></i> {item.tags}
                                                            </div>
                                                        </div> */}
                                                        <div className='row'>
                                                            <div className='col-sm-5'>
                                                                <i className="fas fa-rupee-sign"></i>
                                                                Posted on: {this.utils.GetDateFromServer(item.postedOn)}
                                                            </div>
                                                            <div className='col-sm-7'>
                                                                <i className="fas fa-user"></i>
                                                                Expiry date: {this.utils.GetDateFromServer(item.expiryDate)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </React.Fragment>
                                            )
                                        }
                                        {
                                            this.state.user.corporateJobs.length > 4 ?
                                                <a href='/my-jobs' className='btn btn-default float-right'>View all</a> :
                                                null
                                        }

                                    </React.Fragment>
                            }
                            <br />
                            <br />
                            {
                                this.state.user.corporateInternships.length === 0 ?
                                    <div className='center-content'>
                                        You have not posted any internships yet. <a href='/add-internship'>(Add now)</a>
                                    </div> :
                                    <React.Fragment>
                                        <h4>Internships posted by you:
                                        <a href='/add-internship' className='btn btn-primary float-right'>Add new internship</a>
                                        </h4>
                                        <br />
                                        {
                                            this.state.user.corporateInternships.map(item =>
                                                <React.Fragment key={item.internshipId}>
                                                    <div className='job-desc-user'>
                                                        <div className='row'>
                                                            <div className='col-xs-10'>
                                                                <h4><a href='/jobs'>{item.title}</a></h4>
                                                                <p>{item.company}</p>
                                                            </div>
                                                            <div className='col-xs-2 right-content'>
                                                                <a href="##" onClick={(e) => this.onOpenInternshipDeacriptionClicked(e, item.internshipId)} data-toggle="modal" data-target="#jobDetailsModal">
                                                                    <span className="glyphicon glyphicon-share"></span>
                                                                </a>

                                                                &nbsp;
                                                                <a href={"edit-internship?id=" + item.internshipId}>
                                                                    <span className="glyphicon glyphicon-pencil"></span>
                                                                </a>

                                                                &nbsp;
                                                                <a href="##" onClick={(e) => this.deleteInternship(e, item.internshipId)} >
                                                                    <span className="glyphicon glyphicon-trash"></span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div className='row'>
                                                            <div className='col-sm-5'>
                                                                <i className="fas fa-suitcase"></i>Starts from: {this.utils.GetDateFromServer(item.startDate)}
                                                            </div>
                                                            <div className='col-sm-7'>
                                                                <i className="fas fa-map-marked"></i> {item.locationNames}
                                                            </div>
                                                        </div>
                                                        {/* <div className='row'>
                                                            <div className='col-sm-12'>
                                                                <i className="fas fa-tags"></i> {item.tags}
                                                            </div>
                                                        </div> */}
                                                        <div className='row'>
                                                            <div className='col-sm-5'>
                                                                <i className="fas fa-rupee-sign"></i>
                                                                Posted on: {this.utils.GetDateFromServer(item.postedOn)}
                                                            </div>
                                                            <div className='col-sm-7'>
                                                                <i className="fas fa-user"></i>
                                                                Expiry date: {this.utils.GetDateFromServer(item.expiryDate)}
                                                            </div>
                                                        </div>
                                                        <div className='row'>
                                                            <div className='col-sm-10'>
                                                                <i className="fas fa-suitcase"></i>
                                                                {
                                                                    item.isWFHAvailable === 1 ?
                                                                        <span>Work from home available, </span> : null
                                                                }
                                                                {
                                                                    item.isPartTimeAvailable === 1 ?
                                                                        <span>Part time available, </span> : null
                                                                }
                                                                {
                                                                    item.jobOffer === 1 ?
                                                                        <span>Job offer on completion</span> : null
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </React.Fragment>
                                            )
                                        }
                                        {
                                            this.state.user.corporateJobs.length > 5 ?
                                                <a href='/my-internships' className='btn btn-default float-right'>View all</a> :
                                                null
                                        }
                                    </React.Fragment>
                            }
                        </div>
                        <StudentSideBar user={this.userInfoFromCookies}></StudentSideBar>
                    </div>
                </div>

                <div id="jobDetailsModal" className="modal fade" role="dialog">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title center-content">
                                    {
                                        this.state.jobViewOpened === 1 ?
                                            <span>View Job Deatils</span> : null
                                    }
                                    {
                                        this.state.internshipViewOpened === 1 ?
                                            <span>View Internship Deatils</span> : null
                                    }
                                </h4>
                            </div>
                            <div className="modal-body job-description-modal">
                                {
                                    this.state.jobViewOpened === 0 ? null :
                                        <JobDescription job={this.state.job} />
                                }
                                {/* {
                                    this.state.jobEditOpened === 0 ? null :
                                        <JobDescriptionEdit onEditJobSubmit={this.updateJobDetails} handleEditJobFormChange={this.handleEditJobFormChange} job={this.state.job} handleCityChange={this.handleCityChange} selectedCity={this.state.selectedCity} cityOpyions={this.state.cityOpyions} />
                                } */}
                                {
                                    this.state.internshipViewOpened === 0 ? null :
                                        <InternshipDescription internship={this.state.internship} />
                                }
                                {/* {
                                    this.state.internshipEditOpened === 0 ? null :
                                        <InternshipDescriptionEdit internship={this.state.internship} onEditInternshipSubmit={this.updateInternshipDetails} handleInternshipFormChange={this.handleEditJobFormChange} />
                                } */}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment >
        )
    }
}

export default CorporateHome
