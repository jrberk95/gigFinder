import React, { useEffect } from "react"

const ArtistProfile = (props) => {

    const { name, email, primaryLocation, role, spotifyLink } = props.user

    return (
        <>
            <h2>{name}</h2>
            <h4>{role}</h4>
            <p>Account email: {email}</p>
            <p>Primary location: {primaryLocation}</p>
            <p>{spotifyLink}</p>
        </>
    )
}

export default ArtistProfile