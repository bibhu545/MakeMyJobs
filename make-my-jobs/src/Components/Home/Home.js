import React, { Component } from 'react'
import './home.css'
import AboutImage from '../../Assets/Images/1.jpg'
import HttpService from '../../Utils/HttpServices'
import Utils from '../../Utils/Utils'

export class Home extends Component {
    constructor(props) {
        super(props)
        this.http = new HttpService();
        this.utils = new Utils()
        this.state = {
            jobs: []
        }
    }

    componentDidMount() {
        this.http.getData('http://makemyjobs.me/Corporate/GetJobs').then(response => {
            this.setState({
                jobs: response.data.results[0].filter((item, index) => index < 3)
            })
            console.log(this.state.jobs)
        }).catch(error => {
            console.log(error);
            this.util.showErrorMessage("Some error occured.");
        })
    }

    onContactFormSubmit = (e) => {
        e.preventDefault();
    }

    render() {
        const { jobs } = this.state
        return (
            <React.Fragment>
                <div className='hero-section'>
                    <div className='section-overlay'>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-2 col-xs-0"></div>
                                <div className="col-md-8 col-xs-12 center-content hero-content">
                                    <h3>Go ahead and get an Internship/Job.</h3>
                                    <div className="input-group hero-search">
                                        <input type="search" className="form-control" placeholder='Ex. MBA, Design, Android etc.' />
                                        <span className="input-group-btn">
                                            <button className="btn btn-primary hearo-search-btn" type="button">
                                                <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
                                                Search!
                                            </button>
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-2 col-xs-0"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='featured-content'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-sm-6'>
                                <h3 className='center-content'>Featured Jobs</h3>
                                <div className='short-jobs'>
                                    <div id="smallJobSlider" className="carousel slide" data-ride="carousel">
                                        <ol className="carousel-indicators">
                                            <li data-target="#smallJobSlider" data-slide-to="0" className="active"></li>
                                            <li data-target="#smallJobSlider" data-slide-to="1"></li>
                                            <li data-target="#smallJobSlider" data-slide-to="2"></li>
                                        </ol>
                                        <div className="carousel-inner">
                                            <div className="item active">
                                                <div className="small-job-content">
                                                    <h4>
                                                        {
                                                            jobs.length === 0 ? null :
                                                                <a href={'/job-description?id=' + jobs[0].jobId}>
                                                                    {jobs[0].jobTitle}
                                                                </a>
                                                        }
                                                    </h4>
                                                    <p>
                                                        {
                                                            jobs.length === 0 ? null : jobs[0].locationNames
                                                        }
                                                    </p>
                                                    <p>
                                                        Experience: &nbsp;
                                                        {
                                                            jobs.length === 0 ? null : jobs[0].experience
                                                        } yrs
                                                    </p>
                                                    <p>
                                                        INR &nbsp;
                                                        {
                                                            jobs.length === 0 ? null : jobs[0].minSalary
                                                        }
                                                    </p>
                                                    <p>Posted on: &nbsp;
                                                        {
                                                            jobs.length === 0 ? null : this.utils.GetDateFromServer(jobs[0].postedOn)
                                                        }
                                                    </p>
                                                    <p>
                                                        {
                                                            jobs.length === 0 ? null :
                                                                <a href={'/job-description?id=' + jobs[0].jobId}>
                                                                    Apply Now
                                                                </a>
                                                        }
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="item">
                                                <div className="small-job-content">
                                                    <h4>
                                                        {
                                                            jobs.length === 0 ? null :
                                                                <a href={'/job-description?id=' + jobs[1].jobId}>
                                                                    {jobs[1].jobTitle}
                                                                </a>
                                                        }
                                                    </h4>
                                                    <p>
                                                        {
                                                            jobs.length === 0 ? null : jobs[1].locationNames
                                                        }
                                                    </p>
                                                    <p>
                                                        Experience: &nbsp;
                                                        {
                                                            jobs.length === 0 ? null : jobs[1].experience
                                                        } yrs
                                                    </p>
                                                    <p>
                                                        INR &nbsp;
                                                        {
                                                            jobs.length === 0 ? null : jobs[1].minSalary
                                                        }
                                                    </p>
                                                    <p>Posted on: &nbsp;
                                                        {
                                                            jobs.length === 0 ? null : this.utils.GetDateFromServer(jobs[1].postedOn)
                                                        }
                                                    </p>
                                                    <p>
                                                        {
                                                            jobs.length === 0 ? null :
                                                                <a href={'/job-description?id=' + jobs[1].jobId}>
                                                                    Apply Now
                                                                </a>
                                                        }
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="item">
                                                <div className="small-job-content">
                                                    <h4>
                                                        {
                                                            jobs.length === 0 ? null :
                                                                <a href={'/job-description?id=' + jobs[2].jobId}>
                                                                    {jobs[2].jobTitle}
                                                                </a>
                                                        }
                                                    </h4>
                                                    <p>
                                                        {
                                                            jobs.length === 0 ? null : jobs[2].locationNames
                                                        }
                                                    </p>
                                                    <p>
                                                        Experience: &nbsp;
                                                        {
                                                            jobs.length === 0 ? null : jobs[2].experience
                                                        } yrs
                                                    </p>
                                                    <p>
                                                        INR &nbsp;
                                                        {
                                                            jobs.length === 0 ? null : jobs[2].minSalary
                                                        }
                                                    </p>
                                                    <p>Posted on: &nbsp;
                                                        {
                                                            jobs.length === 0 ? null : this.utils.GetDateFromServer(jobs[2].postedOn)
                                                        }
                                                    </p>
                                                    <p>
                                                        {
                                                            jobs.length === 0 ? null :
                                                                <a href={'/job-description?id=' + jobs[2].jobId}>
                                                                    Apply Now
                                                                </a>
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <a className="left carousel-control" href="#smallJobSlider" data-slide="prev">
                                            <span className="glyphicon glyphicon-chevron-left"></span>
                                            <span className="sr-only">Previous</span>
                                        </a>
                                        <a className="right carousel-control" href="#smallJobSlider" data-slide="next">
                                            <span className="glyphicon glyphicon-chevron-right"></span>
                                            <span className="sr-only">Next</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-6'>
                                <h3 className='center-content'>Featured Internships</h3>
                                <div className='short-internships'>
                                    <div id="smallInternSlider" className="carousel slide" data-ride="carousel">
                                        <ol className="carousel-indicators">
                                            <li data-target="#smallInternSlider" data-slide-to="0" className="active"></li>
                                            <li data-target="#smallInternSlider" data-slide-to="1"></li>
                                            <li data-target="#smallInternSlider" data-slide-to="2"></li>
                                        </ol>
                                        <div className="carousel-inner">
                                            <div className="item active">
                                                <div className="small-job-content">
                                                    <h4>
                                                        <a href='/jobs'>
                                                            Financial Analyst @DST SS&C Mumbai
                                                        </a>
                                                    </h4>
                                                    <p>Hyderabad, Mumbai</p>
                                                    <p>Experience: 2-6 yrs</p>
                                                    <p>INR 10 - 15 LPA</p>
                                                    <p>Posted on: 15th Nov, 2019</p>
                                                    <p><a href='/jobs'>Apply now</a></p>
                                                </div>
                                            </div>

                                            <div className="item">
                                                <div className="small-job-content">
                                                    <h4>
                                                        <a href='/jobs'>
                                                            Derivative Analyst (retail Desk)
                                                        </a>
                                                    </h4>
                                                    <p>Hyderabad, Bengaluru</p>
                                                    <p>Experience: 2-6 yrs</p>
                                                    <p>INR 10 - 15 LPA</p>
                                                    <p>Posted on: 15th Nov, 2019</p>
                                                    <p><a href='/jobs'>Apply now</a></p>
                                                </div>
                                            </div>

                                            <div className="item">
                                                <div className="small-job-content">
                                                    <h4>
                                                        <a href='/jobs'>
                                                            Project Manager Civil - Real Estate
                                                        </a>
                                                    </h4>
                                                    <p>Hyderabad, Bengaluru</p>
                                                    <p>Experience: 2-6 yrs</p>
                                                    <p>INR 10 - 15 LPA</p>
                                                    <p>Posted on: 15th Nov, 2019</p>
                                                    <p><a href='/jobs'>Apply now</a></p>
                                                </div>
                                            </div>
                                        </div>
                                        <a className="left carousel-control" href="#smallInternSlider" data-slide="prev">
                                            <span className="glyphicon glyphicon-chevron-left"></span>
                                            <span className="sr-only">Previous</span>
                                        </a>
                                        <a className="right carousel-control" href="#smallInternSlider" data-slide="next">
                                            <span className="glyphicon glyphicon-chevron-right"></span>
                                            <span className="sr-only">Next</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='container'>
                    <div className='row'>
                        <h3 className='center-content'>- About MakeMyJobs -</h3>
                        <div className='col-md-6 col-xs-12 about-content-left'>
                            <img src={AboutImage} alt='Corporate scene' className='img img-about' />
                        </div>
                        <div className='col-md-6 col-xs-12 about-content-right'>
                            <h4>What we offer...</h4>
                            <p>
                                Redug Lagre dolor sit amet, consectetur adipisicing elit. Itaque quas officiis iure aspernatur sit adipisci quaerat unde at nequeRedug Lagre dolor sit amet, consectetur adipisicing elit. Itaque quas officiis iure
                            </p>
                            <br />
                            <p>
                                <i className="fas fa-check"></i>
                                Lorem ipsum dolor sit amet
                            </p>
                            <p>
                                <i className="fas fa-check"></i>
                                Lorem ipsum dolor sit amet
                            </p>
                            <p>
                                <i className="fas fa-check"></i>
                                Lorem ipsum dolor sit amet
                            </p>
                            <p>
                                <i className="fas fa-check"></i>
                                Lorem ipsum dolor sit amet
                            </p>
                        </div>
                    </div>
                </div>

                <div className='contact-section'>
                    <div className='contact-section-overlay'>
                        <div className='container'>
                            <div className='row contact-wrapper'>
                                <h3 className='center-content'>- Contact Us -</h3>
                                <div className='col-md-6 col-xs-12'>
                                    <h4>Let's get connected</h4>
                                    <p>
                                        Redug Lagre dolor sit amet, consectetur adipisicing elit. Itaque quas officiis iure aspernatur sit adipisci quaerat unde at nequeRedug Lagre dolor sit amet, consectetur adipisicing elit. Itaque quas officiis iure
                                    </p>
                                    <br />
                                    <p>
                                        <i className="far fa-envelope"></i>
                                        contact@MakeMyJobs.com
                                    </p>
                                    <p>
                                        <i className="fas fa-phone-square-alt"></i>
                                        +91-9876543210
                                    </p>
                                    <div>
                                        <i className="fas fa-address-card"></i>
                                        address
                                        <p className='contact-address'>
                                            Description, Address Line 1
                                            <br />
                                            Bhubaneswar, Odisha
                                            <br />
                                            Pin: 751001
                                        </p>
                                    </div>
                                </div>
                                <div className='col-md-6 col-xs-12'>
                                    <form onSubmit={this.onContactFormSubmit}>
                                        <div className='form-group'>
                                            <label htmlFor='senderName'>Name*:</label>
                                            <input type='text' className='form-control' id='senderName' name='senderName' placeholder='E.g. John Doe' />
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='email'>Email*:</label>
                                            <input type='email' className='form-control' id='email' name='email' placeholder='E.g. John@gmail.com' />
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='message'>Message:</label>
                                            <textarea className='form-control' rows='5' id='message' name='message' placeholder='Your message goes here...' />
                                        </div>
                                        <div className='right-content'>
                                            <button type='submit' className='btn btn-primary'>Send a query</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='container'>
                    <div className='row faq-section'>
                        <h3 className='center-content'>- Frequently Asked Questions -</h3>
                        <div className='col-sm-6 faq-left'>
                            <div className="panel-group" id="accordion">
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title">
                                            <a data-toggle="collapse" data-parent="#accordion" href="#collapse1">
                                                Consectetur adipisicing elit?
                                            </a>
                                        </h4>
                                    </div>
                                    <div id="collapse1" className="panel-collapse collapse in">
                                        <div className="panel-body">
                                            Redug Lefes dolor sit amet, consectetur adipisicing elit. Aspernatur, tempore, commodi quas mollitia dolore magnam quidem repellat, culpa voluptates laboriosam maiores alias accusamus recusandae vero
                                        </div>
                                    </div>
                                </div>
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title">
                                            <a data-toggle="collapse" data-parent="#accordion" href="#collapse2">
                                                Dolore magnam quidem repellat?
                                            </a>
                                        </h4>
                                    </div>
                                    <div id="collapse2" className="panel-collapse collapse">
                                        <div className="panel-body">
                                            Redug Lefes dolor sit amet, consectetur adipisicing elit. Aspernatur, tempore, commodi quas mollitia dolore magnam quidem repellat, culpa voluptates laboriosam maiores alias accusamus recusandae vero
                                        </div>
                                    </div>
                                </div>
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title">
                                            <a data-toggle="collapse" data-parent="#accordion" href="#collapse3">
                                                Maiores alias accusamus?
                                            </a>
                                        </h4>
                                    </div>
                                    <div id="collapse3" className="panel-collapse collapse">
                                        <div className="panel-body">
                                            Redug Lefes dolor sit amet, consectetur adipisicing elit. Aspernatur, tempore, commodi quas mollitia dolore magnam quidem repellat, culpa voluptates laboriosam maiores alias accusamus recusandae vero
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-sm-6 faq-right'>
                            <ul className="nav nav-tabs">
                                <li className="active"><a data-toggle="tab" href="#home">Apply</a></li>
                                <li><a data-toggle="tab" href="#menu1">Prepare</a></li>
                                <li><a data-toggle="tab" href="#menu2">Success</a></li>
                            </ul>

                            <div className="tab-content">
                                <div id="home" className="tab-pane fade in active">
                                    <h3>Choose and Apply</h3>
                                    <p>
                                        Redug Lares dolor sit amet, consectetur adipisicing elit. Animi vero excepturi magnam ducimus adipisci voluptas, praesentium maxime necessitatibus in dolor dolores unde ab, libero quo. Aut, laborum sequi.
                                        <br />
                                        <br />
                                        voluptas, praesentium maxime cum fugiat,magnam ducimus adipisci voluptas, praesentium architecto ducimus, doloribus fuga itaque omnis placeat.
                                    </p>
                                </div>
                                <div id="menu1" className="tab-pane fade">
                                    <h3>Get trained</h3>
                                    <p>
                                        Redug Lares dolor sit amet, consectetur adipisicing elit. Animi vero excepturi magnam ducimus adipisci voluptas, praesentium maxime necessitatibus in dolor dolores unde ab, libero quo. Aut, laborum sequi.
                                        <br />
                                        <br />
                                        voluptas, praesentium maxime cum fugiat,magnam ducimus adipisci voluptas, praesentium architecto ducimus, doloribus fuga itaque omnis placeat.
                                    </p>
                                </div>
                                <div id="menu2" className="tab-pane fade">
                                    <h3>Get selectd</h3>
                                    <p>
                                        Redug Lares dolor sit amet, consectetur adipisicing elit. Animi vero excepturi magnam ducimus adipisci voluptas, praesentium maxime necessitatibus in dolor dolores unde ab, libero quo. Aut, laborum sequi.
                                        <br />
                                        <br />
                                        voluptas, praesentium maxime cum fugiat,magnam ducimus adipisci voluptas, praesentium architecto ducimus, doloribus fuga itaque omnis placeat.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        )
    }
}

export default Home

