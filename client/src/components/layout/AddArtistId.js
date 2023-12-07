import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import isolateArtistId from "../../services/isolateArtistId"

const AddArtistId = (props) => {

    const [formInput, setFormInput] = useState("")
    const [shouldRedirect, setShouldRedirect] = useState(false)
    
    const trackUserInput = (event) => {
        setFormInput(event.currentTarget.value)
        }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const artistId = isolateArtistId(formInput)
        try {
            const response = await fetch("/api/v1/users", {
                method: "PATCH",
                headers: new Headers({"Content-Type": "application/json"}),
                body: JSON.stringify({ spotifyArtistId: artistId, role: "artist" })
            })
            if (!response.ok) {
                if (response.status === 422) {
                    const body = await response.json();
                    const newErrors = translateServerErrors(body.errors);
                    return setErrors(newErrors);
                } else {
                    const errorMessage = `${response.status} (${response.statusText})`;
                    const error = new Error(errorMessage);
                    throw error;
                }
            }
            const body = await response.json()
            const updatedArtist = body.artist
            setFormInput("")
            setShouldRedirect(true)
        } catch (err) {
            console.log("Error in Fetch!", err.message)
        }
    }

    if (shouldRedirect) {
        location.href="/profile"
    }

    return (
        <div className="grid-x grid-margin-x">
        <h2 className="cell page-header">Almost there!</h2>
        <div className="cell text-center">
            <h4>Please supply your Spotify Artist Link to finish creating your account.</h4>
            <p>***Please note, in order to have your artist account publicly available you must provide a Spotify Artist Link***</p>
            <h6 className="">To find it:</h6>
        </div>
        <div className="cell centered">
                <ul className="list">
                    <li>Navigate to your Spotify Artist page</li>
                    <li>Click the 3 dots below your artist photo</li>
                    <li>Select "Share", then "Copy link to artist"</li>
                </ul>
        </div>
        <div className="cell">
            <div className="form">
                <label>
                    <input type="text" onChange={trackUserInput} value={formInput} placeholder="e.g. https://open.spotify.com/artist/0TnOYISbd1XYRBk9myaseg?si=qDNuicm1RCCdBOkC38K-zw"></input>
                </label>
                <div className="cell centered">
                    <button onClick={handleSubmit} className="button-79 button-smaller">Add Artist URL</button>
                </div>
            </div>
        </div>
        </div>
    )
}

export default AddArtistId