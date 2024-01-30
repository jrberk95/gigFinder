import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const VenueShowPage = (props) => {
    const venueId = props.match.params.id
    const [venue, setVenue] = useState({})
    const { id, capacity, category, location , name, userId, gigs } = venue

    const getVenue = async () => {
        try {
            const response = await fetch(`/api/v1/venues/${venueId}`)
            const body = await response.json()
            setVenue(body.venue)
        } catch (err) {
            console.log("Error in fetch", err.message)
        }
    }

    useEffect(() => {
        getVenue()
    }, [])

    let applyButton
    if (props.user) {
        if (props.user.id === userId) {
            newGig = <Link to={`/venues/${id}/gigs`} className="button-79 button-smaller">Add a new gig!</Link>
        }

        if (props.user.role === "artist") {
            applyButton = <Link to="/nowhere"className="button">Apply for this gig!</Link>
        }
    }
    
    let newGig
    let gigTiles
    if (gigs) {
        if (gigs.length > 0){
            gigTiles = gigs.map((gig) => {
                let rate
                if (gig.rate.trim() == "") {
                    rate = "Not specified"
                } else {
                    rate = `$${gig.rate}`
                }
                return (
                    <div className="gig-tile" key={gig.id}>
                        <h4>{gig.name}</h4>
                            <li>{gig.date}</li>
                            <li>{gig.type}</li>
                            <li>Attendees: {gig.size}</li>
                            <li className="margin-bottom">Rate: {rate}</li>
                            {applyButton}
                    </div>
                )
            })
        } else {
            gigTiles = <p>No gigs available at this venue</p>
        }
    }

    return (
        <div className="grid-x grid-margin-x">
            <h1 className="cell page-header">{name}</h1>
            <h3 className="cell text-center">{location}</h3>
            <h6 className="cell text-center">Capacity: {capacity}</h6>
            <h6 className="cell text-center">Category: {category}</h6>
            <div className="cell centered more-margin">
                {newGig}
            </div>
            <h3 className="cell text-center">Available gigs at this venue:</h3>
            <div className="grid-container">
                {gigTiles}
            </div>
        </div>
    )
}

export default VenueShowPage