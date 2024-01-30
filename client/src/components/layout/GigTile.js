import React from "react"

const GigTile = (props) => {

    let {id, name, date, rate, size, type, venueId} = props.gig

    return (
    <div className="artist-tile cell medium-4">
        <h3>{name}</h3>
        <h4>{date}</h4>
        <p>{type}</p>
        <p>${rate}</p>
        <p>Anticipated Attendees: {size}</p>
    </div>
    )
}

export default GigTile