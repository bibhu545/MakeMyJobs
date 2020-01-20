import React, { Component } from 'react'
import StudentSideBar from '../Users/Student/StudentSideBar'
import Utils, { API_ENDPOINTS } from '../../Utils/Utils'
import HttpService from '../../Utils/HttpServices';
import { JobModel, AnswerModel } from '../../Utils/Models';

export class ApplyJob extends Component {
    constructor(props) {
        super(props)
        this.user = new Utils().getUserInfoFromCookies();
        this.utils = new Utils();
        this.http = new HttpService();
        this.questionOneRef = React.createRef();
        this.questionTwoRef = React.createRef();
        this.questionThreeRef = React.createRef();
        this.state = {
            jobDetails: new JobModel(),
            hasQuestions: false
        }
    }

    componentDidMount() {
        this.jobId = this.utils.getQueryStringValue("id");
        if (!this.utils.isLoggedIn() || this.jobId == null) {
            window.location = '/login';
        }
        else {
            this.http.getData(API_ENDPOINTS.GetJobInfo + '?id=' + this.jobId).then(response => {
                if (response.data != null) {
                    if (response.data.results[0] != null) {
                        var tempJob = response.data.results[0]
                        var tempHasQuestions = false;
                        if (tempJob.questionOne != null || tempJob.questionTwo != null || tempJob.questionThree != null) {
                            tempHasQuestions = true
                        }
                        this.setState({
                            jobDetails: tempJob,
                            hasQuestions: tempHasQuestions
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
    }

    applyJob = () => {
        if (this.state.hasQuestions) {
            var answerOne = '';
            var answerTwo = '';
            var answerThree = '';
            var validAnswers = true;
            if (this.state.jobDetails.questionOne != null) {
                answerOne = this.questionOneRef.current.value;
                if (answerOne.trim() === "") {
                    validAnswers = false;
                }
            }
            if (this.state.jobDetails.questionTwo != null) {
                answerTwo = this.questionTwoRef.current.value;
                if (answerTwo.trim() === "") {
                    validAnswers = false;
                }
            }
            if (this.state.jobDetails.questionThree != null) {
                answerThree = this.questionThreeRef.current.value;
                if (answerThree.trim() === "") {
                    validAnswers = false;
                }
            }
            if (!validAnswers) {
                this.utils.showErrorMessage("Answers can not be empty.");
                return;
            }
        }

        var answerRequest = new AnswerModel();
        answerRequest.userId = this.user.userId;
        answerRequest.postId = this.state.jobDetails.jobId;
        answerRequest.answerOne = answerOne;
        answerRequest.answerTwo = answerTwo;
        answerRequest.answerThree = answerThree;
        this.http.postData(API_ENDPOINTS.ApplyPost, answerRequest).then(response => {
            if (response.data != null) {
                if (response.data.results[0] > 0) {
                    window.location = '/user-home';
                }
                else {
                    this.utils.showErrorMessage("Some error occured. Please Apply again.");
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

    render() {
        const { jobDetails, hasQuestions } = this.state
        return (
            <React.Fragment>
                <div className='container gradient-container'>
                    <div className='row'>
                        <div className='col-md-8 col-xs-12'>
                            <br />
                            <br />
                            <div className='center-content'>
                                <h4>
                                    Your Profile and resume will be shown to employer.
                                    <br />
                                    Please <a href='edit-profile'>Update</a> before applying.
                                    <hr className='short-hr' />
                                    <br />
                                    {
                                        hasQuestions ? <span>Questions from Employer</span> : null
                                    }
                                </h4>
                            </div>
                            {
                                !hasQuestions ? null :
                                    <div className='apply-container'>
                                        {
                                            jobDetails.questionOne == null ? null :
                                                <div className='form-group'>
                                                    <label htmlFor='questionOne'>{jobDetails.questionOne}</label>
                                                    <textarea ref={this.questionOneRef} id='questionOne' name='questionOne' className='form-control' rows='5' placeholder='Place your answer here...'></textarea>
                                                </div>
                                        }
                                        {
                                            jobDetails.questionTwo == null ? null :
                                                <div className='form-group'>
                                                    <label htmlFor='questionTwo'>{jobDetails.questionTwo}</label>
                                                    <textarea id='questionTwo' ref={this.questionTwoRef} name='questionTwo' className='form-control' rows='5' placeholder='Place your answer here...'></textarea>
                                                </div>
                                        }
                                        {
                                            jobDetails.questionThree == null ? null :
                                                <div className='form-group'>
                                                    <label htmlFor='questionThree'>{jobDetails.questionThree}</label>
                                                    <textarea id='questionThree' name='questionThree' ref={this.questionThreeRef} className='form-control' rows='5' placeholder='Place your answer here...'></textarea>
                                                </div>
                                        }
                                    </div>
                            }
                            <div className='center-content'>
                                <button onClick={this.applyJob} className='btn btn-primary'>Confirm application</button>
                            </div>
                        </div>
                        <StudentSideBar user={this.user}></StudentSideBar>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ApplyJob
