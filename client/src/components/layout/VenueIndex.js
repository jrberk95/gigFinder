import React, { useState, useEffect } from "react"
import VenueTile from "./VenueTile"

const VenueIndex = (props) => {

    const [venues, setVenues] = useState([])

    const getVenues = async () => {
        try {
            const response = await fetch('/api/v1/venues')
            const body = await response.json()
            setVenues(body.venues)
        } catch (err) {
            console.log("Error in fetch", err)
        }
    }

    useEffect(() => {
        getVenues()
    }, [])

    const venueTiles = venues.map((venue) => {
        return (
            <VenueTile venue={venue} key={venue.id}/>
        )
    })

    return (
        <>
        {venueTiles}
        </>
    )
}

export default VenueIndex