import React, { Component } from 'react'
import HttpService from '../../../Utils/HttpServices'
import Utils from '../../../Utils/Utils';
import { JobModel } from '../../../Utils/Models';

export class JobDescription extends Component {
    constructor(props) {
        super(props)
        this.http = new HttpService();
        this.utils = new Utils();
        this.tempJob = new JobModel()
        this.state = {}
    }

    render() {
        this.tempJob = this.props.job
        return (
            <React.Fragment>
                <div className='row'>
                    <div className='description-header'>
                        <h4>{this.tempJob.jobTitle}</h4>
                        <p>Location(s): {this.tempJob.locationNames}</p>
                        <div className='col-md-3'>
                            <strong>Experience:</strong>
                            <br />
                            {this.tempJob.experience} yrs
                        </div>
                        <div className='col-md-3'>
                            <strong>Salary:</strong>
                            <br />
                            {this.tempJob.minSalary}
                            {
                                this.tempJob.maxSalary === 0 ? null : <span> - {this.tempJob.maxSalary}</span>
                            }
                        </div>
                        <div className='col-md-3'>
                            <strong>Posts:</strong>
                            <br />
                            {this.tempJob.postsAvailable === 0 ? <span>Not disclosed</span> : this.tempJob.postsAvailable}
                        </div>
                        <div className='col-md-3'>
                            <strong>Posted on:</strong>
                            <br />
                            {this.tempJob.postedOn === '' ? null : this.utils.GetDateFromServer(this.tempJob.postedOn)}
                        </div>
                    </div>
                </div>
                <br />
                <div className='row'>
                    <strong>Description:</strong>
                    <p className='p-job-description'>
                        {this.tempJob.description}
                    </p>
                </div>
                <br />
                {
                    (this.tempJob.questionOne == null && this.tempJob.questionOne == null && this.tempJob.questionOne == null) ?
                        <p><strong>Questions: </strong>No optional questions for this post.</p> :
                        <p><strong>Questions:</strong></p>
                }
                {
                    this.tempJob.questionOne === "" ? null :
                        <p>{this.tempJob.questionOne}</p>
                }
                {
                    this.tempJob.questionTwo === "" ? null :
                        <p>{this.tempJob.questionTwo}</p>
                }
                {
                    this.tempJob.questionThree === "" ? null :
                        <p>{this.tempJob.questionThree}</p>
                }
                {
                    this.tempJob.expiryDate === "" ? null :
                        <p>
                            <strong>Expiry date:</strong>{this.utils.GetDateFromServer(this.tempJob.expiryDate)}
                        </p>
                }
            </React.Fragment>
        )
    }
}

export default JobDescription
