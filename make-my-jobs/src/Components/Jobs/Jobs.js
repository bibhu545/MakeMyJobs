import React, { Component } from 'react'
import HttpService from '../../Utils/HttpServices'
import { Utils } from '../../Utils/Utils'
import './jobs.css';

export class Jobs extends Component {
    constructor(props) {
        super(props)
        this.http = new HttpService();
        this.utils = new Utils();
        this.state = {
            jobs: []
        }
    }

    componentDidMount() {
        this.http.getData('http://makemyjobs.me/Corporate/GetJobs').then(response => {
            this.setState({
                jobs: response.data.results[0]
            })
        }).catch(error => {
            console.log(error);
            this.utils.showErrorMessage("Some error occured.");
        })
    }

    render() {
        return (
            <React.Fragment>
                <div className='container gradient-container'>
                    <div className='row'>
                        <div className='col-md-3 col-sm-12'>
                            <br /><br />
                            <h4 className='center-content'>Filters</h4>
                            <hr />
                            <form>
                                <div className='form-group'>
                                    <label htmlFor='category'>Category:</label>
                                    <input type='text' className='form-control' id='category' name='category' placeholder='E.g. Marketing' />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='location'>Location:</label>
                                    <input type='text' className='form-control' id='location' name='location' placeholder='E.g. Bhubaneswar' />
                                </div>
                                <div className='form-group'>
                                    <label>Salary:</label>
                                    <div className="checkbox">
                                        <label><input type="checkbox" value="" />0 - 3 LPA</label>
                                    </div>
                                    <div className="checkbox">
                                        <label><input type="checkbox" value="" />3 - 6 LPA</label>
                                    </div>
                                    <div className="checkbox">
                                        <label><input type="checkbox" value="" />6 - 10 LPA</label>
                                    </div>
                                    <div className="checkbox">
                                        <label><input type="checkbox" value="" />10 - 15 LPA</label>
                                    </div>
                                    <div className="checkbox">
                                        <label><input type="checkbox" value="" />15 - 25 LPA</label>
                                    </div>
                                    <div className="checkbox">
                                        <label><input type="checkbox" value="" />Above 25 LPA</label>
                                    </div>
                                </div>
                                <hr />
                                <div className='form-group'>
                                    <label htmlFor='keyword'>Keyword:</label>
                                    <input type='text' className='form-control' id='keyword' name='keyword' placeholder='Type keyword' />
                                </div>
                            </form>
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
                                                    </div>
                                                </div>
                                            </a>
                                        </React.Fragment>
                                    )
                            }
                            < ul className="pager">
                                <li className="previous"><a href="/jobs">Previous</a></li>
                                <li className="next"><a href="/jobs">Next</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </React.Fragment >
        )
    }
}

export default Jobs
