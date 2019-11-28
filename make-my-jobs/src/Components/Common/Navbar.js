import React, { Component } from 'react'

export class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-fixed-top navbar-inverse">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="/">WebSiteName</a>
                    </div>
                    <div className="collapse navbar-collapse" id="myNavbar">
                        <ul className="nav navbar-nav">
                            {/* <li className="active"><a href="/">Home</a></li>
                            <li className="dropdown">
                                <a className="dropdown-toggle" data-toggle="dropdown" href="#">Page 1 <span className="caret"></span></a>
                                <ul className="dropdown-menu">
                                    <li><a href="/">Page 1-1</a></li>
                                    <li><a href="/">Page 1-2</a></li>
                                    <li><a href="/">Page 1-3</a></li>
                                </ul>
                            </li> */}
                            <li><a href="/blog">Jobs</a></li>
                            <li><a href="/blog">Internships</a></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li><a href="/signup"><span className="glyphicon glyphicon-user"></span> Sign Up</a></li>
                            <li><a href="/login"><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar
