import React, { useState, useEffect } from "react"
import VenueTile from "./VenueTile"

const VenuesByOwner = (props) => {
    const [venues, setVenues] = useState([])

    const getMyVenues = async () => {
        try {
            const response = await fetch("/api/v1/venues/my-venues")
            const body = await response.json()
            setVenues(body.venues)
        } catch (err) {
            console.log("Error in fetch", err.message)
        }
    }

    const venueTiles = venues.map((venue) => {
        return (
            <VenueTile venue={venue} key={venue.id}/>
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