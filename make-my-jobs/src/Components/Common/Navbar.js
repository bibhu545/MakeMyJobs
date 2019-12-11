import React, { Component } from 'react'
import { Utils } from '../../Utils/Utils'

export class Navbar extends Component {

    constructor(props) {
        super(props)

        this.state = {

        }
    }

    onLogOut = (e) => {
        e.preventDefault();
        new Utils().clearLoginDataFromCookies();
        window.location = "/";
    }

    render() {
        var isLoggedIn = new Utils().isLoggedIn();
        return (
            <nav className="navbar navbar-fixed-top navbar-inverse">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="/">
                            <span dangerouslySetInnerHTML={{ __html: new Utils().siteName }}></span>
                        </a>
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
                            {
                                isLoggedIn ? <li><a href="/user-home">Home</a></li> : null
                            }
                            <li><a href="/jobs">Jobs</a></li>
                            <li><a href="/internships">Internships</a></li>
                        </ul>
                        {
                            isLoggedIn ?
                                <ul className="nav navbar-nav navbar-right">
                                    <li><a href="/my-profile">My Profile</a></li>
                                    <li><a onClick={this.onLogOut} href='##'>Logout</a></li>
                                </ul>
                                :
                                <ul className="nav navbar-nav navbar-right">
                                    <li><a href="/signup"><span className="glyphicon glyphicon-user"></span> Sign Up</a></li>
                                    <li><a href="/login"><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
                                </ul>
                        }
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar
