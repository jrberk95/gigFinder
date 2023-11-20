import React from "react"
import { Link } from "react-router-dom"

const ArtistTile = (props) => {
    const { name, spotifyArtistId, primaryLocation, img } = props.artist
    const { popularity, genres } = props.artist.data
    const imageSrc = props.artist.data.images[1].url
    const followers = props.artist.data.followers.total
    let genreDisplay


    if (genres.length > 0) {
        let genreOptions = genres.map((genre) => {
            return <li key={genre}>{genre}</li>
        }) 
        genreDisplay = (
        <div>
            <p>Genres:</p>
            <ul>{genreOptions}</ul>
        </div>)
    }

    return (
        <div key={spotifyArtistId} className="artist-tile">
            <h3>{props.artist.data.name}</h3>
            <img src={imageSrc} alt="Artist Spotify Profile Picture"/>
            <p>Followers: {followers}</p>
            {genreDisplay}
            <Link to={`/artists/${spotifyArtistId}`}>Learn more!</Link>
        </div>
    ) 
}

export default ArtistTile