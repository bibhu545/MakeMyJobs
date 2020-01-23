import React, { Component } from 'react'
import Select from 'react-select';
import HttpService from '../../Utils/HttpServices'
import { Utils, API_ENDPOINTS } from '../../Utils/Utils'
import './jobs.css';
import { PostFilterModel, CheckBoxModel } from '../../Utils/Models';

export class Jobs extends Component {
    constructor(props) {
        super(props)
        this.http = new HttpService();
        this.utils = new Utils();
        this.filterModel = new PostFilterModel();
        this.totalPages = 0;
        this.state = {
            jobs: [],
            selectedCity: [],
            cityOptions: [],
            selectedTag: [],
            tagOptions: [],
            selectedSkill: [],
            skillOptions: [],
            salaryOptions: [],
        }
    }

    componentDidMount() {
        this.filterModel.userId = this.utils.getUserInfoFromCookies().userId;
        this.getCommonData();
        this.getFilteredData()
    }

    getCommonData = () => {
        this.http.getData(API_ENDPOINTS.GetCommonDataForFilters).then(response => {
            if (response.data.results.length > 0) {
                var citiesFromServer = response.data.results[0];
                var tagsFromServer = response.data.results[2];
                var skillsFromServer = response.data.results[1];
                var salaryOptionsFromServer = response.data.results[3];
                // this.totalPages = response.data.results[4];

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

                var tempSalaries = [];
                salaryOptionsFromServer.forEach(element => {
                    var tempSalaryOption = new CheckBoxModel();
                    tempSalaryOption.checked = false;
                    tempSalaryOption.value = element.value;
                    tempSalaryOption.text = element.text;
                    tempSalaries.push(tempSalaryOption);
                })

                this.setState({
                    cityOptions: tempCities,
                    tagOptions: tempTags,
                    skillOptions: tempSkills,
                    salaryOptions: tempSalaries,
                })
            }
        }).catch(error => {
            console.log(error);
        });
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

    onSalaryFilterApplied = (id) => {

        var salaryOptions = this.state.salaryOptions;
        salaryOptions.forEach(element => {
            if (element.value === id) {
                element.checked = !element.checked;
            }
        });
        this.setState({ salaryOptions: salaryOptions });

        if (this.filterModel.salaryOptions.indexOf(id) > -1) {
            this.filterModel.salaryOptions.splice(this.filterModel.salaryOptions.indexOf(id), 1)
        }
        else {
            this.filterModel.salaryOptions.push(id);
        }
        this.getFilteredData();
    }

    handlePager = (e, pagerAction) => {
        e.preventDefault();
        this.filterModel.page += pagerAction;
        this.getFilteredData();
    }

    resetFilter = (e) => {
        e.preventDefault();
        this.filterModel = new PostFilterModel();
        this.filterModel.userId = this.utils.getUserInfoFromCookies().userId;
        var salaryOptions = this.state.salaryOptions;
        salaryOptions.forEach(element => {
            element.checked = false;
        })
        document.getElementById('keywordForm').reset();
        this.setState({
            selectedCity: [],
            selectedSkill: [],
            selectedTag: [],
            salaryOptions: salaryOptions
        })
        this.getCommonData();
        this.getFilteredData();
    }

    render() {
        const { salaryOptions } = this.state
        return (
            <React.Fragment>
                <div className='container gradient-container'>
                    <div className='row'>
                        <div className='col-md-3 col-sm-12'>
                            <br /><br />
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
                                <label>Salary:</label>
                                {
                                    salaryOptions.map((item, index) =>
                                        <React.Fragment key={index}>
                                            <div className="checkbox">
                                                <label><input type="checkbox" checked={item.checked} onChange={(e) => this.onSalaryFilterApplied(item.value)} />{item.text}</label>
                                            </div>
                                        </React.Fragment>
                                    )
                                }
                            </div>
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
                            <br />
                        </div>
                        <div className='col-md-9 col-sm-12 jobs-wrapper'>
                            <h3 className='center-content'>25k+ Job options</h3>
                            {
                                this.state.jobs.length === 0 ? null :
                                    this.state.jobs.map(item =>
                                        <React.Fragment key={item.jobId}>
                                            <a target='_blank' rel='noopener noreferrer' className='job-link' href={'/job-description?id=' + item.jobId}>
                                                <div className='job-desc-user job-desc'>
                                                    <div className='row'>
                                                        <div className='col-xs-10'>
                                                            <h4>{item.jobTitle}</h4>
                                                            <p>{item.company}</p>

                                                            <p>
                                                                <i className="fas fa-map-marked"></i>Locations:
                                                                {item.locationNames == null ? <span>Not specified</span> : item.locationNames}
                                                            </p>
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
                                            </a>
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
                    </div>
                </div>
            </React.Fragment >
        )
    }
}

export default Jobs
