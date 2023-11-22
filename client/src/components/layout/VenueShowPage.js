import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const VenueShowPage = (props) => {
    const venueId = props.match.params.id
    const [venue, setVenue] = useState({})
    const { id, capacity, category, location , name, userId } = venue

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

    let newGig
    if (props.user) {
        if (props.user.id === userId)
        newGig = <Link to={`/venues/${id}/gigs`}>Add a new gig!</Link>
    }

    return (
        <>
            <h1>{name}</h1>
            <h3>{location}</h3>
            <ul>
                <li>Capacity: {capacity}</li>
                <li>Category: {category}</li>
            </ul>
            {newGig}
        </>
    )
}

export default VenueShowPage