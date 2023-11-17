import React from "react"
import { Link } from "react-router-dom"
import AddArtistId from "./AddArtistId"

const AccountDetails = (props) => {
    const { name, email, primaryLocation, spotifyArtistId, role} = props.user
    let pageDetails
    if (role === "artist") {
        let idForm
        if (!spotifyArtistId) {
            idForm = <AddArtistId />
        } else {
            idForm = <a href={`/artists/${spotifyArtistId}`}>See my public artist page</a>
        }
        pageDetails = (
            <>
            <h2>{name}</h2>
            <p>Account type: {role}</p>
            <p>Account email: {email}</p>
            <p>Primary location: {primaryLocation}</p>
            <p>Spotify Artist Id: {spotifyArtistId}</p>
            {idForm}
        </>
        )
    } else if (role === "venue") {
        pageDetails = (
            <>
            <h2>{name}</h2>
            <p>Account type: {role}</p>
            <p>Account email: {email}</p>
            <p>Primary location: {primaryLocation}</p>
            <Link to="venues/new" className="button">Add a new venue</Link>
            <Link to="venues/my-venues" className="button">View my venues</Link>
        </>
        )
    }

    return (
        <>
            {pageDetails}
        </>
    )
}

export default AccountDetails