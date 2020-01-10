import React, { Component } from 'react'
import HttpService from '../../../Utils/HttpServices';
import Utils from '../../../Utils/Utils';

export class MyJobs extends Component {
    constructor(props) {
        super(props);
        this.http = new HttpService();
        this.userInfoFromCookies = new Utils().getUserInfoFromCookies();
        this.utils = new Utils();
        this.editOpened = 0;
        this.viewOpened = 0;
        this.jobIdForOperation = 0;
        this.state = {
            userType: new Utils().getUserTypeFromCookies(),
            jobs: [],
            pageNo: parseInt(this.utils.getQueryStringValue("page"))
        }
    }

    componentDidMount() {
        this.http.postData('http://makemyjobs.me/Corporate/GetJobsByUser?id=' + this.userInfoFromCookies.userId).then(
            response => {
                if (response.data.results == null) {
                    window.location = '/login';
                }
                else {
                    this.setState({
                        jobs: response.data.results[0]
                    })
                }
            }).catch(error => {
                console.log(error);
            });
    }
    render() {
        return (
            <React.Fragment>
                <div className='container gradient-container'>
                    <div className='row student-home-wrapper'>
                        <div className='col-md-8 col-xs-12 left-content'>
                            <div className='center-content'>
                                <h3>- My Jobs -</h3>
                            </div>
                            <br />
                            {
                                this.state.jobs.length === 0 ?
                                    <h4>
                                        You have not posted any jobs yet.
                                            <a href='/add-job'> (add now)</a>
                                    </h4> :
                                    <React.Fragment>
                                        {
                                            this.state.jobs.map(item =>
                                                <React.Fragment key={item.jobId}>
                                                    <div className='job-desc-user'>
                                                        <div className='row'>
                                                            <div className='col-xs-10'>
                                                                <h4><a href='/jobs'>{item.jobTitle}</a></h4>
                                                                <p>{item.company}</p>
                                                            </div>
                                                            <div className='col-xs-2'>
                                                                <a href="##">
                                                                    <span class="glyphicon glyphicon-share"></span>
                                                                </a>
                                                                <a href="##">
                                                                    <span class="glyphicon glyphicon-trash"></span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div className='row'>
                                                            <div className='col-sm-5'>
                                                                <i className="fas fa-suitcase"></i>Experience: {item.experience} yrs
                                                                                                    </div>
                                                            <div className='col-sm-7'>
                                                                <i className="fas fa-map-marked"></i> {item.locationNames}
                                                            </div>
                                                        </div>
                                                        <div className='row'>
                                                            <div className='col-sm-5'>
                                                                <i className="fas fa-rupee-sign"></i>
                                                                Posted on: {this.utils.GetDateFromServer(item.postedOn)}
                                                            </div>
                                                            <div className='col-sm-7'>
                                                                <i className="fas fa-user"></i>
                                                                Expiry date: {this.utils.GetDateFromServer(item.expiryDate)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </React.Fragment>
                                            )
                                        }
                                        {/* < ul className="pager">
                                            {
                                                this.state.pageNo === 0 ?
                                                    null :
                                                    <li className="previous"><a href="/jobs">Previous</a></li>
                                            }
                                            <li className="next"><a href="/jobs">Next</a></li>
                                        </ul> */}
                                    </React.Fragment>
                            }
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default MyJobs
