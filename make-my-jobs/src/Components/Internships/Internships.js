import React, { Component } from 'react'
import { InternshipModel } from '../../Utils/Models';
import logo1 from '../../Assets/Uploads/logos/client-5.png'
import logo2 from '../../Assets/Uploads/logos/client-6.png'
import './internships.css';

export class Internships extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
        this.internship = []
        for (let index = 0; index < 6; index++) {
            var internship = new InternshipModel();
            internship.internshipId = index;
            internship.title = 'Financial Analyst @ DST SS&C Mumbai Airoli';
            internship.company = 'By: DST Worldwide Services India Pvt. Ltd';
            internship.duration = '3 - 6 months';
            internship.location = 'Mumbai, Bengaluru';
            internship.tags = 'Professional Tax, MIS Preparation, Writing Skills, Finance Function...';
            internship.stipend = 'INR 5000 - 8000 PM';
            internship.postedBy = 'Rahmath khan , Today';
            if (index % 2 === 0) {
                internship.image = logo1;
            }
            else {
                internship.image = logo2;
            }
            this.internship.push(internship);
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className='container'>
                    <div className='row'>
                        <h3 className='center-content'>15k+ Internship options</h3>
                        <div className='col-md-3 col-sm-12'>
                            <h4 className='center-content'>Filters</h4>
                            <hr />
                            <form>
                                <div className='form-group'>
                                    <label htmlFor='category'>Category:</label>
                                    <input type='text' className='form-control' id='category' name='category' placeholder='E.g. Web Developement' />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='location'>Location:</label>
                                    <input type='text' className='form-control' id='location' name='location' placeholder='E.g. Bhubaneswar' />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='startingFrom'>Starting from:</label>
                                    <input type='date' className='form-control' id='startingFrom' name='startingFrom' placeholder='' />
                                </div>
                                <div className='form-group'>
                                    <label>Duration:</label>
                                    <div className="checkbox">
                                        <label><input type="checkbox" value="" />0 - 3 Months</label>
                                    </div>
                                    <div className="checkbox">
                                        <label><input type="checkbox" value="" />3 - 6 Months</label>
                                    </div>
                                    <div className="checkbox">
                                        <label><input type="checkbox" value="" />6 - 9 Months</label>
                                    </div>
                                    <div className="checkbox">
                                        <label><input type="checkbox" value="" />9 - 12 Months</label>
                                    </div>
                                    <div className="checkbox">
                                        <label><input type="checkbox" value="" />Above 12 Months</label>
                                    </div>
                                </div>
                                <div className='form-group'>
                                    <label>Internship type:</label>
                                    <div className="checkbox">
                                        <label><input type="checkbox" value="" />Work from home</label>
                                    </div>
                                    <div className="checkbox">
                                        <label><input type="checkbox" value="" />Part time</label>
                                    </div>
                                    <div className="checkbox">
                                        <label><input type="checkbox" value="" />Full time/In office</label>
                                    </div>
                                </div>
                                <hr />
                                <div className='form-group'>
                                    <label htmlFor='keyword'>Keyword:</label>
                                    <input type='text' className='form-control' id='keyword' name='keyword' placeholder='Type keyword' />
                                </div>
                            </form>
                        </div>
                        <div className='col-md-9 col-sm-12 intern-wrapper'>
                            {
                                this.internship.map(item =>
                                    <React.Fragment key={item.internshipId}>
                                        <div className='intern-desc'>
                                            <div className='row'>
                                                <div className='col-sm-9'>
                                                    <h4><a href='/internship-description'>{item.title}</a></h4>
                                                    <p>{item.company}</p>
                                                </div>
                                                <div className='col-sm-3'>
                                                    <img src={item.image} alt='company logo' className='img img-logo' />
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-sm-4'>
                                                    <i className="fas fa-suitcase"></i> {item.duration}
                                                </div>
                                                <div className='col-sm-8'>
                                                    <i className="fas fa-map-marked"></i> {item.location}
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-sm-12'>
                                                    <i className="fas fa-tags"></i> {item.tags}
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-sm-4'>
                                                    <i className="fas fa-rupee-sign"></i> {item.stipend}
                                                </div>
                                                <div className='col-sm-8'>
                                                    <i className="fas fa-user"></i>
                                                    Posted by: <a href='/jobs'>{item.postedBy}</a>
                                                </div>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                )
                            }
                            <ul className="pager">
                                <li className="previous"><a href="/internships">Previous</a></li>
                                <li className="next"><a href="/internships">Next</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Internships
