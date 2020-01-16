import React, { Component } from 'react'
import Select from 'react-select';
import HttpService from '../../Utils/HttpServices';
import Utils, { API_ENDPOINTS, PostType } from '../../Utils/Utils';
import { PostModel } from '../../Utils/Models';

export class AddInternship extends Component {
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
            internship: new PostModel()
        }
    }

    componentDidMount() {
        if(this.utils.isLoggedIn()){
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
        }
        else{
            this.utils.clearLoginDataFromCookies();
            window.location = '/login';
        }
    }

    handleInternshipFormChange = (e) => {
        let inputName = e.target.name;
        let inputValue = e.target.value;
        let statusCopy = Object.assign({}, this.state);
        statusCopy.internship[inputName] = inputValue;
        this.setState(statusCopy);
    }

    onInternshipCreated = (e) => {
        e.preventDefault();
        var tempInternship = this.state.internship;
        tempInternship.isWFHAvailable = e.target.isWFHAvailable.checked;
        tempInternship.isPartTimeAvailable = e.target.isPartTimeAvailable.checked;
        tempInternship.jobOffer = e.target.jobOffer.checked;
        tempInternship.userId = this.user.userId;

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

        tempInternship.locations = cities;
        tempInternship.skills = tempSkills;
        tempInternship.tags = tempTags;

        var validationMessage = this.validateInternshipForm(tempInternship);
        if (validationMessage !== "") {
            this.utils.showErrorMessage(validationMessage);
        }
        else {
            tempInternship.postType = PostType.Internship;
            this.http.postData(API_ENDPOINTS.CreatePost, tempInternship).then(response => {
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

    validateInternshipForm = (tempInternship) => {
        var errorMessage = "";
        if (tempInternship.locations.length === 0) {
            errorMessage = "Please select at least one location.";
        }
        return errorMessage;
    }
    render() {
        return (
            <React.Fragment>
                <div className='container gradient-container'>
                    <div className='row'>
                        <h3 className='center-content'>- Post a New Internship -</h3>
                        <div className='col-md-2 col-xs-12'></div>
                        <div className='col-md-8 col-xs-12'>
                            <form onSubmit={this.onInternshipCreated}>
                                <div className='form-group'>
                                    <label htmlFor='title'>Internship title*:</label>
                                    <input type='text' className='form-control' name='title' id='title' placeholder='E.g. React Web developer' onChange={this.handleInternshipFormChange} />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='description'>Internship description*:</label>
                                    <textarea rows='5' className='form-control' name='description' id='description' placeholder='Some key points about this internship' onChange={this.handleInternshipFormChange} ></textarea>
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
                                            <input type='date' className='form-control' name='startDate' id='startDate' onChange={this.handleInternshipFormChange} />
                                        </div>
                                    </div>
                                    <div className='col-md-6 col-xs-12'>
                                        <div className='form-group'>
                                            <label htmlFor='expiryDate'>Expires on*:</label>
                                            <input type='date' className='form-control' name='expiryDate' id='expiryDate' onChange={this.handleInternshipFormChange} />
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
                                            <input type='number' className='form-control' name='minStipend' id='minStipend' placeholder='In INR Only' onChange={this.handleInternshipFormChange} />
                                        </div>
                                    </div>
                                    <div className='col-md-4 col-xs-12'>
                                        <div className='form-group'>
                                            <label htmlFor='maxStipend'>Max stipend:</label>
                                            <input type='number' className='form-control' name='maxStipend' id='maxStipend' placeholder='Leave blank if subject dependant' onChange={this.handleInternshipFormChange} />
                                        </div>
                                    </div>
                                    <div className='col-md-4 col-xs-12'>
                                        <div className='form-group'>
                                            <label htmlFor='postsAvailable'>Posts available:</label>
                                            <input type='number' className='form-control' name='postsAvailable' id='postsAvailable' placeholder='E.g. 5' onChange={this.handleInternshipFormChange} />
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-md-4 col-xs-12'>
                                        <div className="checkbox">
                                            <label><input type="checkbox" name='isWFHAvailable' />Work from home available</label>
                                        </div>
                                    </div>
                                    <div className='col-md-4 col-xs-12'>
                                        <div className="checkbox">
                                            <label><input type="checkbox" name="isPartTimeAvailable" />Part time available</label>
                                        </div>
                                    </div>
                                    <div className='col-md-4 col-xs-12'>
                                        <div className="checkbox">
                                            <label><input type="checkbox" name="jobOffer" />Job offer on completion</label>
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
                                    <textarea rows='3' className='form-control' name='questionOne' id='questionOne' placeholder='E.g. Please provide Links or demos of works.' onChange={this.handleInternshipFormChange} />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='questionTwo'>Question 2:</label>
                                    <textarea rows='3' className='form-control' name='questionTwo' id='questionTwo' placeholder='E.g. Some questions related to this internship.' onChange={this.handleInternshipFormChange} />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='questionThree'>Question 3:</label>
                                    <textarea rows='3' className='form-control' name='questionThree' id='questionThree' placeholder='E.g. Some other basic questions.' onChange={this.handleInternshipFormChange} />
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

export default AddInternship
