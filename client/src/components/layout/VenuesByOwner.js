import React, { useState, useEffect } from "react"

const VenuesByOwner = (props) => {
    const [venues, setVenues] = useState([])
    
    const getMyVenues = async () => {
        try {
            const response = await fetch("/api/v1/venues")
            const body = await response.json()
            setVenues(body.venues)
        } catch (err) {
            console.log("Error in fetch", err.message)
        }
    }

    const venueTiles = venues.map((venue) => {
        return (
            <div key={venue.id}>
                <h3>{venue.name}</h3>
                <ul>
                    <li>{venue.location}</li>
                    <li>{venue.capacity}</li>
                    <li>{venue.category}</li>
                </ul>
            </div>
        )
    })

    useEffect(() => {
        getMyVenues()
    }, [])

    return (
        <>
            {venueTiles}
        </>
    )
}

export default VenuesByOwner