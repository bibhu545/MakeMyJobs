import React, { Component } from 'react'
import HttpService from '../../../Utils/HttpServices';
import Utils, { API_ENDPOINTS } from '../../../Utils/Utils';
import { PostFilterModel } from '../../../Utils/Models';
import StudentSideBar from '../Student/StudentSideBar';
import Swal from 'sweetalert2'


export class MyJobs extends Component {
    constructor(props) {
        super(props);
        this.http = new HttpService();
        this.userInfoFromCookies = new Utils().getUserInfoFromCookies();
        this.utils = new Utils();
        this.filterModel = new PostFilterModel();
        this.state = {
            jobs: []
        }
    }

    componentDidMount() {
        if (!this.utils.isLoggedIn()) {
            this.utils.clearLoginDataFromCookies();
            window.location = '/login';
        }
        else {
            this.filterModel.userId = this.userInfoFromCookies.userId;
            this.filterModel.postedBy = this.userInfoFromCookies.userId;
            this.getFilteredData();
        }
    }

    getFilteredData = () => {
        this.http.postData(API_ENDPOINTS.GetJobs, this.filterModel).then(response => {
            this.totalPages = response.data.results[1]
            this.setState({
                jobs: response.data.results[0]
            })
        }).catch(error => {
            console.log(error);
            this.utils.showErrorMessage("Some error occured.");
        })
    }

    handlePager = (e, pagerAction) => {
        e.preventDefault();
        this.filterModel.page += pagerAction;
        this.getFilteredData();
    }

    deletePost = (e, id) => {
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
                this.http.getData(API_ENDPOINTS.DeletePost + '?id=' + id).then(response => {
                    if (response.data.results != null) {
                        //this.renderEmployeeData();
                        if (response.data.results[0]) {
                            this.utils.showInlineDefaultMessage('Experience data deleted.');
                            this.getFilteredData();
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
                        <div className='col-md-8 col-sm-12 jobs-wrapper'>
                            <h3 className='center-content'>Jobs Posted By You</h3>
                            {
                                this.state.jobs.length === 0 ? null :
                                    this.state.jobs.map(item =>
                                        <React.Fragment key={item.jobId}>

                                            <div className='job-desc-user job-desc'>
                                                <div className='row'>
                                                    <div className='col-xs-10'>
                                                        <h4><a target='_blank' rel='noopener noreferrer' className='job-link' href={'/job-description?id=' + item.jobId}>{item.jobTitle}</a></h4>
                                                        <p>{item.company}</p>

                                                        <p>
                                                            <i className="fas fa-map-marked"></i>Locations:
                                                                {item.locationNames == null ? <span>Not specified</span> : item.locationNames}
                                                        </p>
                                                    </div>
                                                    <div className='col-xs-2 right-content'>
                                                        <a href={'view-applicants?postId=' + item.jobId}><span className="label label-primary">{item.totalApplications} Applied</span></a>
                                                        &nbsp;
                                                        <a href={"edit-job?id=" + item.jobId}>
                                                            <span className="glyphicon glyphicon-pencil"></span>
                                                        </a>

                                                        &nbsp;
                                                        <a href="##" onClick={(e) => this.deletePost(e, item.jobId)} >
                                                            <span className="glyphicon glyphicon-trash"></span>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='col-sm-5'>
                                                        <i className="fas fa-suitcase"></i>Experience: {item.experience} yrs
                                                        </div>
                                                    <div className='col-sm-7'>
                                                        <i className="fas fa-rupee-sign"></i>
                                                        Salary: {item.minSalary}
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='col-sm-5'>
                                                        {
                                                            item.skillNames == null ? null :
                                                                <span>
                                                                    <i className="fas fa-laptop-code"></i>
                                                                    Skills: {item.skillNames}
                                                                </span>
                                                        }
                                                    </div>
                                                    <div className='col-sm-7'>
                                                        {
                                                            item.tagNames == null ? null :
                                                                <span>
                                                                    <i className="fas fa-tags"></i>
                                                                    Tags: {item.tagNames}
                                                                </span>
                                                        }
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='col-sm-5'>
                                                        <i className="fas fa-calendar-week"></i>
                                                        Posted on: {this.utils.GetDateFromServer(item.postedOn)}
                                                    </div>
                                                    <div className='col-sm-7'>
                                                        <i className="fas fa-calendar-week"></i>
                                                        Expiry date: {this.utils.GetDateFromServer(item.expiryDate)}
                                                    </div>
                                                    {
                                                        !item.applied ? null :
                                                            <div className='pull-right'>
                                                                Already applied
                                                                </div>
                                                    }
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    )
                            }
                            <ul className="pager">
                                {
                                    this.filterModel.page <= 0 ? null :
                                        <li>
                                            <a href="##" onClick={(e) => this.handlePager(e, -1)}>&lt; Previous</a>
                                        </li>
                                }
                                <li>Page: {this.filterModel.page + 1}</li>
                                {
                                    this.filterModel.page >= this.totalPages ? null :
                                        <li>
                                            <a href="##" onClick={(e) => this.handlePager(e, 1)}>Next &gt;</a>
                                        </li>
                                }
                            </ul>
                        </div>
                        <StudentSideBar user={this.userInfoFromCookies}></StudentSideBar>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default MyJobs
