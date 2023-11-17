import React, { useEffect, useState } from "react"

const ArtistShowPage = (props) => {
    const artistId = props.match.params.spotifyArtistId
    const [spotifyData, setSpotifyData] = useState({})

    const getArtistData = async () => {
        try {
            const response = await fetch(`/api/v1/users/${artistId}`)
            const body = await response.json()
            setSpotifyData(body)
        } catch (err) {
            console.log("Error in fetch:", err.message)
        }
    }

    useEffect(() => {
            getArtistData()
    }, [])

    let dataSection
    let artistImage
    let similarArtists
    let topTracksData
    if (spotifyData.allData) {
        dataSection = (
            <>
                <h1>{spotifyData.allData.artistData.name}</h1>
                <img src={spotifyData.allData.artistData.images[1].url}/>
                <h4>Data:</h4>
                <ul>
                    <li>Followers: {spotifyData.allData.artistData.followers.total}</li>
                    <li>Genres: {spotifyData.allData.artistData.genres}</li>
                    <li>Popularity: {spotifyData.allData.artistData.popularity}</li>
                </ul> 
            </>
        )
        
        let returnedArtists = spotifyData.allData.relatedArtists.artists
        similarArtists = returnedArtists.map((artist) => {
            return (
                <div key={artist.name}>
                    <p>{artist.name}</p>
                    <img src={artist.images[1].url}/>
                </div>
            )
        })

        topTracksData = spotifyData.allData.topTracks.tracks.map((track) => {
            const { name, preview_url } = track
            return (
                <div key={name}>
                    <a href={preview_url}>{name}</a>
                </div> 
            )
        })
    }
    return (
        <>
            {dataSection}
            <h5>Top Tracks</h5>
            {topTracksData}
            <h5>Related Artists:</h5>
            {similarArtists}
        </>
    )
}

export default ArtistShowPage