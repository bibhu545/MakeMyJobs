import React, { Component } from 'react'
import Select from 'react-select';
import HttpService from '../../Utils/HttpServices';
import { JobModel } from '../../Utils/Models';
import Utils from '../../Utils/Utils';


export class AddJob extends Component {

    constructor(props) {
        super(props)
        this.http = new HttpService();
        this.user = new Utils().getUserInfoFromCookies();
        this.utils = new Utils();
        this.state = {
            selectedCity: [],
            cityOptions: [],
            selectedTag: [],
            tagOptions: [],
            selectedSkill: [],
            skillOptions: [],
            questions: [],
            job: new JobModel()
        }
    }

    componentDidMount() {
        if (this.utils.isLoggedIn()) {
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
        } else {
            this.utils.clearLoginDataFromCookies();
            window.location = '/login';
        }
    }

    handleJobFormChange = (e) => {
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

    onJobsCreated = (e) => {
        e.preventDefault();
        var tempJob = this.state.job;
        tempJob.userId = this.user.userId;

        var cities = [];
        this.state.selectedCity.forEach(element => {
            cities.push({ value: element.value, text: element.label });
        });
        var tempTags = [];
        this.state.selectedTag.forEach(element => {
            tempTags.push({ value: element.value, text: element.label });
        });
        var tempSkills = [];
        this.state.selectedSkill.forEach(element => {
            tempSkills.push({ value: element.value, text: element.label });
        });

        tempJob.locations = cities;
        tempJob.tags = tempTags;
        tempJob.skills = tempSkills;
        var validationMessage = this.validateJobForm(tempJob);
        if (validationMessage !== "") {
            this.utils.showErrorMessage(validationMessage);
        }
        else {
            this.http.postData('http://makemyjobs.me/Corporate/CreateJob', tempJob).then(response => {
                if (response.data.results != null) {
                    if (response.data.results[0] > 1) {
                        window.location = '/user-home';
                    }
                    else {
                        this.utils.showErrorMessage("Some error occured. Please try again.");
                    }
                }
                else {
                    this.utils.showErrorMessage("Some error occured. Please try again.");
                }
            }).catch(error => {
                console.log(error);
                this.utils.showErrorMessage("Internal server error.");
            });
        }
    }

    validateJobForm = (tempJob) => {
        var errorMessage = "";
        if (tempJob.locations.length === 0) {
            errorMessage = "Please select at least one location.";
        }
        return errorMessage;
    }

    render() {
        return (
            <React.Fragment>
                <div className='container gradient-container'>
                    <div className='row'>
                        <h3 className='center-content'>- Post a New Job -</h3>
                        <div className='col-md-2 col-xs-12'></div>
                        <div className='col-md-8 col-xs-12'>
                            <form onSubmit={this.onJobsCreated}>
                                <div className='form-group'>
                                    <label htmlFor='jobTitle'>Job title*:</label>
                                    <input type='text' className='form-control' name='jobTitle' id='jobTitle' placeholder='E.g. Senior Software Engineer' onChange={this.handleJobFormChange} />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='descrption'>Job description*:</label>
                                    <textarea rows='5' className='form-control' name='description' id='descrption' placeholder='Some key points about this job' onChange={this.handleJobFormChange}></textarea>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='locations'>Locations*:</label>
                                    {/* <input type='text' className='form-control' name='locations' id='locations' placeholder='Select at least one location' /> */}
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
                                            <input type='number' className='form-control' name='experience' id='experience' placeholder='E.g. 4(in years only)' onChange={this.handleJobFormChange} />
                                        </div>
                                    </div>
                                    <div className='col-md-6 col-xs-12'>
                                        <div className='form-group'>
                                            <label htmlFor='expiryDate'>Expires on*:</label>
                                            <input type='date' className='form-control' name='expiryDate' id='expiryDate' onChange={this.handleJobFormChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-4 col-xs-12'>
                                        <div className='form-group'>
                                            <label htmlFor='minSalary'>Min salary*:</label>
                                            <input type='number' className='form-control' name='minSalary' id='minSalary' placeholder='In INR Only' onChange={this.handleJobFormChange} />
                                        </div>
                                    </div>
                                    <div className='col-md-4 col-xs-12'>
                                        <div className='form-group'>
                                            <label htmlFor='maxSalary'>Max salary:</label>
                                            <input type='number' className='form-control' name='maxSalary' id='maxSalary' placeholder='Leave blank if subject dependant' onChange={this.handleJobFormChange} />
                                        </div>
                                    </div>
                                    <div className='col-md-4 col-xs-12'>
                                        <div className='form-group'>
                                            <label htmlFor='postsAvailable'>Posts available:</label>
                                            <input type='number' className='form-control' name='postsAvailable' id='postsAvailable' placeholder='E.g. 5' onChange={this.handleJobFormChange} />
                                        </div>
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
                                    <textarea rows='3' className='form-control' name='questionOne' id='questionOne' placeholder='E.g. Please provide Links or demos of works.' onChange={this.handleJobFormChange} />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='questionTwo'>Question 2:</label>
                                    <textarea rows='3' className='form-control' name='questionTwo' id='questionTwo' placeholder='E.g. Some questions related to this job.' onChange={this.handleJobFormChange} />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='questionThree'>Question 3:</label>
                                    <textarea rows='3' className='form-control' name='questionThree' id='questionThree' placeholder='E.g. Some other basic questions.' onChange={this.handleJobFormChange} />
                                </div>
                                <div className='center-content'>
                                    <button type='submit' className='btn btn-primary'>Post Now</button>
                                    <a href='/user-home' className='btn btn-default'>Cancel</a>
                                </div>
                            </form>
                            <br />
                        </div>
                        <div className='col-md-2 col-xs-12'></div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default AddJob
