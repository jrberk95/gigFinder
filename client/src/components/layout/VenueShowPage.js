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

    if (props.user) {
        if (props.user.id === userId)
        newGig = <Link to={`/venues/${id}/gigs`}>Add a new gig!</Link>
    }
    
    let newGig
    let gigTiles
    if (gigs){
        gigTiles = gigs.map((gig) => {
            let rate
            if (gig.rate.trim() == "") {
                rate = "Not specified"
            } else {
                rate = `$${gig.rate}`
            }
            return (
                <div className="gig-tile" key={gig.id}>
                    <p>{gig.name}</p>
                        <li>Date: {gig.date}</li>
                        <li>{gig.type}</li>
                        <li>Size: {gig.size}</li>
                        <li>Rate: {rate}</li>
                </div>
            )
        })
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
            <h5>Available gigs at this venue:</h5>
            {gigTiles}
        </>
    )
}

export default VenueShowPage