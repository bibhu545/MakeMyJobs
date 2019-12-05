import React, { Component } from 'react'
import NoProfilePic from '../../../Assets/Images/no-profile-pic.png'
import '../users.css'

export class StudentSideBar extends Component {
    render() {
        return (
            <React.Fragment>
                <div className='col-md-4 col-xs-12 student-home-side-content'>
                    <img src={NoProfilePic} alt='profile pic' className='img img-responsive img-circle img-profile-pic' />
                    <h4 className='center-content'>
                        Hello {this.props.user.firstName}
                    </h4>
                    <br />
                    <div className="list-group center-content">
                        <a href="/my-profile" className="list-group-item">View Profile</a>
                        <a href="/edit-profile" className="list-group-item">Edit Profile</a>
                        <a href="##" className="list-group-item" data-toggle="modal" data-target="#myModal">Change Password</a>
                    </div>
                    <br />
                    <hr />
                    <h4 className='center-content'> - Reccomended Internships - </h4>
                    <hr />
                </div>
                <div id="myModal" className="modal fade" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title center-content">Change Password</h4>
                            </div>
                            <div className="modal-body change-password-container">
                                <form>
                                    <div className='form-group'>
                                        <label htmlFor='currentPassword'>Current password*:</label>
                                        <input type='password' className='form-control' name='currentPassword' id='currentPassword' placeholder='Enter current password' />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='newPassword'>New Password*:</label>
                                        <input type='password' className='form-control' name='newPassword' id='newPassword' placeholder='Enter new password' />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='confirmNewPassword'>Confirm new password*:</label>
                                        <input type='password' className='form-control' name='confirmNewPassword' id='confirmNewPassword' placeholder='Confirm current password' />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            </div>
                        </div>

                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default StudentSideBar
