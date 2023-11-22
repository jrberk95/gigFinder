import React, { useState, useEffect } from "react"
import ArtistTile from "./ArtistTile"

const ArtistIndex = (props) => {
    const [artists, setArtists] = useState([])
    
    const getArtists = async () => {
        try {
            const response = await fetch("/api/v1/users")
            const body = await response.json()
            setArtists(body.users)
        } catch (err) {
            console.log("Error in fetch!", err)
        }
    }

    useEffect(() => {
        getArtists()
    }, [])

    const artistTiles = artists.map((artist) => {
        return <ArtistTile key={artist.spotifyArtistId} artist={artist}/>
    })

    return (
        <div className="grid-container">
            <div className="index grid-x grid-margin-x expanded center-content">
            <h1 className="cell page-header">All artists</h1>
            {artistTiles}
            </div>
        </div>
    )
}

export default ArtistIndex