import React, { Component } from 'react'
import './home.css'
import AboutImage from '../../Assets/Images/1.jpg'

export class Home extends Component {
    render() {
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

                <div className='container'>
                    <div className='row'>
                        <h3 className='center-content'>About MakeMyJobs</h3>
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

                <div className='container'>
                    <div className='row faq-section'>
                        <h3 className='center-content'>Frequently Asked Questions</h3>
                        <div className='col-sm-6 faq-left'>
                            <div className="panel-group" id="accordion">
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title">
                                            <a data-toggle="collapse" data-parent="#accordion" href="#collapse1">
                                                Consectetur adipisicing elit.
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
                                                Dolore magnam quidem repellat.
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
                                                Maiores alias accusamus
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

