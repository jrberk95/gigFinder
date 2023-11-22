import React, { useState, useEffect } from "react"

const VenueTile = (props) => {
    const {id, name, location, capacity, category} = props.venue
    return (
        <div key={id} className="artist-tile cell medium-4 auto">
            <h3>{name}</h3>
            <h5>{location}</h5>
            <p>{capacity}</p>
            <p>{category}</p>
        </div>
    )
}

export default VenueTile