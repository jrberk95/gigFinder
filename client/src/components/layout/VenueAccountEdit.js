import React, { useState } from "react"

const VenueAccountEdit =(props) => {
    const addVenueRole = async () => {
        try {
            const response = await fetch("/api/v1/users/role", {
                method: "PATCH",
                headers: new Headers({"Content-Type": "application/json"}),
                body: JSON.stringify({ role: "venue" })
            })
            const body = response.json()
        } catch (err) {
            console.log("Error in patch", err)
        }
    }

    return (
        <>
            <h5>Please confirm that you would like to make a venue account</h5>
            <a href="/profile" className="button" onClick={addVenueRole}>Confirm</a>
        </>
    )
}

export default VenueAccountEdit