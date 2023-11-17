import React from "react"
import { Link } from "react-router-dom"

const LandingPage = (props) => {
    let registrationSection
    if (!props.user) {
        registrationSection = (
            <>
                <h5>New here?</h5>
                <Link to="/users/new" className="button">Create an artist account</Link>
                <p>Book gigs using your Spotify data!</p>
                <Link to="/venues/new" className="button">Create a venue account</Link>
                <p>Get insight into your next booking</p>
                <h5>Already have an account?</h5>
                <Link to="user-sessions/new" className="button">Sign In</Link>
            </>
        )
    }
    
    return (
        <>
            <h1>Welcome to GigFinder!</h1>
            <h3>Finding and booking gigs has never been easier</h3>
            <Link to="/artists" className="button">View our registered artists</Link>
            <Link to="/venues" className="button">View our registered venues</Link>
            {registrationSection}
        </>    
    )
}

export default LandingPage