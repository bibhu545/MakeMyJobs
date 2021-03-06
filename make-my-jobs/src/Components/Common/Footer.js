import React, { Component } from 'react'
import './common.css'

export class Footer extends Component {
    render() {
        return (
            <React.Fragment>
                <div className='footer-section'>
                    <div className='container'>
                        <div className='row center-content'>
                            <div className='col-md-6 col-xs-12'>
                                &copy; Copyright MakeMyJobs@2020. All Rights Reserved.
                            </div>
                            <div className='col-md-6 col-xs-12 footer-icon-section'>
                                <a target='_blank' rel='noopener noreferrer' href='https://www.facebook.com'>
                                    <i className="fab fa-2x fa-facebook-square"></i>
                                </a>
                                <a target='_blank' rel='noopener noreferrer' href='https://www.instagram.com'>
                                    <i className="fab fa-2x fa-instagram"></i>
                                </a>
                                <a target='_blank' rel='noopener noreferrer' href='https://www.twitter.com'>
                                    <i className="fab fa-2x fa-twitter"></i>
                                </a>
                                <a target='_blank' rel='noopener noreferrer' href='https://www.youtube.com'>
                                    <i className="fab fa-2x fa-youtube"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Footer
