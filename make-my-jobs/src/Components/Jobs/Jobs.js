import React, { Component } from 'react'
import logo1 from '../../Assets/Uploads/logos/client-1.png'
import logo2 from '../../Assets/Uploads/logos/client-4.png'
import './jobs.css';
import { JobModel } from '../../Utils/Models';

export class Jobs extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
        this.job = []
        for (let index = 0; index < 6; index++) {
            var job = new JobModel();
            job.jobId = index;
            job.title = 'Financial Analyst @ DST SS&C Mumbai Airoli';
            job.company = 'By: DST Worldwide Services India Pvt. Ltd';
            job.experience = '4 - 5 Years';
            job.location = 'Mumbai, Bengaluru';
            job.tags = 'Professional Tax, MIS Preparation, Writing Skills, Finance Function...';
            job.salary = 'INR 10 - 15 LPA';
            job.postedBy = 'Rahmath khan , Today';
            if (index % 2 === 0) {
                job.image = logo1;
            }
            else {
                job.image = logo2;
            }
            this.job.push(job);
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className='container'>
                    <div className='row'>
                        <h3 className='center-content'>25k+ Job options</h3>
                        <div className='col-md-3 col-sm-12'>
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
                            {
                                this.job.map(item =>
                                    <React.Fragment key={item.jobId}>
                                        <div className='job-desc'>
                                            <div className='row'>
                                                <div className='col-sm-9'>
                                                    <h4><a href='/jobs'>{item.title}</a></h4>
                                                    <p>{item.company}</p>
                                                </div>
                                                <div className='col-sm-3'>
                                                    <img src={item.image} alt='company logo' className='img img-logo' />
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-sm-4'>
                                                    <i className="fas fa-suitcase"></i> {item.experience}
                                                </div>
                                                <div className='col-sm-8'>
                                                    <i className="fas fa-map-marked"></i> {item.location}
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-sm-12'>
                                                    <i className="fas fa-tags"></i> {item.tags}
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-sm-4'>
                                                    <i className="fas fa-rupee-sign"></i> {item.salary}
                                                </div>
                                                <div className='col-sm-8'>
                                                    <i className="fas fa-user"></i>
                                                    Posted by: <a href='/jobs'>{item.postedBy}</a>
                                                </div>
                                            </div>
                                        </div>
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
