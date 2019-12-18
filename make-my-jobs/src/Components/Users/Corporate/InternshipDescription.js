import React, { Component } from 'react'
import { InternshipModel } from '../../../Utils/Models'
import Utils from '../../../Utils/Utils'

export class InternshipDescription extends Component {
    constructor(props) {
        super(props)
        this.internship = new InternshipModel()
        this.utils = new Utils()
        this.state = {

        }
    }

    render() {
        this.internship = this.props.internship
        return (
            <React.Fragment>
                <div className='row'>
                    <div className='description-header'>
                        <h4>{this.internship.title}</h4>
                        <p>Location(s): {this.internship.locationNames}</p>
                        <div className='col-md-3'>
                            <strong>Experience:</strong>
                            <br />
                            {this.internship.experience} yrs
                        </div>
                        <div className='col-md-3'>
                            <strong>Stipends:</strong>
                            <br />
                            {this.internship.minStipend}
                            {
                                this.internship.maxStipend === 0 ? null : <span> - {this.internship.maxStipend}</span>
                            }
                        </div>
                        <div className='col-md-3'>
                            <strong>Posts:</strong>
                            <br />
                            {this.internship.postsAvailable === 0 ? <span>Not disclosed</span> : this.internship.postsAvailable}
                        </div>
                        <div className='col-md-3'>
                            <strong>Posted on:</strong>
                            <br />
                            {this.internship.postedOn === '' ? null : this.utils.GetDateFromServer(this.internship.postedOn)}
                        </div>
                    </div>
                </div>
                <br />
                <div className='row'>
                    <strong>Description:</strong>
                    <p className='p-job-description'>
                        {this.internship.description}
                    </p>
                </div>
                <br />
                {
                    (this.internship.questionOne == null && this.internship.questionOne == null && this.internship.questionOne == null) ?
                        <p><strong>Questions: </strong>No optional questions for this post.</p> :
                        <p><strong>Questions:</strong></p>
                }
                {
                    this.internship.questionOne === "" ? null :
                        <p>{this.internship.questionOne}</p>
                }
                {
                    this.internship.questionTwo === "" ? null :
                        <p>{this.internship.questionTwo}</p>
                }
                {
                    this.internship.questionThree === "" ? null :
                        <p>{this.internship.questionThree}</p>
                }
                {
                    this.internship.expiryDate === "" ? null :
                        <p>
                            <strong>Expiry date:</strong>{this.utils.GetDateFromServer(this.internship.expiryDate)}
                        </p>
                }
                <p>
                    <strong>Perks: </strong>
                    {
                        this.internship.isWFHAvailable === 0 ? null :
                            <span>Work form home available</span>
                    }
                    {
                        this.internship.isPartTimeAvailable === 0 ? null :
                            <span> Part time work allowed</span>
                    }
                    {
                        this.internship.jobOffer === 0 ? null :
                            <span> Job offer on completion</span>
                    }
                </p>
            </React.Fragment>
        )
    }
}

export default InternshipDescription
