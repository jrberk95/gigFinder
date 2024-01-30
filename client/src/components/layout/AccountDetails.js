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
            idForm = <a href={`/artists/${spotifyArtistId}`} className="button-79 profile-button">See my public artist page</a>
        }
        pageDetails = (
        <div>
            <h2 className="cell">{name}</h2>
            <p className="cell">Account type: {role}</p>
            <p className="cell">Account email: {email}</p>
            <p className="cell">Primary location: {primaryLocation}</p>
            <p className="cell">Spotify Artist Id: {spotifyArtistId}</p>
            {idForm}
        </div>
        )
    } else if (role === "venue") {
        pageDetails = (
        <>
            <h2 className="cell">{name}</h2>
            <p className="cell">Account type: {role}</p>
            <p className="cell">Account email: {email}</p>
            <p className="cell">Primary location: {primaryLocation}</p>
            <div className="cell">
                <Link to="venues/new" className="button-79 profile-button button-smaller">Add a new venue</Link>
                <Link to="venues/my-venues" className="button-79 profile-button button-smaller">View my venues</Link>
            </div>
        </>
        )
    } else {
        pageDetails = (
        <div className="grid-x grid-margin-x">
            <h1 className="cell page-header">What type of account would you like to create?</h1>
            <div className="cell centered">
                <Link to="/artist-profile/edit" className="button-79 profile-button">Artist Account</Link>
                <Link to="/venue-profile/edit" className="button-79 profile-button">Venue Owner/Manager Account</Link>
            </div>
        </div>
        )
    }

    return (
        <div className="grid-x grid-margin-x text-center section-wrapper">
            {pageDetails}
        </div>
    )
}

export default AccountDetails