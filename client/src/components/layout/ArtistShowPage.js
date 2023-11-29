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
    let genres

    
    if (spotifyData.allData) {
        if (spotifyData.allData.artistData.genres.length !== 0) {
            genres = <li>Genres: {spotifyData.allData.artistData.genres}</li>
        } else {
            genres = ""
        }
        dataSection = (
            <>
                <h1 className="text-center page-header cell">{spotifyData.allData.artistData.name}</h1>
                <div className="cell text-center bump-down">
                    <img src={spotifyData.allData.artistData.images[1].url} className="rounded"/>
                </div>
                    <span className="cell text-center followers">Followers: {spotifyData.allData.artistData.followers.total}</span>
                    {genres}
                    <span className="cell text-center">Popularity: {spotifyData.allData.artistData.popularity}</span>
            </>
        )
        
        let returnedArtists = spotifyData.allData.relatedArtists.artists
        similarArtists = returnedArtists.map((artist) => {
            return (
                // <div key={artist.name} className="cell small-11 medium-3 artist-tile center-content grid-padding-x">
                //     <h6 className="bump-down">{artist.name}</h6>
                //     <img src={artist.images[1].url}/>
                // </div>
            <div className="card">
                <div class="card-divider">
                    <h5 className="text-center">{artist.name}</h5>
                </div>
                <img src={artist.images[1].url}/>
            </div>
            )
        })

        topTracksData = spotifyData.allData.topTracks.tracks.map((track) => {
            const { name, preview_url } = track
            return (
                <div key={name} className="cell text-center">
                    <a href={preview_url} className="link">{name}</a>
                </div> 
            )
        })
    }
    return (
        <div className="grid-x center-content">
            {dataSection}
            <h3 className="cell text-center page-header">Top Tracks</h3>
            {topTracksData}
            <h3 className="cell text-center page-header">Related Artists</h3>
            <div className="grid-x grid-margin-x small-up-1 medium-up-4 center-content">
                {similarArtists}
            </div>
        </div>
    )
}

export default ArtistShowPage