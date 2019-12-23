import React, { Component } from 'react'
import NoProfilePic from '../../../Assets/Images/no-profile-pic.png'
import '../users.css'

export class StudentSideBar extends Component {
    render() {
        return (
            <React.Fragment>
                <div className='col-md-4 col-xs-12 student-home-side-content'>
                    <img src={NoProfilePic} alt='profile pic' className='img img-responsive img-circle img-profile-pic' />
                    {
                        window.location.pathname !== '/edit-profile' ? null :
                            <div className='center-content'>
                                <label htmlFor="updateProfilePicture" className='lbl-update-profile-picture'>
                                    <span className="glyphicon glyphicon-cloud-upload"></span>
                                </label>
                                <input type='file' accept="image/*" id='updateProfilePicture' name='updateProfilePicture' />
                            </div>
                    }
                    <h4 className='center-content'>
                        Hello {this.props.user.firstName}
                    </h4>
                    <br />
                    <div className="list-group center-content">
                        <a href="/my-profile" className="list-group-item">View Profile</a>
                        <a href="/edit-profile" className="list-group-item">Edit Profile</a>
                        <a href="/change-password" className="list-group-item">Change Password</a>
                    </div>
                    <br />
                    {/* <hr />
                    <h4 className='center-content'> - Reccomended Internships - </h4>
                    <hr /> */}
                </div>
            </React.Fragment>
        )
    }
}

export default StudentSideBar
