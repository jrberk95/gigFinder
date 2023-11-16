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
                body: JSON.stringify({ spotifyArtistId: artistId })
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
        return <Redirect push to="/profile" />;
    }

    return (
        <>
        <h3>Almost there!</h3>
        <p>Please supply your Spotify Artist ID to finish creating your account.</p>
        <p>To find it:</p>
            <ul>
                <li>Navigate to your Spotify Artist page</li>
                <li>Click the 3 dots below your artist photo</li>
                <li>Select "Share", then "Copy link to artist"</li>
            </ul>
        <label>
            <input type="text" onChange={trackUserInput} value={formInput}></input>
        </label>
        <button onClick={handleSubmit} className="button">Add Artist URL</button>
        </>
    )
}

export default AddArtistId