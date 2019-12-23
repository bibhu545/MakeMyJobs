import React, { Component } from 'react'
import Select from 'react-select';
import HttpService from '../../../Utils/HttpServices';
import Utils from '../../../Utils/Utils';
import { JobModel } from '../../../Utils/Models';

export class JobDescriptionEdit extends Component {
    constructor(props) {
        super(props)
        this.http = new HttpService();
        this.utils = new Utils();
        this.tempJob = new JobModel()
        this.state = {
        }
    }
    render() {
        return (
            <React.Fragment>
                <div className='job-edit-form'>
                    <form onSubmit={this.props.onEditJobSubmit}>
                        <div className='form-group'>
                            <label htmlFor="jobTitle">Job Title*:</label>
                            <input type='text' id="jobTitle" name='jobTitle' className='form-control' value={this.props.job.jobTitle} onChange={this.props.handleEditJobFormChange} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="description">Description*:</label>
                            <textarea id="description" rows='4' name='description' className='form-control' value={this.props.job.description} onChange={this.props.handleEditJobFormChange} />
                        </div>
                        <div className='row'>
                            <div className='col-md-6'>
                                <div className='form-group'>
                                    <label htmlFor="minSalary">Min. Salary*:</label>
                                    <input type='number' id="minSalary" name='minSalary' className='form-control' value={this.props.job.minSalary} onChange={this.props.handleEditJobFormChange} />
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='form-group'>
                                    <label htmlFor="maxSalary">Max Salary:</label>
                                    <input type='number' id="maxSalary" name='maxSalary' className='form-control' value={this.props.job.maxSalary} onChange={this.props.handleEditJobFormChange} />
                                </div>
                            </div>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='locations'>Locations*:</label>
                            {/* <input type='text' className='form-control' name='locations' id='locations' placeholder='Select at least one location' /> */}
                            <Select
                                value={this.props.selectedCity}
                                isMulti
                                name='locations'
                                onChange={this.props.handleCityChange}
                                options={this.props.cityOpyions}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                id='locations'
                            />
                        </div>
                        <div className='row'>
                            <div className='col-md-6'>
                                <div className='form-group'>
                                    <label htmlFor="postsAvailable">Posts available*:</label>
                                    <input type='number' id="postsAvailable" name='postsAvailable' className='form-control' value={this.props.job.postsAvailable} onChange={this.props.handleEditJobFormChange} />
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='form-group'>
                                    <label htmlFor="expiryDate">Expiry date*:</label>
                                    <input type='date' id="expiryDate" name='expiryDate' className='form-control' value={this.props.job.expiryDate} onChange={this.props.handleEditJobFormChange} />
                                </div>
                            </div>
                        </div>
                        <div className='center-content'>
                            <button type='submit' className='btn btn-primary'>Update Now</button>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

export default JobDescriptionEdit
