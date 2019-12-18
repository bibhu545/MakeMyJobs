import React, { Component } from 'react'
import Utils from '../../../Utils/Utils'
import { InternshipModel } from '../../../Utils/Models'

export class InternshipDescriptionEdit extends Component {
    constructor(props) {
        super(props)
        this.utils = new Utils()
        this.internship = new InternshipModel()
        this.state = {

        }
    }

    render() {
        this.internship = this.props.internship
        return (
            <React.Fragment>
                <div className='job-edit-form'>
                    <form onSubmit={this.props.onEditInternshipSubmit}>
                        <div className='form-group'>
                            <label htmlFor="title">Job Title*:</label>
                            <input type='text' id="title" name='title' className='form-control' value={this.internship.title} onChange={this.props.handleInternshipFormChange} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="description">Description*:</label>
                            <textarea id="description" rows='4' name='description' className='form-control' value={this.internship.description} onChange={this.props.handleInternshipFormChange} />
                        </div>
                        <div className='row'>
                            <div className='col-md-6'>
                                <div className='form-group'>
                                    <label htmlFor="minStipend">Min. Salary*:</label>
                                    <input type='number' id="minStipend" name='minStipend' className='form-control' value={this.internship.minStipend} onChange={this.props.handleInternshipFormChange} />
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='form-group'>
                                    <label htmlFor="maxStipend">Max Salary:</label>
                                    <input type='number' id="maxStipend" name='maxStipend' className='form-control' value={this.internship.maxStipend} onChange={this.props.handleInternshipFormChange} />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

export default InternshipDescriptionEdit
