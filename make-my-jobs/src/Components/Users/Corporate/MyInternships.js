import React, { Component } from 'react'
import Utils, { API_ENDPOINTS } from '../../../Utils/Utils';
import Swal from 'sweetalert2';
import HttpService from '../../../Utils/HttpServices';
import { PostFilterModel } from '../../../Utils/Models';
import StudentSideBar from '../Student/StudentSideBar';

export class MyInternships extends Component {
    constructor(props) {
        super(props)
        this.http = new HttpService();
        this.utils = new Utils();
        this.filterModel = new PostFilterModel();
        this.totalPages = 0;
        this.userInfoFromCookies = new Utils().getUserInfoFromCookies();
        this.state = {
            internships: []
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
        this.http.postData(API_ENDPOINTS.GetInternships, this.filterModel).then(response => {
            this.totalPages = response.data.results[1]
            this.setState({
                internships: response.data.results[0]
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
        const { internships } = this.state;
        return (
            <React.Fragment>
                <div className='container gradient-container'>
                    <div className='row student-home-wrapper'>
                        <div className='col-md-8 col-sm-12 jobs-wrapper'>
                            <h3 className='center-content'>Internships Posted By You</h3>
                            {
                                internships.map(item =>
                                    <React.Fragment key={item.internshipId}>

                                        <div className='job-desc-user job-desc'>
                                            <div className='row'>
                                                <div className='col-xs-10'>
                                                    <h4>
                                                        <a target='_blank' className='job-link' rel='noopener noreferrer' href={'/internship-description?id=' + item.internshipId}>
                                                            {item.title}
                                                        </a>
                                                    </h4>
                                                    <p>
                                                        <i className="fas fa-map-marked"></i>
                                                        Locations:
                                                                {
                                                            item.locationNames == null ?
                                                                <span>Not specified</span> : item.locationNames
                                                        }
                                                    </p>
                                                </div>
                                                <div className='col-xs-2 right-content'>
                                                    <a href={'view-applicants?postId=' + item.internshipId}><span className="label label-primary">{item.totalApplications} Applied</span></a>
                                                    &nbsp;
                                                        <a href={"edit-internship?id=" + item.internshipId}>
                                                        <span className="glyphicon glyphicon-pencil"></span>
                                                    </a>

                                                    &nbsp;
                                                        <a href="##" onClick={(e) => this.deletePost(e, item.internshipId)} >
                                                        <span className="glyphicon glyphicon-trash"></span>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-sm-5'>
                                                    <i className="fas fa-suitcase"></i>Starts from: {this.utils.GetDateFromServer(item.startDate)}
                                                </div>
                                                <div className='col-sm-7'>
                                                    <i className="fas fa-rupee-sign"></i>
                                                    {item.minStipend}
                                                    {
                                                        item.maxStipend === 0 ? null :
                                                            <span>- {item.maxStipend}</span>
                                                    }
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

export default MyInternships
