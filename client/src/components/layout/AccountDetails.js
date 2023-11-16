import React from "react"
import AddArtistId from "./AddArtistId"

const AccountDetails = (props) => {

    const { name, email, primaryLocation, spotifyArtistId} = props.user

    let idForm
    if (!spotifyArtistId) {
        idForm = <AddArtistId />
    }   

    return (
        <>
            <h2>{name}</h2>
            <p>Account email: {email}</p>
            <p>Primary location: {primaryLocation}</p>
            <p>Spotify Artist Id: {spotifyArtistId}</p>
            {idForm}
            <a href={`/artists/${spotifyArtistId}`}>See my public artist page</a>
        </>
    )
}

export default AccountDetails