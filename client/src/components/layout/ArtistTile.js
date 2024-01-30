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
            console.log(genre)
            return <span key={genre}>{genre}</span>
        }) 
        genreDisplay = (
        <div>
            <span>Genres: </span>
            <span>{genreOptions}</span>
        </div>)
    }

    return (
        <div key={spotifyArtistId} className="artist-tile cell medium-4">
            <div className="artist-info">
                <Link to={`/artists/${spotifyArtistId}`} className="tile-header">{props.artist.data.name}</Link>
                <figcaption>Followers: {followers}</figcaption>
            </div>
            {genreDisplay}
            <div className="image-container">
                <img src={imageSrc} alt="Artist Spotify Profile Picture" className="tile-pic"/>
            </div>
        </div>
    ) 
}

export default ArtistTile