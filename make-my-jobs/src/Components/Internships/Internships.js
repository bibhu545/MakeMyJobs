import React, { Component } from 'react'
import HttpService from '../../Utils/HttpServices';
import Utils, { API_ENDPOINTS } from '../../Utils/Utils';
import './internships.css';
import { PostFilterModel } from '../../Utils/Models';
import Select from 'react-select';

export class Internships extends Component {
    constructor(props) {
        super(props)
        this.http = new HttpService();
        this.utils = new Utils();
        this.filterModel = new PostFilterModel();
        this.state = {
            internships: [],
            selectedCity: [],
            cityOptions: [],
            selectedTag: [],
            tagOptions: [],
            selectedSkill: [],
            skillOptions: []
        }
    }

    componentDidMount() {
        this.filterModel.userId = this.utils.getUserInfoFromCookies().userId;
        this.getCommonData();
        this.getFilteredData();
    }

    getCommonData = () => {
        this.http.getData(API_ENDPOINTS.GetCommonDataForFilters).then(response => {
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
                    skillOptions: tempSkills,
                })
            }
        }).catch(error => {
            console.log(error);
        });
    }

    getFilteredData = () => {
        this.http.postData(API_ENDPOINTS.GetInternships, this.filterModel).then(response => {
            this.setState({
                internships: response.data.results[0]
            })
        }).catch(error => {
            console.log(error);
            this.utils.showErrorMessage("Some error occured.");
        })
    }

    addKeywordToFilter = (e) => {
        e.preventDefault();
        this.filterModel.searchKeyword = e.target.keyword.value;
        this.getFilteredData();
    }

    handleCityChange = selectedCity => {
        this.filterModel.city = selectedCity.value;
        this.setState({
            selectedCity
        })
        this.getFilteredData();
    };

    handleTagChange = selectedTag => {
        this.filterModel.tag = selectedTag.value;
        this.setState({
            selectedTag
        })
        this.getFilteredData();
    }

    handleSkillChange = selectedSkill => {
        this.filterModel.skill = selectedSkill.value;
        this.setState({
            selectedSkill
        })
        this.getFilteredData();
    }

    isWFHAvailableChanged = () => {
        this.filterModel.isWFHAvailable = !this.filterModel.isWFHAvailable;
        this.setState({})
        this.getFilteredData();
    }

    isPartTimeAvailableChanged = () => {
        this.filterModel.isPartTimeAvailable = !this.filterModel.isPartTimeAvailable;
        this.setState({});
        this.getFilteredData();
    }

    jobOfferChanged = () => {
        this.filterModel.jobOffer = !this.filterModel.jobOffer;
        this.setState({});
        this.getFilteredData();
    }

    addStipendToFilter = (e) => {
        e.preventDefault();
        this.filterModel.minStipend = e.target.minStipend.value;
        this.getFilteredData();
    }

    addStartDateToFilter = (e) => {
        this.filterModel.startDate = e.target.value;
        this.getFilteredData();
    }

    resetFilter = (e) => {
        e.preventDefault();
        this.filterModel = new PostFilterModel();
        this.filterModel.userId = this.utils.getUserInfoFromCookies().userId;
        this.setState({
            selectedCity: [],
            selectedSkill: [],
            selectedTag: []
        })
        this.filterModel.isPartTimeAvailable = this.filterModel.isWFHAvailable = this.jobOffer = false;
        document.getElementById("stipendForm").reset();
        document.getElementById("keywordForm").reset();
        this.getCommonData();
        this.getFilteredData();
    }

    render() {
        const { internships } = this.state
        return (
            <React.Fragment>
                <div className='container gradient-container'>
                    <div className='row'>
                        <h3 className='center-content'>15k+ Internship options</h3>
                        <div className='col-md-3 col-sm-12'>
                            <h4 className='center-content'>Filters</h4>
                            <hr />
                            <a href="##" className='pull-right' onClick={this.resetFilter}>(Reset All)</a>
                            <br />
                            <div className='form-group'>
                                <label htmlFor='skills'>Skills Required:</label>
                                <Select
                                    value={this.state.selectedSkill}
                                    name='skills'
                                    onChange={this.handleSkillChange}
                                    options={this.state.skillOptions}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    id='skills'
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='locations'>Locations:</label>
                                <Select
                                    value={this.state.selectedCity}
                                    name='locations'
                                    onChange={this.handleCityChange}
                                    options={this.state.cityOptions}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    id='locations'
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='tags'>Tags:</label>
                                <Select
                                    value={this.state.selectedTag}
                                    name='tags'
                                    onChange={this.handleTagChange}
                                    options={this.state.tagOptions}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    id='tags'
                                />
                            </div>
                            <div className='form-group'>
                                <label>Internship type:</label>
                                <div className="checkbox">
                                    <label><input type="checkbox" checked={this.filterModel.isWFHAvailable} onChange={this.isWFHAvailableChanged} />Work from home</label>
                                </div>
                                <div className="checkbox">
                                    <label><input type="checkbox" checked={this.filterModel.isPartTimeAvailable} onChange={this.isPartTimeAvailableChanged} />Part time</label>
                                </div>
                                <div className="checkbox">
                                    <label><input type="checkbox" checked={this.jobOffer} onChange={this.jobOfferChanged} />Job offer on completion</label>
                                </div>
                            </div>

                            <div className='form-group'>
                                <label htmlFor='startDate'>Starts from:</label>
                                <input type='date' className='form-control' id='startDate' name='startDate' onChange={this.addStartDateToFilter} />
                            </div>

                            <form onSubmit={this.addStipendToFilter} id='stipendForm'>

                                <div className='form-group'>
                                    <label htmlFor='minStipend'>Min Stipend:</label>
                                    <div className="input-group">
                                        <input type='text' className='form-control' id='minStipend' name='minStipend' placeholder='E.g. 10000' />
                                        <span className="input-group-btn">
                                            <button type="submit" className='btn btn-default'>
                                                <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
                                            </button>
                                        </span>
                                    </div>
                                </div>

                            </form>

                            <hr />
                            <form onSubmit={this.addKeywordToFilter} id='keywordForm'>

                                <div className='form-group'>
                                    <label htmlFor='keyword'>Keyword:</label>
                                    <div className="input-group">
                                        <input type='text' className='form-control' id='keyword' name='keyword' placeholder='Type keyword' />
                                        <span className="input-group-btn">
                                            <button type="submit" className='btn btn-default'>
                                                <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
                                            </button>
                                        </span>
                                    </div>
                                </div>

                            </form>
                        </div>
                        <br />
                        <div className='col-md-9 col-sm-12 intern-wrapper'>
                            {
                                internships.map(item =>
                                    <React.Fragment key={item.internshipId}>
                                        <a target='_blank' className='job-link' rel='noopener noreferrer' href={'/internship-description?id=' + item.internshipId}>
                                            <div className='job-desc-user job-desc'>
                                                <div className='row'>
                                                    <div className='col-xs-10'>
                                                        <h4>
                                                            {item.title}
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
                                        </a>
                                    </React.Fragment>
                                )
                            }
                            {/* <ul className="pager">
                                <li className="previous"><a href="/internships">Previous</a></li>
                                <li className="next"><a href="/internships">Next</a></li>
                            </ul> */}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Internships
