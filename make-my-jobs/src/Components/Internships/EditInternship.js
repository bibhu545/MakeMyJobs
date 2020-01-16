import React, { Component } from 'react'
import Select from 'react-select';
import { InternshipModel } from '../../Utils/Models';
import Utils, { API_ENDPOINTS } from '../../Utils/Utils';
import HttpService from '../../Utils/HttpServices';
import StudentSideBar from '../Users/Student/StudentSideBar';
import Swal from 'sweetalert2'


export class EditInternship extends Component {
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
            internship: new InternshipModel()
        }
    }

    componentDidMount() {
        this.http.getData(API_ENDPOINTS.GetCommonDataForNewPost).then(response => {
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

        var internshipId = this.utils.getQueryStringValue("id");

        if (this.utils.isLoggedIn() && this.utils.getUserTypeFromCookies() === '3') {
            if (internshipId == null) {
                window.location = '/user-home';
            }
            else {
                this.loadInternshipData(internshipId);
            }
        }
        else {
            window.location = "/login";
        }
    }

    loadInternshipData = (internshipId) => {
        this.http.getData(API_ENDPOINTS.GetInternshipInfo + '?id=' + internshipId).then(response => {
            if (response.data != null) {
                if (response.data.results[0] != null) {
                    var tempInternship = response.data.results[0]
                    var tempSelectedCity = []
                    tempInternship.locations.forEach(element => {
                        tempSelectedCity.push({ value: element.value, label: element.text })
                    });


                    var tempSelectedSkill = []
                    tempInternship.skills.forEach(element => {
                        tempSelectedSkill.push({ value: element.value, label: element.text })
                    });

                    var tempSelectedTag = []
                    tempInternship.tags.forEach(element => {
                        tempSelectedTag.push({ value: element.value, label: element.text })
                    });

                    tempInternship.expiryDate = this.utils.formatDateToBind(tempInternship.expiryDate);
                    tempInternship.startDate = this.utils.formatDateToBind(tempInternship.startDate);
                    if (tempInternship.questionOne == null) {
                        tempInternship.questionOne = '';
                    }
                    if (tempInternship.questionTwo == null) {
                        tempInternship.questionTwo = '';
                    }
                    if (tempInternship.questionThree == null) {
                        tempInternship.questionThree = '';
                    }
                    this.setState({
                        selectedCity: tempSelectedCity,
                        selectedSkill: tempSelectedSkill,
                        selectedTag: tempSelectedTag,
                        internship: tempInternship
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

    handleInternshipEditFormChange = (e) => {
        let inputName = e.target.name;
        let inputValue = e.target.value;
        let statusCopy = Object.assign({}, this.state);
        statusCopy.internship[inputName] = inputValue;
        this.setState(statusCopy);
    }

    onInternshipEdited = (e) => {
        e.preventDefault();
        var tempInternship = this.state.internship;
        var cities = [];
        this.state.selectedCity.forEach(element => {
            cities.push({ value: element.value, text: element.label });
        });
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
        tempInternship.locations = cities;
        tempInternship.tags = tempTags;
        tempInternship.skills = tempSkills;
        this.http.postData(API_ENDPOINTS.UpdateInternship, tempInternship).then(response => {
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
        const { internship } = this.state
        return (
            <React.Fragment>
                <div className='container gradient-container'>
                    <div className='row'>
                        <div className='col-md-8 col-xs-12'>
                            <br />
                            <h3 className='center-content'>- Edit internship -</h3>
                            <form onSubmit={this.onInternshipEdited}>
                                <div className='form-group'>
                                    <label htmlFor='title'>Internship title*:</label>
                                    <input type='text' className='form-control' name='title' id='title' placeholder='E.g. React Web developer' value={internship.title} onChange={this.handleInternshipEditFormChange} />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='description'>Internship description*:</label>
                                    <textarea rows='5' className='form-control' name='description' id='description' placeholder='Some key points about this internship' value={internship.description} onChange={this.handleInternshipEditFormChange} ></textarea>
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
                                            <label htmlFor='startDate'>Start date*:</label>
                                            <input type='date' className='form-control' name='startDate' id='startDate' value={internship.startDate} onChange={this.handleInternshipEditFormChange} />
                                        </div>
                                    </div>
                                    <div className='col-md-6 col-xs-12'>
                                        <div className='form-group'>
                                            <label htmlFor='expiryDate'>Expires on*:</label>
                                            <input type='date' className='form-control' name='expiryDate' id='expiryDate' value={internship.expiryDate} onChange={this.handleInternshipEditFormChange} />
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

                                <div className='row'>
                                    <div className='col-md-4 col-xs-12'>
                                        <div className='form-group'>
                                            <label htmlFor='minStipend'>Min stipend*:</label>
                                            <input type='number' className='form-control' name='minStipend' id='minStipend' placeholder='In INR Only' value={internship.minStipend} onChange={this.handleInternshipEditFormChange} />
                                        </div>
                                    </div>
                                    <div className='col-md-4 col-xs-12'>
                                        <div className='form-group'>
                                            <label htmlFor='maxStipend'>Max stipend:</label>
                                            <input type='number' className='form-control' name='maxStipend' id='maxStipend' placeholder='Leave blank if subject dependant' value={internship.maxStipend} onChange={this.handleInternshipEditFormChange} />
                                        </div>
                                    </div>
                                    <div className='col-md-4 col-xs-12'>
                                        <div className='form-group'>
                                            <label htmlFor='postsAvailable'>Posts available:</label>
                                            <input type='number' className='form-control' name='postsAvailable' id='postsAvailable' placeholder='E.g. 5' value={internship.postsAvailable} onChange={this.handleInternshipEditFormChange} />
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-md-4 col-xs-12'>
                                        <div className="checkbox">
                                            <label><input type="checkbox" checked={internship.isWFHAvailable === 1 ? true : false} name='isWFHAvailable' onChange={this.handleInternshipEditFormChange} />Work from home available</label>
                                        </div>
                                    </div>
                                    <div className='col-md-4 col-xs-12'>
                                        <div className="checkbox">
                                            <label><input type="checkbox" checked={internship.isPartTimeAvailable === 1 ? true : false} onChange={this.handleInternshipEditFormChange} name="isPartTimeAvailable" />Part time available</label>
                                        </div>
                                    </div>
                                    <div className='col-md-4 col-xs-12'>
                                        <div className="checkbox">
                                            <label><input type="checkbox" checked={internship.jobOffer === 1 ? true : false} onChange={this.handleInternshipEditFormChange} name="jobOffer" />Job offer on completion</label>
                                        </div>
                                    </div>
                                </div>

                                <hr />
                                <div className='center-content'>
                                    <h4>Optional Content</h4>
                                    <p>These questions will be asked to applicant while applying for this internship.</p>
                                </div>
                                <hr />
                                <div className='form-group'>
                                    <label htmlFor='questionOne'>Question 1:</label>
                                    <textarea rows='3' className='form-control' name='questionOne' id='questionOne' placeholder='E.g. Please provide Links or demos of works.' value={internship.questionOne} onChange={this.handleInternshipEditFormChange} />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='questionTwo'>Question 2:</label>
                                    <textarea rows='3' className='form-control' name='questionTwo' id='questionTwo' placeholder='E.g. Some questions related to this internship.' value={internship.questionTwo} onChange={this.handleInternshipEditFormChange} />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='questionThree'>Question 3:</label>
                                    <textarea rows='3' className='form-control' name='questionThree' id='questionThree' placeholder='E.g. Some other basic questions.' value={internship.questionThree} onChange={this.handleInternshipEditFormChange} />
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

export default EditInternship
