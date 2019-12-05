import React, { Component } from 'react'

export class SuccessMessage extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="alert alert-success alert-dismissible">
                    <a href="##" className="close" data-dismiss="alert" aria-label="close">&times;</a>
                    <strong>Success!</strong> {this.props.message}
                </div>
            </React.Fragment>
        )
    }
}

export class ErrorMessage extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="alert alert-danger alert-dismissible">
                    <a href="##" className="close" data-dismiss="alert" aria-label="close">&times;</a>
                    <strong>Error! </strong> {this.props.message}
                </div>
            </React.Fragment>
        )
    }
}

