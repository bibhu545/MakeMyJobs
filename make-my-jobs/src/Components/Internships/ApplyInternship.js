import React, { Component } from 'react'
import Utils from '../../Utils/Utils'
import HttpService from '../../Utils/HttpServices';
import { InternshipModel, AnswerModel } from '../../Utils/Models';
import StudentSideBar from '../Users/Student/StudentSideBar';

export class ApplyInternship extends Component {
    constructor(props) {
        super(props)
        this.utils = new Utils();
        this.http = new HttpService();
        this.user = new Utils().getUserInfoFromCookies();
        this.questionOneRef = React.createRef();
        this.questionTwoRef = React.createRef();
        this.questionThreeRef = React.createRef();
        this.state = {
            internDetails: new InternshipModel(),
            hasQuestions: false
        }
    }

    componentDidMount() {
        if (this.utils.isLoggedIn()) {
            this.internshipId = this.utils.getQueryStringValue("id");
            if (this.internshipId == null) {
                window.location = '/home';
            }
            else {
                this.http.getData('http://makemyjobs.me/Corporate/GetInternshipInfo?id=' + this.internshipId).then(response => {
                    if (response.data != null) {
                        if (response.data.results[0] != null) {
                            var tempInternship = response.data.results[0]
                            var tempHasQuestions = false;
                            if (tempInternship.questionOne != null || tempInternship.questionTwo != null || tempInternship.questionThree != null) {
                                tempHasQuestions = true
                            }
                            this.setState({
                                internDetails: tempInternship,
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
        else {
            this.utils.clearLoginDataFromCookies();
            window.location = '/login';
        }
    }

    applyInternship = () => {
        if (this.state.hasQuestions) {
            var answerOne = '';
            var answerTwo = '';
            var answerThree = '';
            var validAnswers = true;
            if (this.state.internDetails.questionOne != null) {
                answerOne = this.questionOneRef.current.value;
                if (answerOne.trim() === "") {
                    validAnswers = false;
                }
            }
            if (this.state.internDetails.questionTwo != null) {
                answerTwo = this.questionTwoRef.current.value;
                if (answerTwo.trim() === "") {
                    validAnswers = false;
                }
            }
            if (this.state.internDetails.questionThree != null) {
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
        answerRequest.internshipId = this.state.internDetails.internshipId;
        answerRequest.answerOne = answerOne;
        answerRequest.answerTwo = answerTwo;
        answerRequest.answerThree = answerThree;
        this.http.postData('http://makemyjobs.me/Corporate/ApplyInternship', answerRequest).then(response => {
            console.log(response)
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
        const { internDetails, hasQuestions } = this.state
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
                                            internDetails.questionOne == null ? null :
                                                <div className='form-group'>
                                                    <label htmlFor='questionOne'>{internDetails.questionOne}</label>
                                                    <textarea ref={this.questionOneRef} id='questionOne' name='questionOne' className='form-control' rows='5' placeholder='Place your answer here...'></textarea>
                                                </div>
                                        }
                                        {
                                            internDetails.questionTwo == null ? null :
                                                <div className='form-group'>
                                                    <label htmlFor='questionTwo'>{internDetails.questionTwo}</label>
                                                    <textarea id='questionTwo' ref={this.questionTwoRef} name='questionTwo' className='form-control' rows='5' placeholder='Place your answer here...'></textarea>
                                                </div>
                                        }
                                        {
                                            internDetails.questionThree == null ? null :
                                                <div className='form-group'>
                                                    <label htmlFor='questionThree'>{internDetails.questionThree}</label>
                                                    <textarea id='questionThree' name='questionThree' ref={this.questionThreeRef} className='form-control' rows='5' placeholder='Place your answer here...'></textarea>
                                                </div>
                                        }
                                    </div>
                            }
                            <div className='center-content'>
                                <button onClick={this.applyInternship} className='btn btn-primary'>Confirm application</button>
                            </div>
                        </div>
                        <StudentSideBar user={this.user}></StudentSideBar>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ApplyInternship
