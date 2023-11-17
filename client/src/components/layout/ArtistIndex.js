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
        <>
        <h1>All artists</h1>
        {artistTiles}
        </>
    )
}

export default ArtistIndex