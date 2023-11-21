import React from "react"
import { Link } from "react-router-dom"

const LandingPage = (props) => {
    let registrationSection
    if (!props.user) {
        registrationSection = (
            <>
                <h5>New here?</h5>
                <Link to="/users/new" className="button">Create an account</Link>
                <p>Book gigs using Spotify listener data!</p>
                <h5>Already have an account?</h5>
                <Link to="user-sessions/new" className="button">Sign In</Link>
            </>
        )
    } else {
        registrationSection = (
            <>
                <Link to="/artists" className="button">View Artists</Link>
                <Link to="/venues" className="button">View Venues</Link>
            </>
        )
    }
    
    return (
        <>
            <h1>Welcome to GigFinder!</h1>
            <h3>Finding and booking gigs has never been easier</h3>
            {registrationSection}
        </>    
    )
}

export default LandingPage