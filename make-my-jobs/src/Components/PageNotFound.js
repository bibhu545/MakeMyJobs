import React from 'react'

function PageNotFound() {
    return (
        <React.Fragment>
            <div className='container error-container'>
                <div className='row'>
                    <div className='col-xs-6 error-page-image'></div>
                    <div className='col-xs-6 error-page-info'>
                        <h4>Oops....Looks like we lost you.</h4>
                        <br />
                        <a href='/' className='btn btn-primary'>Go to Home</a>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default PageNotFound
