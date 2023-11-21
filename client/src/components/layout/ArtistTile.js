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
        <div key={spotifyArtistId} className="artist-tile cell medium-4">
            <div className="artist-info">
                <Link to={`/artists/${spotifyArtistId}`} className="tile-header">{props.artist.data.name}</Link>
                <figcaption>Followers: {followers}</figcaption>
            </div>
            <div className="image-container">
                <img src={imageSrc} alt="Artist Spotify Profile Picture" className="tile-pic"/>
            </div>
            {genreDisplay}
        </div>
    ) 
}

export default ArtistTile