import React, { Component } from 'react'

export class AddJob extends Component {

    constructor(props) {
        super(props)

        this.state = {

        }
    }

    onJobsCreated = (e) => {
        e.preventDefault();
    }

    render() {
        return (
            <React.Fragment>
                <div className='container gradient-container'>
                    <div className='row'>
                        <h3 className='center-content'>- Post a New Job -</h3>
                        <div className='col-md-2 col-xs-12'></div>
                        <div className='col-md-8 col-xs-12'>
                            <form onSubmit={this.onJobsCreated}>
                                <div className='form-group'>
                                    <label htmlFor='jobTitle'>Job title*:</label>
                                    <input type='text' className='form-control' name='jobTitle' id='jobTitle' placeholder='E.g. Senior Software Engineer' />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='jobDescrption'>Job description*:</label>
                                    <textarea rows='5' className='form-control' name='jobDescrption' id='jobDescrption' placeholder='Some key points about this job' ></textarea>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='locations'>Locations*:</label>
                                    <input type='text' className='form-control' name='locations' id='locations' placeholder='Select at least one location' />
                                </div>
                                <div className='row'>
                                    <div className='col-md-6 col-xs-12'>
                                        <div className='form-group'>
                                            <label htmlFor='experience'>Minimum Experience*:</label>
                                            <input type='number' className='form-control' name='experience' id='experience' placeholder='E.g. 4(in years only)' />
                                        </div>
                                    </div>
                                    <div className='col-md-6 col-xs-12'>
                                        <div className='form-group'>
                                            <label htmlFor='expiryDate'>Expires on*:</label>
                                            <input type='date' className='form-control' name='expiryDate' id='expiryDate' />
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-4 col-xs-12'>
                                        <div className='form-group'>
                                            <label htmlFor='minSalary'>Min salary*:</label>
                                            <input type='number' className='form-control' name='minSalary' id='minSalary' placeholder='In INR Only' />
                                        </div>
                                    </div>
                                    <div className='col-md-4 col-xs-12'>
                                        <div className='form-group'>
                                            <label htmlFor='maxSalary'>Max salary:</label>
                                            <input type='number' className='form-control' name='maxSalary' id='maxSalary' placeholder='Leave blank if subject dependant' />
                                        </div>
                                    </div>
                                    <div className='col-md-4 col-xs-12'>
                                        <div className='form-group'>
                                            <label htmlFor='postsAvailable'>Posts available:</label>
                                            <input type='number' className='form-control' name='postsAvailable' id='postsAvailable' placeholder='E.g. 5' />
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className='center-content'>
                                    <h4>Optional Content</h4>
                                    <p>These questions will be asked to applicant while applying for this job.</p>
                                </div>
                                <hr />
                                <div className='form-group'>
                                    <label htmlFor='questionOne'>Question 1:</label>
                                    <textarea rows='3' className='form-control' name='questionOne' id='questionOne' placeholder='E.g. Please provide Links or demos of works.' />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='questionTwo'>Question 2:</label>
                                    <textarea rows='3' className='form-control' name='questionTwo' id='questionTwo' placeholder='E.g. Some questions related to this job.' />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='questionThree'>Question 3:</label>
                                    <textarea rows='3' className='form-control' name='questionThree' id='questionThree' placeholder='E.g. Some other basic questions.' />
                                </div>
                                <div class='center-content'>
                                    <button type='submit' className='btn btn-primary'>Post Now</button>
                                    <a href='/jobs' className='btn btn-default'>Cancel</a>
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

export default AddJob
