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
        <div className="grid-x grid-margin-x">
            <h3 className="cell page-header">Please confirm that you would like to make a venue account</h3>
            <div className="cell centered">
                <a href="/profile" className="button-79 profile-button" onClick={addVenueRole}>Confirm</a>
            </div>
        </div>
    )
}

export default VenueAccountEdit