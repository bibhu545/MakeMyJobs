import React, { Component } from 'react'

export class AddInternship extends Component {
    render() {
        return (
            <React.Fragment>
                <div className='container gradient-container'>
                    <div className='row'>
                        <h3 className='center-content'>- Post a New Internship -</h3>
                        <div className='col-md-2 col-xs-12'></div>
                        <div className='col-md-8 col-xs-12'>
                            <form onSubmit={this.onJobsCreated}>
                                <div className='form-group'>
                                    <label htmlFor='internshipTitle'>Internship title*:</label>
                                    <input type='text' className='form-control' name='internshipTitle' id='internshipTitle' placeholder='E.g. React Web developer' />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='internshipDescrption'>Internship description*:</label>
                                    <textarea rows='5' className='form-control' name='internshipDescrption' id='internshipDescrption' placeholder='Some key points about this internship' ></textarea>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='locations'>Locations*:</label>
                                    <input type='text' className='form-control' name='locations' id='locations' placeholder='Select at least one location' />
                                </div>

                                <div className='row'>
                                    <div className='col-md-6 col-xs-12'>
                                        <div className='form-group'>
                                            <label htmlFor='startDate'>Start date*:</label>
                                            <input type='date' className='form-control' name='startDate' id='startDate' />
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
                                            <label htmlFor='minStipend'>Min stipend*:</label>
                                            <input type='number' className='form-control' name='minStipend' id='minStipend' placeholder='In INR Only' />
                                        </div>
                                    </div>
                                    <div className='col-md-4 col-xs-12'>
                                        <div className='form-group'>
                                            <label htmlFor='maxStipend'>Max stipend:</label>
                                            <input type='number' className='form-control' name='maxStipend' id='maxStipend' placeholder='Leave blank if subject dependant' />
                                        </div>
                                    </div>
                                    <div className='col-md-4 col-xs-12'>
                                        <div className='form-group'>
                                            <label htmlFor='postsAvailable'>Posts available:</label>
                                            <input type='number' className='form-control' name='postsAvailable' id='postsAvailable' placeholder='E.g. 5' />
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-md-4 col-xs-12'>
                                        <div class="checkbox">
                                            <label><input type="checkbox" value="" />Work from home available</label>
                                        </div>
                                    </div>
                                    <div className='col-md-4 col-xs-12'>
                                        <div class="checkbox">
                                            <label><input type="checkbox" value="" />Part time available</label>
                                        </div>
                                    </div>
                                    <div className='col-md-4 col-xs-12'>
                                        <div class="checkbox">
                                            <label><input type="checkbox" value="" />Job offer on completion</label>
                                        </div>
                                    </div>
                                </div>
                                
                                <hr />
                                <div className='center-content'>
                                    <h4>Optional Content</h4>
                                    <p>These questions will be asked to applicant while applying for this internship.</p>
                                </div>
                                <hr />
                                <div className='form-group'>
                                    <label htmlFor='questionOne'>Question 1:</label>
                                    <textarea rows='3' className='form-control' name='questionOne' id='questionOne' placeholder='E.g. Please provide Links or demos of works.' />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='questionTwo'>Question 2:</label>
                                    <textarea rows='3' className='form-control' name='questionTwo' id='questionTwo' placeholder='E.g. Some questions related to this internship.' />
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

export default AddInternship
