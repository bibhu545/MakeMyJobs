import React, { Component } from 'react'
import HttpService from '../../Utils/HttpServices';
import Utils, { API_ENDPOINTS } from '../../Utils/Utils';
import './internships.css';
import { PostFilterModel } from '../../Utils/Models';

export class Internships extends Component {
    constructor(props) {
        super(props)
        this.http = new HttpService();
        this.utils = new Utils();
        this.state = {
            internships: []
        }
    }

    componentDidMount() {
        var userId = this.utils.getUserInfoFromCookies().userId;
        var filterModel = new PostFilterModel();
        filterModel.userId = userId;
        this.http.postData(API_ENDPOINTS.GetInternships, filterModel).then(response => {
            this.setState({
                internships: response.data.results[0]
            })
        }).catch(error => {
            console.log(error);
            this.utils.showErrorMessage("Some error occured.");
        })
    }

    render() {
        const { internships } = this.state
        console.log(internships)
        return (
            <React.Fragment>
                <div className='container'>
                    <div className='row'>
                        <h3 className='center-content'>15k+ Internship options</h3>
                        <div className='col-md-3 col-sm-12'>
                            <h4 className='center-content'>Filters</h4>
                            <hr />
                            <form>
                                <div className='form-group'>
                                    <label htmlFor='category'>Category:</label>
                                    <input type='text' className='form-control' id='category' name='category' placeholder='E.g. Web Developement' />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='location'>Location:</label>
                                    <input type='text' className='form-control' id='location' name='location' placeholder='E.g. Bhubaneswar' />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='startingFrom'>Starting from:</label>
                                    <input type='date' className='form-control' id='startingFrom' name='startingFrom' placeholder='' />
                                </div>
                                <div className='form-group'>
                                    <label>Duration:</label>
                                    <div className="checkbox">
                                        <label><input type="checkbox" value="" />0 - 3 Months</label>
                                    </div>
                                    <div className="checkbox">
                                        <label><input type="checkbox" value="" />3 - 6 Months</label>
                                    </div>
                                    <div className="checkbox">
                                        <label><input type="checkbox" value="" />6 - 9 Months</label>
                                    </div>
                                    <div className="checkbox">
                                        <label><input type="checkbox" value="" />9 - 12 Months</label>
                                    </div>
                                    <div className="checkbox">
                                        <label><input type="checkbox" value="" />Above 12 Months</label>
                                    </div>
                                </div>
                                <div className='form-group'>
                                    <label>Internship type:</label>
                                    <div className="checkbox">
                                        <label><input type="checkbox" value="" />Work from home</label>
                                    </div>
                                    <div className="checkbox">
                                        <label><input type="checkbox" value="" />Part time</label>
                                    </div>
                                    <div className="checkbox">
                                        <label><input type="checkbox" value="" />Full time/In office</label>
                                    </div>
                                </div>
                                <hr />
                                <div className='form-group'>
                                    <label htmlFor='keyword'>Keyword:</label>
                                    <input type='text' className='form-control' id='keyword' name='keyword' placeholder='Type keyword' />
                                </div>
                            </form>
                        </div>
                        <div className='col-md-9 col-sm-12 intern-wrapper'>
                            {
                                this.state.internships.map(item =>
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
