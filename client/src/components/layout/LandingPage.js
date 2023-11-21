import React from "react"
import { Link } from "react-router-dom"

const LandingPage = (props) => {
    let registrationSection
    if (!props.user) {
        registrationSection = (
            <div className="section-wrapper cell grid-x">
                <div className="cell">
                    <h5 className="cell button-caption">New here?</h5>
                    <Link to="/users/new" className="button-79">Create an account</Link>
                </div>
                <div className="cell">
                    <h5 className="cell button-caption">Already have an account?</h5>
                    <Link to="user-sessions/new" className="button-79">Sign In</Link>
                </div>
            </div>
        )
    } else {
        registrationSection = (
            <div className="cell grid-x">
                <div className="cell">
                    <Link to="/artists" className="button-79">View Artists</Link>
                </div>
                <div className="cell">
                    <Link to="/venues" className="button-79">View Venues</Link>
                </div>
            </div>
        )
    }
    
    return (
        <div className="grid-container">
            <div className="landing-page grid-x grid-margin-x">
                <h1 className="page-header cell">Welcome to GigFinder</h1>
                <h4 className="sub-header cell">Finding and booking gigs has never been easier!</h4>
                {registrationSection}
            </div>    
        </div>
    )
}

export default LandingPage