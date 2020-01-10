import React, { Component } from 'react'
import StudentSideBar from '../Student/StudentSideBar'
import HttpService from '../../../Utils/HttpServices';
import Utils from '../../../Utils/Utils';
import { ProffessionalModel, EmployeeEducationModel, EmployeeExperienceModel } from '../../../Utils/Models';
import $ from 'jquery';
import Swal from 'sweetalert2'


export class ProffesionalProfile extends Component {
    constructor(props) {
        super(props);
        this.http = new HttpService();
        this.utils = new Utils();
        this.userInfoFromCookies = new Utils().getUserInfoFromCookies();
        this.user = new ProffessionalModel();
        this.state = {
            userType: new Utils().getUserTypeFromCookies(),
            user: new ProffessionalModel(),
            edit: false,
            editId: 0
        }
    }

    componentDidMount() {
        this.renderEmployeeData();
    }

    renderEmployeeData = () => {
        this.http.getData('http://makemyjobs.me/Employee/GetEmployeeInfo?id=' + this.userInfoFromCookies.userId).then(
            response => {
                if (response.data.results[0] == null) {
                    window.location = '/login';
                }
                else {
                    this.user = response.data.results[0]
                    this.setState({
                        user: this.user
                    })
                }
            }).catch(error => {
                console.log(error);
            });
    }

    openEducationModal = (e) => {
        e.preventDefault();
    }

    openExperienceModal = (e) => {
        e.preventDefault();
    }

    onEducationAdded = (e, edit) => {
        e.preventDefault();
        var education = new EmployeeEducationModel();
        education.employeeId = this.user.employeeId;
        education.instituteName = e.target.instituteName.value;
        education.instituteType = e.target.instituteType.value;
        education.percentage = e.target.percentage.value;
        education.joinedOn = e.target.joinedOn.value;
        education.passedOn = e.target.passedOn.value;
        if (edit) {
            education.empEducationId = this.user.employeeEducation.filter(item => item.empEducationId === this.state.editId)[0].empEducationId;
            this.http.postData('http://makemyjobs.me/Employee/EditEmployeeEducation', education).then(response => {
                if (response.data.results != null) {
                    if (response.data.results[0] != null) {
                        this.renderEmployeeData();
                        new Utils().showDefaultMessage("Education data updated.");
                        this.closeEducationModal();
                    }
                    else {
                        new Utils().showErrorMessage("Some error occuerd. Please try again.");
                    }
                }
                else {
                    new Utils().showErrorMessage(response.data.errorMessage);
                }
            }).catch(error => {
                console.log(error);
                new Utils().showErrorMessage("Some error occuerd" + error);
            });
        }
        else {
            this.http.postData('http://makemyjobs.me/Employee/AddEmployeeEducation', education).then(response => {
                if (response.data.results != null) {
                    if (response.data.results[0] != null) {
                        this.renderEmployeeData();
                        new Utils().showDefaultMessage("Education data added.");
                        this.closeEducationModal();
                    }
                    else {
                        new Utils().showErrorMessage("Some error occuerd. Please try again.");
                    }
                }
                else {
                    new Utils().showErrorMessage(response.data.errorMessage);
                }
            }).catch(error => {
                console.log(error);
                new Utils().showErrorMessage("Some error occuerd" + error);
            });
        }
    }

    onEducationEdited = (e, id) => {
        e.preventDefault();
        this.setState({
            edit: true,
            editId: id
        })
        var education = new EmployeeEducationModel();
        education = this.user.employeeEducation.filter(item => item.empEducationId === id)[0];
        $("#instituteName").val(education.instituteName);
        $("#instituteType").val(education.instituteType);
        $("#percentage").val(education.percentage);
        $("#joinedOn").val(education.joinedOn);
        $("#passedOn").val(education.passedOn);
    }

    deleteEducation = (e, id) => {
        e.preventDefault();
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                this.http.getData('http://makemyjobs.me/Employee/DeleteEmployeeEducation?id=' + id).then(response => {
                    if (response.data.results != null) {
                        this.renderEmployeeData();
                        if (response.data.results[0]) {
                            this.utils.showInlineDefaultMessage('Education data deleted.');
                        }
                        else {
                            this.utils.showInlineErrorMessage('Some error occured. Please try again.');
                        }
                    }
                    else {
                        this.utils.showInlineErrorMessage('Some error occured. Please try again.');
                    }
                }).catch(error => {
                    this.utils.showInlineErrorMessage('Some error occured. Please try again.', error);
                });
            }
        })
    }

    closeEducationModal = () => {
        $('#educationModal .close').click();
        $("#instituteName").val();
        $("#instituteType").val();
        $("#joinedOn").val();
        $("#passedOn").val();
        this.setState({ edit: false })
    }

    onExperienceAdded = (e, edit) => {
        e.preventDefault();
        var experience = new EmployeeExperienceModel();
        experience.employeeId = this.user.employeeId;
        experience.companyName = e.target.companyName.value;
        experience.position = e.target.position.value;
        experience.joinedOn = e.target.joinedOn.value;
        experience.leftOn = e.target.leftOn.value;
        //add validation here
        if (edit) {
            if (this.state.editId > 0) {
                experience.empExperienceId = this.user.employeeExperience.filter(item => item.empExperienceId === this.state.editId)[0].empExperienceId;
                this.http.postData('http://makemyjobs.me/Employee/EditEmployeeExperience', experience).then(response => {
                    if (response.data.results != null) {
                        if (response.data.results[0] != null) {
                            this.renderEmployeeData();
                            new Utils().showDefaultMessage("Experience data updated.");
                            this.closeExperienceModal();
                        }
                        else {
                            new Utils().showErrorMessage("Some error occuerd. Please try again.");
                        }
                    }
                    else {
                        console.log(response.data.errorMessage);
                        new Utils().showErrorMessage("Some error occured.");
                    }
                }).catch(error => {
                    console.log(error);
                    new Utils().showErrorMessage("Some error occuerd");
                });
            }
            else {
                return;
            }
        }
        else {
            this.http.postData('http://makemyjobs.me/Employee/AddEmployeeExperience', experience).then(response => {
                if (response.data.results != null) {
                    if (response.data.results[0] != null) {
                        this.renderEmployeeData();
                        new Utils().showDefaultMessage("New Experience added.");
                        this.closeExperienceModal();
                    }
                    else {
                        new Utils().showErrorMessage("Some error occuerd. Please try again.");
                    }
                }
                else {
                    console.log(response.data.errorMessage);
                    new Utils().showErrorMessage("Some error occured.");
                }
            }).catch(error => {
                console.log(error);
                new Utils().showErrorMessage("Some error occuerd");
            });
        }
    }

    onExperienceEdited = (e, id) => {
        e.preventDefault();
        this.setState({
            edit: true,
            editId: id
        })
        var experience = new EmployeeExperienceModel();
        experience = this.user.employeeExperience.filter(item => item.empExperienceId === id)[0];
        $("#companyName").val(experience.companyName);
        $("#position").val(experience.position);
        $("#joinedOn").val(experience.joinedOn);
        $("#leftOn").val(experience.leftOn);
    }

    deleteExperience = (e, id) => {
        e.preventDefault();
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                this.http.getData('http://makemyjobs.me/Employee/DeleteEmployeeExperience?id=' + id).then(response => {
                    if (response.data.results != null) {
                        this.renderEmployeeData();
                        if (response.data.results[0]) {
                            this.utils.showInlineDefaultMessage('Experience data deleted.');
                        }
                        else {
                            this.utils.showInlineErrorMessage('Some error occured. Please try again.');
                        }
                    }
                    else {
                        this.utils.showInlineErrorMessage('Some error occured. Please try again.');
                    }
                }).catch(error => {
                    this.utils.showInlineErrorMessage('Some error occured. Please try again.', error);
                });
            }
        })
    }

    closeExperienceModal = () => {
        $('#experienceModal .close').click();
        $("#companyName").val("");
        $("#position").val("");
        $("#joinedOn").val("");
        $("#leftOn").val("");
        this.setState({ edit: false })
    }

    render() {
        return (
            <React.Fragment>
                <div className='container gradient-container'>
                    <div className='row student-home-wrapper'>
                        <div className='col-md-8 col-xs-12'>
                            <h3 className='center-content'>- My Profile -</h3>
                            <div className='center-content'>
                                <p>Please complete your profile <a href='/edit-profile'>here</a> to get more personalized internships.</p>
                            </div>
                            <hr className='short-hr' />
                            <div className='row'>
                                <div className='col-md-2'></div>
                                <div className='col-md-8'>
                                    <div className='row'>
                                        <div className='col-sm-3'>
                                            <p>
                                                <strong>Name:</strong>
                                            </p>
                                        </div>
                                        <div className='col-sm-9'>
                                            <p>
                                                {this.state.user.firstName} {this.state.user.lastName}
                                            </p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-sm-3'>
                                            <p>
                                                <strong>Email:</strong>
                                            </p>
                                        </div>
                                        <div className='col-sm-9'>
                                            <p>
                                                {this.state.user.email}
                                            </p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-sm-3'>
                                            <p>
                                                <strong>Phone:</strong>
                                            </p>
                                        </div>
                                        <div className='col-sm-9'>
                                            <p>
                                                {
                                                    this.state.user.contactNumber == null ?
                                                        <span className='light-text'><i>Please update your contact number.</i></span>
                                                        : this.state.user.contactNumber
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-sm-3'>
                                            <p>
                                                <strong>Date of birth:</strong>
                                            </p>
                                        </div>
                                        <div className='col-sm-9'>
                                            <p>
                                                {
                                                    this.state.user.dateOfBirth == null ?
                                                        <span className='light-text'><i>Please update your Date of birth.</i></span>
                                                        : new Utils().GetDateFromServer(this.state.user.dateOfBirth)
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-sm-3'>
                                            <p>
                                                <strong>City:</strong>
                                            </p>
                                        </div>
                                        <div className='col-sm-9'>
                                            <p>
                                                {
                                                    this.state.user.city == null ?
                                                        <span className='light-text'><i>Please update your current city.</i></span>
                                                        : this.state.user.city
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-sm-3'>
                                            <p>
                                                <strong>Address:</strong>
                                            </p>
                                        </div>
                                        <div className='col-sm-9'>
                                            <p>
                                                {
                                                    this.state.user.address === "" ?
                                                        <span className='light-text'><i>Please update your address.</i></span>
                                                        : this.state.user.address
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-sm-3'>
                                            <p>
                                                <strong>Pin Code:</strong>
                                            </p>
                                        </div>
                                        <div className='col-sm-9'>
                                            <p>
                                                {
                                                    this.state.user.zipCode == null ?
                                                        <span className='light-text'><i>Please update your pin.</i></span>
                                                        : this.state.user.zipCode
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-sm-3'>
                                            <p>
                                                <strong>Resume:</strong>
                                            </p>
                                        </div>
                                        <div className='col-sm-9'>
                                            <p>
                                                {
                                                    this.state.user.resume == null ?
                                                        <span className='light-text'><i>Please add your resume.</i></span>
                                                        : <a href="##" onClick={(e) => this.utils.getResume(e, 0, this.state.user.employeeId)}>View Resume</a>
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-2'></div>
                            </div>
                            <br />
                            <div className='center-content'>
                                <a href='edit-profile' className='btn btn-primary'>Update Now</a>
                            </div>

                            <br />
                            <div className='center-content'>
                                <h3>
                                    - My Education&nbsp;
                                    <a href='##' onClick={this.openEducationModal} data-toggle="modal" data-target="#educationModal">
                                        <span className="glyphicon glyphicon-plus-sign"></span>
                                    </a> -</h3>
                                <p>Please add/update your education information here.</p>
                            </div>
                            <div className='row'>
                                <div className='col-md-2'></div>
                                <div className='col-md-8 col-xs-12'>
                                    {
                                        this.state.user.employeeEducation.length === 0 ?
                                            <p>
                                                You have not added your education information.
                                                <a href='##' onClick={this.openEducationModal} data-toggle="modal" data-target="#educationModal">(Add Now)</a>
                                            </p> :
                                            this.state.user.employeeEducation.map((item, index) =>
                                                <div className='experience-wrapper' key={index}>
                                                    <div className='experience-actions'>
                                                        <a href='##' onClick={(e) => this.onEducationEdited(e, item.empEducationId)} data-toggle="modal" data-target="#educationModal">
                                                            <span className="glyphicon glyphicon-pencil"></span>
                                                        </a>
                                                        &nbsp;
                                                    <a href='##' onClick={(e) => this.deleteEducation(e, item.empEducationId)}>
                                                            <span className="glyphicon glyphicon-trash"></span>
                                                        </a>
                                                    </div>
                                                    <h4>
                                                        {this.utils.getInstituteTypeName(item.instituteType)}:
                                                        <strong> {item.instituteName}</strong>
                                                    </h4>
                                                    <p>
                                                        CGPA/Percentage: <strong>{item.percentage}</strong>
                                                        <br />
                                                        From <strong>{new Utils().GetDateFromServer(item.joinedOn)}</strong>
                                                        To<strong> {new Utils().GetDateFromServer(item.passedOn)}</strong>
                                                    </p>
                                                </div>
                                            )
                                    }
                                </div>
                                <div className='col-md-2'></div>
                            </div>
                            <br />
                            <div className='center-content'>
                                <h3>
                                    - My work experiences&nbsp;
                                    <a href='##' id='hello' onClick={this.openExperienceModal} data-toggle="modal" data-target="#experienceModal">
                                        <span className="glyphicon glyphicon-plus-sign"></span>
                                    </a> -
                                </h3>
                                <p>Please add/update all your previous work experiences here.</p>
                            </div>
                            <div className='row'>
                                <div className='col-md-2'></div>
                                <div className='col-md-8 col-xs-12'>
                                    {
                                        this.state.user.employeeExperience.length === 0 ?
                                            <p>
                                                You have not added your work experience information.
                                                <a href='##' onClick={this.openExperienceModal} data-toggle="modal" data-target="#experienceModal">(Add Now)</a>
                                                <br />
                                                Leave blank if you are a fresher.
                                            </p> :
                                            this.state.user.employeeExperience.map((item, index) =>
                                                <div className='experience-wrapper' key={index}>
                                                    <div className='experience-actions'>
                                                        <a href='##' onClick={(e) => this.onExperienceEdited(e, item.empExperienceId)} data-toggle="modal" data-target="#experienceModal">
                                                            <span className="glyphicon glyphicon-pencil"></span>
                                                        </a>
                                                        &nbsp;
                                                        <a href='##' onClick={(e) => this.deleteExperience(e, item.empExperienceId)} >
                                                            <span className="glyphicon glyphicon-trash"></span>
                                                        </a>
                                                    </div>
                                                    <h4><strong>{item.companyName}</strong></h4>
                                                    <p>
                                                        As a <strong>{item.position}</strong>
                                                        <br />
                                                        From <strong>{new Utils().GetDateFromServer(item.joinedOn)}</strong>
                                                        {item.leftOn == null ? <span>Continuing</span> : <span>To<strong> {new Utils().GetDateFromServer(item.leftOn)}</strong></span>}
                                                    </p>
                                                </div>
                                            )
                                    }
                                </div>
                                <div className='col-md-2'></div>
                            </div>


                            <br />
                            <div id="educationModal" className="modal fade" role="dialog">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <form onSubmit={(e) => this.onEducationAdded(e, this.state.edit)}>
                                            <div className="modal-header">
                                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                                <h4 className="modal-title center-content">Add education details</h4>
                                            </div>
                                            <div className="modal-body">
                                                <div className='row'>
                                                    <div className='col-sm-2'></div>
                                                    <div className='col-sm-8'>

                                                        <div className='form-group'>
                                                            <label htmlFor='instituteName'>Instutute Name*:</label>
                                                            <input type='text' className='form-control' placeholder="Enter institute name" id='instituteName' name='instituteName' />
                                                        </div>
                                                        <div className='row'>
                                                            <div className='col-md-6 col-sm-12'>
                                                                <label htmlFor='instituteType'>Institute type*:</label>
                                                                <select className='form-control' id='instituteType'>
                                                                    <option value='1'>School</option>
                                                                    <option value='2'>Under Graduate</option>
                                                                    <option value='3'>Post Graduate</option>
                                                                </select>
                                                            </div>
                                                            <div className='col-md-6 col-sm-12'>
                                                                <div className='form-group'>
                                                                    <label htmlFor='percentage'>Percentage/GPA*:</label>
                                                                    <input type='text' className='form-control' placeholder="Enter percentage/GPA" id='percentage' name='percentage' />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='row'>
                                                            <div className='col-md-6 col-sm-12'>
                                                                <div className='form-group'>
                                                                    <label htmlFor='joinedOn'>Joined on*:</label>
                                                                    <input type='date' className='form-control' id='joinedOn' name='joinedOn' />
                                                                </div>
                                                            </div>
                                                            <div className='col-md-6 col-sm-12'>
                                                                <div className='form-group'>
                                                                    <label htmlFor='passedOn'>Passed on*:</label>
                                                                    <input type='date' className='form-control' id='passedOn' name='passedOn' />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-sm-2'></div>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                {
                                                    this.state.edit ?
                                                        <button className='btn btn-primary'>Update Now</button> :
                                                        <button className='btn btn-primary'>Add Now</button>
                                                }
                                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div id="experienceModal" className="modal fade" role="dialog">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <form onSubmit={(e) => this.onExperienceAdded(e, this.state.edit)}>
                                            <div className="modal-header">
                                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                                <h4 className="modal-title center-content">Add work experience</h4>
                                            </div>
                                            <div className="modal-body">
                                                <div className='row'>
                                                    <div className='col-sm-2'></div>
                                                    <div className='col-sm-8'>
                                                        <div className='form-group'>
                                                            <label htmlFor='companyName'>Company Name*:</label>
                                                            <input type='text' className='form-control' placeholder="Enter company name" id='companyName' name='companyName' />
                                                        </div>
                                                        <div className='form-group'>
                                                            <label htmlFor='position'>Position*:</label>
                                                            <input type='text' className='form-control' placeholder="Enter your position" id='position' name='position' />
                                                        </div>
                                                        <div className='row'>
                                                            <div className='col-md-6 col-sm-12'>
                                                                <div className='form-group'>
                                                                    <label htmlFor='joinedOn'>Joined on*:</label>
                                                                    <input type='date' className='form-control' placeholder="Enter percentage/GPA" id='joinedOn' name='joinedOn' />
                                                                </div>
                                                            </div>
                                                            <div className='col-md-6 col-sm-12'>
                                                                <div className='form-group'>
                                                                    <label htmlFor='leftOn'>Left on:</label>
                                                                    <input type='date' className='form-control' placeholder="Enter percentage/GPA" id='leftOn' name='leftOn' />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='row'>
                                                            <div className='col-xs-12'>
                                                                <small>P.S: Leave 'Left on' field blank if this is your current company.</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-sm-2'></div>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                {
                                                    this.state.edit ?
                                                        <button className='btn btn-primary'>Update Now</button> :
                                                        <button className='btn btn-primary'>Add Now</button>
                                                }
                                                <button type="button" onClick={this.closeExperienceModal} className="btn btn-default" data-dismiss="modal">Close</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <StudentSideBar user={this.userInfoFromCookies}></StudentSideBar>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ProffesionalProfile
