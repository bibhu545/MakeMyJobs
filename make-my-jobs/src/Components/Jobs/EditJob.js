import React, { Component } from 'react'
import Utils from '../../Utils/Utils';
import HttpService from '../../Utils/HttpServices';
import { JobModel } from '../../Utils/Models';
import Select from 'react-select';
import StudentSideBar from '../Users/Student/StudentSideBar';
import Swal from 'sweetalert2'


export class EditJob extends Component {
    constructor(props) {
        super(props)
        this.utils = new Utils()
        this.http = new HttpService()
        this.userInfoFromCookies = new Utils().getUserInfoFromCookies()
        this.state = {
            selectedCity: [],
            cityOptions: [],
            selectedTag: [],
            tagOptions: [],
            selectedSkill: [],
            skillOptions: [],
            job: new JobModel()
        }
    }

    componentDidMount() {
        this.http.getData('http://makemyjobs.me/Common/GetCommonDataForNewPost').then(response => {
            if (response.data.results.length > 0) {
                var citiesFromServer = response.data.results[0];
                var tagsFromServer = response.data.results[2];
                var skillsFromServer = response.data.results[1];

                var tempCities = [];
                citiesFromServer.forEach(element => {
                    tempCities.push({ value: element.value, label: element.text });
                });

                var tempTags = [];
                tagsFromServer.forEach(element => {
                    tempTags.push({ value: element.value, label: element.text });
                });

                var tempSkills = [];
                skillsFromServer.forEach(element => {
                    tempSkills.push({ value: element.value, label: element.text });
                });

                this.setState({
                    cityOptions: tempCities,
                    tagOptions: tempTags,
                    skillOptions: tempSkills
                })
            }
        }).catch(error => {
            console.log(error);
        });

        var jobId = this.utils.getQueryStringValue("id");
        if (this.utils.isLoggedIn() && this.utils.getUserTypeFromCookies() === '3') {
            if (jobId == null) {
                window.location = '/user-home';
            }
            else {
                this.loadJobData(jobId);
            }
        }
        else {
            window.location = "/login";
        }
    }

    loadJobData = (jobId) => {
        this.http.getData('http://makemyjobs.me/Corporate/GetJobInfo?id=' + jobId).then(response => {
            if (response.data != null) {
                if (response.data.results[0] != null) {
                    var tempJob = response.data.results[0]

                    var tempSelectedCity = []
                    tempJob.locations.forEach(element => {
                        tempSelectedCity.push({ value: element.value, label: element.text })
                    });

                    var tempSelectedSkill = []
                    tempJob.skills.forEach(element => {
                        tempSelectedSkill.push({ value: element.value, label: element.text })
                    });

                    var tempSelectedTag = []
                    tempJob.tags.forEach(element => {
                        tempSelectedTag.push({ value: element.value, label: element.text })
                    });
                    
                    tempJob.expiryDate = this.utils.formatDateToBind(tempJob.expiryDate);
                    if (tempJob.questionOne == null) {
                        tempJob.questionOne = '';
                    }
                    if (tempJob.questionTwo == null) {
                        tempJob.questionTwo = '';
                    }
                    if (tempJob.questionThree == null) {
                        tempJob.questionThree = '';
                    }
                    this.setState({
                        selectedCity: tempSelectedCity,
                        selectedSkill: tempSelectedSkill,
                        selectedTag: tempSelectedTag,
                        job: tempJob
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

    onJobEdited = (e) => {
        e.preventDefault();
        var tempJob = this.state.job;
        tempJob.userId = this.userInfoFromCookies.userId;

        var cities = [];
        if (this.state.selectedCity != null) {
            this.state.selectedCity.forEach(element => {
                cities.push({ value: element.value, text: element.label });
            });
        }
        var tempTags = [];
        if (this.state.selectedTag != null) {
            this.state.selectedTag.forEach(element => {
                tempTags.push({ value: element.value, text: element.label });
            });
        }

        var tempSkills = [];
        if (this.state.selectedSkill != null) {
            this.state.selectedSkill.forEach(element => {
                tempSkills.push({ value: element.value, text: element.label });
            });
        }

        tempJob.locations = cities;
        tempJob.tags = tempTags;
        tempJob.skills = tempSkills;
        this.http.postData('http://makemyjobs.me/Corporate/UpdateJob', tempJob).then(response => {
            if (response.data != null) {
                if (response.data.results[0] > 0) {
                    Swal.fire({
                        title: '<strong>Data updated</strong>',
                        icon: 'info',
                        html:
                            'Go to <a href="/user-home">Home</a> or <br />',
                        showCloseButton: true,
                        focusConfirm: false,
                        confirmButtonText:
                            '<i class="fa fa-thumbs-up"></i> Update More',
                        confirmButtonAriaLabel: 'Thumbs up, great!'
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

    handleEditJobFormChange = (e) => {
        let inputName = e.target.name;
        let inputValue = e.target.value;
        let statusCopy = Object.assign({}, this.state);
        statusCopy.job[inputName] = inputValue;
        this.setState(statusCopy);
    }

    handleCityChange = selectedCity => {
        this.setState({
            selectedCity
        })
    };

    handleTagChange = selectedTag => {
        this.setState({
            selectedTag
        })
    }

    handleSkillChange = selectedSkill => {
        this.setState({
            selectedSkill
        })
    }

    render() {
        const { job } = this.state
        return (
            <React.Fragment>
                <div className='container gradient-container'>
                    <div className='row'>
                        <div className='col-md-8 col-xs-12'>
                            <br />
                            <h3 className='center-content'>- Edit job details -</h3>
                            <form onSubmit={this.onJobEdited}>
                                <div className='form-group'>
                                    <label htmlFor='jobTitle'>Job title*:</label>
                                    <input type='text' className='form-control' name='jobTitle' id='jobTitle' placeholder='E.g. Senior Software Engineer' value={job.jobTitle} onChange={this.handleEditJobFormChange} />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='descrption'>Job description*:</label>
                                    <textarea rows='5' className='form-control' name='description' id='descrption' placeholder='Some key points about this job' value={job.description} onChange={this.handleEditJobFormChange}></textarea>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='locations'>Locations*:</label>
                                    <Select
                                        value={this.state.selectedCity}
                                        isMulti
                                        name='locations'
                                        onChange={this.handleCityChange}
                                        options={this.state.cityOptions}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        id='locations'
                                    />
                                </div>
                                <div className='row'>
                                    <div className='col-md-6 col-xs-12'>
                                        <div className='form-group'>
                                            <label htmlFor='experience'>Minimum Experience*:</label>
                                            <input type='number' className='form-control' name='experience' id='experience' placeholder='E.g. 4(in years only)' value={job.experience} onChange={this.handleEditJobFormChange} />
                                        </div>
                                    </div>
                                    <div className='col-md-6 col-xs-12'>
                                        <div className='form-group'>
                                            <label htmlFor='expiryDate'>Expires on*:</label>
                                            <input type='date' className='form-control' name='expiryDate' id='expiryDate' value={job.expiryDate} onChange={this.handleEditJobFormChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-4 col-xs-12'>
                                        <div className='form-group'>
                                            <label htmlFor='minSalary'>Min salary*:</label>
                                            <input type='number' className='form-control' name='minSalary' id='minSalary' placeholder='In INR Only' value={job.minSalary} onChange={this.handleEditJobFormChange} />
                                        </div>
                                    </div>
                                    <div className='col-md-4 col-xs-12'>
                                        <div className='form-group'>
                                            <label htmlFor='maxSalary'>Max salary:</label>
                                            <input type='number' className='form-control' name='maxSalary' id='maxSalary' placeholder='Leave blank if subject dependant' value={job.maxSalary} onChange={this.handleEditJobFormChange} />
                                        </div>
                                    </div>
                                    <div className='col-md-4 col-xs-12'>
                                        <div className='form-group'>
                                            <label htmlFor='postsAvailable'>Posts available:</label>
                                            <input type='number' className='form-control' name='postsAvailable' id='postsAvailable' placeholder='E.g. 5' value={job.postsAvailable} onChange={this.handleEditJobFormChange} />
                                        </div>
                                    </div>
                                    <div className='col-xs-12'>
                                        <small>
                                            <i>
                                                P.S: Leave 'Max salary' or 'Posts available' as 0 if not specified.
                                            </i>
                                        </small>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-6 col-xs-12'>
                                        <div className='form-group'>
                                            <label htmlFor='tags'>Tags*:</label>
                                            {/* <input type='text' className='form-control' name='tags' id='tags' placeholder='Select at least one location' /> */}
                                            <Select
                                                value={this.state.selectedTag}
                                                isMulti
                                                name='tags'
                                                onChange={this.handleTagChange}
                                                options={this.state.tagOptions}
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                                id='tags'
                                            />
                                        </div>
                                    </div>
                                    <div className='col-md-6 col-xs-12'>
                                        <div className='form-group'>
                                            <label htmlFor='skills'>Skills Required*:</label>
                                            {/* <input type='text' className='form-control' name='skills' id='skills' placeholder='Select at least one location' /> */}
                                            <Select
                                                value={this.state.selectedSkill}
                                                isMulti
                                                name='skills'
                                                onChange={this.handleSkillChange}
                                                options={this.state.skillOptions}
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                                id='skills'
                                            />
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className='center-content'>
                                    <h4>Optional Content</h4>
                                    <p>These questions will be asked to applicant while applying for this job.</p>
                                </div>
                                <hr />
                                <div className='form-group'>
                                    <label htmlFor='questionOne'>Question 1:</label>
                                    <textarea rows='3' className='form-control' name='questionOne' id='questionOne' placeholder='E.g. Please provide Links or demos of works.' value={job.questionOne} onChange={this.handleEditJobFormChange} />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='questionTwo'>Question 2:</label>
                                    <textarea rows='3' className='form-control' name='questionTwo' id='questionTwo' placeholder='E.g. Some questions related to this job.' value={job.questionTwo} onChange={this.handleEditJobFormChange} />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='questionThree'>Question 3:</label>
                                    <textarea rows='3' className='form-control' name='questionThree' id='questionThree' placeholder='E.g. Some other basic questions.' value={job.questionThree} onChange={this.handleEditJobFormChange} />
                                </div>
                                <div className='center-content'>
                                    <button type='submit' className='btn btn-primary'>Update Now</button>
                                    <a href='/user-home' className='btn btn-default'>Cancel</a>
                                </div>
                            </form>
                            <br />
                        </div>
                        <StudentSideBar user={this.userInfoFromCookies}></StudentSideBar>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default EditJob
